export type SubmissionStatus = "idle" | "submitting" | "success" | "error";

type SubmissionResult =
  | { success: true }
  | { success: false; message: string };

export async function submitJson({
  endpoint,
  fallbackMessage,
  idempotencyKey,
  payload,
}: {
  endpoint: string;
  fallbackMessage: string;
  idempotencyKey: string;
  payload: unknown;
}): Promise<SubmissionResult> {
  try {
    const response = await fetch(endpoint, {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      method: "POST",
    });
    const responseBody = (await response.json().catch(() => null)) as {
      message?: unknown;
      ok?: unknown;
    } | null;

    if (!response.ok || responseBody?.ok !== true) {
      return {
        success: false,
        message:
          typeof responseBody?.message === "string"
            ? responseBody.message
            : fallbackMessage,
      };
    }

    return { success: true };
  } catch {
    return { success: false, message: fallbackMessage };
  }
}
