import { connectDB } from "@/lib/db";
import { TourPackage } from "@/models/tourPackage";
import { Vehicle } from "@/models/vehicle";
import { Adventure } from "@/models/adventure";
import { Enquiry } from "@/models/enquiry";
import { Review } from "@/models/review";
import AdminLayout from "@/components/admin/admin-layout";
import {
  DollarSign,
  Calendar,
  MapPin,
  Car,
  TrendingUp,
  Activity,
  Users,
  ArrowUpRight,
  Inbox,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await connectDB();

  const [
    totalTours,
    totalTreks,
    totalVehicles,
    totalAdventures,
    totalEnquiries,
    newEnquiries,
    totalReviews,
    pendingReviews,
  ] = await Promise.all([
    TourPackage.countDocuments({ category: "tour" }),
    TourPackage.countDocuments({ category: "trek" }),
    Vehicle.countDocuments(),
    Adventure.countDocuments(),
    Enquiry.countDocuments(),
    Enquiry.countDocuments({ status: "new" }),
    Review.countDocuments(),
    Review.countDocuments({ status: "pending" }),
  ]);

  const statCards = [
    {
      title: "Total Packages",
      value: totalTours + totalTreks,
      change: "active",
      icon: Calendar,
      iconBg: "bg-blue-500",
      description: "tour & trek packages",
    },
    {
      title: "Tour Packages",
      value: totalTours,
      change: `${totalTreks} treks`,
      icon: MapPin,
      iconBg: "bg-violet-500",
      description: "total packages",
    },
    {
      title: "Vehicles",
      value: totalVehicles,
      change: "All active",
      icon: Car,
      iconBg: "bg-orange-500",
      description: "in fleet",
    },
    {
      title: "Enquiries",
      value: totalEnquiries,
      change: `${newEnquiries} new`,
      icon: Inbox,
      iconBg: "bg-emerald-500",
      description: "new enquiries",
    },
  ];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here&apos;s an overview of your business
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.iconBg} p-2.5 rounded-lg`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 border border-green-200 rounded-full px-2.5 py-1 text-xs font-medium">
                  <ArrowUpRight className="h-3 w-3" />
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        {/* Quick Summary */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200">
          <div className="border-b px-6 py-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Activity className="h-5 w-5 text-orange-600" />
              Quick Summary
            </h2>
          </div>
          <div className="space-y-4 p-6">
            <SummaryRow
              icon={MapPin}
              iconBg="bg-violet-100 text-violet-600"
              label="Adventure Packages"
              value={totalAdventures}
            />
            <SummaryRow
              icon={Users}
              iconBg="bg-blue-100 text-blue-600"
              label="Reviews"
              value={totalReviews}
            />
            <SummaryRow
              icon={TrendingUp}
              iconBg="bg-yellow-100 text-yellow-600"
              label="Pending Reviews"
              value={pendingReviews}
            />
          </div>
        </div>

        {/* Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
          <div className="border-b px-6 py-5">
            <h2 className="text-lg font-semibold">Overview</h2>
          </div>
          <div className="space-y-4 p-6">
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Total Packages</p>
                  <p className="text-sm text-gray-500">
                    Tours + treks combined
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {totalTours + totalTreks}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Pending Reviews</p>
                  <p className="text-sm text-gray-500">
                    Awaiting confirmation
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {pendingReviews}
              </span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">New Enquiries</p>
                  <p className="text-sm text-gray-500">Needs attention</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {newEnquiries}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function SummaryRow({
  icon: Icon,
  iconBg,
  label,
  value,
}: {
  icon: typeof MapPin;
  iconBg: string;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <div className="flex items-center gap-3">
        <div
          className={`h-9 w-9 rounded-full ${iconBg} flex items-center justify-center`}
        >
          <Icon className="h-4 w-4" />
        </div>
        <p className="font-medium text-gray-900">{label}</p>
      </div>
      <span className="text-lg font-bold text-gray-900">{value}</span>
    </div>
  );
}