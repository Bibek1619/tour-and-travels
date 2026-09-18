import { connectDB } from "@/lib/db";
import { TourPackage } from "@/models/tourPackage";
import type { Tour } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Mountain, ChevronLeft } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TrekDetailClient from "./trek-detail-client";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  await connectDB();
  const treks = await TourPackage.find({
    category: "trek",
    status: "published",
  })
    .select("slug")
    .lean();
  return treks.map((t) => ({ slug: String(t.slug) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trek = await getTrek(slug);
  if (!trek) return { title: "Trek Not Found" };
  const description =
    trek.shortOverview ||
    `${trek.title} - ${trek.durationDays || ""} days trek in ${
      trek.location || "Nepal"
    }. Price from $${trek.price}. Book with Hamro Yatra Adventure.`;
  return buildMetadata({
    title: `${trek.title} - Trek Package`,
    description,
    path: `/treks/${slug}`,
    keywords: [
      trek.title,
      `${trek.title.toLowerCase()} trekking`,
      `${trek.title.toLowerCase()} cost`,
      "Himalaya trekking",
      "Nepal trekking package",
    ],
    images: trek.images || [],
  });
}

async function getTrek(slug: string): Promise<Tour | null> {
  await connectDB();
  const trek = await TourPackage.findOne({
    slug,
    category: "trek",
    status: "published",
  }).lean();
  if (!trek) return null;
  return JSON.parse(JSON.stringify(trek)) as Tour;
}

async function getSimilarTreks(excludeSlug: string): Promise<Tour[]> {
  const treks = await TourPackage.find({
    category: "trek",
    status: "published",
    slug: { $ne: excludeSlug },
  })
    .limit(4)
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(treks)) as Tour[];
}

export default async function TrekDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trek = await getTrek(slug);

  if (!trek) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <Mountain className="w-20 h-20 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700">Trek Not Found</h2>
          <Link
            href="/trek-packages"
            className="mt-4 text-orange-600 hover:underline"
          >
            ← Back to Trek Packages
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const similarTreks = await getSimilarTreks(slug);

  return (
    <div>
      <Navbar />
      <TrekDetailClient trek={trek} similarTreks={similarTreks} />
      <Footer />
    </div>
  );
}
