import "server-only";

import type { LeadApplication } from "@/lib/lead-fields";
import {
  deliverSubmission,
  getSubmissionDeliveryAdapter,
  type SubmissionDeliveryAdapter,
} from "@/lib/submission-delivery";

export function getLeadDeliveryAdapter() {
  return getSubmissionDeliveryAdapter();
}

export async function deliverLeadApplication({
  adapter,
  idempotencyKey,
  lead,
}: {
  adapter: SubmissionDeliveryAdapter;
  idempotencyKey: string;
  lead: LeadApplication;
}) {
  await deliverSubmission({
    adapter,
    request: {
      idempotencyKey,
      kind: "capital_request",
      payload: lead,
    },
  });
}
