import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "New Arrivals - Latest Supplements & Formulas | Fitness Freak",
  description: "Discover our newest sports nutrition releases, improved formulas, and athletic performance gear.",
};

export default async function NewArrivalsPage() {
  const products = await prisma.product.findMany({
    where: { isNewArrival: true },
    include: {
      category: true,
      brand: true,
      images: { orderBy: { order: "asc" } },
      variants: { orderBy: { price: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <span>/</span>
        <span className="text-amber-400 font-bold">New Arrivals</span>
      </div>

      <div>
        <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-400 tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400" /> Latest Innovation
        </div>
        <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
          Fresh Off The Lab: New Drops
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl">
          Cutting-edge formulas engineered with the latest sports science, clinical bio-availability and modern athletic design.
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
