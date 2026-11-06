"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle, HelpCircle } from "lucide-react";
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
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-100 mb-4">
          <HelpCircle className="w-7 h-7 text-orange-600" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          {title}
        </h2>
        {subtitle && (
          <p className="text-base text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={`bg-white rounded-xl border-2 transition-all duration-300 ${
                isOpen
                  ? "border-orange-500 shadow-lg shadow-orange-100"
                  : "border-gray-200 hover:border-gray-300 shadow-sm"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex justify-between items-start gap-4 p-5 sm:p-6 text-left group"
              >
                <span className={`text-base sm:text-lg font-semibold leading-snug transition-colors ${
                  isOpen ? "text-orange-600" : "text-gray-900 group-hover:text-orange-600"
                }`}>
                  {item.q}
                </span>
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isOpen ? "bg-orange-600 rotate-180" : "bg-gray-200 group-hover:bg-orange-100"
                }`}>
                  <ChevronDown
                    className={`w-4 h-4 transition-colors ${
                      isOpen ? "text-white" : "text-gray-600"
                    }`}
                  />
                </div>
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                    <div className="w-12 h-0.5 bg-orange-200 mb-4"></div>
                    <p className="text-sm sm:text-base leading-relaxed text-gray-700">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact CTA */}
      <div className="mt-8 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-2xl border border-orange-200 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
              Still have questions?
            </h3>
            <p className="text-sm text-gray-600">
              Our team is here to help you plan your perfect trip
            </p>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 shrink-0 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-orange-600/20 hover:shadow-xl hover:shadow-orange-600/30"
          >
            <MessageCircle className="w-5 h-5" />
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}