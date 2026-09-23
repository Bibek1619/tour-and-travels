import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/seo";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hamro Yatra Adventure | Trekking & Tour Packages in Nepal",
    template: "%s | Hamro Yatra Adventure",
  },
  description:
    "26+ years of experience in trekking, tours and transportation services across Nepal. Book treks, tour packages, seat reservations and vehicle rentals.",
  keywords: [
    "Hamro Yatra Adventure",
    "Nepal tour packages",
    "trekking in Nepal",
    "Nepal travel agency",
    "Kathmandu tours",
    "Himalaya trekking",
    "Nepal adventure tourism",
    "Everest Base Camp trek",
    "Annapurna Circuit",
    "Langtang trek",
    "Sagarmatha tours",
    "Pokhara tours",
    "Chitwan safari",
    "Lumbini tours",
    "vehicle rental Nepal",
    "car rent in Pokhara",
    "Scorpio rent in Pokhara",
    "Scorpio booking in Pokhara",
    "Scorpio hire Pokhara",
    "Mahindra Scorpio Nepal rent",
    "car rental Pokhara",
    "luxury car rent Pokhara",
    "SUV hire Nepal",
    "Nepal bus booking",
    "daily route seat booking",
    "rafting in Nepal",
    "paragliding Pokhara",
    "Nepal holiday packages",
    "best time to visit Nepal",
    "Nepal tourism",
    "Himalaya tours",
  ],
  applicationName: "Hamro Yatra Adventure",
  authors: [{ name: "Hamro Yatra Adventure" }],
  creator: "Hamro Yatra Adventure",
  publisher: "Hamro Yatra Adventure",
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    title: "Hamro Yatra Adventure | Trekking & Tour Packages in Nepal",
    description:
      "26+ years of experience in trekking, tours and transportation services across Nepal. Book treks, tour packages, seat reservations and vehicle rentals.",
    url: SITE_URL,
    siteName: "Hamro Yatra Adventure",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images-5.jpg",
        width: 1920,
        height: 1080,
        alt: "Hamro Yatra Adventure - Nepal Trekking & Tours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamro Yatra Adventure | Trekking & Tour Packages in Nepal",
    description:
      "26+ years of experience in trekking, tours and transportation services across Nepal.",
    images: ["/images-5.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ea580c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${inter.variable} ${jakarta.variable}`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
            <Analytics />
             <SpeedInsights />
      </body>
    </html>
  );
}