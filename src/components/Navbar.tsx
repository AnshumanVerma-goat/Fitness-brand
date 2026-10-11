"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  Flame,
  Percent,
  Sparkles,
  LogOut,
  Package,
  Layers,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { SearchModal } from "./SearchModal";

export function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen, subtotal } = useCart();
  const { totalWishlist } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const categories = [
    {
      name: "Proteins",
      slug: "proteins",
      badge: "HOT",
      subcategories: [
        { name: "Biozyme Whey", href: "/categories/proteins?q=biozyme" },
        { name: "Whey Isolate", href: "/categories/proteins?q=isolate" },
        { name: "Raw Whey", href: "/categories/proteins?q=raw" },
        { name: "Plant Protein", href: "/categories/proteins?q=plant" },
      ],
    },
    {
      name: "Gainers",
      slug: "gainers",
      subcategories: [
        { name: "Super Gainer XXL", href: "/categories/gainers?q=super" },
        { name: "Fuel One Mass Gainer", href: "/categories/gainers?q=fuel" },
        { name: "High Calorie Gainers", href: "/categories/gainers" },
      ],
    },
    {
      name: "Pre/Post Workout",
      slug: "pre-post-workout",
      badge: "POPULAR",
      subcategories: [
        { name: "WrathX Pre-Workout", href: "/categories/pre-post-workout?q=wrathx" },
        { name: "CreAMP Creatine", href: "/categories/pre-post-workout?q=creatine" },
        { name: "BCAA Pro Amino", href: "/categories/pre-post-workout?q=bcaa" },
        { name: "Liquid L-Carnitine", href: "/categories/pre-post-workout?q=carnitine" },
      ],
    },
    {
      name: "Ayurveda",
      slug: "ayurveda",
      subcategories: [
        { name: "Himalayan Shilajit", href: "/categories/ayurveda?q=shilajit" },
        { name: "Ashwagandha 1000mg", href: "/categories/ayurveda?q=ashwagandha" },
        { name: "Gokshura Booster", href: "/categories/ayurveda?q=gokshura" },
      ],
    },
    {
      name: "Fit Foods",
      slug: "fit-foods",
      subcategories: [
        { name: "High Protein Oats", href: "/categories/fit-foods?q=oats" },
        { name: "Dark Chocolate Peanut Butter", href: "/categories/fit-foods?q=peanut" },
        { name: "Protein Energy Bars", href: "/categories/fit-foods?q=bar" },
        { name: "High Protein Muesli", href: "/categories/fit-foods?q=muesli" },
      ],
    },
    {
      name: "Vitamins",
      slug: "vitamin-supplements",
      subcategories: [
        { name: "MB-Vite Multivitamin", href: "/categories/vitamin-supplements?q=vite" },
        { name: "Omega 3 Fish Oil Gold", href: "/categories/vitamin-supplements?q=omega" },
        { name: "Biozyme 5-in-1", href: "/categories/vitamin-supplements" },
      ],
    },
    {
      name: "Accessories",
      slug: "fitness-accessories",
      subcategories: [
        { name: "Cyclone Shakers", href: "/categories/fitness-accessories?q=shaker" },
        { name: "Lifting Straps", href: "/categories/fitness-accessories?q=straps" },
        { name: "Gym Duffle Bags", href: "/categories/fitness-accessories?q=bag" },
      ],
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0c0c0e]/95 backdrop-blur-md border-b border-[#27272f]">
        {/* Top Announcement Bar */}
        <div className="bg-gradient-to-r from-[#ff5c00] via-[#e64a00] to-[#b33600] text-white text-xs py-1.5 px-4 font-medium">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="bg-black/30 text-yellow-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                SALE LIVE
              </span>
              <span>
                ⚡ Extra 10% OFF with code <strong className="underline font-bold">WELCOME10</strong> | Free Cyclone Shaker on orders ₹1999+
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-white/90 text-[11px]">
              <Link href="/authenticity" className="hover:text-yellow-200 flex items-center gap-1 transition">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Authentic Check
              </Link>
              <Link href="/faq" className="hover:text-yellow-200 transition">
                Help & Support
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Mobile Hamburger & Logo */}
            <div className="flex items-center space-x-3">
              <button
                type="button"
                className="lg:hidden p-2 text-zinc-400 hover:text-white rounded-lg focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Fitness Freak Brand Logo */}
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#ff5c00] to-[#b83800] flex items-center justify-center font-black text-white text-xl tracking-tighter shadow-lg shadow-orange-950/50 group-hover:scale-105 transition-transform">
                  FF
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tight text-white uppercase leading-none">
                    FITNESS<span className="text-[#ff5c00]">FREAK</span>
                  </span>
                  <span className="text-[9px] tracking-widest text-zinc-400 font-semibold uppercase">
                    PRO PERFORMANCE
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link
                href="/categories"
                className={`px-3 py-2 text-sm font-semibold rounded-md transition ${
                  pathname === "/categories" ? "text-[#ff5c00]" : "text-zinc-200 hover:text-[#ff5c00]"
                }`}
              >
                All Categories
              </Link>

              {categories.slice(0, 5).map((cat) => (
                <div
                  key={cat.slug}
                  className="relative group"
                  onMouseEnter={() => setActiveMegaMenu(cat.slug)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link
                    href={`/categories/${cat.slug}`}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition ${
                      pathname === `/categories/${cat.slug}`
                        ? "text-[#ff5c00]"
                        : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    {cat.name}
                    {cat.badge && (
                      <span className="text-[9px] bg-[#ff5c00]/20 text-[#ff5c00] font-bold px-1.5 py-0.2 rounded-full border border-[#ff5c00]/30">
                        {cat.badge}
                      </span>
                    )}
                    <ChevronDown className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 group-hover:rotate-180 transition-transform" />
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {activeMegaMenu === cat.slug && (
                    <div className="absolute top-full left-0 w-64 bg-[#141418] border border-[#27272f] shadow-2xl rounded-xl py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-3 pb-2 border-b border-[#27272f]">
                        {cat.name} Collections
                      </div>
                      <div className="py-2 space-y-1">
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-3 py-2 text-xs font-medium text-zinc-300 hover:text-[#ff5c00] hover:bg-zinc-800/60 rounded-md transition"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-[#27272f]">
                        <Link
                          href={`/categories/${cat.slug}`}
                          className="block text-center text-xs font-bold text-[#ff5c00] hover:underline py-1"
                        >
                          View All in {cat.name} &rarr;
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <Link
                href="/deals"
                className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-yellow-400 hover:text-yellow-300 transition"
              >
                <Flame className="w-4 h-4 text-orange-500 animate-pulse" /> Flash Deals
              </Link>
            </nav>

            {/* Right Action Icons (Search, Authenticity, Wishlist, Cart, Account) */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search button trigger */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg border border-[#27272f] text-xs font-medium transition cursor-pointer"
                title="Search products"
              >
                <Search className="w-4 h-4 text-zinc-400" />
                <span className="hidden md:inline">Search supplements...</span>
              </button>

              {/* Authenticity Guaranteed direct badge */}
              <Link
                href="/authenticity"
                className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 text-xs font-medium hover:bg-emerald-900/30 transition"
                title="Verify Batch Authenticity"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify Batch</span>
              </Link>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                className="relative p-2.5 text-zinc-400 hover:text-red-400 hover:bg-zinc-900 rounded-lg transition"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {totalWishlist > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {totalWishlist}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-[#27272f] rounded-lg transition group cursor-pointer"
                title="Open Cart"
              >
                <ShoppingCart className="w-5 h-5 text-zinc-300 group-hover:text-[#ff5c00] transition" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#ff5c00] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-[#0c0c0e]">
                    {totalItems}
                  </span>
                )}
                {subtotal > 0 && (
                  <span className="hidden sm:inline text-xs font-bold text-white">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                )}
              </button>

              {/* User Account Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg border border-[#27272f] transition flex items-center gap-1 cursor-pointer"
                >
                  <User className="w-5 h-5" />
                  {isAuthenticated && (
                    <span className="hidden md:inline text-xs font-medium max-w-[90px] truncate text-zinc-200">
                      {user?.name.split(" ")[0]}
                    </span>
                  )}
                </button>

                {isAccountMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-[#141418] border border-[#27272f] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2"
                    onMouseLeave={() => setIsAccountMenuOpen(false)}
                  >
                    {isAuthenticated ? (
                      <>
                        <div className="px-4 py-2 border-b border-[#27272f]">
                          <div className="text-xs font-bold text-white truncate">{user?.name}</div>
                          <div className="text-[11px] text-zinc-400 truncate">{user?.email}</div>
                          <div className="mt-1">
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-950/60 text-[#ff5c00] border border-[#ff5c00]/30">
                              {user?.role}
                            </span>
                          </div>
                        </div>
                        <Link
                          href="/account"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
                        >
                          <User className="w-4 h-4 text-zinc-400" /> Account Dashboard
                        </Link>
                        <Link
                          href="/account/orders"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
                        >
                          <Package className="w-4 h-4 text-zinc-400" /> My Orders
                        </Link>
                        <Link
                          href="/account/addresses"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
                        >
                          <Layers className="w-4 h-4 text-zinc-400" /> Saved Addresses
                        </Link>
                        {user?.role === "ADMIN" && (
                          <Link
                            href="/admin"
                            onClick={() => setIsAccountMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-xs text-yellow-400 hover:text-yellow-300 hover:bg-zinc-800 transition font-bold"
                          >
                            <Sparkles className="w-4 h-4 text-yellow-400" /> Admin Console
                          </Link>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setIsAccountMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-400 hover:bg-red-950/30 transition text-left cursor-pointer border-t border-[#27272f] mt-1"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-2 border-b border-[#27272f]">
                          <div className="text-xs font-bold text-white">Welcome, Athlete!</div>
                          <div className="text-[11px] text-zinc-400">Access orders & fast checkout</div>
                        </div>
                        <Link
                          href="/login"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="block px-4 py-2 text-xs font-bold text-[#ff5c00] hover:bg-zinc-800 transition"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/register"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="block px-4 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
                        >
                          Create New Account
                        </Link>
                        <div className="p-2 border-t border-[#27272f] bg-zinc-900/50">
                          <p className="text-[10px] text-zinc-400 leading-tight">
                            Demo Account:<br />
                            <strong className="text-zinc-300">demo@fitnessfreak.test</strong><br />
                            Pass: <strong className="text-zinc-300">Password123!</strong>
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#141418] border-b border-[#27272f] px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-4">
            <div className="flex flex-col space-y-2">
              <Link
                href="/categories"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-bold text-[#ff5c00] rounded-lg hover:bg-zinc-800"
              >
                All Categories
              </Link>
              {categories.map((cat) => (
                <div key={cat.slug} className="border-b border-zinc-800/80 pb-2">
                  <Link
                    href={`/categories/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-1.5 text-sm font-medium text-zinc-200"
                  >
                    <span>{cat.name}</span>
                    {cat.badge && (
                      <span className="text-[9px] bg-[#ff5c00]/20 text-[#ff5c00] font-bold px-1.5 py-0.5 rounded-full">
                        {cat.badge}
                      </span>
                    )}
                  </Link>
                  <div className="pl-6 pt-1 space-y-1">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-xs text-zinc-400 hover:text-white py-0.5"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                href="/deals"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-bold text-yellow-400"
              >
                <Flame className="w-4 h-4 text-orange-500" /> Flash Deals
              </Link>
              <Link
                href="/authenticity"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-emerald-400"
              >
                <ShieldCheck className="w-4 h-4" /> Authenticity Verification
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
