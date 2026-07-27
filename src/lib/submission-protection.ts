import "server-only";

import { createHash } from "node:crypto";

const SUBMISSION_MAX_BYTES = 12 * 1024;

const rateLimitWindowMs = 15 * 60 * 1000;
const rateLimitMaximum = 5;
const idempotencyTtlMs = 24 * 60 * 60 * 1000;
const idempotencyKeyPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type IdempotencyEntry = {
  createdAt: number;
  fingerprint: string;
  state: "delivering" | "delivered";
};

type SubmissionProtectionGlobal = typeof globalThis & {
  __submissionRateLimits?: Map<string, RateLimitEntry>;
  __submissionIdempotency?: Map<string, IdempotencyEntry>;
};

const protectionGlobal = globalThis as SubmissionProtectionGlobal;
const rateLimits =
  protectionGlobal.__submissionRateLimits ?? new Map<string, RateLimitEntry>();
const idempotencyEntries =
  protectionGlobal.__submissionIdempotency ??
  new Map<string, IdempotencyEntry>();

protectionGlobal.__submissionRateLimits = rateLimits;
protectionGlobal.__submissionIdempotency = idempotencyEntries;

export class PayloadTooLargeError extends Error {}
export class InvalidJsonError extends Error {}

function pruneExpiredEntries(now: number) {
  for (const [key, entry] of rateLimits) {
    if (entry.resetAt <= now) rateLimits.delete(key);
  }

  for (const [key, entry] of idempotencyEntries) {
    if (entry.createdAt + idempotencyTtlMs <= now) {
      idempotencyEntries.delete(key);
    }
  }
}

function getRequestAddress(request: Request) {
  const forwardedAddress =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("true-client-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for") ??
    "unknown";

  return forwardedAddress.split(",")[0].trim().slice(0, 128) || "unknown";
}

export function consumeSubmissionRateLimit(request: Request) {
  const now = Date.now();
  pruneExpiredEntries(now);

  const addressHash = createHash("sha256")
    .update(getRequestAddress(request))
    .digest("hex");
  const existing = rateLimits.get(addressHash);

  if (!existing || existing.resetAt <= now) {
    rateLimits.set(addressHash, {
      count: 1,
      resetAt: now + rateLimitWindowMs,
    });

    return {
      allowed: true,
      limit: rateLimitMaximum,
      remaining: rateLimitMaximum - 1,
      retryAfterSeconds: 0,
    };
  }

  if (existing.count >= rateLimitMaximum) {
    return {
      allowed: false,
      limit: rateLimitMaximum,
      remaining: 0,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((existing.resetAt - now) / 1000),
      ),
    };
  }

  existing.count += 1;

  return {
    allowed: true,
    limit: rateLimitMaximum,
    remaining: rateLimitMaximum - existing.count,
    retryAfterSeconds: 0,
  };
}

export function isValidIdempotencyKey(value: string | null): value is string {
  return typeof value === "string" && idempotencyKeyPattern.test(value);
}

export function createSubmissionFingerprint(value: unknown) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

export function beginSubmissionDelivery(
  idempotencyKey: string,
  fingerprint: string,
): "new" | "delivered" | "delivering" | "conflict" {
  const now = Date.now();
  pruneExpiredEntries(now);

  const existing = idempotencyEntries.get(idempotencyKey);
  if (!existing) {
    idempotencyEntries.set(idempotencyKey, {
      createdAt: now,
      fingerprint,
      state: "delivering",
    });
    return "new";
  }

  if (existing.fingerprint !== fingerprint) return "conflict";
  return existing.state;
}

export function completeSubmissionDelivery(idempotencyKey: string) {
  const existing = idempotencyEntries.get(idempotencyKey);
  if (existing) existing.state = "delivered";
}

export function releaseSubmissionDelivery(idempotencyKey: string) {
  const existing = idempotencyEntries.get(idempotencyKey);
  if (existing?.state === "delivering") {
    idempotencyEntries.delete(idempotencyKey);
  }
}

export async function readJsonBodyWithLimit(request: Request) {
  const contentLength = request.headers.get("content-length");
  if (
    contentLength &&
    /^\d+$/.test(contentLength) &&
    Number(contentLength) > SUBMISSION_MAX_BYTES
  ) {
    throw new PayloadTooLargeError();
  }

  if (!request.body) throw new InvalidJsonError();

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let body = "";
  let bytesRead = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    bytesRead += value.byteLength;
    if (bytesRead > SUBMISSION_MAX_BYTES) {
      void reader.cancel().catch(() => undefined);
      throw new PayloadTooLargeError();
    }

    body += decoder.decode(value, { stream: true });
  }

  body += decoder.decode();

  try {
    return JSON.parse(body) as unknown;
  } catch {
    throw new InvalidJsonError();
  }
}
