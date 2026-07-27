import type { Metadata } from "next";
import Image from "next/image";

import { ApplySection } from "@/components/home/apply-section";
import { PostFooterCta } from "@/components/home/post-footer-cta";
import { ScrollReveal } from "@/components/home/scroll-reveal";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { industryDetails } from "@/content/home";
import { libreCaslonDisplay } from "@/lib/fonts";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  routeMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(routeMetadata.industries);

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Industries", path: routeMetadata.industries.path },
]);

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} id="industries-breadcrumb-json-ld" />
      <div className="min-h-screen bg-[#f4efe4] text-[#221d17]">
        <ScrollReveal />
        <SiteHeader />
        <main>
        <section
          id="top"
          className="relative isolate overflow-hidden border-b border-[rgba(49,42,32,0.1)] bg-[#fbf7ef] px-4 pb-16 pt-[calc(var(--header-height)+5.25rem)] sm:px-6 sm:pb-20 sm:pt-[calc(var(--header-height)+6.5rem)] lg:px-8"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(ellipse_at_top,rgba(150,139,106,0.16),transparent_64%)]"
          />
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.48fr)] lg:items-end">
            <div className="motion-reveal max-w-4xl" data-reveal>
              <p className="text-[0.76rem] uppercase tracking-[0.22em] text-[#6f7354]">
                Industries We Serve
              </p>
              <h1 className={`mt-7 max-w-4xl text-[3.25rem] font-normal leading-[0.98] text-[#221d17] sm:text-[5.35rem] lg:text-[6.1rem] ${libreCaslonDisplay.className}`}>
                Capital for operators in motion.
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-[1.85] text-[#62584a] sm:text-lg">
                Express Capital works with established businesses whose revenue is real, but whose timing can be demanding. Each industry below receives a practical underwriting conversation and capital structured around operating rhythm.
              </p>
            </div>

            <nav
              aria-label="Industries on this page"
              className="motion-reveal border-y border-[rgba(49,42,32,0.16)] py-3"
              data-reveal
            >
              {industryDetails.map((industry) => (
                <a
                  className="group flex items-center justify-between gap-4 border-t border-[rgba(49,42,32,0.1)] py-4 text-[0.72rem] uppercase tracking-[0.18em] text-[#4d473b] transition-colors duration-200 first:border-t-0 hover:border-[rgba(49,42,32,0.22)] hover:text-[#221d17] focus-visible:border-[rgba(49,42,32,0.22)] focus-visible:text-[#221d17]"
                  href={`#${industry.id}`}
                  key={industry.id}
                >
                  {industry.title}
                  <span
                    aria-hidden="true"
                    className="text-[#6f7354] transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1"
                  >
                    →
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </section>

        <div>
          {industryDetails.map((industry, index) => (
            <IndustrySection
              industry={industry}
              isReversed={index % 2 === 1}
              key={industry.id}
            />
          ))}
        </div>

          <ApplySection />
          <PostFooterCta
            description="Share your revenue, timing, and capital needs. An advisor will review the opportunity directly."
            title="Capital structured around your next move."
          />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}

function IndustrySection({
  industry,
  isReversed,
}: {
  industry: (typeof industryDetails)[number];
  isReversed: boolean;
}) {
  const hasPrimaryAction = [
    "hospitality",
    "medical-med-spas",
    "construction",
  ].includes(industry.id);

  return (
    <section
      aria-labelledby={`${industry.id}-heading`}
      className={`scroll-mt-[calc(var(--header-height)+1.5rem)] border-t border-[rgba(49,42,32,0.12)] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28 ${
        isReversed ? "bg-[#eee7da]" : "bg-[#f4efe4]"
      }`}
      id={industry.id}
    >
      <div className="mx-auto grid max-w-7xl gap-12 sm:gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div
          className={`motion-reveal flex min-w-0 flex-col ${isReversed ? "lg:order-2" : ""}`}
          data-reveal
        >
          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#6f7354]">
            Express Capital for
          </p>
          <h2
            className={`mt-6 max-w-2xl text-[2.65rem] font-normal leading-[1.02] text-[#221d17] sm:text-[4.15rem] lg:text-[4.5rem] ${libreCaslonDisplay.className}`}
            id={`${industry.id}-heading`}
          >
            {industry.title}
          </h2>
          <p className="mt-7 max-w-xl text-base leading-[1.85] text-[#62584a]">
            {industry.intro}
          </p>

          <div className="mt-10 max-w-xl sm:mt-11">
            <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[#6f7354]">
              Common uses for capital
            </p>
            <ul className="mt-5 border-y border-[rgba(49,42,32,0.15)]">
              {industry.uses.map((use, index) => (
                <li
                  className="grid min-h-[4.5rem] grid-cols-[2.4rem_minmax(0,1fr)] items-center gap-4 border-t border-[rgba(49,42,32,0.1)] py-3.5 first:border-t-0"
                  key={use}
                >
                  <span className={`text-[1.35rem] leading-none text-[#968b6a] ${libreCaslonDisplay.className}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-[1.75] text-[#4d473b]">{use}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex min-h-12 items-center">
            {hasPrimaryAction ? (
              <a
                className="inline-flex h-12 items-center justify-center rounded-[16px] border border-[#2a261f] bg-[#2a261f] px-7 text-[0.74rem] uppercase tracking-[0.16em] text-[#f5efe4] transition-colors duration-200 hover:bg-transparent hover:text-[#2a261f]"
                href="#apply"
              >
                Apply for capital
              </a>
            ) : (
              <a
                className="group inline-flex min-h-11 items-center gap-3 text-[0.72rem] uppercase tracking-[0.18em] text-[#4d473b] transition-colors duration-200 hover:text-[#221d17] focus-visible:text-[#221d17]"
                href="#apply"
              >
                Apply for capital
                <span
                  aria-hidden="true"
                  className="text-[#6f7354] transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1"
                >
                  →
                </span>
              </a>
            )}
          </div>
        </div>

        <div
          className={`motion-reveal relative aspect-[4/5] w-full overflow-hidden rounded-[16px] border border-[rgba(49,42,32,0.14)] bg-[#17140f] shadow-[0_26px_72px_rgba(49,42,32,0.08)] ${
            isReversed ? "lg:order-1" : ""
          }`}
          data-reveal
        >
          <Image
            alt={industry.imageAlt}
            className="object-cover saturate-[0.88]"
            fill
            sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) calc(100vw - 3rem), (min-width: 1280px) 600px, 38vw"
            src={industry.image}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,12,10,0.02)_0%,rgba(13,12,10,0.18)_100%)]"
          />
        </div>
      </div>
    </section>
  );
}
