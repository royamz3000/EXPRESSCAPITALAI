const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9().\-\s]{7,32}$/;
const controlCharacterPattern = /[\u0000-\u001f\u007f]/;
const multilineControlCharacterPattern =
  /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;

export const submissionFieldLimits = {
  businessName: { minimum: 2, maximum: 120 },
  email: { maximum: 254 },
  honeypot: { maximum: 200 },
  message: { minimum: 10, maximum: 2_000 },
  personName: { minimum: 2, maximum: 100 },
  phone: { minimumDigits: 10, maximumDigits: 15 },
  utm: { maximum: 200 },
} as const;

export type SubmissionValidationResult<T, TField extends string> =
  | { success: true; data: T; isSpam: boolean }
  | { success: false; fields: TField[] };

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function hasOnlyAllowedFields(
  payload: Record<string, unknown>,
  allowedFields: ReadonlySet<string>,
) {
  return Object.keys(payload).every((field) => allowedFields.has(field));
}

export function getTrimmedString(
  payload: Record<string, unknown>,
  field: string,
): string | null {
  const value = payload[field];
  return typeof value === "string" ? value.trim() : null;
}

export function containsControlCharacters(
  value: string,
  allowLineBreaks = false,
) {
  return (allowLineBreaks
    ? multilineControlCharacterPattern
    : controlCharacterPattern
  ).test(value);
}

export function isValidText(
  value: string,
  minimum: number,
  maximum: number,
  allowLineBreaks = false,
) {
  return (
    value.length >= minimum &&
    value.length <= maximum &&
    !containsControlCharacters(value, allowLineBreaks)
  );
}

export function isValidEmail(value: string) {
  return (
    value.length <= submissionFieldLimits.email.maximum &&
    !containsControlCharacters(value) &&
    emailPattern.test(value)
  );
}

export function isValidPhone(value: string) {
  if (!phonePattern.test(value)) return false;

  const digitCount = value.replace(/\D/g, "").length;
  return (
    digitCount >= submissionFieldLimits.phone.minimumDigits &&
    digitCount <= submissionFieldLimits.phone.maximumDigits
  );
}
