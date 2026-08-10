import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllRegionsApi, deleteRegionApi, updateRegionApi } from "@/api/regionApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  Eye,
  Plus,
  Mountain,
  Map,
  ChevronRight,
  Pencil,
} from "lucide-react";
import AddRegionModal from "@/components/admin/AddRegionModal";
import EditRegionModal from "@/components/admin/EditRegionModal";
import { getRegionCardImage } from "@/utils/cloudinaryHelper";

const ManageTreks = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [deleteRegionConfirm, setDeleteRegionConfirm] = useState(null);
  const [editRegion, setEditRegion] = useState(null);

  const { data: regionsData, isLoading: regionsLoading, isError: regionsError } = useQuery({
    queryKey: ["regions"],
    queryFn: getAllRegionsApi,
  });

  const regions = regionsData?.data || [];

  const deleteRegionMutation = useMutation({
    mutationFn: deleteRegionApi,
    onSuccess: () => {
      toast.success("Region deleted successfully");
      queryClient.invalidateQueries(["regions"]);
      setDeleteRegionConfirm(null);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete region");
    },
  });

  const updateRegionMutation = useMutation({
    mutationFn: ({ id, formData }) => updateRegionApi(id, formData),
    onSuccess: () => {
      toast.success("Region updated successfully");
      queryClient.invalidateQueries(["regions"]);
      setEditRegion(null);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update region");
    },
  });

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Trek Regions</h1>
            <p className="text-gray-600 mt-1">
              Manage trek regions and their packages
            </p>
          </div>
          <Button
            onClick={() => setIsRegionModalOpen(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Region
          </Button>
        </div>

        {regionsLoading && (
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

        {regionsError && (
          <Card className="border-red-200">
            <CardContent className="p-8 text-center">
              <Mountain className="w-16 h-16 text-red-300 mx-auto mb-4" />
              <p className="text-red-600 font-semibold mb-2">Failed to load regions</p>
              <p className="text-gray-500 text-sm">Please try refreshing the page</p>
            </CardContent>
          </Card>
        )}

        {!regionsLoading && !regionsError && regions.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Map className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No regions yet</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first trek region</p>
              <Button
                onClick={() => setIsRegionModalOpen(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Region
              </Button>
            </CardContent>
          </Card>
        )}

        {!regionsLoading && !regionsError && regions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region) => (
              <Card
                key={region._id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => navigate(`/admin/dashboard/treks/${region._id}`)}
              >
                <div className="h-52 overflow-hidden relative bg-gradient-to-br from-green-100 to-green-50">
                  {region.image ? (
                    <img
                      src={getRegionCardImage(region.image)}
                      alt={region.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Map className="w-20 h-20 text-green-300" />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-3">
                      <ChevronRight className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <CardContent className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                    {region.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
                    {region.description}
                  </p>

                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/admin/dashboard/treks/${region._id}`)}
                      className="flex-1 border-green-200 text-green-600 hover:bg-green-50"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Treks
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditRegion(region)}
                      className="border-green-200 text-green-600 hover:bg-green-50"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDeleteRegionConfirm(region._id)}
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

        {deleteRegionConfirm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full animate-in fade-in zoom-in duration-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  Delete Region?
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  Are you sure you want to delete this region? All treks in this region will need to be reassigned.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteRegionConfirm(null)}
                    className="flex-1"
                    disabled={deleteRegionMutation.isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => deleteRegionMutation.mutate(deleteRegionConfirm)}
                    disabled={deleteRegionMutation.isPending}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    {deleteRegionMutation.isPending ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <AddRegionModal 
        isOpen={isRegionModalOpen} 
        onClose={() => setIsRegionModalOpen(false)} 
      />

      <EditRegionModal
        isOpen={!!editRegion}
        onClose={() => setEditRegion(null)}
        region={editRegion}
        onSave={(formData) => updateRegionMutation.mutate({ id: editRegion._id, formData })}
        isSaving={updateRegionMutation.isPending}
      />
    </AdminLayout>
  );
};

export default ManageTreks;
