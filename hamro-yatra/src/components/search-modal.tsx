"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Loader2, Car, Mountain, Compass, Zap } from "lucide-react";
import Link from "next/link";

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  category: "vehicle" | "tour" | "trek" | "adventure";
  url: string;
  image?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryIcons = {
  vehicle: Car,
  tour: Compass,
  trek: Mountain,
  adventure: Zap,
};

const categoryLabels = {
  vehicle: "Vehicles",
  tour: "Tours",
  trek: "Treks",
  adventure: "Adventures",
};

const categoryColors = {
  vehicle: "text-orange-600 bg-orange-50",
  tour: "text-blue-600 bg-blue-50",
  trek: "text-green-600 bg-green-50",
  adventure: "text-purple-600 bg-purple-50",
};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Search with debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
        setSelectedIndex(0);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        router.push(results[selectedIndex].url);
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, router, onClose]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      const modal = document.getElementById("search-modal");
      if (modal && !modal.contains(e.target as Node)) {
        onClose();
      }
    };

    setTimeout(() => {
      document.addEventListener("mousedown", handleClick);
    }, 100);

    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Group results by category
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div
        id="search-modal"
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tours, treks, vehicles, adventures..."
            className="flex-1 text-lg outline-none placeholder:text-gray-400"
          />
          {loading && <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />}
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {!query.trim() ? (
            <div className="px-6 py-12 text-center text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">Search for destinations, tours, treks, or vehicles</p>
              <p className="text-xs mt-2 text-gray-400">
                Try "Ghandruk", "Kathmandu", "Scorpio", "Everest"
              </p>
            </div>
          ) : results.length === 0 && !loading ? (
            <div className="px-6 py-12 text-center text-gray-500">
              <p className="text-sm">No results found for "{query}"</p>
              <p className="text-xs mt-2 text-gray-400">
                Try different keywords or browse our{" "}
                <Link href="/tours" className="text-orange-600 hover:underline">
                  tours
                </Link>
                ,{" "}
                <Link href="/trek-packages" className="text-orange-600 hover:underline">
                  treks
                </Link>
                , or{" "}
                <Link href="/vehicles" className="text-orange-600 hover:underline">
                  vehicles
                </Link>
              </p>
            </div>
          ) : (
            <div className="py-2">
              {Object.entries(groupedResults).map(([category, items]) => {
                const Icon = categoryIcons[category as keyof typeof categoryIcons];
                const label = categoryLabels[category as keyof typeof categoryLabels];
                const color = categoryColors[category as keyof typeof categoryColors];

                return (
                  <div key={category} className="mb-4">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${color}`} />
                      {label}
                    </div>
                    {items.map((result, idx) => {
                      const globalIndex = results.findIndex((r) => r.id === result.id);
                      const isSelected = globalIndex === selectedIndex;

                      return (
                        <Link
                          key={result.id}
                          href={result.url}
                          onClick={onClose}
                          className={`block px-4 py-3 hover:bg-gray-50 transition-colors border-l-2 ${
                            isSelected
                              ? "bg-orange-50 border-orange-500"
                              : "border-transparent"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {result.image && (
                              <img
                                src={result.image}
                                alt={result.title}
                                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 truncate">
                                {result.title}
                              </h4>
                              {result.description && (
                                <p className="text-sm text-gray-600 line-clamp-1">
                                  {result.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="px-4 py-3 border-t bg-gray-50 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <kbd className="px-2 py-1 bg-white border rounded font-mono">↑↓</kbd>
              <span>Navigate</span>
              <kbd className="px-2 py-1 bg-white border rounded font-mono">Enter</kbd>
              <span>Select</span>
            </div>
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              onClick={onClose}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              View all results →
            </Link>
          </div>
        )}
        {results.length === 0 && query.trim() && !loading && (
          <div className="px-4 py-3 border-t bg-gray-50 flex items-center justify-end text-xs text-gray-500">
            <kbd className="px-2 py-1 bg-white border rounded font-mono">Esc</kbd>
            <span className="ml-2">Close</span>
          </div>
        )}
      </div>
    </div>
  );
}
