import { connectDB } from "@/lib/db";
import { DailyRoute } from "@/models/dailyRoute";
import AdminLayout from "@/components/admin/admin-layout";
import RowActions from "@/components/admin/row-actions";
import Link from "next/link";
import type { DailyRoute as DailyRouteType } from "@/lib/types";

export const dynamic = "force-dynamic";

function formatDate(date: Date | string | undefined) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString();
}

export default async function AdminDailyRoutesPage() {
  await connectDB();
  const routes = JSON.parse(
    JSON.stringify(
      await DailyRoute.find().sort({ departureDate: 1 }).lean()
    )
  ) as DailyRouteType[];

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage Daily Routes
          </h1>
          <p className="text-gray-600">{routes.length} routes</p>
        </div>
        <Link
          href="/admin/daily-routes/new"
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
          Add Route
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">Route</th>
                <th className="px-6 py-3">Departure</th>
                <th className="px-6 py-3">Arrival</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Seats</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {routes.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
                    No daily routes found.
                  </td>
                </tr>
              )}
              {routes.map((route) => (
                <tr key={route._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {route.routeName}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {route.departure?.location} · {route.departure?.time}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {route.arrival?.location} · {route.arrival?.time}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatDate(route.departureDate)}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className="text-xs">
                      {route.availableSeats}/{route.totalSeats}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    ${route.price?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        route.status === "active"
                          ? "bg-green-50 text-green-700"
                          : route.status === "completed"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-red-50 text-red-700"
                      }`}
                    >
                      {route.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <RowActions
                      baseHref={`/admin/daily-routes/${route._id}`}
                      endpoint={`/api/daily-routes/${route._id}`}
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