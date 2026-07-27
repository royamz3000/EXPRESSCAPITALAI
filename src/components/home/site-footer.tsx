import Image from "next/image";
import Link from "next/link";

import { footerContent } from "@/content/home";

const footerNavigation = [
  { href: "/#how", label: "How it works" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/resources/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/#apply", label: "Apply" },
] as const;

export function SiteFooter() {
  return (
    <footer data-header-theme="dark" data-header-surface="navy" className="relative overflow-hidden border-t border-[var(--color-stone)]/18 bg-[var(--color-ink-navy)] px-4 pt-[calc(var(--header-height)+2rem)] pb-36 text-[var(--color-cream)] sm:px-6 sm:pt-[calc(var(--header-height)+2.5rem)] sm:pb-48 lg:px-8 lg:pt-0 lg:pb-72">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-6 px-4 sm:bottom-7 sm:px-6 lg:bottom-8 lg:px-8">
        <div className="mx-auto max-w-7xl whitespace-nowrap text-center font-display text-[clamp(1.1rem,5.65vw,4.9rem)] uppercase leading-none tracking-[clamp(0.08em,0.62vw,0.24em)] text-[var(--color-cream)] opacity-[0.04]">
          EXPRESS CAPITAL AI
        </div>
      </div>
      <div className="motion-fade relative mx-auto max-w-7xl lg:top-32" data-reveal>
        <div className="h-px w-full bg-[var(--color-stone)]/20" />

        <div className="grid gap-10 py-10 sm:gap-12 sm:py-14 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-start lg:py-16">
          <div className="max-w-xl">
            <Link
              aria-label="Express Capital home"
              className="inline-flex items-center gap-4 sm:gap-5"
              href="/"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-stone)]/22 sm:h-16 sm:w-16">
                <Image
                  alt=""
                  aria-hidden="true"
                  className="h-auto w-8 opacity-90 sm:w-10"
                  height={80}
                  src="/favicon.png"
                  width={80}
                />
              </span>
              <span className="font-display text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-stone)] sm:text-[0.78rem] sm:tracking-[0.24em]">
                Express Capital
              </span>
            </Link>
            <p className="mt-7 max-w-md font-display text-[1.26rem] leading-[1.34] text-[var(--color-cream)] sm:mt-8 sm:text-[1.55rem]">
              {footerContent.brandLine}
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="border-t border-[var(--color-stone)]/14 pt-8 lg:min-w-44 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
          >
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-[var(--color-olive-gray-on-dark)]">
              Navigate
            </p>
            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 text-sm leading-6 text-[var(--color-cream)] sm:grid-cols-3 lg:grid-cols-1">
              {footerNavigation.map((item) => (
                <Link
                  className="transition hover:text-[var(--color-aged-brass)]"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="border-t border-[var(--color-stone)]/14 pt-8 lg:min-w-80 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-[var(--color-olive-gray-on-dark)]">{footerContent.contactLabel}</p>
            <div className="mt-6 flex flex-col gap-3 text-sm leading-6 text-[var(--color-cream)]">
              <a className="transition hover:text-[var(--color-aged-brass)]" href={footerContent.emailHref}>
                {footerContent.email}
              </a>
              <a className="transition hover:text-[var(--color-aged-brass)]" href={footerContent.phoneHref}>
                {footerContent.phone}
              </a>
              <span className="text-[var(--color-stone)]">{footerContent.hours}</span>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-[var(--color-stone)]/16" />

        <div className="grid gap-9 pt-10 lg:grid-cols-[minmax(0,640px)_auto] lg:items-start lg:justify-between">
          <p className="max-w-[640px] text-[0.72rem] leading-[1.72] text-[var(--color-stone)]/72 sm:text-[0.68rem]">
            {footerContent.legal}
          </p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-5 gap-y-4 text-[0.66rem] uppercase tracking-[0.2em] text-[var(--color-stone)] lg:justify-end">
            <Link className="transition hover:text-[var(--color-cream)]" href="/privacy">
              {footerContent.privacyLabel}
            </Link>
            <Link className="transition hover:text-[var(--color-cream)]" href="/disclaimer">
              {footerContent.termsLabel}
            </Link>
            <span className="basis-full leading-[1.8] tracking-[0.18em] sm:basis-auto sm:tracking-[0.2em]">{footerContent.copyright}</span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
