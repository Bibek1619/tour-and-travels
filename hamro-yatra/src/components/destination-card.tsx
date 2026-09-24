"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { DestinationCardData } from "@/lib/destination-cards";

export interface DestinationCardProps {
  card: DestinationCardData;
  index: number;
  isActive: boolean;
  hasActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

export function DestinationCard({
  card,
  index,
  isActive,
  hasActive,
  onActivate,
  onDeactivate,
}: DestinationCardProps) {
  const morph = hasActive
    ? isActive
      ? "md:grow-[3] md:basis-0"
      : "md:grow-[0.8] md:basis-0"
    : "md:grow md:basis-0";

  const toggle = () => (isActive ? onDeactivate() : onActivate());

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      onDeactivate();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      data-destination-card={card.id}
      aria-expanded={isActive}
      aria-label={`${card.category}: ${card.name}`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onBlur={handleBlur}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      className={`relative group cursor-pointer overflow-hidden outline-none select-none touch-pan-y
        focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-inset focus-visible:z-20
        ${isActive ? "h-[440px] sm:h-[480px]" : "h-[200px] sm:h-[240px]"}
        ${index > 0 ? "border-t border-[#1D7447] md:border-t-0 md:border-l md:border-[#1D7447]" : ""}
        md:h-full
        ${morph}
        transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
      `}
    >
      {/* Base image */}
      <Image
        src={card.image}
        alt={card.name}
        fill
        sizes="(max-width: 768px) 100vw, 512px"
        className={`object-cover
          transition-opacity duration-700 ease-in-out will-change-opacity ${
            isActive ? "opacity-0" : "opacity-100"
          }`}
      />
      {/* Hover image (crossfades in when active with a gentle dolly zoom) */}
      <Image
        src={card.hoverImage}
        alt={`${card.name} – highlight view`}
        fill
        sizes="(max-width: 768px) 100vw, 512px"
        className={`object-cover scale-110
          transition-opacity duration-700 ease-in-out will-change-opacity ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
      />

      {/* Permanent readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/45" />

      {/* Dark overlay + blur for inactive (desktop) cards */}
      <div
        className={`absolute inset-0 bg-black/55 backdrop-blur-[2px] hidden md:block
          transition-opacity duration-500 ease-in-out pointer-events-none ${
            isActive ? "opacity-0" : "opacity-100"
          }`}
      />

      {/* Vertical label for collapsed cards (desktop) */}
      <div
        className={`absolute bottom-10 left-8 hidden md:block -rotate-90 origin-left z-10
          transition-all duration-500 ease-in-out ${
            isActive
              ? "opacity-0 scale-90 pointer-events-none"
              : "opacity-100 scale-100"
          }`}
      >
        <p className="text-white/60 text-[9px] font-bold uppercase tracking-[0.25em] mb-1.5 whitespace-nowrap">
          {card.category}
        </p>
        <h4 className="text-xl lg:text-2xl text-white font-bold tracking-[0.12em] whitespace-nowrap">
          {card.name}
        </h4>
      </div>

      {/* Category label + accent line + name (top content) */}
      <div
        className={`absolute inset-x-0 top-0 p-5 sm:p-7 md:p-8 z-10
          transition-all duration-500 ease-in-out ${
            isActive
              ? "opacity-100 translate-y-0"
              : "opacity-100 translate-y-0 md:opacity-0 md:-translate-y-4 pointer-events-none"
          }`}
      >
        <div className={`h-0.5 bg-green-400 mb-3 transition-all duration-700 ease-in-out ${
          isActive ? "w-16 md:w-24" : "w-10"
        }`} />
        <p className="text-green-300 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] mb-2">
          {card.category}
        </p>
        <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-white font-bold tracking-tight">
          {card.name}
        </h3>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-white/80 text-xs md:text-sm">
          <span>{card.country}</span>
          <span className="text-white/40">•</span>
          <span className="text-green-300 font-semibold whitespace-nowrap">
            {card.badge}
          </span>
        </div>
      </div>

      {/* Explore button (slides up with delay on active) */}
      <div
        className={`absolute inset-x-0 bottom-0 p-5 sm:p-7 md:p-8 z-10 ${
          isActive
            ? "opacity-100 translate-y-0 transition-all duration-700 ease-in-out md:delay-200"
            : "opacity-0 translate-y-8 transition-all duration-300 ease-in-out pointer-events-none"
        }`}
      >
        <Link
          href={card.href}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 backdrop-blur-md px-6 py-2.5 text-[11px] md:text-xs font-bold uppercase tracking-widest text-white
            transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/25 hover:border-white/60 focus-visible:scale-105 focus-visible:bg-white/25 active:scale-95"
          aria-label={`Explore ${card.name}`}
        >
          Explore
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default DestinationCard;