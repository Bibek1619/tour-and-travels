import type { Metadata } from "next";

export const SITE_NAME = "Hamro Yatra Adventure";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://hamroyatraadventure.com";

const BASE_KEYWORDS = [
  "Hamro Yatra Adventure",
  "Nepal tour packages",
  "trekking in Nepal",
  "Nepal travel agency",
  "Kathmandu tours",
  "Himalaya trekking",
  "Nepal adventure tourism",
  "tour operator Nepal",
  "Everest trekking",
  "Annapurna trekking",
  
  "Nepal holiday packages",
  "vehicle rental Nepal",
  "car rent in Pokhara",
  "Scorpio rent in Pokhara",
  "Scorpio booking in Pokhara",
  "Scorpio hire Pokhara",
  "Scorpio rent pokhara",
  "car rental Pokhara",
  "luxury car rent Pokhara",
  "scarpio hire Nepal",
  
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
    alternates: { canonical: path },
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
      title,
      description,
      images: ogImages,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
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