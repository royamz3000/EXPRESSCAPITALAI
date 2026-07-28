import "server-only";

import { siteConfig } from "@/lib/seo";

export type SubmissionDeliveryKind =
  | "capital_request"
  | "contact_inquiry";

export type SubmissionDeliveryRequest<TPayload = unknown> = {
  idempotencyKey: string;
  kind: SubmissionDeliveryKind;
  payload: TPayload;
};

export type SubmissionDeliveryReceipt = {
  id: string;
};

export type SubmissionDeliveryAdapter = {
  deliver: (
    request: SubmissionDeliveryRequest,
  ) => Promise<SubmissionDeliveryReceipt>;
};

export class SubmissionDeliveryNotConfiguredError extends Error {}
export class SubmissionDeliveryFailedError extends Error {}

// --- FormSubmit delivery configuration -------------------------------------
// Submissions are forwarded by email through https://formsubmit.co. The
// destination addresses live in server-only code (with optional env overrides)
// so they are never exposed to the visitor's browser.
//
// NOTE: FormSubmit requires a one-time activation. The first submission sent to
// the primary address triggers a confirmation email from FormSubmit containing
// an "Activate" link. Once clicked, every future submission is delivered
// automatically.
const LEAD_EMAIL = (
  process.env.LEAD_EMAIL ?? "info@expresscapital.ai"
).trim();
const LEAD_EMAIL_CC = (
  process.env.LEAD_EMAIL_CC ??
  "roy@businesscapitalllc.com,john@expresscapital.ai,melissa@expresscapital.ai"
).trim();

const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(
  LEAD_EMAIL,
)}`;
// FormSubmit rejects server-to-server requests that lack a same-site Referer /
// Origin (its "open this page through a web server" guard), so we present the
// site's own canonical origin.
const SITE_ORIGIN = (process.env.SITE_ORIGIN ?? siteConfig.url).trim();
const DELIVERY_TIMEOUT_MS = 12_000;

function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) return String(value);
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

function buildEmailFields(request: SubmissionDeliveryRequest): {
  subject: string;
  fields: Record<string, string>;
  replyTo?: string;
} {
  const payload = request.payload as Record<string, unknown>;

  if (request.kind === "capital_request") {
    const capitalSought =
      typeof payload.capitalSought === "number"
        ? formatCurrency(payload.capitalSought)
        : String(payload.capitalSought ?? "");
    const businessName = String(payload.businessName ?? "");
    return {
      subject: `New Funding Request${
        businessName ? ` — ${businessName}` : ""
      }`,
      replyTo:
        typeof payload.email === "string" ? payload.email : undefined,
      fields: {
        "Business Name": businessName || "Not provided",
        "Contact Name": String(payload.name ?? ""),
        Email: String(payload.email ?? ""),
        "Mobile Phone": String(payload.mobile ?? ""),
        "Office Phone": payload.office ? String(payload.office) : "Not provided",
        "Monthly Revenue": payload.monthlyRevenue
          ? String(payload.monthlyRevenue)
          : "Not provided",
        "Years Operating": payload.yearsOperating
          ? String(payload.yearsOperating)
          : "Not provided",
        "Capital Sought": capitalSought,
      },
    };
  }

  // contact_inquiry
  const fields: Record<string, string> = {
    "Inquiry Type": String(payload.inquiryType ?? ""),
    "Full Name": String(payload.fullName ?? ""),
    Email: String(payload.email ?? ""),
  };
  if (payload.phone) fields["Phone"] = String(payload.phone);
  if (payload.businessName)
    fields["Business Name"] = String(payload.businessName);
  fields["Message"] = String(payload.message ?? "");
  if (payload.sourcePath) fields["Source Page"] = String(payload.sourcePath);

  const utm = payload.utm;
  if (utm && typeof utm === "object") {
    for (const [key, value] of Object.entries(
      utm as Record<string, unknown>,
    )) {
      if (value) fields[`UTM ${key}`] = String(value);
    }
  }

  return {
    subject: `New Contact Inquiry — ${String(payload.fullName ?? "Website")}`,
    replyTo: typeof payload.email === "string" ? payload.email : undefined,
    fields,
  };
}

function createFormSubmitAdapter(): SubmissionDeliveryAdapter {
  return {
    async deliver(request) {
      const { subject, fields, replyTo } = buildEmailFields(request);

      const body: Record<string, string> = {
        ...fields,
        _subject: subject,
        _template: "table",
        _captcha: "false",
      };
      if (LEAD_EMAIL_CC) body._cc = LEAD_EMAIL_CC;
      if (replyTo) body._replyto = replyTo;

      const controller = new AbortController();
      const timeout = setTimeout(
        () => controller.abort(),
        DELIVERY_TIMEOUT_MS,
      );

      let response: Response;
      try {
        response = await fetch(FORMSUBMIT_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Referer: SITE_ORIGIN,
            Origin: SITE_ORIGIN,
          },
          body: JSON.stringify(body),
          signal: controller.signal,
          cache: "no-store",
        });
      } catch {
        throw new SubmissionDeliveryFailedError();
      } finally {
        clearTimeout(timeout);
      }

      if (!response.ok) {
        throw new SubmissionDeliveryFailedError();
      }

      let result: { success?: unknown } | null = null;
      try {
        result = (await response.json()) as { success?: unknown };
      } catch {
        // FormSubmit occasionally returns a non-JSON body on success; a 2xx
        // status still means the submission was accepted.
        return { id: request.idempotencyKey };
      }

      const success = result?.success;
      if (success === true || success === "true") {
        return { id: request.idempotencyKey };
      }

      throw new SubmissionDeliveryFailedError();
    },
  };
}

let cachedAdapter: SubmissionDeliveryAdapter | null = null;

export function getSubmissionDeliveryAdapter(): SubmissionDeliveryAdapter {
  if (!LEAD_EMAIL) {
    throw new SubmissionDeliveryNotConfiguredError();
  }
  if (!cachedAdapter) {
    cachedAdapter = createFormSubmitAdapter();
  }
  return cachedAdapter;
}

export async function deliverSubmission<TPayload>({
  adapter,
  request,
}: {
  adapter: SubmissionDeliveryAdapter;
  request: SubmissionDeliveryRequest<TPayload>;
}) {
  let receipt: SubmissionDeliveryReceipt;

  try {
    receipt = await adapter.deliver(request);
  } catch (error) {
    if (
      error instanceof SubmissionDeliveryNotConfiguredError ||
      error instanceof SubmissionDeliveryFailedError
    ) {
      throw error;
    }
    throw new SubmissionDeliveryFailedError();
  }

  if (!receipt?.id || receipt.id.trim().length === 0) {
    throw new SubmissionDeliveryFailedError();
  }

  return receipt;
}
