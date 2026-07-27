import type { Metadata } from "next";
import Link from "next/link";

import { ScrollReveal } from "@/components/home/scroll-reveal";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { libreCaslonDisplay } from "@/lib/fonts";

const thankYouDescription =
  "Your request has been received. An Express Capital representative will be in touch shortly.";

export const metadata: Metadata = {
  title: "Request received",
  description: thankYouDescription,
  alternates: {
    canonical: "/apply/thank-you",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ApplyThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-ivory)] text-[var(--color-charcoal)]">
      <ScrollReveal />
      <SiteHeader applyHref="/apply" />

      <main className="flex flex-1 items-center px-4 pb-24 pt-[calc(var(--header-height)+6rem)] sm:px-6 sm:pb-28 sm:pt-[calc(var(--header-height)+7rem)] lg:px-8">
        <div
          className="motion-reveal mx-auto flex max-w-[720px] flex-col items-center text-center"
          data-reveal
        >
          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-olive-gray)] sm:text-[0.76rem]">
            Request received
          </p>
          <h1
            className={`mt-6 text-[clamp(2.4rem,8vw,3.8rem)] font-normal leading-[1.02] text-[var(--color-charcoal)] ${libreCaslonDisplay.className}`}
          >
            Thank you — your request is in.
          </h1>
          <p className="mt-7 max-w-[560px] text-base leading-[1.8] text-[var(--color-olive-gray)] sm:text-lg">
            An Express Capital representative will be in touch with you shortly.
            If you would like to move faster, you can go ahead and complete the
            full application now.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              className="inline-flex h-12 items-center justify-center rounded-[16px] border border-[var(--color-charcoal)] bg-[var(--color-charcoal)] px-7 text-[0.76rem] uppercase tracking-[0.16em] text-[var(--color-cream)] transition hover:bg-transparent hover:text-[var(--color-charcoal)] focus:outline-none focus:ring-2 focus:ring-[var(--color-olive-gray)] focus:ring-offset-2 focus:ring-offset-[var(--color-ivory)]"
              href="/application"
            >
              Complete the full application
            </Link>
            <Link
              className="inline-flex h-12 items-center justify-center px-4 text-[0.76rem] uppercase tracking-[0.16em] text-[var(--color-olive-gray)] underline decoration-[var(--color-stone)] underline-offset-4 transition hover:text-[var(--color-charcoal)]"
              href="/"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
