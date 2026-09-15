import Link from "next/link";
import DeleteButton from "@/components/admin/delete-button";
import {
  MapPin,
  Calendar,
  DollarSign,
  Mountain,
  Clock,
  Check,
  X as XIcon,
  ChevronLeft,
  Users,
  Search,
  Flame,
} from "lucide-react";
import { getHeroImage, getCardImage } from "@/lib/cloudinary";
import { formatDuration } from "@/lib/types";

interface FullOverview {
  intro?: string;
  geography?: string;
  culture?: string;
  specialPlaces?: string;
  trekking?: string;
  bestTime?: string;
  permits?: string;
  conservation?: string;
}

export function TourPackageView({
  data,
  editHref,
  deleteEndpoint,
  listHref,
  trek = false,
}: {
  data: {
    _id: string;
    title?: string;
    slug?: string;
    category?: string;
    location?: string;
    difficulty?: string;
    durationDays?: number;
    durationText?: string;
    region?: { _id?: string; name?: string } | null;
    price?: number;
    maxAltitude?: string;
    bestSeason?: string;
    shortOverview?: string;
    fullOverview?: FullOverview;
    highlights?: string[];
    itinerary?: { day?: number; title?: string; desc?: string }[];
    included?: string[];
    excluded?: string[];
    images?: string[];
    status?: string;
    rating?: number;
    reviewsCount?: number;
  };
  editHref: string;
  deleteEndpoint: string;
  listHref: string;
  trek?: boolean;
}) {
  const name = trek ? "Trek" : "Tour";
  const cover = data.images?.[0] || "";

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href={listHref}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to {trek ? "Treks" : "Tours"}
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={editHref}
            className="inline-flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Edit {name}
          </Link>
          <DeleteButton endpoint={deleteEndpoint} />
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-80 rounded-2xl overflow-hidden mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getHeroImage(cover) || "/placeholder-hero.jpg"}
          alt={data.title || name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {(data.category || trek ? [data.category || "trek"] : []).map((c) => (
              <span
                key={c}
                className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-orange-600 text-white"
              >
                {c}
              </span>
            ))}
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
            {data.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/90">
            {data.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {data.location}
              </span>
            )}
            {data.durationDays && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {formatDuration(data.durationDays, data.durationText)}
              </span>
            )}
            {data.difficulty && (
              <span className="inline-flex items-center gap-1.5">
                <Flame className="w-4 h-4" />
                {data.difficulty}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <Users className="w-5 h-5 text-orange-600 mb-2" />
          <p className="text-xs text-gray-500">Location</p>
          <p className="font-semibold text-gray-900 mt-1 truncate">
            {data.location || "Nepal"}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <Calendar className="w-5 h-5 text-orange-600 mb-2" />
          <p className="text-xs text-gray-500">Duration</p>
          <p className="font-semibold text-gray-900 mt-1">
            {formatDuration(data.durationDays, data.durationText)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <DollarSign className="w-5 h-5 text-orange-600 mb-2" />
          <p className="text-xs text-gray-500">Price</p>
          <p className="font-semibold text-gray-900 mt-1">
            {data.price ? `Rs ${data.price.toLocaleString("en-IN")}` : "—"}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <Mountain className="w-5 h-5 text-orange-600 mb-2" />
          <p className="text-xs text-gray-500">Max Altitude</p>
          <p className="font-semibold text-gray-900 mt-1">
            {data.maxAltitude || "—"}
          </p>
        </div>
      </div>

      {/* Overview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {data.shortOverview || "No overview provided."}
        </p>
      </div>

      {/* Highlights */}
      {data.highlights?.length ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span className="text-gray-800">{h}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Itinerary */}
      {data.itinerary?.length ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Itinerary</h2>
          <p className="text-gray-500 text-sm mb-6">
            Day-by-day breakdown of this {name.toLowerCase()}
          </p>
          <div className="relative border-l-2 border-orange-200 ml-3 space-y-8">
            {data.itinerary.map((day, i) => (
              <div key={i} className="relative pl-8">
                <span className="absolute -left-[13px] top-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {day.day ?? i + 1}
                </span>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {day.title || `Day ${day.day ?? i + 1}`}
                </h3>
                {day.desc && (
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                    {day.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Included / Excluded */}
      {(data.included?.length || data.excluded?.length) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4" />
              </span>
              Included
            </h3>
            <ul className="space-y-2.5">
              {data.included?.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-gray-700 text-sm">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
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
              {data.excluded?.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-gray-700 text-sm">
                  <XIcon className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {/* Region + extras */}
      {data.region?.name ? (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-8 flex items-center gap-3">
          <Search className="w-5 h-5 text-orange-600" />
          <div>
            <p className="text-xs text-orange-700 font-semibold">Region</p>
            <p className="text-gray-900 font-medium">{data.region.name}</p>
          </div>
        </div>
      ) : null}

      {/* Gallery */}
      {data.images?.length ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Gallery</h2>
          <p className="text-gray-500 text-sm mb-5">
            {data.images.length} image{data.images.length !== 1 ? "s" : ""} available
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={getCardImage(src) || src}
                alt={`${name} image ${i + 1}`}
                className="w-full h-40 object-cover rounded-lg border border-gray-200"
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default TourPackageView;