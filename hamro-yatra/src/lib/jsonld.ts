import { SITE_URL, SITE_NAME } from "@/lib/seo";

export type JsonLdObject = Record<string, unknown>;

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

function abs(src?: string): string {
  if (!src) return SITE_URL;
  return src.startsWith("http") ? src : `${SITE_URL}${src}`;
}

const CONTACT = {
  "@type": "ContactPoint" as const,
  telephone: "+977-61-452193",
  contactType: "customer service",
};

export function travelAgencyJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE_NAME,
    url: SITE_URL,
    telephone: "+977-61-452193",
    email: "info@hamroyatra.com.np",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lakeside Road, Baidam",
      addressLocality: "Pokhara",
      addressRegion: "Gandaki",
      postalCode: "33700",
      addressCountry: "NP",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "120",
    },
    contactPoint: CONTACT,
    areaServed: "Nepal",
    sameAs: [],
  };
}

export function tripJsonLd({
  title,
  description,
  image,
  url,
  price,
  durationText,
  durationDays,
  location,
  category,
  itineraryCount,
  faqs,
}: {
  title: string;
  description?: string;
  image?: string;
  url: string;
  price?: number;
  durationText?: string;
  durationDays?: number;
  location?: string;
  category?: string;
  itineraryCount?: number;
  faqs?: { q: string; a: string }[];
}): JsonLdObject {
  const offer = price
    ? {
        "@type": "Offer",
        price,
        priceCurrency: "NPR",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}${url}`,
      }
    : undefined;

  const hasPart =
    itineraryCount && itineraryCount > 0
      ? Array.from({ length: itineraryCount }, (_, i) => ({
          "@type": "Trip",
          name: `Day ${i + 1}`,
          position: i + 1,
        }))
      : undefined;

  const faq =
    faqs && faqs.length > 0
      ? {
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: title,
    description: description || title,
    image: image ? [image] : undefined,
    url: `${SITE_URL}${url}`,
    touristType: category === "trek" ? "trekking" : "sightseeing",
    provider: { "@type": "TravelAgency", name: SITE_NAME, url: SITE_URL },
    offers: offer,
    itinerary: hasPart,
    ...(location ? { touristDestination: location } : {}),
    ...(durationText || durationDays
      ? {
          duration: durationText
            ? durationText
            : durationDays
              ? `P${durationDays}D`
              : undefined,
        }
      : {}),
    ...(faq ? { mainEntityOfPage: faq } : {}),
  };
}

export function vehicleJsonLd({
  name,
  description,
  image,
  url,
  brand,
  model,
  category,
  fuelType,
  capacity,
  price,
  rating,
}: {
  name?: string;
  description?: string;
  image?: string;
  url: string;
  brand?: string;
  model?: string;
  category?: string;
  fuelType?: string;
  capacity?: number;
  price?: number;
  rating?: number;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: name || `${brand || ""} ${model || "Vehicle"}`.trim(),
    description: description || name,
    image: image ? [abs(image)] : undefined,
    url: `${SITE_URL}${url}`,
    brand: brand || undefined,
    model: model || undefined,
    vehicleModelDate: undefined,
    fuelType: fuelType || undefined,
    vehicleSeatingCapacity: capacity || undefined,
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: "NPR",
            url: `${SITE_URL}${url}`,
          },
        }
      : {}),
    ...(rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: Math.min(rating, 5).toString(),
          },
        }
      : {}),
  };
}

export function adventureJsonLd({
  name,
  description,
  image,
  url,
  category,
  location,
  duration,
  price,
  rating,
  faqs,
}: {
  name: string;
  description?: string;
  image?: string;
  url: string;
  category?: string;
  location?: string;
  duration?: string;
  price?: number;
  rating?: number;
  faqs?: { q: string; a: string }[];
}): JsonLdObject {
  const faq =
    faqs && faqs.length > 0
      ? {
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description: description || name,
    image: image ? [abs(image)] : undefined,
    url: `${SITE_URL}${url}`,
    category: category || undefined,
    brand: { "@type": "Organization", name: SITE_NAME },
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: "NPR",
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}${url}`,
          },
        }
      : {}),
    ...(location ? { locationCreated: location } : {}),
    ...(duration ? { additionalProperty: { "@type": "PropertyValue", name: "Duration", value: duration } } : {}),
    ...(rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: Math.min(rating, 5).toString(),
          },
        }
      : {}),
    ...(faq ? { mainEntityOfPage: faq } : {}),
  };
}