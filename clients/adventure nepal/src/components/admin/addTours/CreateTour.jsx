import React, { useState, useRef, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createTourApi } from "@/api/tourApi";

// ── Shared style constants ───────────────────────────────────────────
const inputBase =
  "w-full h-10 px-3 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg outline-none transition-all duration-150 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 placeholder:text-gray-400 hover:border-gray-300";
const selectBase =
  "w-full h-10 px-3 pr-9 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg outline-none transition-all duration-150 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 appearance-none cursor-pointer hover:border-gray-300";
const textareaBase =
  "w-full px-3 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg outline-none transition-all duration-150 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 resize-y leading-relaxed placeholder:text-gray-400 hover:border-gray-300";
const labelBase =
  "block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider";

// ── Sub-components defined OUTSIDE to prevent remount on parent re-render ──
const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-5 pb-4 border-b border-gray-100">
    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">{title}</h2>
    {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
    {children}
  </div>
);

const SelectArrow = () => (
  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-400">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </div>
);

const XIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const AddBtn = ({ onClick, label }) => (
  <button
    type="button"
    onMouseDown={(e) => e.preventDefault()}
    onClick={onClick}
    className="inline-flex items-center gap-1.5 h-8 px-3.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 hover:border-emerald-300 rounded-lg transition-all duration-150"
  >
    <PlusIcon /> {label}
  </button>
);

// ── Main Component ───────────────────────────────────────────────────
const CreateTour = () => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "tour",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addImages = useCallback((files) => {
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const withPreview = valid.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).slice(2),
    }));
    setImageFiles((prev) => [...prev, ...withPreview]);
  }, []);

  const handleImageAdd = (e) => {
    addImages(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addImages(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setIsDragging(false);
  };

  const handleZoneClick = (e) => {
    if (e.target === e.currentTarget || e.target.dataset.zoneBg) {
      fileInputRef.current?.click();
    }
  };

  const removeImage = (id) => {
    setImageFiles((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter((i) => i.id !== id);
    });
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
        itinerary: [
          ...prev.itinerary,
          { day: prev.itinerary.length + 1, title: "", desc: "" },
        ],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        highlights: [...prev.highlights, ""],
      }));
    }
  };

  const removeArrayField = (index, type = "itinerary") => {
    setFormData((prev) => {
      const updated = [...prev[type]];
      updated.splice(index, 1);
      return { ...prev, [type]: updated };
    });
  };

  const createTourMutation = useMutation({
    mutationFn: (form) => createTourApi(form),
    onSuccess: () => {
      toast.success("Tour published successfully");
      navigate("/admin/dashboard");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to publish tour");
    },
  });

  const handleSubmit = () => {
    const form = new FormData();
    ["title","slug","category","location","difficulty","durationDays","price","maxAltitude","bestSeason","shortOverview"]
      .forEach((key) => form.append(key, formData[key]));
    form.append("status", "published");
    formData.features.split(",").map((f) => f.trim()).filter(Boolean).forEach((f) => form.append("features", f));
    formData.highlights.filter(Boolean).forEach((h) => form.append("highlights", h));
    formData.itinerary.forEach((day) => form.append("itinerary", JSON.stringify(day)));
    imageFiles.forEach(({ file }) => form.append("images", file));
    createTourMutation.mutate(form);
  };

  return (
    <div className="min-h-screen bg-gray-50/80">
      <div className="max-w-2xl mx-auto py-10 px-4">

        {/* ── Page Header ─────────────────────────────────────────── */}
        <div className="mb-8 flex items-start gap-4">
          <div className="mt-0.5 w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">Create New Tour</h1>
            <p className="text-sm text-gray-500 mt-0.5">Fill in the details below to publish your tour listing</p>
          </div>
        </div>

        {/* ── Basic Information ────────────────────────────────────── */}
        <Card>
          <SectionHeader title="Basic Information" />
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelBase}>Tour Title</label>
              <input className={inputBase} name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Everest Base Camp Trek" />
            </div>
            <div>
              <label className={labelBase}>Slug</label>
              <input className={inputBase} name="slug" value={formData.slug} onChange={handleChange} placeholder="everest-base-camp-trek" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelBase}>Category</label>
              <div className="relative">
                <select className={selectBase} value={formData.category} onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}>
                  <option value="tour">Tour</option>
                  <option value="trek">Trek</option>
                  <option value="vehicle-tour">Vehicle Tour</option>
                </select>
                <SelectArrow />
              </div>
            </div>
            <div>
              <label className={labelBase}>Location</label>
              <input className={inputBase} name="location" value={formData.location} onChange={handleChange} placeholder="Solukhumbu, Nepal" />
            </div>
            <div>
              <label className={labelBase}>Difficulty</label>
              <div className="relative">
                <select className={selectBase} name="difficulty" value={formData.difficulty} onChange={handleChange}>
                  <option value="">Select level</option>
                  <option>Easy</option>
                  <option>Moderate</option>
                  <option>Challenging</option>
                  <option>Strenuous</option>
                </select>
                <SelectArrow />
              </div>
            </div>
          </div>
        </Card>

        {/* ── Tour Details ─────────────────────────────────────────── */}
        <Card>
          <SectionHeader title="Tour Details" />
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className={labelBase}>Duration (Days)</label>
              <input className={inputBase} type="number" name="durationDays" value={formData.durationDays} onChange={handleChange} placeholder="14" />
            </div>
            <div>
              <label className={labelBase}>Price (USD)</label>
              <input className={inputBase} type="number" name="price" value={formData.price} onChange={handleChange} placeholder="1200" />
            </div>
            <div>
              <label className={labelBase}>Max Altitude</label>
              <input className={inputBase} name="maxAltitude" value={formData.maxAltitude} onChange={handleChange} placeholder="5364m" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelBase}>Best Season</label>
              <input className={inputBase} name="bestSeason" value={formData.bestSeason} onChange={handleChange} placeholder="March–May, Sep–Nov" />
            </div>
            <div>
              <label className={labelBase}>Features</label>
              <input className={inputBase} name="features" value={formData.features} onChange={handleChange} placeholder="Guided, Meals, Porter (comma separated)" />
            </div>
          </div>
          <div>
            <label className={labelBase}>Short Overview</label>
            <textarea
              className={textareaBase}
              name="shortOverview"
              value={formData.shortOverview}
              onChange={handleChange}
              rows={4}
              placeholder="A compelling overview of this tour — what makes it special and what travellers can expect…"
            />
          </div>
        </Card>

        {/* ── Highlights ───────────────────────────────────────────── */}
        <Card>
          <SectionHeader title="Highlights" subtitle="Key selling points for this tour" />
          <div className="space-y-2.5 mb-4">
            {formData.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[10px] font-bold text-emerald-600">
                  {i + 1}
                </span>
                <input
                  className={inputBase}
                  value={h}
                  onChange={(e) => handleArrayChange(i, null, e.target.value, "highlights")}
                  placeholder="e.g. Panoramic Himalayan views from Kala Patthar"
                />
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => removeArrayField(i, "highlights")}
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <XIcon />
                </button>
              </div>
            ))}
          </div>
          <AddBtn onClick={() => addArrayField("highlights")} label="Add Highlight" />
        </Card>

        {/* ── Itinerary ────────────────────────────────────────────── */}
        <Card>
          <SectionHeader title="Itinerary" subtitle="Day-by-day breakdown of the tour" />
          <div className="space-y-3 mb-4">
            {formData.itinerary.map((day, i) => (
              <div key={i} className="relative bg-gray-50 border border-gray-200 rounded-xl p-4 group">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => removeArrayField(i)}
                  className="absolute top-3.5 right-3.5 w-6 h-6 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-all opacity-0 group-hover:opacity-100"
                >
                  <XIcon size={13} />
                </button>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center h-5 px-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full uppercase tracking-wider">
                    Day {i + 1}
                  </span>
                </div>
                <div className="mb-2.5">
                  <label className={labelBase}>Title</label>
                  <input
                    className={inputBase}
                    value={day.title}
                    onChange={(e) => handleArrayChange(i, "title", e.target.value)}
                    placeholder="e.g. Fly to Lukla & Trek to Phakding"
                  />
                </div>
                <div>
                  <label className={labelBase}>Description</label>
                  <textarea
                    className={textareaBase}
                    rows={3}
                    value={day.desc}
                    onChange={(e) => handleArrayChange(i, "desc", e.target.value)}
                    placeholder="Describe the route, activities, meals, and overnight stay for this day…"
                  />
                </div>
              </div>
            ))}
          </div>
          <AddBtn onClick={() => addArrayField("itinerary")} label="Add Day" />
        </Card>

        {/* ── Upload Images ────────────────────────────────────────── */}
        <Card>
          <SectionHeader title="Images" subtitle="Upload high-quality photos for this tour" />

          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleZoneClick}
            className={`relative flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all duration-200 mb-4 select-none ${
              isDragging
                ? "border-emerald-400 bg-emerald-50/60"
                : "border-gray-200 bg-gray-50 hover:border-emerald-300 hover:bg-emerald-50/30"
            }`}
          >
            <div
              data-zone-bg="true"
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 pointer-events-none ${isDragging ? "bg-emerald-100" : "bg-white border border-gray-200"}`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={isDragging ? "text-emerald-500" : "text-gray-400"}>
                <polyline points="16 16 12 12 8 16" />
                <line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
            </div>
            <div data-zone-bg="true" className="text-center pointer-events-none">
              <p className="text-sm font-semibold text-gray-800">
                {isDragging ? "Drop images here" : "Drag & drop or click to upload"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">PNG, JPG or WEBP · Multiple files supported</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageAdd}
            />
          </div>

          {/* Image Grid Preview */}
          {imageFiles.length > 0 && (
            <>
              <div className="grid grid-cols-4 gap-2.5">
                {imageFiles.map(({ id, preview, file }, index) => (
                  <div key={id} className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-100 aspect-square shadow-sm">
                    {index === 0 && (
                      <div className="absolute top-1.5 left-1.5 z-10 h-4 px-1.5 bg-emerald-500 rounded text-[9px] font-bold text-white uppercase tracking-wide flex items-center">
                        Cover
                      </div>
                    )}
                    <img src={preview} alt={file.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200" />
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => removeImage(id)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 hover:bg-red-500 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10"
                    >
                      <XIcon size={10} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <p className="text-[9px] text-white/90 truncate font-medium">{file.name}</p>
                      <p className="text-[8px] text-white/60">{(file.size / 1024).toFixed(0)} KB</p>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-1 aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-emerald-300 bg-gray-50 hover:bg-emerald-50/30 transition-all duration-150"
                >
                  <div className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center pointer-events-none">
                    <PlusIcon />
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium pointer-events-none">Add more</span>
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {imageFiles.length} image{imageFiles.length !== 1 ? "s" : ""} selected · First image will be used as cover
              </p>
            </>
          )}
        </Card>

        {/* ── Publish Footer ───────────────────────────────────────── */}
        <div className="pt-2 pb-10">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={createTourMutation.isPending}
            className="w-full h-12 px-6 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {createTourMutation.isPending ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                Publishing…
              </>
            ) : (
              <>
                Publish Tour
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateTour;