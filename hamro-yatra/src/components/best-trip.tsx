import Link from "next/link";
import type { ComponentType } from "react";
import {
  Mountain,
  MapPin,
  Clock,
  Flame,
  Calendar,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Star,
  Award,
  Users,
  Compass,
} from "lucide-react";
import { asList } from "@/lib/icon-map";
import type { BestTripContent } from "@/lib/page-content/types";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&q=80";

const DEFAULT_STATS: { icon: string; label: string; value: string }[] = [
  { icon: "Mountain", label: "Altitude", value: "3,519 m" },
  { icon: "Clock", label: "Duration", value: "8 Days" },
  { icon: "Flame", label: "Difficulty", value: "Moderate" },
  { icon: "Calendar", label: "Best Season", value: "Mar–May" },
];

const DEFAULT_HIGHLIGHTS = [
  "Panoramic Annapurna II & Gangapurna views",
  "Turquoise Gangapurna Glacier Lake",
  "Ancient Braga Monastery & Manangi culture",
  "High-altitude yak pastures & trails",
];

const DEFAULT_DESCRIPTION =
  "Manang Village sits at 3,519m on the legendary Annapurna Circuit. Wander through alpine valleys dotted with yak pastures, soak in the turquoise Gangapurna Lake and explore Buddhist monasteries of the ancient Manangi people — all beneath the towering Himalaya of Annapurna II and Gangapurna. This is our team's most loved journey in Nepal.";

const STAT_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  Mountain,
  MapPin,
  Clock,
  Flame,
  Calendar,
  Star,
  Award,
  Users,
  Compass,
  TrendingUp,
};

export function BestTrip({ content }: { content: BestTripContent }) {
  const image = content?.image || DEFAULT_IMAGE;
  const title = content?.title || "Manang Trip";
  const location = content?.location || "Manang, Annapurna Region, Nepal";
  const description = content?.description || DEFAULT_DESCRIPTION;
  const badge = content?.badge || "Best Trip";
  const badgeSub = content?.badgeSub || "Most Loved by Travelers";
  const ctaHref = content?.ctaHref || "/tours";
  const ctaText = content?.ctaText || "View Details";
  const stats =
    content?.stats && content.stats.length > 0 ? content.stats : DEFAULT_STATS;
  const highlights = asList(content?.highlights);
  const highlightList = highlights.length > 0 ? highlights : DEFAULT_HIGHLIGHTS;
  const whatsappNumber = content?.whatsappNumber || "9779826689739";
  const whatsappMessage =
    content?.whatsappMessage || "Hi, I am interested in the Manang Trip";
  const duration =
    stats.find((s) => /duration/i.test(s.label))?.value ?? "8 Days";
  return (
    <section className="py-20 bg-gradient-to-b from-white via-orange-50/50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-2 bg-orange-600 text-white text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg shadow-orange-600/30">
                <Star className="w-4 h-4 fill-current" />
                {badge}
              </span>
              <span className="inline-flex items-center gap-1.5 text-orange-600 font-semibold text-sm">
                <TrendingUp className="w-4 h-4" />
                {badgeSub}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 text-balance">
              {title}
            </h2>

            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <MapPin className="w-5 h-5 text-orange-500" />
              <span className="font-medium">{location}</span>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-xl text-pretty">
              {description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {stats.map(({ icon, label, value }) => {
                const Icon = STAT_ICONS[icon] ?? Mountain;
                return (
                  <div
                    key={label}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center"
                  >
                    <Icon className="w-5 h-5 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm font-bold text-gray-900">{value}</p>
                    <p className="text-xs text-gray-500">{label}</p>
                  </div>
                );
              })}
            </div>

            {/* Highlights */}
            <ul className="space-y-3 mb-8">
              {highlightList.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3" />
                  </span>
                  <span className="text-gray-700">{h}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-orange-600/30 hover:shadow-xl hover:-translate-y-0.5"
              >
                {ctaText}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-green-500 hover:text-green-600 text-gray-700 px-7 py-3.5 rounded-xl font-semibold transition-colors"
              >
                <span className="text-green-600">Message us</span>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-orange-900/20 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={title}
                className="w-full h-[480px] lg:h-[560px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Top badge */}
              <div className="absolute top-5 left-5 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur px-4 py-2 rounded-full shadow-lg">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-bold text-gray-900">
                  Top Himalayan Destination
                </span>
              </div>

              {/* Bottom info card */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-white font-bold text-2xl mb-1">{title}</p>
                  <p className="text-white/90 text-sm inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {location}
                  </p>
                </div>
                <div className="bg-orange-600 rounded-xl px-4 py-3 text-center shadow-lg">
                  <p className="text-white font-extrabold text-lg leading-none">
                    {duration}
                  </p>
                  <p className="text-orange-100 text-xs mt-1">Annapurna Circuit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BestTrip;