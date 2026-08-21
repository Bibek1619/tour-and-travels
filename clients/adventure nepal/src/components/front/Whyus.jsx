import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MapPin,
  Clock,
  Shield,
  Star,
  Headphones,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  ArrowRight,
} from "lucide-react";
import { useHomepageContent } from "@/contexts/HomepageContentContext";

const iconMap = { MapPin, Clock, Shield, Star, Headphones, CreditCard };

export default function Whyus() {
  const { content } = useHomepageContent();
  const { whyUs } = content;
  const slides = whyUs.slides;
  const features = whyUs.features;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const length = slides.length;

  const goTo = useCallback((i) => setIndex((i + length) % length), [length]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || length === 0 || slides[index]?.type === "video") return undefined;
    const t = setTimeout(next, 5000);
    return () => clearTimeout(t);
  }, [index, next, paused, length, slides]);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) dx > 0 ? prev() : next();
    touchX.current = null;
  };

  const slide = slides[index] || slides[0];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-green-600">
            Why Us
          </span>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Travel with confidence,{" "}
                <span className="text-green-600">every step of the way.</span>
              </h2>
              <p className="mt-3 text-gray-500 max-w-2xl text-base leading-relaxed">
                {whyUs.description}
              </p>
            </div>
            <Link
              to={whyUs.ctaLink}
              className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors group shrink-0"
            >
              {whyUs.ctaText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Left — 3×2 feature grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => {
              const Icon = iconMap[f.icon] || Star;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-green-200 hover:shadow-md transition-all"
                >
                  {/* Icon + badge row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
                      {f.badge}
                    </span>
                  </div>
                  {/* Text */}
                  <h4 className="font-semibold text-gray-900 text-base mb-1">{f.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Right — Media slider */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-gray-900 select-none"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  {slide?.type === "video" ? (
                    <video
                      src={slide.src}
                      autoPlay muted loop playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={slide?.src}
                      alt={slide?.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white font-semibold text-lg mb-0.5">{slide?.title}</p>
                    <p className="text-white/70 text-sm mb-4">{slide?.subtitle}</p>
                    <div className="flex gap-1.5">
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goTo(i)}
                          aria-label={`Slide ${i + 1}`}
                          className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            i === index ? "w-7 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {slide?.type === "video" && (
                <span className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  <PlayCircle className="w-3.5 h-3.5" />
                  Video
                </span>
              )}

              <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
                {index + 1}/{length}
              </div>

              <button
                onClick={prev}
                aria-label="Previous"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
