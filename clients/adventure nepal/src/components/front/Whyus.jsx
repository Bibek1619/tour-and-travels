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

const slides = [
  {
    type: "video",
    src: "/hero video.mp4",
    title: "Adventure Awaits",
    subtitle: "Experience the very best of Nepal",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
    title: "Majestic Himalayas",
    subtitle: "Trek the world's highest peaks",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1200&q=80",
    title: "Ancient Kathmandu",
    subtitle: "Culture, heritage & timeless temples",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=1200&q=80",
    title: "Uncharted Trails",
    subtitle: "Remote valleys & hidden mountain lakes",
  },
];

const features = [
  {
    icon: MapPin,
    title: "Popular Destinations",
    badge: "20+",
    description: "Mustang, Rara Lake, Dhorpatan, Pokhara and more",
  },
  {
    icon: Clock,
    title: "Real-time Booking",
    badge: "24/7",
    description: "Live seat availability and instant confirmation",
  },
  {
    icon: Shield,
    title: "Safe & Reliable",
    badge: "100%",
    description: "Licensed vehicles and experienced drivers",
  },
  {
    icon: Star,
    title: "Rated Experience",
    badge: "4.8/5",
    description: "Verified reviews and ratings for every service",
  },
  {
    icon: Headphones,
    title: "Live Support",
    badge: "Always Here",
    description: "24/7 support in Nepali and English",
  },
  {
    icon: CreditCard,
    title: "Easy Payment",
    badge: "Secure",
    description: "Khalti, eSewa, cards and bank transfers accepted",
  },
];

export default function Whyus() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const length = slides.length;

  const goTo = useCallback((i) => setIndex((i + length) % length), [length]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || slides[index].type === "video") return undefined;
    const t = setTimeout(next, 5000);
    return () => clearTimeout(t);
  }, [index, next, paused]);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) {
      dx > 0 ? prev() : next();
    }
    touchX.current = null;
  };

  const slide = slides[index];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-green-50/40 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm uppercase tracking-wider mb-3">
            <Star className="w-4 h-4" />
            Why Adventure Nepal
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-green-600">Adventure Nepal?</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Media Slider — shown first on mobile, right on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <div
              className="relative h-[320px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gray-900 select-none"
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
                  {slide.type === "video" ? (
                    <video
                      src={slide.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={slide.src}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                  {/* Caption + Dots */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <p className="text-white text-xl font-semibold mb-1">
                      {slide.title}
                    </p>
                    <p className="text-white/85 text-sm mb-4">{slide.subtitle}</p>
                    <div className="flex justify-center gap-2">
                      {slides.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => goTo(i)}
                          aria-label={`Slide ${i + 1}`}
                          className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                            i === index ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Video badge */}
              {slide.type === "video" && (
                <span className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  <PlayCircle className="w-4 h-4" />
                  Video
                </span>
              )}

              {/* Counter */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-black/60 text-white text-sm font-medium">
                {index + 1} / {length}
              </div>

              {/* Chevron controls */}
              <button
                onClick={prev}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={next}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>

          {/* Why Us Content — shown below slider on mobile, left on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Travel with confidence,{" "}
              <span className="text-green-600">every step of the way</span>
            </h3>
            <p className="text-gray-600 leading-relaxed mb-8">
              We provide comprehensive travel solutions with the highest
              standards of safety, comfort, and customer service in Nepal — from
              planning to the road, we've got you covered.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-green-200 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 w-11 h-11 rounded-xl flex items-center justify-center shadow-md shadow-green-200">
                      <f.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {f.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{f.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>

            <Link
              to="/tours"
              className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Explore Tours
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
