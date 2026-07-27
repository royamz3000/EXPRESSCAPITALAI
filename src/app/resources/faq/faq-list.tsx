"use client";

import { useEffect, useState } from "react";

import {
  faqCategories,
  faqItems,
  type FaqItem,
} from "@/lib/faq-content";
import { libreCaslonDisplay } from "@/lib/fonts";

const faqIds = new Set(faqItems.map((item) => item.id));

function getHashId() {
  try {
    return decodeURIComponent(window.location.hash.slice(1));
  } catch {
    return window.location.hash.slice(1);
  }
}

export function FaqList() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    let navigationTimer = 0;

    function syncWithHash(shouldFocus: boolean) {
      const hashId = getHashId();
      setOpenId(faqIds.has(hashId) ? hashId : null);

      if (!hashId) return;

      window.clearTimeout(navigationTimer);
      navigationTimer = window.setTimeout(() => {
        const destination = document.getElementById(hashId);
        if (!destination) return;

        if (shouldFocus && faqIds.has(hashId)) {
          document.getElementById(`${hashId}-trigger`)?.focus({
            preventScroll: true,
          });
        }

        const headerHeight = Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--header-height",
          ),
        );
        const top =
          destination.getBoundingClientRect().top +
          window.scrollY -
          (Number.isFinite(headerHeight) ? headerHeight : 60) -
          24;

        window.scrollTo({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
          top,
        });
      }, 220);
    }

    const initialFrame = window.requestAnimationFrame(() =>
      syncWithHash(true),
    );
    const handleHistoryNavigation = () => syncWithHash(true);

    window.addEventListener("hashchange", handleHistoryNavigation);
    window.addEventListener("popstate", handleHistoryNavigation);

    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.clearTimeout(navigationTimer);
      window.removeEventListener("hashchange", handleHistoryNavigation);
      window.removeEventListener("popstate", handleHistoryNavigation);
    };
  }, []);

  function toggleItem(item: FaqItem) {
    const isClosing = openId === item.id;
    const nextId = isClosing ? null : item.id;
    const nextUrl = `${window.location.pathname}${window.location.search}${
      nextId ? `#${nextId}` : ""
    }`;

    window.history.pushState(null, "", nextUrl);
    setOpenId(nextId);
    setCopiedId(null);
  }

  async function copyItemLink(item: FaqItem) {
    const url = new URL(window.location.href);
    url.hash = item.id;
    const value = url.toString();

    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(item.id);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = value;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();

      const copied = document.execCommand("copy");
      textArea.remove();
      setCopiedId(copied ? item.id : null);
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[17rem_minmax(0,1fr)] xl:gap-24">
      <nav aria-label="FAQ categories" className="min-w-0 lg:relative">
        <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
          <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-olive-gray)]">
            Browse by topic
          </p>
          <div className="mt-5 -mx-4 flex snap-x gap-6 overflow-x-auto border-y border-[var(--color-stone)] px-4 py-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:block lg:overflow-visible lg:border-y-0 lg:px-0 lg:py-0">
            {faqCategories.map((category) => (
              <a
                className="group flex min-h-9 shrink-0 snap-start items-center gap-3 text-sm leading-6 text-[var(--color-olive-gray)] transition-colors hover:text-[var(--color-charcoal)] focus-visible:text-[var(--color-charcoal)] lg:min-h-0 lg:border-t lg:border-[var(--color-stone)] lg:py-4"
                href={`#${category.id}`}
                key={category.id}
              >
                <span>{category.label}</span>
                <span
                  aria-hidden="true"
                  className="text-[var(--color-aged-brass)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 lg:ml-auto"
                >
                  →
                </span>
              </a>
            ))}
            <a
              className="group flex min-h-9 shrink-0 snap-start items-center gap-3 text-sm leading-6 text-[var(--color-olive-gray)] transition-colors hover:text-[var(--color-charcoal)] focus-visible:text-[var(--color-charcoal)] lg:min-h-0 lg:border-y lg:border-[var(--color-stone)] lg:py-4"
              href="#initial-questions"
            >
              <span>Initial questions</span>
              <span
                aria-hidden="true"
                className="text-[var(--color-aged-brass)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 lg:ml-auto"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </nav>

      <div className="min-w-0">
        {faqCategories.map((category, categoryIndex) => {
          const categoryItems = faqItems.filter(
            (item) => item.category === category.id,
          );

          return (
            <section
              className={`scroll-mt-[calc(var(--header-height)+1.5rem)] ${
                categoryIndex > 0 ? "mt-16 sm:mt-20" : ""
              }`}
              id={category.id}
              key={category.id}
            >
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-olive-gray)]">
                {String(categoryIndex + 1).padStart(2, "0")}
              </p>
              <h2
                className={`mt-4 text-[2.35rem] font-normal leading-[1.05] text-[var(--color-charcoal)] sm:text-[3.15rem] ${libreCaslonDisplay.className}`}
              >
                {category.label}
              </h2>

              <div className="mt-8 border-y border-[var(--color-stone)] sm:mt-9">
                {categoryItems.map((item, itemIndex) => {
                  const isOpen = openId === item.id;
                  const answerId = `${item.id}-answer`;
                  const questionId = `${item.id}-trigger`;

                  return (
                    <article
                      className={`scroll-mt-[calc(var(--header-height)+1.5rem)] ${
                        itemIndex > 0
                          ? "border-t border-[var(--color-stone)]"
                          : ""
                      }`}
                      id={item.id}
                      key={item.id}
                    >
                      <h3>
                        <button
                          aria-controls={answerId}
                          aria-expanded={isOpen}
                          className="group flex w-full items-start justify-between gap-6 py-6 text-left text-[var(--color-charcoal)] transition-colors hover:text-[var(--color-olive-gray)] focus-visible:text-[var(--color-olive-gray)] sm:items-center sm:py-7"
                          id={questionId}
                          onClick={() => toggleItem(item)}
                          type="button"
                        >
                          <span className="text-base leading-7 sm:text-lg">
                            {item.question}
                          </span>
                          <span
                            aria-hidden="true"
                            className="mt-1 shrink-0 text-xl font-light leading-none text-[var(--color-olive-gray)] transition-transform duration-200 motion-reduce:transition-none sm:mt-0"
                          >
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>
                      </h3>

                      <div
                        aria-hidden={!isOpen}
                        aria-labelledby={questionId}
                        className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                        id={answerId}
                        role="region"
                      >
                        <div className="overflow-hidden">
                          <div className="max-w-[720px] pb-7 sm:pb-8">
                            <p className="text-sm leading-[1.82] text-[var(--color-olive-gray)] sm:text-base">
                              {item.answer}
                            </p>
                            <button
                              className="mt-5 inline-flex min-h-8 items-center text-[0.66rem] uppercase tracking-[0.16em] text-[var(--color-olive-gray)] transition-colors hover:text-[var(--color-charcoal)] focus-visible:text-[var(--color-charcoal)]"
                              onClick={() => copyItemLink(item)}
                              tabIndex={isOpen ? 0 : -1}
                              type="button"
                            >
                              {copiedId === item.id ? "Copied" : "Copy link"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}

        <p aria-live="polite" className="sr-only">
          {copiedId ? "Question link copied to clipboard." : ""}
        </p>
      </div>
    </div>
  );
}
