"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="border-b border-[#27272f] pb-4">
        <span className="text-xs font-black uppercase text-[#ff5c00] tracking-wider">
          Support & Inquiries
        </span>
        <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
          Contact Customer Care
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Have questions about your order, product dosage, or distribution? We&apos;re here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-[#141418] border border-[#27272f] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-950/60 text-[#ff5c00] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase">Customer Care Toll-Free</h3>
            <p className="text-xs text-zinc-400">
              <strong className="text-white text-sm">+91 85 277 32 632</strong><br />
              Monday to Saturday: 9:00 AM – 7:00 PM IST
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#141418] border border-[#27272f] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 text-emerald-400 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase">Email Help Desk</h3>
            <p className="text-xs text-zinc-400">
              <strong className="text-white text-sm">care@fitnessfreak.com</strong><br />
              Responses typically sent within 2 to 4 business hours.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#141418] border border-[#27272f] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950/60 text-blue-400 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase">Corporate Office</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              <strong>FITNESS FREAK NUTRITION PVT. LTD.</strong><br />
              Tower B, Cyber City, Phase 2, MG Road, Gurugram, Haryana - 122002, India
            </p>
          </div>
        </div>

        {/* Message Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#141418] border border-[#27272f] rounded-3xl p-6 sm:p-8">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black uppercase text-white">Message Received!</h3>
              <p className="text-xs text-zinc-300 max-w-sm mx-auto">
                Thank you for contacting Fitness Freak Support. A ticket has been generated and our team will get in touch shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-zinc-800 text-white rounded-xl text-xs font-bold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-base font-black uppercase text-white mb-2">Send Us an Inquiry</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikram Sharma"
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff5c00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vikram@example.com"
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff5c00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Order Delivery Status or Supplement Query"
                  className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff5c00]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe how we can assist you..."
                  className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff5c00]"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 bg-[#ff5c00] hover:bg-[#e05200] text-white font-black text-xs uppercase tracking-wider rounded-xl transition glow-orange flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" /> Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
