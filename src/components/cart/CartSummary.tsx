"use client";

import { useCart } from "./CartProvider";
import { formatPrice, calculateTax } from "@/lib/utils";

export function CartSummary() {
  const { subtotal } = useCart();
  const tax = calculateTax(subtotal);

  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium">{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Estimated Tax</span>
        <span className="font-medium">{formatPrice(tax)}</span>
      </div>
      <div className="flex justify-between text-base font-bold pt-2 border-t">
        <span>Estimated Total</span>
        <span>{formatPrice(subtotal + tax)}</span>
      </div>
    </div>
  );
}
