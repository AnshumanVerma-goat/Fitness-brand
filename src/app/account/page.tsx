"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Package,
  Layers,
  Heart,
  LogOut,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AccountDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      fetch(`/api/orders?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data.orders || []);
          setLoadingOrders(false);
        })
        .catch(() => setLoadingOrders(false));
    }
  }, [user]);

  if (isLoading || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-xs text-zinc-400">
        Loading athlete profile...
      </div>
    );
  }

  const latestOrder = orders[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Profile Header */}
      <div className="rounded-3xl bg-gradient-to-r from-zinc-900 via-[#181822] to-zinc-900 border border-[#27272f] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#ff5c00]/20 text-[#ff5c00] border border-[#ff5c00]/40 flex items-center justify-center font-black text-2xl">
            {user.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black uppercase text-white">
                {user.name}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-950/80 text-[#ff5c00] border border-[#ff5c00]/30">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">{user.email} • {user.phone || "No phone linked"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user.role === "ADMIN" && (
            <Link
              href="/admin"
              className="px-4 py-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30 transition flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" /> Admin Console
            </Link>
          )}
          <button
            type="button"
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold border border-zinc-700 transition flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Grid: Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link
          href="/account/orders"
          className="p-5 rounded-2xl bg-[#141418] hover:bg-[#1a1a22] border border-[#27272f] hover:border-[#ff5c00] transition space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-950/60 border border-[#ff5c00]/40 text-[#ff5c00] flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-[#ff5c00] transition">
            My Orders
          </h3>
          <p className="text-xs text-zinc-400">
            View order history, invoices, and shipment tracking.
          </p>
          <div className="text-xs font-bold text-[#ff5c00] pt-1">
            {orders.length} orders on file &rarr;
          </div>
        </Link>

        <Link
          href="/account/addresses"
          className="p-5 rounded-2xl bg-[#141418] hover:bg-[#1a1a22] border border-[#27272f] hover:border-[#ff5c00] transition space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition">
            Saved Addresses
          </h3>
          <p className="text-xs text-zinc-400">
            Manage your home, gym, and office shipping destinations.
          </p>
          <div className="text-xs font-bold text-emerald-400 pt-1">
            {user.addresses?.length || 1} destination &rarr;
          </div>
        </Link>

        <Link
          href="/wishlist"
          className="p-5 rounded-2xl bg-[#141418] hover:bg-[#1a1a22] border border-[#27272f] hover:border-[#ff5c00] transition space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-400 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-rose-400 transition">
            My Wishlist
          </h3>
          <p className="text-xs text-zinc-400">
            View saved supplements and fast add to cart.
          </p>
          <div className="text-xs font-bold text-rose-400 pt-1">
            Saved items &rarr;
          </div>
        </Link>

        <Link
          href="/account/profile"
          className="p-5 rounded-2xl bg-[#141418] hover:bg-[#1a1a22] border border-[#27272f] hover:border-[#ff5c00] transition space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-500/40 text-blue-400 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition">
            Profile Settings
          </h3>
          <p className="text-xs text-zinc-400">
            Update personal information, email, and password.
          </p>
          <div className="text-xs font-bold text-blue-400 pt-1">
            Edit Profile &rarr;
          </div>
        </Link>
      </div>

      {/* Recent Order Preview */}
      <div className="bg-[#141418] border border-[#27272f] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <h2 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#ff5c00]" /> Recent Activity
          </h2>
          <Link href="/account/orders" className="text-xs font-bold text-[#ff5c00] hover:underline">
            View All Orders &rarr;
          </Link>
        </div>

        {latestOrder ? (
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black text-white">{latestOrder.orderNumber}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                  {latestOrder.status}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Placed on {new Date(latestOrder.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} • {latestOrder.items.length} items
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-base font-black text-white">
                ₹{latestOrder.totalAmount.toLocaleString("en-IN")}
              </span>
              <Link
                href={`/account/orders/${latestOrder.id}`}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold border border-zinc-700 transition"
              >
                Order Details
              </Link>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-zinc-400">
            No recent orders placed yet.
          </div>
        )}
      </div>
    </div>
  );
}
