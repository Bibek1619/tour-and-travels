import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllToursApi } from "@/api/tourApi";
import { updateTourApi } from "@/api/tourApi";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, Upload, X, ImageIcon } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { getAdminCardImage } from "@/utils/cloudinaryHelper";

const EditTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Fetch tour data
  const { data: toursData, isLoading, isError } = useQuery({
    queryKey: ["tour", id],
    queryFn: () => getAllToursApi({}),
  });

  // Find the specific tour by ID
  const tour = toursData?.data?.find((t) => t._id === id);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (formData) => updateTourApi(id, formData),
    onSuccess: () => {
      toast.success("Tour images updated successfully!");
      queryClient.invalidateQueries(["tour", id]);
      queryClient.invalidateQueries(["tours"]);
      setNewImages([]);
      setImagePreviews([]);
      navigate("/admin/dashboard/tours");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update tour");
    },
  });

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Create previews
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).slice(2),
    }));

    setNewImages((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeNewImage = (id) => {
    setImagePreviews((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter((i) => i.id !== id);
    });
    
    setNewImages((prev) => {
      const index = imagePreviews.findIndex((i) => i.id === id);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = () => {
    if (newImages.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    const formData = new FormData();
    
    // Add existing tour data (to prevent overwriting)
    formData.append("title", tour.title);
    formData.append("category", tour.category);
    
    // Add new images
    newImages.forEach((file) => {
      formData.append("images", file);
    });

    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading tour details...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (isError || !tour) {
    return (
      <AdminLayout>
        <div className="max-w-2xl mx-auto mt-12">
          <Card className="border-red-200">
            <CardContent className="p-12 text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tour Not Found</h2>
              <p className="text-gray-600 mb-6">
                The tour you're trying to edit doesn't exist or has been deleted.
              </p>
              <Button onClick={() => navigate("/admin/dashboard/tours")}>
                Back to Tours
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
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Edit Tour Images</h1>
            <p className="text-gray-600 mt-1">Replace images for: <strong>{tour.title}</strong></p>
          </div>

          <div className="space-y-6">
            {/* Current Images */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Images</h3>
                {tour.images && tour.images.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {tour.images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={getAdminCardImage(img)}
                          alt={`Current ${index + 1}`}
                          className="w-full h-40 object-cover rounded-lg border-2 border-gray-200"
                        />
                        {index === 0 && (
                          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                            Cover
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No images available</p>
                )}
              </CardContent>
            </Card>

            {/* Upload New Images */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload New Images</h3>
                <p className="text-sm text-gray-600 mb-4">
                  ⚠️ <strong>Note:</strong> New images will <strong>replace</strong> all existing images
                </p>

                {/* Upload Area */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all"
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-semibold text-gray-700 mb-2">
                    Click to upload images
                  </p>
                  <p className="text-sm text-gray-500">PNG, JPG or WEBP (Max 5MB per image)</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageSelect}
                  />
                </div>

                {/* New Images Preview */}
                {imagePreviews.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                      {imagePreviews.length} new image{imagePreviews.length !== 1 ? "s" : ""} selected
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {imagePreviews.map(({ id, preview, file }, index) => (
                        <div key={id} className="relative group">
                          <img
                            src={preview}
                            alt={file.name}
                            className="w-full h-32 object-cover rounded-lg border-2 border-green-500"
                          />
                          {index === 0 && (
                            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                              New Cover
                            </span>
                          )}
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

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/dashboard/tours")}
                disabled={updateMutation.isPending}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={newImages.length === 0 || updateMutation.isPending}
                className="flex-1 bg-orange-600 hover:bg-orange-700"
              >
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Update Images
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditTour;
