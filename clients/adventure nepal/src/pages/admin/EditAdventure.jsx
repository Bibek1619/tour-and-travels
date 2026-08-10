import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAdventureByIdApi, updateAdventureApi } from "@/api/adventureApi";
import { toast } from "react-hot-toast";
import {
  Loader2,
  AlertTriangle,
  ChevronLeft,
  Save,
  MapPin,
  FileText,
  Tag,
  Image as ImageIcon,
  List,
  Upload,
  X,
  Star,
} from "lucide-react";
import { getAdminCardImage } from "@/utils/cloudinaryHelper";

const CATEGORIES = [
  { value: "rafting", label: "White Water Rafting" },
  { value: "kayaking", label: "Kayaking" },
  { value: "paragliding", label: "Paragliding" },
  { value: "bungee", label: "Bungee Jumping" },
  { value: "zipline", label: "Zip Lining" },
  { value: "canyoning", label: "Canyoning" },
];

const fieldClass =
  "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900";
const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

const Section = ({ icon: Icon, title, subtitle, children }) => (
  <Card>
    <CardContent className="p-6 md:p-8">
      <div className="flex items-center gap-3 mb-1">
        <div className="bg-green-100 rounded-xl p-2.5">
          <Icon className="w-5 h-5 text-green-600" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      </div>
      <p className="text-sm text-gray-500 mb-6">{subtitle}</p>
      {children}
    </CardContent>
  </Card>
);

const EditAdventure = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["adventure", id],
    queryFn: () => getAdventureByIdApi(id),
  });

  const adventure = data?.data;

  useEffect(() => {
    if (!adventure) return;
    setFormData({
      name: adventure.name || "",
      category: adventure.category || "rafting",
      location: adventure.location || "",
      duration: adventure.duration || "",
      difficulty: adventure.difficulty || "Moderate",
      minAge: adventure.minAge ?? 12,
      price: adventure.price ?? "",
      bestSeason: adventure.bestSeason || "",
      groupSizeMin: adventure.groupSize?.min ?? 1,
      groupSizeMax: adventure.groupSize?.max ?? 10,
      shortDescription: adventure.shortDescription || "",
      description: adventure.description || "",
      safetyInfo: adventure.safetyInfo || "",
      included: adventure.included?.length ? adventure.included : [""],
      excluded: adventure.excluded?.length ? adventure.excluded : [""],
      requirements: adventure.requirements?.length ? adventure.requirements : [""],
      featured: adventure.featured || false,
    });
    setExistingImages(adventure.images || []);
    setNewImages([]);
  }, [adventure]);

  const updateMutation = useMutation({
    mutationFn: (form) => updateAdventureApi(id, form),
    onSuccess: () => {
      toast.success("Adventure updated successfully!");
      queryClient.invalidateQueries(["adventures"]);
      queryClient.invalidateQueries(["adventure", id]);
      navigate(`/admin/dashboard/adventures/${formData.category}`);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update adventure");
    },
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

  const addNewImages = (files) => {
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const withPreview = valid.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).slice(2),
    }));
    setNewImages((prev) => [...prev, ...withPreview]);
  };

  const handleImageAdd = (e) => {
    addNewImages(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addNewImages(e.dataTransfer.files);
  };

  const removeExistingImage = (url) => {
    setExistingImages((prev) => prev.filter((img) => img !== url));
  };

  const removeNewImage = (id) => {
    setNewImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  const totalImages = existingImages.length + newImages.length;

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      toast.error("Adventure name is required");
      return;
    }
    if (!formData.shortDescription.trim() || !formData.description.trim()) {
      toast.error("Please fill in the description fields");
      return;
    }
    if (totalImages === 0) {
      toast.error("Please add at least one image");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("category", formData.category);
    form.append("location", formData.location);
    form.append("duration", formData.duration);
    form.append("difficulty", formData.difficulty);
    form.append("minAge", formData.minAge);
    form.append("price", formData.price);
    form.append("bestSeason", formData.bestSeason);
    form.append("groupSizeMin", formData.groupSizeMin);
    form.append("groupSizeMax", formData.groupSizeMax);
    form.append("shortDescription", formData.shortDescription);
    form.append("description", formData.description);
    form.append("safetyInfo", formData.safetyInfo);
    form.append("featured", formData.featured);

    formData.included.filter(Boolean).forEach((item) => form.append("included", item));
    formData.excluded.filter(Boolean).forEach((item) => form.append("excluded", item));
    formData.requirements.filter(Boolean).forEach((item) => form.append("requirements", item));

    form.append("existingImages", JSON.stringify(existingImages));
    newImages.forEach(({ file }) => form.append("images", file));

    updateMutation.mutate(form);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading adventure details...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (isError || !adventure || !formData) {
    return (
      <AdminLayout>
        <div className="max-w-2xl mx-auto mt-12">
          <Card className="border-red-200">
            <CardContent className="p-12 text-center">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Adventure Not Found</h2>
              <p className="text-gray-600 mb-6">
                The adventure you're trying to edit doesn't exist or has been deleted.
              </p>
              <Button onClick={() => navigate("/admin/dashboard/adventures")}>
                Back to Adventures
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
          <div className="mb-8">
            <Link
              to={`/admin/dashboard/adventures/${formData.category}`}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors mb-4"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to {CATEGORIES.find((c) => c.value === formData.category)?.label}
            </Link>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Adventure</h1>
                <p className="text-gray-600 mt-1">
                  Update the details, descriptions and images of this adventure
                </p>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={updateMutation.isPending}
                className="bg-green-600 hover:bg-green-700 px-8"
              >
                <Save className="w-4 h-4 mr-2" />
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Basic Info */}
            <Section
              icon={Tag}
              title="Basic Information"
              subtitle="The core details shown on the adventure card"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className={labelClass}>
                    Adventure Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Trishuli River Rafting - Full Day"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={fieldClass}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Trishuli River, Nepal"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Difficulty</label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className={fieldClass}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Hard">Hard</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Minimum Age</label>
                  <input
                    type="number"
                    name="minAge"
                    value={formData.minAge}
                    onChange={handleChange}
                    className={fieldClass}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                      <Star className="w-4 h-4 text-yellow-500" />
                      Mark as Featured
                    </span>
                  </label>
                </div>
              </div>
            </Section>

            {/* Details */}
            <Section
              icon={MapPin}
              title="Pricing & Duration"
              subtitle="Booking-relevant details of the adventure"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className={labelClass}>
                    Duration <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="6-7 hours"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Price (USD) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="65"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Best Season</label>
                  <input
                    type="text"
                    name="bestSeason"
                    value={formData.bestSeason}
                    onChange={handleChange}
                    placeholder="Sep-Dec, Mar-May"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Group Size Min</label>
                  <input
                    type="number"
                    name="groupSizeMin"
                    value={formData.groupSizeMin}
                    onChange={handleChange}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Group Size Max</label>
                  <input
                    type="number"
                    name="groupSizeMax"
                    value={formData.groupSizeMax}
                    onChange={handleChange}
                    className={fieldClass}
                  />
                </div>
              </div>
            </Section>

            {/* Descriptions */}
            <Section
              icon={FileText}
              title="Descriptions"
              subtitle="Tell travelers what makes this adventure special"
            >
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>
                    Short Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Brief one-line description"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Full Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Detailed description of the adventure..."
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Safety Information</label>
                  <textarea
                    name="safetyInfo"
                    value={formData.safetyInfo}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Safety guidelines and precautions..."
                    className={fieldClass}
                  />
                </div>
              </div>
            </Section>

            {/* Lists */}
            <Section
              icon={List}
              title="Included, Excluded & Requirements"
              subtitle="What's included and what participants need"
            >
              <div className="space-y-6">
                {[
                  { type: "included", label: "What's Included", placeholder: "e.g., Professional guide", required: true },
                  { type: "excluded", label: "What's Excluded", placeholder: "e.g., Personal expenses", required: false },
                  { type: "requirements", label: "Requirements", placeholder: "e.g., Basic swimming skills", required: false },
                ].map(({ type, label, placeholder, required }) => (
                  <div key={type}>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-semibold text-gray-700">
                        {label} {required && <span className="text-red-500">*</span>}
                      </label>
                      <Button
                        type="button"
                        onClick={() => addArrayField(type)}
                        variant="outline"
                        size="sm"
                      >
                        Add Item
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {formData[type].map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => handleArrayChange(index, e.target.value, type)}
                            placeholder={placeholder}
                            className={fieldClass}
                          />
                          {formData[type].length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayField(index, type)}
                              className="w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg flex-shrink-0"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Images */}
            <Section
              icon={ImageIcon}
              title="Images"
              subtitle="Manage the photos displayed for this adventure"
            >
              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Current Images ({existingImages.length})
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {existingImages.map((url, index) => (
                      <div key={url} className="relative group rounded-xl overflow-hidden border-2 border-gray-200">
                        <img
                          src={getAdminCardImage(url)}
                          alt={`Adventure ${index + 1}`}
                          className="w-full h-32 object-cover"
                        />
                        {index === 0 && (
                          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                            Cover
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removeExistingImage(url)}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Images */}
              {newImages.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    New Images ({newImages.length})
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {newImages.map(({ id, preview, file }) => (
                      <div key={id} className="relative group rounded-xl overflow-hidden border-2 border-dashed border-green-300">
                        <img src={preview} alt={file.name} className="w-full h-32 object-cover" />
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

              {/* Upload Area */}
              <div
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
                  isDragging
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-green-400 hover:bg-green-50/50"
                }`}
              >
                <Upload className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                <p className="text-base font-semibold text-gray-700 mb-1">
                  {isDragging ? "Drop images here" : "Add more images"}
                </p>
                <p className="text-sm text-gray-500">PNG, JPG or WEBP (Max 5MB per image)</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageAdd}
                />
              </div>
            </Section>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between mt-8 pb-4">
            <Button
              variant="outline"
              onClick={() => navigate(`/admin/dashboard/adventures/${formData.category}`)}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={updateMutation.isPending}
              className="bg-green-600 hover:bg-green-700 px-8"
            >
              <Save className="w-4 h-4 mr-2" />
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditAdventure;
