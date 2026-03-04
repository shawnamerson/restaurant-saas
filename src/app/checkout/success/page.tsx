export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import config from "../../../../restaurant.config";
import { ClearCartOnMount } from "./ClearCartOnMount";

interface Props {
  searchParams: { order_id?: string };
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const orderId = searchParams.order_id;

  if (!orderId) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <Link href="/menu" className="text-primary hover:text-primary-dark">
          Return to Menu
        </Link>
      </div>
    );
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <Link href="/menu" className="text-primary hover:text-primary-dark">
          Return to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ClearCartOnMount />
      <div className="text-center mb-8">
        <div className="text-green-500 text-5xl mb-4">&#10003;</div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">
          Thank you, {order.customerName}. Your order #{order.orderNumber} has
          been received.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Order Details</h2>
        <div className="space-y-2 mb-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="border-t pt-3 space-y-1">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>{formatPrice(order.tax)}</span>
          </div>
          {order.deliveryFee > 0 && (
            <div className="flex justify-between text-sm">
              <span>Delivery Fee</span>
              <span>{formatPrice(order.deliveryFee)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold pt-2 border-t">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-2">
          {order.type === "PICKUP" ? "Pickup" : "Delivery"} Details
        </h3>
        {order.type === "PICKUP" ? (
          <p className="text-gray-600 text-sm">
            Pick up at {config.contact.address}, {config.contact.city}.
            Estimated time: {config.ordering.estimatedPrepTime}
          </p>
        ) : (
          <p className="text-gray-600 text-sm">
            Delivering to: {order.deliveryAddress}
          </p>
        )}
      </div>

      <div className="text-center space-y-4">
        <Link
          href={`/order/${order.id}`}
          className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Track Order Status
        </Link>
        <br />
        <Link href="/menu" className="text-primary hover:text-primary-dark">
          Order More
        </Link>
      </div>
    </div>
  );
}
