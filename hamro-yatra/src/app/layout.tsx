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
    default: "Hamro Yatra Adventure | Scorpio Jeep Hire, Nepal Tours & Trekking",
    template: "%s | Hamro Yatra Adventure",
  },
  description:
    "Scorpio jeep hire in Pokhara with driver. 26+ years Nepal tour operator offering car rental, trekking packages, tour booking & adventure activities. Book online today!",
  keywords: [
    "Hamro Yatra Adventure",
    "Scorpio jeep hire in Pokhara",
    "Scorpio rental Pokhara",
    "Scorpio jeep with driver Pokhara",
    "car rental Pokhara",
    "car rental in Pokhara",
    "jeep rental Pokhara",
    "4WD jeep hire Pokhara",
    "private jeep hire Pokhara",
    "Mahindra Scorpio rental Nepal",
    "vehicle rental Nepal",
    "SUV rental Pokhara",
    "Hiace rental Pokhara",
    "tourist vehicle rental Pokhara",
    "Pokhara to Kathmandu private car",
    "off-road vehicle rental Nepal",
    "Pokhara airport car rental",
    "Nepal tour packages",
    "Nepal tour packages 2026",
    "Kathmandu Pokhara tour package",
    "trekking in Nepal",
    "Everest Base Camp trek",
    "Annapurna Circuit trek",
    "Langtang Valley trek",
    "best trekking company in Nepal",
    "paragliding Pokhara",
    "bungee jumping Nepal",
    "white water rafting Nepal",
    "Nepal adventure tourism",
    "Visit Nepal 2026",
    "Nepal bus booking online",
    "Pokhara to Kathmandu tourist bus",
  ],
  applicationName: "Hamro Yatra Adventure",
  authors: [{ name: "Hamro Yatra Adventure" }],
  creator: "Hamro Yatra Adventure",
  publisher: "Hamro Yatra Adventure",
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    title: "Hamro Yatra Adventure | Scorpio Jeep Hire, Nepal Tours & Trekking",
    description:
      "Scorpio jeep hire in Pokhara with driver. 26+ years Nepal tour operator offering car rental, trekking packages, tour booking & adventure activities.",
    url: SITE_URL,
    siteName: "Hamro Yatra Adventure",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images-5.jpg",
        width: 1920,
        height: 1080,
        alt: "Hamro Yatra Adventure - Scorpio Jeep Hire, Nepal Tours & Trekking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamro Yatra Adventure | Scorpio Jeep Hire, Nepal Tours & Trekking",
    description:
      "Scorpio jeep hire in Pokhara with driver. 26+ years Nepal tour operator — car rental, trekking & adventure activities.",
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