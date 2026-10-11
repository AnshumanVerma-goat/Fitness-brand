"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  CheckCircle2,
  AlertCircle,
  Truck,
  Gift,
} from "lucide-react";
import { useCart, AVAILABLE_COUPONS } from "@/context/CartContext";

export function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    mrpTotal,
    savingsTotal,
    shippingFee,
    coupon,
    couponDiscount,
    finalTotal,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponInput;
    if (!code) return;
    const res = applyCoupon(code);
    if (res.success) {
      setCouponFeedback({ type: "success", text: res.message });
      setCouponInput("");
    } else {
      setCouponFeedback({ type: "error", text: res.message });
    }
    setTimeout(() => setCouponFeedback(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#141418] border-l border-[#27272f] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#27272f]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#ff5c00]" />
            <h2 className="text-base font-bold text-white">Your Shopping Cart</h2>
            <span className="text-xs bg-zinc-800 text-zinc-300 font-bold px-2 py-0.5 rounded-full">
              {items.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-zinc-900 px-5 py-3 border-b border-[#27272f]">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Truck className="w-3.5 h-3.5 text-[#ff5c00]" />
              {amountNeeded === 0 ? (
                <span className="text-emerald-400 font-bold">🎉 Congratulations! You unlocked FREE Delivery!</span>
              ) : (
                <span>Add ₹{amountNeeded.toLocaleString("en-IN")} more for <strong className="text-white">FREE Delivery</strong></span>
              )}
            </span>
            <span className="text-[11px] text-zinc-400">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#ff5c00] to-yellow-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-4 border border-zinc-800">
                <ShoppingBag className="w-8 h-8 text-zinc-500" />
              </div>
              <h3 className="text-base font-bold text-white">Your cart is empty</h3>
              <p className="text-xs text-zinc-400 max-w-xs mt-1 mb-6">
                Explore our bestsellers, whey isolates, and energy stacks to fuel your workout goals.
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-[#ff5c00] hover:bg-[#e05200] text-white text-xs font-bold rounded-lg transition"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.variantId}
                className="flex gap-3 p-3 bg-zinc-900/60 border border-[#27272f] rounded-xl hover:border-zinc-700 transition"
              >
                <div className="w-16 h-16 rounded-lg bg-zinc-800 overflow-hidden shrink-0 flex items-center justify-center">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={() => setIsCartOpen(false)}
                      className="text-xs font-bold text-white hover:text-[#ff5c00] transition line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.variantId)}
                      className="text-zinc-500 hover:text-red-400 transition p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-[11px] text-zinc-400 mt-0.5 truncate">
                    {item.variantName}
                  </div>

                  {item.freebieText && (
                    <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold mt-1 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-900/30 w-fit">
                      <Gift className="w-2.5 h-2.5" /> {item.freebieText}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-extrabold text-white">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                      {item.mrp > item.price && (
                        <span className="text-[11px] text-zinc-500 line-through">
                          ₹{(item.mrp * item.quantity).toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center border border-zinc-700 rounded-lg bg-zinc-800">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="p-1 hover:text-white text-zinc-400 transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-white min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="p-1 hover:text-white text-zinc-400 transition"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Order Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#27272f] bg-zinc-950/80 space-y-3.5">
            {/* Coupon Code Section */}
            <div>
              {coupon ? (
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Coupon <strong>{coupon.code}</strong> Applied (-₹{couponDiscount.toLocaleString("en-IN")})</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-zinc-400 hover:text-red-400 text-xs font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-zinc-400" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Enter Promo Code"
                        className="w-full pl-8 pr-2 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white placeholder-zinc-500 uppercase outline-none focus:border-[#ff5c00]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon()}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-lg border border-zinc-700 transition"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Quick coupon chips */}
                  <div className="flex items-center gap-1.5 pt-1 overflow-x-auto text-[10px]">
                    <span className="text-zinc-500 shrink-0">Try:</span>
                    {AVAILABLE_COUPONS.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => handleApplyCoupon(c.code)}
                        className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-amber-900/40 font-bold shrink-0 transition"
                      >
                        {c.code}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {couponFeedback && (
                <div
                  className={`flex items-center gap-1 text-[11px] mt-1.5 ${
                    couponFeedback.type === "success" ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {couponFeedback.type === "success" ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <AlertCircle className="w-3 h-3" />
                  )}
                  {couponFeedback.text}
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-zinc-400 pt-1 border-t border-zinc-800">
              <div className="flex justify-between">
                <span>Total MRP</span>
                <span className="text-zinc-300">₹{mrpTotal.toLocaleString("en-IN")}</span>
              </div>
              {savingsTotal > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Product Discount</span>
                  <span>-₹{savingsTotal.toLocaleString("en-IN")}</span>
                </div>
              )}
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Coupon Savings</span>
                  <span>-₹{couponDiscount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Estimate</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-400 font-bold uppercase">FREE</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-zinc-800">
                <span>Payable Amount</span>
                <span className="text-lg text-white">₹{finalTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#ff5c00] hover:bg-[#e05200] text-white text-sm font-black uppercase tracking-wider rounded-xl transition glow-orange-sm shadow-lg shadow-orange-950/40"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsCartOpen(false)}
                className="w-full block text-center py-2 text-xs font-semibold text-zinc-400 hover:text-white transition"
              >
                View Detailed Cart Page
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
