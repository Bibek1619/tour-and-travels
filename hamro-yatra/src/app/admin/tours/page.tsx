import { connectDB } from "@/lib/db";
import { TourPackage } from "@/models/tourPackage";
import AdminLayout from "@/components/admin/admin-layout";
import RowActions from "@/components/admin/row-actions";
import Link from "next/link";
import type { Tour } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminToursPage() {
  await connectDB();
  const tours = JSON.parse(
    JSON.stringify(
      await TourPackage.find({ category: "tour" }).sort({ createdAt: -1 }).lean()
    )
  ) as Tour[];

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Tours</h1>
          <p className="text-gray-600">{tours.length} tour packages</p>
        </div>
        <Link
          href="/admin/tours/new"
          className="inline-flex items-center gap-1 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Tour
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Duration</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tours.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    No tours found.
                  </td>
                </tr>
              )}
              {tours.map((tour) => (
                <tr key={tour._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      {tour.images?.[0] && (
                        <img
                          src={tour.images[0]}
                          alt=""
                          className="h-10 w-14 rounded object-cover flex-shrink-0"
                        />
                      )}
                      <span className="line-clamp-1">{tour.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {tour.location || "Nepal"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {tour.durationDays ? `${tour.durationDays} Days` : "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    ${tour.price?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        tour.status === "published"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {tour.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <RowActions
                      baseHref={`/admin/tours/${tour._id}`}
                      endpoint={`/api/tours/${tour._id}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}