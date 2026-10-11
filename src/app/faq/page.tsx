"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, Search } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "Proteins & Biozyme",
    q: "What makes Fitness Freak Biozyme Whey different from regular whey?",
    a: "Biozyme Whey is India's first clinically tested protein featuring the patented Enhanced Absorption Formula (EAF®). It is proven to deliver 50% higher protein absorption and 60% higher BCAA absorption, virtually eliminating the stomach bloating and gas commonly experienced by athletes.",
  },
  {
    category: "Proteins & Biozyme",
    q: "Can lactose-intolerant individuals consume Biozyme Iso-Zero?",
    a: "Yes! Biozyme Iso-Zero undergoes cross-flow microfiltration to filter out all lactose and residual carbohydrates, leaving behind 27g of pure isolate protein per scoop. Alternatively, you can opt for bGreen 100% Pea & Brown Rice Plant Protein.",
  },
  {
    category: "Creatine & Pre-Workout",
    q: "Do I need to do a loading phase for CreAMP Creatine Monohydrate?",
    a: "While a traditional 5-day loading phase (20g/day) saturates muscle cells faster, taking 3g of CreAMP daily consistently achieves complete muscle saturation within 3 weeks without any gastrointestinal discomfort. Ensure you drink 3-4 liters of water daily.",
  },
  {
    category: "Creatine & Pre-Workout",
    q: "When should I take Pre-Workout WrathX?",
    a: "Consume 1 level scoop (or 1/2 scoop if assessing tolerance) mixed in 250ml chilled water 20 to 30 minutes before your workout session. Do not consume within 4-5 hours of bedtime due to high caffeine potency.",
  },
  {
    category: "Orders & Shipping",
    q: "How many days does delivery take?",
    a: "Orders are dispatched within 24 hours from our centralized temperature-controlled warehouse in Gurugram, Haryana. Metro cities typically receive deliveries within 2 to 3 business days; other locations within 3 to 5 business days.",
  },
  {
    category: "Orders & Shipping",
    q: "What is your return and exchange policy?",
    a: "We offer a 14-day hassle-free exchange policy. If your product arrives damaged or you wish to change flavors before opening the seal, contact our customer support team for an immediate replacement.",
  },
  {
    category: "Authenticity & Safety",
    q: "How do I verify if my Fitness Freak product is original?",
    a: "Every product jar features an authentic scratch-off seal on the cap. Scratch it to reveal the unique code, then visit our Authenticity Verification page (/authenticity) or SMS 'FF <CODE>' to 57575 to receive instant batch verification and lab test results.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <span className="text-xs font-black uppercase tracking-widest text-[#ff5c00]">
          Help Center
        </span>
        <h1 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
          Everything you need to know about Fitness Freak supplement intake, dosage, authenticity checks, and shipping policies.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto pt-4">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search questions (e.g. Biozyme, Creatine, Delivery)..."
              className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff5c00]"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-[#141418] border border-[#27272f] rounded-2xl overflow-hidden transition"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-800/40 transition"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff5c00]">
                    {faq.category}
                  </span>
                  <div className="text-sm font-bold text-white mt-0.5">{faq.q}</div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-[#ff5c00]" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs text-zinc-300 leading-relaxed border-t border-zinc-800/60 pt-3 animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
