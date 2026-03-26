import AdminNavbar from "@/components/admin/AdminNavbar";
import RecentBookings from "@/components/admin/RecentBookings";
import { Card, CardContent } from "@/components/ui/card";
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
  Activity,
} from "lucide-react";

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
      value: `Rs ${stats.totalRevenue?.toLocaleString() || "0"}`,
      icon: DollarSign,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings || 0,
      icon: Calendar,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      subtitle: `${stats.pendingBookings || 0} pending`,
    },
    {
      title: "Active Tours",
      value: stats.totalTours || 0,
      icon: MapPin,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
    {
      title: "Vehicles",
      value: stats.totalVehicles || 0,
      icon: Car,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back 👋
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your business today
          </p>
        </div>

        {/* Stats Grid */}
        {statsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-20 bg-gray-200 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <Card
                key={index}
                className="border-2 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        {stat.title}
                      </p>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </h3>
                      {stat.subtitle && (
                        <p className="text-xs text-gray-500">{stat.subtitle}</p>
                      )}
                    </div>
                    <div
                      className={`${stat.bgColor} p-3 rounded-xl`}
                    >
                      <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <Card className="mb-8 border-2">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <QuickActionCard
                icon={Package}
                title="Manage Tours"
                description="View and edit tour packages"
                link="/admin/dashboard/tours"
              />
              <QuickActionCard
                icon={Car}
                title="Manage Vehicles"
                description="View and edit vehicle rentals"
                link="/admin/dashboard/vehicles"
              />
              <QuickActionCard
                icon={Users}
                title="View Bookings"
                description="Manage customer bookings"
                link="/admin/dashboard/bookings"
              />
            </div>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <RecentBookings />
      </div>
    </div>
  );
};

// Quick Action Card Component
const QuickActionCard = ({ icon: Icon, title, description, link }) => {
  return (
    <a
      href={link}
      className="flex items-start gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-green-300 hover:bg-green-50/50 transition-all duration-200 group"
    >
      <div className="p-2 rounded-lg bg-green-100 group-hover:bg-green-200 transition-colors">
        <Icon className="h-5 w-5 text-green-700" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </a>
  );
};

export default AdminDashboard;
