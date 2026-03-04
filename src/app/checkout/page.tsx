"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { CartSummary } from "@/components/cart/CartSummary";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import config from "../../../restaurant.config";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [orderType, setOrderType] = useState<"PICKUP" | "DELIVERY">("PICKUP");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-500 mb-8">Your cart is empty.</p>
        <Link
          href="/menu"
          className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.get("customerName"),
          customerEmail: form.get("customerEmail"),
          customerPhone: form.get("customerPhone"),
          orderType,
          deliveryAddress:
            orderType === "DELIVERY" ? form.get("deliveryAddress") : undefined,
          notes: form.get("notes") || undefined,
          items: items.map((i) => ({
            menuItemId: i.id,
            quantity: i.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Order Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order Type
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setOrderType("PICKUP")}
              className={`flex-1 py-3 rounded-lg font-medium border-2 transition-colors ${
                orderType === "PICKUP"
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              Pickup
            </button>
            <button
              type="button"
              onClick={() => setOrderType("DELIVERY")}
              className={`flex-1 py-3 rounded-lg font-medium border-2 transition-colors ${
                orderType === "DELIVERY"
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              Delivery (+{formatPrice(config.ordering.deliveryFee)})
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              name="customerName"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="customerEmail"
              type="email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              name="customerPhone"
              type="tel"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Delivery Address */}
        {orderType === "DELIVERY" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Address
            </label>
            <textarea
              name="deliveryAddress"
              required
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special Instructions (optional)
          </label>
          <textarea
            name="notes"
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="Allergies, dietary restrictions, etc."
          />
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <CartSummary />
          {orderType === "DELIVERY" && (
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-medium">
                {formatPrice(config.ordering.deliveryFee)}
              </span>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || subtotal < config.ordering.minimumOrder}
          className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold text-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Pay with Stripe"}
        </button>

        {subtotal < config.ordering.minimumOrder && (
          <p className="text-sm text-red-500 text-center">
            Minimum order is {formatPrice(config.ordering.minimumOrder)}
          </p>
        )}
      </form>
    </div>
  );
}
