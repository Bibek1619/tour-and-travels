"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import type { FaqItem } from "@/lib/types";

export default function FaqSection({
  title = "Frequently Asked Questions",
  subtitle,
  items,
  className,
}: {
  title?: string;
  subtitle?: string;
  items?: FaqItem[] | { q: string; a: string }[];
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = items?.filter((i) => i.q?.trim() || i.a?.trim()) ?? [];
  if (faqs.length === 0) return null;

  return (
    <div className={className}>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-gray-600 mb-6 max-w-2xl">{subtitle}</p>
      )}

      <div className="divide-y divide-gray-200">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex justify-between items-center gap-3 py-4 text-left group"
              >
                <span className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-orange-600 transition-colors leading-snug">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                    isOpen
                      ? "rotate-180 text-orange-600"
                      : "text-gray-400 group-hover:text-orange-500"
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-4 text-sm leading-relaxed text-gray-600 max-w-3xl">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-orange-50 border border-orange-100 px-4 py-3">
        <p className="text-sm font-semibold text-gray-900">
          Still have questions?
        </p>
        <a
          href="/contact"
          className="inline-flex items-center justify-center gap-1.5 shrink-0 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Contact Us
        </a>
      </div>
    </div>
  );
}