"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
} from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMsg("Welcome to the Fitness Freak Athlete Club! ⚡");
        setEmail("");
      } else {
        setStatus("error");
        setMsg(data.error || "Subscription failed");
      }
    } catch {
      setStatus("error");
      setMsg("Connection failed");
    }
  };

  return (
    <footer className="bg-[#09090c] border-t border-[#27272f] text-zinc-400 text-xs">
      {/* 1. Value Proposition / Trust Features Strip */}
      <div className="border-b border-[#27272f] bg-zinc-950/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-950/50 border border-[#ff5c00]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#ff5c00]" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">100% Authentic</div>
              <div className="text-[11px] text-zinc-500">Every pack has unique scratch code</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/50 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">Labdoor USA Tested</div>
              <div className="text-[11px] text-zinc-500">NABL lab certificate with every batch</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">Fast & Free Shipping</div>
              <div className="text-[11px] text-zinc-500">Dispatched in 24 hrs for orders ₹999+</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950/50 border border-blue-500/30 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">14 Days Easy Exchange</div>
              <div className="text-[11px] text-zinc-500">Hassle-free replacement policy</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Newsletter Strip */}
      <div className="border-b border-[#27272f] py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-zinc-950 via-[#101015] to-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-extrabold text-lg uppercase tracking-tight">
              JOIN THE <span className="text-[#ff5c00]">FITNESS FREAK</span> ATHLETE CLUB
            </h3>
            <p className="text-zinc-400 text-xs mt-1">
              Get exclusive promo codes, early access to flash drops, and certified nutrition tips.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="flex-1 px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 text-xs outline-none focus:border-[#ff5c00]"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-5 py-2.5 bg-[#ff5c00] hover:bg-[#e05200] text-white font-black uppercase text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer shrink-0 glow-orange-sm"
            >
              {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              Subscribe
            </button>
          </form>
        </div>
        {msg && (
          <div className="max-w-7xl mx-auto mt-2 text-right">
            <span className={`text-[11px] font-bold ${status === "success" ? "text-emerald-400" : "text-rose-400"}`}>
              {msg}
            </span>
          </div>
        )}
      </div>

      {/* 3. Deep Navigation Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Col 1: Categories */}
          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-l-2 border-[#ff5c00] pl-2">
              Product Categories
            </div>
            <ul className="space-y-2">
              <li><Link href="/categories/proteins" className="hover:text-[#ff5c00] transition">Whey Protein</Link></li>
              <li><Link href="/categories/proteins" className="hover:text-[#ff5c00] transition">Isolate Whey</Link></li>
              <li><Link href="/categories/gainers" className="hover:text-[#ff5c00] transition">Mass Gainers</Link></li>
              <li><Link href="/categories/pre-post-workout" className="hover:text-[#ff5c00] transition">Pre-Workout & WrathX</Link></li>
              <li><Link href="/categories/pre-post-workout" className="hover:text-[#ff5c00] transition">Creatine CreAMP</Link></li>
              <li><Link href="/categories/ayurveda" className="hover:text-[#ff5c00] transition">Himalayan Shilajit</Link></li>
              <li><Link href="/categories/fit-foods" className="hover:text-[#ff5c00] transition">High Protein Oats</Link></li>
              <li><Link href="/categories/fit-foods" className="hover:text-[#ff5c00] transition">Peanut Butter</Link></li>
              <li><Link href="/categories/fitness-accessories" className="hover:text-[#ff5c00] transition">Cyclone Shakers</Link></li>
            </ul>
          </div>

          {/* Col 2: Brand Family */}
          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-l-2 border-[#ff5c00] pl-2">
              Brands Portfolio
            </div>
            <ul className="space-y-2">
              <li><Link href="/brands/fitness-freak" className="hover:text-[#ff5c00] transition">Fitness Freak Pro</Link></li>
              <li><Link href="/brands/bgreen" className="hover:text-[#ff5c00] transition">bGreen Plant Nutrition</Link></li>
              <li><Link href="/brands/fuel-one" className="hover:text-[#ff5c00] transition">FF Fuel One</Link></li>
              <li><Link href="/brands/koshaveda" className="hover:text-[#ff5c00] transition">Koshaveda Ayurveda</Link></li>
              <li><Link href="/deals" className="hover:text-[#ff5c00] transition text-yellow-400 font-bold">Special Offers Zone</Link></li>
              <li><Link href="/bestsellers" className="hover:text-[#ff5c00] transition">Bestsellers List</Link></li>
              <li><Link href="/new-arrivals" className="hover:text-[#ff5c00] transition">New Releases</Link></li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-l-2 border-[#ff5c00] pl-2">
              Customer Support
            </div>
            <ul className="space-y-2">
              <li><Link href="/contact" className="hover:text-[#ff5c00] transition">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-[#ff5c00] transition">Frequently Asked Questions</Link></li>
              <li><Link href="/account/orders" className="hover:text-[#ff5c00] transition">Track Your Order</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-[#ff5c00] transition">Shipping Policy</Link></li>
              <li><Link href="/returns-policy" className="hover:text-[#ff5c00] transition">Returns & Exchange</Link></li>
              <li><Link href="/authenticity" className="hover:text-emerald-400 transition font-bold flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Check Authenticity</Link></li>
            </ul>
          </div>

          {/* Col 4: Corporate & Legal */}
          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-l-2 border-[#ff5c00] pl-2">
              Company & Legal
            </div>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-[#ff5c00] transition">Our Story & Mission</Link></li>
              <li><Link href="/blog" className="hover:text-[#ff5c00] transition">Fitness & Nutrition Blog</Link></li>
              <li><Link href="/terms" className="hover:text-[#ff5c00] transition">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#ff5c00] transition">Privacy Policy</Link></li>
              <li><Link href="/admin" className="hover:text-yellow-400 transition font-bold">Admin Console</Link></li>
            </ul>
          </div>

          {/* Col 5: Company Contact details */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-l-2 border-[#ff5c00] pl-2">
              Headquarters
            </div>
            <div className="space-y-3 text-[11px] leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ff5c00] shrink-0 mt-0.5" />
                <span>
                  <strong>FITNESS FREAK NUTRITION PVT. LTD.</strong><br />
                  Tower B, Cyber City, Phase 2, MG Road, Gurugram, Haryana - 122002, India
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#ff5c00] shrink-0" />
                <span>+91 85 277 32 632 (Mon-Sat, 9am-7pm)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#ff5c00] shrink-0" />
                <span>care@fitnessfreak.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Bottom Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-[#27272f] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} Fitness Freak Prototype. Crafted with precision for demonstration purposes. All rights reserved.
          </div>
          <div className="text-center md:text-right max-w-xl text-[10px] text-zinc-600">
            Disclaimer: Dietary supplements are not intended to diagnose, treat, cure, or prevent any disease. Product formulations, images, and nutritional claims shown are simulated demonstration data.
          </div>
        </div>
      </div>
    </footer>
  );
}
