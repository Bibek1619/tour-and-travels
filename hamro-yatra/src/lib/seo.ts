import type { Metadata } from "next";

export const SITE_NAME = "Hamro Yatra Adventure";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.hamroyatraadventure.com";

const BASE_KEYWORDS = [
  "Hamro Yatra Adventure",

  // Vehicle Rental Keywords (PRIMARY BUSINESS — #1 revenue)
  "Scorpio jeep hire in Pokhara",
  "Scorpio rental Pokhara",
  "Scorpio rent in Pokhara",
  "Scorpio booking Pokhara",
  "Scorpio jeep with driver Pokhara",
  "Mahindra Scorpio rental Nepal",
  "car rental Pokhara",
  "car rental in Pokhara",
  "jeep rental Pokhara",
  "4WD jeep hire Pokhara",
  "private jeep hire Pokhara",
  "vehicle rental Nepal",
  "car hire Pokhara",
  "SUV rental Pokhara",
  "SUV rental Nepal",
  "Hiace rental Pokhara",
  "tourist vehicle rental Pokhara",
  "Pokhara to Kathmandu private car",
  "Pokhara to Kathmandu car",
  "off-road vehicle rental Nepal",
  "Pokhara airport car rental",
  "Nepal car booking",
  "Pokhara car service",
  "vehicle hire Nepal",
  "car rent Nepal",

  // Tour Packages (SECOND PRIORITY)
  "Nepal tour packages",
  "Nepal tour packages 2026",
  "Nepal travel agency",
  "Kathmandu Pokhara tour package",
  "Kathmandu tours",
  "Pokhara tours",
  "Nepal holiday packages",
  "tour operator Nepal",
  "Nepal sightseeing tour",
  "cultural tours Nepal",
  "best time to visit Nepal",
  "Visit Nepal 2026",

  // Trekking (THIRD PRIORITY)
  "trekking in Nepal",
  "Himalaya trekking",
  "Everest Base Camp trek",
  "Everest Base Camp trek cost",
  "Annapurna Circuit trek",
  "Langtang Valley trek",
  "Manaslu Circuit trek",
  "Nepal trekking packages",
  "best trekking company in Nepal",
  "Nepal trekking permits",

  // Adventure Activities (FOURTH PRIORITY)
  "paragliding Pokhara",
  "paragliding Pokhara price",
  "bungee jumping Nepal",
  "bungee jumping Nepal Kushma",
  "white water rafting Nepal",
  "Nepal adventure tourism",
  "adventure sports Nepal",
  "Nepal adventure activities",
];

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  images?: string[];
  category?: string;
  geo?: { region: string; placename: string; position: string };
}

function toAbsoluteUrl(src: string): string {
  return src.startsWith("http") ? src : `${SITE_URL}${src}`;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  images = [],
  category,
  geo,
}: SeoOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const absoluteImages = images.map(toAbsoluteUrl);
  const ogImages = absoluteImages.length
    ? absoluteImages.map((src) => ({ url: src, width: 1920, height: 1080, alt: title }))
    : [
        {
          url: toAbsoluteUrl("/images-5.jpg"),
          width: 1920,
          height: 1080,
          alt: title,
        },
      ];
  // The root layout appends this to <title>. Applying it to the social tags too
  // keeps every share preview consistent with the SERP listing.
  const socialTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    // Google has ignored the keywords meta tag since 2009. Only page-specific
    // terms are emitted; BASE_KEYWORDS stays on the root layout.
    ...(keywords.length ? { keywords } : {}),
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    applicationName: SITE_NAME,
    category,
    alternates: {
      canonical: path,
      // Single-language site: x-default only. Pointing a second hreflang at the
      // same URL is a self-referential no-op that Google flags as noise.
      languages: {
        "x-default": path,
      },
    },
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      site: "@HamroYatra",
      creator: "@HamroYatra",
      title: socialTitle,
      description,
      images: ogImages.map((i) => i.url),
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: {
      // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to the code from
      // Search Console > Settings > Ownership verification to enable it.
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    },
    ...(geo
      ? {
          other: {
            "geo.region": geo.region,
            "geo.placename": geo.placename,
            "geo.position": geo.position,
            ICBM: geo.position,
          },
        }
      : {}),
  };
}