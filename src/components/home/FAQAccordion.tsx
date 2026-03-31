'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-lg border border-slate-200 bg-white"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-slate-50"
          >
            <h3 className="font-semibold text-slate-900">{item.question}</h3>
            <svg
              className={`h-5 w-5 flex-shrink-0 text-brand-blue transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>

          {openIndex === index && (
            <div className="border-t border-slate-200 px-6 py-4">
              <p className="text-slate-700">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
