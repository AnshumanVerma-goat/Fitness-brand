"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Plus, Trash2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AddressesPage() {
  const { user, addAddress } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !addressLine || !city || !state || !pincode) return;

    await addAddress({
      fullName,
      phone,
      addressLine,
      landmark,
      city,
      state,
      pincode,
    });

    setShowAddForm(false);
    setFullName("");
    setPhone("");
    setAddressLine("");
    setLandmark("");
    setCity("");
    setState("");
    setPincode("");
  };

  const addresses = user?.addresses || [
    {
      id: "addr_1",
      fullName: "Vikram Sharma",
      phone: "+91 9876543210",
      addressLine: "Flat 402, Tower 4, DLF Phase 5, Golf Course Road",
      landmark: "Near One Horizon Center",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122002",
      isDefault: true,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <Link href="/account" className="hover:text-white transition flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>
      </div>

      <div className="flex items-center justify-between border-b border-[#27272f] pb-4">
        <div>
          <span className="text-xs font-black uppercase text-[#ff5c00] tracking-wider">
            Address Book
          </span>
          <h1 className="text-2xl font-black uppercase text-white tracking-tight mt-1">
            Saved Delivery Addresses
          </h1>
        </div>
        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-[#ff5c00] hover:bg-[#e05200] text-white font-bold text-xs uppercase rounded-xl transition flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Address
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreate} className="bg-[#141418] border border-[#27272f] rounded-2xl p-6 space-y-4 animate-in fade-in">
          <h3 className="text-sm font-bold uppercase text-white">Add Delivery Destination</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white outline-none focus:border-[#ff5c00]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white outline-none focus:border-[#ff5c00]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-zinc-300 mb-1">Street Address</label>
              <input
                type="text"
                required
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white outline-none focus:border-[#ff5c00]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">City</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white outline-none focus:border-[#ff5c00]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">State</label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white outline-none focus:border-[#ff5c00]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">PIN Code</label>
              <input
                type="text"
                required
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white outline-none focus:border-[#ff5c00]"
              />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#ff5c00] text-white text-xs font-bold rounded-xl"
            >
              Save Address
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-5 py-2.5 bg-zinc-800 text-zinc-300 text-xs font-bold rounded-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr, idx) => (
          <div
            key={addr.id || idx}
            className="p-5 rounded-2xl bg-[#141418] border border-[#27272f] space-y-3 relative"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ff5c00]" /> {addr.fullName}
              </span>
              {addr.isDefault && (
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/40 px-2 py-0.5 rounded font-bold">
                  Default Address
                </span>
              )}
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              {addr.addressLine} {addr.landmark ? `, Near ${addr.landmark}` : ""}<br />
              {addr.city}, {addr.state} - {addr.pincode}<br />
              Phone: {addr.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
