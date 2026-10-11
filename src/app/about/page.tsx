import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, Target, Users, Flame, CheckCircle } from "lucide-react";

export const metadata = {
  title: "About Us - Fitness Freak Our Story & Philosophy",
  description: "Learn about Fitness Freak, established in 2012, revolutionizing sports nutrition in India with clinical research and certified quality.",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-zinc-900 via-[#16161d] to-black border border-[#27272f] p-8 sm:p-12 text-center space-y-4">
        <span className="text-xs font-black uppercase tracking-widest text-[#ff5c00]">
          ESTABLISHED 2012 • INDIA&apos;S #1 SPORTS NUTRITION
        </span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
          Hustle For That Muscle
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Fitness Freak was born with a single mission: to eliminate the gray market of spurious imported supplements in India and create world-class, clinically researched nutrition formulated specifically for Indian athletes.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#141418] border border-[#27272f] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-orange-950/60 text-[#ff5c00] flex items-center justify-center">
            <Flame className="w-5 h-5" />
          </div>
          <h3 className="text-base font-black uppercase text-white">Innovation First</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            From India&apos;s first clinically tested Biozyme whey to Scoop-on-Top hygienic packaging, innovation drives every formulation we release.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#141418] border border-[#27272f] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-950/60 text-amber-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-black uppercase text-white">Labdoor USA Certified</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Our products undergo blind testing at Labdoor USA, Informed Choice UK, and Trustified Gold, guaranteeing zero heavy metals and accurate protein label claims.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#141418] border border-[#27272f] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/60 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-black uppercase text-white">Zero Fake Guarantee</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Over 89+ Lac boxes sold with a 100% genuine scratch code authentication system ensuring complete peace of mind for every Indian fitness enthusiast.
          </p>
        </div>
      </div>

      {/* Story Narrative */}
      <div className="bg-[#141418] border border-[#27272f] rounded-3xl p-8 sm:p-10 space-y-6">
        <h2 className="text-xl sm:text-2xl font-black uppercase text-white">
          Why Indian Athletes Need Tailored Formulations
        </h2>
        <div className="text-xs sm:text-sm text-zinc-300 space-y-4 leading-relaxed">
          <p>
            When bodybuilding took off across India, athletes were forced to rely on imported protein powders formulated for Western diets. However, clinical research conducted with ICMR clinical registry revealed that dietary differences in India lead to lower natural digestive enzyme availability for dense whey proteins.
          </p>
          <p>
            To address this, Fitness Freak spent over two years researching the Enhanced Absorption Formula (EAF®). This patented blend of proteolytic enzymes breaks down whey protein peptide chains significantly faster, eliminating digestive discomfort and maximizing nitrogen retention.
          </p>
        </div>

        <div className="pt-4 border-t border-zinc-800">
          <Link
            href="/categories"
            className="inline-block px-8 py-3.5 bg-[#ff5c00] hover:bg-[#e05200] text-white font-black text-xs uppercase tracking-wider rounded-xl transition glow-orange"
          >
            Explore Our Formulations &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
