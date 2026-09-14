import Link from "next/link";
import { connectDB } from "@/lib/db";
import { CustomTrip } from "@/models/customTrip";
import AdminLayout from "@/components/admin/admin-layout";
import RowActions from "@/components/admin/row-actions";

interface CustomTripRow {
  _id: string;
  tripType?: string;
  customTripType?: string;
  place?: string;
  email?: string;
  phone?: string;
  numberOfPeople?: number;
  createdAt?: Date | string;
  status?: string;
}

export const dynamic = "force-dynamic";

const TRIP_TYPE_LABELS: Record<string, string> = {
  trek: "Trek",
  tour: "Tour",
  other: "Other",
};

function formatDate(date: Date | string | undefined) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString();
}

function tripTypeLabel(row: CustomTripRow) {
  if (row.tripType === "other" && row.customTripType) return row.customTripType;
  return TRIP_TYPE_LABELS[row.tripType ?? ""] || row.tripType || "—";
}

export default async function AdminCustomTripsPage() {
  await connectDB();
  const trips = JSON.parse(
    JSON.stringify(await CustomTrip.find().sort({ createdAt: -1 }).lean())
  ) as CustomTripRow[];

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage Customized Trips
          </h1>
          <p className="text-gray-600">{trips.length} trip plans</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">Trip Type</th>
                <th className="px-6 py-3">Place</th>
                <th className="px-6 py-3">Contact</th>
                <th className="px-6 py-3">People</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {trips.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    No trip plans found.
                  </td>
                </tr>
              )}
              {trips.map((trip) => (
                <tr key={trip._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                          trip.tripType === "trek"
                            ? "bg-green-50 text-green-700"
                            : trip.tripType === "tour"
                              ? "bg-orange-50 text-orange-700"
                              : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {tripTypeLabel(trip)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {trip.place || "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <p>{trip.email || "—"}</p>
                    <p className="text-xs text-gray-400">{trip.phone || ""}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {trip.numberOfPeople ?? "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatDate(trip.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        trip.status === "new"
                          ? "bg-blue-50 text-blue-700"
                          : trip.status === "contacted"
                            ? "bg-yellow-50 text-yellow-700"
                            : trip.status === "converted"
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700"
                      }`}
                    >
                      {trip.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <RowActions
                      baseHref={`/admin/custom-trips/${trip._id}`}
                      endpoint={`/api/custom-trips/${trip._id}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6">
        <Link
          href="/admin"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to dashboard
        </Link>
      </div>
    </AdminLayout>
  );
}