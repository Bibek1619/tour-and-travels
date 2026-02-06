import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left */}
        <h1 className="text-xl font-bold text-green-600 ">
          Admin Dashboard
        </h1>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate("/admin/add-tour")}
            className="bg-green-500 hover:bg-green-600"
          >
            <Plus size={16} className="mr-1" />
            Add Tour
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/admin/add-vehicle")}
          >
            <Plus size={16} className="mr-1" />
            Add Vehicle Rent
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
