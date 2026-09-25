"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { scorpioRoutes } from "@/lib/scorpio-routes";

interface ScorpioDestinationCardsProps {
  heroImage: string;
}

export function ScorpioDestinationCards({
  heroImage,
}: ScorpioDestinationCardsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({
    hasOverflow: false,
    canScrollLeft: false,
    canScrollRight: false,
  });

  const destinations = scorpioRoutes
    .filter((route) => route.slug !== "pokhara-to-ghorepani-scorpio-hire")
    .map((route) => ({
      href: `/vehicles/${route.slug}`,
      title: route.route,
      image: route.image ?? heroImage,
      meta: route.meta,
    }));

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
      const scrollLeft = Math.min(maxScroll, Math.max(0, el.scrollLeft));
      setState({
        hasOverflow: maxScroll > 1,
        canScrollLeft: maxScroll > 1 && scrollLeft > 1,
        canScrollRight: maxScroll > 1 && scrollLeft < maxScroll - 1,
      });
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollCards = (direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    const target = Math.min(
      maxScroll,
      Math.max(0, el.scrollLeft + direction * 340)
    );
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  return (
    <section className="py-6" aria-labelledby="popular-destinations-title">
      <div className="text-center">
        <h2
          id="popular-destinations-title"
          className="text-2xl font-bold text-gray-900 md:text-3xl"
        >
          Handpicked Routes from Pokhara
        </h2>
      </div>

      <div className="relative mt-8">
        <div
          ref={scrollRef}
          role="region"
          aria-label="Popular Scorpio destinations"
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scrollbar-hide pb-3"
        >
          {destinations.map((destination) => (
            <Link
              key={destination.href}
              href={destination.href}
              aria-label={`${destination.title} scorpio hire in Pokhara`}
              className="w-[280px] shrink-0 snap-start sm:w-[320px]"
            >
              <article className="group h-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl">
              <div className="relative m-3 h-52 overflow-hidden rounded-xl bg-gray-100 sm:h-56">
                <Image
                  src={destination.image}
                  alt={destination.title}
                  fill
                  sizes="(max-width: 640px) 280px, 320px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
              </div>

              <div className="flex flex-col px-5 pb-5 pt-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  From Pokhara
                </p>
                <h3 className="mt-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-orange-600">
                  {destination.title}
                </h3>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-100 pt-4 text-xs font-semibold text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-orange-500" />
                    {destination.meta}
                  </span>
<span className="shrink-0 rounded-full bg-orange-50 px-2.5 py-1 text-orange-700">
                    View Route
</span>
                </div>
              </div>
            </article>
            </Link>
          ))}
        </div>

        {state.hasOverflow && (
          <>
            <button
              type="button"
              aria-label="Scroll destinations left"
              onClick={() => scrollCards(-1)}
              disabled={!state.canScrollLeft}
              className="absolute left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-orange-600 shadow-lg transition hover:border-orange-300 hover:bg-orange-600 hover:text-white disabled:pointer-events-none disabled:opacity-0 md:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Scroll destinations right"
              onClick={() => scrollCards(1)}
              disabled={!state.canScrollRight}
              className="absolute right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-orange-600 shadow-lg transition hover:border-orange-300 hover:bg-orange-600 hover:text-white disabled:pointer-events-none disabled:opacity-0 md:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default ScorpioDestinationCards;
