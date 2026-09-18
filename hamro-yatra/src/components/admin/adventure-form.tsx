"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  List,
  Loader2,
  MapPin,
  Plus,
  Save,
  Star,
  Tag,
  Upload,
  X,
} from "lucide-react";
import FaqEditor from "./faq-editor";

const CATEGORIES = [
  { value: "rafting", label: "White Water Rafting" },
  { value: "kayaking", label: "Kayaking" },
  { value: "paragliding", label: "Paragliding" },
  { value: "bungee", label: "Bungee Jumping" },
  { value: "zipline", label: "Zip Lining" },
  { value: "canyoning", label: "Canyoning" },
];

interface AdventureFormValues {
  name: string;
  category: string;
  location: string;
  duration: string;
  difficulty: string;
  minAge: string;
  price: string;
  bestSeason: string;
  groupSizeMin: string;
  groupSizeMax: string;
  shortDescription: string;
  description: string;
  safetyInfo: string;
  included: string[];
  excluded: string[];
  requirements: string[];
  featured: boolean;
  status: string;
}

export interface AdventureInitial {
  _id?: string;
  name?: string;
  slug?: string;
  category?: string;
  location?: string;
  duration?: string;
  difficulty?: string;
  minAge?: number;
  price?: number;
  bestSeason?: string;
  groupSize?: { min?: number; max?: number };
  shortDescription?: string;
  description?: string;
  safetyInfo?: string;
  included?: string[];
  excluded?: string[];
  requirements?: string[];
  featured?: boolean;
  status?: string;
  images?: string[];
  faqs?: { q: string; a: string }[];
}

const blankForm: AdventureFormValues = {
  name: "",
  category: "rafting",
  location: "",
  duration: "",
  difficulty: "Moderate",
  minAge: "12",
  price: "",
  bestSeason: "",
  groupSizeMin: "1",
  groupSizeMax: "10",
  shortDescription: "",
  description: "",
  safetyInfo: "",
  included: [""],
  excluded: [""],
  requirements: [""],
  featured: false,
  status: "draft",
};

function buildForm(
  initial?: AdventureInitial,
  defaultCategory = "rafting"
): AdventureFormValues {
  if (!initial) return { ...blankForm, category: defaultCategory };
  return {
    name: initial.name ?? "",
    category: initial.category ?? "rafting",
    location: initial.location ?? "",
    duration: initial.duration ?? "",
    difficulty: initial.difficulty ?? "Moderate",
    minAge: initial.minAge?.toString() ?? "12",
    price: initial.price?.toString() ?? "",
    bestSeason: initial.bestSeason ?? "",
    groupSizeMin: initial.groupSize?.min?.toString() ?? "1",
    groupSizeMax: initial.groupSize?.max?.toString() ?? "10",
    shortDescription: initial.shortDescription ?? "",
    description: initial.description ?? "",
    safetyInfo: initial.safetyInfo ?? "",
    included: initial.included?.length ? initial.included : [""],
    excluded: initial.excluded?.length ? initial.excluded : [""],
    requirements: initial.requirements?.length ? initial.requirements : [""],
    featured: initial.featured ?? false,
    status: initial.status ?? "draft",
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
  icon: typeof Tag;
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

interface ListSectionProps {
  type: keyof Pick<AdventureFormValues, "included" | "excluded" | "requirements">;
  label: string;
  placeholder: string;
  required?: boolean;
  formData: AdventureFormValues;
  setFormData: React.Dispatch<React.SetStateAction<AdventureFormValues>>;
}

function ListSection({
  type,
  label,
  placeholder,
  required,
  formData,
  setFormData,
}: ListSectionProps) {
  const items = formData[type];
  const update = (index: number, value: string) => {
    setFormData((prev) => {
      const updated = [...prev[type]];
      updated[index] = value;
      return { ...prev, [type]: updated };
    });
  };
  const add = () => {
    setFormData((prev) => ({ ...prev, [type]: [...prev[type], ""] }));
  };
  const remove = (index: number) => {
    setFormData((prev) => {
      const updated = [...prev[type]];
      updated.splice(index, 1);
      return { ...prev, [type]: updated };
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className={labelClass}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 px-3 py-1.5 rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Item
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="text"
              value={item}
              onChange={(e) => update(index, e.target.value)}
              placeholder={placeholder}
              className={fieldClass}
            />
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdventureForm({
  initial,
  endpoint,
  listHref,
  defaultCategory = "rafting",
}: {
  initial?: AdventureInitial;
  endpoint: string;
  listHref: string;
  defaultCategory?: string;
}) {
  const isEdit = Boolean(initial);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<AdventureFormValues>(() =>
    buildForm(initial, defaultCategory)
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
  const [categories, setCategories] = useState(CATEGORIES);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/adventure-categories")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: { slug: string; name: string }[]) => {
        if (cancelled || !data.length) return;
        const options = data.map((c) => ({
          value: c.slug,
          label: c.name,
        }));
        setCategories((prev) => {
          const merged = [...options];
          const selected = prev.find(
            (p) => p.value === formData.category
          );
          if (selected && !options.some((o) => o.value === selected.value)) {
            merged.push(selected);
          }
          return merged;
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initial?.images?.length) setImages(initial.images);
  }, [initial]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
        data.append("folder", "tour-travels/adventures");
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
    if (!formData.name.trim()) {
      setError("Adventure name is required");
      return;
    }
    if (!formData.shortDescription.trim() || !formData.description.trim()) {
      setError("Please fill in the description fields");
      return;
    }
    if (images.filter(Boolean).length === 0) {
      setError("Please add at least one image");
      return;
    }

    setSaving(true);
    const body = {
      name: formData.name,
      category: formData.category,
      location: formData.location,
      duration: formData.duration,
      difficulty: formData.difficulty,
      minAge: formData.minAge ? Number(formData.minAge) : undefined,
      price: formData.price ? Number(formData.price) : undefined,
      bestSeason: formData.bestSeason,
      groupSize: {
        min: formData.groupSizeMin ? Number(formData.groupSizeMin) : 1,
        max: formData.groupSizeMax ? Number(formData.groupSizeMax) : 10,
      },
      shortDescription: formData.shortDescription,
      description: formData.description,
      safetyInfo: formData.safetyInfo,
      included: formData.included.filter(Boolean),
      excluded: formData.excluded.filter(Boolean),
      requirements: formData.requirements.filter(Boolean),
      featured: formData.featured,
      status: formData.status,
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
        setError(json.message || (isEdit ? "Failed to update adventure" : "Failed to create adventure"));
        return;
      }
      router.push(listHref);
    } catch {
      setError(isEdit ? "Failed to update adventure" : "Failed to create adventure");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button
            type="button"
            onClick={() => router.push(listHref)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Adventures
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            {isEdit ? "Edit Adventure" : "Create New Adventure"}
          </h1>
          <p className="text-gray-600">
            {isEdit
              ? "Update the details, descriptions and images of this adventure"
              : "Enter the details of the new adventure"}
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-8 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Adventure"}
        </button>
      </div>

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
              {categories.map((cat) => (
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
              <option value="">None</option>
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
          <div className="md:col-span-2 flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
              />
              <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <Star className="w-4 h-4 text-yellow-500" />
                Mark as Featured
              </span>
            </label>
            <label className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">Status</span>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </label>
          </div>
        </div>
      </Section>

      {/* Pricing & Duration */}
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
          <ListSection
            type="included"
            label="What's Included"
            placeholder="e.g., Professional guide"
            required
            formData={formData}
            setFormData={setFormData}
          />
          <ListSection
            type="excluded"
            label="What's Excluded"
            placeholder="e.g., Personal expenses"
            formData={formData}
            setFormData={setFormData}
          />
          <ListSection
            type="requirements"
            label="Requirements"
            placeholder="e.g., Basic swimming skills"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </Section>

      {/* Images */}
      <Section
        icon={ImageIcon}
        title="Images"
        subtitle="Manage the photos displayed for this adventure — the first is the cover"
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
                  <div key={index} className="relative group rounded-xl overflow-hidden border-2 border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Adventure image ${index + 1}`}
                      className="w-full h-32 object-cover"
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
        subtitle="Common questions about this adventure shown on the package page"
      >
        <FaqEditor value={faqs} onChange={(next) => setFaqs(next)} />
      </Section>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}
    </form>
  );
}