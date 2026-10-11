"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, Heart, ShoppingCart, Zap, Gift, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export interface ProductCardProps {
  product: {
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
    images: { url: string; alt?: string | null }[];
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
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const selectedVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const primaryImage = product.images[0]?.url || "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600";
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      variantName: `${selectedVariant.sizeOrWeight} ${selectedVariant.flavor ? `• ${selectedVariant.flavor}` : ""}`,
      price: selectedVariant.price,
      mrp: selectedVariant.mrp,
      quantity: 1,
      imageUrl: primaryImage,
      freebieText: selectedVariant.freebieText,
      slug: product.slug,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      variantName: `${selectedVariant.sizeOrWeight} ${selectedVariant.flavor ? `• ${selectedVariant.flavor}` : ""}`,
      price: selectedVariant.price,
      mrp: selectedVariant.mrp,
      quantity: 1,
      imageUrl: primaryImage,
      freebieText: selectedVariant.freebieText,
      slug: product.slug,
    });

    router.push("/checkout");
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist({
      productId: product.id,
      name: product.name,
      price: selectedVariant.price,
      mrp: selectedVariant.mrp,
      imageUrl: primaryImage,
      slug: product.slug,
      category: product.category?.name || "Supplements",
    });
  };

  return (
    <div className="group relative flex flex-col bg-[#141418] hover:bg-[#191920] border border-[#27272f] hover:border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1">
      {/* Product Image Area */}
      <div className="relative w-full aspect-square bg-zinc-900/80 overflow-hidden flex items-center justify-center">
        <Link href={`/products/${product.slug}`} className="w-full h-full">
          <img
            src={primaryImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {product.isBestseller && (
            <span className="bg-[#ff5c00] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow">
              Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-amber-500 text-black text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow">
              New
            </span>
          )}
          {selectedVariant.discountPercent > 0 && (
            <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
              {selectedVariant.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition z-10 cursor-pointer ${
            inWishlist
              ? "bg-red-500 text-white"
              : "bg-black/40 hover:bg-black/70 text-zinc-300 hover:text-white"
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? "fill-white" : ""}`} />
        </button>

        {/* Freebie Bar at bottom of image if present */}
        {selectedVariant.freebieText && (
          <div className="absolute bottom-0 inset-x-0 bg-emerald-950/90 border-t border-emerald-800/40 text-emerald-300 text-[10px] font-bold px-3 py-1 flex items-center gap-1.5 backdrop-blur-sm">
            <Gift className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">{selectedVariant.freebieText}</span>
          </div>
        )}
      </div>

      {/* Card Body Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-zinc-400 font-medium text-[11px] uppercase tracking-wide">
              {product.category?.name || "Supplement"}
            </span>
            <div className="flex items-center gap-1 bg-amber-950/50 text-amber-400 px-1.5 py-0.5 rounded text-[11px] font-bold border border-amber-800/30">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-zinc-500 text-[9px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <Link
            href={`/products/${product.slug}`}
            className="font-bold text-sm text-white hover:text-[#ff5c00] transition line-clamp-2 leading-snug"
          >
            {product.name}
          </Link>

          {/* Variant Selector Chips if more than 1 variant */}
          {product.variants.length > 1 && (
            <div className="flex flex-wrap gap-1 mt-2.5">
              {product.variants.map((v, idx) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariantIndex(idx)}
                  className={`text-[10px] px-2 py-0.5 rounded font-medium border transition cursor-pointer ${
                    selectedVariantIndex === idx
                      ? "bg-[#ff5c00]/20 border-[#ff5c00] text-white font-bold"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                  }`}
                >
                  {v.sizeOrWeight}
                </button>
              ))}
            </div>
          )}

          {/* Selected Variant details */}
          <div className="text-[11px] text-zinc-400 mt-1 truncate">
            {selectedVariant.flavor ? `${selectedVariant.sizeOrWeight} • ${selectedVariant.flavor}` : selectedVariant.sizeOrWeight}
          </div>
        </div>

        {/* Pricing & CTA Actions */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-black text-white">
              ₹{selectedVariant.price.toLocaleString("en-IN")}
            </span>
            {selectedVariant.mrp > selectedVariant.price && (
              <span className="text-xs text-zinc-500 line-through">
                ₹{selectedVariant.mrp.toLocaleString("en-IN")}
              </span>
            )}
            {selectedVariant.discountPercent > 0 && (
              <span className="text-xs font-bold text-emerald-400">
                {selectedVariant.discountPercent}% off
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                isAdded
                  ? "bg-emerald-600 border-emerald-500 text-white"
                  : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-white hover:border-[#ff5c00]"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5 text-[#ff5c00]" /> Add to Cart
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-black uppercase tracking-wider bg-[#ff5c00] hover:bg-[#e05200] text-white transition glow-orange-sm cursor-pointer shadow-md shadow-orange-950/40"
            >
              <Zap className="w-3.5 h-3.5 fill-white" /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
