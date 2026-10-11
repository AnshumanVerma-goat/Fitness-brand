import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Tag,
  ShieldCheck,
  CheckCircle,
  Clock,
  Sparkles,
  Users,
} from "lucide-react";

export const metadata = {
  title: "Admin Console - Fitness Freak Prototype",
  description: "Administrative console for inspecting orders, inventory, and coupons.",
};

export default async function AdminPage() {
  const [orders, products, coupons, usersCount] = await Promise.all([
    prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.findMany({
      include: { variants: true, category: true },
      orderBy: { name: "asc" },
    }),
    prisma.coupon.findMany({
      orderBy: { code: "asc" },
    }),
    prisma.user.count(),
  ]);

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272f] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Demonstration Management
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-1">
            Store Administration Console
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time inspection of persisted demo orders, catalog inventory, and active promotion codes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-xl transition"
          >
            &larr; Return to Storefront
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#141418] border border-[#27272f] space-y-1">
          <div className="text-xs font-bold text-zinc-400 flex items-center justify-between">
            <span>Demo Revenue</span>
            <DollarSign className="w-4 h-4 text-[#ff5c00]" />
          </div>
          <div className="text-2xl font-black text-white">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold">Across {orders.length} orders</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#141418] border border-[#27272f] space-y-1">
          <div className="text-xs font-bold text-zinc-400 flex items-center justify-between">
            <span>Orders Placed</span>
            <Package className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">{orders.length}</div>
          <div className="text-[11px] text-zinc-500">Persisted in SQLite database</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#141418] border border-[#27272f] space-y-1">
          <div className="text-xs font-bold text-zinc-400 flex items-center justify-between">
            <span>Catalog Products</span>
            <ShoppingBag className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">{products.length}</div>
          <div className="text-[11px] text-zinc-500">
            {products.reduce((s, p) => s + p.variants.length, 0)} total variants
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#141418] border border-[#27272f] space-y-1">
          <div className="text-xs font-bold text-zinc-400 flex items-center justify-between">
            <span>Active Coupons</span>
            <Tag className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">{coupons.length}</div>
          <div className="text-[11px] text-zinc-500">WELCOME10, FIT150, FREESHIP</div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#141418] border border-[#27272f] rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <h2 className="text-base font-black uppercase text-white flex items-center gap-2">
            <Package className="w-4 h-4 text-[#ff5c00]" /> Recent Demonstration Orders
          </h2>
          <span className="text-xs text-zinc-400">{orders.length} records</span>
        </div>

        {orders.length === 0 ? (
          <div className="py-8 text-center text-xs text-zinc-500">
            No orders have been placed yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-zinc-900/80 text-zinc-400 uppercase text-[10px] font-black border-b border-zinc-800">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Coupon</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Total Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-medium">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-zinc-900/40 transition">
                    <td className="p-3 font-mono font-bold text-white">{o.orderNumber}</td>
                    <td className="p-3">
                      <div className="font-bold text-white">{o.customerName}</div>
                      <div className="text-[10px] text-zinc-500">{o.customerEmail}</div>
                    </td>
                    <td className="p-3">
                      <span className="bg-zinc-800 px-2 py-0.5 rounded text-[11px] font-bold">
                        {o.items.length} items
                      </span>
                    </td>
                    <td className="p-3">
                      {o.couponCode ? (
                        <span className="text-amber-400 font-bold">{o.couponCode}</span>
                      ) : (
                        <span className="text-zinc-600">—</span>
                      )}
                    </td>
                    <td className="p-3 text-[11px]">
                      {o.paymentMethod === "ONLINE_SIMULATED" ? (
                        <span className="text-emerald-400 font-semibold">Online (Simulated)</span>
                      ) : (
                        <span className="text-amber-400 font-semibold">COD (Simulated)</span>
                      )}
                    </td>
                    <td className="p-3 font-black text-white">
                      ₹{o.totalAmount.toLocaleString("en-IN")}
                    </td>
                    <td className="p-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/order-confirmation/${o.id}`}
                        className="text-[#ff5c00] font-bold hover:underline"
                      >
                        Inspect &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Products Inventory Overview */}
      <div className="bg-[#141418] border border-[#27272f] rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <h2 className="text-base font-black uppercase text-white flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#ff5c00]" /> Catalog Inventory Snapshot
          </h2>
          <span className="text-xs text-zinc-400">{products.length} products</span>
        </div>

        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-900/80 text-zinc-400 uppercase text-[10px] font-black border-b border-zinc-800 sticky top-0">
              <tr>
                <th className="p-3">Product Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Variants</th>
                <th className="p-3">Starting Price</th>
                <th className="p-3">Total Stock</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-medium">
              {products.map((p) => {
                const totalStock = p.variants.reduce((sum, v) => sum + v.stock, 0);
                const lowestPrice = p.variants[0]?.price || 0;
                return (
                  <tr key={p.id} className="hover:bg-zinc-900/40 transition">
                    <td className="p-3 font-bold text-white max-w-xs truncate">{p.name}</td>
                    <td className="p-3 text-zinc-400">{p.category?.name}</td>
                    <td className="p-3">{p.variants.length} options</td>
                    <td className="p-3 font-black text-white">₹{lowestPrice.toLocaleString("en-IN")}</td>
                    <td className="p-3">
                      <span className="text-emerald-400 font-bold">{totalStock} in stock</span>
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/products/${p.slug}`}
                        className="text-[#ff5c00] font-bold hover:underline"
                      >
                        View PDP &rarr;
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
