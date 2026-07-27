"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { minimumRequirements, stats } from "@/content/home";
import { libreCaslonDisplay } from "@/lib/fonts";

const finalStatCounts = {
  capital: 10,
  businesses: 12000,
};

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function Eyebrow({ children, tone = "light" }: { children: string; tone?: "light" | "dark" }) {
  return (
    <p
      className={`text-[0.76rem] uppercase tracking-[0.2em] ${
        tone === "dark" ? "text-[var(--color-stone)]" : "text-[var(--color-olive-gray)]"
      }`}
    >
      {children}
    </p>
  );
}

export function Hero() {
  const [isRequirementsOpen, setIsRequirementsOpen] = useState(false);
  const [hasStatsEntered, setHasStatsEntered] = useState(false);
  const [statCounts, setStatCounts] = useState(finalStatCounts);
  const requirementsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!requirementsRef.current?.contains(event.target as Node)) {
        setIsRequirementsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsRequirementsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const statsElement = statsRef.current;

    if (!statsElement) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrame = 0;
    const duration = 850;

    function animateCounts() {
      const startedAt = performance.now();

      function update(now: number) {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = easeOutCubic(progress);

        setStatCounts({
          capital: Math.round(finalStatCounts.capital * eased),
          businesses: Math.round(finalStatCounts.businesses * eased),
        });

        if (progress < 1) {
          animationFrame = requestAnimationFrame(update);
        }
      }

      animationFrame = requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStatsEntered(true);
          if (prefersReducedMotion) {
            setStatCounts(finalStatCounts);
          } else {
            animateCounts();
          }
          observer.disconnect();
        }
      },
      { threshold: 0.34 },
    );

    observer.observe(statsElement);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const displayStats = stats.map((stat) => {
    if (stat.value === "$10B+") {
      return { ...stat, value: `$${statCounts.capital}B+` };
    }

    if (stat.value === "12,000+") {
      return { ...stat, value: `${new Intl.NumberFormat("en-US").format(statCounts.businesses)}+` };
    }

    return stat;
  });

  return (
    <section
      id="top"
      className="hero-section relative isolate block min-h-0 overflow-hidden border-b border-[var(--color-stone)]/55 bg-[var(--color-cream)] px-4 pb-0 pt-[var(--header-height)] sm:flex sm:min-h-[calc(100svh+1px)] sm:items-center sm:px-6 sm:py-16 lg:px-8"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden sm:block">
        <Image
          alt=""
          className="object-cover object-left [filter:brightness(1.01)_contrast(1.025)]"
          fill
          quality={90}
          sizes="(min-width: 640px) 100vw, 0px"
          src="/hero-yacht-graphite-ivory-v4.webp"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,247,240,0.04)_0%,rgba(250,247,240,0.02)_50%,rgba(250,247,240,0.2)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,247,240,0.36)_0%,rgba(250,247,240,0.18)_34%,rgba(250,247,240,0.02)_62%,rgba(36,36,32,0.055)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,247,240,0.08)_0%,rgba(250,247,240,0.01)_32%,rgba(250,247,240,0.01)_68%,rgba(250,247,240,0.04)_100%)]" />
      </div>
      <div className="hero-content mx-auto flex max-w-5xl flex-col items-center pt-7 text-center sm:translate-y-4 sm:pt-0">
        <div className="reveal">
          <Eyebrow>Direct Lending</Eyebrow>
        </div>
        <h1 className={`hero-heading reveal reveal-delay-1 mt-[18px] flex flex-col text-[clamp(2.85rem,12vw,3.1rem)] leading-[0.98] text-[var(--color-charcoal)] sm:mt-[34px] sm:text-[5.1rem] sm:leading-[0.95] lg:text-[6.2rem] ${libreCaslonDisplay.className}`}>
          <span>Capital, customized</span>
          <span>for your business.</span>
        </h1>
        <p className="hero-copy reveal reveal-delay-2 mt-5 max-w-[610px] text-base font-normal leading-[1.65] text-[var(--color-olive-gray)] sm:mt-[34px] sm:translate-y-[5px] sm:text-lg sm:leading-[2.05]">
          A discreet alternative to the bank. We advance working capital to established operators, underwritten in-house, swiftly delivered, and structured around the rhythm of your revenue.
        </p>
        <div className="hero-actions reveal reveal-delay-3 relative z-20 mt-6 flex w-full flex-col items-stretch justify-center gap-1 sm:mt-[42px] sm:w-auto sm:translate-y-[7px] sm:flex-row sm:items-center sm:gap-3">
          <a
            className="inline-flex h-12 items-center justify-center rounded-[16px] bg-[var(--color-charcoal)] px-7 text-[0.78rem] uppercase tracking-[0.16em] text-[var(--color-cream)] transition hover:bg-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-olive-gray)] focus:ring-offset-2 focus:ring-offset-[var(--color-cream)]"
            href="#apply"
          >
            Request an advance
          </a>
          <div
            className="relative inline-flex h-12 items-center justify-center"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setIsRequirementsOpen(false);
              }
            }}
            onMouseEnter={() => setIsRequirementsOpen(true)}
            onMouseLeave={() => setIsRequirementsOpen(false)}
            ref={requirementsRef}
          >
            <button
              aria-controls="minimum-requirements-popover"
              aria-expanded={isRequirementsOpen}
              className="group inline-flex h-12 items-center justify-center gap-2 bg-transparent text-[0.78rem] uppercase tracking-[0.16em] text-[var(--color-charcoal)] transition hover:text-[var(--color-ink)] focus:outline-none"
              onClick={() => setIsRequirementsOpen((open) => !open)}
              onFocus={() => setIsRequirementsOpen(true)}
              style={{ fontSize: "0.78rem" }}
              type="button"
            >
              <span className="border-b border-transparent pb-0.5 transition-colors duration-150 ease-out group-hover:border-[var(--color-charcoal)]/55 group-focus-visible:border-[var(--color-charcoal)]/55">
                Minimum requirements
              </span>
              <span
                aria-hidden="true"
                className={`inline-flex h-4 w-4 items-center justify-center leading-none transition-transform duration-200 ease-out ${
                  isRequirementsOpen
                    ? "translate-y-0.5 rotate-90"
                    : "group-hover:translate-y-0.5 group-hover:rotate-90 group-focus-visible:translate-y-0.5 group-focus-visible:rotate-90"
                }`}
              >
                →
              </span>
            </button>
            <div
              aria-hidden={!isRequirementsOpen}
              aria-labelledby="minimum-requirements-title"
              className={`absolute left-0 top-full z-[80] mt-2 w-[17.5rem] rounded-[18px] border border-[var(--color-stone)] bg-[var(--color-cream)] p-3 text-left shadow-[0_18px_48px_rgba(11,11,10,0.12)] [backdrop-filter:none] transition duration-150 ease-out ${
                isRequirementsOpen
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-1 opacity-0"
              }`}
              id="minimum-requirements-popover"
              role="region"
            >
              <p
                className="px-2 pb-2 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-olive-gray)]"
                id="minimum-requirements-title"
              >
                Minimum requirements
              </p>
              <ul className="text-sm leading-6 text-[var(--color-charcoal)]">
                {minimumRequirements.map((requirement, index) => (
                  <li
                    className={`flex items-center gap-2 px-2 py-2 ${
                      index > 0 ? "border-t border-[var(--color-charcoal)]/8" : ""
                    }`}
                    key={requirement}
                  >
                    <span aria-hidden="true" className="flex h-4 w-4 shrink-0 items-center justify-center text-[0.72rem] leading-none text-[var(--color-olive-gray)]">
                      ✓
                    </span>
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="relative mt-3 h-[clamp(360px,108vw,470px)] w-screen max-w-none overflow-hidden sm:hidden"
        >
          <Image
            alt=""
            className="object-cover object-[62%_center] [filter:brightness(1.01)_contrast(1.015)]"
            fill
            quality={90}
            sizes="(max-width: 767px) 100vw, 0px"
            src="/hero-yacht-graphite-ivory-mobile-v1.webp"
          />
        </div>
        <div
          className={`hero-stats relative z-10 mt-0 grid w-full grid-cols-3 overflow-hidden sm:mt-[84px] ${
            hasStatsEntered ? "opacity-100" : "opacity-0"
          } transition-opacity duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)]`}
          ref={statsRef}
        >
          <span
            aria-hidden="true"
            className={`absolute left-0 top-0 h-px w-full origin-left bg-[var(--color-charcoal)]/15 transition-transform duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              hasStatsEntered ? "scale-x-100" : "scale-x-0"
            }`}
          />
          <span
            aria-hidden="true"
            className={`absolute bottom-0 left-0 h-px w-full origin-left bg-[var(--color-charcoal)]/15 transition-transform delay-100 duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              hasStatsEntered ? "scale-x-100" : "scale-x-0"
            }`}
          />
          {displayStats.map((stat, index) => (
            <div
              className="hero-stat relative px-1 py-5 sm:px-5 sm:py-7"
              key={stat.label}
            >
              {index > 0 ? (
                <>
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-0 block h-full w-px origin-top bg-[var(--color-charcoal)]/24 transition-transform delay-150 duration-[760ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      hasStatsEntered ? "scale-y-100" : "scale-y-0"
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-0 hidden h-px w-full origin-left bg-[var(--color-charcoal)]/24 transition-transform delay-150 duration-[760ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      hasStatsEntered ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </>
              ) : null}
              <div
                className={`transition duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  hasStatsEntered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 80 + 120}ms` }}
              >
                <p className={`whitespace-nowrap text-[1.45rem] leading-none text-[var(--color-charcoal)] sm:text-5xl ${libreCaslonDisplay.className}`}>{stat.value}</p>
                <p className="mt-2 text-[0.62rem] uppercase leading-[1.45] tracking-[0.08em] text-[var(--color-olive-gray)] sm:text-sm sm:tracking-[0.13em]">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
