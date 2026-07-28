import "server-only";

import {
  contactUtmFields,
  isContactInquiryType,
  type ContactInquiry,
  type ContactUtm,
} from "@/lib/contact-fields";
import {
  deliverSubmission,
  getSubmissionDeliveryAdapter,
  type SubmissionDeliveryAdapter,
} from "@/lib/submission-delivery";
import {
  containsControlCharacters,
  getTrimmedString,
  hasOnlyAllowedFields,
  isRecord,
  isValidEmail,
  isValidPhone,
  isValidText,
  submissionFieldLimits,
  type SubmissionValidationResult,
} from "@/lib/submission-validation";

const allowedFields = new Set([
  "inquiryType",
  "fullName",
  "email",
  "phone",
  "businessName",
  "message",
  "sourcePath",
  "utm",
  "extraField1",
]);
const allowedUtmFields = new Set<string>(contactUtmFields);

type ContactValidationField = keyof ContactInquiry | "form";

function validateUtm(value: unknown): ContactUtm | null | undefined {
  if (value === undefined) return undefined;
  if (!isRecord(value) || !hasOnlyAllowedFields(value, allowedUtmFields)) {
    return null;
  }

  const utm: ContactUtm = {};
  for (const field of contactUtmFields) {
    const fieldValue = value[field];
    if (fieldValue === undefined) continue;
    if (
      typeof fieldValue !== "string" ||
      fieldValue.length > submissionFieldLimits.utm.maximum ||
      containsControlCharacters(fieldValue)
    ) {
      return null;
    }

    const trimmedValue = fieldValue.trim();
    if (trimmedValue) utm[field] = trimmedValue;
  }

  return Object.keys(utm).length > 0 ? utm : undefined;
}

export function validateContactInquiry(
  payload: unknown,
): SubmissionValidationResult<ContactInquiry, ContactValidationField> {
  if (!isRecord(payload) || !hasOnlyAllowedFields(payload, allowedFields)) {
    return { success: false, fields: ["form"] };
  }

  const inquiryType = getTrimmedString(payload, "inquiryType");
  const fullName = getTrimmedString(payload, "fullName");
  const email = getTrimmedString(payload, "email");
  const phone = getTrimmedString(payload, "phone") ?? "";
  const businessName = getTrimmedString(payload, "businessName") ?? "";
  const message = getTrimmedString(payload, "message");
  const sourcePath = getTrimmedString(payload, "sourcePath");
  const extraField1 = getTrimmedString(payload, "extraField1") ?? "";
  const utm = validateUtm(payload.utm);
  const invalidFields: ContactValidationField[] = [];

  if (!inquiryType || !isContactInquiryType(inquiryType)) {
    invalidFields.push("inquiryType");
  }
  if (
    !fullName ||
    !isValidText(
      fullName,
      submissionFieldLimits.personName.minimum,
      submissionFieldLimits.personName.maximum,
    )
  ) {
    invalidFields.push("fullName");
  }
  if (!email || !isValidEmail(email)) {
    invalidFields.push("email");
  }
  if (!phone || !isValidPhone(phone)) {
    invalidFields.push("phone");
  }

  if (
    businessName &&
    !isValidText(
      businessName,
      submissionFieldLimits.businessName.minimum,
      submissionFieldLimits.businessName.maximum,
    )
  ) {
    invalidFields.push("businessName");
  }
  if (
    !message ||
    !isValidText(
      message,
      submissionFieldLimits.message.minimum,
      submissionFieldLimits.message.maximum,
      true,
    )
  ) {
    invalidFields.push("message");
  }
  if (
    !sourcePath ||
    sourcePath !== "/contact" ||
    containsControlCharacters(sourcePath)
  ) {
    invalidFields.push("sourcePath");
  }
  if (
    utm === null ||
    extraField1.length > submissionFieldLimits.honeypot.maximum
  ) {
    invalidFields.push("form");
  }

  if (invalidFields.length > 0) {
    return { success: false, fields: [...new Set(invalidFields)] };
  }

  return {
    success: true,
    isSpam: extraField1.length > 0,
    data: {
      inquiryType: inquiryType as ContactInquiry["inquiryType"],
      fullName: fullName!,
      email: email!,
      ...(phone ? { phone } : {}),
      ...(businessName ? { businessName } : {}),
      message: message!,
      sourcePath: sourcePath!,
      ...(utm ? { utm } : {}),
    },
  };
}

export function getContactDeliveryAdapter() {
  return getSubmissionDeliveryAdapter();
}

export async function deliverContactInquiry({
  adapter,
  idempotencyKey,
  inquiry,
}: {
  adapter: SubmissionDeliveryAdapter;
  idempotencyKey: string;
  inquiry: ContactInquiry;
}) {
  await deliverSubmission({
    adapter,
    request: {
      idempotencyKey,
      kind: "contact_inquiry",
      payload: inquiry,
    },
  });
}
