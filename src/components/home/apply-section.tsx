"use client";

import {
  CSSProperties,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { revenueRanges, yearsOperating } from "@/lib/lead-fields";
import { libreCaslonDisplay } from "@/lib/fonts";
import { submitJson, type SubmissionStatus } from "@/lib/submission-client";

const defaultSubmissionError =
  "We could not submit your request. Please try again or contact an advisor directly.";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function Eyebrow({ children, tone = "light" }: { children: string; tone?: "light" | "dark" }) {
  return (
    <p
      className={`text-[0.76rem] uppercase tracking-[0.2em] ${
        tone === "dark" ? "text-[#a8a39b]" : "text-[#6f7354]"
      }`}
    >
      {children}
    </p>
  );
}

export function ApplySection() {
  const [capital, setCapital] = useState(150000);
  const [openSelectName, setOpenSelectName] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const idempotencyKeyRef = useRef<string | null>(null);
  const capitalLabel = useMemo(() => formatCurrency(capital), [capital]);
  const capitalProgress = useMemo(
    () => ((capital - 25000) / (750000 - 25000)) * 100,
    [capital],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionStatus === "submitting" || submissionStatus === "success") {
      return;
    }

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    payload.capitalSought = String(capital);

    if (!payload.monthlyRevenue || !payload.yearsOperating) {
      setSubmissionStatus("error");
      setSubmissionMessage("Select monthly revenue and years operating to continue.");
      return;
    }

    setSubmissionStatus("submitting");
    setSubmissionMessage("Submitting your request...");

    idempotencyKeyRef.current ??= crypto.randomUUID();
    const result = await submitJson({
      endpoint: "/api/lead-request",
      fallbackMessage: defaultSubmissionError,
      idempotencyKey: idempotencyKeyRef.current,
      payload,
    });

    if (result.success) {
      setSubmissionStatus("success");
      setSubmissionMessage(
        "Request received. An Express Capital advisor will review the opportunity and follow up directly.",
      );
    } else {
      setSubmissionStatus("error");
      setSubmissionMessage(result.message);
    }
  }

  return (
    <section
      id="apply"
      className="relative scroll-mt-[var(--header-height)] overflow-hidden border-y border-[rgba(49,42,32,0.1)] bg-[#f4efe4] px-4 py-20 text-[#221d17] sm:px-6 sm:py-28 lg:px-8"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(150,139,106,0.08),transparent_42%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="motion-reveal mx-auto flex max-w-4xl flex-col items-center text-center" data-reveal>
          <Eyebrow>Begin the Conversation</Eyebrow>
          <h2 className={`mt-8 flex flex-col text-4xl font-normal leading-[1.04] text-[#221d17] sm:text-6xl lg:text-[4.6rem] ${libreCaslonDisplay.className}`}>
            <span>Start your capital request.</span>
          </h2>
          <p className="mt-9 max-w-xl text-base leading-[1.75] text-[#62584a]">
            Share the essentials. An advisor will review your business directly and respond with next steps.
          </p>
        </div>

        <form
          action="/api/lead-request"
          aria-busy={submissionStatus === "submitting"}
          className="motion-stagger mx-auto mt-16 max-w-5xl space-y-9"
          data-reveal
          method="post"
          onSubmit={handleSubmit}
        >
          <div
            aria-hidden="true"
            className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden opacity-0"
          >
            <label>
              Leave this field blank
              <input
                autoComplete="off"
                name="companyWebsite"
                tabIndex={-1}
                type="text"
              />
            </label>
          </div>
          <div className={`motion-stagger-item relative grid gap-x-10 gap-y-9 sm:grid-cols-2 ${openSelectName === "monthlyRevenue" ? "z-[120]" : "z-40"}`}>
            <TextField
              autoComplete="organization"
              label="Business name"
              name="businessName"
              placeholder="Atelier Nord LLC"
              required
            />
            <SelectField
              label="Monthly revenue"
              name="monthlyRevenue"
              onOpenChange={setOpenSelectName}
              placeholder="Select range"
              options={revenueRanges}
              validationStatus={submissionStatus}
            />
          </div>
          <div className={`motion-stagger-item relative grid gap-x-10 gap-y-9 sm:grid-cols-2 ${openSelectName === "yearsOperating" ? "z-[120]" : "z-30"}`}>
            <SelectField
              label="Years operating"
              name="yearsOperating"
              onOpenChange={setOpenSelectName}
              placeholder="Select"
              options={yearsOperating}
              validationStatus={submissionStatus}
            />
            <CapitalField
              capital={capital}
              capitalLabel={capitalLabel}
              capitalProgress={capitalProgress}
              onCapitalChange={setCapital}
            />
          </div>
          <div className="motion-stagger-item relative z-20 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            <TextField autoComplete="email" label="Email" name="email" placeholder="you@business.com" required type="email" />
            <TextField autoComplete="name" label="Your name" name="name" placeholder="Full name" required />
          </div>
          <div className="motion-stagger-item relative z-10 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            <TextField autoComplete="tel" label="Mobile" name="mobile" placeholder="(555) 000-0000" required type="tel" />
            <TextField autoComplete="tel" label="Office" name="office" placeholder="(555) 000-0000" required type="tel" />
          </div>
          <div className="motion-stagger-item relative z-0 pt-3">
            <div className="flex justify-center">
              <button
                className="inline-flex h-11 w-full max-w-[22rem] items-center justify-center rounded-[14px] border border-[#2a261f] bg-[#2a261f] px-5 text-[0.66rem] uppercase tracking-[0.11em] text-[#f5efe4] transition hover:bg-[#171411] disabled:cursor-wait disabled:opacity-60 sm:w-auto sm:min-w-[17rem] sm:px-8 sm:text-[0.72rem] sm:tracking-[0.17em]"
                disabled={
                  submissionStatus === "submitting" ||
                  submissionStatus === "success"
                }
                type="submit"
              >
                <span className="whitespace-nowrap leading-none">
                  {submissionStatus === "submitting"
                    ? "Submitting request"
                    : submissionStatus === "success"
                      ? "Request received"
                      : "Request indicative terms"}
                </span>
              </button>
            </div>
            <p
              aria-live="polite"
              className={`mx-auto mt-4 min-h-5 max-w-2xl text-center text-sm leading-6 ${
                submissionStatus === "error" ? "text-[#62584a]" : "text-[#4d473b]"
              }`}
              id="application-status"
              role={submissionStatus === "error" ? "alert" : "status"}
            >
              {submissionMessage}
            </p>
            <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-6 text-[#6b6254]">
              By submitting, you agree to be contacted by an Express Capital advisor. No obligation. Indicative terms only. Subject to underwriting.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function CapitalField({
  capital,
  capitalLabel,
  capitalProgress,
  onCapitalChange,
}: {
  capital: number;
  capitalLabel: string;
  capitalProgress: number;
  onCapitalChange: (value: number) => void;
}) {
  return (
    <div className="block">
      <input name="capitalSought" type="hidden" value={capital} />
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs uppercase tracking-[0.19em] text-[#6f7354]">Requested capital</span>
        <span className="font-display text-[1.55rem] leading-none text-[#221d17]">{capitalLabel}</span>
      </div>
      <input
        aria-label="Requested capital"
        className="capital-range mt-4 w-full"
        max="750000"
        min="25000"
        onChange={(event) => onCapitalChange(Number(event.target.value))}
        step="25000"
        style={{ "--capital-progress": `${capitalProgress}%` } as CSSProperties}
        type="range"
        value={capital}
      />
      <div className="mt-1 flex justify-between text-[0.64rem] uppercase tracking-[0.14em] text-[#7a7163]">
        <span>$25K</span>
        <span>$750K</span>
      </div>
    </div>
  );
}

function TextField({
  autoComplete,
  label,
  name,
  placeholder,
  required = false,
  type = "text",
}: {
  autoComplete?: string;
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.19em] text-[#6f7354]">{label}</span>
      <input
        autoComplete={autoComplete}
        className="mt-3 h-11 w-full rounded-none border-0 border-b border-[rgba(49,42,32,0.18)] bg-transparent px-0 text-base text-[#221d17] outline-none transition placeholder:text-[#7a7163] focus:border-[#6f7354]"
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  onOpenChange,
  options,
  placeholder,
  validationStatus,
}: {
  label: string;
  name: string;
  onOpenChange: (name: string | null) => void;
  options: readonly string[];
  placeholder: string;
  validationStatus: "idle" | "submitting" | "success" | "error";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listboxId = useId();
  const labelId = useId();
  const valueId = useId();
  const fieldRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const isInvalid = validationStatus === "error" && !value;

  useEffect(() => {
    onOpenChange(isOpen ? name : null);

    return () => {
      if (isOpen) {
        onOpenChange(null);
      }
    };
  }, [isOpen, name, onOpenChange]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!fieldRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      optionRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex, isOpen]);

  function handleButtonKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const selectedIndex = options.indexOf(value);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
      setIsOpen(true);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(selectedIndex >= 0 ? selectedIndex : options.length - 1);
      setIsOpen(true);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
      setIsOpen(true);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(options.length - 1);
      setIsOpen(true);
    }
  }

  function selectOption(option: string) {
    setValue(option);
    setIsOpen(false);
    requestAnimationFrame(() => buttonRef.current?.focus());
  }

  function handleOptionKeyDown(
    event: KeyboardEvent<HTMLDivElement>,
    index: number,
  ) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index + 1) % options.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index - 1 + options.length) % options.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(options.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectOption(options[index]);
    } else if (event.key === "Tab") {
      setIsOpen(false);
    }
  }

  return (
    <div className={`relative block ${isOpen ? "z-[130]" : "z-0"}`} ref={fieldRef}>
      <span className="text-xs uppercase tracking-[0.19em] text-[#6f7354]" id={labelId}>
        {label}
      </span>
      <span className="sr-only" id={`${labelId}-requirement`}>
        required
      </span>
      <input name={name} type="hidden" value={value} />
      <button
        aria-controls={listboxId}
        aria-describedby={isInvalid ? "application-status" : undefined}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={`${labelId} ${valueId} ${labelId}-requirement`}
        className="mt-3 flex h-11 w-full items-center justify-between border-b border-[rgba(49,42,32,0.18)] bg-transparent px-0 text-left text-base text-[#221d17] transition hover:border-[rgba(49,42,32,0.32)] focus:border-[#6f7354]"
        onClick={() => {
          const selectedIndex = options.indexOf(value);
          setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
          setIsOpen((open) => !open);
        }}
        onKeyDown={handleButtonKeyDown}
        ref={buttonRef}
        type="button"
      >
        <span
          className={value ? "text-[#221d17]" : "text-[#7a7163]"}
          id={valueId}
        >
          {value || placeholder}
        </span>
        <span
          aria-hidden="true"
          className={`text-sm text-[#6f7354] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ↓
        </span>
      </button>
      {isOpen ? (
        <div
          className="absolute left-0 right-0 top-full z-[140] mt-2 overflow-hidden rounded-[14px] border border-[rgba(49,42,32,0.18)] bg-[#fbf7ef] py-2 opacity-100 shadow-[0_18px_44px_rgba(49,42,32,0.14)] [background-color:#fbf7ef]"
          id={listboxId}
          aria-labelledby={labelId}
          role="listbox"
        >
          {options.map((option, index) => (
            <div
              aria-selected={value === option}
              className="flex min-h-11 w-full items-center justify-between px-4 text-left text-sm text-[#221d17] transition hover:bg-[#eee7da] focus:bg-[#eee7da]"
              id={`${listboxId}-option-${index}`}
              key={option}
              onClick={() => selectOption(option)}
              onFocus={() => setActiveIndex(index)}
              onKeyDown={(event) => handleOptionKeyDown(event, index)}
              onMouseMove={() => setActiveIndex(index)}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              role="option"
              tabIndex={activeIndex === index ? 0 : -1}
            >
              <span>{option}</span>
              {value === option ? (
                <span aria-hidden="true" className="text-[#6f7354]">
                  ✓
                </span>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
