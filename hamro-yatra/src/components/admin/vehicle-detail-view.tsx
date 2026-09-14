import Link from "next/link";
import DeleteButton from "@/components/admin/delete-button";
import {
  Car,
  ChevronLeft,
  DollarSign,
  Users,
  Briefcase,
  Fuel,
  Star,
  Check,
} from "lucide-react";
import { getHeroImage, getCardImage } from "@/lib/cloudinary";

export function VehicleDetailView({
  data,
  editHref,
  deleteEndpoint,
  listHref,
}: {
  data: {
    _id: string;
    name?: string;
    category?: string;
    fuelType?: string;
    brand?: string;
    model?: string;
    dailyRate?: number;
    capacity?: number;
    luggage?: string;
    features?: string[];
    bestFor?: string;
    availableCount?: number;
    rating?: number;
    totalReviews?: number;
    isAvailable?: boolean;
    images?: string[];
  };
  editHref: string;
  deleteEndpoint: string;
  listHref: string;
}) {
  const cover = data.images?.[0] || "";
  const categoryLabel = (data.category ?? "").charAt(0).toUpperCase() + (data.category ?? "").slice(1);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href={listHref}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Vehicles
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={editHref}
            className="inline-flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Edit Vehicle
          </Link>
          <DeleteButton endpoint={deleteEndpoint} />
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-72 rounded-2xl overflow-hidden mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getHeroImage(cover) || "/placeholder-hero.jpg"}
          alt={data.name || "Vehicle"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-orange-600 text-white">
              {categoryLabel}
            </span>
            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                data.isAvailable
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {data.isAvailable ? "Available" : "Unavailable"}
            </span>
            {data.rating ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500 text-white">
                <Star className="w-3.5 h-3.5 fill-current" />
                {data.rating.toFixed(1)}
              </span>
            ) : null}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {data.name}
          </h1>
          {(data.brand || data.model) && (
            <p className="text-white/90 text-sm">
              {data.brand} {data.model}
            </p>
          )}
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <DollarSign className="w-5 h-5 text-orange-600 mb-2" />
          <p className="text-xs text-gray-500">Daily Rate</p>
          <p className="font-semibold text-gray-900 mt-1">
            {data.dailyRate ? `$${data.dailyRate.toLocaleString()}` : "—"}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <Users className="w-5 h-5 text-orange-600 mb-2" />
          <p className="text-xs text-gray-500">Capacity</p>
          <p className="font-semibold text-gray-900 mt-1">
            {data.capacity ? `${data.capacity} passengers` : "—"}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <Fuel className="w-5 h-5 text-orange-600 mb-2" />
          <p className="text-xs text-gray-500">Fuel Type</p>
          <p className="font-semibold text-gray-900 mt-1 capitalize">
            {data.fuelType || "—"}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <Briefcase className="w-5 h-5 text-orange-600 mb-2" />
          <p className="text-xs text-gray-500">Luggage</p>
          <p className="font-semibold text-gray-900 mt-1">
            {data.luggage || "—"}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Car className="w-5 h-5 text-orange-600" />
            Vehicle Details
          </h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Category</dt>
              <dd className="font-medium text-gray-900">{categoryLabel || "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Brand</dt>
              <dd className="font-medium text-gray-900">{data.brand || "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Model</dt>
              <dd className="font-medium text-gray-900">{data.model || "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Best For</dt>
              <dd className="font-medium text-gray-900">{data.bestFor || "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Available Count</dt>
              <dd className="font-medium text-gray-900">
                {data.availableCount ?? 0}
              </dd>
            </div>
            {data.totalReviews ? (
              <div className="flex justify-between">
                <dt className="text-gray-500">Total Reviews</dt>
                <dd className="font-medium text-gray-900">{data.totalReviews}</dd>
              </div>
            ) : null}
          </dl>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Check className="w-5 h-5 text-orange-600" />
            Features
          </h3>
          {data.features?.length ? (
            <div className="flex flex-wrap gap-2">
              {data.features.map((feat, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 text-sm font-medium px-3 py-1.5 rounded-lg"
                >
                  <Check className="w-3.5 h-3.5" />
                  {feat}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No features listed.</p>
          )}

          {data.bestFor && (
            <div className="mt-6 pt-5 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Best For</p>
              <p className="text-gray-800 text-sm">{data.bestFor}</p>
            </div>
          )}
        </div>
      </div>

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
                alt={`Vehicle image ${i + 1}`}
                className="w-full h-40 object-cover rounded-lg border border-gray-200"
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default VehicleDetailView;