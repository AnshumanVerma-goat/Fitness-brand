import React from "react";
import Link from "next/link";
import { Truck, Clock, ShieldCheck, MapPin } from "lucide-react";

export const metadata = {
  title: "Shipping & Delivery Policy - Fitness Freak",
  description: "Learn about Fitness Freak delivery timelines, order dispatch schedules, and free shipping conditions across India.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-[#27272f] pb-4">
        <span className="text-xs font-black uppercase text-[#ff5c00] tracking-wider">
          Delivery Information
        </span>
        <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
          Shipping & Delivery Policy
        </h1>
      </div>

      <div className="bg-[#141418] border border-[#27272f] rounded-3xl p-8 sm:p-10 space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase">1. Dispatch Timelines</h2>
          <p>
            All confirmed orders are processed and dispatched within 24 to 48 hours from our central temperature-regulated warehouse in Gurugram, Haryana. You will receive an SMS and email notification with your tracking ID as soon as your shipment is dispatched.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase">2. Delivery Timeframes</h2>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400">
            <li><strong>Tier 1 Metro Cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata):</strong> 2 to 3 business days.</li>
            <li><strong>Tier 2 Cities & State Capitals:</strong> 3 to 5 business days.</li>
            <li><strong>North-East, J&K, and Remote Locations:</strong> 5 to 7 business days.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase">3. Free Shipping Thresholds</h2>
          <p>
            Standard shipping is <strong>100% FREE</strong> on all orders with a final payable value of <strong>₹999 or more</strong>. For orders below ₹999, a nominal standard handling and courier fee of ₹99 is applied at checkout.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase">4. Cash on Delivery (COD)</h2>
          <p>
            Cash on Delivery is supported across 19,000+ pin codes across India. Exact cash payment is collected by the delivery courier partner upon physical handover of the parcel.
          </p>
        </section>
      </div>
    </div>
  );
}
