import { connectDB } from "@/lib/db";
import { Adventure } from "@/models/adventure";
import type { Adventure as AdventureType } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Star,
  ChevronLeft,
  MapPin,
  MessageCircle,
  Mail,
  Phone,
  Mountain,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getAdventureCategory } from "@/lib/adventure-categories";
import FaqSection from "@/components/faq-section";
import { buildMetadata } from "@/lib/seo";
import MarkdownContent from "@/components/markdown-content";
import AdventureEnquiryButton from "@/components/adventure-enquiry-button";
import { getHeroImage } from "@/lib/cloudinary";
import JsonLd from "@/components/json-ld";
import { adventureJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateStaticParams() {
  await connectDB();
  const adventures = await Adventure.find({ status: "published" })
    .select("_id category")
    .lean();
  return adventures.map((a) => ({
    slug: String(a.category),
    packageId: String(a._id),
  }));
}

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
    title: `${pkg.name} - ${category.name} Package Nepal`,
    description,
    path: `/adventures/${slug}/${packageId}`,
    keywords: [
      pkg.name,
      `${pkg.name.toLowerCase()} price`,
      `book ${pkg.name.toLowerCase()}`,
      `${pkg.name.toLowerCase()} cost`,
      `${category.name.toLowerCase()} in Nepal`,
      `${category.name.toLowerCase()} booking Nepal`,
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
      <JsonLd
        data={adventureJsonLd({
          name: pkg.name,
          description: pkg.shortDescription,
          image: getHeroImage(images[0]),
          url: `/adventures/${slug}/${packageId}`,
          category: category.name,
          location: pkg.location,
          duration: pkg.duration,
          price,
          rating: pkg.rating,
          ratingCount: pkg.reviewsCount || 0,
          faqs: pkg.faqs,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Adventures", url: "/adventures" },
          { name: category.name, url: `/adventures/${slug}` },
          { name: pkg.name, url: `/adventures/${slug}/${packageId}` },
        ])}
      />
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
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{pkg.location}</span>
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
                      className={`relative rounded-xl overflow-hidden h-[300px] ${
                        images.length === 1 ? "col-span-2" : ""
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${pkg.name} ${idx + 1}`}
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        fetchPriority={idx === 0 ? "high" : "low"}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile-Only Quick Booking Section - Below Photos */}
              <div className="lg:hidden bg-white rounded-xl p-3 sm:p-4 shadow max-w-sm mx-auto">
                {/* Price at top */}
                <div className="text-center mb-3 pb-3 border-b border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Starting from</p>
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-xl sm:text-2xl font-bold text-orange-600">
                      NPR {price.toLocaleString()}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500">/person</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">USD ${Math.round(price / 130)}</p>
                </div>

                {/* Enquiry Button - Compact & Responsive */}
                <div className="mb-3">
                  <AdventureEnquiryButton
                    packageName={pkg.name}
                    packageId={pkg._id}
                    packageType="adventure"
                  />
                </div>

                {/* Contact Info - Everything on single lines */}
                <div className="space-y-1.5 text-[10px] sm:text-xs text-gray-700">
                  <div className="flex items-center gap-1 whitespace-nowrap overflow-x-auto">
                    <MessageCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                    <span className="font-medium">WhatsApp/Call:</span>
                    <a href="tel:+9779856006671" className="text-orange-600 hover:underline flex-shrink-0">
                      +977 9856006671
                    </a>
                  </div>
                  <div className="flex items-center gap-1 overflow-hidden">
                    <Mail className="w-3 h-3 text-orange-600 flex-shrink-0" />
                    <a 
                      href="mailto:hamroyatraadventure@gmail.com"
                      className="text-orange-600 hover:underline overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                      hamroyatraadventure@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* About Section - No box, plain like blog */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  About This Adventure
                </h2>
                <MarkdownContent content={pkg.description || ""} />

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

              {/* FAQ - No box */}
              {pkg.faqs && pkg.faqs.length > 0 && (
                <div className="mt-8">
                  <FaqSection
                    title="Frequently Asked Questions"
                    items={pkg.faqs}
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 min-w-0">
              <div className="lg:sticky lg:top-4 space-y-4">
                {/* Booking Card - Responsive sizing */}
                <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-4 lg:p-6 shadow-lg border border-orange-100">
                  <div className="text-center mb-4 lg:mb-6 pb-4 lg:pb-6 border-b border-orange-200">
                    <p className="text-xs lg:text-sm text-gray-600 mb-1 lg:mb-2">Starting from</p>
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-baseline justify-center gap-1 lg:gap-2">
                        <span className="text-2xl lg:text-4xl xl:text-5xl font-bold text-orange-600">
                          NPR {price.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-base lg:text-xl text-gray-600">
                        USD ${Math.round(price / 130)}
                      </div>
                      <span className="text-xs lg:text-sm text-gray-500">/person</span>
                    </div>
                  </div>

                  <div className="text-center mb-3 lg:mb-4">
                    <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-1">
                      Ready to Book?
                    </h3>
                    <p className="text-xs lg:text-sm text-gray-600">
                      Contact us for instant booking
                    </p>
                  </div>

                  <div className="space-y-2 lg:space-y-3 mb-4 lg:mb-6">
                    <AdventureEnquiryButton
                      packageName={pkg.name}
                      packageId={pkg._id}
                      packageType="adventure"
                    />

                    <a
                      href={`https://wa.me/9779856006671?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 lg:py-4 rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2 lg:gap-3 group text-sm lg:text-base"
                    >
                      <MessageCircle className="w-4 h-4 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform" />
                      <span>Book via WhatsApp</span>
                    </a>
                  </div>

                  <div className="bg-white rounded-lg p-3 lg:p-4 space-y-2 lg:space-y-3">
                    <div className="text-center text-xs text-gray-500 mb-2 lg:mb-3">
                      Or reach us directly
                    </div>
                    <a
                      href="tel:+9779856006671"
                      className="flex items-center gap-2 lg:gap-3 text-gray-700 hover:text-orange-600 transition-colors"
                    >
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-gray-500">Call us</div>
                        <div className="font-semibold text-sm lg:text-base">+977 9856006671</div>
                      </div>
                    </a>
                    <a
                      href="mailto:hamroyatraadventure@gmail.com"
                      className="flex items-center gap-2 lg:gap-3 text-gray-700 hover:text-orange-600 transition-colors"
                    >
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs text-gray-500">Email us</div>
                        <div className="font-semibold text-xs lg:text-sm break-all">
                          hamroyatraadventure@gmail.com
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