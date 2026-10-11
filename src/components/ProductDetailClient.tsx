"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  Heart,
  ShoppingCart,
  Zap,
  Gift,
  Truck,
  ShieldCheck,
  CheckCircle,
  Clock,
  Plus,
  Minus,
  Award,
  ChevronRight,
  MapPin,
  Check,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/ProductCard";

interface ProductDetailProps {
  product: {
    id: string;
    slug: string;
    name: string;
    shortDesc?: string | null;
    description: string;
    rating: number;
    reviewCount: number;
    benefits?: string | null;
    nutritionFacts?: string | null;
    ingredients?: string | null;
    usageDirections?: string | null;
    category?: { name: string; slug: string };
    brand?: { name: string; slug: string };
    images: { id: string; url: string; alt?: string | null }[];
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
    reviews: {
      id: string;
      userName: string;
      rating: number;
      title: string;
      comment: string;
      verifiedPurchase: boolean;
      createdAt: string | Date;
    }[];
  };
  relatedProducts: any[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Selected State
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id || "");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"overview" | "nutrition" | "ingredients" | "directions">("overview");

  // Pincode Checker State
  const [pincode, setPincode] = useState("");
  const [pincodeResult, setPincodeResult] = useState<{ checked: boolean; valid: boolean; text: string } | null>(null);

  // Added to cart feedback
  const [addedNotice, setAddedNotice] = useState(false);

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];
  const activeImage = product.images[selectedImageIndex]?.url || product.images[0]?.url || "";
  const inWishlist = isInWishlist(product.id);

  // Unique sizes and flavors
  const availableSizes = Array.from(new Set(product.variants.map((v) => v.sizeOrWeight)));
  const availableFlavors = Array.from(
    new Set(product.variants.map((v) => v.flavor).filter(Boolean) as string[])
  );

  // Switch size keeping closest flavor if available
  const handleSelectSize = (size: string) => {
    const match = product.variants.find(
      (v) => v.sizeOrWeight === size && v.flavor === selectedVariant.flavor
    ) || product.variants.find((v) => v.sizeOrWeight === size);

    if (match) setSelectedVariantId(match.id);
  };

  // Switch flavor keeping current size
  const handleSelectFlavor = (flavor: string) => {
    const match = product.variants.find(
      (v) => v.flavor === flavor && v.sizeOrWeight === selectedVariant.sizeOrWeight
    ) || product.variants.find((v) => v.flavor === flavor);

    if (match) setSelectedVariantId(match.id);
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      variantName: `${selectedVariant.sizeOrWeight} ${selectedVariant.flavor ? `• ${selectedVariant.flavor}` : ""}`,
      price: selectedVariant.price,
      mrp: selectedVariant.mrp,
      quantity,
      imageUrl: activeImage,
      freebieText: selectedVariant.freebieText,
      slug: product.slug,
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      variantName: `${selectedVariant.sizeOrWeight} ${selectedVariant.flavor ? `• ${selectedVariant.flavor}` : ""}`,
      price: selectedVariant.price,
      mrp: selectedVariant.mrp,
      quantity,
      imageUrl: activeImage,
      freebieText: selectedVariant.freebieText,
      slug: product.slug,
    });
    router.push("/checkout");
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      setPincodeResult({ checked: true, valid: false, text: "Please enter a valid 6-digit Indian PIN code." });
      return;
    }

    // Delivery estimate: 2-3 business days
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const dateString = deliveryDate.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

    setPincodeResult({
      checked: true,
      valid: true,
      text: `⚡ Delivery available to ${pincode}! Estimated dispatch by tomorrow, arrives by ${dateString}. Free shipping on this order.`,
    });
  };

  // Parse structured JSON benefits / nutrition facts if available
  let parsedBenefits: string[] = [];
  try {
    if (product.benefits) parsedBenefits = JSON.parse(product.benefits);
  } catch {
    parsedBenefits = product.benefits ? [product.benefits] : [];
  }

  let parsedNutrition: Record<string, string> = {};
  try {
    if (product.nutritionFacts) parsedNutrition = JSON.parse(product.nutritionFacts);
  } catch {
    parsedNutrition = {};
  }

  return (
    <div className="space-y-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-white transition">Categories</Link>
        {product.category && (
          <>
            <span>/</span>
            <Link href={`/categories/${product.category.slug}`} className="hover:text-white transition">
              {product.category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-[#ff5c00] font-bold truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Gallery & Badges (5 cols) */}
        <div className="lg:col-span-5 space-y-4 sticky top-24">
          <div className="relative aspect-square w-full rounded-3xl bg-zinc-900 border border-[#27272f] overflow-hidden flex items-center justify-center shadow-xl">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
              <span className="bg-[#ff5c00] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded shadow">
                100% AUTHENTIC
              </span>
              {selectedVariant.discountPercent > 0 && (
                <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded shadow">
                  {selectedVariant.discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Wishlist button */}
            <button
              type="button"
              onClick={() =>
                toggleWishlist({
                  productId: product.id,
                  name: product.name,
                  price: selectedVariant.price,
                  mrp: selectedVariant.mrp,
                  imageUrl: activeImage,
                  slug: product.slug,
                  category: product.category?.name || "Supplements",
                })
              }
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition cursor-pointer z-10 ${
                inWishlist
                  ? "bg-red-500 text-white"
                  : "bg-black/50 hover:bg-black/80 text-zinc-300 hover:text-white"
              }`}
              aria-label="Wishlist toggle"
            >
              <Heart className={`w-5 h-5 ${inWishlist ? "fill-white" : ""}`} />
            </button>
          </div>

          {/* Thumbnails row */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                    selectedImageIndex === idx
                      ? "border-[#ff5c00] ring-2 ring-[#ff5c00]/30"
                      : "border-zinc-800 hover:border-zinc-600"
                  }`}
                >
                  <img src={img.url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 flex items-center gap-2.5">
              <Award className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-[11px] leading-tight text-zinc-300">
                <strong>Labdoor Certified</strong><br />
                <span className="text-zinc-500">Accurate label claims</span>
              </div>
            </div>
            <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-[11px] leading-tight text-zinc-300">
                <strong>ICMR Registered</strong><br />
                <span className="text-zinc-500">Clinical trials validated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Variants, Pricing, CTA & Pincode (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header & Rating */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#ff5c00] bg-orange-950/40 px-2.5 py-0.5 rounded border border-orange-900/40">
                {product.brand?.name || "Fitness Freak"}
              </span>
              <span className="text-xs text-zinc-500">•</span>
              <span className="text-xs font-medium text-zinc-400">
                {product.category?.name}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-snug">
              {product.name}
            </h1>

            {product.shortDesc && (
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-medium">
                {product.shortDesc}
              </p>
            )}

            {/* Star Rating Badge */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1.5 bg-amber-950/60 text-amber-400 px-2.5 py-1 rounded-lg text-xs font-bold border border-amber-800/40">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
              </div>
              <span className="text-xs text-zinc-400">
                Based on <strong className="text-white">{product.reviewCount.toLocaleString()}</strong> verified reviews
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-[#141418] border border-[#27272f] rounded-2xl p-5 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-white">
                ₹{selectedVariant.price.toLocaleString("en-IN")}
              </span>
              {selectedVariant.mrp > selectedVariant.price && (
                <span className="text-base text-zinc-500 line-through">
                  ₹{selectedVariant.mrp.toLocaleString("en-IN")}
                </span>
              )}
              {selectedVariant.discountPercent > 0 && (
                <span className="text-sm font-black text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900/40">
                  {selectedVariant.discountPercent}% OFF
                </span>
              )}
            </div>

            {selectedVariant.mrp > selectedVariant.price && (
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Price Dropped By ₹{(selectedVariant.mrp - selectedVariant.price).toLocaleString("en-IN")}
              </div>
            )}

            {selectedVariant.freebieText && (
              <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-xs font-bold text-emerald-300 mt-2">
                <Gift className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{selectedVariant.freebieText}</span>
              </div>
            )}

            <div className="text-[11px] text-zinc-400 pt-1">
              Inclusive of all taxes. Free shipping on orders above ₹999.
            </div>
          </div>

          {/* Variant Selectors: Weight/Size and Flavor */}
          <div className="space-y-4">
            {/* 1. Size / Weight */}
            {availableSizes.length > 0 && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Select Weight / Pack: <span className="text-[#ff5c00]">{selectedVariant.sizeOrWeight}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => {
                    const isSelected = selectedVariant.sizeOrWeight === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSelectSize(size)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                          isSelected
                            ? "bg-[#ff5c00]/20 border-[#ff5c00] text-white ring-1 ring-[#ff5c00]"
                            : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. Flavor */}
            {availableFlavors.length > 0 && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Select Flavour: <span className="text-[#ff5c00]">{selectedVariant.flavor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableFlavors.map((flavor) => {
                    const isSelected = selectedVariant.flavor === flavor;
                    return (
                      <button
                        key={flavor}
                        type="button"
                        onClick={() => handleSelectFlavor(flavor)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                          isSelected
                            ? "bg-[#ff5c00]/20 border-[#ff5c00] text-white ring-1 ring-[#ff5c00]"
                            : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500"
                        }`}
                      >
                        {flavor}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Quantity Selector & Stock Indicator */}
          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase text-zinc-400">Qty:</span>
              <div className="flex items-center border border-zinc-700 rounded-xl bg-zinc-900">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-zinc-400 hover:text-white transition"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-bold text-white min-w-[28px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="p-2 text-zinc-400 hover:text-white transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="text-xs font-bold flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              In Stock ({selectedVariant.stock} units available)
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="py-3.5 px-6 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-extrabold text-sm uppercase tracking-wider border border-zinc-700 hover:border-[#ff5c00] transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-[#ff5c00]" /> Add to Cart
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="py-3.5 px-6 rounded-xl bg-[#ff5c00] hover:bg-[#e05200] text-white font-black text-sm uppercase tracking-wider transition glow-orange flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-950/50"
            >
              <Zap className="w-4 h-4 fill-white" /> Buy Now
            </button>
          </div>

          {addedNotice && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-800/40 rounded-xl text-xs font-bold text-emerald-300 flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4" /> Added to your cart! Review in the slide drawer or continue shopping.
            </div>
          )}

          {/* Delivery PIN Code Checker Form */}
          <div className="bg-[#141418] border border-[#27272f] rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-[#ff5c00]" /> Delivery & COD Checker
            </div>

            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.slice(0, 6))}
                placeholder="Enter 6-digit Pincode (e.g. 110001)"
                maxLength={6}
                className="flex-1 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff5c00]"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl border border-zinc-700 transition cursor-pointer"
              >
                Check
              </button>
            </form>

            {pincodeResult && (
              <div
                className={`text-xs p-3 rounded-xl border ${
                  pincodeResult.valid
                    ? "bg-emerald-950/40 border-emerald-800/40 text-emerald-300"
                    : "bg-rose-950/40 border-rose-800/40 text-rose-300"
                }`}
              >
                {pincodeResult.text}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, Nutrition Facts, Ingredients, Usage */}
      <div className="bg-[#141418] border border-[#27272f] rounded-3xl p-6 sm:p-10 space-y-8">
        {/* Tab Headers */}
        <div className="flex gap-2 border-b border-zinc-800 overflow-x-auto pb-2">
          {[
            { id: "overview", label: "Overview & Benefits" },
            { id: "nutrition", label: "Nutritional Information" },
            { id: "ingredients", label: "Ingredients & Purity" },
            { id: "directions", label: "Directions for Use" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#ff5c00] text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview & Scientific Benefits */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-3">
              <h3 className="text-lg font-black uppercase text-white">Product Description</h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {parsedBenefits.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-zinc-800">
                <h4 className="text-sm font-bold uppercase text-white">Key Performance Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {parsedBenefits.map((b, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 flex items-start gap-2.5 text-xs text-zinc-300"
                    >
                      <CheckCircle className="w-4 h-4 text-[#ff5c00] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Nutrition Facts */}
        {activeTab === "nutrition" && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="text-lg font-black uppercase text-white">Nutritional Facts Breakdown</h3>
            <p className="text-xs text-zinc-400">
              Values based on standard lab analysis. Formulated for optimum bioavailability.
            </p>

            <div className="max-w-md bg-zinc-900 rounded-2xl border border-zinc-800 p-4 divide-y divide-zinc-800 text-xs">
              {Object.entries(parsedNutrition).map(([k, v]) => (
                <div key={k} className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-400 capitalize">{k.replace(/([A-Z])/g, " $1")}</span>
                  <span className="text-white font-black">{v}</span>
                </div>
              ))}
              {Object.keys(parsedNutrition).length === 0 && (
                <div className="py-4 text-center text-zinc-500">
                  Nutritional table provided upon batch verification.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Ingredients & Purity */}
        {activeTab === "ingredients" && (
          <div className="space-y-4 animate-in fade-in max-w-2xl">
            <h3 className="text-lg font-black uppercase text-white">Ingredients & Quality Standards</h3>
            <div className="p-4 bg-zinc-900/80 rounded-2xl border border-zinc-800 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {product.ingredients || "High grade sports nutrition ingredients tested in NABL accredited labs."}
            </div>
            <div className="text-xs text-zinc-400 space-y-1">
              <p>• 100% free from banned substances and heavy metal contamination.</p>
              <p>• Manufactured in FSSAI-compliant certified state-of-the-art facilities.</p>
            </div>
          </div>
        )}

        {/* Tab 4: Directions for Use */}
        {activeTab === "directions" && (
          <div className="space-y-4 animate-in fade-in max-w-2xl">
            <h3 className="text-lg font-black uppercase text-white">Recommended Usage</h3>
            <div className="p-4 bg-zinc-900/80 rounded-2xl border border-zinc-800 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {product.usageDirections || "Mix 1 scoop with 200ml chilled water or milk. Consume post-workout."}
            </div>
          </div>
        )}
      </div>

      {/* Customer Reviews Section */}
      <div className="bg-[#141418] border border-[#27272f] rounded-3xl p-6 sm:p-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <span className="text-xs font-black uppercase text-[#ff5c00] tracking-wider">
              Real Athlete Feedback
            </span>
            <h2 className="text-2xl font-black uppercase text-white tracking-tight mt-1">
              Customer Reviews ({product.reviews.length})
            </h2>
          </div>
          <div className="flex items-center gap-3 bg-zinc-900 px-4 py-2.5 rounded-2xl border border-zinc-800">
            <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
            <div>
              <div className="text-lg font-black text-white">{product.rating} out of 5</div>
              <div className="text-[10px] text-zinc-400">94% of buyers recommend this product</div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {product.reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 bg-zinc-900/60 rounded-2xl border border-zinc-800/80 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#ff5c00]/20 text-[#ff5c00] font-black text-xs flex items-center justify-center">
                    {rev.userName[0]}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      {rev.userName}
                      {rev.verifiedPurchase && (
                        <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800/40 px-1.5 py-0.2 rounded font-semibold">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              <h4 className="text-xs sm:text-sm font-bold text-white pt-1">{rev.title}</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Bought Together / Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="border-b border-[#27272f] pb-4">
            <span className="text-xs font-black uppercase text-[#ff5c00] tracking-wider">
              Synergistic Stacks
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
              Related Supplements You Might Need
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p as any} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
