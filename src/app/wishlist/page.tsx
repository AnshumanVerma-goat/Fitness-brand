"use client";

import React from "react";
import Link from "next/link";
import { Heart, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item: any) => {
    addToCart({
      productId: item.productId,
      variantId: item.productId, // fallback variant
      name: item.name,
      variantName: "Standard",
      price: item.price,
      mrp: item.mrp || item.price,
      quantity: 1,
      imageUrl: item.imageUrl,
      slug: item.slug,
    });
    removeFromWishlist(item.productId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <span>/</span>
        <span className="text-[#ff5c00] font-bold">My Wishlist</span>
      </div>

      <div className="border-b border-[#27272f] pb-4">
        <span className="text-xs font-black uppercase text-[#ff5c00] tracking-wider">
          Saved Supplements
        </span>
        <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-1">
          My Wishlist ({wishlist.length})
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Items you&apos;ve shortlisted for your upcoming bodybuilding cycles and stacks.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-[#141418] border border-[#27272f] rounded-2xl p-16 text-center space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-rose-500">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-base font-bold text-white">Your Wishlist is Empty</h2>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Click the heart icon on any product card or detail page to save supplements for later review.
          </p>
          <div className="pt-2">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff5c00] hover:bg-[#e05200] text-white font-bold text-xs uppercase rounded-xl transition"
            >
              Explore Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((item) => (
            <div
              key={item.productId}
              className="bg-[#141418] border border-[#27272f] rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-zinc-700 transition shadow-lg"
            >
              <div className="relative aspect-square bg-zinc-900 overflow-hidden">
                <Link href={`/products/${item.slug}`}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => removeFromWishlist(item.productId)}
                  className="absolute top-2.5 right-2.5 p-2 rounded-full bg-black/60 hover:bg-black/90 text-zinc-400 hover:text-red-400 transition cursor-pointer"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-semibold">
                    {item.category}
                  </div>
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-bold text-xs sm:text-sm text-white hover:text-[#ff5c00] transition line-clamp-2 mt-1"
                  >
                    {item.name}
                  </Link>

                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-base font-black text-white">
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>
                    {item.mrp > item.price && (
                      <span className="text-xs text-zinc-500 line-through">
                        ₹{item.mrp.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 mt-4">
                  <button
                    type="button"
                    onClick={() => handleMoveToCart(item)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#ff5c00] hover:bg-[#e05200] text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer glow-orange-sm"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" /> Move to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
