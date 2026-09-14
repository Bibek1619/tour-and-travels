"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload } from "lucide-react";
import {
  type FieldDef,
  type FieldGroup,
  getPath,
  setPath,
} from "@/lib/admin-config";

type FieldValues = Record<string, string | boolean>;

interface FieldOption {
  value: string;
  label: string;
}

export function AdminEditForm({
  entity,
  groups,
  initial,
  endpoint,
  listHref,
  method = "PUT",
  tabs = false,
  dynamicOptions = {},
}: {
  entity: string;
  groups: FieldGroup[];
  initial: Record<string, unknown>;
  endpoint: string;
  listHref: string;
  method?: "PUT" | "POST";
  tabs?: boolean;
  dynamicOptions?: Record<string, FieldOption[]>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<FieldValues>(() => buildValues(groups, initial));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const allFields = groups.flatMap((g) => g.fields);

  const setValue = (name: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    const body: Record<string, unknown> = {};
    for (const field of allFields) {
      const raw = values[field.name] ?? "";
      const parsed = parseField(field, raw);
      if (parsed !== undefined && parsed !== null) setPath(body, field.name, parsed);
    }

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || "Update failed");
        return;
      }
      setSuccess("Saved successfully. Redirecting...");
      setTimeout(() => router.push(listHref), 600);
    } catch {
      setError("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {tabs && groups.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {groups.map((group, i) => (
            <button
              key={group.title}
              type="button"
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === i
                  ? "bg-orange-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-orange-300"
              }`}
            >
              {group.title}
            </button>
          ))}
        </div>
      )}

      {groups.map((group, i) =>
        !tabs || i === activeTab ? (
          <div
            key={group.title}
            className="bg-white rounded-xl border border-gray-200"
          >
            <div className="border-b px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {group.title}
              </h2>
            </div>
            <div className="p-6 grid gap-5 md:grid-cols-2">
              {group.fields.map((field) => (
                <FieldInput
                  key={field.name}
                  field={field}
                  value={values[field.name]}
                  options={
                    field.dynamic
                      ? dynamicOptions[field.dynamic]
                      : field.options
                  }
                  onChange={(v) => setValue(field.name, v)}
                />
              ))}
            </div>
          </div>
        ) : null
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
          {success}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {method === "POST" ? `Create ${entity}` : `Save ${entity}`}
        </button>
        <button
          type="button"
          onClick={() => router.push(listHref)}
          className="text-gray-600 hover:text-gray-800 font-medium px-4 py-2.5"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function buildValues(
  groups: FieldGroup[],
  initial: Record<string, unknown>
): FieldValues {
  const values: FieldValues = {};
  for (const group of groups) {
    for (const field of group.fields) {
      const raw = getPath(initial, field.name) as unknown;
      if (field.type === "checkbox") {
        values[field.name] = raw === true || raw === "true";
      } else if (field.type === "date") {
        if (raw == null) {
          values[field.name] = "";
        } else {
          const d = new Date(raw as string);
          values[field.name] = isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
        }
      } else if (field.type === "list" || field.type === "images") {
        values[field.name] = Array.isArray(raw) ? raw.join("\n") : "";
      } else if (field.type === "rows") {
        values[field.name] = Array.isArray(raw)
          ? raw
              .map((row) =>
                (field.columns ?? [])
                  .map((c) => row?.[c.key] ?? "")
                  .join("\t")
              )
              .join("\n")
          : "";
      } else if (raw != null) {
        values[field.name] = String(raw);
      } else {
        values[field.name] = "";
      }
    }
  }
  return values;
}

function parseField(field: FieldDef, raw: string | boolean): unknown {
  switch (field.type) {
    case "number": {
      const v = Number(raw);
      return raw === "" || isNaN(v) ? undefined : v;
    }
    case "checkbox":
      return raw === true;
    case "date":
      return raw ? new Date(raw as string).toISOString() : undefined;
    case "list":
    case "images":
      return (raw as string)
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
    case "rows":
      return (raw as string)
        .split("\n")
        .map((line) => line.split("\t"))
        .filter((parts) => parts.some((p) => p.trim() !== ""))
        .map((parts) => {
          const row: Record<string, string> = {};
          (field.columns ?? []).forEach((col, i) => {
            row[col.key] = parts[i]?.trim() ?? "";
          });
          return row;
        });
    default:
      return typeof raw === "string" && raw.trim() === "" ? undefined : raw;
  }
}

function MediaFieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: string;
  onChange: (v: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const isVideo = field.type === "video";

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append(
        "folder",
        field.folder ?? (isVideo ? "tour-travels/videos" : "tour-travels/sections")
      );
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.message || "Upload failed");
        return;
      }
      onChange(json.url);
    } catch {
      setError("Failed to upload file");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const isUrl = typeof value === "string" && /^https?:\/\//.test(value);

  return (
    <div className="md:col-span-2">
      <label
        htmlFor={field.name}
        className="block text-sm font-medium text-gray-700 mb-1.5"
      >
        {field.label}
        {field.required && <span className="text-red-500"> *</span>}
      </label>

      <div className="flex flex-col gap-3">
        {value && isVideo && isUrl && (
          <video
            src={value}
            controls
            preload="metadata"
            className="w-full max-h-48 rounded-lg border border-gray-200 bg-black"
          />
        )}
        {value && !isVideo && isUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt={field.label}
            className="w-full max-h-48 object-cover rounded-lg border border-gray-200"
          />
        )}
        {value && !isUrl && (
          <p className="text-xs text-gray-400 break-all bg-gray-50 rounded border border-gray-200 px-3 py-2">
            {typeof value === "string" && value.length > 200
              ? value.slice(0, 200) + "…"
              : value}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={fileRef}
            id={`file-${field.name}`}
            type="file"
            accept={isVideo ? "video/mp4,video/webm,video/quicktime" : "image/*"}
            onChange={handleFile}
            className="hidden"
          />
          <label
            htmlFor={`file-${field.name}`}
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer transition-colors"
          >
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            {uploading
              ? `Uploading ${isVideo ? "video" : "image"}...`
              : `Upload ${isVideo ? "Video" : "Image"}`}
          </label>
          {value ? (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-sm text-red-600 hover:text-red-700 font-medium px-3 py-2"
            >
              Remove
            </button>
          ) : null}
        </div>

        <input
          id={field.name}
          type="text"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          placeholder={isVideo ? "or paste video URL" : "or paste image URL"}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
        />

        {field.help && (
          <p className="text-xs text-gray-500">{field.help}</p>
        )}
        {error && (
          <p className="text-xs text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}

function FieldInput({
  field,
  value,
  options,
  onChange,
}: {
  field: FieldDef;
  value: string | boolean | undefined;
  options?: FieldOption[];
  onChange: (v: string | boolean) => void;
}) {
  const label = (
    <label
      htmlFor={field.name}
      className="block text-sm font-medium text-gray-700 mb-1.5"
    >
      {field.label}
      {field.required && <span className="text-red-500"> *</span>}
    </label>
  );

  if (field.type === "image" || field.type === "video") {
    return (
      <MediaFieldInput
        field={field}
        value={typeof value === "string" ? value : ""}
        onChange={(v) => onChange(v)}
      />
    );
  }

  if (field.type === "checkbox") {
    return (
      <div className="md:col-span-2 flex items-center gap-3">
        <input
          id={field.name}
          type="checkbox"
          checked={value === true}
          onChange={(e) => onChange(e.target.checked)}
          className="h-5 w-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
        />
        <span className="text-sm font-medium text-gray-700">
          {field.label}
        </span>
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div>
        {label}
        <select
          id={field.name}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
        >
          {(options ?? []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {field.help && (
          <p className="text-xs text-gray-500 mt-1">{field.help}</p>
        )}
      </div>
    );
  }

  if (field.type === "textarea" || field.type === "list" || field.type === "rows" || field.type === "images") {
    const rows = field.type === "textarea" ? 4 : field.type === "rows" ? 6 : 4;
    return (
      <div className="md:col-span-2">
        {label}
        <textarea
          id={field.name}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
        />
        {field.help && (
          <p className="text-xs text-gray-500 mt-1">{field.help}</p>
        )}
      </div>
    );
  }

  if (field.type === "date") {
    return (
      <div>
        {label}
        <input
          id={field.name}
          type="date"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
        />
      </div>
    );
  }

  return (
    <div>
      {label}
      <input
        id={field.name}
        type={field.type === "number" ? "number" : "text"}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
      />
    </div>
  );
}

export default AdminEditForm;