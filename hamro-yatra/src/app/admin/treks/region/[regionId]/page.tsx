import Link from "next/link";
import { notFound } from "next/navigation";
import AdminLayout from "@/components/admin/admin-layout";
import ReorderTable from "@/components/admin/reorder-table";
import { connectDB } from "@/lib/db";
import { Region } from "@/models/region";
import { TourPackage } from "@/models/tourPackage";
import { Mountain, ChevronLeft, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminRegionTreksPage({
  params,
}: {
  params: Promise<{ regionId: string }>;
}) {
  const { regionId } = await params;
  await connectDB();

  const region = await Region.findById(regionId).lean();
  if (!region) notFound();

  const treks = JSON.parse(
    JSON.stringify(
      await TourPackage.find({ category: "trek", region: regionId })
        .sort({ sortOrder: 1, createdAt: -1 })
        .lean()
    )
  ) as {
    _id: string;
    title?: string;
    location?: string;
    durationDays?: number;
    durationText?: string;
    difficulty?: string;
    price?: number;
    status?: string;
    images?: string[];
    slug?: string;
  }[];

  return (
    <AdminLayout>
      <div className="mb-8">
        <Link
          href="/admin/treks"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors mb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Regions
        </Link>

        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{region.name}</h1>
            <p className="text-gray-600 mt-1">{region.description}</p>
            <p className="text-gray-500 text-sm mt-2">
              {treks.length} trek{treks.length !== 1 ? "s" : ""} in this region
            </p>
          </div>
          <Link
            href={`/admin/treks/new?region=${regionId}`}
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Trek to Region
          </Link>
        </div>
      </div>

      {treks.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Mountain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No treks in this region yet
          </h3>
          <p className="text-gray-600 mb-6">
            Add trekking packages to this region
          </p>
          <Link
            href={`/admin/treks/new?region=${regionId}`}
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add First Trek
          </Link>
        </div>
      ) : (
        <ReorderTable
          items={treks}
          baseHref="/admin/treks"
          endpoint="/api/tours"
          showDifficulty
          currencyPrefix="$"
          currencyLocale="en-US"
          info={{ reorderEndpoint: "/api/tours/reorder" }}
        />
      )}
    </AdminLayout>
  );
}