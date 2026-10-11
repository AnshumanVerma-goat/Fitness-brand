import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category");
    const brandSlug = searchParams.get("brand");
    const goal = searchParams.get("goal");
    const search = searchParams.get("q");
    const sort = searchParams.get("sort") || "featured"; // featured, price_asc, price_desc, rating, newest
    const minPrice = searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")!) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) : undefined;
    const isBestseller = searchParams.get("bestseller") === "true";
    const isFeatured = searchParams.get("featured") === "true";
    const isNewArrival = searchParams.get("newArrival") === "true";

    const where: any = {};

    if (categorySlug) {
      const category = await prisma.category.findUnique({
        where: { slug: categorySlug },
      });
      if (category) {
        where.categoryId = category.id;
      }
    }

    if (brandSlug) {
      const brand = await prisma.brand.findUnique({
        where: { slug: brandSlug },
      });
      if (brand) {
        where.brandId = brand.id;
      }
    }

    if (goal) {
      where.goal = goal;
    }

    if (isBestseller) where.isBestseller = true;
    if (isFeatured) where.isFeatured = true;
    if (isNewArrival) where.isNewArrival = true;

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { shortDesc: { contains: search } },
      ];
    }

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price_asc") {
      orderBy = { variants: { _count: "asc" } }; // or order client side after fetching with variants
    } else if (sort === "rating") {
      orderBy = { rating: "desc" };
    } else if (sort === "newest") {
      orderBy = { createdAt: "desc" };
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        brand: true,
        images: { orderBy: { order: "asc" } },
        variants: { orderBy: { price: "asc" } },
      },
      orderBy,
    });

    // Client price filter if min/max requested
    let filtered = products;
    if (minPrice !== undefined || maxPrice !== undefined) {
      filtered = products.filter((p) => {
        const lowestPrice = p.variants[0]?.price ?? 0;
        if (minPrice !== undefined && lowestPrice < minPrice) return false;
        if (maxPrice !== undefined && lowestPrice > maxPrice) return false;
        return true;
      });
    }

    // Sort by price if requested
    if (sort === "price_asc") {
      filtered.sort((a, b) => (a.variants[0]?.price ?? 0) - (b.variants[0]?.price ?? 0));
    } else if (sort === "price_desc") {
      filtered.sort((a, b) => (b.variants[0]?.price ?? 0) - (a.variants[0]?.price ?? 0));
    }

    return NextResponse.json({
      products: filtered,
      total: filtered.length,
    });
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
