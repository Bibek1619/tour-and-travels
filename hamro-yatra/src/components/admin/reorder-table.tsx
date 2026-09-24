"use client";

import { useState } from "react";
import Image from "next/image";
import { GripVertical, Loader2, Save } from "lucide-react";
import RowActions from "./row-actions";
import { formatDuration } from "@/lib/types";

interface ReorderItem {
  _id: string;
  title?: string;
  images?: string[];
  location?: string;
  durationDays?: number;
  durationText?: string;
  difficulty?: string;
  price?: number;
  status?: string;
}

export default function ReorderTable({
  items,
  baseHref,
  endpoint,
  showDifficulty = false,
  currencyPrefix = "Rs",
  currencyLocale = "en-IN",
  info,
}: {
  items: ReorderItem[];
  baseHref: string;
  endpoint: string;
  showDifficulty?: boolean;
  currencyPrefix?: string;
  currencyLocale?: string;
  info?: { reorderEndpoint: string };
}) {
  const [ordered, setOrdered] = useState<ReorderItem[]>(() => [...items]);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleDragStart = (index: number) => setDragIdx(index);

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (targetIndex: number) => {
    if (dragIdx === null || dragIdx === targetIndex) {
      setDragIdx(null);
      return;
    }
    setOrdered((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIdx, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
    setHasChanges(true);
    setDragIdx(null);
  };

  const handleSave = async () => {
    if (!info) return;
    setSaving(true);
    setSavedMsg(false);
    try {
      const res = await fetch(info.reorderEndpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: ordered.map((i) => i._id) }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        alert(json?.message || "Save failed");
        return;
      }
      setHasChanges(false);
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 3000);
    } catch (error) {
      alert("Save failed: " + (error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    "Title",
    "Location",
    "Duration",
    ...(showDifficulty ? ["Difficulty"] : []),
    "Price",
    "Status",
    "Actions",
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {info && (
        <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            Drag rows to reorder.{" "}
            {hasChanges && (
              <span className="text-orange-600 font-medium">
                You have unsaved changes.
              </span>
            )}
            {savedMsg && (
              <span className="text-green-600 font-medium">Order saved.</span>
            )}
          </p>
          {hasChanges && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Order
            </button>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              <th className="px-3 py-3 w-8" />
              {columns.map((col) => (
                <th
                  key={col}
                  className={`px-6 py-3 ${col === "Actions" ? "text-right" : ""}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ordered.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No items found.
                </td>
              </tr>
            )}
            {ordered.map((item, index) => (
              <tr
                key={item._id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                onDragEnd={() => setDragIdx(null)}
                className={`hover:bg-gray-50 transition-colors ${
                  dragIdx === index ? "bg-orange-50 opacity-60" : ""
                } ${dragIdx !== null && dragIdx !== index ? "border-t-orange-200" : ""}`}
              >
                <td className="px-3 py-4 cursor-grab active:cursor-grabbing">
                  <GripVertical className="h-4 w-4 text-gray-400" />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    {item.images?.[0] && (
                      <div className="relative h-10 w-14 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={item.images[0]}
                          alt=""
                          fill
                          sizes="56px"
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span className="line-clamp-1">{item.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {item.location || "Nepal"}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {formatDuration(item.durationDays, item.durationText)}
                </td>
                {showDifficulty && (
                  <td className="px-6 py-4 text-gray-600">
                    {item.difficulty || "\u2014"}
                  </td>
                )}
                <td className="px-6 py-4 text-gray-600">
                  {currencyPrefix}{" "}
                  {item.price?.toLocaleString(currencyLocale)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.status === "published"
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <RowActions
                    baseHref={`${baseHref}/${item._id}`}
                    endpoint={`${endpoint}/${item._id}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}