"use client";

import Link from "next/link";
import { useState } from "react";
import config from "../../../restaurant.config";
import { useCart } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function Header() {
  const { totalItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">
                {config.name}
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/menu"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Menu
              </Link>
              <Link
                href="/cart"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Cart
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="relative bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Order Now
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </nav>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t">
              <div className="flex flex-col gap-3 pt-3">
                <Link
                  href="/menu"
                  className="text-gray-700 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Menu
                </Link>
                <Link
                  href="/cart"
                  className="text-gray-700 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cart
                </Link>
                <button
                  onClick={() => {
                    setCartOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="relative bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors w-fit"
                >
                  Order Now
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
