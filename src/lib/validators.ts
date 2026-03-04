import { z } from "zod";

export const checkoutSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerPhone: z.string().min(10, "Valid phone number is required"),
  orderType: z.enum(["PICKUP", "DELIVERY"]),
  deliveryAddress: z.string().optional(),
  notes: z.string().optional(),
  items: z
    .array(
      z.object({
        menuItemId: z.string(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1, "At least one item is required"),
});

export const orderStatusSchema = z.object({
  status: z.enum(["RECEIVED", "PREPARING", "READY", "COMPLETED", "CANCELLED"]),
});

export const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number().int().positive("Price must be positive"),
  image: z.string().optional(),
  available: z.boolean().optional(),
  featured: z.boolean().optional(),
  categoryId: z.string().min(1, "Category is required"),
  sortOrder: z.number().int().optional(),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  sortOrder: z.number().int().optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type OrderStatusInput = z.infer<typeof orderStatusSchema>;
export type MenuItemInput = z.infer<typeof menuItemSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
