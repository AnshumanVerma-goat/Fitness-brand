"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface WishlistItemType {
  productId: string;
  name: string;
  price: number;
  mrp: number;
  imageUrl: string;
  slug: string;
  category: string;
}

interface WishlistContextType {
  wishlist: WishlistItemType[];
  addToWishlist: (item: WishlistItemType) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (item: WishlistItemType) => void;
  isInWishlist: (productId: string) => boolean;
  totalWishlist: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItemType[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mb_wishlist_items");
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load wishlist", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("mb_wishlist_items", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to persist wishlist", e);
    }
  }, [wishlist, isInitialized]);

  const addToWishlist = (item: WishlistItemType) => {
    setWishlist((prev) => {
      if (prev.some((i) => i.productId === item.productId)) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((i) => i.productId !== productId));
  };

  const toggleWishlist = (item: WishlistItemType) => {
    if (isInWishlist(item.productId)) {
      removeFromWishlist(item.productId);
    } else {
      addToWishlist(item);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((i) => i.productId === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        totalWishlist: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
