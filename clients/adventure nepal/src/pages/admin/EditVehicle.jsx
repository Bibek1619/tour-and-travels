import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getVehicleByIdApi, updateVehicleApi } from "@/api/VehicleApi";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, AlertCircle, Upload, X, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getVehicleCardImage } from "@/utils/cloudinaryHelper";

const EditVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    category: "",
    fuelType: "",
    brand: "",
    model: "",
    name: "",
    dailyRate: "",
    capacity: "",
    luggage: "",
    features: "",
    bestFor: "",
    availableCount: "",
    isAvailable: true,
  });

  const [existingImages, setExistingImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const {
    data: vehicleData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => getVehicleByIdApi(id),
  });

  const vehicle = vehicleData?.vehicle;

  useEffect(() => {
    if (vehicle) {
      setFormData({
        category: vehicle.category || "",
        fuelType: vehicle.fuelType || "",
        brand: vehicle.brand || "",
        model: vehicle.model || "",
        name: vehicle.name || "",
        dailyRate: vehicle.dailyRate || "",
        capacity: vehicle.capacity || "",
        luggage: vehicle.luggage || "",
        features: vehicle.features?.join(", ") || "",
        bestFor: vehicle.bestFor || "",
        availableCount: vehicle.availableCount ?? "",
        isAvailable: vehicle.isAvailable ?? true,
      });
      setExistingImages(vehicle.images || []);
    }
  }, [vehicle]);

  const updateMutation = useMutation({
    mutationFn: (formData) => updateVehicleApi(id, formData),
    onSuccess: () => {
      toast.success("Vehicle updated successfully!");
      queryClient.invalidateQueries(["vehicle", id]);
      queryClient.invalidateQueries(["vehicles"]);
      navigate("/admin/dashboard/vehicles");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update vehicle");
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).slice(2),
    }));

    setNewImages((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeNewImage = (imgId) => {
    setImagePreviews((prev) => {
      const img = prev.find((i) => i.id === imgId);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter((i) => i.id !== imgId);
    });
    setNewImages((prev) => {
      const index = imagePreviews.findIndex((i) => i.id === imgId);
      return prev.filter((_, i) => i !== index);
    });
  };

  const removeExistingImage = (index) => {
    const img = existingImages[index];
    setRemovedImages((prev) => [...prev, img]);
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const restoreImage = (index) => {
    const img = removedImages[index];
    setExistingImages((prev) => [...prev, img]);
    setRemovedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalImages = existingImages.length + newImages.length;
    if (totalImages === 0) {
      toast.error("Please keep at least one image or upload new ones");
      return;
    }

    const form = new FormData();
    form.append("category", formData.category);
    form.append("fuelType", formData.fuelType);
    form.append("brand", formData.brand);
    form.append("model", formData.model);
    form.append("name", formData.name);
    form.append("dailyRate", formData.dailyRate);
    form.append("capacity", formData.capacity);
    form.append("luggage", formData.luggage);
    form.append("bestFor", formData.bestFor);
    form.append("availableCount", formData.availableCount);
    form.append("isAvailable", formData.isAvailable);

    formData.features
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean)
      .forEach((f) => form.append("features", f));

    form.append("existingImages", JSON.stringify(existingImages));

    newImages.forEach((file) => form.append("images", file));

    updateMutation.mutate(form);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading vehicle details...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (isError || !vehicle) {
    return (
      <AdminLayout>
        <div className="max-w-2xl mx-auto mt-12">
          <Card className="border-red-200">
            <CardContent className="p-12 text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Vehicle Not Found
              </h2>
              <p className="text-gray-600 mb-6">
                The vehicle you're trying to edit doesn't exist or has been
                deleted.
              </p>
              <Button onClick={() => navigate("/admin/dashboard/vehicles")}>
                Back to Vehicles
              </Button>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Edit Vehicle</h1>
            <p className="text-gray-600 mt-1">
              Update details for: <strong>{vehicle.name}</strong>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Images */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Current Images
                </h3>
                {existingImages.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {existingImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={getVehicleCardImage(img)}
                          alt={`Current ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                        />
                        {index === 0 && (
                          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                            Cover
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No images remaining
                  </p>
                )}

                {removedImages.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Removed images (click to restore):
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {removedImages.map((img, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => restoreImage(index)}
                          className="relative opacity-50 hover:opacity-100 transition-opacity"
                        >
                          <img
                            src={getVehicleCardImage(img)}
                            alt="Removed"
                            className="w-20 h-16 object-cover rounded border border-red-300"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upload New Images */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Upload New Images
                </h3>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all"
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-semibold text-gray-700 mb-2">
                    Click to upload additional images
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG or WEBP (Max 5MB per image)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageSelect}
                  />
                </div>

                {imagePreviews.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                      {imagePreviews.length} new image
                      {imagePreviews.length !== 1 ? "s" : ""} selected
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {imagePreviews.map(({ id, preview, file }, index) => (
                        <div key={id} className="relative group">
                          <img
                            src={preview}
                            alt={file.name}
                            className="w-full h-32 object-cover rounded-lg border-2 border-green-500"
                          />
                          <button
                            type="button"
                            onClick={() => removeNewImage(id)}
                            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Vehicle Details */}
            <Card>
              <CardContent className="p-6 space-y-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Vehicle Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full border rounded-md h-10 px-3"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="car">Car</option>
                      <option value="bike">Bike</option>
                      <option value="jeep">Jeep</option>
                      <option value="van">Van</option>
                      <option value="bus">Bus</option>
                    </select>
                  </div>
                  <div>
                    <Label>Fuel Type</Label>
                    <select
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleChange}
                      className="w-full border rounded-md h-10 px-3"
                      required
                    >
                      <option value="">Select fuel</option>
                      <option value="petrol">Petrol</option>
                      <option value="diesel">Diesel</option>
                      <option value="electric">Electric</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Brand</Label>
                    <Input
                      name="brand"
                      placeholder="Honda, Bajaj..."
                      value={formData.brand}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Model</Label>
                    <Input
                      name="model"
                      placeholder="Bullet 350"
                      value={formData.model}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label>Vehicle Name</Label>
                  <Input
                    name="name"
                    placeholder="Royal Enfield Bullet 350"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Daily Rate (Rs)</Label>
                    <Input
                      type="number"
                      name="dailyRate"
                      value={formData.dailyRate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Passenger Capacity</Label>
                    <Input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Luggage</Label>
                    <Input
                      name="luggage"
                      placeholder="3 bags"
                      value={formData.luggage}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label>Best For</Label>
                    <Input
                      name="bestFor"
                      placeholder="Family travel"
                      value={formData.bestFor}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <Label>Features (comma separated)</Label>
                  <Input
                    name="features"
                    placeholder="AC, GPS, Airbags"
                    value={formData.features}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Available Count</Label>
                  <Input
                    type="number"
                    name="availableCount"
                    value={formData.availableCount}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleChange}
                  />
                  <Label>Available for booking</Label>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/dashboard/vehicles")}
                disabled={updateMutation.isPending}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={updateMutation.isPending}
                className="flex-1 bg-orange-600 hover:bg-orange-700"
              >
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Vehicle"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditVehicle;
