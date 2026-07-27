import "server-only";

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

export function getSubmissionDeliveryAdapter(): SubmissionDeliveryAdapter {
  throw new SubmissionDeliveryNotConfiguredError();
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
