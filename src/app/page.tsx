import type { Metadata } from "next";

import { ApplySection } from "@/components/home/apply-section";
import { CapitalInMotionSection } from "@/components/home/capital-in-motion-section";
import { FAQ } from "@/components/home/faq";
import { Hero } from "@/components/home/hero";
import { Industries } from "@/components/home/industries";
import { Process } from "@/components/home/process";
import { PostFooterCta } from "@/components/home/post-footer-cta";
import { ScrollReveal } from "@/components/home/scroll-reveal";
import { SiteHeader } from "@/components/home/site-header";
import { SiteFooter } from "@/components/home/site-footer";
import { Testimonials } from "@/components/home/testimonials";
import { JsonLd } from "@/components/seo/json-ld";
import { faqs } from "@/content/home";
import {
  createFaqJsonLd,
  createOrganizationAndWebsiteJsonLd,
  createPageMetadata,
  routeMetadata,
  siteConfig,
} from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata(routeMetadata.home),
  title: `${routeMetadata.home.title} | ${siteConfig.name}`,
};

const organizationAndWebsiteJsonLd = createOrganizationAndWebsiteJsonLd();
const faqJsonLd = createFaqJsonLd(faqs);

export default function Home() {
  return (
    <>
      <JsonLd
        data={organizationAndWebsiteJsonLd}
        id="organization-website-json-ld"
      />
      <JsonLd data={faqJsonLd} id="faq-json-ld" />
      <div className="min-h-screen bg-[#f4efe4] text-[#221d17]">
        <ScrollReveal />
        <SiteHeader />
        <main>
          <Hero />
          <Process />
          <CapitalInMotionSection />
          <Industries />
          <Testimonials />
          <ApplySection />
          <FAQ />
          <PostFooterCta imageSrc="/images/cta-yacht-engraving-v1.webp" />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
