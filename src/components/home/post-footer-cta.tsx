import Image from "next/image";

import { libreCaslonDisplay } from "@/lib/fonts";

export function PostFooterCta({
  description = "Get a clear look at working capital structured around your revenue, timeline, and file.",
  imageSrc = "/cta-yacht-background.png",
  title = "See what Express Capital can fund.",
}: {
  description?: string;
  imageSrc?: string;
  title?: string;
}) {
  return (
    <section className="bg-[#f4efe4] px-4 py-16 text-[#221d17] sm:px-6 sm:py-20 lg:px-8">
      <div className="motion-reveal mx-auto max-w-7xl" data-reveal>
        <div className="relative isolate overflow-hidden rounded-[24px] border border-[rgba(49,42,32,0.12)] bg-[#fbf8f0] shadow-[0_30px_90px_rgba(49,42,32,0.1)]">
          <Image
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 object-cover object-right"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            src={imageSrc}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#fbf8f0_0%,rgba(251,248,240,0.98)_38%,rgba(251,248,240,0.64)_65%,rgba(251,248,240,0.08)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 -z-10 w-[44%] bg-[linear-gradient(90deg,rgba(251,248,240,0)_0%,rgba(150,139,106,0.08)_100%)]"
          />

          <div className="relative grid min-h-[15rem] gap-8 px-7 py-9 sm:min-h-[17rem] sm:px-12 sm:py-12 lg:grid-cols-[minmax(0,0.68fr)_auto] lg:items-center lg:px-16">
            <div className="max-w-2xl">
              <h2 className={`text-[2.35rem] font-normal leading-[1.04] text-[#221d17] sm:text-[3.35rem] ${libreCaslonDisplay.className}`}>
                {title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-[1.75] text-[#62584a] sm:text-lg">
                {description}
              </p>
            </div>
            <a
              className="inline-flex h-12 w-full items-center justify-center rounded-[16px] bg-[#2a261f] px-7 text-[0.76rem] uppercase tracking-[0.16em] text-[#f5efe4] transition hover:bg-[#4c5137] focus:outline-none focus:ring-2 focus:ring-[#6f7354] focus:ring-offset-2 focus:ring-offset-[#fbf8f0] sm:w-auto"
              href="#apply"
            >
              Apply now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
