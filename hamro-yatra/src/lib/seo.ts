import type { Metadata } from "next";

export const SITE_NAME = "Hamro Yatra Adventure";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.hamroyatraadventure.com";

const BASE_KEYWORDS = [
  "Hamro Yatra Adventure",
  // Vehicle Rental Keywords (PRIMARY BUSINESS)
  "car rental Pokhara",
  "vehicle rental Nepal",
  "Scorpio rent in Pokhara",
  "Scorpio booking Pokhara",
  "Scorpio hire Pokhara",
  "car hire Pokhara",
  "Hiace rental Pokhara",
  "Mahindra Scorpio rental",
  "SUV rental Nepal",
  "Pokhara to Kathmandu car",
  "Nepal car booking",
  "Pokhara car service",
  "vehicle hire Nepal",
  "car rent Nepal",
  "Pokhara vehicle booking",
  
  // Tour Packages (SECOND PRIORITY)
  "Nepal tour packages",
  "Nepal travel agency",
  "Kathmandu tours",
  "Pokhara tours",
  "Nepal holiday packages",
  "tour operator Nepal",
  "Nepal sightseeing tour",
  "cultural tours Nepal",
  
  // Trekking (THIRD PRIORITY)
  "trekking in Nepal",
  "Himalaya trekking",
  "Everest Base Camp trek",
  "Annapurna Circuit trek",
  "Langtang trek",
  "Nepal trekking packages",
  
  // Adventure Activities (FOURTH PRIORITY)
  "paragliding Pokhara",
  "bungee jumping Nepal",
  "Nepal adventure tourism",
  "rafting Nepal",
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
    ? absoluteImages.map((src) => ({ url: src, alt: title }))
    : [
        {
          url: toAbsoluteUrl("/images-5.jpg"),
          width: 1920,
          height: 1080,
          alt: title,
        },
      ];
  return {
    title,
    description,
    keywords: [...BASE_KEYWORDS, ...keywords],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    applicationName: SITE_NAME,
    category,
    alternates: { 
      canonical: path,
      languages: {
        'en-US': path,
      },
    },
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title,
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
      title,
      description,
      images: ogImages,
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
      google: undefined, // Add your Google Search Console verification code here
      yandex: undefined,
      bing: undefined,
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