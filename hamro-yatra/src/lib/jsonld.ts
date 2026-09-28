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
  telephone: "+977-9856006671",
  contactType: "customer service",
};

export function travelAgencyJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "RentalCarAgency"],
    name: SITE_NAME,
    alternateName: "Hamro Yatra",
    url: SITE_URL,
    logo: `${SITE_URL}/hamro yatra.jpeg`,
    image: `${SITE_URL}/images-5.jpg`,
telephone: "+977-9856006671",
    email: "info@hamroyatraadventure.com",
    description: "Leading vehicle rental and tour operator in Pokhara, Nepal. Specializing in Mahindra Scorpio rentals, Nepal tour packages, trekking expeditions, and adventure activities like paragliding and bungee jumping.",
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
      bestRating: "5",
    },
    contactPoint: CONTACT,
    areaServed: {
      "@type": "Country",
      name: "Nepal",
    },
    priceRange: "$$",
    paymentAccepted: "Cash, Bank Transfer, Credit Card",
    currenciesAccepted: "NPR, USD",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "07:00",
        closes: "20:00",
      },
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: "28.2096",
      longitude: "83.9856",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Travel Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Vehicle Rental Services",
          itemListElement: [
            {
              "@type": "Offer",
              priceCurrency: "NPR",
              availability: "https://schema.org/InStock",
              itemOffered: {
                "@type": "Product",
                name: "Scorpio Rental",
                description: "7-seater SUV rental in Pokhara",
                offers: {
                  "@type": "AggregateOffer",
                  priceCurrency: "NPR",
                  lowPrice: "8000",
                  highPrice: "12000",
                  offerCount: "1"
                }
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Tour Packages",
        },
        {
          "@type": "OfferCatalog",
          name: "Trekking Expeditions",
        },
        {
          "@type": "OfferCatalog",
          name: "Adventure Activities",
        },
      ],
    },
    // Must be public profile URLs, matching the social links in page content.
    // The Facebook entry in page-content defaults is a /share/ link, which is
    // not a valid sameAs target, so it is intentionally omitted here.
    sameAs: [
      "https://www.instagram.com/hamro_yatra_adventure",
      "https://youtube.com/@hamroyatradventure333",
      "https://www.tiktok.com/@hamroyatraadventucher",
    ],
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

  const trip: JsonLdObject = {
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
  };

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

  // FAQPage must be its own top-level entity, not nested under the trip.
  return {
    "@context": "https://schema.org",
    "@graph": [trip, ...(faq ? [faq] : [])],
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
  ratingCount,
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
  ratingCount?: number;
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
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}${url}`,
          },
        }
      : {}),
    ...(rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: Math.min(rating, 5).toString(),
            bestRating: "5",
            // Required by Google, otherwise the rich result is dropped.
            reviewCount: ratingCount || 1,
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
  ratingCount,
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
  ratingCount?: number;
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

  const service: JsonLdObject = {
    // Service, not Product: these are bookable activities, so Google must not
    // expect shippingDetails or a merchant return policy.
    "@type": "Service",
    name,
    description: description || name,
    image: image ? [abs(image)] : undefined,
    url: `${SITE_URL}${url}`,
    serviceType: category || "Adventure activity",
    category: category || undefined,
    provider: { "@type": "TravelAgency", name: SITE_NAME, url: SITE_URL },
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: "NPR",
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}${url}`,
            eligibleRegion: { "@type": "Country", name: "Nepal" },
          },
        }
      : {}),
    ...(location ? { areaServed: location } : {}),
    ...(duration ? { additionalProperty: { "@type": "PropertyValue", name: "Duration", value: duration } } : {}),
    ...(rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: Math.min(rating, 5).toString(),
            bestRating: "5",
            // Required by Google, otherwise the rich result is dropped.
            reviewCount: ratingCount || 1,
          },
        }
      : {}),
  };

  // FAQPage must be its own top-level entity, not nested under the service.
  return {
    "@context": "https://schema.org",
    "@graph": [service, ...(faq ? [faq] : [])],
  };
}

export function scorpioRouteJsonLd({
  route,
  origin,
  destination,
  image,
  url,
  vehicleName,
  price,
  capacity,
  distance,
  time,
  rating,
  totalReviews,
}: {
  route: string;
  origin: string;
  destination: string;
  image?: string | null;
  url: string;
  vehicleName?: string;
  price: number;
  capacity?: number;
  distance?: string;
  time?: string;
  rating?: number;
  totalReviews?: number;
}): JsonLdObject {
  const canonical = `${SITE_URL}${url}`;
  
  // Service entity for the rental service
  const service: JsonLdObject = {
    "@type": "Service",
    name: `${route} Scorpio Hire`,
    serviceType: "Scorpio jeep rental with driver",
    description: `Hire a Scorpio jeep with an experienced driver from ${origin} to ${destination}, Nepal. One-way and round-trip rates with a professional local driver included.`,
    url: canonical,
    image: image ? [abs(image)] : undefined,
    provider: {
      "@type": "TravelAgency",
      name: SITE_NAME,
      url: SITE_URL,
      telephone: CONTACT.telephone,
    },
    areaServed: [
      { "@type": "City", name: origin },
      { "@type": "City", name: destination },
    ],
    ...(distance || time
      ? {
          additionalProperty: [
            ...(distance
              ? [
                  {
                    "@type": "PropertyValue",
                    name: "Distance",
                    value: `${distance} km`,
                  },
                ]
              : []),
            ...(time
              ? [
                  {
                    "@type": "PropertyValue",
                    name: "Travel time",
                    value: `${time} hrs`,
                  },
                ]
              : []),
          ],
        }
      : {}),
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "NPR",
      availability: "https://schema.org/InStock",
      url: canonical,
    },
    ...(rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: Math.min(rating, 5).toString(),
            reviewCount: totalReviews || 1,
            bestRating: "5",
          },
        }
      : {}),
  };

  // Separate Vehicle entity with proper offers
  const vehicle: JsonLdObject | null = vehicleName
    ? {
        "@type": "Vehicle",
        name: vehicleName,
        ...(capacity ? { vehicleSeatingCapacity: capacity } : {}),
        // Add offers to Vehicle to fix Google Search Console error
        offers: {
          "@type": "Offer",
          price,
          priceCurrency: "NPR",
          availability: "https://schema.org/InStock",
          url: canonical,
        },
      }
    : null;

  return {
    "@context": "https://schema.org",
    "@graph": [service, ...(vehicle ? [vehicle] : [])],
  };
}

/**
 * Standalone FAQPage. Must be emitted as its own top-level entity, otherwise
 * Google ignores it. Pair with the visible FaqSection so the answers are also
 * present in the rendered HTML.
 */
export function faqPageJsonLd(faqs: { q: string; a: string }[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs
      .filter((f) => f.q?.trim() && f.a?.trim())
      .map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function reviewJsonLd({
  itemName,
  itemType = "Product",
  rating,
  reviewBody,
  author,
  datePublished,
  itemUrl,
  avgRating,
  reviewCount,
}: {
  itemName: string;
  itemType?: string;
  rating: number;
  reviewBody: string;
  author: string;
  datePublished: string;
  itemUrl?: string;
  avgRating?: number;
  reviewCount?: number;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": itemType,
      name: itemName,
      ...(itemUrl ? { url: `${SITE_URL}${itemUrl}` } : {}),
      // Google requires an aggregateRating carrying a count on the reviewed
      // item, otherwise the Review snippet is dropped as a critical error.
      ...(avgRating
        ? {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: Math.min(avgRating, 5).toString(),
              bestRating: "5",
              reviewCount: reviewCount || 1,
            },
          }
        : {}),
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: Math.min(rating, 5).toString(),
      bestRating: "5",
    },
    author: {
      "@type": "Person",
      name: author,
    },
    reviewBody,
    datePublished,
  };
}