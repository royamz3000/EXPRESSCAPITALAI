import {
  isValidEmail,
  isValidPhone,
  isValidText,
  submissionFieldLimits,
} from "@/lib/submission-validation";

const contactInquiryOptions = [
  { label: "General inquiry", value: "general" },
  { label: "Existing application", value: "existing_application" },
  { label: "Partnerships / broker relations", value: "partnership" },
] as const;

export const contactSelectorOptions = [
  ...contactInquiryOptions,
  { label: "Funding request", value: "funding_request" },
] as const;

export const contactUtmFields = [
  "source",
  "medium",
  "campaign",
  "term",
  "content",
] as const;

type ContactInquiryType = (typeof contactInquiryOptions)[number]["value"];
export type ContactInquirySelection =
  (typeof contactSelectorOptions)[number]["value"];
export type ContactUtm = Partial<
  Record<(typeof contactUtmFields)[number], string>
>;

export type ContactInquiry = {
  inquiryType: ContactInquiryType;
  fullName: string;
  email: string;
  phone?: string;
  businessName?: string;
  message: string;
  sourcePath: string;
  utm?: ContactUtm;
};

export type ContactFieldName =
  | "fullName"
  | "email"
  | "phone"
  | "businessName"
  | "message";

export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>;

export function isContactInquiryType(
  value: string,
): value is ContactInquiryType {
  return contactInquiryOptions.some((option) => option.value === value);
}

export function getContactInquiryLabel(inquiryType: ContactInquiryType) {
  return contactInquiryOptions.find((option) => option.value === inquiryType)!
    .label;
}

export function contactRequiresBusinessName(inquiryType: ContactInquiryType) {
  return (
    inquiryType === "existing_application" || inquiryType === "partnership"
  );
}

export function validateContactFormFields(
  values: Record<ContactFieldName, string>,
) {
  const errors: ContactFieldErrors = {};
  const fullName = values.fullName.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const businessName = values.businessName.trim();
  const message = values.message.trim();

  if (
    !isValidText(
      fullName,
      submissionFieldLimits.personName.minimum,
      submissionFieldLimits.personName.maximum,
    )
  ) {
    errors.fullName = "Enter your full name.";
  }
  if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!phone || !isValidPhone(phone)) {
    errors.phone = "Enter a valid phone number.";
  }
  if (
    !businessName ||
    !isValidText(
      businessName,
      submissionFieldLimits.businessName.minimum,
      submissionFieldLimits.businessName.maximum,
    )
  ) {
    errors.businessName = "Enter the business name.";
  }
  if (
    !isValidText(
      message,
      submissionFieldLimits.message.minimum,
      submissionFieldLimits.message.maximum,
      true,
    )
  ) {
    errors.message = "Add a little more detail so we can direct the inquiry.";
  }

  return errors;
}
