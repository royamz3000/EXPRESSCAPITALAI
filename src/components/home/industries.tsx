"use client";

import Image from "next/image";
import { useState } from "react";

import { industries } from "@/content/home";
import { libreCaslonDisplay } from "@/lib/fonts";

export function Industries() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section
      id="industries"
      data-header-theme="dark"
      className="overflow-hidden bg-[var(--color-ink)] px-4 py-24 text-[var(--color-cream)] sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="motion-reveal mx-auto max-w-4xl text-center" data-reveal>
          <p className="text-[0.76rem] uppercase tracking-[0.22em] text-[var(--color-olive-gray-on-dark)]">
            Industries We Serve
          </p>
          <h2 className={`mt-7 text-[2.8rem] font-normal leading-[1.02] text-[var(--color-cream)] sm:text-[4.45rem] ${libreCaslonDisplay.className}`}>
            Tailored capital for the industries we serve.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-[1.75] text-[var(--color-stone)]">
            Working capital structured for established operators in cash-flow heavy industries.
          </p>
        </div>

        <div className="mt-16 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="motion-stagger flex min-w-max gap-3" data-reveal>
            {industries.map((industry, index) => {
              const isActive = activeIndex === index;

              return (
                <a
                  aria-label={`${industry.title}: ${industry.description} Learn more.`}
                  className={`motion-stagger-item group relative h-[28rem] shrink-0 overflow-hidden rounded-[18px] border border-[var(--color-stone)]/18 bg-[var(--color-ink)] text-left transition-[width,border-color,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:border-[var(--color-stone)]/48 ${
                    isActive
                      ? "w-[82vw] border-[var(--color-stone)]/34 sm:w-[34rem]"
                      : "w-[8.5rem] hover:border-[var(--color-stone)]/28 sm:w-[10.5rem]"
                  }`}
                  href={industry.href}
                  key={industry.title}
                  onClick={(event) => {
                    if (!isActive) {
                      event.preventDefault();
                      setActiveIndex(index);
                    }
                  }}
                  onFocus={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <Image
                    alt=""
                    className={`object-cover transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive ? "scale-100 saturate-[0.96]" : "scale-105 saturate-[0.72] blur-[1px]"
                    }`}
                    fill
                    sizes={isActive ? "(max-width: 640px) 82vw, 34rem" : "10.5rem"}
                    src={industry.image}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/84 via-[var(--color-ink)]/28 to-[var(--color-ink)]/10" />
                  <span
                    className={`absolute inset-0 bg-[var(--color-ink)] transition-opacity duration-500 ${
                      isActive ? "opacity-0" : "opacity-35"
                    }`}
                  />
                  <span className="absolute inset-x-0 bottom-0 flex flex-col p-5 sm:p-6">
                    <h3 className="text-[1.25rem] font-semibold leading-tight tracking-[-0.01em] text-[var(--color-cream)]">
                      {industry.title}
                    </h3>
                    <span
                      className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <span className="overflow-hidden">
                        <span className="block max-w-[27rem] text-sm leading-[1.75] text-[var(--color-stone)]">
                          {industry.description}
                        </span>
                        <span className="mt-5 inline-flex text-[0.78rem] uppercase tracking-[0.16em] text-[var(--color-aged-brass)]">
                          Learn more →
                        </span>
                      </span>
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
