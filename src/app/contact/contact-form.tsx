"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";

import { footerContent } from "@/content/home";
import {
  contactRequiresBusinessName,
  contactSelectorOptions,
  validateContactFormFields,
  type ContactFieldErrors,
  type ContactFieldName,
  type ContactInquiry,
  type ContactInquirySelection,
} from "@/lib/contact-fields";
import { submitJson, type SubmissionStatus } from "@/lib/submission-client";

const defaultSubmissionError = `We could not send your message. Please try again or email ${footerContent.email} directly.`;

export function ContactForm({
  applicationHref,
  utm,
}: {
  applicationHref: string;
  utm?: ContactInquiry["utm"];
}) {
  const [inquiryType, setInquiryType] =
    useState<ContactInquirySelection>("general");
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const idempotencyKeyRef = useRef<string | null>(null);
  const isFundingRequest = inquiryType === "funding_request";
  const requiresBusinessName =
    !isFundingRequest && contactRequiresBusinessName(inquiryType);

  function resetSubmissionState() {
    if (submissionStatus === "submitting") return;

    idempotencyKeyRef.current = null;
    setSubmissionStatus("idle");
    setSubmissionMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      isFundingRequest ||
      submissionStatus === "submitting" ||
      submissionStatus === "success"
    ) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const values: Record<ContactFieldName, string> = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      businessName: String(formData.get("businessName") ?? ""),
      message: String(formData.get("message") ?? ""),
    };
    const contactInquiryType = inquiryType as ContactInquiry["inquiryType"];
    const errors = validateContactFormFields(values, contactInquiryType);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmissionStatus("error");
      setSubmissionMessage("Review the highlighted fields and try again.");
      return;
    }

    setFieldErrors({});
    setSubmissionStatus("submitting");
    setSubmissionMessage("Sending your message...");

    const phone = values.phone.trim();
    const businessName = values.businessName.trim();
    const payload: ContactInquiry & { companyWebsite?: string } = {
      inquiryType: contactInquiryType,
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      ...(phone ? { phone } : {}),
      ...(businessName ? { businessName } : {}),
      message: values.message.trim(),
      sourcePath: window.location.pathname,
      ...(utm ? { utm } : {}),
      companyWebsite: String(formData.get("companyWebsite") ?? ""),
    };

    idempotencyKeyRef.current ??= crypto.randomUUID();
    const result = await submitJson({
      endpoint: "/api/contact-inquiry",
      fallbackMessage: defaultSubmissionError,
      idempotencyKey: idempotencyKeyRef.current,
      payload,
    });

    if (result.success) {
      setSubmissionStatus("success");
      setSubmissionMessage(
        "Message received. An Express Capital advisor will follow up directly.",
      );
    } else {
      setSubmissionStatus("error");
      setSubmissionMessage(result.message);
    }
  }

  return (
    <div>
      <fieldset>
        <legend className="text-[0.76rem] uppercase tracking-[0.2em] text-[var(--color-olive-gray)]">
          What can we help with?
        </legend>
        <div className="mt-5 grid border-y border-[var(--color-stone)] sm:grid-cols-2 lg:grid-cols-4">
          {contactSelectorOptions.map((option, index) => (
            <label
              className={`relative cursor-pointer ${
                index > 0 ? "border-t border-[var(--color-stone)]" : ""
              } ${index === 1 ? "sm:border-t-0" : ""} ${
                index % 2 === 1 ? "sm:border-l sm:border-[var(--color-stone)]" : ""
              } ${index > 0 ? "lg:border-l lg:border-t-0 lg:border-[var(--color-stone)]" : ""}`}
              key={option.value}
            >
              <input
                checked={inquiryType === option.value}
                className="peer sr-only"
                name="inquirySelector"
                onChange={() => {
                  setInquiryType(option.value);
                  setFieldErrors({});
                  resetSubmissionState();
                }}
                type="radio"
                value={option.value}
              />
              <span className="flex min-h-14 items-center justify-center px-4 py-3 text-center text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-olive-gray)] transition-colors peer-checked:bg-[var(--color-charcoal)] peer-checked:text-[var(--color-cream)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[-3px] peer-focus-visible:outline-[var(--color-olive-gray)]">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-10 grid min-h-[58rem] sm:min-h-[40rem]">
        {isFundingRequest ? (
          <div className="col-start-1 row-start-1 flex items-center border-y border-[var(--color-stone)] py-12 text-center">
            <div className="mx-auto max-w-xl">
              <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[var(--color-olive-gray)]">
                Funding request
              </p>
              <h2 className="mt-5 font-display text-[2.45rem] font-normal leading-[1.04] text-[var(--color-charcoal)] sm:text-[3.4rem]">
                Start with the capital request.
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base leading-[1.75] text-[var(--color-olive-gray)]">
                Funding inquiries are reviewed through the existing application so the underwriting team receives the information needed to respond.
              </p>
              <Link
                className="mt-8 inline-flex h-12 items-center justify-center rounded-[16px] border border-[var(--color-charcoal)] bg-[var(--color-charcoal)] px-7 text-[0.76rem] uppercase tracking-[0.16em] text-[var(--color-cream)] transition hover:bg-transparent hover:text-[var(--color-charcoal)] focus:outline-none focus:ring-2 focus:ring-[var(--color-olive-gray)] focus:ring-offset-2 focus:ring-offset-[var(--color-ivory)]"
                href={applicationHref}
              >
                Request an advance
              </Link>
            </div>
          </div>
        ) : (
          <form
            aria-busy={submissionStatus === "submitting"}
            className="col-start-1 row-start-1"
            noValidate
            onChange={resetSubmissionState}
            onSubmit={handleSubmit}
          >
            <input name="inquiryType" type="hidden" value={inquiryType} />
            <div aria-hidden="true" className="absolute left-[-10000px] h-px w-px overflow-hidden opacity-0">
              <label>
                Leave this field blank
                <input autoComplete="off" name="companyWebsite" tabIndex={-1} type="text" />
              </label>
            </div>

            <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
              <ContactTextField
                autoComplete="name"
                error={fieldErrors.fullName}
                label="Full name"
                name="fullName"
                placeholder="Full name"
                required
              />
              <ContactTextField
                autoComplete="email"
                error={fieldErrors.email}
                label="Email address"
                name="email"
                placeholder="you@business.com"
                required
                type="email"
              />
              <ContactTextField
                autoComplete="tel"
                error={fieldErrors.phone}
                label="Phone number"
                name="phone"
                placeholder="(555) 000-0000"
                type="tel"
              />
              <ContactTextField
                autoComplete="organization"
                error={fieldErrors.businessName}
                label={`Business name${requiresBusinessName ? "" : " (optional)"}`}
                name="businessName"
                placeholder="Business name"
                required={requiresBusinessName}
              />
            </div>

            <ContactTextArea
              error={fieldErrors.message}
              label="Message"
              name="message"
              placeholder="Tell us how we can help."
              required
            />

            <div className="mt-9 flex flex-col items-center">
              <button
                className="inline-flex h-12 w-full max-w-[22rem] items-center justify-center rounded-[14px] border border-[var(--color-charcoal)] bg-[var(--color-charcoal)] px-6 text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-cream)] transition hover:bg-[var(--color-ink)] disabled:cursor-wait disabled:opacity-60 sm:w-auto sm:min-w-[17rem]"
                disabled={
                  submissionStatus === "submitting" ||
                  submissionStatus === "success"
                }
                type="submit"
              >
                {submissionStatus === "submitting"
                  ? "Sending message"
                  : submissionStatus === "success"
                    ? "Message received"
                    : "Send inquiry"}
              </button>
              <p
                aria-live="polite"
                className="mt-4 min-h-6 max-w-xl text-center text-sm leading-6 text-[var(--color-olive-gray)]"
                role={submissionStatus === "error" ? "alert" : "status"}
              >
                {submissionMessage}
              </p>
              <p className="mt-3 text-center text-xs leading-6 text-[var(--color-olive-gray)]">
                You can also email{" "}
                <a className="underline decoration-[var(--color-stone)] underline-offset-4 transition hover:text-[var(--color-charcoal)]" href={footerContent.emailHref}>
                  {footerContent.email}
                </a>
                .
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function ContactTextField({
  autoComplete,
  error,
  label,
  name,
  placeholder,
  required = false,
  type = "text",
}: {
  autoComplete?: string;
  error?: string;
  label: string;
  name: ContactFieldName;
  placeholder: string;
  required?: boolean;
  type?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.19em] text-[var(--color-olive-gray)]">
        {label}
      </span>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? true : undefined}
        autoComplete={autoComplete}
        className="mt-3 h-11 w-full border-0 border-b border-[var(--color-stone)] bg-transparent px-0 text-base text-[var(--color-charcoal)] outline-none transition placeholder:text-[var(--color-olive-gray)]/75 focus:border-[var(--color-olive-gray)]"
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
      <span className="mt-2 block min-h-5 text-xs leading-5 text-[var(--color-olive-gray)]" id={errorId}>
        {error}
      </span>
    </label>
  );
}

function ContactTextArea({
  error,
  label,
  name,
  placeholder,
  required = false,
}: {
  error?: string;
  label: string;
  name: ContactFieldName;
  placeholder: string;
  required?: boolean;
}) {
  const errorId = `${name}-error`;
  return (
    <label className="mt-7 block">
      <span className="text-xs uppercase tracking-[0.19em] text-[var(--color-olive-gray)]">
        {label}
      </span>
      <textarea
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? true : undefined}
        className="mt-3 min-h-32 w-full resize-y border-0 border-b border-[var(--color-stone)] bg-transparent px-0 py-3 text-base leading-7 text-[var(--color-charcoal)] outline-none transition placeholder:text-[var(--color-olive-gray)]/75 focus:border-[var(--color-olive-gray)]"
        name={name}
        placeholder={placeholder}
        required={required}
      />
      <span className="mt-2 block min-h-5 text-xs leading-5 text-[var(--color-olive-gray)]" id={errorId}>
        {error}
      </span>
    </label>
  );
}
