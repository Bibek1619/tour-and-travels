import Link from "next/link";
import Image from "next/image";
import DeleteButton from "@/components/admin/delete-button";
import {
  ChevronLeft,
  MapPin,
  DollarSign,
  Clock,
  Users,
  Flame,
  Star,
  Check,
  X as XIcon,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { getHeroImage, getCardImage } from "@/lib/cloudinary";

const CATEGORY_LABELS: Record<string, string> = {
  rafting: "White Water Rafting",
  kayaking: "Kayaking",
  paragliding: "Paragliding",
  bungee: "Bungee Jumping",
  zipline: "Zip Lining",
  canyoning: "Canyoning",
};

export function AdventureDetailView({
  data,
  editHref,
  deleteEndpoint,
  listHref,
}: {
  data: {
    _id: string;
    name?: string;
    slug?: string;
    category?: string;
    location?: string;
    duration?: string;
    difficulty?: string;
    minAge?: number;
    price?: number;
    groupSize?: { min?: number; max?: number };
    included?: string[];
    excluded?: string[];
    requirements?: string[];
    safetyInfo?: string;
    bestSeason?: string;
    shortDescription?: string;
    description?: string;
    images?: string[];
    featured?: boolean;
    status?: string;
    rating?: number;
    reviewsCount?: number;
  };
  editHref: string;
  deleteEndpoint: string;
  listHref: string;
}) {
  const cover = data.images?.[0] || "";
  const categoryLabel = CATEGORY_LABELS[data.category ?? ""] || data.category;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href={listHref}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Adventures
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={editHref}
            className="inline-flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Edit Adventure
          </Link>
          <DeleteButton endpoint={deleteEndpoint} />
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-80 rounded-2xl overflow-hidden mb-8">
        <Image
          src={getHeroImage(cover) || "/placeholder-hero.jpg"}
          alt={data.name || "Adventure"}
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-orange-600 text-white">
              {categoryLabel || "Adventure"}
            </span>
            {data.featured && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500 text-white">
                <Star className="w-3.5 h-3.5 fill-current" />
                Featured
              </span>
            )}
            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                data.status === "published"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {data.status}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {data.name}
          </h1>
          {data.location && (
            <p className="text-white/90 text-sm inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {data.location}
            </p>
          )}
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <Clock className="w-5 h-5 text-orange-600 mb-2" />
          <p className="text-xs text-gray-500">Duration</p>
          <p className="font-semibold text-gray-900 mt-1">
            {data.duration || "—"}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <DollarSign className="w-5 h-5 text-orange-600 mb-2" />
          <p className="text-xs text-gray-500">Price</p>
          <p className="font-semibold text-gray-900 mt-1">
            {data.price ? `$${data.price.toLocaleString()}` : "—"}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <Flame className="w-5 h-5 text-orange-600 mb-2" />
          <p className="text-xs text-gray-500">Difficulty</p>
          <p className="font-semibold text-gray-900 mt-1">
            {data.difficulty || "—"}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <Users className="w-5 h-5 text-orange-600 mb-2" />
          <p className="text-xs text-gray-500">Group Size</p>
          <p className="font-semibold text-gray-900 mt-1">
            {data.groupSize?.min && data.groupSize?.max
              ? `${data.groupSize.min}-${data.groupSize.max}`
              : "—"}
          </p>
        </div>
      </div>

      {/* Short description */}
      {data.shortDescription && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-8">
          <p className="text-gray-800 font-medium leading-relaxed">
            {data.shortDescription}
          </p>
        </div>
      )}

      {/* Full description */}
      {data.description && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {data.description}
          </p>
        </div>
      )}

      {/* Meta extras */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Min Age</p>
          <p className="font-semibold text-gray-900">{data.minAge ?? 12} years</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Best Season</p>
          <p className="font-semibold text-gray-900">{data.bestSeason || "All Year"}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Rating</p>
          <p className="font-semibold text-gray-900">
            {data.rating ? `${data.rating.toFixed(1)} / 5` : "—"}
          </p>
        </div>
      </div>

      {/* Included / Excluded / Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4" />
            </span>
            Included
          </h3>
          <ul className="space-y-2.5">
            {data.included?.length ? (
              data.included.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-gray-700 text-sm">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))
            ) : (
              <li className="text-gray-500 text-sm">No included items.</li>
            )}
          </ul>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
              <XIcon className="w-4 h-4" />
            </span>
            Excluded
          </h3>
          <ul className="space-y-2.5">
            {data.excluded?.length ? (
              data.excluded.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-gray-700 text-sm">
                  <XIcon className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))
            ) : (
              <li className="text-gray-500 text-sm">No excluded items.</li>
            )}
          </ul>
        </div>
      </div>

      {data.requirements?.length ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Requirements
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.requirements.map((req, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-lg"
              >
                <Check className="w-3.5 h-3.5 text-orange-600" />
                {req}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {data.safetyInfo && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-blue-700 font-semibold mb-1">Safety Information</p>
            <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
              {data.safetyInfo}
            </p>
          </div>
        </div>
      )}

      {/* Gallery */}
      {data.images?.length ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Gallery</h2>
          <p className="text-gray-500 text-sm mb-5">
            {data.images.length} image{data.images.length !== 1 ? "s" : ""} available
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.images.map((src, i) => (
              <div key={i} className="relative h-40 rounded-lg border border-gray-200 overflow-hidden">
                <Image
                  src={getCardImage(src) || src}
                  alt={`Adventure image ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AdventureDetailView;