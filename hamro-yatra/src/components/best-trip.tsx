import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
} from "lucide-react";
import { asList } from "@/lib/icon-map";
import type { BestTripContent } from "@/lib/page-content/types";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&q=80";

const DEFAULT_HIGHLIGHTS = [
  "Panoramic Annapurna II & Gangapurna views",
  "Turquoise Gangapurna Glacier Lake",
  "Ancient Braga Monastery & Manangi culture",
  "High-altitude yak pastures & trails",
];

export function BestTrip({ content }: { content: BestTripContent }) {
  const image = content?.image || DEFAULT_IMAGE;
  const title = content?.title || "Manang Valley";
  const location = content?.location || "Annapurna, Nepal";
  const ctaHref = content?.ctaHref || "/tours";
  const ctaText = content?.ctaText || "Discover Journey";
  const highlights = asList(content?.highlights);
  const highlightList = highlights.length > 0 ? highlights : DEFAULT_HIGHLIGHTS;
  
  // Extract duration from stats (look for "Duration" or "Clock" icon)
  const durationStat = content?.stats?.find(
    (s) => s.label.toLowerCase().includes('duration') || s.icon === 'Clock'
  );
  const duration = durationStat?.value || "8 Days";

  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-400 rounded-full mix-blend-screen filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Simple Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-1.5 rounded-full">
            <span className="text-xs font-semibold">Featured Destination</span>
          </div>
        </div>

        {/* Split Screen Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          
          {/* LEFT SIDE - Content */}
          <div className="space-y-6 lg:pr-6">
            
            {/* Title */}
            <div className="space-y-2">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {title}
              </h2>
              <div className="flex items-center gap-3">
                <p className="text-lg sm:text-xl text-gray-400">
                  {location}
                </p>
                <span className="text-gray-500">•</span>
                <p className="text-lg sm:text-xl text-orange-400 font-semibold">
                  {duration}
                </p>
              </div>
            </div>

            {/* Simple line separator */}
            <div className="w-16 h-0.5 bg-orange-500 rounded-full" />

            {/* Highlights List */}
            <div className="space-y-3">
              {highlightList.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 group"
                >
                  <div className="flex-shrink-0 w-5 h-5 bg-orange-500/20 rounded-md flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-orange-400" />
                  </div>
                  <span className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button - Simpler */}
            <div className="pt-2">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30"
              >
                {ctaText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE - Image */}
          <div className="relative animate-[float_4s_ease-in-out_infinite]">
            
            {/* Subtle glow elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-500/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl" />

            {/* Main image container */}
            <div className="relative group">
              <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/40 transition-all duration-500 group-hover:shadow-orange-500/20 group-hover:-translate-y-1">
                
                {/* Image */}
                <div className="relative aspect-[4/5]">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  
                  {/* Available badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-lg">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-semibold text-gray-900">Open Year-Round</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle shadow */}
              <div className="absolute inset-0 bg-orange-500/5 rounded-xl blur-xl -z-10 translate-y-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BestTrip;