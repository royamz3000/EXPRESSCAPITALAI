import type { Metadata } from "next";

import { ApplySection } from "@/components/home/apply-section";
import { ScrollReveal } from "@/components/home/scroll-reveal";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";

const applyDescription =
  "Start your Express Capital funding request. Share the essentials and an advisor will follow up directly.";

export const metadata: Metadata = {
  title: "Apply",
  description: applyDescription,
  alternates: {
    canonical: "/apply",
  },
  openGraph: {
    title: "Apply | Express Capital",
    description: applyDescription,
    url: "/apply",
    siteName: "Express Capital",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply | Express Capital",
    description: applyDescription,
  },
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-[#f4efe4] text-[#221d17]">
      <ScrollReveal />
      <SiteHeader applyHref="/apply" />

      <main className="pt-[var(--header-height)]">
        <ApplySection redirectHref="/apply/thank-you" />
      </main>

      <SiteFooter />
    </div>
  );
}
