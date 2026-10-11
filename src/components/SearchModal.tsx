"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Loader2, Star, TrendingUp } from "lucide-react";

interface SearchResult {
  id: string;
  name: string;
  slug: string;
  rating: number;
  variants: { price: number; mrp: number; sizeOrWeight: string; flavor?: string }[];
  images: { url: string }[];
  category: { name: string; slug: string };
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Debounced search fetch
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(query.trim())}`);
        const data = await res.json();
        setResults((data.products || []).slice(0, 6));
      } catch (err) {
        console.error("Search fetch failed", err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  if (!isOpen) return null;

  const popularSearches = [
    "Biozyme Whey",
    "Creatine CreAMP",
    "Pre Workout WrathX",
    "High Protein Oats",
    "Omega 3 Fish Oil",
    "Shilajit Resin",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#141418] border border-[#27272f] rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-[#27272f] px-4 py-3">
          <Search className="w-5 h-5 text-zinc-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by supplement name, goal, flavor, or ingredient..."
            className="w-full bg-transparent text-white placeholder-zinc-500 text-sm sm:text-base outline-none"
          />
          {loading && <Loader2 className="w-4 h-4 text-[#ff5c00] animate-spin mr-2 shrink-0" />}
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 text-zinc-400 hover:text-white mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-1 rounded border border-zinc-700"
          >
            ESC
          </button>
        </form>

        {/* Content Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {/* If no query, show trending suggestions */}
          {!query.trim() && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                <TrendingUp className="w-3.5 h-3.5 text-[#ff5c00]" /> Popular Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="text-xs px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-[#27272f] transition cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {results.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Matching Products ({results.length})
              </div>
              <div className="space-y-2">
                {results.map((product) => {
                  const lowestPrice = product.variants[0]?.price || 0;
                  const lowestMrp = product.variants[0]?.mrp || lowestPrice;
                  const discount = lowestMrp > lowestPrice ? Math.round(((lowestMrp - lowestPrice) / lowestMrp) * 100) : 0;

                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-800/80 border border-transparent hover:border-zinc-700 transition group"
                    >
                      <div className="w-14 h-14 rounded-lg bg-zinc-800 overflow-hidden shrink-0 flex items-center justify-center">
                        {product.images[0]?.url ? (
                          <img
                            src={product.images[0].url}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition"
                          />
                        ) : (
                          <div className="text-zinc-600 text-xs">MB</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-zinc-400">
                          {product.category?.name}
                        </div>
                        <div className="text-sm font-bold text-white group-hover:text-[#ff5c00] transition truncate">
                          {product.name}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-sm font-extrabold text-white">
                            ₹{lowestPrice.toLocaleString("en-IN")}
                          </span>
                          {lowestMrp > lowestPrice && (
                            <span className="text-xs text-zinc-500 line-through">
                              ₹{lowestMrp.toLocaleString("en-IN")}
                            </span>
                          )}
                          {discount > 0 && (
                            <span className="text-[10px] font-bold text-green-400">
                              {discount}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-amber-400 font-bold bg-amber-950/40 px-2 py-1 rounded border border-amber-800/40">
                        <Star className="w-3 h-3 fill-amber-400 mr-1" />
                        {product.rating}
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="text-xs font-bold text-[#ff5c00] hover:underline inline-flex items-center gap-1"
                >
                  View all results for &quot;{query}&quot; <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* No results message */}
          {query.trim() && !loading && results.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-sm text-zinc-400">No supplements found matching &quot;{query}&quot;</p>
              <p className="text-xs text-zinc-500 mt-1">
                Try searching for &quot;whey&quot;, &quot;creatine&quot;, &quot;isolate&quot;, or &quot;peanut butter&quot;
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
