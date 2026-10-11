import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Dumbbell, ArrowRight } from "lucide-react";

export const metadata = {
  title: "All Categories - Fitness Freak Sports Nutrition",
  description: "Browse all authentic fitness nutrition categories: Whey Proteins, Mass Gainers, Creatine, Pre-Workout, Ayurveda, and Fit Foods.",
};

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { products: true } },
    },
    orderBy: { order: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <span>/</span>
        <span className="text-[#ff5c00] font-bold">Categories</span>
      </div>

      <div>
        <span className="text-xs font-black uppercase tracking-wider text-[#ff5c00]">
          Complete Range
        </span>
        <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
          Explore Product Categories
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl">
          Engineered for raw gym performance, clinical absorption, and clean nutritional fuel. Choose your supplement category below.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="group relative rounded-2xl bg-[#141418] hover:bg-[#191922] border border-[#27272f] hover:border-[#ff5c00] overflow-hidden transition-all duration-300 flex flex-col shadow-lg hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="w-full aspect-[4/3] bg-zinc-900 overflow-hidden relative">
              {cat.image ? (
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Dumbbell className="w-12 h-12 text-[#ff5c00]" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="bg-black/60 backdrop-blur-md text-amber-400 text-[10px] font-black uppercase px-2.5 py-1 rounded-md border border-zinc-700">
                  {cat._count.products} Products
                </span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-black uppercase text-white group-hover:text-[#ff5c00] transition">
                  {cat.name}
                </h2>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs font-bold text-[#ff5c00]">
                <span>View Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
