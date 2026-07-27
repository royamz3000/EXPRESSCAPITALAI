import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The requested page could not be found on the Express Capital website.",
  alternates: {},
  openGraph: null,
  twitter: null,
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-[#f4efe4] px-4 py-16 text-[#221d17] sm:px-6 lg:px-8">
      <section aria-labelledby="not-found-heading" className="mx-auto w-full max-w-3xl">
        <p className="text-[0.76rem] uppercase tracking-[0.2em] text-[#6f7354]">
          Error 404
        </p>
        <h1
          className="mt-7 font-display text-5xl font-normal leading-none text-[#221d17] sm:text-6xl"
          id="not-found-heading"
        >
          Page not found.
        </h1>
        <p className="mt-7 max-w-xl text-base leading-[1.75] text-[#62584a]">
          The page may have moved, or the address may be incorrect.
        </p>
        <Link
          className="mt-10 inline-flex h-12 items-center justify-center rounded-[16px] border border-[#2a261f] bg-[#2a261f] px-7 text-[0.74rem] uppercase tracking-[0.16em] text-[#f5efe4] transition-colors duration-200 hover:bg-transparent hover:text-[#2a261f]"
          href="/"
        >
          Return to Express Capital home
        </Link>
      </section>
    </main>
  );
}
