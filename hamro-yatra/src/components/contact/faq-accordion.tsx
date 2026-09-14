"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const defaultFaqs = [
  {
    q: "How do I book a tour?",
    a: "Contact us via form, phone, or email. We'll customize your itinerary within 24 hours.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Bank transfer, Visa/Mastercard, IME Pay, Khalti, and cash on arrival for smaller bookings.",
  },
  {
    q: "Do you offer private tours?",
    a: "Yes — all tours can be tailored for private groups, couples, or solo travelers.",
  },
  {
    q: "What about travel insurance?",
    a: "We strongly recommend comprehensive travel insurance and can help you arrange it.",
  },
];

export default function FaqAccordion({
  items,
}: {
  items?: { q: string; a: string }[];
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = items && items.length ? items : defaultFaqs;

  return (
    <div className="divide-y divide-gray-100">
      {faqs.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
            className="w-full flex justify-between items-center py-4 text-left gap-4 group"
          >
            <span className="text-sm font-medium text-gray-900 group-hover:text-emerald-700 transition-colors">
              {item.q}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
            />
          </button>
          {openFaq === i && (
            <div className="overflow-hidden">
              <p className="text-sm text-gray-500 leading-relaxed pb-4">
                {item.a}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}