import "server-only";

import { NextResponse } from "next/server";

import {
  SubmissionDeliveryFailedError,
  SubmissionDeliveryNotConfiguredError,
} from "@/lib/submission-delivery";
import {
  beginSubmissionDelivery,
  completeSubmissionDelivery,
  consumeSubmissionRateLimit,
  createSubmissionFingerprint,
  InvalidJsonError,
  isValidIdempotencyKey,
  PayloadTooLargeError,
  readJsonBodyWithLimit,
  releaseSubmissionDelivery,
} from "@/lib/submission-protection";
import type { SubmissionValidationResult } from "@/lib/submission-validation";

const responseHeaders = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

type SubmissionMessages = {
  defaultError: string;
  deliveryNotConfigured: string;
  invalidJson: string;
  inProgress: string;
  payloadTooLarge: string;
  rateLimited: string;
  rejected: string;
  validation: string;
};

type SubmissionOptions<TData, TDeliveryAdapter, TField extends string> = {
  deliver: (values: {
    adapter: TDeliveryAdapter;
    data: TData;
    idempotencyKey: string;
  }) => Promise<void>;
  getDeliveryAdapter: () => TDeliveryAdapter;
  includeValidationFields?: boolean;
  messages: SubmissionMessages;
  validate: (
    payload: unknown,
  ) => SubmissionValidationResult<TData, TField>;
};

function jsonResponse(
  status: number,
  code: string,
  message: string,
  headers?: HeadersInit,
) {
  return NextResponse.json(
    { ok: false, code, message },
    { status, headers: { ...responseHeaders, ...headers } },
  );
}

export function methodNotAllowed() {
  return jsonResponse(
    405,
    "method_not_allowed",
    "This endpoint only accepts POST requests.",
    { Allow: "POST" },
  );
}

function normalizeHost(host: string) {
  return host.trim().toLowerCase().replace(/^www\./, "");
}

function isSameOriginRequest(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (
    fetchSite &&
    !["same-origin", "same-site", "none"].includes(fetchSite)
  ) {
    return false;
  }

  const origin = request.headers.get("origin");
  if (!origin) return true;

  const forwardedHost =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!forwardedHost) return false;

  try {
    // Compare with the "www." prefix stripped on both sides so the apex and
    // www variants of the same domain (both of which resolve to this site)
    // are treated as same-origin, even if an edge/CDN hop changes which one
    // ends up in the forwarded host header.
    return (
      normalizeHost(new URL(origin).host) ===
      normalizeHost(forwardedHost.split(",")[0])
    );
  } catch {
    return false;
  }
}

export async function handleSubmission<
  TData,
  TDeliveryAdapter,
  TField extends string,
>(
  request: Request,
  options: SubmissionOptions<TData, TDeliveryAdapter, TField>,
) {
  const { messages } = options;

  if (!isSameOriginRequest(request)) {
    return jsonResponse(403, "invalid_origin", messages.rejected);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.split(";", 1)[0].trim().toLowerCase() !== "application/json") {
    return jsonResponse(415, "unsupported_media_type", messages.rejected);
  }

  const rateLimit = consumeSubmissionRateLimit(request);
  if (!rateLimit.allowed) {
    return jsonResponse(429, "rate_limited", messages.rateLimited, {
      "Retry-After": String(rateLimit.retryAfterSeconds),
      "X-RateLimit-Limit": String(rateLimit.limit),
      "X-RateLimit-Remaining": "0",
    });
  }

  let payload: unknown;
  try {
    payload = await readJsonBodyWithLimit(request);
  } catch (error) {
    if (error instanceof PayloadTooLargeError) {
      return jsonResponse(413, "payload_too_large", messages.payloadTooLarge);
    }
    if (error instanceof InvalidJsonError) {
      return jsonResponse(400, "invalid_json", messages.invalidJson);
    }
    return jsonResponse(400, "invalid_request", messages.defaultError);
  }

  const validation = options.validate(payload);
  if (!validation.success) {
    return NextResponse.json(
      {
        ok: false,
        code: "validation_error",
        message: messages.validation,
        ...(options.includeValidationFields
          ? { fields: validation.fields }
          : {}),
      },
      { status: 400, headers: responseHeaders },
    );
  }

  if (validation.isSpam) {
    return jsonResponse(400, "invalid_submission", messages.rejected);
  }

  const idempotencyKey = request.headers.get("idempotency-key");
  if (!isValidIdempotencyKey(idempotencyKey)) {
    return jsonResponse(400, "invalid_idempotency_key", messages.rejected);
  }

  let adapter: TDeliveryAdapter;
  try {
    adapter = options.getDeliveryAdapter();
  } catch {
    return jsonResponse(
      503,
      "delivery_not_configured",
      messages.deliveryNotConfigured,
      { "Retry-After": "300" },
    );
  }

  const fingerprint = createSubmissionFingerprint(validation.data);
  const idempotencyState = beginSubmissionDelivery(
    idempotencyKey,
    fingerprint,
  );

  if (idempotencyState === "delivered") {
    return NextResponse.json(
      { ok: true, duplicate: true },
      { status: 200, headers: responseHeaders },
    );
  }
  if (idempotencyState === "delivering") {
    return jsonResponse(409, "submission_in_progress", messages.inProgress, {
      "Retry-After": "2",
    });
  }
  if (idempotencyState === "conflict") {
    return jsonResponse(409, "idempotency_conflict", messages.rejected);
  }

  try {
    await options.deliver({
      adapter,
      data: validation.data,
      idempotencyKey,
    });
  } catch (error) {
    releaseSubmissionDelivery(idempotencyKey);

    if (error instanceof SubmissionDeliveryNotConfiguredError) {
      return jsonResponse(
        503,
        "delivery_not_configured",
        messages.deliveryNotConfigured,
        { "Retry-After": "300" },
      );
    }
    if (error instanceof SubmissionDeliveryFailedError) {
      return jsonResponse(502, "delivery_unavailable", messages.defaultError, {
        "Retry-After": "30",
      });
    }
    return jsonResponse(502, "delivery_unavailable", messages.defaultError);
  }

  completeSubmissionDelivery(idempotencyKey);
  return NextResponse.json(
    { ok: true },
    { status: 201, headers: responseHeaders },
  );
}
