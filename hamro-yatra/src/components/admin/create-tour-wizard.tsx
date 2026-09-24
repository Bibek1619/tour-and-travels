"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  MapPin,
  FileText,
  List,
  Image as ImageIcon,
  Upload,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  HelpCircle,
} from "lucide-react";
import FaqEditor from "./faq-editor";

interface RegionOption {
  _id: string;
  name: string;
}

interface ItineraryDay {
  day: number;
  title: string;
  desc: string;
}

interface WizardFormData {
  title: string;
  slug: string;
  category: string;
  location: string;
  difficulty: string;
  region: string;
  durationDays: string;
  price: string;
  maxAltitude: string;
  bestSeason: string;
  included: string;
  shortOverview: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  faqs: { q: string; a: string }[];
  images: string[];
  status: string;
}

export interface WizardInitial {
  _id?: string;
  title?: string;
  slug?: string;
  category?: string;
  location?: string;
  difficulty?: string;
  region?: string | { _id?: string };
  durationDays?: number;
  durationText?: string;
  price?: number;
  maxAltitude?: string;
  bestSeason?: string;
  included?: string[];
  shortOverview?: string;
  highlights?: string[];
  itinerary?: ItineraryDay[];
  faqs?: { q: string; a: string }[];
  images?: string[];
  status?: string;
}

const blankForm = (defaultCategory: string, defaultRegion: string): WizardFormData => ({
  title: "",
  slug: "",
  category: defaultCategory,
  location: "",
  difficulty: "",
  region: defaultRegion ?? "",
  durationDays: "",
  price: "",
  maxAltitude: "",
  bestSeason: "",
  included: "",
  shortOverview: "",
  highlights: [""],
  itinerary: [{ day: 1, title: "", desc: "" }],
  faqs: [],
  images: [""],
  status: "published",
});

function buildForm(
  initial: WizardInitial | undefined,
  defaultCategory: string,
  defaultRegion: string
): WizardFormData {
  if (!initial) return blankForm(defaultCategory, defaultRegion);
  return {
    title: initial.title ?? "",
    slug: initial.slug ?? "",
    category: initial.category ?? defaultCategory,
    location: initial.location ?? "",
    difficulty: initial.difficulty ?? "",
    region:
      typeof initial.region === "object" && initial.region ? initial.region._id ?? "" : initial.region ?? "",
    durationDays:
      initial.durationText ?? initial.durationDays?.toString() ?? "",
    price: initial.price?.toString() ?? "",
    maxAltitude: initial.maxAltitude ?? "",
    bestSeason: initial.bestSeason ?? "",
    included: Array.isArray(initial.included) ? initial.included.join(", ") : "",
    shortOverview: initial.shortOverview ?? "",
    highlights: initial.highlights?.length ? initial.highlights : [""],
    itinerary: initial.itinerary?.length ? initial.itinerary : [{ day: 1, title: "", desc: "" }],
    faqs: initial.faqs?.length ? initial.faqs : [],
    images: initial.images?.length ? initial.images : [""],
    status: initial.status ?? "published",
  };
}

const inputBase =
  "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-shadow";
const selectBase =
  "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-shadow bg-white";

const steps = [
  { id: 1, name: "Basic Info", icon: MapPin },
  { id: 2, name: "Details & Itinerary", icon: FileText },
  { id: 3, name: "Highlights", icon: List },
  { id: 4, name: "Images", icon: ImageIcon },
  { id: 5, name: "FAQ", icon: HelpCircle },
];

export default function CreateTourWizard({
  defaultCategory = "tour",
  listHref,
  defaultRegion,
  initial,
}: {
  defaultCategory?: "tour" | "trek" | "vehicle-tour";
  listHref: string;
  defaultRegion?: string;
  initial?: WizardInitial;
}) {
  const isTrek = defaultCategory === "trek";
  const isEdit = Boolean(initial);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WizardFormData>(() =>
    buildForm(initial, defaultCategory, defaultRegion ?? "")
  );
  const [regions, setRegions] = useState<RegionOption[]>([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formData.category !== "trek") return;
    let cancelled = false;
    fetch("/api/regions")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (!cancelled) setRegions(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setRegions([]);
      });
    return () => {
      cancelled = true;
    };
  }, [formData.category]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (
    index: number,
    field: "title" | "desc" | null,
    value: string,
    type: "itinerary" | "highlights" | "images"
  ) => {
    setFormData((prev) => {
      if (type === "itinerary") {
        const updated = [...prev.itinerary];
        updated[index] = { ...updated[index], [field as "title" | "desc"]: value };
        return { ...prev, itinerary: updated };
      }
      const updated: string[] = [...prev[type]];
      updated[index] = value;
      return { ...prev, [type]: updated };
    });
  };

  const addArrayField = (type: "itinerary" | "highlights" | "images") => {
    setFormData((prev) => {
      if (type === "itinerary") {
        return {
          ...prev,
          itinerary: [
            ...prev.itinerary,
            { day: prev.itinerary.length + 1, title: "", desc: "" },
          ],
        };
      }
      return { ...prev, [type]: [...prev[type], ""] };
    });
  };

  const removeArrayField = (
    index: number,
    type: "itinerary" | "highlights" | "images"
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const uploadFiles = async (files: FileList | File[]) => {
    const valid = Array.from(files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (valid.length === 0) return;
    for (const file of valid) {
      setUploading(true);
      setError("");
      try {
        const data = new FormData();
        data.append("file", file);
        data.append("folder", "tour-travels/tours");
        const res = await fetch("/api/upload", { method: "POST", body: data });
        const json = await res.json();
        if (!res.ok) {
          const msg = json.message || "Failed to upload image";
          setError((prev) => (prev ? `${prev}\n${msg}` : msg));
          continue;
        }
        setFormData((prev) => {
          const images = [...prev.images];
          const lastIndex = images.length - 1;
          if (images[lastIndex] === "") {
            images[lastIndex] = json.url;
          } else {
            images.push(json.url);
          }
          return { ...prev, images };
        });
      } catch {
        setError("Failed to upload image");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) uploadFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) uploadFiles(e.dataTransfer.files);
  };

  const validateStep = (step: number): boolean => {
    setError("");
    switch (step) {
      case 1:
        if (!formData.title || !formData.slug || !formData.difficulty) {
          setError("Please fill in Title, Slug and Difficulty");
          return false;
        }
        return true;
      case 2:
        if (
          !formData.durationDays.trim() ||
          !formData.price ||
          !formData.shortOverview
        ) {
          setError("Please fill in Duration, Price and Short Overview");
          return false;
        }
        return true;
      case 3:
        if (formData.highlights.filter(Boolean).length === 0) {
          setError("Please add at least one highlight");
          return false;
        }
        return true;
      case 4:
        if (formData.images.filter(Boolean).length === 0) {
          setError("Please add at least one image URL");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setError("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    setSaving(true);
    setError("");

    const durationRaw = formData.durationDays.trim();
    const durationNum = durationRaw.match(/^\d+/)?.[0];

    const body = {
      title: formData.title,
      slug: formData.slug || undefined,
      category: formData.category,
      location: formData.location || undefined,
      difficulty: formData.difficulty || undefined,
      region: formData.category === "trek" && formData.region ? formData.region : null,
      durationDays: durationNum ? Number(durationNum) : undefined,
      durationText: /^\d+$/.test(durationRaw)
        ? ""
        : durationRaw || undefined,
      price: formData.price ? Number(formData.price) : undefined,
      maxAltitude: formData.maxAltitude || undefined,
      bestSeason: formData.bestSeason || undefined,
      included: formData.included
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
      shortOverview: formData.shortOverview || undefined,
      highlights: formData.highlights.filter(Boolean),
      itinerary: formData.itinerary.filter((d) => d.title || d.desc),
      faqs: formData.faqs.filter((f) => f.q.trim() || f.a.trim()),
      images: formData.images.filter(Boolean),
      status: formData.status,
    };

    try {
      const res = await fetch(isEdit ? `/api/tours/${initial?._id}` : "/api/tours", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || (isEdit ? "Failed to update" : "Failed to create"));
        return;
      }
      router.push(listHref);
    } catch {
      setError(isEdit ? "Failed to update" : "Failed to create");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <span key={step.id} className="flex flex-col items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  currentStep > step.id
                    ? "bg-green-500 text-white"
                    : currentStep === step.id
                    ? "bg-orange-600 text-white"
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
            </span>
          ))}
        </div>
        <div className="flex items-center mt-4">
          {steps.map((step, index) => (
            <span key={step.id} className="flex items-center flex-1">
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 rounded transition-all ${
                    currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isTrek ? "Trek" : "Tour"} Basic Information
                </h2>
                <p className="text-gray-600">
                  Enter the basic details of your package
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {isTrek ? "Trek" : "Tour"} Title{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder={
                      isTrek
                        ? "e.g., Everest Base Camp Trek"
                        : "e.g., Kathmandu City Tour"
                    }
                    className={inputBase}
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
                    className={inputBase}
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
                    className={selectBase}
                    disabled={isTrek}
                  >
                    {isTrek ? (
                      <option value="trek">Trek</option>
                    ) : (
                      <>
                        <option value="tour">Tour</option>
                        <option value="vehicle-tour">Vehicle Tour</option>
                      </>
                    )}
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
                    className={inputBase}
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
                    className={selectBase}
                  >
                    <option value="">Select</option>
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Challenging">Challenging</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              {formData.category === "trek" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Trek Region
                  </label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className={selectBase}
                  >
                    <option value="">Select Region</option>
                    {regions.map((region) => (
                      <option key={region._id} value={region._id}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                  {regions.length === 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      No regions available. Please add regions first.
                    </p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={selectBase}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isTrek ? "Trek" : "Tour"} Details & Itinerary
                </h2>
                <p className="text-gray-600">
                  Provide detailed information about the package
                </p>
              </div>

              <div className="grid grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duration <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="durationDays"
                    value={formData.durationDays}
                    onChange={handleChange}
                    placeholder="e.g., 7, 2N/3D, 2 Nights / 3 Days"
                    className={inputBase}
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Enter a number (7) or a format like 2N/3D
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price (NPR) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="25000"
                    className={inputBase}
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
                    className={inputBase}
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
                    className={inputBase}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Included (comma separated)
                </label>
                <input
                  type="text"
                  name="included"
                  value={formData.included}
                  onChange={handleChange}
                  placeholder="Guided tour, Meals included, Porter service"
                  className={inputBase}
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
                  className={`${inputBase} resize-y`}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    Itinerary
                  </label>
                  <button
                    type="button"
                    onClick={() => addArrayField("itinerary")}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Add Day
                  </button>
                </div>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {formData.itinerary.map((day, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-orange-600">
                          Day {index + 1}
                        </span>
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
                        onChange={(e) =>
                          handleArrayChange(index, "title", e.target.value, "itinerary")
                        }
                        placeholder="Day title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 text-sm"
                      />
                      <textarea
                        value={day.desc}
                        onChange={(e) =>
                          handleArrayChange(index, "desc", e.target.value, "itinerary")
                        }
                        placeholder="Day description"
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-y"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isTrek ? "Trek" : "Tour"} Highlights
                </h2>
                <p className="text-gray-600">
                  Add key selling points for this package
                </p>
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
                      onChange={(e) =>
                        handleArrayChange(index, null, e.target.value, "highlights")
                      }
                      placeholder="e.g., Stunning Himalayan views"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
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

              <button
                type="button"
                onClick={() => addArrayField("highlights")}
                className="w-full border-2 border-dashed border-gray-300 hover:border-orange-400 hover:bg-orange-50 text-gray-600 hover:text-gray-800 font-medium py-3 rounded-lg transition-colors"
              >
                Add Highlight
              </button>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Add Images
                </h2>
                <p className="text-gray-600">
                  Upload high-quality photos for the {isTrek ? "trek" : "tour"} —
                  the first image is used as the cover
                </p>
              </div>

              <div
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
                  isDragging
                    ? "border-orange-600 bg-orange-50"
                    : "border-gray-300 hover:border-orange-400 hover:bg-gray-50"
                }`}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  {isDragging
                    ? "Drop images here"
                    : "Drag & drop images or click to browse"}
                </p>
                <p className="text-sm text-gray-500">PNG, JPG or WEBP (Max 5MB per image)</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>

              {uploading && (
                <div className="flex items-center gap-2 text-sm text-orange-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading to Cloudinary...
                </div>
              )}

              {formData.images.filter(Boolean).length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    {formData.images.filter(Boolean).length} image
                    {formData.images.filter(Boolean).length !== 1 ? "s" : ""} selected
                  </p>
                  <div className="grid grid-cols-4 gap-4">
                    {formData.images
                      .map((url, index) => ({ url, index }))
                      .filter(({ url }) => url.trim() !== "")
                      .map(({ url, index }) => (
                        <div key={index} className="relative h-32 group rounded-lg border-2 border-gray-200 overflow-hidden">
                          <Image
                            src={url}
                            alt={`Image ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            unoptimized
                            className="object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.borderColor = "red";
                            }}
                            onLoad={(e) => {
                              (e.currentTarget as HTMLImageElement).style.borderColor = "";
                            }}
                          />
                          {index === 0 && (
                            <span className="absolute top-2 left-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded">
                              Cover
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => removeArrayField(index, "images")}
                            className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={image}
                      onChange={(e) =>
                        handleArrayChange(index, null, e.target.value, "images")
                      }
                      placeholder="https://res.cloudinary.com/.../image.jpg"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    />
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField(index, "images")}
                        className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => addArrayField("images")}
                className="w-full border-2 border-dashed border-gray-300 hover:border-orange-400 hover:bg-orange-50 text-gray-600 hover:text-gray-800 font-medium py-3 rounded-lg transition-colors"
              >
                Add Image URL
              </button>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600">
                  Add common questions travelers ask about this{" "}
                  {isTrek ? "trek" : "tour"}
                </p>
              </div>

              <FaqEditor
                value={formData.faqs}
                onChange={(faqs) => setFormData((prev) => ({ ...prev, faqs }))}
              />
            </div>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="inline-flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        {currentStep < 5 ? (
          <button
            onClick={nextStep}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving
              ? "Saving..."
              : isEdit
              ? `Update ${isTrek ? "Trek" : "Tour"}`
              : `Create ${isTrek ? "Trek" : "Tour"}`}
          </button>
        )}
      </div>
    </div>
  );
}