import type { Metadata } from "next";

import { SiteHeader } from "@/components/home/site-header";

const applicationUrl =
  "https://apply.expresscapital.ai/s/?linkId=a2tQk000001jMdJ";

const applicationDescription =
  "Complete your Express Capital funding application securely online.";

export const metadata: Metadata = {
  title: "Application",
  description: applicationDescription,
  alternates: {
    canonical: "/application",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ApplicationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-ivory)] text-[var(--color-charcoal)]">
      <SiteHeader />

      <main className="flex flex-1 flex-col pt-[var(--header-height)]">
        <iframe
          allow="camera; microphone; clipboard-write; payment; geolocation"
          className="h-[calc(100dvh-var(--header-height))] w-full border-0"
          src={applicationUrl}
          title="Express Capital funding application"
        />
        <p className="border-t border-[var(--color-stone)] bg-[var(--color-cream)] px-4 py-3 text-center text-xs leading-6 text-[var(--color-olive-gray)]">
          Having trouble viewing the application?{" "}
          <a
            className="underline decoration-[var(--color-stone)] underline-offset-4 transition hover:text-[var(--color-charcoal)]"
            href={applicationUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Open it in a new tab
          </a>
          .
        </p>
      </main>
    </div>
  );
}
