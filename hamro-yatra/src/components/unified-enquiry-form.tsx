"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, X } from "lucide-react";

interface UnifiedEnquiryFormProps {
  packageName: string;
  packageId: string;
  packageType: "trek" | "tour" | "adventure";
  onClose?: () => void;
  inline?: boolean;
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

export default function UnifiedEnquiryForm({
  packageName,
  packageId,
  packageType,
  onClose,
  inline = false,
}: UnifiedEnquiryFormProps) {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: `Enquiry about ${packageName}`,
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

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

      // Reset form after 3 seconds if inline
      if (inline) {
        setTimeout(() => {
          setForm({
            name: "",
            email: "",
            phone: "",
            subject: `Enquiry about ${packageName}`,
            message: "",
          });
          setStatus("idle");
        }, 3000);
      }
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again or contact us directly."
      );
      console.error("Enquiry submission error:", err);
    }
  };

  // Success state
  if (status === "success") {
    return (
      <div className={`bg-white rounded-xl ${inline ? 'p-6' : 'p-8'} text-center shadow-lg border border-green-200`}>
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Enquiry Sent Successfully!
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Thank you for your interest in {packageName}. Our team will contact you shortly.
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl ${inline ? 'p-6' : 'p-6 sm:p-8'} shadow-lg border border-gray-200`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Send Enquiry</h3>
          <p className="text-sm text-gray-500 mt-1">
            Get in touch and we'll respond within 24 hours
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
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
    </div>
  );
}
