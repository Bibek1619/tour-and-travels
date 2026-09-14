import { connectDB } from "@/lib/db";
import { Enquiry } from "@/models/enquiry";
import AdminLayout from "@/components/admin/admin-layout";
import RowActions from "@/components/admin/row-actions";

interface EnquiryRow {
  _id: string;
  name: string;
  email: string;
  packageName?: string;
  numberOfPeople?: number;
  createdAt?: Date | string;
  status?: string;
}

export const dynamic = "force-dynamic";

function formatDate(date: Date | string | undefined) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString();
}

export default async function AdminEnquiriesPage() {
  await connectDB();
  const enquiries = JSON.parse(
    JSON.stringify(await Enquiry.find().sort({ createdAt: -1 }).lean())
  ) as EnquiryRow[];

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage Enquiries
          </h1>
          <p className="text-gray-600">{enquiries.length} enquiries</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Package</th>
                <th className="px-6 py-3">People</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {enquiries.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    No enquiries found.
                  </td>
                </tr>
              )}
              {enquiries.map((enquiry) => (
                <tr key={enquiry._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {enquiry.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{enquiry.email}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {enquiry.packageName || "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {enquiry.numberOfPeople ?? "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatDate(enquiry.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        enquiry.status === "new"
                          ? "bg-blue-50 text-blue-700"
                          : enquiry.status === "contacted"
                            ? "bg-yellow-50 text-yellow-700"
                            : enquiry.status === "converted"
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700"
                      }`}
                    >
                      {enquiry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <RowActions
                      baseHref={`/admin/enquiries/${enquiry._id}`}
                      endpoint={`/api/enquiries/${enquiry._id}`}
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