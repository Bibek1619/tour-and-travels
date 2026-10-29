"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Clock, MapPin, MessageCircle } from "lucide-react";
import { asList } from "@/lib/icon-map";
import type { Tour } from "@/lib/types";
import type { BestTripContent } from "@/lib/page-content/types";
import { motion, type Variants } from "framer-motion";

const DEFAULT_IMAGE = "/manangfeatured.jpg";

const DEFAULT_HIGHLIGHTS = [
  "Gangapurna Glacier Lake",
  "Ice Lake (Kicho Tal)",
  "Blue Lake & Green Lake",
  "Scenic Manang Valley",
  "Octopus Waterfall",
  "Chame Hot Spring",
];

const DEFAULT_WHATSAPP = "9779856006671";
const FALLBACK_CTA = "/tours/manang-trip";

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/* ─── animation variants ─── */
const smoothEase = [0.25, 0.46, 0.45, 0.94] as const;

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: smoothEase },
  },
};

const fadeUpSlow: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: smoothEase, delay: 0.15 },
  },
};

const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 0.94, x: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.7, ease: smoothEase },
  },
};

const lineGrow: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.05 },
  },
};

export function BestTrip({
  content,
  tour,
}: {
  content: BestTripContent;
  tour?: Tour | null;
}) {
  const title = tour?.title?.trim() || content.title?.trim() || "Manang Trip";
  const location =
    tour?.location?.trim() ||
    content.location?.trim() ||
    "Manang, Annapurna Region, Nepal";
  const description =
    "Discover Manang on a scenic jeep tour from Pokhara. Travel through the beautiful Marsyangdi Valley and enjoy amazing views of the Annapurna and Gangapurna mountains, clear glacial lakes, waterfalls, and traditional mountain villages along the way.";

  const image = DEFAULT_IMAGE;
  const ctaHref = tour?.slug
    ? `/tours/${tour.slug}`
    : content.ctaHref?.trim() || FALLBACK_CTA;
  const ctaText = content.ctaText?.trim() || "View Manang Package";

  const tourHighlights = (tour?.highlights ?? [])
    .map((highlight) => highlight.trim())
    .filter(Boolean)
    .slice(0, 6);
  const contentHighlights = asList(content.highlights)
    .map((highlight) => highlight.trim())
    .filter(Boolean)
    .slice(0, 6);

  const rawHighlights =
    tourHighlights.length > 0 && !tourHighlights.some((h) => h.includes("Panoramic Annapurna II"))
      ? tourHighlights
      : contentHighlights.length > 0 && !contentHighlights.some((h) => h.includes("Panoramic Annapurna II"))
        ? contentHighlights
        : DEFAULT_HIGHLIGHTS;

  const highlights = rawHighlights;

  const statValue = (needle: string) =>
    content.stats
      ?.find((stat) => stat.label?.toLowerCase().includes(needle))
      ?.value?.trim();

  const duration =
    tour?.durationText?.trim() ||
    (tour?.durationDays ? `${tour.durationDays} Days` : "") ||
    statValue("duration") ||
    (content.stats?.find((stat) => stat.icon === "Clock")?.value ?? "").trim();

  const price =
    typeof tour?.price === "number" &&
    Number.isFinite(tour.price) &&
    tour.price > 0
      ? tour.price
      : null;

  const whatsappNumber = digitsOnly(
    content.whatsappNumber?.trim() || DEFAULT_WHATSAPP
  );
  const whatsappMessage =
    content.whatsappMessage?.trim() ||
    `Hi, I am interested in the ${title} package.`;
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`
    : "";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/50 via-white to-white py-16 md:py-20">
      <motion.div
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ── Text Column ── */}
          <motion.div variants={stagger} className="order-2 lg:order-1">
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-orange-200/60 bg-orange-50/80 px-3 py-1 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 font-sans">
                Featured Journey
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-[1.15]"
            >
              {title}
            </motion.h2>

            {/* Location & Duration */}
            <motion.div
              variants={fadeUp}
              className="mt-3.5 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-sans"
            >
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1 font-medium text-slate-700">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-orange-600" />
                {location}
              </span>
              {duration && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-orange-200/60 bg-orange-50 px-3 py-1 font-semibold text-orange-700">
                  <Clock aria-hidden="true" className="h-3.5 w-3.5 text-orange-600" />
                  {duration}
                </span>
              )}
            </motion.div>

            {/* Description */}
            {description && (
              <motion.p
                variants={fadeUpSlow}
                className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600 font-normal font-sans"
              >
                {description}
              </motion.p>
            )}

            {/* Highlights */}
            <motion.ul className="mt-6 grid gap-2.5 sm:grid-cols-2 font-sans" variants={stagger}>
              {highlights.map((highlight, index) => (
                <motion.li
                  key={`${highlight}-${index}`}
                  variants={fadeUp}
                  className="group flex items-center gap-3 rounded-xl border border-green-100 bg-green-50/50 p-2.5 sm:p-3 shadow-xs transition-all duration-200 hover:bg-green-50 hover:border-green-200"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-600 shadow-sm shadow-green-600/25">
                    <Check aria-hidden="true" className="h-3.5 w-3.5 text-white stroke-[2.5]" />
                  </span>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900">
                    {highlight}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Price */}
            {price !== null && (
              <motion.div variants={fadeUp} className="mt-6 flex items-baseline gap-2 font-sans">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                  Starting from
                </span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                  NPR {price.toLocaleString("en-IN")}
                </span>
                <span className="text-xs font-medium text-slate-500">/ person</span>
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center font-sans"
            >
              <Link
                href={ctaHref}
                className="group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-orange-600/20 transition-all duration-300 hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-600/30 active:scale-[0.98]"
              >
                {ctaText}
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-white px-6 py-3.5 text-sm font-semibold text-green-700 shadow-xs transition-all duration-300 hover:bg-green-50/80 hover:border-green-300 active:scale-[0.98]"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4 text-green-600" />
                  Ask on WhatsApp
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* ── Image Column ── */}
          <motion.div variants={imageReveal} className="order-1 lg:order-2">
            <div className="group relative">
              {/* Decorative accent behind image */}
              <div
                aria-hidden
                className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-orange-200/40 blur-2xl"
              />
              <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-gray-200/60">
                <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5]">
                  <Image
                    src={image}
                    alt={`${title} — ${location}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default BestTrip;
