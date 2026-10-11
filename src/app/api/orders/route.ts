import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
      couponCode,
      paymentMethod,
      userId,
    } = body;

    if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required order information" },
        { status: 400 }
      );
    }

    // Verify items and calculate server-side subtotal
    let subtotal = 0;
    const validatedItems: any[] = [];

    for (const item of items) {
      const variant = await prisma.productVariant.findUnique({
        where: { id: item.variantId },
        include: { product: { include: { images: true } } },
      });

      if (!variant) {
        return NextResponse.json(
          { error: `Variant ${item.variantId} not found` },
          { status: 400 }
        );
      }

      const itemTotal = variant.price * item.quantity;
      subtotal += itemTotal;

      validatedItems.push({
        productId: variant.productId,
        variantId: variant.id,
        productName: variant.product.name,
        variantName: `${variant.sizeOrWeight} ${variant.flavor ? `• ${variant.flavor}` : ""}`,
        price: variant.price,
        quantity: item.quantity,
        imageUrl: variant.product.images[0]?.url || item.imageUrl,
      });
    }

    // Validate coupon
    let discountAmount = 0;
    let validCouponCode: string | null = null;

    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.trim().toUpperCase() },
      });

      if (coupon && coupon.isActive && subtotal >= coupon.minOrderValue) {
        validCouponCode = coupon.code;
        if (coupon.discountType === "PERCENTAGE") {
          const raw = (subtotal * coupon.discountValue) / 100;
          discountAmount = coupon.maxDiscount ? Math.min(raw, coupon.maxDiscount) : raw;
        } else if (coupon.discountType === "FLAT") {
          discountAmount = Math.min(coupon.discountValue, subtotal);
        }
      }
    }

    // Shipping calculation
    let shippingFee = subtotal >= 999 ? 0 : 99;
    if (validCouponCode === "FREESHIP" && subtotal >= 499) {
      shippingFee = 0;
    }

    const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);
    const orderNumber = `MB-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    // Create persistent order with items snapshot
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: userId || null,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddressJson: JSON.stringify(shippingAddress),
        subtotal,
        discountAmount,
        shippingFee,
        totalAmount,
        couponCode: validCouponCode,
        paymentMethod: paymentMethod || "COD_SIMULATED",
        status: "DEMO_PLACED",
        items: {
          create: validatedItems,
        },
      },
      include: {
        items: true,
      },
    });

    // If customer selected to save address and is logged in, save it
    if (userId && shippingAddress.saveAddress) {
      try {
        await prisma.address.create({
          data: {
            userId,
            fullName: shippingAddress.fullName || customerName,
            phone: shippingAddress.phone || customerPhone,
            addressLine: shippingAddress.addressLine,
            landmark: shippingAddress.landmark || null,
            city: shippingAddress.city,
            state: shippingAddress.state,
            pincode: shippingAddress.pincode,
          },
        });
      } catch (err) {
        console.warn("Could not save address to user book:", err);
      }
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      order,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to place simulated order" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const orderId = searchParams.get("orderId");
    const orderNumber = searchParams.get("orderNumber");

    if (orderId) {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });
      if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
      return NextResponse.json({ order });
    }

    if (orderNumber) {
      const order = await prisma.order.findUnique({
        where: { orderNumber },
        include: { items: true },
      });
      if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
      return NextResponse.json({ order });
    }

    if (userId) {
      const orders = await prisma.order.findMany({
        where: { userId },
        include: { items: true },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json({ orders });
    }

    // Default admin / all orders
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Orders GET error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve orders" },
      { status: 500 }
    );
  }
}
