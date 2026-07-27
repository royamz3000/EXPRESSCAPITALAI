"use client";

import Image from "next/image";
import { type KeyboardEvent, useEffect, useState } from "react";

import { processSteps } from "@/content/home";
import { libreCaslonDisplay } from "@/lib/fonts";

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

export function Process() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const isAutoAdvancePaused = isHovered || isFocusWithin;

  useEffect(() => {
    if (
      isAutoAdvancePaused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveStepIndex((currentIndex) =>
        (currentIndex + 1) % processSteps.length,
      );
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [activeStepIndex, isAutoAdvancePaused]);

  function focusStep(index: number) {
    setActiveStepIndex(index);
    requestAnimationFrame(() => {
      document.getElementById(`process-step-${index}`)?.focus();
    });
  }

  function handleStepKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (index + 1) % processSteps.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = (index - 1 + processSteps.length) % processSteps.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = processSteps.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    focusStep(nextIndex);
  }

  return (
    <section id="how" className="scroll-mt-[calc(var(--header-height)+1rem)] bg-[var(--color-cream)] px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-[5.25rem] lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center text-center">
          <Eyebrow>The Process</Eyebrow>
          <h2 className={`process-copy-reveal mt-4 max-w-[1100px] text-[clamp(2.25rem,10.5vw,4rem)] font-normal leading-[0.96] tracking-[0] text-[var(--color-charcoal)] sm:text-[clamp(4rem,6vw,6.25rem)] ${libreCaslonDisplay.className}`} data-reveal>
            <span className="block whitespace-nowrap">A direct path from</span>
            <span className="block whitespace-nowrap">request to capital.</span>
          </h2>
          <p className="process-copy-reveal process-copy-reveal-delay mt-6 max-w-[680px] text-[1.05rem] leading-[1.68] text-[var(--color-olive-gray)] sm:text-[1.125rem]" data-reveal>
            One point of contact. In-house underwriting. A structure built around the way your business operates.
          </p>
        </div>

      <div
        className="motion-stagger mt-12 grid overflow-hidden rounded-[8px] border border-[var(--color-stone)] bg-[var(--color-ivory)] sm:mt-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]"
        data-reveal
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsFocusWithin(false);
          }
        }}
        onFocusCapture={() => setIsFocusWithin(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
          <div
            aria-label="Process steps"
            aria-orientation="vertical"
            className="motion-stagger-item flex flex-col bg-[var(--color-ivory)] lg:border-r lg:border-[var(--color-stone)]"
            role="tablist"
          >
            {processSteps.map((step, index) => {
              const isActive = activeStepIndex === index;

              return (
                <div
                  className={`relative flex-1 border-b border-[var(--color-stone)]/75 transition-colors duration-500 last:border-b-0 ${
                    isActive ? "bg-[var(--color-cream)]" : "bg-transparent"
                  }`}
                  key={step.number}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-5 left-0 w-[2px] origin-center bg-[var(--color-olive-gray)] transition-[transform,opacity] duration-300 ease-out ${
                      isActive ? "scale-y-100 opacity-100" : "scale-y-50 opacity-0"
                    }`}
                  />
                  <button
                    aria-controls="process-visual-panel"
                    aria-selected={isActive}
                    className="grid w-full grid-cols-[2rem_minmax(0,1fr)] gap-3 px-6 pb-4 pt-6 text-left transition-colors duration-300 hover:bg-[var(--color-olive-gray)]/5 focus-visible:bg-[var(--color-olive-gray)]/8 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-4 sm:px-8 sm:pt-8 lg:px-9"
                    id={`process-step-${index}`}
                    onClick={() => setActiveStepIndex(index)}
                    onKeyDown={(event) => handleStepKeyDown(event, index)}
                    role="tab"
                    tabIndex={isActive ? 0 : -1}
                    type="button"
                  >
                    <span
                      className={`pt-1 text-[0.7rem] uppercase tracking-[0.18em] transition-colors duration-300 ${
                        isActive ? "text-[var(--color-olive-gray)]" : "text-[var(--color-olive-gray)]/75"
                      }`}
                    >
                      {step.number}
                    </span>
                    <span
                      className={`text-[1.65rem] font-normal leading-[1.08] transition-colors duration-300 sm:text-[1.95rem] lg:text-[2.05rem] ${
                        libreCaslonDisplay.className
                      } ${isActive ? "text-[var(--color-charcoal)]" : "text-[var(--color-charcoal)]/72"}`}
                    >
                      {step.title}
                    </span>
                  </button>

                  <div
                    aria-hidden={!isActive}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                      isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 px-6 pb-7 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-4 sm:px-8 sm:pb-8 lg:px-9">
                        <span aria-hidden="true" />
                        <p className="max-w-md text-sm leading-[1.75] text-[var(--color-olive-gray)]">{step.body}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            aria-labelledby={`process-step-${activeStepIndex}`}
            className="motion-stagger-item relative aspect-square min-h-[21rem] overflow-hidden bg-[var(--color-stone)] sm:min-h-[34rem] lg:aspect-auto lg:min-h-[42rem]"
            id="process-visual-panel"
            role="tabpanel"
            tabIndex={0}
          >
            {processSteps.map((step, index) => {
              const isActive = activeStepIndex === index;

              return (
                <div
                  aria-hidden={!isActive}
                  className={`absolute inset-0 transition-opacity duration-[600ms] ease-out ${
                    isActive ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                  key={step.number}
                >
                  <Image
                    alt={step.imageAlt}
                    className="object-cover"
                    fill
                    sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
                    src={step.image}
                  />
                </div>
              );
            })}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-45% to-[var(--color-ink)]/6" />
          </div>
        </div>
      </div>
    </section>
  );
}
