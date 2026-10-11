"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Filter,
  Check,
  RotateCcw,
  Star,
} from "lucide-react";

interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  bannerImage?: string | null;
}

interface ProductItem {
  id: string;
  slug: string;
  name: string;
  shortDesc?: string | null;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  category?: { name: string; slug: string };
  brand?: { name: string; slug: string };
  images: { url: string }[];
  variants: {
    id: string;
    sku: string;
    sizeOrWeight: string;
    flavor?: string | null;
    price: number;
    mrp: number;
    discountPercent: number;
    stock: number;
    freebieText?: string | null;
  }[];
}

interface CategoryListingClientProps {
  category: CategoryData;
  initialProducts: ProductItem[];
  availableBrands: string[];
}

export function CategoryListingClient({
  category,
  initialProducts,
  availableBrands,
}: CategoryListingClientProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Toggle brand
  const handleToggleBrand = (brandName: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName) ? prev.filter((b) => b !== brandName) : [...prev, brandName]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedBrands([]);
    setPriceRange("all");
    setMinRating(0);
    setSortBy("featured");
  };

  // Computed filtered & sorted products
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Brand filter
      if (selectedBrands.length > 0 && product.brand) {
        if (!selectedBrands.includes(product.brand.name)) return false;
      }

      // Rating filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      // Price filter based on lowest variant price
      const lowestPrice = product.variants[0]?.price || 0;
      if (priceRange === "under-1000" && lowestPrice >= 1000) return false;
      if (priceRange === "1000-3000" && (lowestPrice < 1000 || lowestPrice > 3000)) return false;
      if (priceRange === "3000-7000" && (lowestPrice < 3000 || lowestPrice > 7000)) return false;
      if (priceRange === "above-7000" && lowestPrice <= 7000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price_asc") {
        return (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0);
      }
      if (sortBy === "price_desc") {
        return (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0);
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      if (sortBy === "discount") {
        const discA = a.variants[0]?.discountPercent || 0;
        const discB = b.variants[0]?.discountPercent || 0;
        return discB - discA;
      }
      return 0; // default featured
    });
  }, [initialProducts, selectedBrands, minRating, priceRange, sortBy]);

  const hasActiveFilters = selectedBrands.length > 0 || priceRange !== "all" || minRating > 0;

  return (
    <div className="space-y-6">
      {/* Category Banner & Heading */}
      <div className="rounded-3xl bg-gradient-to-r from-zinc-900 via-[#16161d] to-zinc-900 border border-[#27272f] p-6 sm:p-10 relative overflow-hidden">
        <div className="max-w-2xl">
          <span className="text-xs font-black uppercase tracking-wider text-[#ff5c00]">
            Certified Sports Nutrition
          </span>
          <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
            {category.name}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
            {category.description || "High quality fitness supplements engineered for peak athletic performance."}
          </p>
        </div>
      </div>

      {/* Filter and Sort Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141418] border border-[#27272f] rounded-2xl p-4">
        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold transition"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#ff5c00]" />
            Filters {hasActiveFilters && "(Active)"}
          </button>

          <span className="text-xs text-zinc-400">
            Showing <strong className="text-white">{filteredProducts.length}</strong> products
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-[#ff5c00] hover:underline flex items-center gap-1 font-bold ml-2 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Clear All
            </button>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-zinc-400">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 text-white text-xs font-semibold rounded-xl px-3 py-2 outline-none focus:border-[#ff5c00] cursor-pointer"
          >
            <option value="featured">Popularity / Featured</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>
      </div>

      {/* Main Grid + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block bg-[#141418] border border-[#27272f] rounded-2xl p-5 space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[#ff5c00]" /> Filter Options
            </h3>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-[11px] text-[#ff5c00] hover:underline font-bold"
              >
                Reset
              </button>
            )}
          </div>

          {/* Price Range */}
          <div>
            <h4 className="text-xs font-bold text-zinc-300 mb-2.5 uppercase tracking-wide">
              Price Range
            </h4>
            <div className="space-y-1.5 text-xs text-zinc-400">
              {[
                { label: "All Prices", value: "all" },
                { label: "Under ₹1,000", value: "under-1000" },
                { label: "₹1,000 to ₹3,000", value: "1000-3000" },
                { label: "₹3,000 to ₹7,000", value: "3000-7000" },
                { label: "Above ₹7,000", value: "above-7000" },
              ].map((range) => (
                <label
                  key={range.value}
                  className="flex items-center gap-2 cursor-pointer hover:text-white transition py-0.5"
                >
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === range.value}
                    onChange={() => setPriceRange(range.value)}
                    className="accent-[#ff5c00]"
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand Checklist */}
          {availableBrands.length > 0 && (
            <div className="pt-4 border-t border-zinc-800">
              <h4 className="text-xs font-bold text-zinc-300 mb-2.5 uppercase tracking-wide">
                Brands
              </h4>
              <div className="space-y-1.5 text-xs text-zinc-400">
                {availableBrands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-2 cursor-pointer hover:text-white transition py-0.5"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleToggleBrand(brand)}
                      className="accent-[#ff5c00] rounded"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Customer Rating Filter */}
          <div className="pt-4 border-t border-zinc-800">
            <h4 className="text-xs font-bold text-zinc-300 mb-2.5 uppercase tracking-wide">
              Customer Rating
            </h4>
            <div className="space-y-1.5 text-xs text-zinc-400">
              {[
                { label: "Any Rating", val: 0 },
                { label: "4.5★ & Above", val: 4.5 },
                { label: "4.0★ & Above", val: 4.0 },
              ].map((r) => (
                <label
                  key={r.val}
                  className="flex items-center gap-2 cursor-pointer hover:text-white transition py-0.5"
                >
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === r.val}
                    onChange={() => setMinRating(r.val)}
                    className="accent-[#ff5c00]"
                  />
                  <span className="flex items-center gap-1">
                    {r.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Cards Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-[#141418] border border-[#27272f] rounded-2xl p-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
                <Filter className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white">No products match your selected filters</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Try loosening your price or brand parameters to see available supplements in this range.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-5 py-2 bg-[#ff5c00] hover:bg-[#e05200] text-white text-xs font-bold rounded-xl transition mt-2 cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p as any} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm lg:hidden">
          <div className="w-full max-w-xs bg-[#141418] border-l border-[#27272f] h-full flex flex-col p-6 space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-black uppercase text-white">Filters</h3>
              <button
                type="button"
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Price Filter */}
            <div>
              <h4 className="text-xs font-bold text-zinc-300 mb-2 uppercase">Price Range</h4>
              <div className="space-y-2 text-xs text-zinc-400">
                {[
                  { label: "All Prices", value: "all" },
                  { label: "Under ₹1,000", value: "under-1000" },
                  { label: "₹1,000 to ₹3,000", value: "1000-3000" },
                  { label: "₹3,000 to ₹7,000", value: "3000-7000" },
                  { label: "Above ₹7,000", value: "above-7000" },
                ].map((range) => (
                  <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="m_price"
                      checked={priceRange === range.value}
                      onChange={() => setPriceRange(range.value)}
                      className="accent-[#ff5c00]"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            {availableBrands.length > 0 && (
              <div className="pt-4 border-t border-zinc-800">
                <h4 className="text-xs font-bold text-zinc-300 mb-2 uppercase">Brands</h4>
                <div className="space-y-2 text-xs text-zinc-400">
                  {availableBrands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleToggleBrand(brand)}
                        className="accent-[#ff5c00] rounded"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-zinc-800 flex gap-3 mt-auto">
              <button
                type="button"
                onClick={resetFilters}
                className="flex-1 py-2.5 bg-zinc-800 text-xs font-bold rounded-xl text-zinc-300"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsFilterDrawerOpen(false)}
                className="flex-1 py-2.5 bg-[#ff5c00] text-xs font-black uppercase text-white rounded-xl"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
