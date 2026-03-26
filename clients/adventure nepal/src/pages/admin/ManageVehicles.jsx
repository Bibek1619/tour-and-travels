import { useState } from "react";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllVehiclesApi, deleteVehicleApi } from "@/api/VehicleApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Car,
  Users,
  DollarSign,
  Edit,
  Trash2,
  Plus,
  Fuel,
  Package,
} from "lucide-react";

const ManageVehicles = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getAllVehiclesApi,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteVehicleApi,
    onSuccess: () => {
      toast.success("Vehicle deleted successfully");
      queryClient.invalidateQueries(["vehicles"]);
      setDeleteConfirm(null);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete vehicle");
    },
  });

  const vehicles = data?.data || [];
  const BASE_URL = "http://localhost:5000";

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Vehicles</h1>
            <p className="text-gray-600 mt-1">
              View, edit, and manage all vehicle rentals
            </p>
          </div>
          <Button
            onClick={() => navigate("/admin/dashboard/add-vehicle")}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus size={16} className="mr-2" />
            Add New Vehicle
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200" />
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isError ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-red-600">Failed to load vehicles</p>
            </CardContent>
          </Card>
        ) : vehicles.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600 mb-4">No vehicles found</p>
              <Button
                onClick={() => navigate("/admin/dashboard/add-vehicle")}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus size={16} className="mr-2" />
                Add Your First Vehicle
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <Card
                key={vehicle._id || vehicle.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                <div className="h-48 overflow-hidden relative bg-gray-100">
                  {vehicle.images?.length > 0 && (
                    <img
                      src={`${BASE_URL}/images/${vehicle.images[0].split("/").pop()}`}
                      alt={vehicle.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <Badge
                    className={`absolute top-3 right-3 ${
                      vehicle.isAvailable
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {vehicle.isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Car className="h-4 w-4 text-green-600" />
                    <span className="capitalize">{vehicle.category}</span>
                    <span className="text-gray-400">•</span>
                    <Fuel className="h-4 w-4 text-green-600" />
                    <span className="capitalize">{vehicle.fuelType}</span>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {vehicle.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {vehicle.brand} {vehicle.model}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-green-600" />
                      {vehicle.capacity} seats
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="h-4 w-4 text-green-600" />
                      {vehicle.luggage || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-green-700">
                      Rs {vehicle.dailyRate}/day
                    </span>
                    {vehicle.availableCount && (
                      <span className="text-xs text-gray-500">
                        {vehicle.availableCount} available
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        navigate(`/admin/dashboard/edit-vehicle/${vehicle._id || vehicle.id}`)
                      }
                      className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDeleteConfirm(vehicle._id || vehicle.id)}
                      className="border-red-600 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Delete Vehicle?
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this vehicle? This action cannot
                  be undone.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => deleteMutation.mutate(deleteConfirm)}
                    disabled={deleteMutation.isPending}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    {deleteMutation.isPending ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageVehicles;
