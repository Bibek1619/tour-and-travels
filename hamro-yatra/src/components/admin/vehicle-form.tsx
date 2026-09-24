"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Car,
  ChevronLeft,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  Loader2,
  Plus,
  Upload,
  X,
} from "lucide-react";
import FaqEditor from "./faq-editor";

interface VehicleFormValues {
  category: string;
  fuelType: string;
  brand: string;
  model: string;
  name: string;
  dailyRate: string;
  capacity: string;
  luggage: string;
  features: string;
  bestFor: string;
  availableCount: string;
  isAvailable: boolean;
}

export interface VehicleInitial {
  _id?: string;
  category?: string;
  fuelType?: string;
  brand?: string;
  model?: string;
  name?: string;
  dailyRate?: number;
  capacity?: number;
  luggage?: string;
  features?: string[];
  bestFor?: string;
  availableCount?: number;
  isAvailable?: boolean;
  images?: string[];
  faqs?: { q: string; a: string }[];
}

const blankForm: VehicleFormValues = {
  category: "",
  fuelType: "",
  brand: "",
  model: "",
  name: "",
  dailyRate: "",
  capacity: "",
  luggage: "",
  features: "",
  bestFor: "",
  availableCount: "",
  isAvailable: true,
};

function buildForm(initial?: VehicleInitial): VehicleFormValues {
  if (!initial) return blankForm;
  return {
    category: initial.category ?? "",
    fuelType: initial.fuelType ?? "",
    brand: initial.brand ?? "",
    model: initial.model ?? "",
    name: initial.name ?? "",
    dailyRate: initial.dailyRate?.toString() ?? "",
    capacity: initial.capacity?.toString() ?? "",
    luggage: initial.luggage ?? "",
    features: initial.features?.length ? initial.features.join(", ") : "",
    bestFor: initial.bestFor ?? "",
    availableCount: initial.availableCount?.toString() ?? "1",
    isAvailable: initial.isAvailable ?? true,
  };
}

const fieldClass =
  "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-shadow text-gray-900";
const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

function Section({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: typeof Car;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="bg-orange-100 rounded-xl p-2.5">
            <Icon className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        </div>
        <p className="text-sm text-gray-500 mb-6">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}

export default function VehicleForm({
  initial,
  endpoint,
  listHref,
}: {
  initial?: VehicleInitial;
  endpoint: string;
  listHref: string;
}) {
  const isEdit = Boolean(initial);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<VehicleFormValues>(() =>
    buildForm(initial)
  );
  const [images, setImages] = useState<string[]>(
    initial?.images?.length ? initial.images : [""]
  );
  const [faqs, setFaqs] = useState<{ q: string; a: string }[]>(
    initial?.faqs?.length ? initial.faqs : []
  );
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initial?.images?.length) setImages(initial.images);
  }, [initial]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: target.type === "checkbox" ? target.checked : value,
    }));
  };

  const uploadFiles = async (files: FileList | File[]) => {
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (valid.length === 0) return;
    for (const file of valid) {
      setUploading(true);
      setError("");
      try {
        const data = new FormData();
        data.append("file", file);
        data.append("folder", "tour-travels/vehicles");
        const res = await fetch("/api/upload", { method: "POST", body: data });
        const json = await res.json();
        if (!res.ok) {
          setError(json.message || "Failed to upload image");
          continue;
        }
        setImages((prev) => {
          const next = [...prev];
          const lastIndex = next.length - 1;
          if (next[lastIndex] === "") next[lastIndex] = json.url;
          else next.push(json.url);
          return next;
        });
      } catch {
        setError("Failed to upload image");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) uploadFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) uploadFiles(e.dataTransfer.files);
  };

  const handleImageUrl = (index: number, value: string) => {
    setImages((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addImageUrl = () => {
    setImages((prev) => [...prev, ""]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!formData.name || !formData.category || !formData.fuelType) {
      setError("Please fill in Vehicle Name, Category and Fuel Type");
      return;
    }
    if (images.filter(Boolean).length === 0) {
      setError("Please add at least one image");
      return;
    }

    setSaving(true);
    const body = {
      category: formData.category,
      fuelType: formData.fuelType,
      brand: formData.brand,
      model: formData.model,
      name: formData.name,
      dailyRate: formData.dailyRate ? Number(formData.dailyRate) : undefined,
      capacity: formData.capacity ? Number(formData.capacity) : undefined,
      luggage: formData.luggage,
      bestFor: formData.bestFor,
      features: formData.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
      availableCount: formData.availableCount
        ? Number(formData.availableCount)
        : 1,
      isAvailable: formData.isAvailable,
      images: images.filter(Boolean),
      faqs: faqs.filter((f) => f.q.trim() || f.a.trim()),
    };

    try {
      const res = await fetch(endpoint, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || (isEdit ? "Failed to update vehicle" : "Failed to create vehicle"));
        return;
      }
      router.push(listHref);
    } catch {
      setError(isEdit ? "Failed to update vehicle" : "Failed to create vehicle");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push(listHref)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Vehicles
        </button>
        <button
          type="button"
          onClick={() => router.push(listHref)}
          className="inline-flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Vehicle Details */}
      <Section
        icon={Car}
        title="Vehicle Details"
        subtitle="Core details shown on the vehicle card"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={fieldClass}
              required
            >
              <option value="">Select category</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="jeep">Jeep</option>
              <option value="van">Van</option>
              <option value="bus">Bus</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>
              Fuel Type <span className="text-red-500">*</span>
            </label>
            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className={fieldClass}
              required
            >
              <option value="">Select fuel</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>
              Brand <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Toyota, Honda..."
              className={fieldClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>
              Model <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="Hiace, Fortuner..."
              className={fieldClass}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>
              Vehicle Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Toyota Hiace Deluxe Van"
              className={fieldClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>
              Daily Rate (USD) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="dailyRate"
              value={formData.dailyRate}
              onChange={handleChange}
              placeholder="85"
              className={fieldClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>
              Passenger Capacity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="10"
              className={fieldClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Luggage</label>
            <input
              type="text"
              name="luggage"
              value={formData.luggage}
              onChange={handleChange}
              placeholder="5 bags"
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Best For</label>
            <input
              type="text"
              name="bestFor"
              value={formData.bestFor}
              onChange={handleChange}
              placeholder="Family travel, Group tours"
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Available Count</label>
            <input
              type="number"
              name="availableCount"
              value={formData.availableCount}
              onChange={handleChange}
              className={fieldClass}
            />
          </div>
          <div className="flex items-center gap-3 pt-8">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
            />
            <label className="text-sm font-semibold text-gray-700">
              Available for booking
            </label>
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section
        icon={FileText}
        title="Features"
        subtitle="Amenities and features of this vehicle"
      >
        <label className={labelClass}>Features (comma separated)</label>
        <input
          type="text"
          name="features"
          value={formData.features}
          onChange={handleChange}
          placeholder="AC, GPS, Airbags, Music system"
          className={fieldClass}
        />
      </Section>

      {/* Images */}
      <Section
        icon={ImageIcon}
        title="Images"
        subtitle="Manage the photos displayed for this vehicle — the first is the cover"
      >
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-orange-600 bg-orange-50"
              : "border-gray-300 hover:border-orange-400 hover:bg-orange-50"
          }`}
        >
          <Upload className="w-10 h-10 mx-auto mb-3 text-gray-400" />
          <p className="text-base font-semibold text-gray-700 mb-1">
            {isDragging ? "Drop images here" : "Click to upload images"}
          </p>
          <p className="text-sm text-gray-500">PNG, JPG or WEBP (Max 5MB per image)</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </div>

        {uploading && (
          <div className="flex items-center gap-2 text-sm text-orange-600 mt-4">
            <Loader2 className="w-4 h-4 animate-spin" />
            Uploading to Cloudinary...
          </div>
        )}

        {images.filter(Boolean).length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              {images.filter(Boolean).length} image
              {images.filter(Boolean).length !== 1 ? "s" : ""} selected
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images
                .map((url, index) => ({ url, index }))
                .filter(({ url }) => url.trim() !== "")
                .map(({ url, index }) => (
                  <div key={index} className="relative h-32 group rounded-xl overflow-hidden border-2 border-gray-200">
                    <Image
                      src={url}
                      alt={`Vehicle image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      unoptimized
                      className="object-cover"
                    />
                    {index === 0 && (
                      <span className="absolute top-2 left-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded">
                        Cover
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="space-y-3 mt-6">
          {images.map((image, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                value={image}
                onChange={(e) => handleImageUrl(index, e.target.value)}
                placeholder="https://res.cloudinary.com/.../image.jpg"
                className={fieldClass}
              />
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
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
          onClick={addImageUrl}
          className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-orange-600 hover:text-orange-700"
        >
          <Plus className="w-4 h-4" />
          Add Image URL
        </button>
      </Section>

      {/* FAQ */}
      <Section
        icon={HelpCircle}
        title="Frequently Asked Questions"
        subtitle="Common questions about this vehicle shown on the vehicle page"
      >
        <FaqEditor
          value={faqs}
          onChange={(next) => setFaqs(next)}
        />
      </Section>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <div className="flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-8 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {saving
            ? "Saving..."
            : isEdit
            ? "Update Vehicle"
            : "Create Vehicle"}
        </button>
      </div>
    </form>
  );
}