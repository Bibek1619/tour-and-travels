import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { createAdventureApi } from "@/api/adventureApi";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  MapPin, 
  FileText, 
  Image as ImageIcon, 
  List,
  Upload,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AddAdventure = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const preselectedCategory = location.state?.category;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: preselectedCategory || "rafting",
    shortDescription: "",
    description: "",
    location: "",
    duration: "",
    difficulty: "Moderate",
    minAge: 12,
    price: "",
    groupSizeMin: 1,
    groupSizeMax: 10,
    included: [""],
    excluded: [""],
    requirements: [""],
    safetyInfo: "",
    bestSeason: "",
    featured: false,
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const steps = [
    { id: 1, name: "Basic Info", icon: MapPin },
    { id: 2, name: "Details", icon: FileText },
    { id: 3, name: "Lists", icon: List },
    { id: 4, name: "Images", icon: ImageIcon },
  ];

  const categories = [
    { value: "rafting", label: "White Water Rafting" },
    { value: "kayaking", label: "Kayaking" },
    { value: "paragliding", label: "Paragliding" },
    { value: "bungee", label: "Bungee Jumping" },
    { value: "zipline", label: "Zip Lining" },
    { value: "canyoning", label: "Canyoning" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
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

  const addImages = (files) => {
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const withPreview = valid.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).slice(2),
    }));
    setImageFiles((prev) => [...prev, ...withPreview]);
  };

  const removeImage = (id) => {
    setImageFiles((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  const handleImageAdd = (e) => {
    addImages(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addImages(e.dataTransfer.files);
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!formData.name || !formData.slug || !formData.category || !formData.location) {
          toast.error("Please fill all required fields");
          return false;
        }
        return true;
      case 2:
        if (!formData.shortDescription || !formData.description || !formData.duration || !formData.price) {
          toast.error("Please fill all required fields");
          return false;
        }
        return true;
      case 3:
        if (formData.included.filter(Boolean).length === 0) {
          toast.error("Please add at least one included item");
          return false;
        }
        return true;
      case 4:
        if (imageFiles.length === 0) {
          toast.error("Please upload at least one image");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const createAdventureMutation = useMutation({
    mutationFn: (form) => createAdventureApi(form),
    onSuccess: () => {
      toast.success("Adventure created successfully!");
      navigate("/admin/dashboard/adventures");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create adventure");
    },
  });

  const handleSubmit = () => {
    if (!validateStep(4)) return;

    const form = new FormData();
    
    // Basic fields
    form.append("name", formData.name);
    form.append("slug", formData.slug);
    form.append("category", formData.category);
    form.append("shortDescription", formData.shortDescription);
    form.append("description", formData.description);
    form.append("location", formData.location);
    form.append("duration", formData.duration);
    form.append("difficulty", formData.difficulty);
    form.append("minAge", formData.minAge);
    form.append("price", formData.price);
    form.append("groupSizeMin", formData.groupSizeMin);
    form.append("groupSizeMax", formData.groupSizeMax);
    form.append("safetyInfo", formData.safetyInfo);
    form.append("bestSeason", formData.bestSeason);
    form.append("featured", formData.featured);
    form.append("status", "published");
    
    // Arrays
    formData.included.filter(Boolean).forEach((item) => form.append("included", item));
    formData.excluded.filter(Boolean).forEach((item) => form.append("excluded", item));
    formData.requirements.filter(Boolean).forEach((item) => form.append("requirements", item));
    
    // Images
    imageFiles.forEach(({ file }) => form.append("images", file));
    
    createAdventureMutation.mutate(form);
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create Adventure</h1>
            <p className="text-gray-600 mt-1">Add a new adventure activity package</p>
          </div>

          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        currentStep > step.id
                          ? "bg-purple-500 text-white"
                          : currentStep === step.id
                          ? "bg-purple-600 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <step.icon className="w-6 h-6" />
                      )}
                    </div>
                    <span
                      className={`text-sm mt-2 font-medium ${
                        currentStep >= step.id ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 rounded transition-all ${
                        currentStep > step.id ? "bg-purple-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <Card>
            <CardContent className="p-8">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
                    <p className="text-gray-600">Enter the basic details of your adventure</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Adventure Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., Trishuli River Rafting - Full Day"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        URL Slug <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        placeholder="trishuli-river-rafting-full-day"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Trishuli River, Nepal"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Difficulty
                      </label>
                      <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Hard">Hard</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Minimum Age
                      </label>
                      <input
                        type="number"
                        name="minAge"
                        value={formData.minAge}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex items-center gap-2 col-span-2">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleChange}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <label className="text-sm font-semibold text-gray-700">
                        Mark as Featured
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Adventure Details</h2>
                    <p className="text-gray-600">Provide detailed information</p>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Duration <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="6-7 hours"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Price (USD) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="65"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Best Season
                      </label>
                      <input
                        type="text"
                        name="bestSeason"
                        value={formData.bestSeason}
                        onChange={handleChange}
                        placeholder="Sep-Dec, Mar-May"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Group Size Min
                      </label>
                      <input
                        type="number"
                        name="groupSizeMin"
                        value={formData.groupSizeMin}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Group Size Max
                      </label>
                      <input
                        type="number"
                        name="groupSizeMax"
                        value={formData.groupSizeMax}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Short Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Brief one-line description"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Detailed description of the adventure..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Safety Information
                    </label>
                    <textarea
                      name="safetyInfo"
                      value={formData.safetyInfo}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Safety guidelines and precautions..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Lists */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Included, Excluded & Requirements</h2>
                    <p className="text-gray-600">What's included and what participants need</p>
                  </div>

                  {/* Included */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-semibold text-gray-700">
                        What's Included <span className="text-red-500">*</span>
                      </label>
                      <Button
                        type="button"
                        onClick={() => addArrayField("included")}
                        variant="outline"
                        size="sm"
                      >
                        Add Item
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {formData.included.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => handleArrayChange(index, e.target.value, "included")}
                            placeholder="e.g., Professional guide"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          {formData.included.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayField(index, "included")}
                              className="w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Excluded */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-semibold text-gray-700">
                        What's Excluded
                      </label>
                      <Button
                        type="button"
                        onClick={() => addArrayField("excluded")}
                        variant="outline"
                        size="sm"
                      >
                        Add Item
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {formData.excluded.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => handleArrayChange(index, e.target.value, "excluded")}
                            placeholder="e.g., Personal expenses"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          {formData.excluded.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayField(index, "excluded")}
                              className="w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-semibold text-gray-700">
                        Requirements
                      </label>
                      <Button
                        type="button"
                        onClick={() => addArrayField("requirements")}
                        variant="outline"
                        size="sm"
                      >
                        Add Item
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {formData.requirements.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => handleArrayChange(index, e.target.value, "requirements")}
                            placeholder="e.g., Basic swimming skills"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          {formData.requirements.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayField(index, "requirements")}
                              className="w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Images */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Images</h2>
                    <p className="text-gray-600">Add high-quality photos for your adventure</p>
                  </div>

                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
                      isDragging
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-300 hover:border-purple-400 hover:bg-gray-50"
                    }`}
                  >
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-semibold text-gray-700 mb-2">
                      {isDragging ? "Drop images here" : "Drag & drop images or click to browse"}
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

                  {imageFiles.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-3">
                        {imageFiles.length} image{imageFiles.length !== 1 ? "s" : ""} selected
                      </p>
                      <div className="grid grid-cols-4 gap-4">
                        {imageFiles.map(({ id, preview, file }, index) => (
                          <div key={id} className="relative group">
                            <img
                              src={preview}
                              alt={file.name}
                              className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                            />
                            {index === 0 && (
                              <span className="absolute top-2 left-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded">
                                Cover
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(id);
                              }}
                              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
              className="px-6"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button onClick={nextStep} className="bg-purple-600 hover:bg-purple-700 px-6">
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={createAdventureMutation.isPending}
                className="bg-green-600 hover:bg-green-700 px-8"
              >
                {createAdventureMutation.isPending ? "Creating..." : "Create Adventure"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddAdventure;
