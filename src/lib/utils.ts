import config from "../../restaurant.config";

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function calculateTax(subtotal: number): number {
  return Math.round(subtotal * config.ordering.taxRate);
}

export function calculateTotal(
  subtotal: number,
  tax: number,
  deliveryFee: number = 0
): number {
  return subtotal + tax + deliveryFee;
}

export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
