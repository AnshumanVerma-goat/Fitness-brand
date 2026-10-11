import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { Sparkles, Trophy } from "lucide-react";

export const metadata = {
  title: "Bestselling Supplements - Fitness Freak",
  description: "India's highest rated sports nutrition supplements backed by millions of workouts.",
};

export default async function BestsellersPage() {
  const products = await prisma.product.findMany({
    where: { isBestseller: true },
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
        <span className="text-[#ff5c00] font-bold">Bestsellers</span>
      </div>

      <div>
        <div className="flex items-center gap-2 text-xs font-black uppercase text-[#ff5c00] tracking-wider">
          <Trophy className="w-4 h-4 text-amber-400" /> Top Rated Products
        </div>
        <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
          Fitness Freak Hall of Fame Bestsellers
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl">
          The supplements trusted day in and day out by India&apos;s champions and fitness enthusiasts.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p as any} />
        ))}
      </div>
    </div>
  );
}
