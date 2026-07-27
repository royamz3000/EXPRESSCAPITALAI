import type { Metadata } from "next";
import Link from "next/link";

import { ScrollReveal } from "@/components/home/scroll-reveal";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { libreCaslonDisplay } from "@/lib/fonts";

const aboutDescription =
  "Express Capital works with established operators to understand how the business earns, moves, and grows, then structures capital around the opportunity at hand.";

export const metadata: Metadata = {
  title: "About Express Capital",
  description: aboutDescription,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Express Capital | Express Capital",
    description: aboutDescription,
    url: "/about",
    siteName: "Express Capital",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Express Capital | Express Capital",
    description: aboutDescription,
  },
};

const principles = [
  {
    number: "01",
    title: "Direct relationship",
    body: "Work with the people reviewing and structuring the request.",
  },
  {
    number: "02",
    title: "In-house judgment",
    body: "Cash flow, operating history, and the broader business picture are considered together.",
  },
  {
    number: "03",
    title: "Purpose-built terms",
    body: "Capital is structured around timing, revenue, and the intended use of funds.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-ivory)] text-[var(--color-charcoal)]">
      <ScrollReveal />
      <SiteHeader />

      <main>
        <section className="relative isolate overflow-hidden border-b border-[var(--color-stone)] bg-[var(--color-cream)] px-4 pb-24 pt-[calc(var(--header-height)+6rem)] sm:px-6 sm:pb-28 sm:pt-[calc(var(--header-height)+7rem)] lg:px-8 lg:pb-32">
          <div className="motion-reveal mx-auto flex max-w-[1100px] flex-col items-center text-center" data-reveal>
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-olive-gray)] sm:text-[0.76rem]">
              About Express Capital
            </p>
            <h1 className={`mt-5 max-w-[1040px] text-[clamp(2.15rem,11vw,4rem)] font-normal leading-[0.96] tracking-[0] text-[var(--color-charcoal)] sm:mt-6 sm:text-[clamp(4rem,7vw,6.75rem)] ${libreCaslonDisplay.className}`}>
              <span className="block whitespace-nowrap">Capital built around</span>
              <span className="block whitespace-nowrap">the business.</span>
            </h1>
            <p className="mt-7 max-w-[760px] text-base leading-[1.78] text-[var(--color-olive-gray)] sm:mt-8 sm:text-lg">
              Express Capital works with established operators to understand how the business earns, moves, and grows—then structures capital around the opportunity at hand.
            </p>
          </div>
        </section>

        <section className="bg-[var(--color-ivory)] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="motion-reveal mx-auto max-w-[920px] text-center" data-reveal>
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-olive-gray)] sm:text-[0.76rem]">
                Our approach
              </p>
              <h2 className={`mt-6 text-[2.75rem] font-normal leading-[1] tracking-[0] text-[var(--color-charcoal)] sm:text-[4.6rem] lg:text-[5.2rem] ${libreCaslonDisplay.className}`}>
                A more considered approach to business funding.
              </h2>
              <p className="mx-auto mt-7 max-w-[720px] text-base leading-[1.82] text-[var(--color-olive-gray)] sm:mt-8 sm:text-lg">
                Every business has its own operating rhythm, pressures, and opportunities. Our approach begins with understanding those realities before determining whether a capital structure fits.
              </p>
            </div>

            <div className="motion-stagger mt-14 border-y border-[var(--color-stone)] sm:mt-16 lg:grid lg:grid-cols-3 lg:divide-x lg:divide-[var(--color-stone)]" data-reveal>
              {principles.map((principle, index) => (
                <article
                  className={`motion-stagger-item py-9 sm:py-11 lg:px-9 lg:py-12 ${
                    index > 0 ? "border-t border-[var(--color-stone)] lg:border-t-0" : ""
                  }`}
                  key={principle.number}
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-olive-gray)]">
                    {principle.number}
                  </p>
                  <h3 className={`mt-5 text-[2rem] font-normal leading-[1.08] text-[var(--color-charcoal)] sm:text-[2.3rem] ${libreCaslonDisplay.className}`}>
                    {principle.title}
                  </h3>
                  <p className="mt-5 max-w-sm text-sm leading-[1.78] text-[var(--color-olive-gray)] sm:text-base">
                    {principle.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section data-header-theme="dark" className="border-y border-[var(--color-stone)]/18 bg-[var(--color-ink-navy)] px-4 py-20 text-[var(--color-cream)] sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="motion-reveal mx-auto max-w-[980px] text-center" data-reveal>
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-olive-gray-on-dark)] sm:text-[0.76rem]">
              Built for operators
            </p>
            <h2 className={`mt-6 text-[2.8rem] font-normal leading-[1] tracking-[0] text-[var(--color-cream)] sm:text-[4.75rem] lg:text-[5.35rem] ${libreCaslonDisplay.className}`}>
              For businesses already in motion.
            </h2>
            <p className="mx-auto mt-7 max-w-[760px] text-base leading-[1.8] text-[var(--color-stone)] sm:mt-8 sm:text-lg">
              Express Capital is designed for established businesses seeking capital for inventory, equipment, expansion, staffing, seasonal needs, or other defined operating opportunities.
            </p>
            <Link
              className="group mt-9 inline-flex min-h-11 items-center gap-3 text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-cream)] transition-colors hover:text-[var(--color-aged-brass)] focus-visible:text-[var(--color-aged-brass)]"
              href="/industries"
            >
              Explore industries
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </section>

        <section className="bg-[var(--color-cream)] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="motion-reveal mx-auto max-w-7xl border-y border-[var(--color-stone)] py-14 text-center sm:py-16 lg:py-20" data-reveal>
            <h2 className={`mx-auto max-w-[940px] text-[2.65rem] font-normal leading-[1.02] tracking-[0] text-[var(--color-charcoal)] sm:text-[4.4rem] lg:text-[5rem] ${libreCaslonDisplay.className}`}>
              When the opportunity is clear, capital should be ready.
            </h2>
            <Link
              className="mt-9 inline-flex h-12 items-center justify-center rounded-[16px] border border-[var(--color-charcoal)] bg-[var(--color-charcoal)] px-7 text-[0.76rem] uppercase tracking-[0.16em] text-[var(--color-cream)] transition hover:bg-transparent hover:text-[var(--color-charcoal)] focus:outline-none focus:ring-2 focus:ring-[var(--color-olive-gray)] focus:ring-offset-2 focus:ring-offset-[var(--color-cream)]"
              href="/#apply"
            >
              Request an advance
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
