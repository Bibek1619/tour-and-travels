import AdminNavbar from "@/components/admin/AdminNavbar";
import RecentBookings from "@/components/admin/RecentBookings";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <AdminNavbar />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome back 👋
        </h2>

        {/* Recent bookings */}
        <RecentBookings />
      </div>
    </div>
  );
};

export default AdminDashboard;
