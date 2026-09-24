"use client";

import { useEffect, useRef, useState } from "react";
import { Compass } from "lucide-react";
import { DEFAULT_CARDS, type DestinationCardData } from "@/lib/destination-cards";
import { DestinationCard } from "@/components/destination-card";

export function DestinationAccordion({
  cards = DEFAULT_CARDS,
}: {
  cards?: DestinationCardData[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const hasActive = activeId !== null;
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const mq = window.matchMedia("(max-width: 767px)");
    let observer: IntersectionObserver | null = null;

    const setup = () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      if (!mq.matches) return;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const id = (entry.target as HTMLElement).dataset.destinationCard;
            if (!id) continue;
            if (entry.isIntersecting) {
              setActiveId(id);
            } else {
              setActiveId((prev) => (prev === id ? null : prev));
            }
          }
        },
        { rootMargin: "0px 0px -20% 0px", threshold: 0.3 }
      );
      row
        .querySelectorAll<HTMLElement>("[data-destination-card]")
        .forEach((el) => observer!.observe(el));
    };

    setup();
    mq.addEventListener("change", setup);
    return () => {
      observer?.disconnect();
      mq.removeEventListener("change", setup);
    };
  }, []);

  return (
    <section id="top-destinations" className="pt-16 md:pt-24 pb-0 bg-[#1D7447]">
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2.5 mb-3">
          <Compass className="w-6 h-6 text-white" aria-hidden="true" />
          <span className="text-white/90 font-bold text-xs md:text-sm uppercase tracking-[0.4em]">
            Signature Services
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
          Our Best Services
        </h2>
        <p className="mt-4 text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">
          Handpicked tours, treks, rentals and adventures — everything you need
          for an unforgettable Nepal experience.
        </p>
      </div>

      {/* Accordion row — rounded container aligned to the site width */}
      <div className="mt-10 md:mt-14 max-w-7xl mx-auto px-4">
        <div
          ref={rowRef}
          className="destination-accordion flex flex-col md:flex-row rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl md:h-[440px] lg:h-[480px]"
          onMouseLeave={() => setActiveId(null)}
        >
          {cards.map((card, i) => (
            <DestinationCard
              key={card.id}
              card={card}
              index={i}
              isActive={activeId === card.id}
              hasActive={hasActive}
              onActivate={() => setActiveId(card.id)}
              onDeactivate={() => setActiveId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DestinationAccordion;