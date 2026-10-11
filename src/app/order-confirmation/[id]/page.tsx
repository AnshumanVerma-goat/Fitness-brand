import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Calendar,
  CreditCard,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

interface OrderConfirmationProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "Order Confirmation - Fitness Freak",
  description: "Thank you for your demonstration order with Fitness Freak.",
};

export default async function OrderConfirmationPage({ params }: OrderConfirmationProps) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) {
    notFound();
  }

  let address: any = {};
  try {
    address = JSON.parse(order.shippingAddressJson);
  } catch {
    address = {};
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const estimatedDeliveryDate = new Date(order.createdAt);
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 3);
  const deliveryDateString = estimatedDeliveryDate.toLocaleDateString("en-IN", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Top Success Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950/80 via-zinc-900 to-black border border-emerald-800/40 p-8 sm:p-10 text-center space-y-4 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400">
            DEMO ORDER RECORD PERSISTED
          </span>
          <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
            Thank You For Your Demo Order!
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-md mx-auto">
            Your simulated order has been saved to the database. A confirmation email has been logged to <strong className="text-white">{order.customerEmail}</strong>.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-black/60 border border-zinc-700 px-4 py-2 rounded-xl text-xs font-mono font-bold text-amber-400">
          <span>Tracking ID:</span>
          <strong className="text-white">{order.orderNumber}</strong>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-zinc-400 text-xs flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
        <div>
          <strong>PROTOTYPE DEMONSTRATION NOTICE:</strong> No physical charge was incurred. You can review this order at any time in your customer dashboard or the admin overview.
        </div>
      </div>

      {/* Order Status & Delivery Progress */}
      <div className="bg-[#141418] border border-[#27272f] rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-sm font-black uppercase tracking-wider text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#ff5c00]" /> Estimated Dispatch & Delivery
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
            <span className="text-zinc-500">Order Placed</span>
            <div className="font-bold text-white">{orderDate}</div>
            <div className="text-emerald-400 font-semibold text-[11px]">✓ Confirmed</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
            <span className="text-zinc-500">Estimated Dispatch</span>
            <div className="font-bold text-white">Within 24 Hours</div>
            <div className="text-zinc-400 text-[11px]">NABL Lab Tested Batch</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
            <span className="text-zinc-500">Expected Delivery</span>
            <div className="font-bold text-white">{deliveryDateString}</div>
            <div className="text-amber-400 text-[11px]">Express Courier</div>
          </div>
        </div>

        {/* Shipping Destination */}
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 text-zinc-300 font-bold">
            <MapPin className="w-3.5 h-3.5 text-[#ff5c00]" /> Delivering to:
          </div>
          <div className="text-white font-semibold">
            {address.fullName || order.customerName} ({address.phone || order.customerPhone})
          </div>
          <div className="text-zinc-400">
            {address.addressLine} {address.landmark ? `, Near ${address.landmark}` : ""}, {address.city}, {address.state} - {address.pincode}
          </div>
        </div>
      </div>

      {/* Ordered Items Table */}
      <div className="bg-[#141418] border border-[#27272f] rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-sm font-black uppercase tracking-wider text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
          <Package className="w-4 h-4 text-[#ff5c00]" /> Items Ordered ({order.items.length})
        </h2>

        <div className="divide-y divide-zinc-800">
          {order.items.map((item) => (
            <div key={item.id} className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg bg-zinc-900 overflow-hidden shrink-0 border border-zinc-800">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-zinc-600">MB</div>
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{item.productName}</div>
                  <div className="text-[11px] text-zinc-400">{item.variantName}</div>
                  <div className="text-[11px] text-zinc-500">Qty: {item.quantity} × ₹{item.price.toLocaleString("en-IN")}</div>
                </div>
              </div>
              <div className="text-sm font-black text-white text-right">
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div className="pt-4 border-t border-zinc-800 space-y-2 text-xs text-zinc-400 max-w-xs ml-auto">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="text-white">₹{order.subtotal.toLocaleString("en-IN")}</span>
          </div>
          {order.discountAmount > 0 && (
            <div className="flex justify-between text-emerald-400 font-bold">
              <span>Coupon Discount ({order.couponCode})</span>
              <span>-₹{order.discountAmount.toLocaleString("en-IN")}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{order.shippingFee === 0 ? "FREE" : `₹${order.shippingFee}`}</span>
          </div>
          <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-zinc-800">
            <span>Total Paid</span>
            <span className="text-lg">₹{order.totalAmount.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
        <Link
          href="/account/orders"
          className="px-8 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition border border-zinc-700 text-center"
        >
          View in Order History
        </Link>
        <Link
          href="/categories"
          className="px-8 py-3.5 bg-[#ff5c00] hover:bg-[#e05200] text-white font-black text-xs uppercase tracking-wider rounded-xl transition glow-orange text-center flex items-center justify-center gap-2"
        >
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
