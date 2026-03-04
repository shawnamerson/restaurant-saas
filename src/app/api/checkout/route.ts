import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { checkoutSchema } from "@/lib/validators";
import { calculateTax, calculateTotal } from "@/lib/utils";
import config from "../../../../restaurant.config";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Server-side price validation — never trust client prices
    const menuItems = await prisma.menuItem.findMany({
      where: {
        id: { in: data.items.map((i) => i.menuItemId) },
        available: true,
      },
    });

    if (menuItems.length !== data.items.length) {
      return NextResponse.json(
        { error: "Some items are no longer available" },
        { status: 400 }
      );
    }

    const itemMap = new Map(menuItems.map((i) => [i.id, i]));

    const subtotal = data.items.reduce((sum, item) => {
      const menuItem = itemMap.get(item.menuItemId)!;
      return sum + menuItem.price * item.quantity;
    }, 0);

    if (subtotal < config.ordering.minimumOrder) {
      return NextResponse.json(
        { error: `Minimum order is $${(config.ordering.minimumOrder / 100).toFixed(2)}` },
        { status: 400 }
      );
    }

    const tax = calculateTax(subtotal);
    const deliveryFee = data.orderType === "DELIVERY" ? config.ordering.deliveryFee : 0;
    const total = calculateTotal(subtotal, tax, deliveryFee);

    // Create order
    const order = await prisma.order.create({
      data: {
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        type: data.orderType,
        deliveryAddress: data.deliveryAddress,
        notes: data.notes,
        subtotal,
        tax,
        deliveryFee,
        total,
        items: {
          create: data.items.map((item) => {
            const menuItem = itemMap.get(item.menuItemId)!;
            return {
              menuItemId: item.menuItemId,
              name: menuItem.name,
              price: menuItem.price,
              quantity: item.quantity,
            };
          }),
        },
      },
    });

    // Create Stripe Checkout Session
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: data.customerEmail,
      metadata: { orderId: order.id },
      line_items: data.items.map((item) => {
        const menuItem = itemMap.get(item.menuItemId)!;
        return {
          price_data: {
            currency: "usd",
            product_data: { name: menuItem.name },
            unit_amount: menuItem.price,
          },
          quantity: item.quantity,
        };
      }).concat(
        tax > 0
          ? [
              {
                price_data: {
                  currency: "usd",
                  product_data: { name: "Tax" },
                  unit_amount: tax,
                },
                quantity: 1,
              },
            ]
          : [],
        deliveryFee > 0
          ? [
              {
                price_data: {
                  currency: "usd",
                  product_data: { name: "Delivery Fee" },
                  unit_amount: deliveryFee,
                },
                quantity: 1,
              },
            ]
          : []
      ),
      success_url: `${process.env.NEXTAUTH_URL}/checkout/success?order_id=${order.id}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
    });

    // Save Stripe session ID to order
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
