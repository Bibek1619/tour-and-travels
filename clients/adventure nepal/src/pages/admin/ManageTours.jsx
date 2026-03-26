import { useState } from "react";
import AdminNavbar from "@/components/admin/AdminNavbar";
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
} from "lucide-react";

const ManageTours = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tours"],
    queryFn: getAllToursApi,
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
  const BASE_URL = "http://localhost:5000";

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Tours</h1>
            <p className="text-gray-600 mt-1">
              View, edit, and manage all tour packages
            </p>
          </div>
          <Button
            onClick={() => navigate("/admin/dashboard/add-tour")}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus size={16} className="mr-2" />
            Add New Tour
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
              <p className="text-red-600">Failed to load tours</p>
            </CardContent>
          </Card>
        ) : tours.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600 mb-4">No tours found</p>
              <Button
                onClick={() => navigate("/admin/dashboard/add-tour")}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus size={16} className="mr-2" />
                Create Your First Tour
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <Card
                key={tour._id || tour.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                <div className="h-48 overflow-hidden relative">
                  {tour.images?.length > 0 && (
                    <img
                      src={`${BASE_URL}/images/${tour.images[0].split("/").pop()}`}
                      alt={tour.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <Badge className="absolute top-3 left-3 bg-white text-gray-900">
                    {tour.difficulty}
                  </Badge>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    {tour.location}
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">
                    {tour.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-green-600" />
                      {tour.durationDays} days
                    </span>
                    <span className="flex items-center gap-1 font-bold text-green-700">
                      <DollarSign className="h-4 w-4" />
                      Rs {tour.price}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/tours/${tour.slug}`)}
                      className="flex-1"
                    >
                      <Eye size={14} className="mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        navigate(`/admin/dashboard/edit-tour/${tour._id || tour.id}`)
                      }
                      className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDeleteConfirm(tour._id || tour.id)}
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
                  Delete Tour?
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this tour? This action cannot be
                  undone.
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

export default ManageTours;
