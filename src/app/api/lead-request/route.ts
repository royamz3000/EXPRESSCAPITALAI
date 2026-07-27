import {
  deliverLeadApplication,
  getLeadDeliveryAdapter,
} from "@/lib/lead-delivery";
import {
  handleSubmission,
  methodNotAllowed,
} from "@/lib/submission-route";
import { validateLeadApplication } from "@/lib/lead-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handleSubmission(request, {
    deliver: ({ adapter, data, idempotencyKey }) =>
      deliverLeadApplication({
        adapter,
        idempotencyKey,
        lead: data,
      }),
    getDeliveryAdapter: getLeadDeliveryAdapter,
    includeValidationFields: true,
    messages: {
      deliveryNotConfigured:
        "Online applications are temporarily unavailable. Please contact Express Capital directly.",
      defaultError:
        "We could not submit your request. Please try again or contact an advisor directly.",
      invalidJson: "The application request could not be read.",
      inProgress: "This application is already being submitted. Please wait.",
      payloadTooLarge: "The application request is too large.",
      rateLimited: "Too many application attempts. Please wait and try again.",
      rejected: "The application request could not be accepted.",
      validation: "Please review the application details and try again.",
    },
    validate: validateLeadApplication,
  });
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const HEAD = methodNotAllowed;
export const OPTIONS = methodNotAllowed;
