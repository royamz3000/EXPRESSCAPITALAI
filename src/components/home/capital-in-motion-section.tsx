import Image from "next/image";

import { libreCaslonDisplay } from "@/lib/fonts";

export function CapitalInMotionSection() {
  return (
    <section
      aria-labelledby="capital-in-motion-heading"
      className="relative overflow-hidden bg-[var(--color-cream)] pt-14 sm:pt-16 lg:pt-20"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="motion-reveal max-w-[1120px]" data-reveal>
          <p className="text-[0.76rem] uppercase tracking-[0.2em] text-[var(--color-olive-gray)]">
            Capital in motion
          </p>
          <h2
            className={`${libreCaslonDisplay.className} mt-5 text-[clamp(2.15rem,10vw,4rem)] font-normal leading-[0.98] text-[var(--color-charcoal)] sm:mt-6`}
            id="capital-in-motion-heading"
          >
            <span className="block md:whitespace-nowrap">
              <span className="whitespace-nowrap">Every business</span>{" "}
              <span className="whitespace-nowrap">moves differently.</span>
            </span>
            <span className="block md:whitespace-nowrap">
              <span className="whitespace-nowrap">Capital should</span>{" "}
              <span className="whitespace-nowrap">move with it.</span>
            </span>
          </h2>
          <p className="mt-6 max-w-[640px] text-[1.02rem] leading-[1.75] text-[var(--color-olive-gray)] sm:mt-7 sm:text-[1.08rem]">
            Structured around the operating rhythm, pressures, and opportunities
            of established businesses.
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="motion-fade relative z-0 -mt-8 sm:-mt-14 lg:-mt-20"
        data-reveal
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 100%)",
        }}
      >
        <Image
          alt=""
          className="h-auto w-full sm:hidden"
          height={2190}
          quality={90}
          sizes="100vw"
          src="/images/capital-in-motion-mobile.webp"
          width={1500}
        />
        <Image
          alt=""
          className="hidden h-auto w-full sm:block"
          height={1067}
          quality={90}
          sizes="100vw"
          src="/images/capital-in-motion-desktop.webp"
          width={3200}
        />
      </div>
    </section>
  );
}
