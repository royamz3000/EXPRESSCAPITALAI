import { footerContent } from "@/content/home";
import {
  deliverContactInquiry,
  getContactDeliveryAdapter,
  validateContactInquiry,
} from "@/lib/contact-inquiry";
import {
  handleSubmission,
  methodNotAllowed,
} from "@/lib/submission-route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const directEmailFallback = `Please email ${footerContent.email} directly.`;

export function POST(request: Request) {
  return handleSubmission(request, {
    deliver: ({ adapter, data, idempotencyKey }) =>
      deliverContactInquiry({
        adapter,
        idempotencyKey,
        inquiry: data,
      }),
    getDeliveryAdapter: getContactDeliveryAdapter,
    messages: {
      deliveryNotConfigured: `Online contact is temporarily unavailable. ${directEmailFallback}`,
      defaultError: `We could not send your message. Please try again or email ${footerContent.email} directly.`,
      invalidJson: "The contact inquiry could not be read.",
      inProgress: "This inquiry is already being sent. Please wait.",
      payloadTooLarge: "The contact inquiry is too large.",
      rateLimited: "Too many contact attempts. Please wait and try again.",
      rejected: "The contact inquiry could not be accepted.",
      validation: "Please review the inquiry details and try again.",
    },
    validate: validateContactInquiry,
  });
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const HEAD = methodNotAllowed;
export const OPTIONS = methodNotAllowed;
