import AdminLayout from "@/components/admin/AdminLayout";
import RecentBookings from "@/components/admin/RecentBookings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStatsApi } from "@/api/statsApi";
import { getAllToursApi } from "@/api/tourApi";
import { getAllVehiclesApi } from "@/api/VehicleApi";
import { getAllBookingsApi } from "@/api/bookingApi";
import {
  TrendingUp,
  Users,
  MapPin,
  Car,
  DollarSign,
  Calendar,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  // Fetch dashboard stats
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStatsApi,
  });

  // Fallback: fetch individual data if stats API not available
  const { data: toursData } = useQuery({
    queryKey: ["tours"],
    queryFn: getAllToursApi,
    enabled: !statsData,
  });

  const { data: vehiclesData } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getAllVehiclesApi,
    enabled: !statsData,
  });

  const { data: bookingsData } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookingsApi,
    enabled: !statsData,
  });

  // Calculate stats from individual APIs if stats API not available
  const stats = statsData?.data || {
    totalTours: toursData?.data?.length || 0,
    totalVehicles: vehiclesData?.data?.length || 0,
    totalBookings: bookingsData?.data?.length || 0,
    totalRevenue: bookingsData?.data?.reduce((sum, b) => sum + (b.totalPrice || 0), 0) || 0,
    pendingBookings: bookingsData?.data?.filter((b) => b.status === "pending").length || 0,
    confirmedBookings: bookingsData?.data?.filter((b) => b.status === "confirmed").length || 0,
  };

  const statCards = [
    {
      title: "Total Revenue",
      value: `NPR ${stats.totalRevenue?.toLocaleString() || "0"}`,
      change: "+12.5%",
      changeType: "increase",
      icon: DollarSign,
      iconBg: "bg-emerald-500",
      description: "from last month",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings || 0,
      change: `${stats.pendingBookings || 0} pending`,
      changeType: "neutral",
      icon: Calendar,
      iconBg: "bg-blue-500",
      description: "active bookings",
    },
    {
      title: "Tour Packages",
      value: stats.totalTours || 0,
      change: "+3 new",
      changeType: "increase",
      icon: MapPin,
      iconBg: "bg-violet-500",
      description: "total packages",
    },
    {
      title: "Vehicles",
      value: stats.totalVehicles || 0,
      change: "All active",
      changeType: "neutral",
      icon: Car,
      iconBg: "bg-orange-500",
      description: "in fleet",
    },
  ];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's an overview of your business
        </p>
      </div>

      {/* Stats Grid */}
      {statsLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-24 bg-gray-200 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.iconBg} p-2.5 rounded-lg`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  {stat.changeType === "increase" && (
                    <Badge variant="outline" className="text-green-700 bg-green-50 border-green-200">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {stat.change}
                    </Badge>
                  )}
                  {stat.changeType === "neutral" && (
                    <Badge variant="outline" className="text-gray-700 bg-gray-50">
                      {stat.change}
                    </Badge>
                  )}
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-orange-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <QuickActionCard
              icon={Package}
              title="Add New Tour"
              link="/admin/dashboard/add-tour"
              color="blue"
            />
            <QuickActionCard
              icon={Car}
              title="Add Vehicle"
              link="/admin/dashboard/add-vehicle"
              color="orange"
            />
            <QuickActionCard
              icon={Calendar}
              title="View Bookings"
              link="/admin/dashboard/bookings"
              color="green"
            />
            <QuickActionCard
              icon={MapPin}
              title="Manage Tours"
              link="/admin/dashboard/tours"
              color="violet"
            />
          </CardContent>
        </Card>

        {/* Recent Activity Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Confirmed Bookings</p>
                    <p className="text-sm text-gray-500">This month</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {stats.confirmedBookings || 0}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Pending Reviews</p>
                    <p className="text-sm text-gray-500">Awaiting confirmation</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {stats.pendingBookings || 0}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Active Customers</p>
                    <p className="text-sm text-gray-500">Total registered</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-gray-900">156</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <RecentBookings />
    </AdminLayout>
  );
};

// Quick Action Card Component
const QuickActionCard = ({ icon: Icon, title, link, color }) => {
  const colorClasses = {
    blue: "bg-blue-50 hover:bg-blue-100 text-blue-700",
    orange: "bg-orange-50 hover:bg-orange-100 text-orange-700",
    green: "bg-green-50 hover:bg-green-100 text-green-700",
    violet: "bg-violet-50 hover:bg-violet-100 text-violet-700",
  };

  return (
    <a
      href={link}
      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${colorClasses[color]}`}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{title}</span>
      <ArrowUpRight className="h-4 w-4 ml-auto" />
    </a>
  );
};

export default AdminDashboard;
