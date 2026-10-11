import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { FlashDealsTimer } from "@/components/FlashDealsTimer";
import { Flame, Percent, Tag } from "lucide-react";

export const metadata = {
  title: "Flash Deals & Offers Zone - Fitness Freak",
  description: "Grab limited time heavy discounts, dropped prices, and free shaker combos on authentic supplements.",
};

export default async function DealsPage() {
  const deals = await prisma.product.findMany({
    where: {
      variants: {
        some: { discountPercent: { gte: 20 } },
      },
    },
    include: {
      category: true,
      brand: true,
      images: { orderBy: { order: "asc" } },
      variants: { orderBy: { price: "asc" } },
    },
    orderBy: { reviewCount: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <span>/</span>
        <span className="text-yellow-400 font-bold">Deals & Offers</span>
      </div>

      <div className="rounded-3xl bg-gradient-to-r from-orange-950/80 via-zinc-900 to-black border border-orange-900/40 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-400 tracking-wider">
            <Flame className="w-4 h-4 text-[#ff5c00] animate-pulse" /> Republic Fitness Deals
          </div>
          <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
            Offers Zone & Price Drops
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-xl">
            Save up to 44% on clinically tested whey protein, pre-workouts, pure creatine monohydrate, and high-protein foods.
          </p>
        </div>
        <FlashDealsTimer />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {deals.map((p) => (
          <ProductCard key={p.id} product={p as any} />
        ))}
      </div>
    </div>
  );
}
