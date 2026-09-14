"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

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

      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white text-sm font-semibold px-7 py-3 rounded-lg transition-colors"
      >
        {sending ? (
          "Sending…"
        ) : (
          <>
            <Send className="w-4 h-4" /> Send Message
          </>
        )}
      </button>
    </form>
  );
}