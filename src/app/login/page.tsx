"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, Loader2, AlertCircle, CheckCircle, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      router.push("/account");
    } else {
      setErrorMsg(res.message || "Invalid credentials. Try again.");
    }
  };

  const handleFillDemo = (type: "customer" | "admin") => {
    if (type === "customer") {
      setEmail("demo@fitnessfreak.test");
      setPassword("Password123!");
    } else {
      setEmail("admin@fitnessfreak.test");
      setPassword("Admin123!");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      {/* Brand Icon Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff5c00] to-[#b83800] text-white font-black text-2xl flex items-center justify-center mx-auto shadow-lg shadow-orange-950/60">
          FF
        </div>
        <h1 className="text-2xl font-black uppercase text-white tracking-tight">
          Sign In to Fitness Freak
        </h1>
        <p className="text-xs text-zinc-400">
          Access your orders, saved addresses, and athlete benefits.
        </p>
      </div>

      {/* Demo Credentials Quick Fill Box */}
      <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs space-y-2">
        <div className="flex items-center justify-between text-zinc-300 font-bold">
          <span className="flex items-center gap-1.5 text-amber-400">
            <ShieldCheck className="w-4 h-4" /> Seeded Demo Logins
          </span>
          <span className="text-[10px] text-zinc-500">Click to autofill</span>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => handleFillDemo("customer")}
            className="py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-[11px] font-bold border border-zinc-700 transition cursor-pointer text-left"
          >
            🧑 Demo Customer<br />
            <span className="text-[9px] text-zinc-400 font-normal">demo@fitnessfreak.test</span>
          </button>
          <button
            type="button"
            onClick={() => handleFillDemo("admin")}
            className="py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 text-yellow-400 rounded-lg text-[11px] font-bold border border-zinc-700 transition cursor-pointer text-left"
          >
            ⚡ Demo Admin<br />
            <span className="text-[9px] text-zinc-400 font-normal">admin@fitnessfreak.test</span>
          </button>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="bg-[#141418] border border-[#27272f] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-zinc-300 mb-1.5">Email Address</label>
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

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-zinc-300">Password</label>
            <Link href="/forgot-password" className="text-[11px] font-semibold text-[#ff5c00] hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-9 pr-10 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff5c00]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-zinc-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-[#ff5c00] hover:bg-[#e05200] disabled:bg-zinc-800 text-white font-black text-xs uppercase tracking-wider rounded-xl transition glow-orange flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In to Account"}
        </button>

        <div className="text-center pt-2 text-xs text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#ff5c00] font-bold hover:underline">
            Register Now
          </Link>
        </div>
      </form>
    </div>
  );
}
