import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllDailyRoutesApi, deleteDailyRouteApi } from "@/api/dailyRouteApi";
import { getAllVehiclesApi } from "@/api/VehicleApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SeatManagementModal from "@/components/admin/SeatManagementModal";
import {
  Plus,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Trash2,
  Edit,
  Calendar,
  Bus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Armchair,
} from "lucide-react";

const ManageDailyRoutes = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [seatModalRoute, setSeatModalRoute] = useState(null);

  const { data: routesData, isLoading: routesLoading } = useQuery({
    queryKey: ["dailyRoutes"],
    queryFn: () => getAllDailyRoutesApi({}),
  });

  const { data: vehiclesData } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getAllVehiclesApi,
  });

  const routes = routesData?.data || [];
  const vehicles = vehiclesData?.data || [];

  const deleteMutation = useMutation({
    mutationFn: deleteDailyRouteApi,
    onSuccess: () => {
      toast.success("Route deleted successfully!");
      queryClient.invalidateQueries(["dailyRoutes"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete route");
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this route?")) {
      deleteMutation.mutate(id);
    }
  };

  const getVehicleName = (vehicleId) => {
    const vehicle = vehicles.find((v) => v._id === vehicleId);
    return vehicle?.name || "Unknown Vehicle";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "completed":
        return <AlertCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Daily Routes</h1>
            <p className="text-gray-600 mt-1">
              View and manage all vehicle routes and schedules
            </p>
          </div>
          <Button
            onClick={() => navigate("/admin/dashboard/add-daily-route")}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Daily Route
          </Button>
        </div>

        {/* Loading State */}
        {routesLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                    <div className="h-4 bg-gray-200 rounded w-4/6" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!routesLoading && routes.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="p-12 text-center">
              <Bus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Daily Routes Yet
              </h3>
              <p className="text-gray-500 mb-6">
                Get started by creating your first daily route schedule
              </p>
              <Button
                onClick={() => navigate("/admin/dashboard/add-daily-route")}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Route
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Routes Grid */}
        {!routesLoading && routes.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {routes.map((route) => (
              <Card
                key={route._id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {route.routeName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Bus className="w-4 h-4" />
                        <span>{getVehicleName(route.vehicle)}</span>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(route.status)} flex items-center gap-1`}>
                      {getStatusIcon(route.status)}
                      {route.status}
                    </Badge>
                  </div>

                  {/* Route Info */}
                  <div className="space-y-3 mb-4">
                    {/* Departure & Arrival */}
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="text-xs text-gray-500">From</p>
                          <p className="font-semibold text-sm">{route.departure.location}</p>
                          <p className="text-xs text-gray-600">{route.departure.time}</p>
                        </div>
                      </div>
                      <div className="text-gray-400">→</div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-600" />
                        <div>
                          <p className="text-xs text-gray-500">To</p>
                          <p className="font-semibold text-sm">{route.arrival.location}</p>
                          <p className="text-xs text-gray-600">{route.arrival.time}</p>
                        </div>
                      </div>
                    </div>

                    {/* Details Row */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="text-sm font-semibold">{formatDate(route.departureDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-purple-600" />
                        <div>
                          <p className="text-xs text-gray-500">Duration</p>
                          <p className="text-sm font-semibold">{route.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="text-xs text-gray-500">Price</p>
                          <p className="text-sm font-semibold">${route.price}</p>
                        </div>
                      </div>
                    </div>

                    {/* Seats */}
                    <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                      <Users className="w-4 h-4 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-600">Available Seats</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${(route.availableSeats / route.totalSeats) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900">
                            {route.availableSeats}/{route.totalSeats}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stops */}
                    {route.stops && route.stops.length > 0 && (
                      <div className="text-sm">
                        <p className="text-xs text-gray-500 mb-1">Stops:</p>
                        <p className="text-gray-700">{route.stops.join(" • ")}</p>
                      </div>
                    )}

                    {/* Amenities */}
                    {route.amenities && route.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {route.amenities.map((amenity, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Featured Badge */}
                    {route.featured && (
                      <Badge className="bg-yellow-100 text-yellow-700">
                        ⭐ Featured
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t">
                    <Button
                      onClick={() => setSeatModalRoute(route)}
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                      size="sm"
                    >
                      <Armchair className="w-4 h-4 mr-2" />
                      Manage Seats
                    </Button>
                    <Button
                      onClick={() => navigate(`/admin/dashboard/edit-daily-route/${route._id}`)}
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(route._id)}
                      variant="outline"
                      className="text-red-600 hover:bg-red-50 border-red-200"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Seat Management Modal */}
      <SeatManagementModal
        route={seatModalRoute}
        isOpen={!!seatModalRoute}
        onClose={() => setSeatModalRoute(null)}
      />
    </AdminLayout>
  );
};

export default ManageDailyRoutes;
