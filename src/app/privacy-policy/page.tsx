import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy - Fitness Freak",
  description: "Fitness Freak data protection, encryption, and customer privacy terms.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-[#27272f] pb-4">
        <span className="text-xs font-black uppercase text-[#ff5c00] tracking-wider">
          Data Protection
        </span>
        <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
          Privacy Policy
        </h1>
      </div>

      <div className="bg-[#141418] border border-[#27272f] rounded-3xl p-8 sm:p-10 space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase">1. Information We Collect</h2>
          <p>
            We collect personal details such as customer name, shipping address, contact telephone, and email for the purpose of simulated order generation, batch verification authentication, and account profile retention.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase">2. Storage & Encryption Standards</h2>
          <p>
            User authentication passwords are encrypted using salted bcrypt hashing algorithms prior to database persistence. Session cookies are marked HttpOnly and SameSite to prevent cross-site interception.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase">3. Third-Party Sharing</h2>
          <p>
            We never sell, rent, or trade customer personal data with unauthorized third parties or marketing brokers.
          </p>
        </section>
      </div>
    </div>
  );
}
