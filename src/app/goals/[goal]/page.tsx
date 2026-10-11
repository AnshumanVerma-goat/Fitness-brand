import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { Target, Dumbbell, Zap } from "lucide-react";

interface GoalPageProps {
  params: Promise<{ goal: string }>;
}

const goalMetaMap: Record<string, { title: string; desc: string; dbKey: string }> = {
  "muscle-building": {
    title: "Muscle Building & Heavy Strength",
    desc: "Clinically absorbed whey proteins, micronized creatine and amino acids to spark maximum muscular hypertrophy and strength gains.",
    dbKey: "muscle_building",
  },
  "lean-muscle": {
    title: "Lean Muscle & Physique Definition",
    desc: "Zero-carb whey isolates, metabolic catalysts, and clean oat nutrition to carve out razor-sharp vascular definition.",
    dbKey: "lean_muscle",
  },
  "weight-gain": {
    title: "Mass Gain & Caloric Surplus",
    desc: "Dense complex-carbohydrate mass gainers, digestive enzymes and nutrient-rich nut butters for hard-gainers.",
    dbKey: "weight_gain",
  },
  "endurance": {
    title: "Stamina, Energy & Intra-Workout Recovery",
    desc: "High octane pre-workouts, replenishing electrolytes, and cellular vitamins to outlast every grueling session.",
    dbKey: "endurance",
  },
};

export async function generateMetadata({ params }: GoalPageProps) {
  const { goal } = await params;
  const meta = goalMetaMap[goal];
  if (!meta) return { title: "Goal Not Found - Fitness Freak" };
  return {
    title: `${meta.title} - Shop Supplements by Goal | Fitness Freak`,
    description: meta.desc,
  };
}

export default async function GoalPage({ params }: GoalPageProps) {
  const { goal } = await params;
  const meta = goalMetaMap[goal];

  if (!meta) {
    notFound();
  }

  const products = await prisma.product.findMany({
    where: { goal: meta.dbKey },
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
        <span className="text-zinc-500">Goals</span>
        <span>/</span>
        <span className="text-[#ff5c00] font-bold">{meta.title}</span>
      </div>

      <div className="rounded-3xl bg-gradient-to-r from-zinc-900 via-[#181820] to-zinc-950 border border-[#27272f] p-8">
        <div className="flex items-center gap-2 text-xs font-black uppercase text-[#ff5c00] tracking-wider">
          <Target className="w-4 h-4" /> Targeted Goal Stack
        </div>
        <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
          {meta.title}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl">
          {meta.desc}
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
