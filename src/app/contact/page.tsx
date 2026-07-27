import type { Metadata } from "next";
import Link from "next/link";

import { ScrollReveal } from "@/components/home/scroll-reveal";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { footerContent } from "@/content/home";
import { libreCaslonDisplay } from "@/lib/fonts";
import type { ContactInquiry } from "@/lib/contact-fields";

import { ContactForm } from "./contact-form";

const contactDescription =
  "Contact Express Capital about a general question, an existing request, a partnership, or a business funding opportunity.";

export const metadata: Metadata = {
  title: "Contact Express Capital",
  description: contactDescription,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Express Capital | Express Capital",
    description: contactDescription,
    url: "/contact",
    siteName: "Express Capital",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Express Capital | Express Capital",
    description: contactDescription,
  },
};

const utmKeys = ["source", "medium", "campaign", "term", "content"] as const;

function getFirstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getContactUtm(
  searchParams: Record<string, string | string[] | undefined>,
) {
  const utm: NonNullable<ContactInquiry["utm"]> = {};
  for (const key of utmKeys) {
    const value = getFirstValue(searchParams[`utm_${key}`]);
    if (value) utm[key] = value.slice(0, 200);
  }
  return Object.keys(utm).length > 0 ? utm : undefined;
}

function getApplicationHref(utm?: ContactInquiry["utm"]) {
  if (!utm) return "/#apply";
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(utm)) {
    if (value) params.set(`utm_${key}`, value);
  }
  return `/?${params.toString()}#apply`;
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const utm = getContactUtm(await searchParams);
  const applicationHref = getApplicationHref(utm);

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] text-[var(--color-charcoal)]">
      <ScrollReveal />
      <SiteHeader applyHref={applicationHref} />

      <main>
        <section className="border-b border-[var(--color-stone)] bg-[var(--color-cream)] px-4 pb-20 pt-[calc(var(--header-height)+5.5rem)] sm:px-6 sm:pb-24 sm:pt-[calc(var(--header-height)+6.5rem)] lg:px-8 lg:pb-28">
          <div className="motion-reveal mx-auto flex max-w-[1060px] flex-col items-center text-center" data-reveal>
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-olive-gray)] sm:text-[0.76rem]">
              Contact
            </p>
            <h1 className={`mt-5 max-w-[980px] text-[clamp(2.5rem,11vw,4rem)] font-normal leading-[0.96] tracking-[0] text-[var(--color-charcoal)] sm:mt-6 sm:text-[clamp(4rem,7vw,6.5rem)] ${libreCaslonDisplay.className}`}>
              <span className="block whitespace-nowrap">Start with the right</span>
              <span className="block whitespace-nowrap">conversation.</span>
            </h1>
            <p className="mt-7 max-w-[760px] text-base leading-[1.8] text-[var(--color-olive-gray)] sm:mt-8 sm:text-lg">
              Whether you have a general question, need help with an existing request, or want to discuss a partnership, our team will help direct the conversation.
            </p>
          </div>
        </section>

        <section className="bg-[var(--color-ivory)] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
              <div className="motion-reveal min-w-0" data-reveal>
                <ContactForm applicationHref={applicationHref} utm={utm} />
              </div>

              <aside className="motion-reveal border-t border-[var(--color-stone)] pt-9 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0" data-reveal>
                <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[var(--color-olive-gray)]">
                  Direct contact
                </p>
                <div className="mt-7 space-y-6 border-y border-[var(--color-stone)] py-7">
                  <div>
                    <p className="text-[0.66rem] uppercase tracking-[0.18em] text-[var(--color-olive-gray)]">
                      Email
                    </p>
                    <a className="mt-2 inline-flex text-sm text-[var(--color-charcoal)] transition hover:text-[var(--color-olive-gray)]" href={footerContent.emailHref}>
                      {footerContent.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-[0.66rem] uppercase tracking-[0.18em] text-[var(--color-olive-gray)]">
                      Phone
                    </p>
                    <a className="mt-2 inline-flex text-sm text-[var(--color-charcoal)] transition hover:text-[var(--color-olive-gray)]" href={footerContent.phoneHref}>
                      {footerContent.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-[0.66rem] uppercase tracking-[0.18em] text-[var(--color-olive-gray)]">
                      Hours
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-charcoal)]">
                      {footerContent.hours}
                    </p>
                  </div>
                </div>
                <p className="mt-7 text-xs leading-6 text-[var(--color-olive-gray)]">
                  Your information is used to respond to this inquiry. Review our{" "}
                  <Link className="underline decoration-[var(--color-stone)] underline-offset-4 transition hover:text-[var(--color-charcoal)]" href="/privacy">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
