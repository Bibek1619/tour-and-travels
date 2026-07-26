import React, { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createTourApi } from "@/api/tourApi";
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

const CreateTourStepWise = ({ defaultCategory = "tour", isTrek = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: defaultCategory,
    location: "",
    difficulty: "",
    durationDays: "",
    price: "",
    maxAltitude: "",
    bestSeason: "",
    shortOverview: "",
    features: "",
    itinerary: [{ day: 1, title: "", desc: "" }],
    highlights: [""],
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const steps = [
    { id: 1, name: "Basic Info", icon: MapPin },
    { id: 2, name: "Details & Itinerary", icon: FileText },
    { id: 3, name: "Highlights", icon: List },
    { id: 4, name: "Images", icon: ImageIcon },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, field, value, type = "itinerary") => {
    setFormData((prev) => {
      const updated = [...prev[type]];
      if (field === null) updated[index] = value;
      else updated[index] = { ...updated[index], [field]: value };
      return { ...prev, [type]: updated };
    });
  };

  const addArrayField = (type = "itinerary") => {
    if (type === "itinerary") {
      setFormData((prev) => ({
        ...prev,
        itinerary: [...prev.itinerary, { day: prev.itinerary.length + 1, title: "", desc: "" }],
      }));
    } else {
      setFormData((prev) => ({ ...prev, highlights: [...prev.highlights, ""] }));
    }
  };

  const removeArrayField = (index, type = "itinerary") => {
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
        if (!formData.title || !formData.slug || !formData.category || !formData.difficulty) {
          toast.error("Please fill all required fields");
          return false;
        }
        return true;
      case 2:
        if (!formData.durationDays || !formData.price || !formData.shortOverview) {
          toast.error("Please fill all required fields");
          return false;
        }
        return true;
      case 3:
        if (formData.highlights.filter(Boolean).length === 0) {
          toast.error("Please add at least one highlight");
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

  const createTourMutation = useMutation({
    mutationFn: (form) => createTourApi(form),
    onSuccess: () => {
      toast.success(`${isTrek ? 'Trek' : 'Tour'} created successfully!`);
      navigate(isTrek ? "/admin/dashboard/treks" : "/admin/dashboard/tours");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || `Failed to create ${isTrek ? 'trek' : 'tour'}`);
    },
  });

  const handleSubmit = () => {
    if (!validateStep(4)) return;

    const form = new FormData();
    ["title", "slug", "category", "location", "difficulty", "durationDays", "price", "maxAltitude", "bestSeason", "shortOverview"]
      .forEach((key) => form.append(key, formData[key]));
    
    form.append("status", "published");
    
    formData.features.split(",").map((f) => f.trim()).filter(Boolean).forEach((f) => form.append("features", f));
    formData.highlights.filter(Boolean).forEach((h) => form.append("highlights", h));
    formData.itinerary.forEach((day) => form.append("itinerary", JSON.stringify(day)));
    imageFiles.forEach(({ file }) => form.append("images", file));
    
    createTourMutation.mutate(form);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    currentStep > step.id
                      ? "bg-green-500 text-white"
                      : currentStep === step.id
                      ? "bg-orange-500 text-white"
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
                    currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
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
                <p className="text-gray-600">Enter the basic details of your {isTrek ? 'trek' : 'tour'} package</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {isTrek ? 'Trek' : 'Tour'} Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder={isTrek ? "e.g., Everest Base Camp Trek" : "e.g., Kathmandu City Tour"}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="everest-base-camp-trek"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    disabled={isTrek}
                  >
                    <option value="tour">Tour</option>
                    <option value="trek">Trek</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Kathmandu, Nepal"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Difficulty <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Challenging">Challenging</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Details & Itinerary */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{isTrek ? 'Trek' : 'Tour'} Details & Itinerary</h2>
                <p className="text-gray-600">Provide detailed information about the {isTrek ? 'trek' : 'tour'}</p>
              </div>

              <div className="grid grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duration (Days) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="durationDays"
                    value={formData.durationDays}
                    onChange={handleChange}
                    placeholder="14"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                    placeholder="1200"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Max Altitude
                  </label>
                  <input
                    type="text"
                    name="maxAltitude"
                    value={formData.maxAltitude}
                    onChange={handleChange}
                    placeholder="5364m"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                    placeholder="Mar-May, Sep-Nov"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Features (comma separated)
                </label>
                <input
                  type="text"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  placeholder="Guided tour, Meals included, Porter service"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Short Overview <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="shortOverview"
                  value={formData.shortOverview}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the tour in a compelling way..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-semibold text-gray-700">Itinerary</label>
                  <Button
                    type="button"
                    onClick={() => addArrayField("itinerary")}
                    variant="outline"
                    size="sm"
                  >
                    Add Day
                  </Button>
                </div>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {formData.itinerary.map((day, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-orange-600">Day {index + 1}</span>
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
                        onChange={(e) => handleArrayChange(index, "title", e.target.value)}
                        placeholder="Day title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 text-sm"
                      />
                      <textarea
                        value={day.desc}
                        onChange={(e) => handleArrayChange(index, "desc", e.target.value)}
                        placeholder="Day description"
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Highlights */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{isTrek ? 'Trek' : 'Tour'} Highlights</h2>
                <p className="text-gray-600">Add key selling points for this {isTrek ? 'trek' : 'tour'}</p>
              </div>

              <div className="space-y-3">
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => handleArrayChange(index, null, e.target.value, "highlights")}
                      placeholder="e.g., Stunning Himalayan views"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                className="w-full"
              >
                Add Highlight
              </Button>
            </div>
          )}

          {/* Step 4: Images */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Images</h2>
                <p className="text-gray-600">Add high-quality photos for your {isTrek ? 'trek' : 'tour'}</p>
              </div>

              <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
                  isDragging
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-300 hover:border-orange-400 hover:bg-gray-50"
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
                          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
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
          <Button onClick={nextStep} className="bg-orange-600 hover:bg-orange-700 px-6">
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={createTourMutation.isPending}
            className="bg-green-600 hover:bg-green-700 px-8"
          >
            {createTourMutation.isPending ? "Creating..." : `Create ${isTrek ? 'Trek' : 'Tour'}`}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateTourStepWise;
