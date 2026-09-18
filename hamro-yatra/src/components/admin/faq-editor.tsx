"use client";

import { ChevronDown, ChevronUp, HelpCircle, Plus, X } from "lucide-react";
import type { FaqItem } from "@/lib/types";

const fieldClass =
  "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-shadow text-gray-900";

export default function FaqEditor({
  value,
  onChange,
}: {
  value: FaqItem[];
  onChange: (next: FaqItem[]) => void;
}) {
  const items = value ?? [];

  const update = (index: number, field: "q" | "a", text: string) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: text };
    onChange(next);
  };

  const add = () => {
    onChange([...items, { q: "", a: "" }]);
  };

  const remove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-orange-600" />
          <span className="text-sm font-semibold text-gray-700">
            FAQs ({items.filter((i) => i.q?.trim() || i.a?.trim()).length})
          </span>
        </div>
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 px-3 py-1.5 rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add FAQ
        </button>
      </div>

      <div className="space-y-4">
        {items.length === 0 && (
          <p className="text-sm text-gray-400 bg-gray-50 border border-dashed border-gray-200 rounded-lg px-4 py-6 text-center">
            No FAQs yet. Add a question and answer pair to show a FAQ section
            on this page.
          </p>
        )}

        {items.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-orange-600">
                Question {index + 1}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-200 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Move up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === items.length - 1}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-200 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Move down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Remove FAQ"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={item.q ?? ""}
                onChange={(e) => update(index, "q", e.target.value)}
                placeholder="Question"
                className={fieldClass}
              />
              <textarea
                value={item.a ?? ""}
                onChange={(e) => update(index, "a", e.target.value)}
                placeholder="Answer"
                rows={3}
                className={`${fieldClass} resize-y`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}