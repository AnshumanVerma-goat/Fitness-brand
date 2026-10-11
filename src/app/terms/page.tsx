import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions - Fitness Freak",
  description: "Terms and conditions governing the use of Fitness Freak online supplement store.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-[#27272f] pb-4">
        <span className="text-xs font-black uppercase text-[#ff5c00] tracking-wider">
          Legal Agreement
        </span>
        <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
          Terms & Conditions
        </h1>
      </div>

      <div className="bg-[#141418] border border-[#27272f] rounded-3xl p-8 sm:p-10 space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase">1. General Overview</h2>
          <p>
            This website is owned and operated by Bright Lifecare Pvt. Ltd. By accessing our portal, browsing product catalogs, or placing simulated orders, you agree to be bound by the terms and conditions outlined herein.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase">2. Product Formulations & Dietary Advice</h2>
          <p>
            Dietary supplements are intended for healthy adults aged 18 and older. Consult with a qualified sports physician or registered dietitian before beginning any intense training or high-protein supplementation program.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase">3. Prototype Demonstration Notice</h2>
          <p>
            This web application functions as an interactive e-commerce prototype. Demonstration orders do not collect actual financial funds or dispatch physical parcels without real payment gateway credentials configured.
          </p>
        </section>
      </div>
    </div>
  );
}
