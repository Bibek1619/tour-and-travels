import Link from "next/link";
import { notFound } from "next/navigation";
import RowActions from "@/components/admin/row-actions";
import AdminLayout from "@/components/admin/admin-layout";
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
        .sort({ createdAt: -1 })
        .lean()
    )
  ) as {
    _id: string;
    title?: string;
    location?: string;
    durationDays?: number;
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
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Duration</th>
                  <th className="px-6 py-3">Difficulty</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {treks.map((trek) => (
                  <tr key={trek._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      <div className="flex items-center gap-3">
                        {trek.images?.[0] && (
                          <img
                            src={trek.images[0]}
                            alt=""
                            className="h-10 w-14 rounded object-cover flex-shrink-0"
                          />
                        )}
                        <span className="line-clamp-1">{trek.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {trek.location || "Nepal"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {trek.durationDays ? `${trek.durationDays} Days` : "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {trek.difficulty || "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      ${trek.price?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          trek.status === "published"
                            ? "bg-green-50 text-green-700"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {trek.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <RowActions
                        baseHref={`/admin/treks/${trek._id}`}
                        endpoint={`/api/tours/${trek._id}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}