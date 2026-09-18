import { connectDB } from "@/lib/db";
import { TourPackage } from "@/models/tourPackage";
import type { Tour } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Mountain, ChevronLeft } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TourDetailClient from "./tour-detail-client";
import { buildMetadata } from "@/lib/seo";
import { getEntityReviews } from "@/lib/review-helpers";

export const revalidate = 3600;

export async function generateStaticParams() {
  await connectDB();
  const tours = await TourPackage.find({
    category: "tour",
    status: "published",
  })
    .select("slug")
    .lean();
  return tours.map((t) => ({ slug: String(t.slug) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTour(slug);
  if (!tour) return { title: "Tour Not Found" };
  const description =
    tour.shortOverview ||
    `${tour.title} - ${tour.durationDays || ""} days in ${
      tour.location || "Nepal"
    }. Price from Rs ${tour.price?.toLocaleString(
      "en-IN"
    )} per person. Book with Hamro Yatra Adventure.`;
  return buildMetadata({
    title: `${tour.title} - Tour Package`,
    description,
    path: `/tours/${slug}`,
    keywords: [
      tour.title,
      `${tour.location || "Nepal"} tour`,
      `${tour.title.toLowerCase()} price`,
      "Nepal tour package",
      "seen & sightseeing Nepal",
    ],
    images: tour.images || [],
  });
}

async function getTour(slug: string): Promise<Tour | null> {
  await connectDB();
  const tour = await TourPackage.findOne({
    slug,
    category: "tour",
    status: "published",
  }).lean();
  if (!tour) return null;
  return JSON.parse(JSON.stringify(tour)) as Tour;
}

async function getSimilarTours(excludeSlug: string): Promise<Tour[]> {
  const tours = await TourPackage.find({
    category: "tour",
    status: "published",
    slug: { $ne: excludeSlug },
  })
    .limit(4)
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(tours)) as Tour[];
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = await getTour(slug);

  if (!tour) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <Mountain className="w-20 h-20 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Tour Not Found
          </h2>
          <Link
            href="/tours"
            className="mt-4 text-orange-600 hover:underline flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Tour Packages
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const similarTours = await getSimilarTours(slug);
  const reviews = await getEntityReviews("tour", tour._id);

  return (
    <div>
      <Navbar />
      <TourDetailClient
        tour={tour}
        similarTours={similarTours}
        initialReviews={reviews.data}
        initialTotalReviews={reviews.total}
        initialAvgRating={reviews.avgRating}
      />
      <Footer />
    </div>
  );
}
