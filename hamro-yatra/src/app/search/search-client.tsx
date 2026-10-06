"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, Car, Mountain, Compass, Zap, Loader2, ChevronRight, Star, Clock, MapPin } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  category: "vehicle" | "tour" | "trek" | "adventure";
  url: string;
  image?: string;
}

const categoryIcons = {
  vehicle: Car,
  tour: Compass,
  trek: Mountain,
  adventure: Zap,
};

const categoryLabels = {
  vehicle: "Vehicle Rentals",
  tour: "Tour Packages",
  trek: "Trekking Packages",
  adventure: "Adventure Activities",
};

const categoryColors = {
  vehicle: "text-orange-600",
  tour: "text-blue-600",
  trek: "text-green-600",
  adventure: "text-purple-600",
};

export default function SearchClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(query);

  // Perform search
  useEffect(() => {
    const performSearch = async () => {
      if (!searchTerm.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [searchTerm]);

  // Update search term from URL params
  useEffect(() => {
    if (query) {
      setSearchTerm(query);
    }
  }, [query]);

  // Group results by category
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-gradient-to-br from-orange-50 to-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Search
          </h1>
          <p className="text-gray-600 mb-8">
            Find tours, treks, adventures, and vehicle rentals
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-3 max-w-3xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for destinations, tours, treks, or vehicles..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-base shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-semibold shadow-sm"
            >
              Search
            </button>
          </form>

          {/* Results count */}
          {searchTerm && !loading && (
            <p className="mt-4 text-sm text-gray-600">
              {results.length > 0
                ? `${results.length} result${results.length === 1 ? "" : "s"} for "${searchTerm}"`
                : `No results for "${searchTerm}"`}
            </p>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
            <span className="ml-3 text-gray-600 text-lg">Searching...</span>
          </div>
        ) : !searchTerm.trim() ? (
          <div className="text-center py-20">
            <Search className="w-20 h-20 mx-auto mb-6 text-gray-300" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Start your search
            </h2>
            <p className="text-gray-600 mb-8">
              Search for destinations, tours, treks, or vehicles
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="text-sm text-gray-500 self-center">Popular:</span>
              {["Ghandruk", "Kathmandu", "Scorpio", "Annapurna", "Pokhara"].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchTerm(term)}
                  className="px-4 py-2 bg-white border-2 border-gray-200 rounded-full text-sm font-medium hover:border-orange-500 hover:text-orange-600 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-20 h-20 mx-auto mb-6 text-gray-300" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              No results found
            </h2>
            <p className="text-gray-600 mb-8">
              Try different keywords or browse our categories
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/vehicles"
                className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-semibold"
              >
                Browse Vehicles
              </Link>
              <Link
                href="/tours"
                className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-orange-500 hover:text-orange-600 transition-colors font-semibold"
              >
                Browse Tours
              </Link>
              <Link
                href="/trek-packages"
                className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-orange-500 hover:text-orange-600 transition-colors font-semibold"
              >
                Browse Treks
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedResults).map(([category, items]) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons];
              const label = categoryLabels[category as keyof typeof categoryLabels];
              const colorClass = categoryColors[category as keyof typeof categoryColors];

              return (
                <div key={category}>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-8">
                    <Icon className={`w-6 h-6 ${colorClass}`} />
                    <h2 className="text-3xl font-bold text-gray-900">{label}</h2>
                    <span className="text-sm text-gray-500 ml-auto">({items.length} results)</span>
                  </div>

                  {/* Results Grid - Category-specific Card Designs */}
                  {category === "tour" || category === "trek" ? (
                    /* Tour & Trek Cards */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {items.map((result) => (
                        <Link key={result.id} href={result.url}>
                          <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                            <div className="relative h-64 overflow-hidden group">
                              <Image
                                src={result.image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"}
                                alt={result.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                                Popular
                              </div>
                            </div>
                            <div className="p-6">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center gap-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                                  ))}
                                </div>
                                <span className="font-bold text-gray-900">4.0</span>
                              </div>
                              <h3 className="font-bold text-xl text-gray-800 mb-4 line-clamp-2 hover:text-orange-600 transition-colors">
                                {result.title}
                              </h3>
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pb-4 border-b">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-orange-600" />
                                  <span>Nepal</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-orange-600" />
                                  <span className="font-semibold">Varies</span>
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                                {result.description || `Explore Nepal with this amazing ${category} package.`}
                              </p>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-[11px] text-amber-600 font-medium mb-1">
                                    Price varies with group size
                                  </p>
                                  <p className="text-sm text-gray-500">Starting from</p>
                                  <p className="text-2xl font-bold text-orange-600">
                                    Contact
                                    <span className="text-sm font-normal text-gray-500"> / person</span>
                                  </p>
                                </div>
                                <span className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2 text-sm">
                                  View Details
                                  <ChevronRight className="h-4 w-4" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : category === "vehicle" ? (
                    /* Vehicle Cards - Scorpio Style */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {items.map((result) => (
                        <Link key={result.id} href={result.url} className="block group">
                          <article className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl">
                            <div className="relative m-3 h-52 overflow-hidden rounded-xl bg-gray-100">
                              <Image
                                src={result.image || "/car rent.jpg"}
                                alt={result.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                            </div>
                            <div className="flex flex-col px-5 pb-5 pt-2">
                              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                                From Pokhara
                              </p>
                              <h3 className="mt-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-orange-600">
                                {result.title}
                              </h3>
                              <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-100 pt-4 text-xs font-semibold text-gray-500">
                                <span className="flex items-center gap-1.5">
                                  <MapPin className="h-3.5 w-3.5 text-orange-500" />
                                  Nepal
                                </span>
                                <span className="shrink-0 rounded-full bg-orange-50 px-2.5 py-1 text-orange-700">
                                  View Route
                                </span>
                              </div>
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    /* Adventure Cards - Full Height Image Style */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {items.map((result) => (
                        <Link
                          key={result.id}
                          href={result.url}
                          className="group relative block h-96 rounded-3xl overflow-hidden"
                        >
                          <Image
                            src={result.image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"}
                            alt={result.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-0 left-0 right-0 p-8 transform group-hover:-translate-y-2 transition-transform duration-300">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-10 h-[2px] bg-orange-500" />
                              <span className="text-orange-400 text-xs font-semibold uppercase tracking-widest">
                                Adventure
                              </span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
                              {result.title}
                            </h3>
                            <div className="flex items-center text-white font-medium group-hover:text-orange-400 transition-colors duration-300">
                              Explore Now
                              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
