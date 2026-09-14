"use client";

import { useEffect, useRef, useState } from "react";
import { X, Loader2, CheckCircle2, SendHorizontal } from "lucide-react";
import type { HeroContent } from "@/lib/types";

type TripType = "trek" | "tour" | "other";

const inputBase =
  "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-shadow text-gray-900 bg-white";
const labelBase = "block text-sm font-semibold text-gray-700 mb-2";

export function HeroSection({ content }: { content: HeroContent }) {
  const hero = content;
  const heroBg = "/images-5.jpg";

  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const [tripType, setTripType] = useState<TripType>("trek");
  const [customTripType, setCustomTripType] = useState("");
  const [place, setPlace] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("1");
  const [notes, setNotes] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (tripType === "other" && !customTripType.trim()) {
      setError("Please type what kind of trip you are looking for");
      return;
    }
    if (!place.trim()) {
      setError("Please enter the place you want to visit");
      return;
    }
    if (!startDate) {
      setError("Please select a start date");
      return;
    }
    if (!email.trim() || !phone.trim()) {
      setError("Please provide your email and phone number");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/custom-trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripType,
          customTripType:
            tripType === "other" ? customTripType.trim() : undefined,
          place: place.trim(),
          startDate: startDate ? new Date(startDate).toISOString() : undefined,
          endDate: endDate ? new Date(endDate).toISOString() : undefined,
          numberOfPeople:
            tripType === "tour" ? Number(numberOfPeople) || 1 : undefined,
          notes: notes.trim() || undefined,
          email: email.trim(),
          phone: phone.trim(),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || "Failed to submit your trip plan");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Failed to submit your trip plan");
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setOpen(false);
    setSubmitted(false);
    setError("");
  };

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
            autoPlay
            loop
            muted
            playsInline
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
          Plan Your Trip
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

      {/* Plan Your Trip Modal */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto my-8"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white rounded-t-2xl">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Plan Your Trip</h2>
                <p className="text-sm text-gray-500">
                  Tell us what you&apos;re dreaming about
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {submitted ? (
              <div className="px-6 py-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Trip Request Received!
                </h3>
                <p className="text-gray-600 mb-6">
                  Thank you for planning your trip with us. Our team will reach
                  out to you shortly with a customized itinerary.
                </p>
                <button
                  onClick={closeModal}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-8 py-2.5 rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                {/* Trip Type */}
                <div>
                  <label className={labelBase}>
                    What type of trip? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(
                      [
                        { value: "trek", label: "Trek" },
                        { value: "tour", label: "Tour" },
                        { value: "other", label: "Other" },
                      ] as { value: TripType; label: string }[]
                    ).map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setTripType(opt.value)}
                        className={`px-4 py-3 rounded-lg border-2 text-sm font-semibold transition-all ${
                          tripType === opt.value
                            ? "border-orange-600 bg-orange-50 text-orange-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {tripType === "other" && (
                  <div>
                    <label className={labelBase}>
                      Type of trip <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={customTripType}
                      onChange={(e) => setCustomTripType(e.target.value)}
                      placeholder="e.g., Honeymoon, Photography tour, Yoga retreat..."
                      className={inputBase}
                    />
                  </div>
                )}

                {/* Place */}
                <div>
                  <label className={labelBase}>
                    Place you want to visit <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    placeholder="e.g., Pokhara, Everest Base Camp, Kathmandu Valley..."
                    className={inputBase}
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelBase}>
                      Start date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      min={new Date().toISOString().slice(0, 10)}
                      onChange={(e) => setStartDate(e.target.value)}
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label className={labelBase}>End date</label>
                    <input
                      type="date"
                      value={endDate}
                      min={startDate || new Date().toISOString().slice(0, 10)}
                      onChange={(e) => setEndDate(e.target.value)}
                      className={inputBase}
                    />
                  </div>
                </div>

                {/* Number of people (tours only) */}
                {tripType === "tour" && (
                  <div>
                    <label className={labelBase}>
                      Number of people <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={numberOfPeople}
                      onChange={(e) => setNumberOfPeople(e.target.value)}
                      min={1}
                      placeholder="2"
                      className={inputBase}
                    />
                  </div>
                )}

                {/* Notes */}
                <div>
                  <label className={labelBase}>Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Anything you'd like us to know - budget, interests, pace, etc."
                    className={`${inputBase} resize-y`}
                  />
                </div>

                {/* Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelBase}>
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label className={labelBase}>
                      Phone number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+977 98XXXXXXXX"
                      className={inputBase}
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <SendHorizontal className="w-5 h-5" />
                      Submit Trip Plan
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default HeroSection;