import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
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
import { getVehicleCardImage } from "@/utils/cloudinaryHelper";

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

  const vehicles = data?.vehicles || data?.data || [];

  console.log("ManageVehicles API Response:", data);
  console.log("Vehicles:", vehicles);

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Vehicles</h1>
            <p className="text-gray-600 mt-1">
              View, edit, and manage all vehicle rentals
            </p>
          </div>
          <Button
            onClick={() => navigate("/admin/dashboard/add-vehicle")}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Vehicle
          </Button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg" />
                <CardContent className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-8 bg-gray-200 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <Card className="border-red-200">
            <CardContent className="p-8 text-center">
              <Car className="w-16 h-16 text-red-300 mx-auto mb-4" />
              <p className="text-red-600 font-semibold mb-2">Failed to load vehicles</p>
              <p className="text-gray-500 text-sm">Please try refreshing the page</p>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!isLoading && !isError && vehicles.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Car className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No vehicles yet</h3>
              <p className="text-gray-600 mb-6">Get started by adding your first vehicle</p>
              <Button
                onClick={() => navigate("/admin/dashboard/add-vehicle")}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Vehicle
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Vehicles Grid */}
        {!isLoading && !isError && vehicles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <Card
                key={vehicle._id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Vehicle Image */}
                <div className="h-52 overflow-hidden relative bg-gray-200">
                  {vehicle.images?.length > 0 ? (
                    <img
                      src={getVehicleCardImage(vehicle.images[0])}
                      alt={vehicle.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Car className="w-16 h-16 text-gray-400" />
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 right-3">
                    <Badge
                      className={`${
                        vehicle.isAvailable
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      } text-white border-0`}
                    >
                      {vehicle.isAvailable ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                  {vehicle.category && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-white/90 text-gray-900 border border-gray-200 capitalize">
                        {vehicle.category}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Vehicle Content */}
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {vehicle.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {vehicle.brand} {vehicle.model}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                    <Fuel className="h-4 w-4 text-orange-600" />
                    <span className="capitalize">{vehicle.fuelType}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm mb-4 pb-4 border-b">
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <Users className="h-4 w-4 text-orange-600" />
                      {vehicle.capacity} seats
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <Package className="h-4 w-4 text-orange-600" />
                      {vehicle.luggage || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-orange-600">
                      Rs {vehicle.dailyRate}/day
                    </span>
                    {vehicle.availableCount > 0 && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {vehicle.availableCount} available
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        navigate(`/admin/dashboard/edit-vehicle/${vehicle._id}`)
                      }
                      className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDeleteConfirm(vehicle._id)}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full animate-in fade-in zoom-in duration-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  Delete Vehicle?
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  Are you sure you want to delete this vehicle? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1"
                    disabled={deleteMutation.isPending}
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
    </AdminLayout>
  );
};

export default ManageVehicles;
