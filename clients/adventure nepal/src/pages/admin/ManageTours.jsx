import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllToursApi, deleteTourApi } from "@/api/tourApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  DollarSign,
  Edit,
  Trash2,
  Eye,
  Plus,
  Mountain,
} from "lucide-react";
import { getAdminCardImage } from "@/utils/cloudinaryHelper";

const ManageTours = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tours", "tour"],
    queryFn: () => getAllToursApi({ category: "tour" }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTourApi,
    onSuccess: () => {
      toast.success("Tour deleted successfully");
      queryClient.invalidateQueries(["tours"]);
      setDeleteConfirm(null);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete tour");
    },
  });

  const tours = data?.data || [];

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: "bg-green-100 text-green-700 border-green-300",
      moderate: "bg-yellow-100 text-yellow-700 border-yellow-300",
      hard: "bg-red-100 text-red-700 border-red-300",
      challenging: "bg-orange-100 text-orange-700 border-orange-300"
    };
    return colors[difficulty?.toLowerCase()] || "bg-gray-100 text-gray-700 border-gray-300";
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Tours</h1>
            <p className="text-gray-600 mt-1">
              View, edit, and manage tour packages (excluding treks)
            </p>
          </div>
          <Button
            onClick={() => navigate("/admin/dashboard/add-tour")}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Tour
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
              <Mountain className="w-16 h-16 text-red-300 mx-auto mb-4" />
              <p className="text-red-600 font-semibold mb-2">Failed to load tours</p>
              <p className="text-gray-500 text-sm">Please try refreshing the page</p>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!isLoading && !isError && tours.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Mountain className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No tours yet</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first tour package</p>
              <Button
                onClick={() => navigate("/admin/dashboard/add-tour")}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Tour
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Tours Grid */}
        {!isLoading && !isError && tours.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <Card
                key={tour._id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Tour Image */}
                <div className="h-52 overflow-hidden relative bg-gray-200">
                  {tour.images?.length > 0 ? (
                    <img
                      src={getAdminCardImage(tour.images[0])}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Mountain className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className={`${getDifficultyColor(tour.difficulty)} border`}>
                      {tour.difficulty}
                    </Badge>
                    {tour.category && (
                      <Badge className="bg-white/90 text-gray-900 border border-gray-200">
                        {tour.category}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Tour Content */}
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 text-orange-600" />
                    <span className="truncate">{tour.location || "Nepal"}</span>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
                    {tour.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm mb-4 pb-4 border-b">
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <Clock className="h-4 w-4 text-orange-600" />
                      {tour.durationDays} days
                    </span>
                    <span className="flex items-center gap-1 font-bold text-orange-600">
                      <DollarSign className="h-4 w-4" />
                      {tour.price}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/tours/${tour.slug}`)}
                      className="flex-1 hover:bg-gray-50"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/admin/dashboard/edit-tour/${tour._id}`)}
                      className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDeleteConfirm(tour._id)}
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
                  Delete Tour?
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  Are you sure you want to delete this tour? This action cannot be undone.
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

export default ManageTours;
