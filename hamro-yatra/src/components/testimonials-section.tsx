"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Quote } from "lucide-react";
import type { Review } from "@/lib/types";

// ── Name-initial avatar ───────────────────────────────────────────
const COLORS = [
  ["#16a34a", "#dcfce7"],
  ["#ea580c", "#fff7ed"],
  ["#2563eb", "#eff6ff"],
  ["#7c3aed", "#f5f3ff"],
  ["#db2777", "#fdf2f8"],
  ["#0891b2", "#ecfeff"],
];
function avatarPair(name = "") {
  return COLORS[(name.charCodeAt(0) || 0) % COLORS.length];
}
function initials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}
function Avatar({ name, size }: { name: string; size?: "sm" | "lg" }) {
  const [fg, bg] = avatarPair(name);
  const cls = size === "sm" ? "w-9 h-9 text-xs" : "w-11 h-11 text-sm";
  return (
    <div
      className={`${cls} rounded-full flex items-center justify-center font-bold flex-shrink-0`}
      style={{ backgroundColor: bg, color: fg }}
    >
      {initials(name)}
    </div>
  );
}

// ── Fallback static data (if API is empty) ──
const fallbackFeatured = {
  videoThumbnail:
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
  review:
    "Nepal changed my perspective on life. The mountains, the people, the culture — Hamro Yatra Adventure made sure I experienced it all in the most authentic way possible.",
  name: "David Thompson",
  location: "USA",
  title: "Everest Base Camp Trek",
};

const fallbackCards: Review[] = [
  {
    _id: "f1",
    review:
      "Hamro Yatra Adventure planned our entire Everest Base Camp trek flawlessly. The guides were incredibly knowledgeable, and every detail was taken care of.",
    name: "Sarah Mitchell",
    location: "USA",
    title: "Everest Base Camp Trek",
  },
  {
    _id: "f2",
    review:
      "From the moment we landed in Kathmandu, everything was perfect. The cultural tour was beautifully organized, and the team was so warm and welcoming.",
    name: "James Wilson",
    location: "UK",
    title: "Nepal Cultural Tour",
  },
  {
    _id: "f3",
    review:
      "The Annapurna Circuit trek exceeded all my expectations. Our guide was passionate and made the journey unforgettable. I will definitely book again.",
    name: "Priya Sharma",
    location: "India",
    title: "Annapurna Circuit Trek",
  },
  {
    _id: "f4",
    review:
      "We booked a family tour to Pokhara and Chitwan. The kids loved the jungle safari, and the whole trip was stress-free. Hamro Yatra Adventure truly cares.",
    name: "Emily Chen",
    location: "Australia",
    title: "Pokhara & Chitwan Family Tour",
  },
];

function entityLabel(review: Review): string {
  return (
    review.tour?.title || review.vehicle?.name || review.adventure?.name || ""
  );
}

export function TestimonialsSection({
  reviews,
  content,
}: {
  reviews: Review[];
  content?: {
    badge?: string;
    title?: string;
    highlight?: string;
    video?: string;
    videoThumbnail?: string;
  };
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    setTimeout(() => {
      videoRef.current?.play().catch(() => {});
    }, 50);
  };

  const section = {
    badge: "Testimonials",
    title: "What Our Travelers Say",
    highlight: "Travelers",
    ...content,
  };

  const apiReviews = reviews;
  const featured = apiReviews.length
    ? {
        videoThumbnail: apiReviews[0].videoThumbnail,
        review: apiReviews[0].review,
        name: apiReviews[0].name,
        location: apiReviews[0].location || "",
        title: entityLabel(apiReviews[0]) || apiReviews[0].title || "",
      }
    : fallbackFeatured;
  const cards = apiReviews.length ? apiReviews.slice(1, 5) : fallbackCards;

  const videoSrc = section.video || "/hero%20video.mp4";
  const videoThumb =
    section.videoThumbnail ||
    featured.videoThumbnail ||
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80";

  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            {section.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our{" "}
            <span className="text-orange-600">{section.highlight}</span> Say
          </h2>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-[2fr_3fr] gap-8 items-start">
          {/* ── LEFT — video + big quote ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {/* Video */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg group bg-black">
              {playing ? (
                <video
                  ref={videoRef}
                  src={videoSrc}
                  poster={videoThumb}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-[200px] md:h-[240px] object-cover"
                />
              ) : (
                <>
                  <img
                    src={videoThumb}
                    alt="Video testimonial"
                    className="w-full h-[200px] md:h-[240px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <button
                    onClick={handlePlay}
                    className="absolute inset-0 flex items-center justify-center"
                    aria-label="Play video"
                  >
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-orange-600 ml-0.5" />
                    </div>
                  </button>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-xs font-medium drop-shadow-lg">
                      &ldquo;It really made us experience Nepal like never
                      before.&rdquo;
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Big Quote card */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
              <Quote className="w-7 h-7 text-orange-200 mb-3" />
              <p className="text-lg md:text-xl font-bold text-gray-900 leading-snug mb-4">
                &ldquo;{featured.review}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <Avatar name={featured.name} size="sm" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {featured.name}
                    {featured.location && (
                      <span className="text-gray-500 font-normal">
                        , {featured.location}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">{featured.title}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT — 2×2 cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {cards.map((t, i) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="bg-white rounded-2xl p-7 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  &ldquo;{t.review}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Avatar name={t.name} size="lg" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {t.name}
                      {t.location && (
                        <span className="text-gray-500 font-normal">
                          , {t.location}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">
                      {entityLabel(t) || t.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;