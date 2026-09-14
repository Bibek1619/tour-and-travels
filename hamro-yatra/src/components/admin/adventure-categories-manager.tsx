"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  Eye,
  Loader2,
  Map,
  Pencil,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";

export interface CategoryItem {
  _id: string;
  id: string;
  name: string;
  description: string;
  image: string;
}

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800";

const inputBase =
  "w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-shadow text-sm";

function CategoryImagePicker({
  image,
  imagePreview,
  onSelect,
  onRemove,
  uploading,
}: {
  image: string;
  imagePreview: string | null;
  onSelect: (file: File) => void;
  onRemove: () => void;
  uploading: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasImage = Boolean(imagePreview || image);

  return (
    <div>
      {hasImage ? (
        <div>
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreview || image}
              alt="Category"
              className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
            />
            <button
              type="button"
              onClick={onRemove}
              title="Remove photo"
              className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="mt-3 w-full inline-flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg py-3 text-sm font-medium text-gray-700 cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 text-orange-600" />
                Change Photo
              </>
            )}
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-orange-400 hover:bg-gray-50 transition-all"
        >
          {uploading ? (
            <Loader2 className="w-10 h-10 mx-auto mb-3 text-orange-500 animate-spin" />
          ) : (
            <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          )}
          <p className="text-sm font-medium text-gray-700">
            Click to upload image
          </p>
          <p className="text-xs text-gray-500 mt-1">
            PNG, JPG or WEBP (Max 5MB)
          </p>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onSelect(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

function CategoryModal({
  title,
  initial,
  saving,
  onClose,
  onSubmit,
}: {
  title: string;
  initial: { name: string; description: string; image: string };
  saving: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string; image: string }) => void;
}) {
  const [name, setName] = useState(initial.name);
  const [description, setDescription] = useState(initial.description);
  const [imageUrl, setImageUrl] = useState(initial.image);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    setError("");
    if (!name.trim()) {
      setError("Category name is required");
      return;
    }
    let finalImage = initial.image;
    try {
      if (imageFile) {
        setUploading(true);
        const data = new FormData();
        data.append("file", imageFile);
        data.append("folder", "tour-travels/adventure-categories");
        const res = await fetch("/api/upload", { method: "POST", body: data });
        const json = await res.json();
        if (!res.ok) {
          setError(json.message || "Failed to upload image");
          return;
        }
        finalImage = json.url;
      } else if (imagePreview || imageUrl) {
        finalImage = imageUrl;
      }
    } catch {
      setError("Failed to upload image");
      return;
    } finally {
      setUploading(false);
    }
    onSubmit({
      name: name.trim(),
      description: description.trim(),
      image: finalImage,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputBase}
                placeholder="e.g., Rafting, Paragliding"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className={`${inputBase} resize-y`}
                placeholder="Describe this adventure category..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category Image
              </label>
              <CategoryImagePicker
                image={initial.image}
                imagePreview={imagePreview}
                uploading={uploading}
                onSelect={handleImageSelect}
                onRemove={() => {
                  setImageFile(null);
                  setImagePreview(null);
                  setImageUrl("");
                }}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={saving || uploading}
                className="flex-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium py-2.5 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={saving || uploading}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Category"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdventureCategoryManager({
  categories,
  counts,
}: {
  categories: CategoryItem[];
  counts: Record<string, number>;
}) {
  const router = useRouter();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<CategoryItem | null>(null);
  const [deleteCategory, setDeleteCategory] = useState<CategoryItem | null>(
    null
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const createCategory = async (data: {
    name: string;
    description: string;
    image: string;
  }) => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/adventure-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        setError(json?.error || "Failed to create category");
        return;
      }
      setIsAddOpen(false);
      router.refresh();
    } catch {
      setError("Failed to create category");
    } finally {
      setSaving(false);
    }
  };

  const updateCategory = async (data: {
    name: string;
    description: string;
    image: string;
  }) => {
    if (!editCategory) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(
        `/api/adventure-categories/${editCategory._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        setError(json?.error || "Failed to update category");
        return;
      }
      setEditCategory(null);
      router.refresh();
    } catch {
      setError("Failed to update category");
    } finally {
      setSaving(false);
    }
  };

  const deleteCategoryById = async () => {
    if (!deleteCategory) return;
    setDeleting(true);
    setError("");
    try {
      const res = await fetch(
        `/api/adventure-categories/${deleteCategory._id}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        setError(json?.error || "Failed to delete category");
        return;
      }
      setDeleteCategory(null);
      router.refresh();
    } catch {
      setError("Failed to delete category");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Adventure Categories
          </h1>
          <p className="text-gray-600 mt-1">
            Manage adventure categories and their packages
          </p>
        </div>
        <button
          onClick={() => {
            setError("");
            setIsAddOpen(true);
          }}
          className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Category
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {categories.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Map className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No categories yet
          </h3>
          <p className="text-gray-600 mb-6">
            Get started by creating your first adventure category
          </p>
          <button
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Your First Category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const pkgCount = counts[category.id] || 0;
            return (
              <div
                key={category._id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <Link
                  href={`/admin/adventures/category/${category.id}`}
                  className="block h-52 overflow-hidden relative bg-gradient-to-br from-orange-100 to-orange-50"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={category.image || DEFAULT_IMAGE}
                    alt={category.name || "Category"}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-3">
                      <ChevronRight className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {pkgCount} {pkgCount === 1 ? "Package" : "Packages"}
                  </div>
                </Link>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
                    {category.description || "No description"}
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/adventures/category/${category.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 border border-orange-200 text-orange-600 hover:bg-orange-50 rounded-lg text-sm font-medium py-2 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View Packages
                    </Link>
                    <button
                      onClick={() => {
                        setError("");
                        setEditCategory(category);
                      }}
                      className="inline-flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium px-3 py-2 transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setError("");
                        setDeleteCategory(category);
                      }}
                      className="inline-flex items-center justify-center border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium px-3 py-2 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isAddOpen && (
        <CategoryModal
          title="Add New Adventure Category"
          initial={{ name: "", description: "", image: "" }}
          saving={saving}
          onClose={() => setIsAddOpen(false)}
          onSubmit={createCategory}
        />
      )}

      {editCategory && (
        <CategoryModal
          title="Edit Category"
          initial={{
            name: editCategory.name ?? "",
            description: editCategory.description ?? "",
            image: editCategory.image ?? "",
          }}
          saving={saving}
          onClose={() => setEditCategory(null)}
          onSubmit={updateCategory}
        />
      )}

      {deleteCategory && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full rounded-2xl">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                Delete Category?
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Are you sure you want to delete{" "}
                <strong>{deleteCategory.name}</strong>? Adventures in this
                category will need to be reassigned.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteCategory(null)}
                  disabled={deleting}
                  className="flex-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium py-2.5 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteCategoryById}
                  disabled={deleting}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  {deleting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Delete
                </button>
              </div>
              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}