"use client";

import { useCart, CartItem as CartItemType } from "./CartProvider";
import { formatPrice } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
      {item.image ? (
        <div
          className="w-16 h-16 rounded bg-cover bg-center flex-shrink-0"
          style={{ backgroundImage: `url(${item.image})` }}
        />
      ) : (
        <div className="w-16 h-16 rounded bg-gray-200 flex items-center justify-center flex-shrink-0">
          <span className="text-gray-400 text-xl">&#127860;</span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{item.name}</h4>
        <p className="text-primary font-semibold text-sm">
          {formatPrice(item.price)}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold"
          >
            -
          </button>
          <span className="text-sm font-medium w-6 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold"
          >
            +
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-sm">
          {formatPrice(item.price * item.quantity)}
        </p>
        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-700 text-xs mt-1"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
