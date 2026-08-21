import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllToursApi, deleteTourApi } from "@/api/tourApi";
import { getRegionByIdApi } from "@/api/regionApi";
import { toast } from "react-hot-toast";
import {
  MapPin,
  Clock,
  DollarSign,
  Edit,
  Trash2,
  Eye,
  Plus,
  Mountain,
  ChevronLeft
} from "lucide-react";
import { getAdminCardImage } from "@/utils/cloudinaryHelper";

const RegionTreks = () => {
  const { regionId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Fetch region details
  const { data: regionData, isLoading: regionLoading } = useQuery({
    queryKey: ["region", regionId],
    queryFn: () => getRegionByIdApi(regionId),
  });

  // Fetch treks for this region — try region-specific first, then all treks as fallback
  const { data: treksData, isLoading: treksLoading, isError } = useQuery({
    queryKey: ["treks", regionId],
    queryFn: async () => {
      const res = await getAllToursApi({ category: "trek", region: regionId, limit: 100 });
      // If no treks found for this region, fetch all treks (region field may not be set)
      if (!res?.data?.length) {
        return getAllToursApi({ category: "trek", limit: 100 });
      }
      return res;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTourApi,
    onSuccess: () => {
      toast.success("Trek deleted successfully");
      queryClient.invalidateQueries(["treks", regionId]);
      setDeleteConfirm(null);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete trek");
    },
  });

  const region = regionData?.data;
  const treks = treksData?.data || [];

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
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <Link
            to="/admin/dashboard/treks"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Regions
          </Link>
          
          {regionLoading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-96" />
            </div>
          ) : region && (
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{region.name}</h1>
                <p className="text-gray-600 mt-1">{region.description}</p>
              </div>
              <Button
                onClick={() => navigate("/admin/dashboard/add-trek", { state: { regionId } })}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Trek to Region
              </Button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {treksLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-52 bg-gray-200 rounded-t-lg" />
                <CardContent className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
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
              <p className="text-red-600 font-semibold mb-2">Failed to load treks</p>
              <p className="text-gray-500 text-sm">Please try refreshing the page</p>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!treksLoading && !isError && treks.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Mountain className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No treks in this region yet</h3>
              <p className="text-gray-600 mb-6">Add trekking packages to this region</p>
              <Button
                onClick={() => navigate("/admin/dashboard/add-trek", { state: { regionId } })}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Trek
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Treks Grid */}
        {!treksLoading && !isError && treks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treks.map((trek) => (
              <Card
                key={trek._id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-52 overflow-hidden relative bg-gray-200">
                  {trek.images?.length > 0 ? (
                    <img
                      src={getAdminCardImage(trek.images[0])}
                      alt={trek.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Mountain className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className={`${getDifficultyColor(trek.difficulty)} border`}>
                      {trek.difficulty}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span className="truncate">{trek.location || "Nepal"}</span>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
                    {trek.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm mb-4 pb-4 border-b">
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <Clock className="h-4 w-4 text-green-600" />
                      {trek.durationDays} days
                    </span>
                    <span className="flex items-center gap-1 font-bold text-green-600">
                      <DollarSign className="h-4 w-4" />
                      {trek.price}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/treks/${trek.slug}`)}
                      className="flex-1 hover:bg-gray-50"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/admin/dashboard/edit-trek/${trek._id}`)}
                      className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDeleteConfirm(trek._id)}
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
            <Card className="max-w-md w-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  Delete Trek?
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  Are you sure you want to delete this trek? This action cannot be undone.
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

export default RegionTreks;
