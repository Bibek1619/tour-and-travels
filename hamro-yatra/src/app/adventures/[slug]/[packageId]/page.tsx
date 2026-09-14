import { connectDB } from "@/lib/db";
import { Adventure } from "@/models/adventure";
import type { Adventure as AdventureType } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Clock,
  Users,
  Star,
  ChevronLeft,
  MapPin,
  MessageCircle,
  Mail,
  Send,
  Phone,
  Mountain,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getAdventureCategory } from "@/lib/adventure-categories";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; packageId: string }>;
}): Promise<Metadata> {
  const { slug, packageId } = await params;
  const pkg = await getPackage(slug, packageId);
  if (!pkg) return { title: "Package Not Found" };
  const category = await getAdventureCategory(slug);
  const description =
    pkg.shortDescription ||
    `${pkg.name} - ${pkg.duration || ""} in ${pkg.location || "Nepal"}. Price NPR ${pkg.price}. Book with Hamro Yatra Adventure.`;
  return buildMetadata({
    title: `${pkg.name} - ${category.name} Package`,
    description,
    path: `/adventures/${slug}/${packageId}`,
    keywords: [
      pkg.name,
      `${pkg.name.toLowerCase()} price`,
      `${category.name.toLowerCase()} in Nepal`,
      "Nepal adventure package",
      `${pkg.location || "Nepal"} adventure`,
    ],
    images: pkg.images || [],
  });
}

async function getPackage(
  slug: string,
  packageId: string
): Promise<AdventureType | null> {
  await connectDB();
  const adventure = await Adventure.findOne({
    _id: packageId,
    category: slug,
    status: "published",
  } as unknown as Parameters<typeof Adventure.findOne>[0]).lean();
  if (!adventure) return null;
  return JSON.parse(JSON.stringify(adventure)) as AdventureType;
}

export default async function AdventurePackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string; packageId: string }>;
}) {
  const { slug, packageId } = await params;
  const category = await getAdventureCategory(slug);
  const pkg = await getPackage(slug, packageId);

  if (!pkg) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <Mountain className="w-20 h-20 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Package Not Found
          </h2>
          <Link
            href={`/adventures/${slug}`}
            className="text-orange-600 hover:underline"
          >
            ← Back to {category.name}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images =
    pkg.images && pkg.images.length > 0 ? pkg.images : [category.image];
  const price = pkg.price || 0;
  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in booking ${pkg.name}.\n\n` +
      `Duration: ${pkg.duration}\n` +
      `Price: NPR ${price.toLocaleString()}\n\n` +
      `Can you provide more details?`
  );

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-orange-600">
                Home
              </Link>
              <ChevronLeft className="w-4 h-4 rotate-180" />
              <Link href="/adventures" className="hover:text-orange-600">
                Adventures
              </Link>
              <ChevronLeft className="w-4 h-4 rotate-180" />
              <Link
                href={`/adventures/${slug}`}
                className="hover:text-orange-600"
              >
                {category.name}
              </Link>
              <ChevronLeft className="w-4 h-4 rotate-180" />
              <span className="text-gray-800 font-medium">{pkg.name}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-6 min-w-0">
              {/* Title & Rating */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-words">
                  {pkg.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  {(pkg.rating ?? 0) > 0 && (
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      <span className="font-bold">{pkg.rating}</span>
                      <span className="text-gray-500">
                        ({pkg.reviewsCount || 0} reviews)
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{pkg.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>
                      {pkg.groupSize?.min || 1}-{pkg.groupSize?.max || 10} people
                    </span>
                  </div>
                  {pkg.difficulty && (
                    <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                      {pkg.difficulty}
                    </span>
                  )}
                </div>
              </div>

              {/* Photo Gallery */}
              <div className="rounded-xl overflow-hidden shadow-lg">
                <div className="grid grid-cols-2 gap-4">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`rounded-xl overflow-hidden h-[300px] ${
                        images.length === 1 ? "col-span-2" : ""
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${pkg.name} ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* About Section */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About This Adventure
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {pkg.description}
                </p>

                {pkg.safetyInfo && (
                  <div className="mt-6 bg-red-50 border border-red-100 rounded-lg p-4">
                    <h3 className="font-bold text-red-800 mb-2">Safety Info</h3>
                    <p className="text-red-700 text-sm">{pkg.safetyInfo}</p>
                  </div>
                )}

                {pkg.bestSeason && (
                  <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <h3 className="font-bold text-blue-800 mb-1">Best Season</h3>
                    <p className="text-blue-700 text-sm">{pkg.bestSeason}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 min-w-0">
              <div className="lg:sticky lg:top-4 space-y-4">
                {/* Booking Card */}
                <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 shadow-lg border border-orange-100">
                  <div className="text-center mb-6 pb-6 border-b border-orange-200">
                    <p className="text-sm text-gray-600 mb-2">Starting from</p>
                    <div className="flex items-baseline justify-center gap-2 flex-wrap">
                      <span className="text-4xl sm:text-5xl font-bold text-orange-600 break-all">
                        ${price}
                      </span>
                      <span className="text-gray-500">/person</span>
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Ready to Book?
                    </h3>
                    <p className="text-sm text-gray-600">
                      Contact us for instant booking
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <Link
                      href="/contact"
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-3 group"
                    >
                      <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>Send Enquiry</span>
                    </Link>

                    <a
                      href={`https://wa.me/9779841480794?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-3 group"
                    >
                      <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>Book via WhatsApp</span>
                    </a>
                  </div>

                  <div className="bg-white rounded-lg p-4 space-y-3">
                    <div className="text-center text-xs text-gray-500 mb-3">
                      Or reach us directly
                    </div>
                    <a
                      href="tel:+9779841480794"
                      className="flex items-center gap-3 text-gray-700 hover:text-orange-600 transition-colors"
                    >
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Call us</div>
                        <div className="font-semibold">+977 984-1480794</div>
                      </div>
                    </a>
                    <a
                      href="mailto:info@hamroyatra.com.np"
                      className="flex items-center gap-3 text-gray-700 hover:text-orange-600 transition-colors"
                    >
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Email us</div>
                        <div className="font-semibold text-sm">
                          info@hamroyatra.com.np
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}