"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Zap, ShieldCheck, Flame, ArrowRight } from "lucide-react";

interface Slide {
  id: number;
  tag: string;
  tagColor: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  link: string;
  imageUrl: string;
  badge: string;
}

const slides: Slide[] = [
  {
    id: 1,
    tag: "CLINICALLY PROVEN ABSORPTION",
    tagColor: "bg-[#ff5c00] text-white",
    title: "BIOZYME PERFORMANCE WHEY",
    subtitle: "50% Higher Protein Absorption for Indian Bodies",
    description: "Winner of NutraIngredients Award. Tested & Certified by Labdoor USA. Includes complimentary Cyclone Shaker worth ₹699.",
    buttonText: "Shop Biozyme Whey",
    link: "/products/muscleblaze-biozyme-performance-whey",
    imageUrl: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=1200&auto=format&fit=crop&q=80",
    badge: "PRICE DROPPED BY ₹1000",
  },
  {
    id: 2,
    tag: "ATP REPLENISHMENT",
    tagColor: "bg-amber-500 text-black",
    title: "CREAMP CREATINE MONOHYDRATE",
    subtitle: "Smash Plateaus & Fuel Heavy PR Sets",
    description: "India's highest rated micronized creatine. Zero sugar, instant dissolution, and maximum cellular hydration.",
    buttonText: "Grab CreAMP from ₹879",
    link: "/products/muscleblaze-creatine-monohydrate-creamp",
    imageUrl: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=1200&auto=format&fit=crop&q=80",
    badge: "PEOPLE'S CHOICE",
  },
  {
    id: 3,
    tag: "HIGH OCTANE ADRENALINE",
    tagColor: "bg-red-600 text-white",
    title: "PRE WORKOUT WRATHX 300",
    subtitle: "Skin-Splitting Pumps & Fierce Laser Focus",
    description: "4000mg L-Citrulline, 350mg Caffeine + EnXtra with CarnoSyn® Beta-Alanine. Fruit Fury & Cola Frost flavours.",
    buttonText: "Unleash WrathX",
    link: "/products/muscleblaze-pre-workout-wrathx",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80",
    badge: "IN HIGH DEMAND",
  },
  {
    id: 4,
    tag: "CLEAN BULKING & MASS",
    tagColor: "bg-blue-600 text-white",
    title: "SUPER GAINER XXL MASS FORMULA",
    subtitle: "177g Complex Carbs | 60g Multi-Source Protein",
    description: "1:3 macro ratio engineered for hard-gainers with rapid metabolism. Fortified with 27 vitamins and minerals.",
    buttonText: "Shop Mass Gainers",
    link: "/products/muscleblaze-super-gainer-xxl-weight-gainer",
    imageUrl: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=1200&auto=format&fit=crop&q=80",
    badge: "FREE SHAKER WORTH ₹699",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const slide = slides[current];

  return (
    <div
      className="relative w-full overflow-hidden bg-black border-b border-[#27272f]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative min-h-[440px] sm:min-h-[500px] lg:min-h-[560px] flex items-center">
        {/* Background Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover object-center brightness-40 transition-all duration-700 scale-100 animate-in fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-black/60" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
          <div className="max-w-2xl space-y-4 sm:space-y-5 animate-in fade-in slide-in-from-left-4 duration-500">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded shadow ${slide.tagColor}`}>
                {slide.tag}
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-zinc-900/90 text-amber-400 border border-amber-500/30">
                {slide.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl font-bold text-[#ff5c00]">
              {slide.subtitle}
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed">
              {slide.description}
            </p>

            {/* CTA Button */}
            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-4">
              <Link
                href={slide.link}
                className="px-6 sm:px-8 py-3 sm:py-3.5 bg-[#ff5c00] hover:bg-[#e05200] text-white font-black uppercase tracking-wider text-xs sm:text-sm rounded-xl transition glow-orange flex items-center gap-2 shadow-xl shadow-orange-950/60"
              >
                {slide.buttonText} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/categories"
                className="px-6 py-3 sm:py-3.5 bg-zinc-900/80 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm rounded-xl border border-zinc-700 transition"
              >
                Browse All Ranges
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-[#ff5c00] text-white border border-zinc-700 hover:border-transparent flex items-center justify-center transition cursor-pointer backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-[#ff5c00] text-white border border-zinc-700 hover:border-transparent flex items-center justify-center transition cursor-pointer backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                current === idx ? "w-8 bg-[#ff5c00]" : "w-2 bg-zinc-600 hover:bg-zinc-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
