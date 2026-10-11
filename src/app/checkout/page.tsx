"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Truck,
  CreditCard,
  Banknote,
  ArrowRight,
  AlertCircle,
  Loader2,
  Building2,
  User,
  ShoppingBag,
  Gift,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, coupon, couponDiscount, shippingFee, finalTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addressLine, setAddressLine] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("Gurugram");
  const [state, setState] = useState("Haryana");
  const [pincode, setPincode] = useState("122002");
  const [saveAddress, setSaveAddress] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState<"COD_SIMULATED" | "ONLINE_SIMULATED">("ONLINE_SIMULATED");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Pre-fill user data if authenticated
  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");

      if (user.addresses && user.addresses.length > 0) {
        const defaultAddr = user.addresses[0];
        setAddressLine(defaultAddr.addressLine || "");
        setLandmark(defaultAddr.landmark || "");
        setCity(defaultAddr.city || "Gurugram");
        setState(defaultAddr.state || "Haryana");
        setPincode(defaultAddr.pincode || "122002");
      }
    }
  }, [user]);

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-black uppercase text-white">Your Cart is Empty</h1>
        <p className="text-xs text-zinc-400">Please add items to your cart before proceeding to checkout.</p>
        <Link
          href="/categories"
          className="inline-block px-6 py-3 bg-[#ff5c00] hover:bg-[#e05200] text-white font-bold text-xs uppercase rounded-xl transition"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName || !email || !phone || !addressLine || !city || !state || !pincode) {
      setErrorMsg("Please fill in all required shipping address fields.");
      return;
    }

    if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      setErrorMsg("Please provide a valid 6-digit Indian PIN code.");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        userId: user?.id || null,
        customerName: fullName.trim(),
        customerEmail: email.trim().toLowerCase(),
        customerPhone: phone.trim(),
        shippingAddress: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          addressLine: addressLine.trim(),
          landmark: landmark.trim() || undefined,
          city: city.trim(),
          state: state.trim(),
          pincode: pincode.trim(),
          saveAddress,
        },
        items: items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          quantity: i.quantity,
          imageUrl: i.imageUrl,
        })),
        couponCode: coupon?.code || null,
        paymentMethod,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Order creation failed.");
      }

      // Clear the local cart
      clearCart();

      // Navigate to order confirmation
      router.push(`/order-confirmation/${data.orderId}`);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to place order. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#27272f] pb-4">
        <div>
          <span className="text-xs font-black uppercase text-[#ff5c00] tracking-wider">
            Simulated Checkout
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-1">
            Secure Order Checkout
          </h1>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-800/40">
          <ShieldCheck className="w-4 h-4" /> 256-Bit SSL Demo
        </div>
      </div>

      {/* Demo Notice Banner */}
      <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/50 text-amber-200 text-xs flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <strong className="text-white font-bold uppercase tracking-wide">
            DEMO CHECKOUT — Prototype Demonstration Notice
          </strong>
          <p className="text-zinc-300">
            This is a sample checkout flow. No real banking credentials, UPI pins or credit cards are collected. Orders are persisted in your demo database for client verification.
          </p>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Contact, Address, Payment Forms (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Customer Contact */}
          <div className="bg-[#141418] border border-[#27272f] rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <User className="w-4 h-4 text-[#ff5c00]" /> 1. Customer Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Vikram Sharma"
                  className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff5c00]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 9876543210"
                  className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff5c00]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-zinc-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. vikram@example.com"
                  className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff5c00]"
                />
                <span className="text-[10px] text-zinc-500">Order tracking updates will be sent to this email.</span>
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Destination */}
          <div className="bg-[#141418] border border-[#27272f] rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Truck className="w-4 h-4 text-[#ff5c00]" /> 2. Delivery Address in India
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Flat / House No. / Street Address *</label>
                <input
                  type="text"
                  required
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  placeholder="e.g. Flat 402, Tower 4, DLF Phase 5"
                  className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff5c00]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Landmark (Optional)</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Opposite Horizon Center"
                  className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff5c00]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.slice(0, 6))}
                    placeholder="122002"
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff5c00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Gurugram"
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff5c00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Haryana"
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff5c00]"
                  />
                </div>
              </div>

              {isAuthenticated && (
                <label className="flex items-center gap-2 pt-1 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={saveAddress}
                    onChange={(e) => setSaveAddress(e.target.checked)}
                    className="accent-[#ff5c00] rounded"
                  />
                  <span>Save this address to my account profile</span>
                </label>
              )}
            </div>
          </div>

          {/* Step 3: Simulated Payment Method Selection */}
          <div className="bg-[#141418] border border-[#27272f] rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <CreditCard className="w-4 h-4 text-[#ff5c00]" /> 3. Demo Payment Selection
            </h2>

            <div className="space-y-3">
              {/* Option 1: Instant Online Payment (Simulated) */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                  paymentMethod === "ONLINE_SIMULATED"
                    ? "bg-[#ff5c00]/10 border-[#ff5c00]"
                    : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "ONLINE_SIMULATED"}
                  onChange={() => setPaymentMethod("ONLINE_SIMULATED")}
                  className="accent-[#ff5c00] mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-emerald-400" /> Simulated Online Payment (UPI / Netbanking / Card)
                    </span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-800/40">
                      RECOMMENDED
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Instant confirmation. Marks order as simulated paid and creates your invoice immediately.
                  </p>
                </div>
              </label>

              {/* Option 2: Cash on Delivery (Simulated) */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                  paymentMethod === "COD_SIMULATED"
                    ? "bg-[#ff5c00]/10 border-[#ff5c00]"
                    : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "COD_SIMULATED"}
                  onChange={() => setPaymentMethod("COD_SIMULATED")}
                  className="accent-[#ff5c00] mt-1"
                />
                <div className="flex-1">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Banknote className="w-4 h-4 text-amber-400" /> Cash on Delivery — Simulated
                  </span>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Pay demo cash at the time of delivery. No advance simulated payment required.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary Review (5 cols) */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          <div className="bg-[#141418] border border-[#27272f] rounded-2xl p-6 space-y-5">
            <h2 className="text-sm font-black uppercase tracking-wider text-white border-b border-zinc-800 pb-3 flex items-center justify-between">
              <span>Order Items ({items.length})</span>
              <Link href="/cart" className="text-xs font-bold text-[#ff5c00] hover:underline normal-case">
                Edit Cart
              </Link>
            </h2>

            {/* Line items thumbnail list */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-3 text-xs">
                  <div className="w-14 h-14 rounded-lg bg-zinc-900 overflow-hidden shrink-0 border border-zinc-800">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white truncate">{item.name}</div>
                    <div className="text-[11px] text-zinc-400 truncate">{item.variantName}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-zinc-500">Qty: {item.quantity}</span>
                      <span className="font-extrabold text-white">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 text-xs text-zinc-400 border-t border-zinc-800 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-bold">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {coupon && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Coupon ({coupon.code})</span>
                  <span>-₹{couponDiscount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-400 font-bold uppercase">FREE</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-white border-t border-zinc-800 pt-3">
                <span>Total Payable</span>
                <span className="text-2xl text-white">₹{finalTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errorMsg}
              </div>
            )}

            {/* Place Demo Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#ff5c00] hover:bg-[#e05200] disabled:bg-zinc-800 text-white font-black text-xs uppercase tracking-wider rounded-xl transition glow-orange flex items-center justify-center gap-2 shadow-xl shadow-orange-950/50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Placing Demo Order...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Place Demo Order (₹{finalTotal.toLocaleString("en-IN")})
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
