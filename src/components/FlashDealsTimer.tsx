"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export function FlashDealsTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 }; // reset
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-2 bg-black/60 border border-orange-950 px-4 py-2 rounded-2xl w-fit backdrop-blur-md">
      <Clock className="w-4 h-4 text-[#ff5c00] animate-pulse" />
      <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Ends In:</span>
      <div className="flex items-center gap-1 font-mono text-sm font-black text-white">
        <span className="bg-zinc-800 px-2 py-0.5 rounded text-amber-400 border border-zinc-700">
          {format(timeLeft.hours)}
        </span>
        <span className="text-zinc-500">:</span>
        <span className="bg-zinc-800 px-2 py-0.5 rounded text-amber-400 border border-zinc-700">
          {format(timeLeft.minutes)}
        </span>
        <span className="text-zinc-500">:</span>
        <span className="bg-zinc-800 px-2 py-0.5 rounded text-[#ff5c00] border border-zinc-700">
          {format(timeLeft.seconds)}
        </span>
      </div>
    </div>
  );
}
