import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllEnquiriesApi,
  updateEnquiryApi,
  deleteEnquiryApi,
} from "@/api/enquiryApi";
import toast from "react-hot-toast";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  MessageSquare,
  Trash2,
  Inbox,
  Clock,
} from "lucide-react";

const STATUS_OPTIONS = [
  { value: "new", label: "New", color: "bg-blue-100 text-blue-700" },
  { value: "contacted", label: "Contacted", color: "bg-yellow-100 text-yellow-700" },
  { value: "converted", label: "Converted", color: "bg-green-100 text-green-700" },
  { value: "closed", label: "Closed", color: "bg-gray-100 text-gray-600" },
];

const formatDate = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const ManageEnquiries = () => {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["enquiries", statusFilter],
    queryFn: () => getAllEnquiriesApi(statusFilter ? { status: statusFilter } : {}),
  });

  const enquiries = data?.data || [];

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => updateEnquiryApi(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      toast.success("Status updated");
    },
    onError: () => toast.error("Failed to update status"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteEnquiryApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      toast.success("Enquiry deleted");
    },
    onError: () => toast.error("Failed to delete enquiry"),
  });

  const handleDelete = (id) => {
    if (window.confirm("Delete this enquiry?")) {
      deleteMutation.mutate(id);
    }
  };

  const getStatusStyle = (status) =>
    STATUS_OPTIONS.find((s) => s.value === status)?.color ||
    "bg-gray-100 text-gray-600";

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Inbox className="h-7 w-7 text-orange-600" />
            Enquiries
          </h1>
          <p className="text-gray-600">
            Customer booking enquiries from tour and package pages
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter("")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === ""
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-700 border hover:bg-gray-50"
            }`}
          >
            All
          </button>
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s.value}
              onClick={() => setStatusFilter(s.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === s.value
                  ? "bg-orange-600 text-white"
                  : "bg-white text-gray-700 border hover:bg-gray-50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border shadow-sm p-6 animate-pulse">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-5 bg-gray-200 rounded w-32" />
                    <div className="h-5 bg-gray-200 rounded w-16" />
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-48" />
                  <div className="h-3 bg-gray-200 rounded w-36" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 bg-gray-200 rounded w-24" />
                  <div className="h-8 bg-gray-200 rounded w-8" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!isLoading && enquiries.length === 0 && (
        <div className="bg-white rounded-xl border p-16 text-center">
          <Inbox className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            No enquiries yet
          </h3>
          <p className="text-gray-500">
            New customer enquiries will appear here.
          </p>
        </div>
      )}

      {/* Enquiries List */}
      {!isLoading && enquiries.length > 0 && (
        <div className="grid gap-5">
          {enquiries.map((enq) => (
            <div
              key={enq._id}
              className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow p-6"
            >
              {/* Top row */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">{enq.name}</h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusStyle(
                        enq.status
                      )}`}
                    >
                      {enq.status}
                    </span>
                  </div>
                  {enq.packageName && (
                    <p className="text-sm text-orange-600 font-medium">
                      {enq.packageName}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3" />
                    Received {formatDate(enq.createdAt)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <select
                    value={enq.status}
                    onChange={(e) =>
                      updateMutation.mutate({ id: enq._id, status: e.target.value })
                    }
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleDelete(enq._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                <a
                  href={`mailto:${enq.email}`}
                  className="flex items-center gap-2 text-gray-700 hover:text-orange-600"
                >
                  <Mail className="h-4 w-4 text-gray-400" />
                  {enq.email}
                </a>
                {enq.phone && (
                  <a
                    href={`tel:${enq.phone}`}
                    className="flex items-center gap-2 text-gray-700 hover:text-orange-600"
                  >
                    <Phone className="h-4 w-4 text-gray-400" />
                    {enq.phone}
                  </a>
                )}
                {enq.location && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    {enq.location}
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="h-4 w-4 text-gray-400" />
                  {enq.numberOfPeople || 1} people
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {formatDate(enq.startDate)} → {formatDate(enq.endDate)}
                </div>
              </div>

              {/* Comment */}
              {enq.comment && (
                <div className="mt-4 bg-gray-50 rounded-lg p-3 flex gap-2">
                  <MessageSquare className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">{enq.comment}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageEnquiries;
