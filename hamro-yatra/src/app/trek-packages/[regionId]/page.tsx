import { connectDB } from "@/lib/db";
import { TourPackage } from "@/models/tourPackage";
import { formatDuration, type Tour } from "@/lib/types";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Mountain,
  TrendingUp,
  MapPin,
  Clock,
  Star,
  ArrowLeft,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { buildMetadata } from "@/lib/seo";
import { getHeroImage } from "@/lib/cloudinary";
import { getTrekRegion, type TrekRegion } from "@/lib/regions";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ regionId: string }>;
}): Promise<Metadata> {
  const { regionId } = await params;
  const region = (await getTrekRegion(regionId)) ?? DEFAULT_REGION;
  return buildMetadata({
    title: `${region.name} - Trekking Packages`,
    description: region.description,
    path: `/trek-packages/${regionId}`,
    keywords: [
      `${region.keyword} trekking`,
      `${region.keyword} trek package`,
      `${region.keyword} trail Nepal`,
      `${region.keyword} trek cost`,
    ],
  });
}

const DEFAULT_REGION: TrekRegion = {
  id: "everest",
  name: "Everest Region Trekking",
  description:
    "Home to the world's highest peak Mount Everest (8,848m), the Everest region offers iconic treks through Sherpa villages, Buddhist monasteries, and stunning Himalayan panoramas.",
  image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1920",
  keyword: "everest",
};

async function getTreksByRegion(keyword: string): Promise<Tour[]> {
  await connectDB();
  const regex = new RegExp(keyword, "i");
  const treks = await TourPackage.find({
    category: "trek",
    status: "published",
    $or: [
      { title: { $regex: regex } },
      { location: { $regex: regex } },
      { slug: { $regex: regex } },
    ],
  })
    .sort({ sortOrder: 1, createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(treks)) as Tour[];
}

function getDifficultyColor(difficulty?: string) {
  const colors: Record<string, string> = {
    easy: "bg-green-100 text-green-700",
    moderate: "bg-yellow-100 text-yellow-700",
    hard: "bg-red-100 text-red-700",
    challenging: "bg-orange-100 text-orange-700",
  };
  return colors[difficulty?.toLowerCase() || ""] || "bg-gray-100 text-gray-700";
}

export default async function TrekRegionPage({
  params,
}: {
  params: Promise<{ regionId: string }>;
}) {
  const { regionId } = await params;
  const region = (await getTrekRegion(regionId)) ?? DEFAULT_REGION;
  const treks = await getTreksByRegion(region.keyword);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section
          className="relative h-[400px] bg-cover bg-center"
          style={{ backgroundImage: `url('${getHeroImage(region.image)}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {region.name}
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              {region.description}
            </p>
          </div>
        </section>

        {/* Back Button */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link
              href="/trek-packages"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Regions</span>
            </Link>
          </div>
        </section>

        {/* Trek Cards Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Available Treks
              </h2>
              <p className="text-gray-600">
                {treks.length} trek{treks.length !== 1 ? "s" : ""} in{" "}
                {region.name}
              </p>
            </div>

            {treks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {treks.map((trek) => (
                  <Link
                    key={trek._id}
                    href={`/treks/${trek.slug}`}
                    className="block group"
                  >
                    <div className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300">
                      <div className="relative h-56 overflow-hidden rounded-t-lg">
                        <img
                          src={
                            trek.images?.[0] ||
                            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
                          }
                          alt={trek.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(trek.difficulty)}`}
                          >
                            {trek.difficulty || "Moderate"}
                          </span>
                        </div>
                        {(trek.rating ?? 0) > 0 && (
                          <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-lg flex items-center gap-1 shadow">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-semibold">
                              {trek.rating}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                          {trek.title}
                        </h3>
                        <div className="space-y-1.5 mb-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0" />
                            <span className="truncate">
                              {trek.location || "Nepal"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4 text-orange-600 flex-shrink-0" />
                            <span>{formatDuration(trek.durationDays, trek.durationText)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <TrendingUp className="w-4 h-4 text-orange-600 flex-shrink-0" />
                            <span className="truncate">
                              Max Altitude: {trek.maxAltitude || "N/A"}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {trek.shortOverview ||
                            "Experience the beauty of the Himalayas"}
                        </p>
                        <div className="flex items-center justify-between pt-3 border-t">
                          <div>
                            <span className="text-2xl font-bold text-orange-600">
                              ${trek.price}
                            </span>
                            <span className="text-sm text-gray-500">
                              /person
                            </span>
                          </div>
                          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Mountain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  No Treks Available
                </h3>
                <p className="text-gray-500 mb-4">
                  We&apos;re currently updating trek packages for this region.
                </p>
                <Link
                  href="/trek-packages"
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Browse All Regions
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
