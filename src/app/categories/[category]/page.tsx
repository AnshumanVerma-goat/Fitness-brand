import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CategoryListingClient } from "@/components/CategoryListingClient";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) return { title: "Category Not Found - Fitness Freak" };

  return {
    title: `${category.name} - Buy Authentic Supplements Online | Fitness Freak`,
    description: category.description || `Buy 100% authentic ${category.name} online at best prices.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    notFound();
  }

  // Fetch products under category
  const products = await prisma.product.findMany({
    where: { categoryId: category.id },
    include: {
      category: true,
      brand: true,
      images: { orderBy: { order: "asc" } },
      variants: { orderBy: { price: "asc" } },
    },
    orderBy: { isFeatured: "desc" },
  });

  // Extract unique brands in this category
  const availableBrands = Array.from(
    new Set(products.map((p) => p.brand?.name).filter(Boolean) as string[])
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-white transition">Categories</Link>
        <span>/</span>
        <span className="text-[#ff5c00] font-bold">{category.name}</span>
      </div>

      <CategoryListingClient
        category={category}
        initialProducts={products}
        availableBrands={availableBrands}
      />
    </div>
  );
}
