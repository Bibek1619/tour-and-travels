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
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import { serializeJsonLd } from "@/lib/jsonld";
import { getPageContent } from "@/lib/page-content";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Contact Us – Car Rental & Tour Booking Pokhara",
  description:
    "Contact Hamro Yatra Adventure for Scorpio jeep hire, car rental, trekking & tour bookings in Pokhara and Nepal. WhatsApp, call or email for instant free quote.",
  path: "/contact",
  category: "Contact",
  keywords: [
    "contact Hamro Yatra Adventure",
    "Nepal tour company contact",
    "Kathmandu travel agency",
    "book trekking in Nepal",
    "car rental booking Nepal",
    "Scorpio jeep hire booking",
    "Scorpio rental Pokhara",
    "vehicles rent in Pokhara",
    "car rental quote Pokhara",
    "tour booking Nepal",
    "trekking booking Nepal",
  ],
  images: [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
  ],
  geo: { region: "NP-P4", placename: "Pokhara, Nepal", position: "28.2096;83.9856" },
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

const socialBrandConfig: Record<
  string,
  {
    icon: ComponentType<{ className?: string }>;
    accentColor: string;
    bgHover: string;
    iconBg: string;
    borderHover: string;
    badgeText: string;
    handle: string;
    description: string;
  }
> = {
  Facebook: {
    icon: FacebookIcon,
    accentColor: "text-[#1877F2]",
    bgHover: "hover:bg-blue-50/50 hover:shadow-blue-500/10",
    iconBg: "bg-[#1877F2] text-white shadow-md shadow-blue-500/25",
    borderHover: "hover:border-[#1877F2]/40",
    badgeText: "Follow Page",
    handle: "Hamro Yatra Adventure",
    description: "Official community updates & travel stories",
  },
  Instagram: {
    icon: InstagramIcon,
    accentColor: "text-[#E1306C]",
    bgHover: "hover:bg-pink-50/50 hover:shadow-pink-500/10",
    iconBg: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-md shadow-pink-500/25",
    borderHover: "hover:border-[#DD2A7B]/40",
    badgeText: "Photos & Reels",
    handle: "@hamro_yatra_adventure",
    description: "Himalayan photos, videos & stories",
  },
  YouTube: {
    icon: YoutubeIcon,
    accentColor: "text-[#FF0000]",
    bgHover: "hover:bg-red-50/50 hover:shadow-red-500/10",
    iconBg: "bg-[#FF0000] text-white shadow-md shadow-red-500/25",
    borderHover: "hover:border-[#FF0000]/40",
    badgeText: "Subscribe",
    handle: "Hamro Yatra Adventure",
    description: "Full tour vlogs & route walkthroughs",
  },
  TikTok: {
    icon: TikTokIcon,
    accentColor: "text-slate-900",
    bgHover: "hover:bg-slate-50 hover:shadow-slate-500/10",
    iconBg: "bg-slate-950 text-white shadow-md shadow-black/25",
    borderHover: "hover:border-slate-400",
    badgeText: "Short Videos",
    handle: "@hamroyatraadventucher",
    description: "Quick clips, off-road & scenery",
  },
};

const defaultInfoItems = [
  {
    icon: MapPin,
    label: "Address",
    value: "14 Ram Bazar Rd, Pokhara, Gandaki Province 33700",
    link: "https://maps.google.com/?q=14+Ram+Bazar+Rd,Pokhara,Nepal",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+977 9856006671",
    link: "tel:+9779856006671",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hamroyatraadventure@gmail.com",
    link: "mailto:hamroyatraadventure@gmail.com",
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
    (s) => {
      const brand = socialBrandConfig[s.label] ?? {
        icon: FacebookIcon,
        accentColor: "text-orange-600",
        bgHover: "hover:bg-orange-50",
        iconBg: "bg-orange-600 text-white shadow-md shadow-orange-600/20",
        borderHover: "hover:border-orange-300",
        badgeText: "Follow",
        handle: s.label,
        description: "Connect with us",
      };
      return {
        ...brand,
        label: s.label,
        href: s.href,
      };
    }
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <script
        type="application/ld+json"
dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: `Contact ${SITE_NAME}`,
            url: `${SITE_URL}/contact`,
            inLanguage: "en",
            mainEntity: {
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
              email: "hamroyatraadventure@gmail.com",
              telephone: "+977-9856006671",
              address: {
                "@type": "PostalAddress",
                streetAddress: "14 Ram Bazar Rd",
                addressLocality: "Pokhara",
                addressRegion: "Gandaki Province",
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
                telephone: "+977-9856006671",
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

      {/* CONTACT FORM (ENCLOSED BOX WITH SOFT WARM BACKGROUND) */}
      <section className="bg-gradient-to-b from-orange-50/50 via-white to-gray-50/30 py-16 md:py-24 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Section>
            <div className="rounded-3xl border border-orange-100/90 bg-white p-6 sm:p-12 shadow-xl shadow-orange-500/5">
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-600 font-sans">
                  Send An Enquiry
                </span>
                <h2 className="mt-2 text-2xl sm:text-4xl font-bold font-display text-gray-900 tracking-tight">
                  {form.title}
                </h2>
                <p className="mt-2 text-gray-600 text-sm sm:text-base font-sans max-w-2xl">
                  {form.subtitle}
                </p>
              </div>

              <ContactForm />
            </div>
          </Section>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* CONTACT INFO + MAP (SAME DESIGN AS ABOUT PAGE) */}
        <section className="py-20 md:py-24 border-b border-gray-100">
          <Section>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="text-sm font-semibold uppercase tracking-widest text-orange-600 font-sans">
                  Find Us
                </span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl font-display">
                  Visit Our Office in Pokhara
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-gray-600 font-sans">
                  We are conveniently located in Ram Bazar, Pokhara. Stop by for travel advice, customized trekking itineraries, or instant Scorpio jeep bookings.
                </p>
                <ul className="mt-8 space-y-5 font-sans">
                  {contactInfo.map((item) => (
                    <li key={item.label} className="flex items-start gap-4">
                      <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-100">
                        <item.icon className="h-6 w-6 text-orange-600" />
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900">{item.label}</p>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="text-gray-600 transition-colors hover:text-orange-600 text-base"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-gray-600 text-base">{item.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-sm">
                <iframe
                  src={content.mapEmbedUrl}
                  title="Map of Hamro Yatra Adventure Pokhara Office"
                  width="100%"
                  height="480"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block min-h-[420px] w-full"
                />
              </div>
            </div>
          </Section>
        </section>

        {/* FOLLOW US (BEST UI WITH MODERN BRAND COLORS) */}
        <section className="py-20 md:py-24">
          <Section>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-sm font-semibold uppercase tracking-widest text-orange-600 font-sans">
                Social Media
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl font-display">
                {social.title || "Follow & Connect With Us"}
              </h2>
              <p className="mt-3 text-base sm:text-lg text-gray-600 font-sans">
                {social.subtitle || "Stay connected for breathtaking Himalayan travel photos, video reels, and tour updates."}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 font-sans">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex flex-col justify-between rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${s.borderHover} ${s.bgHover}`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${s.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                      <s.icon className="w-6 h-6" />
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gray-400 group-hover:text-gray-700 transition-colors">
                      {s.badgeText}
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-gray-950">
                      {s.label}
                    </h3>
                    <p className="text-xs font-semibold text-gray-700 mt-1 truncate">
                      {s.handle}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                      {s.description}
                    </p>
                  </div>
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