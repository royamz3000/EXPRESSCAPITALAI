"use client";

import { useEffect, useRef, useState } from "react";

import { testimonials } from "@/content/home";
import { libreCaslonDisplay } from "@/lib/fonts";

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

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasManualInteraction, setHasManualInteraction] = useState(false);
  const [isFocusPaused, setIsFocusPaused] = useState(false);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<number | null>(null);
  const activeTestimonial = testimonials[activeIndex];
  const isAutoPaused = hasManualInteraction || isFocusPaused || isHoverPaused;

  function changeTestimonial(direction: "previous" | "next") {
    if (isTransitioning) {
      return;
    }

    setHasManualInteraction(true);
    setIsTransitioning(true);

    transitionTimeoutRef.current = window.setTimeout(() => {
      setActiveIndex((index) => {
        if (direction === "previous") {
          return index === 0 ? testimonials.length - 1 : index - 1;
        }

        return index === testimonials.length - 1 ? 0 : index + 1;
      });
      setIsTransitioning(false);
      transitionTimeoutRef.current = null;
    }, 180);
  }

  function showPrevious() {
    changeTestimonial("previous");
  }

  function showNext() {
    changeTestimonial("next");
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || isAutoPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      setIsTransitioning(true);

      transitionTimeoutRef.current = window.setTimeout(() => {
        setActiveIndex((index) => (index === testimonials.length - 1 ? 0 : index + 1));
        setIsTransitioning(false);
        transitionTimeoutRef.current = null;
      }, 180);
    }, 8000);

    return () => window.clearInterval(interval);
  }, [isAutoPaused]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="proof" className="border-y border-[rgba(49,42,32,0.12)] bg-[#eee7da] px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="motion-reveal mx-auto max-w-4xl text-center" data-reveal>
          <Eyebrow>In Their Words</Eyebrow>
          <h2 className={`mt-7 text-4xl font-normal leading-[1.06] text-[#221d17] sm:text-6xl ${libreCaslonDisplay.className}`}>
            Trusted by operators who don&apos;t have time for the bank.
          </h2>
        </div>

        <figure
          className="motion-reveal mx-auto mt-12 max-w-5xl border-y border-[rgba(49,42,32,0.13)] py-12 text-center sm:mt-14 sm:py-14 lg:py-16"
          data-reveal
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsFocusPaused(false);
            }
          }}
          onFocus={() => setIsFocusPaused(true)}
          onMouseEnter={() => setIsHoverPaused(true)}
          onMouseLeave={() => setIsHoverPaused(false)}
        >
          <div
            className={`transition duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isTransitioning ? "translate-y-1.5 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            <blockquote
              className={`mx-auto max-w-4xl text-[1.82rem] font-normal leading-[1.2] text-[#221d17] sm:text-[2.62rem] lg:text-[3.15rem] ${libreCaslonDisplay.className}`}
            >
              {activeTestimonial.quote}
            </blockquote>

            <figcaption className="mx-auto mt-9 max-w-xl border-t border-[rgba(49,42,32,0.12)] pt-6">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-[#2a261f]">
                {activeTestimonial.name}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#6b6254]">{activeTestimonial.role}</p>
            </figcaption>
          </div>

          <div className="mt-9 flex items-center justify-center gap-6 text-[0.66rem] uppercase tracking-[0.2em] text-[#7a7163]">
            <button
              className="transition hover:text-[#221d17] focus:text-[#221d17]"
              disabled={isTransitioning}
              onClick={showPrevious}
              type="button"
            >
              Previous
            </button>
            <span aria-hidden="true" className="motion-line h-px w-12 bg-[rgba(49,42,32,0.14)]" data-reveal-line />
            <button
              className="transition hover:text-[#221d17] focus:text-[#221d17]"
              disabled={isTransitioning}
              onClick={showNext}
              type="button"
            >
              Next
            </button>
          </div>
        </figure>
      </div>
    </section>
  );
}
