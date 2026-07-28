import "server-only";

import {
  LeadApplication,
  revenueRanges,
  yearsOperating,
} from "@/lib/lead-fields";
import {
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
  "businessName",
  "monthlyRevenue",
  "yearsOperating",
  "capitalSought",
  "email",
  "name",
  "mobile",
  "office",
  "extraField1",
]);

type ValidationErrorField = keyof LeadApplication | "form";

export function validateLeadApplication(
  payload: unknown,
): SubmissionValidationResult<LeadApplication, ValidationErrorField> {
  if (!isRecord(payload)) {
    return { success: false, fields: ["form"] };
  }

  if (!hasOnlyAllowedFields(payload, allowedFields)) {
    return { success: false, fields: ["form"] };
  }

  const businessName = getTrimmedString(payload, "businessName");
  const monthlyRevenue = getTrimmedString(payload, "monthlyRevenue");
  const operatingYears = getTrimmedString(payload, "yearsOperating");
  const capitalSought = getTrimmedString(payload, "capitalSought");
  const email = getTrimmedString(payload, "email");
  const name = getTrimmedString(payload, "name");
  const mobile = getTrimmedString(payload, "mobile");
  const office = getTrimmedString(payload, "office");
  const extraField1 = getTrimmedString(payload, "extraField1") ?? "";
  const invalidFields: ValidationErrorField[] = [];

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
    monthlyRevenue &&
    !revenueRanges.includes(
      monthlyRevenue as (typeof revenueRanges)[number],
    )
  ) {
    invalidFields.push("monthlyRevenue");
  }

  if (
    operatingYears &&
    !yearsOperating.includes(
      operatingYears as (typeof yearsOperating)[number],
    )
  ) {
    invalidFields.push("yearsOperating");
  }

  const parsedCapital = Number(capitalSought);
  if (
    !capitalSought ||
    !Number.isInteger(parsedCapital) ||
    parsedCapital < 25_000 ||
    parsedCapital > 750_000 ||
    parsedCapital % 25_000 !== 0
  ) {
    invalidFields.push("capitalSought");
  }

  if (!email || !isValidEmail(email)) {
    invalidFields.push("email");
  }

  if (
    !name ||
    !isValidText(
      name,
      submissionFieldLimits.personName.minimum,
      submissionFieldLimits.personName.maximum,
    )
  ) {
    invalidFields.push("name");
  }

  if (!mobile || !isValidPhone(mobile)) {
    invalidFields.push("mobile");
  }

  if (office && !isValidPhone(office)) {
    invalidFields.push("office");
  }

  if (extraField1.length > submissionFieldLimits.honeypot.maximum) {
    invalidFields.push("form");
  }

  if (invalidFields.length > 0) {
    return { success: false, fields: [...new Set(invalidFields)] };
  }

  return {
    success: true,
    isSpam: extraField1.length > 0,
    data: {
      ...(businessName ? { businessName } : {}),
      ...(monthlyRevenue
        ? { monthlyRevenue: monthlyRevenue as LeadApplication["monthlyRevenue"] }
        : {}),
      ...(operatingYears
        ? { yearsOperating: operatingYears as LeadApplication["yearsOperating"] }
        : {}),
      capitalSought: parsedCapital,
      email: email!,
      name: name!,
      mobile: mobile!,
      ...(office ? { office } : {}),
    },
  };
}
