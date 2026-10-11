"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Gift,
  Tag,
  CheckCircle2,
  AlertCircle,
  Truck,
  RotateCcw,
} from "lucide-react";
import { useCart, AVAILABLE_COUPONS } from "@/context/CartContext";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
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
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponInput;
    if (!code) return;
    const res = applyCoupon(code);
    if (res.success) {
      setFeedback({ type: "success", text: res.message });
      setCouponInput("");
    } else {
      setFeedback({ type: "error", text: res.message });
    }
    setTimeout(() => setFeedback(null), 4000);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black uppercase text-white">Your Shopping Cart is Empty</h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
          You haven&apos;t added any fitness supplements yet. Browse our top proteins, creatine stacks, and nutrition foods.
        </p>
        <div className="pt-2">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#ff5c00] hover:bg-[#e05200] text-white font-black text-xs uppercase tracking-wider rounded-xl transition glow-orange-sm"
          >
            Start Shopping Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <span>/</span>
        <span className="text-[#ff5c00] font-bold">Shopping Cart</span>
      </div>

      <div className="flex items-center justify-between border-b border-[#27272f] pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
            Review Your Cart ({items.reduce((s, i) => s + i.quantity, 0)} Items)
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            100% Genuine batch guaranteed with lab certifications.
          </p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-bold text-zinc-400 hover:text-red-400 transition cursor-pointer"
        >
          Clear All Items
        </button>
      </div>

      {/* Free Shipping Progress */}
      <div className="rounded-2xl bg-[#141418] border border-[#27272f] p-4">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <span className="flex items-center gap-2 text-zinc-300">
            <Truck className="w-4 h-4 text-[#ff5c00]" />
            {amountNeeded === 0 ? (
              <span className="text-emerald-400 font-bold">🎉 Congratulations! You unlocked FREE Delivery!</span>
            ) : (
              <span>Add ₹{amountNeeded.toLocaleString("en-IN")} more to qualify for <strong className="text-white">FREE Delivery</strong></span>
            )}
          </span>
          <span className="text-zinc-400 text-xs">{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#ff5c00] to-yellow-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Grid: Line Items on Left (8 cols) & Order Summary on Right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Items */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.variantId}
              className="flex flex-col sm:flex-row gap-4 p-5 bg-[#141418] border border-[#27272f] rounded-2xl hover:border-zinc-700 transition"
            >
              <div className="w-24 h-24 rounded-xl bg-zinc-900 overflow-hidden shrink-0 flex items-center justify-center">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <Link
                      href={`/products/${item.slug}`}
                      className="text-sm font-bold text-white hover:text-[#ff5c00] transition leading-snug line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.variantId)}
                      className="text-zinc-500 hover:text-red-400 p-1 transition cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs text-zinc-400 mt-1">
                    {item.variantName}
                  </div>

                  {item.freebieText && (
                    <div className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold mt-2 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30">
                      <Gift className="w-3 h-3" /> {item.freebieText}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-800/60">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-zinc-700 rounded-xl bg-zinc-900">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      className="p-1.5 text-zinc-400 hover:text-white transition cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-white min-w-[28px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      className="p-1.5 text-zinc-400 hover:text-white transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Pricing */}
                  <div className="text-right">
                    <div className="text-base font-black text-white">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </div>
                    {item.mrp > item.price && (
                      <div className="text-xs text-zinc-500 line-through">
                        ₹{(item.mrp * item.quantity).toLocaleString("en-IN")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link
              href="/categories"
              className="text-xs font-bold text-[#ff5c00] hover:underline flex items-center gap-1"
            >
              &larr; Continue shopping for more supplements
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          <div className="bg-[#141418] border border-[#27272f] rounded-2xl p-6 space-y-5">
            <h2 className="text-sm font-black uppercase tracking-wider text-white border-b border-zinc-800 pb-3">
              Order Summary
            </h2>

            {/* Coupons Section */}
            <div>
              {coupon ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Coupon <strong>{coupon.code}</strong> Applied (-₹{couponDiscount.toLocaleString("en-IN")})</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-zinc-400 hover:text-red-400 text-xs font-bold ml-2 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Enter Promo Code"
                        className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 uppercase outline-none focus:border-[#ff5c00]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon()}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl border border-zinc-700 transition cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px]">
                    <span className="text-zinc-500">Available:</span>
                    {AVAILABLE_COUPONS.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => handleApplyCoupon(c.code)}
                        className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-amber-900/40 font-bold transition cursor-pointer"
                      >
                        {c.code}
                      </button>
                    ))}
                  </div>

                  {feedback && (
                    <div
                      className={`flex items-center gap-1.5 text-xs mt-1 ${
                        feedback.type === "success" ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {feedback.type === "success" ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5" />
                      )}
                      {feedback.text}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs text-zinc-400 border-t border-zinc-800 pt-4">
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
                  <span>Coupon Discount</span>
                  <span>-₹{couponDiscount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Delivery Fee</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-400 font-bold uppercase">FREE</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-extrabold text-white border-t border-zinc-800 pt-3">
                <span>Final Payable</span>
                <span className="text-xl text-white">₹{finalTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="pt-2">
              <Link
                href="/checkout"
                className="w-full py-4 bg-[#ff5c00] hover:bg-[#e05200] text-white font-black text-xs uppercase tracking-wider rounded-xl transition glow-orange flex items-center justify-center gap-2 shadow-lg shadow-orange-950/50"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Secure Checkout Note */}
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-[11px] space-y-2">
            <div className="flex items-center gap-2 text-white font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Safe & Secure Prototype Demo</span>
            </div>
            <p>
              Simulated demonstration checkout. No actual credit card or bank credentials will be requested.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
