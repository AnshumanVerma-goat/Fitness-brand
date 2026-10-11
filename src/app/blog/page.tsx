import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Calendar } from "lucide-react";

export const metadata = {
  title: "Fitness & Nutrition Blog - Fitness Freak",
  description: "Evidence-based sports nutrition guides, training principles, and supplement timing by certified fitness experts.",
};

const articles = [
  {
    slug: "how-much-protein-do-indian-bodies-absorb",
    title: "How Much Protein Do Indian Bodies Really Absorb?",
    excerpt: "Why traditional Indian diets require specialized enzymatic blends like EAF® for complete amino acid uptake without gastric discomfort.",
    category: "Nutrition Science",
    readTime: "5 min read",
    date: "Feb 18, 2026",
    imageUrl: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800&auto=format&fit=crop&q=80",
  },
  {
    slug: "creatine-monohydrate-complete-guide",
    title: "Creatine Monohydrate: Debunking Myths on Water Retention & Hair Loss",
    excerpt: "Everything you need to know about the most researched supplement on earth. Dosage, timing, cellular hydration, and ATP regeneration.",
    category: "Supplement Guide",
    readTime: "7 min read",
    date: "Jan 28, 2026",
    imageUrl: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&auto=format&fit=crop&q=80",
  },
  {
    slug: "clean-bulking-for-hard-gainers",
    title: "Clean Bulking 101: How Hard-Gainers Can Build Muscle Without Belly Fat",
    excerpt: "How to calculate your caloric surplus, utilize complex carbohydrate mass gainers, and balance macro ratios effectively.",
    category: "Muscle Building",
    readTime: "6 min read",
    date: "Jan 12, 2026",
    imageUrl: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="border-b border-[#27272f] pb-4">
        <span className="text-xs font-black uppercase text-[#ff5c00] tracking-wider">
          Evidence-Based Education
        </span>
        <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
          The Athlete Journal
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
          Deep-dive guides into protein assimilation, workout stimulants, and periodized training by certified nutritionists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((art) => (
          <Link
            key={art.slug}
            href={`/blog/${art.slug}`}
            className="group rounded-3xl bg-[#141418] border border-[#27272f] hover:border-[#ff5c00] overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl hover:-translate-y-1"
          >
            <div className="w-full aspect-video bg-zinc-900 overflow-hidden relative">
              <img
                src={art.imageUrl}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#ff5c00] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded shadow">
                {art.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-3 text-[11px] text-zinc-400 mb-2">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {art.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {art.readTime}</span>
                </div>
                <h2 className="text-base font-black text-white group-hover:text-[#ff5c00] transition leading-snug">
                  {art.title}
                </h2>
                <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs font-bold text-[#ff5c00]">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
