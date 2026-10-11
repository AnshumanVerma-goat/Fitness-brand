import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { Search, Sparkles, Filter } from "lucide-react";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  return {
    title: q ? `Search results for "${q}" - Fitness Freak` : "Search Supplements - Fitness Freak",
    description: "Search 100% authentic fitness nutrition supplements on Fitness Freak.",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() || "";

  const products = query
    ? await prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { description: { contains: query } },
            { shortDesc: { contains: query } },
            { category: { name: { contains: query } } },
          ],
        },
        include: {
          category: true,
          brand: true,
          images: { orderBy: { order: "asc" } },
          variants: { orderBy: { price: "asc" } },
        },
        orderBy: { reviewCount: "desc" },
      })
    : [];

  const recommendations =
    products.length === 0
      ? await prisma.product.findMany({
          where: { isBestseller: true },
          include: {
            category: true,
            brand: true,
            images: { orderBy: { order: "asc" } },
            variants: { orderBy: { price: "asc" } },
          },
          take: 4,
        })
      : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <span>/</span>
        <span className="text-[#ff5c00] font-bold">Search</span>
      </div>

      {/* Search Header */}
      <div className="rounded-3xl bg-[#141418] border border-[#27272f] p-8">
        <div className="max-w-xl">
          <span className="text-xs font-black uppercase text-[#ff5c00] tracking-wider">
            Search Catalog
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-1">
            {query ? (
              <>
                Search Results for <span className="text-[#ff5c00]">&quot;{query}&quot;</span>
              </>
            ) : (
              "Explore All Supplements"
            )}
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Found <strong className="text-white">{products.length}</strong> matching products
          </p>

          <form action="/search" method="GET" className="mt-4 flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search whey, creatine, peanut butter..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff5c00]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2 bg-[#ff5c00] hover:bg-[#e05200] text-white font-bold text-xs rounded-xl transition"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Results Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p as any} />
          ))}
        </div>
      ) : (
        <div className="space-y-10">
          <div className="bg-[#141418] border border-[#27272f] rounded-2xl p-12 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
              <Search className="w-7 h-7" />
            </div>
            <h2 className="text-base font-bold text-white">No supplements found for &quot;{query}&quot;</h2>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Please check your spelling or search by general keyword like &quot;protein&quot;, &quot;oats&quot;, or &quot;creatine&quot;.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase text-[#ff5c00] tracking-wider mb-4">
              <Sparkles className="w-4 h-4" /> Athlete Favorites You Might Like
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {recommendations.map((p) => (
                <ProductCard key={p.id} product={p as any} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
