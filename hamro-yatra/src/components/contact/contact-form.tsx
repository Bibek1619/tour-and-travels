"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle, Phone, MessageCircle } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          packageName: form.subject,
          comment: form.message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send message");
      }
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {success && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-lg">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          Message sent! We&apos;ll reply within 24 hours.
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full h-11 px-4 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors placeholder-gray-400"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full h-11 px-4 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors placeholder-gray-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
          Subject
        </label>
        <input
          type="text"
          placeholder="Tour inquiry, booking, general question..."
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          required
          className="w-full h-11 px-4 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors placeholder-gray-400"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
          Message
        </label>
        <textarea
          rows={5}
          placeholder="Tell us about your dream adventure..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors placeholder-gray-400 resize-none"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white text-sm font-semibold px-7 py-3 rounded-lg transition-colors shadow-xs"
        >
          {sending ? (
            "Sending…"
          ) : (
            <>
              <Send className="w-4 h-4" /> Send Message
            </>
          )}
        </button>
      </div>

      {/* Faster Response Notice */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-emerald-200/80 bg-emerald-50/60 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white shadow-xs">
            <Phone className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              For faster response:
            </p>
            <p className="text-sm font-medium text-gray-700">
              WhatsApp or call us directly on our official number
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href="tel:+9779856006671"
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-gray-800 shadow-xs hover:border-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-emerald-700" />
            +977 9856006671
          </a>
          <a
            href="https://wa.me/9779856006671?text=Hi%2C%20I%20would%20like%20to%20inquire%20about%20your%20tours%20and%20vehicle%20rentals."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-green-700 transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp Now
          </a>
        </div>
      </div>
    </form>
  );
}