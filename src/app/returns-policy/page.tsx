import React from "react";
import Link from "next/link";
import { RotateCcw, ShieldAlert, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Return & Exchange Policy - Fitness Freak",
  description: "Learn about Fitness Freak 14-day hassle free replacement and refund guidelines.",
};

export default function ReturnsPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-[#27272f] pb-4">
        <span className="text-xs font-black uppercase text-[#ff5c00] tracking-wider">
          Consumer Protection
        </span>
        <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
          Returns & Refunds Policy
        </h1>
      </div>

      <div className="bg-[#141418] border border-[#27272f] rounded-3xl p-8 sm:p-10 space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase">1. 14-Day Replacement Window</h2>
          <p>
            We take extreme pride in our clinical quality standards. In the unlikely event that your supplement arrives damaged in transit, with broken security seals, or incorrect variant fulfillment, you are entitled to a full free replacement within <strong>14 calendar days</strong> of parcel receipt.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase">2. Return Eligibility Conditions</h2>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400">
            <li>The inner safety foil seal must remain unpeeled and intact (unless defect is due to transit puncture).</li>
            <li>The outer batch scratch-off code must match our invoice records.</li>
            <li>All complimentary freebies (such as Cyclone Shakers) must be returned alongside the primary container.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase">3. Refund Processing</h2>
          <p>
            Once the returned parcel reaches our audit facility, inspection is completed within 48 hours. Approved refunds are credited back to the original simulated payment method within 3 to 5 business days.
          </p>
        </section>
      </div>
    </div>
  );
}
