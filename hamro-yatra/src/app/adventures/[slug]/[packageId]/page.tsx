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
      
      {/* Hero Section - BestTrip Style */}
      <section className="bg-gray-50 py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <article className="overflow-hidden rounded-3xl bg-white shadow-lg">
            <div className="grid lg:grid-cols-12">
              {/* Image */}
              <div className="relative min-h-[320px] sm:min-h-[420px] lg:col-span-7 lg:min-h-[600px]">
                <Image
                  src={images[0]}
                  alt={`${pkg.name} — ${pkg.location}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm backdrop-blur">
                  <MapPin className="h-4 w-4 text-orange-600" />
                  {pkg.location}
                </div>
                {pkg.duration && (
                  <div className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm">
                    <MessageCircle className="h-4 w-4" />
                    {pkg.duration}
                  </div>
                )}
                {pkg.difficulty && (
                  <div className="absolute left-5 top-5 inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                    {pkg.difficulty}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-5 lg:p-12">
                <p className="text-sm font-semibold text-orange-600">
                  {category.name}
                </p>
                <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-4xl xl:text-5xl">
                  {pkg.name}
                </h1>
                {pkg.shortDescription && (
                  <p className="mt-4 max-w-prose text-base leading-relaxed text-gray-600">
                    {pkg.shortDescription}
                  </p>
                )}

                <div className="mt-8 flex items-end justify-between gap-4 border-t border-gray-200 pt-6">
                  <div>
                    <p className="text-sm text-gray-600">Starting from</p>
                    <p className="text-3xl font-semibold tracking-tight text-gray-900">
                      NPR {price.toLocaleString("en-IN")}
                      <span className="ml-1 text-sm font-normal text-gray-600">
                        per person
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      USD ${Math.round(price / 130)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <AdventureEnquiryButton
                    packageName={pkg.name}
                    packageId={pkg._id}
                    packageType="adventure"
                  />
                  <a
                    href={`https://wa.me/9779856006671?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-gray-900"
                  >
                    <MessageCircle className="h-4 w-4 text-green-600" />
                    Chat on WhatsApp
                  </a>
                </div>

                {/* Contact Info - Mobile Only */}
                <div className="lg:hidden mt-6 pt-6 border-t border-gray-200 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4 text-orange-600" />
                    <a href="tel:+9779856006671" className="hover:text-orange-600">
                      +977 9856006671
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-4 h-4 text-orange-600" />
                    <a href="mailto:hamroyatraadventure@gmail.com" className="hover:text-orange-600 text-xs break-all">
                      hamroyatraadventure@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Description & Details */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Adventure</h2>
              <MarkdownContent content={pkg.description || ""} />
            </div>

            {pkg.safetyInfo && (
              <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                <h3 className="font-bold text-red-800 mb-2">Safety Info</h3>
                <p className="text-red-700 text-sm">{pkg.safetyInfo}</p>
              </div>
            )}

            {pkg.bestSeason && (
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h3 className="font-bold text-blue-800 mb-1">Best Season</h3>
                <p className="text-blue-700 text-sm">{pkg.bestSeason}</p>
              </div>
            )}

            {pkg.faqs && pkg.faqs.length > 0 && (
              <div className="mt-8">
                <FaqSection
                  title="Frequently Asked Questions"
                  items={pkg.faqs}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}