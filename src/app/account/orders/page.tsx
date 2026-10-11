"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Package, ArrowLeft, ArrowRight, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function OrdersHistoryPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If user is logged in, fetch their orders, else fetch demo orders
    const url = user ? `/api/orders?userId=${user.id}` : "/api/orders";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <Link href="/account" className="hover:text-white transition flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>
      </div>

      <div className="border-b border-[#27272f] pb-4">
        <span className="text-xs font-black uppercase text-[#ff5c00] tracking-wider">
          Order Records
        </span>
        <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-1">
          My Order History
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Review past demonstration purchases, invoices, and dispatch statuses.
        </p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-zinc-400">Loading order history...</div>
      ) : orders.length === 0 ? (
        <div className="bg-[#141418] border border-[#27272f] rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
            <Package className="w-8 h-8" />
          </div>
          <h2 className="text-base font-bold text-white">No Orders Placed Yet</h2>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Once you place an order via our simulated checkout, your invoice and item details will be archived here.
          </p>
          <Link
            href="/categories"
            className="inline-block px-6 py-2.5 bg-[#ff5c00] text-white text-xs font-bold rounded-xl"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            let address: any = {};
            try {
              address = JSON.parse(order.shippingAddressJson);
            } catch {
              address = {};
            }

            return (
              <div
                key={order.id}
                className="bg-[#141418] border border-[#27272f] rounded-2xl p-6 space-y-4 hover:border-zinc-700 transition"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-white">{order.orderNumber}</span>
                    <span className="text-zinc-500">•</span>
                    <span className="text-zinc-400">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                      {order.status}
                    </span>
                    <span className="text-sm font-black text-white">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Items preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-3 text-xs p-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
                      <div className="w-12 h-12 rounded-lg bg-zinc-900 overflow-hidden shrink-0">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-600">MB</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white truncate">{item.productName}</div>
                        <div className="text-[10px] text-zinc-400 truncate">{item.variantName}</div>
                        <div className="text-[10px] text-zinc-500">Qty: {item.quantity} • ₹{item.price.toLocaleString("en-IN")}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer details & Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-400">
                  <div className="truncate">
                    Destination: {address.city}, {address.state} - {address.pincode}
                  </div>
                  <Link
                    href={`/order-confirmation/${order.id}`}
                    className="text-[#ff5c00] font-bold hover:underline flex items-center gap-1 self-end sm:self-auto"
                  >
                    View Invoice & Details &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
