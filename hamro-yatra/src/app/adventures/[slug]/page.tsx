import { connectDB } from "@/lib/db";
import { Adventure } from "@/models/adventure";
import type { Adventure as AdventureType } from "@/lib/types";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  Clock,
  Users,
  MapPin,
  Star,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getAdventureCategories, getAdventureCategory } from "@/lib/adventure-categories";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await getAdventureCategories();
  return categories.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getAdventureCategory(slug);
  return buildMetadata({
    title: `${category.name} in Nepal - Adventure Packages`,
    description: category.description,
    path: `/adventures/${slug}`,
    keywords: [
      `${category.name.toLowerCase()} in Nepal`,
      `${category.name.toLowerCase()} packages`,
      `${category.name.toLowerCase()} price Nepal`,
      "Nepal adventure activities",
    ],
    images: [category.image],
  });
}

async function getAdventures(category: string): Promise<AdventureType[]> {
  await connectDB();
  const adventures = await Adventure.find({
    category,
    status: "published",
  } as unknown as Parameters<typeof Adventure.find>[0])
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(adventures)) as AdventureType[];
}

function getDifficultyBadge(difficulty?: string) {
  const colorMap: Record<string, string> = {
    Easy: "bg-emerald-500 text-white",
    Moderate: "bg-amber-500 text-white",
    Hard: "bg-orange-500 text-white",
    Expert: "bg-red-500 text-white",
  };
  return colorMap[difficulty || ""] || "bg-gray-500 text-white";
}

function getCardImage(images?: string[], fallback?: string) {
  return images?.[0] || fallback || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800";
}

export default async function AdventureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getAdventureCategory(slug);
  const adventures = await getAdventures(category.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Compact Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link
            href="/adventures"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Adventures
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {category.name}
              </h1>
              <p className="text-gray-600">
                {adventures.length} {adventures.length === 1 ? "Package" : "Packages"}{" "}
                Available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {adventures.length === 0 && (
            <div className="text-center py-16">
              <p className="text-2xl font-bold text-gray-900 mb-2">
                No Adventures Found
              </p>
              <p className="text-gray-600 mb-6">
                There are no adventure packages available in this category yet.
              </p>
              <Link
                href="/adventures"
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                ← Back to Adventures
              </Link>
            </div>
          )}

          {adventures.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {adventures.map((pkg) => (
                <div
                  key={pkg._id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={getCardImage(pkg.images, category.image)}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {pkg.difficulty && (
                      <div
                        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getDifficultyBadge(pkg.difficulty)}`}
                      >
                        {pkg.difficulty}
                      </div>
                    )}
                    {pkg.featured && (
                      <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        ⭐ Featured
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {pkg.name}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-2 mb-3 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{pkg.location}</span>
                    </div>

                    {/* Details */}
                    <div className="flex items-center gap-4 mb-5 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>
                          {pkg.groupSize?.min || 1}-{pkg.groupSize?.max || 10} people
                        </span>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {pkg.shortDescription || pkg.description}
                    </p>

                    {/* Price & CTA */}
                    <div className="pt-5 border-t border-gray-100">
                      <div className="flex items-end justify-between mb-4">
                        <div>
                          <span className="text-xs text-gray-400 uppercase tracking-wider">
                            From
                          </span>
                          <div className="text-2xl font-bold text-gray-900">
                            ${(pkg.price || 0).toLocaleString()}
                          </div>
                        </div>
                        {(pkg.rating ?? 0) > 0 && (
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="font-semibold">{pkg.rating}</span>
                            <span className="text-gray-400">
                              ({pkg.reviewsCount || 0})
                            </span>
                          </div>
                        )}
                      </div>
                      <Link
                        href={`/adventures/${slug}/${pkg._id}`}
                        className="block w-full bg-orange-600 hover:bg-orange-700 text-white text-center py-3 rounded-xl font-semibold transition-all duration-300"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}