import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createDailyRouteApi } from "@/api/dailyRouteApi";
import { getAllVehiclesApi } from "@/api/VehicleApi";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  Users,
  Bus,
  ListChecks,
  FileText,
} from "lucide-react";

const AddDailyRoute = () => {
  const navigate = useNavigate();

  const { data: vehiclesData } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getAllVehiclesApi,
  });

  const vehicles = vehiclesData?.data || [];

  const [formData, setFormData] = useState({
    routeName: "",
    vehicle: "",
    departureLocation: "",
    departureTime: "",
    arrivalLocation: "",
    arrivalTime: "",
    departureDate: "",
    returnDate: "",
    duration: "",
    price: "",
    availableSeats: "",
    totalSeats: "",
    stops: [""],
    amenities: [""],
    description: "",
    status: "active",
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (index, value, type) => {
    setFormData((prev) => {
      const updated = [...prev[type]];
      updated[index] = value;
      return { ...prev, [type]: updated };
    });
  };

  const addArrayField = (type) => {
    setFormData((prev) => ({ ...prev, [type]: [...prev[type], ""] }));
  };

  const removeArrayField = (index, type) => {
    setFormData((prev) => {
      const updated = [...prev[type]];
      updated.splice(index, 1);
      return { ...prev, [type]: updated };
    });
  };

  const createRouteMutation = useMutation({
    mutationFn: (data) => createDailyRouteApi(data),
    onSuccess: () => {
      toast.success("Route created successfully!");
      navigate("/admin/dashboard/daily-routes");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create route");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.routeName || !formData.vehicle || !formData.departureLocation ||
        !formData.arrivalLocation || !formData.departureDate || !formData.duration ||
        !formData.price || !formData.totalSeats) {
      toast.error("Please fill all required fields");
      return;
    }

    const data = {
      routeName: formData.routeName,
      vehicle: formData.vehicle,
      departure: {
        location: formData.departureLocation,
        time: formData.departureTime,
      },
      arrival: {
        location: formData.arrivalLocation,
        time: formData.arrivalTime,
      },
      departureDate: formData.departureDate,
      returnDate: formData.returnDate || undefined,
      duration: formData.duration,
      price: parseFloat(formData.price),
      availableSeats: parseInt(formData.availableSeats) || parseInt(formData.totalSeats),
      totalSeats: parseInt(formData.totalSeats),
      stops: formData.stops.filter(Boolean),
      amenities: formData.amenities.filter(Boolean),
      description: formData.description,
      status: formData.status,
      featured: formData.featured,
    };

    createRouteMutation.mutate(data);
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Add Daily Route</h1>
            <p className="text-gray-600 mt-1">Create a new vehicle route schedule</p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardContent className="p-8 space-y-8">
                {/* Basic Info */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Bus className="w-5 h-5" />
                    Basic Information
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Route Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="routeName"
                        value={formData.routeName}
                        onChange={handleChange}
                        placeholder="e.g., Kathmandu to Pokhara Express"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Vehicle <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="vehicle"
                        value={formData.vehicle}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select a vehicle</option>
                        {vehicles.map((vehicle) => (
                          <option key={vehicle._id} value={vehicle._id}>
                            {vehicle.name} - {vehicle.type} ({vehicle.seats} seats)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleChange}
                        className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                      />
                      <label className="text-sm font-semibold text-gray-700">
                        Mark as Featured
                      </label>
                    </div>
                  </div>
                </div>

                {/* Route Details */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Route Details
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Departure Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="departureLocation"
                        value={formData.departureLocation}
                        onChange={handleChange}
                        placeholder="e.g., Kathmandu"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Departure Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        name="departureTime"
                        value={formData.departureTime}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Arrival Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="arrivalLocation"
                        value={formData.arrivalLocation}
                        onChange={handleChange}
                        placeholder="e.g., Pokhara"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Arrival Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        name="arrivalTime"
                        value={formData.arrivalTime}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Schedule & Pricing */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Schedule & Pricing
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Departure Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Return Date (Optional)
                      </label>
                      <input
                        type="date"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Duration <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="e.g., 6-7 hours"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Price (USD) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="50"
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Total Seats <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="totalSeats"
                        value={formData.totalSeats}
                        onChange={handleChange}
                        placeholder="40"
                        min="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Available Seats (Optional)
                      </label>
                      <input
                        type="number"
                        name="availableSeats"
                        value={formData.availableSeats}
                        onChange={handleChange}
                        placeholder="Leave empty to match total seats"
                        min="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Stops */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Route Stops
                    </h2>
                    <Button
                      type="button"
                      onClick={() => addArrayField("stops")}
                      variant="outline"
                      size="sm"
                    >
                      Add Stop
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {formData.stops.map((stop, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          type="text"
                          value={stop}
                          onChange={(e) =>
                            handleArrayChange(index, e.target.value, "stops")
                          }
                          placeholder="e.g., Malekhu"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        {formData.stops.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayField(index, "stops")}
                            className="w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <ListChecks className="w-5 h-5" />
                      Amenities
                    </h2>
                    <Button
                      type="button"
                      onClick={() => addArrayField("amenities")}
                      variant="outline"
                      size="sm"
                    >
                      Add Amenity
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {formData.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          type="text"
                          value={amenity}
                          onChange={(e) =>
                            handleArrayChange(index, e.target.value, "amenities")
                          }
                          placeholder="e.g., WiFi, AC, Refreshments"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        {formData.amenities.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayField(index, "amenities")}
                            className="w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Description
                  </h2>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Optional: Add additional information about this route..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 mt-8">
              <Button
                type="button"
                onClick={() => navigate("/admin/dashboard/daily-routes")}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createRouteMutation.isPending}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              >
                {createRouteMutation.isPending ? "Creating..." : "Create Route"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddDailyRoute;
