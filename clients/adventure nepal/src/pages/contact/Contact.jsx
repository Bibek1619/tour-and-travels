import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/front/Navbar";
import { Footer } from "@/components/front/Footer";
import {
  MapPin, Phone, Mail, Clock,
  Facebook, Instagram, Twitter, Youtube,
  Send, ChevronDown, ArrowUpRight,
} from "lucide-react";
import { toast } from "react-hot-toast";

const contactInfo = [
  { icon: MapPin, label: "Address", value: "Thamel Marg, Kathmandu 44600, Nepal", link: "https://maps.google.com/?q=Thamel,Kathmandu" },
  { icon: Phone, label: "Phone", value: "+977 9841 234 567", link: "tel:+9779841234567" },
  { icon: Mail, label: "Email", value: "info@adventurenepal.com.np", link: "mailto:info@adventurenepal.com.np" },
  { icon: Clock, label: "Hours", value: "Mon–Fri 9AM–7PM · Sat 10AM–5PM · Sun Closed" },
];

const faqs = [
  { q: "How do I book a tour?", a: "Contact us via form, phone, or email. We'll customize your itinerary within 24 hours." },
  { q: "What payment methods do you accept?", a: "Bank transfer, Visa/Mastercard, IME Pay, Khalti, and cash on arrival for smaller bookings." },
  { q: "Do you offer private tours?", a: "Yes — all tours can be tailored for private groups, couples, or solo travelers." },
  { q: "What about travel insurance?", a: "We strongly recommend comprehensive travel insurance and can help you arrange it." },
];

const socials = [
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/adventurenepal" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/adventurenepal" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com/adventurenepal" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/adventurenepal" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Message sent! We'll reply within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* HERO */}
      <section className="bg-emerald-700 text-white px-6 md:px-16 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <p className="text-emerald-300 text-sm tracking-widest uppercase mb-4">Contact Us</p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5 max-w-xl">
            Let's plan your Nepal adventure
          </h1>
          <p className="text-emerald-100 text-lg max-w-md leading-relaxed">
            Reach out and we'll get back to you within 24 hours.
          </p>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-6 md:px-8">

        {/* CONTACT INFO + MAP */}
        <section className="grid md:grid-cols-2 gap-12 py-20 border-b border-gray-100">
          <div className="space-y-6">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                  {item.link ? (
                    <a href={item.link} className="text-gray-900 font-medium text-sm hover:text-emerald-700 transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-900 font-medium text-sm">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl overflow-hidden border border-gray-100 h-72 md:h-auto"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.361482345678!2d85.324!3d27.717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb197Thamel%2C%20Kathmandu%2044600!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2sus!4v1690000000000"
              width="100%" height="100%"
              style={{ border: 0, minHeight: 280 }}
              allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Adventure Nepal Location"
            />
          </motion.div>
        </section>

        {/* CONTACT FORM */}
        <section className="py-20 border-b border-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-1">Send us a message</h2>
            <p className="text-gray-500 text-sm mb-10">We'll respond within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { id: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                  { id: "email", label: "Email Address", type: "email", placeholder: "you@email.com" },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={form[id]}
                      onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                      required
                      className="w-full h-11 px-4 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors placeholder-gray-400"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Subject</label>
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
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Message</label>
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
                {sending ? "Sending…" : <><Send className="w-4 h-4" /> Send Message</>}
              </button>
            </form>
          </motion.div>
        </section>

        {/* FAQ + SOCIAL */}
        <section className="grid md:grid-cols-2 gap-16 py-20">

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-8">FAQs</h2>
            <div className="divide-y divide-gray-100">
              {faqs.map((item, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center py-4 text-left gap-4 group"
                  >
                    <span className="text-sm font-medium text-gray-900 group-hover:text-emerald-700 transition-colors">
                      {item.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-gray-500 leading-relaxed pb-4">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          {/* SOCIAL */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold mb-2">Follow us</h2>
            <p className="text-gray-500 text-sm mb-8">Stay updated with our latest tours and stories.</p>
            <div className="space-y-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3.5 rounded-lg border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <s.icon className="w-4 h-4 text-gray-500 group-hover:text-emerald-700 transition-colors" />
                    <span className="text-sm font-medium text-gray-800">{s.label}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-600 transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>

        </section>
      </div>

      <Footer />
    </div>
  );
}