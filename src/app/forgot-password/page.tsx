"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-black uppercase text-white tracking-tight">
          Reset Password
        </h1>
        <p className="text-xs text-zinc-400">
          Enter your registered email address and we will send a password reset simulation link.
        </p>
      </div>

      <div className="bg-[#141418] border border-[#27272f] rounded-2xl p-6 sm:p-8 space-y-4">
        {submitted ? (
          <div className="text-center space-y-3 py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">Reset Link Dispatched (Simulated)</h3>
            <p className="text-xs text-zinc-400">
              For local demonstration purposes, you can login directly using <strong className="text-white">demo@fitnessfreak.test</strong> and password <strong className="text-white">Password123!</strong>.
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="inline-block px-6 py-2.5 bg-[#ff5c00] text-white font-bold text-xs uppercase rounded-xl"
              >
                Return to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">Registered Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="athlete@example.com"
                  className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff5c00]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#ff5c00] hover:bg-[#e05200] text-white font-black text-xs uppercase tracking-wider rounded-xl transition glow-orange cursor-pointer"
            >
              Send Reset Instructions
            </button>

            <div className="text-center pt-2">
              <Link href="/login" className="text-xs text-zinc-400 hover:text-white flex items-center justify-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
