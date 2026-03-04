"use client";

import { formatPrice } from "@/lib/utils";
import { useCart } from "@/components/cart/CartProvider";

interface MenuItemCardProps {
  item: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    image: string | null;
    available: boolean;
  };
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {item.image && (
        <div
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${item.image})` }}
        />
      )}
      {!item.image && (
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-4xl">&#127860;</span>
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <span className="text-primary font-bold whitespace-nowrap ml-2">
            {formatPrice(item.price)}
          </span>
        </div>
        {item.description && (
          <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        )}
        <button
          onClick={() =>
            addItem({
              id: item.id,
              name: item.name,
              price: item.price,
              image: item.image,
            })
          }
          disabled={!item.available}
          className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {item.available ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}
