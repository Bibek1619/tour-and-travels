"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Clock, MapPin, MessageCircle } from "lucide-react";
import { asList } from "@/lib/icon-map";
import type { Tour } from "@/lib/types";
import type { BestTripContent } from "@/lib/page-content/types";
import { motion, type Variants } from "framer-motion";

const DEFAULT_IMAGE = "/pkr-manangfix.png";

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
  hidden: { opacity: 0, scale: 0.92, x: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.8, ease: smoothEase, delay: 0.2 },
  },
};

const shimmer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 1, 0],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
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
    <section className="relative overflow-hidden bg-white py-12 md:py-16 font-sans">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <motion.div
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* ── Text Column ── */}
          <motion.div variants={stagger} className="order-2 lg:order-1">
            {/* Badge */}
            <motion.div 
              variants={fadeUp} 
              className="mb-3 inline-block"
            >
              <div className="inline-flex items-center gap-2 border-l-3 border-orange-600 bg-orange-50 px-3 py-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-orange-900">
                  Featured Journey
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl mb-2"
            >
              {title}
            </motion.h2>
            
            {/* Decorative line */}
            <motion.div
              variants={lineGrow}
              className="h-0.5 w-16 bg-orange-600 mb-4"
            />

            {/* Duration & Price */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3 text-xs mb-4"
            >
              {duration && (
                <div className="inline-flex items-center gap-1.5 rounded-lg border border-green-100 bg-green-50/50 px-3 py-1.5 text-gray-700 transition-colors hover:bg-green-50">
                  <Clock className="h-3.5 w-3.5 text-green-600" />
                  <span className="font-semibold">{duration}</span>
                </div>
              )}
              {price !== null && (
                <div className="inline-flex items-center gap-2 rounded-lg border border-green-100 bg-green-50/50 px-3 py-1.5 transition-colors hover:bg-green-50">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-gray-600">
                    From
                  </span>
                  <span className="text-base font-bold text-gray-900">
                    NPR {price.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Description */}
            {description && (
              <motion.p
                variants={fadeUpSlow}
                className="text-base leading-relaxed text-gray-700 mb-5"
              >
                {description}
              </motion.p>
            )}

            {/* Highlights */}
            <motion.div className="mb-5" variants={stagger}>
              <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-3">
                Journey Highlights
              </h3>
              <ul className="grid grid-cols-2 gap-2.5">
                {highlights.map((highlight, index) => (
                  <motion.li
                    key={`${highlight}-${index}`}
                    variants={fadeUp}
                    className="flex items-center gap-2 rounded-xl border border-green-100 bg-green-50/50 p-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-green-50"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-600 shadow-sm shadow-green-600/20">
                      <Check className="h-3.5 w-3.5 text-white stroke-[2.5]" />
                    </span>
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href={ctaHref}
                className="group inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 text-sm font-semibold transition-all hover:bg-orange-700"
              >
                {ctaText}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 border-green-600 text-green-700 px-6 py-3 text-sm font-semibold transition-all hover:bg-green-50"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* ── Image Column ── */}
          <motion.div variants={imageReveal} className="order-1 lg:order-2">
            <div className="relative group">
              {/* Clean image with border */}
              <div className="relative overflow-hidden border-4 border-white shadow-2xl bg-gray-100">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={image}
                    alt={`${title}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
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
