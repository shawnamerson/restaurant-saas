"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";

export default function CartPage() {
  const { items, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
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

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-red-500 hover:text-red-700 text-sm font-medium"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-3 mb-8">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <CartSummary />
      </div>

      <Link
        href="/checkout"
        className="block w-full bg-primary hover:bg-primary-dark text-white text-center py-3 rounded-lg font-semibold transition-colors text-lg"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
