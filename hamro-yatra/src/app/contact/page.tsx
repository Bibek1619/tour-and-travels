import type { ComponentType } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Section from "@/components/section";
import ContactForm from "@/components/contact/contact-form";
import FaqAccordion from "@/components/contact/faq-accordion";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import { getPageContent } from "@/lib/page-content";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Contact Us | Nepal Trekking & Tour Operator",
  description:
    "Contact Hamro Yatra Adventure in Kathmandu, Nepal. Get a free quote for trekking, tours, car and Scorpio rental in Pokhara, daily route seat booking and adventure activities.",
  path: "/contact",
  category: "Contact",
  keywords: [
    "contact Hamro Yatra Adventure",
    "Nepal tour company contact",
    "Kathmandu travel agency",
    "book trekking in Nepal",
    "car rental booking Nepal",
    "Scorpio booking contact",
    "scarpio rent in pokhara",
    "veichles rent in pokhara"
  ],
  images: [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
  ],
  geo: { region: "NP-03", placename: "Kathmandu, Nepal", position: "27.7172;85.3240" },
});

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const socialIcons: Record<
  string,
  ComponentType<{ className?: string }>
> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  YouTube: YoutubeIcon,
  TikTok: TikTokIcon,
};

const defaultInfoItems = [
  {
    icon: MapPin,
    label: "Address",
    value: "Lakeside, Pokhara 33700, Nepal",
    link: "https://maps.google.com/?q=Lakeside,Pokhara,Nepal",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+977 984-1480794",
    link: "tel:+9779841480794",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@hamroyatra.com.np",
    link: "mailto:info@hamroyatra.com.np",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Fri 9AM–7PM · Sat 10AM–5PM · Sun Closed",
    link: "",
  },
];

const infoIconByLabel: Record<
  string,
  ComponentType<{ className?: string }>
> = {
  Address: MapPin,
  Phone: Phone,
  Email: Mail,
  Hours: Clock,
};

export default async function Contact() {
  const content = await getPageContent("contact");
  const hero = content.hero;
  const info = content.info.items as {
    label: string;
    value: string;
    link: string;
  }[];
  const form = content.form;
  const faq = content.faq;
  const social = content.social;

  const contactInfo = info.map((item, index) => ({
    icon: infoIconByLabel[item.label] ?? defaultInfoItems[index % defaultInfoItems.length].icon,
    label: item.label,
    value: item.value,
    link: item.link,
  }));

  const socials = (social.items as { label: string; href: string }[]).map(
    (s) => ({
      icon: socialIcons[s.label] ?? FacebookIcon,
      label: s.label,
      href: s.href,
    })
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: `Contact ${SITE_NAME}`,
            url: `${SITE_URL}/contact`,
            inLanguage: "en",
            mainEntity: {
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
              email: "info@hamroyatra.com.np",
              telephone: "+977-9841480794",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Lakeside",
                addressLocality: "Pokhara",
                postalCode: "33700",
                addressCountry: "NP",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 28.2096,
                longitude: 83.9856,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "09:00",
                closes: "19:00",
              },
              contactPoint: {
                "@type": "ContactPoint",
telephone: "+977-9841480794",
              contactType: "customer service",
                areaServed: "NP",
                availableLanguage: ["English", "Nepali"],
              },
            },
          }),
        }}
      />

      {/* HERO */}
      <section className="bg-emerald-700 text-white px-6 md:px-16 py-24">
        <div className="max-w-5xl mx-auto">
          <p className="text-emerald-300 text-sm tracking-widest uppercase mb-4">
            {hero.eyebrow}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5 max-w-xl">
            {hero.title}
          </h1>
          <p className="text-emerald-100 text-lg max-w-md leading-relaxed">
            {hero.subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* CONTACT INFO + MAP */}
        <section className="grid md:grid-cols-2 gap-12 py-20 border-b border-gray-100">
          <div className="space-y-6">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  {item.link ? (
                    <a
                      href={item.link}
                      className="text-gray-900 font-medium text-sm hover:text-emerald-700 transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-900 font-medium text-sm">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-100 h-72 md:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.345!2d83.985!3d28.210!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLakeside%2C+Pokhara!5e0!3m2!1sen!2snp!4v1690000000000"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 280 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hamro Yatra Adventure Location - Pokhara"
            />
          </div>
        </section>

        {/* CONTACT FORM */}
        <section className="py-20 border-b border-gray-100">
          <Section>
            <h2 className="text-2xl font-bold mb-1">{form.title}</h2>
            <p className="text-gray-500 text-sm mb-10">{form.subtitle}</p>

            <ContactForm />
          </Section>
        </section>

        {/* FAQ + SOCIAL */}
        <section className="grid md:grid-cols-2 gap-16 py-20">
          <Section>
            <h2 className="text-2xl font-bold mb-8">{faq.title}</h2>
            <FaqAccordion items={faq.items as { q: string; a: string }[]} />
          </Section>

          <Section>
            <h2 className="text-2xl font-bold mb-2">{social.title}</h2>
            <p className="text-gray-500 text-sm mb-8">{social.subtitle}</p>
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
                    <span className="text-sm font-medium text-gray-800">
                      {s.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-600 transition-colors" />
                </a>
              ))}
            </div>
          </Section>
        </section>
      </div>

      <Footer />
    </div>
  );
}