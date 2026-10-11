"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  FileText,
  AlertCircle,
  HelpCircle,
  Download,
  Search,
} from "lucide-react";

export default function AuthenticityPage() {
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState("");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!code.trim()) {
      setError("Please enter the unique scratch code from your product tub.");
      return;
    }

    // Verified demo response
    setResult({
      verified: true,
      batchNumber: "FF-BIO-2026-X04",
      productName: "Fitness Freak Biozyme Performance Whey (Rich Chocolate 2kg)",
      mfgDate: "15 Jan 2026",
      expiryDate: "14 Jul 2027",
      labdoorStatus: "100% Certified - Score: 98.4/100",
      proteinAccuracy: "Claimed: 25.0g | Lab Result: 25.4g (+1.6%)",
      heavyMetals: "Lead, Mercury, Arsenic: Below Detection Limit (SAFE)",
      bannedSubstances: "WADA Banned Substances Screen: Negative",
    });
  };

  const handleDemoFill = () => {
    setCode("FF88492026");
    setPhone("+91 9876543210");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <span>/</span>
        <span className="text-emerald-400 font-bold">Authenticity Guaranteed</span>
      </div>

      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950/80 via-zinc-900 to-black border border-emerald-800/40 p-8 sm:p-12 text-center space-y-4 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
          ZERO COUNTERFEIT PROMISE
        </span>
        <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
          Check Batch Authenticity & Lab Reports
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
          Every authentic Fitness Freak product tub is protected with a unique scratch-off code and tested in third-party NABL accredited labs. Verify your batch below.
        </p>
      </div>

      {/* Verification Tool */}
      <div className="bg-[#141418] border border-[#27272f] rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-lg font-black uppercase text-white">Enter Your Verification Code</h2>
            <p className="text-xs text-zinc-400">Locate the scratch sticker on the lid of your supplement jar.</p>
          </div>
          <button
            type="button"
            onClick={handleDemoFill}
            className="text-xs text-amber-400 hover:underline font-bold self-start sm:self-auto cursor-pointer"
          >
            ⚡ Click here to autofill sample code
          </button>
        </div>

        <form onSubmit={handleVerify} className="space-y-4 max-w-xl">
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1.5">Authentication Code (e.g. MB88492026)</label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Enter 8 to 10 alphanumeric digits"
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm font-mono text-white placeholder-zinc-500 uppercase outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1.5">Your Mobile Number (Optional)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 9876543210"
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/50"
          >
            <Search className="w-4 h-4" /> Verify Product Genuineness
          </button>
        </form>

        {/* Verification Result Card */}
        {result && (
          <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/60 pb-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-base font-black text-white">100% GENUINE AUTHENTIC PRODUCT</div>
                  <div className="text-xs text-emerald-300 font-mono">Batch: {result.batchNumber}</div>
                </div>
              </div>
              <span className="text-xs font-black uppercase px-3 py-1 bg-emerald-500 text-black rounded-lg">
                PASSED ALL SAFETY CHECKS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 space-y-1">
                <span className="text-zinc-500">Verified Product</span>
                <div className="font-bold text-white">{result.productName}</div>
              </div>
              <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 space-y-1">
                <span className="text-zinc-500">Manufacturing & Expiry</span>
                <div className="font-bold text-white">Mfg: {result.mfgDate} | Exp: {result.expiryDate}</div>
              </div>
              <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 space-y-1">
                <span className="text-zinc-500">Protein Accuracy Assay</span>
                <div className="font-bold text-emerald-400">{result.proteinAccuracy}</div>
              </div>
              <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 space-y-1">
                <span className="text-zinc-500">Labdoor USA Safety Rating</span>
                <div className="font-bold text-amber-400">{result.labdoorStatus}</div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <div className="text-xs text-zinc-400 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>NABL Accredited Analytical Lab Report Ref: #NABL-2026-981042</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3 Step Verification Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#141418] border border-[#27272f] space-y-2">
          <div className="w-8 h-8 rounded-lg bg-orange-950/60 text-[#ff5c00] font-black text-sm flex items-center justify-center">
            1
          </div>
          <h3 className="text-sm font-bold text-white">Locate the Scratch Seal</h3>
          <p className="text-xs text-zinc-400">
            Check the tamper-evident metallic sticker attached to the product seal or lid.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#141418] border border-[#27272f] space-y-2">
          <div className="w-8 h-8 rounded-lg bg-orange-950/60 text-[#ff5c00] font-black text-sm flex items-center justify-center">
            2
          </div>
          <h3 className="text-sm font-bold text-white">Scratch Gently</h3>
          <p className="text-xs text-zinc-400">
            Gently scratch off the silver coating with a coin to reveal the unique code.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#141418] border border-[#27272f] space-y-2">
          <div className="w-8 h-8 rounded-lg bg-orange-950/60 text-[#ff5c00] font-black text-sm flex items-center justify-center">
            3
          </div>
          <h3 className="text-sm font-bold text-white">Enter & Verify Online</h3>
          <p className="text-xs text-zinc-400">
            Submit the code on this page or SMS &apos;FF &lt;CODE&gt;&apos; to 57575 for instant verification.
          </p>
        </div>
      </div>
    </div>
  );
}
