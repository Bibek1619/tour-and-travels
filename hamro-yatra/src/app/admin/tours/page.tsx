import { connectDB } from "@/lib/db";
import { TourPackage } from "@/models/tourPackage";
import AdminLayout from "@/components/admin/admin-layout";
import ReorderTable from "@/components/admin/reorder-table";
import Link from "next/link";
import type { Tour } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminToursPage() {
  await connectDB();
  const tours = JSON.parse(
    JSON.stringify(
      await TourPackage.find({ category: "tour" }).sort({ sortOrder: 1, createdAt: -1 }).lean()
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

      <ReorderTable
        items={tours}
        baseHref="/admin/tours"
        endpoint="/api/tours"
        currencyPrefix="Rs"
        currencyLocale="en-IN"
        info={{ reorderEndpoint: "/api/tours/reorder" }}
      />
    </AdminLayout>
  );
}