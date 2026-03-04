"use client";

import { useCart } from "./CartProvider";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import Link from "next/link";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <CartDrawerContent onClose={onClose} />
      </div>
    </>
  );
}

function CartDrawerContent({ onClose }: { onClose: () => void }) {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link
            href="/menu"
            onClick={onClose}
            className="text-primary hover:text-primary-dark font-medium"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="border-t p-4">
        <CartSummary />
        <Link
          href="/checkout"
          onClick={onClose}
          className="block w-full bg-primary hover:bg-primary-dark text-white text-center py-3 rounded-lg font-semibold transition-colors mt-4"
        >
          Checkout
        </Link>
      </div>
    </>
  );
}
