import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getTourByIdApi, updateTourApi } from "@/api/tourApi";
import { getAllRegionsApi } from "@/api/regionApi";
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
} from "lucide-react";
import { getAdminCardImage } from "@/utils/cloudinaryHelper";

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

const EditTrek = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const { data: regionsData } = useQuery({
    queryKey: ["regions"],
    queryFn: getAllRegionsApi,
  });
  const regions = regionsData?.data || [];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["trek", id],
    queryFn: () => getTourByIdApi(id),
  });

  const trek = data?.data;

  useEffect(() => {
    if (!trek) return;
    setFormData({
      title: trek.title || "",
      slug: trek.slug || "",
      category: trek.category || "trek",
      location: trek.location || "",
      difficulty: trek.difficulty || "",
      region: trek.region?._id || trek.region || "",
      durationDays: trek.durationDays || "",
      price: trek.price || "",
      maxAltitude: trek.maxAltitude || "",
      bestSeason: trek.bestSeason || "",
      shortOverview: trek.shortOverview || "",
      highlights: trek.highlights?.length ? trek.highlights : [""],
      itinerary: trek.itinerary?.length ? trek.itinerary : [{ day: 1, title: "", desc: "" }],
      included: trek.included?.length ? trek.included : [""],
      excluded: trek.excluded?.length ? trek.excluded : [""],
      status: trek.status || "draft",
    });
    setExistingImages(trek.images || []);
    setNewImages([]);
  }, [trek]);

  const updateMutation = useMutation({
    mutationFn: (form) => updateTourApi(id, form),
    onSuccess: () => {
      toast.success("Trek updated successfully!");
      queryClient.invalidateQueries(["trek", id]);
      queryClient.invalidateQueries(["treks"]);
      navigate(-1);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update trek");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, field, value, type) => {
    setFormData((prev) => {
      const updated = [...prev[type]];
      if (field === null) updated[index] = value;
      else updated[index] = { ...updated[index], [field]: value };
      return { ...prev, [type]: updated };
    });
  };

  const addArrayField = (type) => {
    setFormData((prev) => {
      if (type === "itinerary") {
        return { ...prev, itinerary: [...prev.itinerary, { day: prev.itinerary.length + 1, title: "", desc: "" }] };
      }
      return { ...prev, [type]: [...prev[type], ""] };
    });
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
    if (!formData.title.trim()) {
      toast.error("Trek title is required");
      return;
    }
    if (!formData.shortOverview.trim()) {
      toast.error("Short overview is required");
      return;
    }
    if (totalImages === 0) {
      toast.error("Please add at least one image");
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("slug", formData.slug);
    form.append("category", formData.category);
    form.append("location", formData.location);
    form.append("difficulty", formData.difficulty);
    form.append("region", formData.region);
    form.append("durationDays", formData.durationDays);
    form.append("price", formData.price);
    form.append("maxAltitude", formData.maxAltitude);
    form.append("bestSeason", formData.bestSeason);
    form.append("shortOverview", formData.shortOverview);
    form.append("status", formData.status);

    formData.highlights.filter(Boolean).forEach((h) => form.append("highlights", h));
    formData.itinerary.forEach((day) => form.append("itinerary", JSON.stringify(day)));
    formData.included.filter(Boolean).forEach((item) => form.append("included", item));
    formData.excluded.filter(Boolean).forEach((item) => form.append("excluded", item));

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
            <p className="text-gray-600">Loading trek details...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (isError || !trek || !formData) {
    return (
      <AdminLayout>
        <div className="max-w-2xl mx-auto mt-12">
          <Card className="border-red-200">
            <CardContent className="p-12 text-center">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Trek Not Found</h2>
              <p className="text-gray-600 mb-6">
                The trek you're trying to edit doesn't exist or has been deleted.
              </p>
              <Button onClick={() => navigate("/admin/dashboard/treks")}>
                Back to Treks
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
          <div className="mb-8">
            <Link
              to="/admin/dashboard/treks"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors mb-4"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Regions
            </Link>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Trek</h1>
                <p className="text-gray-600 mt-1">
                  Update the details, descriptions and images of this trek
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
              subtitle="Core details of the trek package"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className={labelClass}>
                    Trek Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Everest Base Camp Trek"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>URL Slug</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="everest-base-camp-trek"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Khumbu, Nepal"
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
                    <option value="">Select</option>
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Challenging">Challenging</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Region</label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className={fieldClass}
                  >
                    <option value="">Select Region</option>
                    {regions.map((r) => (
                      <option key={r._id} value={r._id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={fieldClass}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </Section>

            {/* Pricing & Duration */}
            <Section
              icon={MapPin}
              title="Pricing & Duration"
              subtitle="Booking-relevant details"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className={labelClass}>
                    Duration (Days) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="durationDays"
                    value={formData.durationDays}
                    onChange={handleChange}
                    placeholder="14"
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
                    placeholder="1200"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Max Altitude</label>
                  <input
                    type="text"
                    name="maxAltitude"
                    value={formData.maxAltitude}
                    onChange={handleChange}
                    placeholder="5364m"
                    className={fieldClass}
                  />
                </div>
                <div className="md:col-span-3">
                  <label className={labelClass}>Best Season</label>
                  <input
                    type="text"
                    name="bestSeason"
                    value={formData.bestSeason}
                    onChange={handleChange}
                    placeholder="Mar-May, Sep-Nov"
                    className={fieldClass}
                  />
                </div>
              </div>
            </Section>

            {/* Overview */}
            <Section
              icon={FileText}
              title="Overview"
              subtitle="Describe what makes this trek special"
            >
              <div>
                <label className={labelClass}>
                  Short Overview <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="shortOverview"
                  value={formData.shortOverview}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe the trek in a compelling way..."
                  className={fieldClass}
                />
              </div>
            </Section>

            {/* Highlights */}
            <Section
              icon={List}
              title="Highlights"
              subtitle="Key selling points of this trek"
            >
              <div className="space-y-3">
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => handleArrayChange(index, null, e.target.value, "highlights")}
                      placeholder="e.g., Stunning Himalayan views"
                      className={fieldClass}
                    />
                    {formData.highlights.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField(index, "highlights")}
                        className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                type="button"
                onClick={() => addArrayField("highlights")}
                variant="outline"
                className="w-full mt-4"
              >
                Add Highlight
              </Button>
            </Section>

            {/* Itinerary */}
            <Section
              icon={FileText}
              title="Itinerary"
              subtitle="Day-by-day breakdown of the trek"
            >
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {formData.itinerary.map((day, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-green-600">Day {index + 1}</span>
                      {formData.itinerary.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayField(index, "itinerary")}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={day.title}
                      onChange={(e) => handleArrayChange(index, "title", e.target.value, "itinerary")}
                      placeholder="Day title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 text-sm"
                    />
                    <textarea
                      value={day.desc}
                      onChange={(e) => handleArrayChange(index, "desc", e.target.value, "itinerary")}
                      placeholder="Day description"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                ))}
              </div>
              <Button
                type="button"
                onClick={() => addArrayField("itinerary")}
                variant="outline"
                className="w-full mt-4"
              >
                Add Day
              </Button>
            </Section>

            {/* Included / Excluded */}
            <Section
              icon={List}
              title="Included & Excluded"
              subtitle="What's covered and what's not"
            >
              <div className="space-y-6">
                {[
                  { type: "included", label: "What's Included", placeholder: "e.g., Accommodation, Meals" },
                  { type: "excluded", label: "What's Excluded", placeholder: "e.g., International flights" },
                ].map(({ type, label, placeholder }) => (
                  <div key={type}>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-semibold text-gray-700">{label}</label>
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
                            onChange={(e) => handleArrayChange(index, null, e.target.value, type)}
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
              subtitle="Manage the photos displayed for this trek"
            >
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
                          alt={`Trek ${index + 1}`}
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

              <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
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
              onClick={() => navigate("/admin/dashboard/treks")}
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

export default EditTrek;
