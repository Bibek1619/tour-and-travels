"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Send, Loader2, CheckCircle2, X } from "lucide-react";

interface UnifiedEnquiryModalProps {
  packageName: string;
  packageId: string;
  packageType: "trek" | "tour" | "adventure";
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const inputClass =
  "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-sm transition-colors";

export default function UnifiedEnquiryModal({
  packageName,
  packageId,
  packageType,
  onClose,
}: UnifiedEnquiryModalProps) {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: `Enquiry about ${packageName}`,
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const update = (key: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!form.name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!form.email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!form.subject.trim()) {
      setError("Please enter a subject");
      return;
    }

    setError("");
    setStatus("submitting");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      packageName,
      packageType,
      packageId,
      comment: form.message.trim() || `Enquiry about ${packageName}`,
      location: "Nepal",
    };

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit enquiry");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again or contact us directly."
      );
      console.error("Enquiry submission error:", err);
    }
  };

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] bg-black/60 overflow-y-auto"
    >
      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl w-full max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white rounded-t-2xl z-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Send Enquiry</h2>
              <p className="text-sm text-gray-500 mt-1">
                We'll respond within 24 hours
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success State */}
          {status === "success" ? (
            <div className="p-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Enquiry Sent Successfully!
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Thank you for your interest in {packageName}. Our team will contact you shortly.
              </p>
              <button
                onClick={onClose}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Package Name (readonly) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Package
                </label>
                <input
                  type="text"
                  value={packageName}
                  readOnly
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Enter your full name"
                  className={inputClass}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="your@email.com"
                  className={inputClass}
                  required
                />
              </div>

              {/* Phone (optional) */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number <span className="text-gray-400 text-xs">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+977 98XXXXXXXX"
                  className={inputClass}
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Subject <span className="text-red-600">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  placeholder="What would you like to know?"
                  className={inputClass}
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Your Message <span className="text-gray-400 text-xs">(optional)</span>
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows={4}
                  placeholder="Tell us more about your requirements, travel dates, group size, etc."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Error message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-lg transition-colors"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Enquiry
                  </>
                )}
              </button>

              {/* Help text */}
              <p className="text-xs text-gray-500 text-center">
                Or contact us directly at{" "}
                <a href="tel:+9779856006671" className="text-orange-600 hover:underline">
                  +977 9856006671
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
