import type { Metadata } from "next";
import Link from "next/link";

import { ScrollReveal } from "@/components/home/scroll-reveal";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { faqItems } from "@/lib/faq-content";
import { libreCaslonDisplay } from "@/lib/fonts";
import { createFaqJsonLd } from "@/lib/seo";

import { FaqList } from "./faq-list";

const faqDescription =
  "Learn about the Express Capital request process, underwriting, documents, funding, repayment, and existing applications.";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: faqDescription,
  alternates: { canonical: "/resources/faq" },
  openGraph: {
    title: "Frequently Asked Questions | Express Capital",
    description: faqDescription,
    url: "/resources/faq",
    siteName: "Express Capital",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | Express Capital",
    description: faqDescription,
  },
};

const faqJsonLd = createFaqJsonLd(faqItems);
const utmKeys = ["source", "medium", "campaign", "term", "content"] as const;

function getFirstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getApplicationHref(
  searchParams: Record<string, string | string[] | undefined>,
) {
  const params = new URLSearchParams();

  for (const key of utmKeys) {
    const value = getFirstValue(searchParams[`utm_${key}`]);
    if (value) params.set(`utm_${key}`, value.slice(0, 200));
  }

  const query = params.toString();
  return query ? `/?${query}#apply` : "/#apply";
}

export default async function FaqPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const applicationHref = getApplicationHref(await searchParams);

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] text-[var(--color-charcoal)]">
      <JsonLd data={faqJsonLd} id="faq-page-json-ld" />
      <ScrollReveal />
      <SiteHeader />

      <main>
        <section className="border-b border-[var(--color-stone)] bg-[var(--color-cream)] px-4 pb-20 pt-[calc(var(--header-height)+5.5rem)] sm:px-6 sm:pb-24 sm:pt-[calc(var(--header-height)+6.5rem)] lg:px-8 lg:pb-28">
          <div
            className="motion-reveal mx-auto flex max-w-[1080px] flex-col items-center text-center"
            data-reveal
          >
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-olive-gray)] sm:text-[0.76rem] sm:tracking-[0.22em]">
              Frequently asked questions
            </p>
            <h1
              className={`mt-5 text-[clamp(1.8rem,9vw,4rem)] font-normal leading-[0.98] tracking-[0] text-[var(--color-charcoal)] sm:mt-6 sm:text-[clamp(4rem,7vw,6.5rem)] ${libreCaslonDisplay.className}`}
            >
              <span className="block whitespace-nowrap">Clear answers before</span>
              <span className="block whitespace-nowrap">you move forward.</span>
            </h1>
            <p className="mt-7 max-w-[720px] text-base leading-[1.8] text-[var(--color-olive-gray)] sm:mt-8 sm:text-lg">
              Learn more about the request process, underwriting, documents,
              funding, and existing applications.
            </p>
          </div>
        </section>

        <section className="bg-[var(--color-ivory)] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <FaqList />
          </div>
        </section>

        <section
          className="scroll-mt-[var(--header-height)] border-y border-[var(--color-stone)]/18 bg-[var(--color-ink-navy)] px-4 py-20 text-[var(--color-cream)] sm:px-6 sm:py-24 lg:px-8 lg:py-28"
          data-header-theme="dark"
          id="initial-questions"
        >
          <div
            className="motion-reveal mx-auto max-w-[900px] text-center"
            data-reveal
          >
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-olive-gray-on-dark)]">
              Initial questions
            </p>
            <h2
              className={`mt-6 text-[2.75rem] font-normal leading-[1] text-[var(--color-cream)] sm:text-[4.75rem] lg:text-[5.25rem] ${libreCaslonDisplay.className}`}
            >
              Still need help?
            </h2>
            <p className="mx-auto mt-7 max-w-[620px] text-base leading-[1.8] text-[var(--color-stone)] sm:text-lg">
              Contact the team about a general question or an existing request.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <Link
                className="group inline-flex min-h-11 items-center gap-3 text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-cream)] transition-colors hover:text-[var(--color-aged-brass)] focus-visible:text-[var(--color-aged-brass)]"
                href="/contact"
              >
                Contact us
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none"
                >
                  →
                </span>
              </Link>
              <Link
                className="inline-flex h-12 items-center justify-center rounded-[16px] border border-[var(--color-cream)] bg-[var(--color-cream)] px-7 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--color-ink-navy)] transition-colors hover:bg-transparent hover:text-[var(--color-cream)] focus-visible:bg-transparent focus-visible:text-[var(--color-cream)]"
                href={applicationHref}
              >
                Request an advance
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
