import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useHomepageContent } from "@/contexts/HomepageContentContext";
import { Mountain, Compass, Bus, Car, X, ChevronRight } from "lucide-react";

const packages = [
  {
    icon: Mountain,
    label: "Trek Packages",
    description: "Everest, Annapurna, Langtang & more",
    href: "/trek-packages",
    color: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Compass,
    label: "Tour Packages",
    description: "Cultural tours, jungle safaris & sightseeing",
    href: "/tours",
    color: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    icon: Car,
    label: "Adventures",
    description: "Paragliding, rafting, peak climbing",
    href: "/adventures",
    color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Bus,
    label: "Seat / Bus Booking",
    description: "Daily routes & vehicle reservations",
    href: "/seat-booking",
    color: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

export function HeroSection() {
  const { content } = useHomepageContent();
  const { hero } = content;
  const heroBg = hero.mediaType === "image" && hero.imageSrc ? hero.imageSrc : null;

  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <section className="relative h-[400px] lg:h-[600px] overflow-hidden">
      {/* Background Media */}
      {heroBg ? (
        <div
          className="absolute inset-0 bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
      ) : (
        <div className="absolute inset-0">
          <video
            src={hero.videoSrc}
            autoPlay loop muted playsInline
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="absolute inset-0 bg-black/50" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance">
          {hero.title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl text-pretty">
          {hero.subtitle}
        </p>

        <button
          onClick={() => setOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white text-lg font-semibold px-8 py-3 rounded-lg cursor-pointer transition-colors shadow-lg hover:shadow-xl"
        >
          {hero.ctaText || "View All Packages"}
        </button>
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/9779826689739"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed left-4 bottom-4 z-50 group"
      >
        <img src="/whatapplogo.webp" alt="WhatsApp" className="w-12 h-12" />
        <span className="absolute left-full bottom-1/2 ml-3 -translate-y-1/2 px-3 py-1 rounded bg-green-600 text-white text-sm opacity-100 whitespace-nowrap">
          Message on WhatsApp!
        </span>
      </a>

      {/* Packages Modal */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Explore Packages</h2>
                <p className="text-sm text-gray-500">Choose what you're looking for</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Options */}
            <div className="p-4 space-y-3">
              {packages.map(({ icon: Icon, label, description, href, iconBg, iconColor }) => (
                <Link
                  key={href}
                  to={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group"
                >
                  <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{label}</p>
                    <p className="text-xs text-gray-500 truncate">{description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t text-center">
              <p className="text-xs text-gray-400">
                26+ years experience · Licensed & insured
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
