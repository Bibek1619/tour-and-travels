import { Button } from "@/components/ui/button";
import { Plus, LayoutDashboard, LogOut, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full bg-white border-b-2 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left - Logo/Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-all">
                <LayoutDashboard className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  Admin Panel
                </h1>
                <p className="text-xs text-gray-500">Adventure Nepal</p>
              </div>
            </button>
          </div>

          {/* Right - Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={() => navigate("/admin/dashboard/add-tour")}
              className={`bg-green-600 hover:bg-green-700 shadow-md ${
                isActive("/admin/dashboard/add-tour") ? "ring-2 ring-green-300" : ""
              }`}
            >
              <Plus size={16} className="mr-1" />
              Add Tour
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/admin/dashboard/add-vehicle")}
              className={`border-green-600 text-green-600 hover:bg-green-50 ${
                isActive("/admin/dashboard/add-vehicle") ? "bg-green-50" : ""
              }`}
            >
              <Plus size={16} className="mr-1" />
              Add Vehicle
            </Button>

            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut size={16} className="mr-1" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t space-y-2">
            <Button
              onClick={() => {
                navigate("/admin/dashboard/add-tour");
                setMobileMenuOpen(false);
              }}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <Plus size={16} className="mr-1" />
              Add Tour
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                navigate("/admin/dashboard/add-vehicle");
                setMobileMenuOpen(false);
              }}
              className="w-full border-green-600 text-green-600 hover:bg-green-50"
            >
              <Plus size={16} className="mr-1" />
              Add Vehicle
            </Button>

            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut size={16} className="mr-1" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
