import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllAdventuresApi, deleteAdventureApi } from "@/api/adventureApi";
import { getAllCategoriesApi, updateCategoryApi } from "@/api/categoryApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Mountain,
  ChevronRight,
  Waves,
  Anchor,
  Wind,
  Zap,
  Activity,
  Trash2,
  Pencil,
  AlertTriangle,
} from "lucide-react";
import EditCategoryModal from "@/components/admin/EditCategoryModal";
import { getAdminCardImage } from "@/utils/cloudinaryHelper";

const ICON_MAP = {
  rafting: Waves,
  kayaking: Anchor,
  paragliding: Wind,
  bungee: Zap,
  zipline: Activity,
  canyoning: Mountain,
};

const COLOR_MAP = {
  rafting: "from-blue-500 to-cyan-500",
  kayaking: "from-cyan-500 to-blue-400",
  paragliding: "from-purple-500 to-pink-500",
  bungee: "from-red-500 to-orange-500",
  zipline: "from-yellow-500 to-orange-500",
  canyoning: "from-green-500 to-teal-500",
};

const ManageAdventures = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editCategory, setEditCategory] = useState(null);

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategoriesApi,
  });

  const categories = categoriesData?.data || [];

  const { data: adventuresData, isLoading: adventuresLoading } = useQuery({
    queryKey: ["adventures"],
    queryFn: () => getAllAdventuresApi({}),
  });

  const adventures = adventuresData?.data || [];

  const getCategoryCount = (slug) =>
    adventures.filter((adv) => adv.category === slug).length;

  const deleteCategoryMutation = useMutation({
    mutationFn: async (categorySlug) => {
      const toDelete = adventures.filter((adv) => adv.category === categorySlug);
      await Promise.all(toDelete.map((adv) => deleteAdventureApi(adv._id)));
      return toDelete.length;
    },
    onSuccess: (count) => {
      toast.success(
        `${count} adventure${count === 1 ? "" : "s"} deleted successfully`
      );
      queryClient.invalidateQueries(["adventures"]);
      setDeleteConfirm(null);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete adventures"
      );
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, formData }) => updateCategoryApi(id, formData),
    onSuccess: () => {
      toast.success("Category updated successfully");
      queryClient.invalidateQueries(["categories"]);
      setEditCategory(null);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update category");
    },
  });

  const handleCategorySave = (formData) => {
    updateCategoryMutation.mutate({ id: editCategory._id, formData });
  };

  const isLoading = categoriesLoading || adventuresLoading;

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Adventures</h1>
            <p className="text-gray-600 mt-1">
              Select an adventure category to view and manage packages
            </p>
          </div>
          <Button
            onClick={() => navigate("/admin/dashboard/create-adventure")}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Adventure
          </Button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-40 bg-gray-200 rounded-t-lg" />
                <CardContent className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Categories Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = ICON_MAP[category.slug] || Mountain;
              const color = COLOR_MAP[category.slug] || "from-gray-500 to-gray-600";
              const count = getCategoryCount(category.slug);

              return (
                <Card
                  key={category._id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Category Header */}
                  <div
                    onClick={() => navigate(`/admin/dashboard/adventures/${category.slug}`)}
                    className={`h-40 relative flex items-center justify-center cursor-pointer ${
                      category.image
                        ? ""
                        : `bg-gradient-to-br ${color}`
                    }`}
                  >
                    {category.image ? (
                      <img
                        src={getAdminCardImage(category.image)}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <Icon className="w-20 h-20 text-white opacity-90" />
                    )}

                    {/* Count Badge */}
                    {count > 0 && (
                      <div className="absolute top-4 right-4 bg-white text-gray-900 font-bold text-sm px-3 py-1 rounded-full shadow-lg">
                        {count} {count === 1 ? "package" : "packages"}
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-3">
                        <ChevronRight className="w-6 h-6 text-gray-900" />
                      </div>
                    </div>
                  </div>

                  {/* Category Content */}
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-5 line-clamp-2 min-h-[2.5rem]">
                      {category.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 border-green-200 text-green-600 hover:bg-green-50"
                        onClick={() => navigate(`/admin/dashboard/adventures/${category.slug}`)}
                      >
                        <ChevronRight className="w-4 h-4 mr-1" />
                        Manage Packages
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setEditCategory(category)}
                        className="border-blue-200 text-blue-600 hover:bg-blue-50"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setDeleteConfirm(category)}
                        className="border-red-200 text-red-600 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Edit Category Modal */}
        <EditCategoryModal
          isOpen={!!editCategory}
          onClose={() => setEditCategory(null)}
          category={editCategory}
          onSave={handleCategorySave}
          isSaving={updateCategoryMutation.isPending}
        />

        {/* Delete Category Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  Delete {deleteConfirm.name}?
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  This will permanently delete{" "}
                  <span className="font-semibold text-gray-900">
                    {getCategoryCount(deleteConfirm.slug)}
                  </span>{" "}
                  adventure package(s) in this category. This action cannot be
                  undone.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1"
                    disabled={deleteCategoryMutation.isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() =>
                      deleteCategoryMutation.mutate(deleteConfirm.slug)
                    }
                    disabled={deleteCategoryMutation.isPending}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    {deleteCategoryMutation.isPending
                      ? "Deleting..."
                      : "Delete"}
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

export default ManageAdventures;
