import { connectDB } from "@/lib/db";
import { Booking } from "@/models/booking";
import AdminLayout from "@/components/admin/admin-layout";
import RowActions from "@/components/admin/row-actions";

interface BookingRow {
  _id: string;
  name: string;
  email: string;
  phone: string;
  packageName?: string;
  packageType?: string;
  numberOfPeople?: number;
  startDate?: Date | string;
  createdAt?: Date | string;
  status?: string;
}

export const dynamic = "force-dynamic";

function formatDate(date: Date | string | undefined) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString();
}

export default async function AdminBookingsPage() {
  await connectDB();
  const bookings = JSON.parse(
    JSON.stringify(await Booking.find().sort({ createdAt: -1 }).lean())
  ) as BookingRow[];

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage Booking Requests
          </h1>
          <p className="text-gray-600">{bookings.length} booking requests</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Contact</th>
                <th className="px-6 py-3">Package</th>
                <th className="px-6 py-3">People</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    No booking requests found.
                  </td>
                </tr>
              )}
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {booking.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div>{booking.phone}</div>
                    {booking.email && (
                      <div className="text-xs text-gray-500">{booking.email}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {booking.packageName || "—"}
                    {booking.packageType && (
                      <span className="ml-2 text-xs text-gray-400 uppercase">
                        {booking.packageType}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {booking.numberOfPeople ?? "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatDate(booking.startDate || booking.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        booking.status === "new"
                          ? "bg-blue-50 text-blue-700"
                          : booking.status === "contacted"
                            ? "bg-yellow-50 text-yellow-700"
                            : booking.status === "confirmed"
                              ? "bg-green-50 text-green-700"
                              : booking.status === "cancelled"
                                ? "bg-red-50 text-red-700"
                                : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <RowActions
                      baseHref={`/admin/bookings/${booking._id}`}
                      endpoint={`/api/bookings/${booking._id}`}
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