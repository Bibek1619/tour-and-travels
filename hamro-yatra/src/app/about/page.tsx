import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Quote,
  Star,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Section from "@/components/section";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import { getPageContent } from "@/lib/page-content";
import { getIcon, asList, toNumber } from "@/lib/icon-map";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "About Us - Trusted Nepal Trekking & Tour Company",
  description:
    "Learn about Hamro Yatra Adventure - a licensed Nepal trekking and tour operator with 26+ years of experience, certified guides, and 10,000+ happy clients exploring the Himalayas.",
  path: "/about",
  category: "About",
  keywords: [
    "about Hamro Yatra Adventure",
    "Nepal tour company",
    "licensed trekking agency Nepal",
    "Nepal certified guides",
    "Himalayan travel experts",
    "car rent in pokhara",
    "car book in  pokhara"
    ,
  ],
  images: [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
  ],
  geo: { region: "NP-24", placename: "Pokhara, Nepal", position: "28.2096;83.9856" },
});

const MAP_EMBED_URL =
  "https://www.google.com/maps?q=Pokhara%2C%20Nepal&z=13&output=embed";

export default async function About() {
  const content = await getPageContent("about");
  const hero = content.hero;
  const story = content.story;
  const stats = content.stats.items;
  const promise = content.promise;
  const guides = content.guides;
  const team = content.team;
  const testimonialsData = content.testimonials;
  const cta = content.cta;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: `About ${SITE_NAME}`,
            headline: hero.title,
            description: hero.subtitle,
            url: `${SITE_URL}/about`,
            inLanguage: "en",
            about: {
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
              foundingDate: "1998",
              slogan: "26+ years crafting unforgettable journeys across the Himalayas",
              areaServed: "Nepal",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Pokhara",
                addressCountry: "NP",
              },
              sameAs: [
                "https://www.facebook.com/share/1EyvKahGsk/",
                "https://www.instagram.com/hamro_yatra_adventure",
                "https://youtube.com/@hamroyatradventure333",
                "https://www.tiktok.com/@hamroyatraadventucher",
              ],
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

      {/* Hero */}
      <section className="bg-emerald-700 text-white px-6 md:px-16 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-emerald-300 text-sm tracking-widest uppercase mb-4">
            Pokhara, Nepal — Est. 1998
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5 max-w-xl">
            {hero.title}
          </h1>
          <p className="text-emerald-100 text-lg max-w-md leading-relaxed">
            {hero.subtitle}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Section>
              <span className="text-sm font-semibold uppercase tracking-widest text-orange-600">
                Who We Are
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                {story.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">
                {story.paragraph}
              </p>
              <ul className="mt-8 space-y-4">
                {(story.points ?? []).map((point, i) => {
                  const Icon = getIcon(
                    String((point as { icon: string }).icon ?? "Clock")
                  );
                  return (
                    <li key={i} className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                        <Icon className="h-5 w-5 text-orange-600" />
                      </span>
                      <span className="font-medium text-gray-800">
                        {String((point as { text: string }).text)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Section>

            <Section>
              <div className="rounded-3xl bg-emerald-700 p-8 md:p-12">
                <div className="grid grid-cols-2 gap-6">
                  <img
                    src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80"
                    alt="Trekking in the Annapurna region near Pokhara, Nepal"
                    className="h-64 w-full rounded-2xl object-cover ring-4 ring-white/10"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
                    alt="The snowy Himalayas of Nepal"
                    className="h-64 w-full rounded-2xl object-cover ring-4 ring-white/10"
                  />
                </div>
              </div>
            </Section>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {Array.isArray(stats) &&
              stats.map((rawStat, index) => {
                const stat = rawStat as {
                  icon: string;
                  number: string;
                  label: string;
                };
                const StatIcon = getIcon(String(stat.icon ?? "Users"));
                return (
                  <div key={index} className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-white shadow-sm">
                      <StatIcon className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                      {stat.number}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Why Travel With Us */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <Section>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-orange-600">
                Why Hamro Yatra
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                {promise.title}
              </h2>
              <p className="mt-4 text-lg text-gray-600">{promise.subtitle}</p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {(promise.cards ?? []).map((rawCard, index) => {
                const card = rawCard as {
                  icon: string;
                  title: string;
                  description: string;
                };
                const CardIcon = getIcon(String(card.icon ?? "MapPin"));
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
                      <CardIcon className="h-7 w-7 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {card.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-gray-600">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Section>

          <Section>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {(guides.features ?? []).map((rawFeature, index) => {
                const feature = rawFeature as {
                  icon: string;
                  title: string;
                  description: string;
                };
                const FeatureIcon = getIcon(String(feature.icon ?? "Award"));
                return (
                  <div key={index} className="rounded-2xl bg-gray-50 p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-white shadow-sm">
                      <FeatureIcon className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Section>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <Section>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-orange-600">
                Our Team
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                {team.title}
              </h2>
              <p className="mt-4 text-lg text-gray-600">{team.subtitle}</p>
            </div>

            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {(team.members ?? []).map((rawMember, index) => {
                const member = rawMember as {
                  name: string;
                  role: string;
                  experience: string;
                  image: string;
                  specialization: string;
                  certifications: string | string[];
                };
                const certifications = asList(member.certifications);
                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="h-64">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-sm font-medium text-orange-600">
                        {member.role}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                          {member.experience}
                        </span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                          {member.specialization}
                        </span>
                      </div>
                      {certifications.length > 0 && (
                        <ul className="mt-4 space-y-1.5 border-t border-gray-100 pt-4">
                          {certifications.map((cert, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500" />
                              {cert}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>
        </div>
      </section>

      {/* Location & Map */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <Section>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="text-sm font-semibold uppercase tracking-widest text-orange-600">
                  Find Us
                </span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                  Visit Our Office in Pokhara
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  Drop by for a cup of tea and a chat about your next adventure.
                  We are based in the heart of Pokhara, the gateway to the
                  Annapurnas.
                </p>
                <ul className="mt-8 space-y-5">
                  <li className="flex items-start gap-4">
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-100">
                      <MapPin className="h-6 w-6 text-orange-600" />
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">Address</p>
                      <p className="text-gray-600">Lakeside, Pokhara, Nepal</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-100">
                      <Phone className="h-6 w-6 text-orange-600" />
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <a
                        href="tel:+9779841480794"
                        className="text-gray-600 transition-colors hover:text-orange-600"
                      >
                        +977 984-1480794
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-100">
                      <Mail className="h-6 w-6 text-orange-600" />
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a
                        href="mailto:info@hamroyatra.com.np"
                        className="text-gray-600 transition-colors hover:text-orange-600"
                      >
                        info@hamroyatra.com.np
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-sm">
                <iframe
                  src={MAP_EMBED_URL}
                  title="Map of Pokhara, Nepal"
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
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <Section>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-orange-600">
                Testimonials
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                {testimonialsData.title}
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                {testimonialsData.subtitle}
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {(testimonialsData.items ?? []).map((rawTestimonial, index) => {
                const testimonial = rawTestimonial as {
                  text: string;
                  author: string;
                  rating: number;
                };
                return (
                  <div
                    key={index}
                    className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <Quote className="h-8 w-8 text-orange-200" />
                    <div className="mt-4 flex items-center gap-1">
                      {[...Array(toNumber(testimonial.rating, 5))].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 fill-amber-400 text-amber-400"
                          />
                        )
                      )}
                    </div>
                    <p className="mt-4 leading-relaxed text-gray-700">
                      &quot;{testimonial.text}&quot;
                    </p>
                    <p className="mt-5 font-semibold text-gray-900">
                      — {testimonial.author}
                    </p>
                  </div>
                );
              })}
            </div>
          </Section>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4">
          <Section>
            <div className="rounded-3xl bg-gradient-to-br from-orange-600 to-amber-600 px-8 py-16 text-center text-white md:px-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                {cta.title}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-orange-50">
                {cta.subtitle}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href={cta.primaryLink}
                  className="rounded-full bg-white px-8 py-3.5 font-semibold text-orange-700 transition-colors hover:bg-orange-50"
                >
                  {cta.primaryText}
                </Link>
                <Link
                  href={cta.secondaryLink}
                  className="rounded-full border-2 border-white/60 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white hover:text-orange-700"
                >
                  {cta.secondaryText}
                </Link>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}