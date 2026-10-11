import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Share2, ShieldCheck } from "lucide-react";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

const articlesMap: Record<string, any> = {
  "how-much-protein-do-indian-bodies-absorb": {
    title: "How Much Protein Do Indian Bodies Really Absorb?",
    date: "Feb 18, 2026",
    readTime: "5 min read",
    category: "Nutrition Science",
    imageUrl: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=1200&auto=format&fit=crop&q=80",
    content: `
### The Indian Dietary Paradox
For decades, sports nutrition literature has prescribed 1.6 to 2.2 grams of protein per kilogram of body weight for individuals engaged in hypertrophy resistance training. However, numerous athletes in India experience bloating, digestive heaviness, and suboptimal muscle recovery despite meeting their daily macro targets.

Why does this happen? The answer lies in gut microbial adaptation and digestive enzyme kinetics.

### The Science of Enhanced Absorption (EAF®)
Traditional Indian diets are predominantly carbohydrate and plant-based (lentils, wheat, rice), which trains the pancreatic secretions to produce higher amylase and lower baseline proteases compared to meat-centric diets. When an athlete suddenly introduces 50g to 75g of dense dairy whey protein daily, the digestive tract struggles to hydrolyze the peptide bonds rapidly.

Fitness Freak Biozyme addresses this exact physiological challenge through the patented Enhanced Absorption Formula (EAF®):
1. **Accelerated Peptide Breakdown:** Clinical trials registered with ICMR's Clinical Trials Registry India demonstrated 50% higher protein absorption and 60% higher BCAA uptake.
2. **Elimination of Gas & Distension:** By ensuring near-complete gastric transit within 90 minutes, unabsorbed peptides do not ferment in the lower colon.
3. **Optimized Muscle Protein Synthesis (MPS):** Rapid leucine elevation in plasma triggers maximal mTOR activation post-workout.
    `,
  },
  "creatine-monohydrate-complete-guide": {
    title: "Creatine Monohydrate: Debunking Myths on Water Retention & Hair Loss",
    date: "Jan 28, 2026",
    readTime: "7 min read",
    category: "Supplement Guide",
    imageUrl: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=1200&auto=format&fit=crop&q=80",
    content: `
### What Is Creatine and How Does It Work?
Creatine is an amino acid derivative naturally synthesized in the liver and kidneys. Inside muscle cells, it binds with high-energy phosphate groups to form phosphocreatine (PCr). During heavy multi-joint compound lifts (such as squats, deadlifts, and bench presses), your cells expend Adenosine Triphosphate (ATP) rapidly. Phosphocreatine donates its phosphate group to replenish ATP within seconds.

### Debunking Common Myths
* **Myth 1: Creatine causes bloating and subcutaneous fat:** False. Creatine draws water into the *intracellular* compartment inside the muscle fiber, making muscles look fuller and harder. It does not cause subcutaneous extracellular water retention.
* **Myth 2: Creatine causes kidney strain:** In healthy individuals without preexisting kidney pathology, dozens of clinical studies have demonstrated that daily intake of 3g-5g of CreAMP micronized creatine for years produces zero negative renal effects.
* **Myth 3: You must consume it with sugar:** While simple sugars elevate insulin slightly, micronized CreAMP has exceptional solubility and will saturate cells regardless of whether taken with water or a protein shake.
    `,
  },
  "clean-bulking-for-hard-gainers": {
    title: "Clean Bulking 101: How Hard-Gainers Can Build Muscle Without Belly Fat",
    date: "Jan 12, 2026",
    readTime: "6 min read",
    category: "Muscle Building",
    imageUrl: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=1200&auto=format&fit=crop&q=80",
    content: `
### The Hard-Gainer Dilemma
Hard-gainers (often ectomorphs) possess high basal metabolic rates and active non-exercise activity thermogenesis (NEAT). Attempting to bulk on chicken and broccoli alone often leads to chronic caloric deficits.

### The 1:3 Golden Macro Ratio
A true muscle mass gainer must supply complex carbohydrates and multi-tier protein in a 1:3 ratio. Fitness Freak Super Gainer XXL provides:
- Complex carbohydrates derived from maltodextrin and oats that replenish glycogen stores without excessive insulin spikes.
- Multi-source proteins (Whey, Casein, Calcium Caseinate) providing sustained amino acid delivery for up to 6 hours.
- Digestive enzymes (DigeZyme) to prevent sluggishness after dense meals.
    `,
  },
};

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articlesMap[slug];
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${article.title} | Fitness Freak Blog`,
    description: article.content.slice(0, 150),
  };
}

export default async function BlogArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articlesMap[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link href="/blog" className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Athlete Journal
      </Link>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-zinc-400">
          <span className="bg-[#ff5c00] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded">
            {article.category}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight leading-tight">
          {article.title}
        </h1>
      </div>

      <div className="w-full aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-[#27272f] shadow-2xl">
        <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
      </div>

      <div className="bg-[#141418] border border-[#27272f] rounded-3xl p-8 sm:p-12 text-zinc-300 text-xs sm:text-sm leading-relaxed space-y-4 whitespace-pre-line">
        {article.content}
      </div>

      <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
        <div className="text-xs text-zinc-400">
          Published by <strong className="text-white">Fitness Freak Research & Clinical Science Team</strong>
        </div>
        <Link
          href="/categories"
          className="px-5 py-2.5 bg-[#ff5c00] hover:bg-[#e05200] text-white font-bold text-xs uppercase rounded-xl transition"
        >
          Shop Relevant Supplements &rarr;
        </Link>
      </div>
    </div>
  );
}
