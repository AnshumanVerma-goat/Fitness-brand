import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";

interface BrandPageProps {
  params: Promise<{ brand: string }>;
}

export async function generateMetadata({ params }: BrandPageProps) {
  const { brand: slug } = await params;
  const brand = await prisma.brand.findUnique({
    where: { slug },
  });

  if (!brand) return { title: "Brand Not Found - Fitness Freak" };

  return {
    title: `${brand.name} Supplements - Official Store | Fitness Freak`,
    description: `Shop authentic ${brand.name} products directly from the official store.`,
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { brand: slug } = await params;

  const brand = await prisma.brand.findUnique({
    where: { slug },
    include: {
      products: {
        include: {
          category: true,
          brand: true,
          images: { orderBy: { order: "asc" } },
          variants: { orderBy: { price: "asc" } },
        },
      },
    },
  });

  if (!brand) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <span>/</span>
        <span className="text-zinc-500">Brands</span>
        <span>/</span>
        <span className="text-[#ff5c00] font-bold">{brand.name}</span>
      </div>

      <div className="rounded-3xl bg-gradient-to-r from-zinc-900 to-[#141418] border border-[#27272f] p-8 flex items-center justify-between">
        <div>
          <span className="text-xs font-black uppercase text-[#ff5c00] tracking-wider">
            Brand Collection
          </span>
          <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
            {brand.name}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Showing {brand.products.length} authentic products formulated by {brand.name}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {brand.products.map((p) => (
          <ProductCard key={p.id} product={p as any} />
        ))}
      </div>
    </div>
  );
}
