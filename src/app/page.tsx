import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { HeroSlider } from "@/components/HeroSlider";
import { FlashDealsTimer } from "@/components/FlashDealsTimer";
import {
  ShieldCheck,
  Award,
  Zap,
  TrendingUp,
  Target,
  Dumbbell,
  Sparkles,
  Flame,
  ArrowRight,
  CheckCircle,
  FlaskConical,
} from "lucide-react";

export default async function HomePage() {
  // Fetch bestsellers, featured products, combos, and fit foods
  const [bestsellers, flashDeals, fitFoods, combos, categories] = await Promise.all([
    prisma.product.findMany({
      where: { isBestseller: true },
      include: {
        category: true,
        brand: true,
        images: { orderBy: { order: "asc" } },
        variants: { orderBy: { price: "asc" } },
      },
      take: 8,
    }),
    prisma.product.findMany({
      where: {
        variants: {
          some: { discountPercent: { gte: 25 } },
        },
      },
      include: {
        category: true,
        brand: true,
        images: { orderBy: { order: "asc" } },
        variants: { orderBy: { price: "asc" } },
      },
      take: 6,
    }),
    prisma.product.findMany({
      where: { category: { slug: "fit-foods" } },
      include: {
        category: true,
        brand: true,
        images: { orderBy: { order: "asc" } },
        variants: { orderBy: { price: "asc" } },
      },
      take: 4,
    }),
    prisma.product.findMany({
      where: {
        name: { contains: "Combo" },
      },
      include: {
        category: true,
        brand: true,
        images: { orderBy: { order: "asc" } },
        variants: { orderBy: { price: "asc" } },
      },
      take: 4,
    }),
    prisma.category.findMany({
      orderBy: { order: "asc" },
      take: 8,
    }),
  ]);

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* 1. Hero Campaign Banner Carousel */}
      <HeroSlider />

      {/* 2. Quick Category Circular Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#ff5c00]" /> Top Categories
          </h2>
          <Link
            href="/categories"
            className="text-xs font-bold text-[#ff5c00] hover:underline flex items-center gap-1"
          >
            All Categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="flex flex-col items-center group text-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-zinc-900 border border-[#27272f] group-hover:border-[#ff5c00] p-1 overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-orange-950/40 flex items-center justify-center">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <Dumbbell className="w-6 h-6 text-[#ff5c00]" />
                )}
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-zinc-300 group-hover:text-[#ff5c00] transition mt-2 line-clamp-1">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Bestsellers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2 border-b border-[#27272f] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#ff5c00] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Most Loved By Athletes
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
              Bestsellers in Sports Nutrition
            </h2>
          </div>
          <Link
            href="/bestsellers"
            className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-1 transition"
          >
            View All Bestsellers &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Flash Deals & Special Offers with Countdown Timer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-zinc-900 via-[#16161c] to-zinc-950 border border-orange-900/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400">
                <Flame className="w-4 h-4 text-[#ff5c00] animate-bounce" /> Limited Time Heavy Discounts
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-1">
                Flash Deals & Price Drops
              </h2>
            </div>
            <FlashDealsTimer />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {flashDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Super Saver Stacks & Combos */}
      {combos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2 border-b border-[#27272f] pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <Zap className="w-4 h-4" /> Maximum Synergy & Savings
              </div>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                Super Saver Stacks
              </h2>
            </div>
            <Link
              href="/categories/proteins?q=combo"
              className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-1 transition"
            >
              Explore All Stacks &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {combos.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 6. Eat. Fit. Repeat. (Fit Foods Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#141418] border border-[#27272f] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-[#ff5c00]">
                Clean Fuel For Daily Gains
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                Eat. Fit. Repeat.
              </h2>
            </div>
            <Link
              href="/categories/fit-foods"
              className="text-xs font-bold text-zinc-400 hover:text-[#ff5c00] transition"
            >
              Browse Fit Foods Catalog &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fitFoods.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Shop by Goal & Shop by Level */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-black uppercase tracking-widest text-[#ff5c00]">
            Personalized Supplementation
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-1">
            Shop By Fitness Goal
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Whether your target is raw muscle hypertrophy, shredded fat loss, or unyielding athletic stamina, find your exact stack.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <Link
            href="/goals/muscle-building"
            className="group relative rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-[#27272f] hover:border-[#ff5c00] p-6 transition duration-300 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 rounded-xl bg-orange-950/60 border border-[#ff5c00]/40 flex items-center justify-center text-[#ff5c00]">
                <Dumbbell className="w-5 h-5" />
              </span>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#ff5c00] group-hover:translate-x-1 transition" />
            </div>
            <h3 className="text-lg font-black uppercase text-white group-hover:text-[#ff5c00] transition">
              Muscle Building & PRs
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Biozyme Whey, Micronized CreAMP Creatine & PR breaking post-workout formulas.
            </p>
          </Link>

          <Link
            href="/goals/lean-muscle"
            className="group relative rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-[#27272f] hover:border-[#ff5c00] p-6 transition duration-300 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Target className="w-5 h-5" />
              </span>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#ff5c00] group-hover:translate-x-1 transition" />
            </div>
            <h3 className="text-lg font-black uppercase text-white group-hover:text-[#ff5c00] transition">
              Lean Muscle & Cutting
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Zero Carb Whey Isolates, Liquid L-Carnitine Pro & high-protein clean oats.
            </p>
          </Link>

          <Link
            href="/goals/weight-gain"
            className="group relative rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-[#27272f] hover:border-[#ff5c00] p-6 transition duration-300 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Zap className="w-5 h-5" />
              </span>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#ff5c00] group-hover:translate-x-1 transition" />
            </div>
            <h3 className="text-lg font-black uppercase text-white group-hover:text-[#ff5c00] transition">
              Heavy Mass & Bulking
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Super Gainer XXL, Fuel One high calorie formulas & dense peanut butter spreads.
            </p>
          </Link>
        </div>
      </section>

      {/* 8. Science & Authenticity Trust Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#101015] via-[#14141c] to-[#0c0c0e] border border-[#27272f] p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-4">
                <ShieldCheck className="w-4 h-4" /> 100% Authentic Guarantee
              </div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight leading-tight">
                SCIENCE BEHIND <span className="text-[#ff5c00]">BIOZYME</span> & THE ZERO FAKE PROMISE
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 mt-4 leading-relaxed">
                Indian diets differ significantly from Western diets. Fitness Freak Biozyme is India&apos;s first clinically tested whey protein formulated with patented EAF® (Enhanced Absorption Formula) that delivers 50% higher protein absorption and eliminates digestion bloat.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800">
                  <div className="text-xl sm:text-2xl font-black text-[#ff5c00]">50% Higher</div>
                  <div className="text-xs text-zinc-400 mt-0.5">Protein Absorption Rate</div>
                </div>
                <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800">
                  <div className="text-xl sm:text-2xl font-black text-amber-400">Labdoor USA</div>
                  <div className="text-xs text-zinc-400 mt-0.5">Blind Tested & Certified</div>
                </div>
                <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800">
                  <div className="text-xl sm:text-2xl font-black text-emerald-400">ICMR Registry</div>
                  <div className="text-xs text-zinc-400 mt-0.5">Clinical Trial Verified</div>
                </div>
                <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800">
                  <div className="text-xl sm:text-2xl font-black text-blue-400">NABL Tested</div>
                  <div className="text-xs text-zinc-400 mt-0.5">Batch Lab Reports Online</div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/authenticity"
                  className="px-6 py-3 rounded-xl bg-[#ff5c00] hover:bg-[#e05200] text-white text-xs font-black uppercase tracking-wider transition glow-orange-sm flex items-center gap-2"
                >
                  <FlaskConical className="w-4 h-4" /> Check Batch Authenticity
                </Link>
                <Link
                  href="/about"
                  className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition border border-zinc-700"
                >
                  Read Clinical Whitepaper
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="w-full aspect-video sm:aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-700/80 shadow-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80"
                  alt="Fitness Freak Athlete"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-[10px] font-black uppercase bg-[#ff5c00] text-white px-2 py-0.5 rounded">
                      VERIFIED BATCH
                    </span>
                    <h4 className="text-lg font-black text-white mt-1">
                      Say No To Counterfeits
                    </h4>
                    <p className="text-xs text-zinc-300">
                      Every Fitness Freak tub carries a unique scratch authentication code. SMS or verify online for 100% peace of mind.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
