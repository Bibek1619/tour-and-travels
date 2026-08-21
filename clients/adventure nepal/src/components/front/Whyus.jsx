import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MapPin, Clock, Shield, Star, Headphones, CreditCard,
  ChevronLeft, ChevronRight, PlayCircle, ArrowRight,
} from "lucide-react";
import { useHomepageContent } from "@/contexts/HomepageContentContext";

const iconMap = { MapPin, Clock, Shield, Star, Headphones, CreditCard };

// ── Typing animation for one word at a time ──────────────────────
const WORDS = ["confidence", "comfort", "safety", "joy"];

function TypingWord() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | pause | deleting

  useEffect(() => {
    const word = WORDS[wordIdx];
    let timer;

    if (phase === "typing") {
      if (displayed.length < word.length) {
        timer = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
      } else {
        timer = setTimeout(() => setPhase("pause"), 1600);
      }
    } else if (phase === "pause") {
      timer = setTimeout(() => setPhase("deleting"), 400);
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
      } else {
        setWordIdx((prev) => (prev + 1) % WORDS.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timer);
  }, [displayed, phase, wordIdx]);

  return (
    <span className="text-green-500 inline-flex items-baseline">
      {displayed}
      <span
        className="ml-0.5 inline-block w-[3px] h-[1em] bg-green-500 align-middle"
        style={{ animation: "blink 1s step-end infinite" }}
      />
    </span>
  );
}

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
    if (paused || length === 0 || slides[index]?.type === "video") return;
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
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      {/* Cursor blink keyframe injected once */}
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Header ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-green-600 mb-4">
            Why Adventure Nepal
          </p>

          {/* Headline with typing word */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Travel with{" "}
            <TypingWord />
            <br className="hidden sm:block" />
            <span className="text-gray-400 font-normal text-2xl sm:text-3xl lg:text-4xl">
              every step of the way.
            </span>
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-2">
            <p className="text-gray-500 max-w-2xl text-base sm:text-lg leading-relaxed">
              {whyUs.description}
            </p>
            <Link
              to={whyUs.ctaLink}
              className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors group shrink-0"
            >
              {whyUs.ctaText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* ── Main Grid ──────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">

          {/* Left — Feature Cards */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => {
              const Icon = iconMap[f.icon] || Star;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="group relative bg-gray-50 hover:bg-white border border-gray-100 hover:border-green-200 hover:shadow-md rounded-2xl p-5 transition-all duration-300 cursor-default"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 group-hover:border-green-200 group-hover:bg-green-50 flex items-center justify-center mb-4 transition-colors shadow-sm">
                    <Icon className="w-5 h-5 text-gray-500 group-hover:text-green-600 transition-colors" />
                  </div>

                  {/* Badge — the big number */}
                  <div className="text-2xl font-black text-gray-900 leading-none mb-1">
                    {f.badge}
                  </div>

                  {/* Title */}
                  <div className="font-semibold text-gray-800 text-sm mb-1">
                    {f.title}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {f.description}
                  </p>

                  {/* Subtle green accent line on hover */}
                  <div className="absolute bottom-0 left-5 right-5 h-[2px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                </motion.div>
              );
            })}
          </div>

          {/* Right — Media Slider */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div
              className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl bg-gray-900 select-none"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
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

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                    <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">
                      {slide?.subtitle}
                    </p>
                    <p className="text-white font-bold text-xl sm:text-2xl mb-4">
                      {slide?.title}
                    </p>
                    <div className="flex items-center gap-2">
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goTo(i)}
                          aria-label={`Slide ${i + 1}`}
                          className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                            i === index ? "w-8 bg-green-400" : "w-1.5 bg-white/30 hover:bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {slide?.type === "video" && (
                <span className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-black/40 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  <PlayCircle className="w-3.5 h-3.5" />
                  Video
                </span>
              )}

              <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-medium tabular-nums">
                {index + 1} / {length}
              </div>

              <button
                onClick={prev}
                aria-label="Previous"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/15 hover:bg-white/35 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/15 hover:bg-white/35 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer"
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
