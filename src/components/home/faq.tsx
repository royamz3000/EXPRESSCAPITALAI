"use client";

import { useState } from "react";

import { faqs } from "@/content/home";
import { libreCaslonDisplay } from "@/lib/fonts";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="border-t border-[rgba(49,42,32,0.1)] bg-[#f4efe4] px-4 py-20 text-[#221d17] sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="motion-reveal max-w-xl" data-reveal>
          <p className="text-[0.76rem] uppercase tracking-[0.2em] text-[#6f7354]">
            FAQ
          </p>
          <h2 className={`mt-7 text-4xl font-normal leading-[1.05] text-[#221d17] sm:text-6xl ${libreCaslonDisplay.className}`}>
            Questions before you apply.
          </h2>
        </div>

        <div className="motion-stagger border-y border-[rgba(49,42,32,0.14)]" data-reveal>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;
            const questionId = `faq-question-${index}`;

            return (
              <div
                className={`motion-stagger-item ${
                  index > 0 ? "border-t border-[rgba(49,42,32,0.12)]" : ""
                }`}
                key={faq.question}
              >
                <h3>
                  <button
                    aria-controls={answerId}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left transition hover:text-[#4c5137] sm:py-7"
                    id={questionId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    type="button"
                  >
                    <span className="text-base leading-7 text-[#2a261f] sm:text-lg">
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-lg leading-none text-[#6f7354]"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  aria-hidden={!isOpen}
                  aria-labelledby={questionId}
                  className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                  id={answerId}
                  role="region"
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 text-sm leading-[1.75] text-[#62584a] sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
