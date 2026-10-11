"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  variantName: string;
  price: number;
  mrp: number;
  quantity: number;
  imageUrl: string;
  freebieText?: string | null;
  slug: string;
}

export interface AppliedCoupon {
  code: string;
  discountType: "PERCENTAGE" | "FLAT";
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  mrpTotal: number;
  savingsTotal: number;
  shippingFee: number;
  coupon: AppliedCoupon | null;
  couponDiscount: number;
  finalTotal: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 99;

export const AVAILABLE_COUPONS: AppliedCoupon[] = [
  {
    code: "WELCOME10",
    discountType: "PERCENTAGE",
    discountValue: 10,
    minOrderValue: 999,
    maxDiscount: 500,
  },
  {
    code: "FIT150",
    discountType: "FLAT",
    discountValue: 150,
    minOrderValue: 1299,
    maxDiscount: 150,
  },
  {
    code: "FREESHIP",
    discountType: "FLAT",
    discountValue: 99,
    minOrderValue: 499,
    maxDiscount: 99,
  },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<AppliedCoupon | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("mb_cart_items");
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedCoupon = localStorage.getItem("mb_cart_coupon");
      if (storedCoupon) {
        setCoupon(JSON.parse(storedCoupon));
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("mb_cart_items", JSON.stringify(items));
      if (coupon) {
        localStorage.setItem("mb_cart_coupon", JSON.stringify(coupon));
      } else {
        localStorage.removeItem("mb_cart_coupon");
      }
    } catch (e) {
      console.error("Failed to persist cart to storage", e);
    }
  }, [items, coupon, isInitialized]);

  const addToCart = (newItem: CartItem) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.variantId === newItem.variantId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (variantId: string) => {
    setItems((prev) => prev.filter((i) => i.variantId !== variantId));
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(variantId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.variantId === variantId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const mrpTotal = items.reduce((sum, i) => sum + (i.mrp || i.price) * i.quantity, 0);
  const savingsTotal = Math.max(0, mrpTotal - subtotal);

  let shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : STANDARD_SHIPPING_FEE;
  if (coupon?.code === "FREESHIP" && subtotal >= coupon.minOrderValue) {
    shippingFee = 0;
  }

  // Calculate Coupon Discount
  let couponDiscount = 0;
  if (coupon && subtotal >= coupon.minOrderValue) {
    if (coupon.discountType === "PERCENTAGE") {
      const calculated = (subtotal * coupon.discountValue) / 100;
      couponDiscount = coupon.maxDiscount ? Math.min(calculated, coupon.maxDiscount) : calculated;
    } else if (coupon.discountType === "FLAT") {
      couponDiscount = Math.min(coupon.discountValue, subtotal);
    }
  }

  const finalTotal = Math.max(0, subtotal - couponDiscount + shippingFee);

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const matched = AVAILABLE_COUPONS.find((c) => c.code === trimmed);

    if (!matched) {
      return { success: false, message: "Invalid coupon code. Try WELCOME10, FIT150 or FREESHIP" };
    }

    if (subtotal < matched.minOrderValue) {
      return {
        success: false,
        message: `Cart total must be at least ₹${matched.minOrderValue} to use code ${matched.code}`,
      };
    }

    setCoupon(matched);
    return { success: true, message: `Coupon ${matched.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        mrpTotal,
        savingsTotal,
        shippingFee,
        coupon,
        couponDiscount,
        finalTotal,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
