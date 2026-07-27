"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function SiteHeader({ applyHref = "/application" }: { applyHref?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOverDarkSection, setIsOverDarkSection] = useState(false);
  const [isOverNavySection, setIsOverNavySection] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function updateHeaderState() {
      setIsScrolled(window.scrollY > 16);
      const headerHeight = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--header-height"),
      ) || 60;
      const probeY = Math.min(window.innerHeight - 1, headerHeight + 2);
      const darkSection = Array.from(document.querySelectorAll<HTMLElement>("[data-header-theme='dark']")).find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= probeY && rect.bottom > probeY;
      });

      setIsOverDarkSection(Boolean(darkSection));
      setIsOverNavySection(darkSection?.dataset.headerSurface === "navy");
    }

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("resize", updateHeaderState);

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    function closeDesktopMenu() {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", closeDesktopMenu);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", closeDesktopMenu);
    };
  }, [isMenuOpen]);

  const isHeaderActive = isScrolled || isMenuOpen;
  const isDarkHeader = isOverDarkSection && isHeaderActive;
  const isNavyHeader = isDarkHeader && isOverNavySection;
  const navLinkClass = isDarkHeader ? "transition hover:text-[var(--color-cream)]" : "transition hover:text-[var(--color-ink)]";
  const navTextClass = isDarkHeader ? "text-[var(--color-stone)]" : "text-[var(--color-charcoal)]";
  const logoTextClass = isDarkHeader ? "text-[var(--color-stone)]" : "text-[var(--color-charcoal)]";
  const separatorClass = isDarkHeader ? "bg-[var(--color-stone)]/45" : "bg-[var(--color-olive-gray)]/50";
  const applyClass = isDarkHeader
    ? "inline-flex h-9 items-center justify-center rounded-[14px] border border-[var(--color-cream)]/18 bg-[var(--color-cream)] px-4 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-ink)] transition hover:bg-transparent hover:text-[var(--color-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--color-stone)] focus:ring-offset-2 focus:ring-offset-[var(--color-ink)] sm:h-10 sm:rounded-[16px] sm:px-5 sm:text-[0.75rem]"
    : "inline-flex h-9 items-center justify-center rounded-[14px] border border-[var(--color-charcoal)] bg-[var(--color-charcoal)] px-4 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-cream)] transition hover:bg-transparent hover:text-[var(--color-charcoal)] focus:outline-none focus:ring-2 focus:ring-[var(--color-olive-gray)] focus:ring-offset-2 focus:ring-offset-[var(--color-ivory)] sm:h-10 sm:rounded-[16px] sm:px-5 sm:text-[0.75rem]";
  const mobileMenuClass = isDarkHeader
    ? `absolute inset-x-0 top-full grid border-y border-[var(--color-stone)]/18 px-4 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--color-stone)] shadow-[0_18px_34px_rgba(0,0,0,0.18)] transition-[grid-template-rows,opacity,transform] duration-200 ease-out lg:hidden ${isNavyHeader ? "bg-[var(--color-ink-navy)]" : "bg-[var(--color-ink)]"}`
    : "absolute inset-x-0 top-full grid border-y border-[var(--color-stone)] bg-[var(--color-ivory)] px-4 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--color-charcoal)] shadow-[0_18px_34px_rgba(11,11,10,0.06)] transition-[grid-template-rows,opacity,transform] duration-200 ease-out lg:hidden";
  const mobileLinkClass = isDarkHeader
    ? "flex min-h-11 items-center justify-between border-b border-[var(--color-stone)]/14 transition hover:text-[var(--color-cream)]"
    : "flex min-h-11 items-center justify-between border-b border-[var(--color-stone)] transition hover:text-[var(--color-ink)]";
  const mobileLastLinkClass = isDarkHeader
    ? "flex min-h-11 items-center justify-between transition hover:text-[var(--color-cream)]"
    : "flex min-h-11 items-center justify-between transition hover:text-[var(--color-ink)]";

  return (
    <header
      className={`sticky top-0 z-50 -mb-[var(--header-height)] h-[var(--header-height)] border-b transition-colors duration-300 ${
        isDarkHeader
          ? `border-[var(--color-stone)]/16 backdrop-blur-md ${isNavyHeader ? "bg-[var(--color-ink-navy)]/96 lg:bg-[var(--color-ink)]/96" : "bg-[var(--color-ink)]/96"}`
          : isHeaderActive
          ? "border-[var(--color-stone)] bg-[var(--color-ivory)]/88 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <nav aria-label="Primary navigation" className={`hidden items-center gap-7 text-[0.78rem] uppercase tracking-[0.16em] lg:flex ${navTextClass}`}>
          <Link className={navLinkClass} href="/#how">
            How it works
          </Link>
          <Link className={navLinkClass} href="/industries">
            Industries
          </Link>
          <Link className={navLinkClass} href="/about">
            About
          </Link>
        </nav>

        <Link
          aria-label="Express Capital home"
          className="flex min-w-0 items-center justify-center gap-2 justify-self-center text-center font-display uppercase"
          href="/"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            alt=""
            aria-hidden="true"
            className={`h-4 w-4 shrink-0 object-contain transition duration-300 sm:h-5 sm:w-5 ${
              isDarkHeader ? "brightness-[2.3] saturate-0 opacity-90" : ""
            }`}
            height={40}
            src="/favicon.png"
            width={40}
          />
          <span aria-hidden="true" className={`h-4 w-px shrink-0 sm:h-5 ${separatorClass}`} />
          <span className={`whitespace-nowrap text-[0.62rem] tracking-[0.22em] sm:text-[0.78rem] sm:tracking-[0.28em] ${logoTextClass}`}>
            EXPRESS CAPITAL
          </span>
        </Link>

        <div className="flex items-center gap-2 justify-self-end">
          <Link
            className={`hidden h-10 items-center px-2 text-[0.74rem] uppercase tracking-[0.16em] lg:inline-flex ${navTextClass} ${navLinkClass}`}
            href="/resources/faq"
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </Link>
          <Link
            className={`hidden h-10 items-center px-2 text-[0.74rem] uppercase tracking-[0.16em] lg:inline-flex ${navTextClass} ${navLinkClass}`}
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <a
            className={applyClass}
            href={applyHref}
            onClick={() => setIsMenuOpen(false)}
          >
            Apply
          </a>
          <button
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className={`inline-flex h-9 w-9 items-center justify-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current lg:hidden ${
              isDarkHeader ? "text-[var(--color-stone)] hover:text-[var(--color-cream)]" : "text-[var(--color-charcoal)] hover:text-[var(--color-ink)]"
            }`}
            onClick={() => setIsMenuOpen((open) => !open)}
            ref={menuButtonRef}
            type="button"
          >
            <span aria-hidden="true" className="relative block h-3.5 w-4">
              <span className={`absolute left-0 top-0 block h-px w-full bg-current transition-transform duration-200 ${isMenuOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[6.5px] block h-px w-full bg-current transition-opacity duration-150 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute bottom-0 left-0 block h-px w-full bg-current transition-transform duration-200 ${isMenuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>
      <nav
        aria-hidden={!isMenuOpen}
        aria-label="Mobile primary navigation"
        className={`${mobileMenuClass} ${
          isMenuOpen
            ? "grid-rows-[1fr] translate-y-0 opacity-100"
            : "pointer-events-none grid-rows-[0fr] -translate-y-1 opacity-0"
        }`}
        id="mobile-menu"
      >
        <div className="overflow-hidden py-3">
          <Link
            className={mobileLinkClass}
            href="/#how"
            onClick={() => setIsMenuOpen(false)}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            How it works
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            className={mobileLinkClass}
            href="/industries"
            onClick={() => setIsMenuOpen(false)}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            Industries
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            className={mobileLinkClass}
            href="/about"
            onClick={() => setIsMenuOpen(false)}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            About
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            className={mobileLinkClass}
            href="/resources/faq"
            onClick={() => setIsMenuOpen(false)}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            FAQ
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            className={mobileLastLinkClass}
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            Contact
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
