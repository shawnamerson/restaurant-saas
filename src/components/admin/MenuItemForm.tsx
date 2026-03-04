"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
}

interface MenuItemFormProps {
  initialData?: {
    name: string;
    description: string;
    price: number;
    image: string;
    available: boolean;
    featured: boolean;
    categoryId: string;
    sortOrder: number;
  };
  itemId?: string;
}

export function MenuItemForm({ initialData, itemId }: MenuItemFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then(setCategories);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name") as string,
      description: (form.get("description") as string) || undefined,
      price: Math.round(parseFloat(form.get("price") as string) * 100),
      image: (form.get("image") as string) || undefined,
      available: form.get("available") === "on",
      featured: form.get("featured") === "on",
      categoryId: form.get("categoryId") as string,
      sortOrder: parseInt(form.get("sortOrder") as string) || 0,
    };

    try {
      const url = itemId
        ? `/api/admin/menu-items/${itemId}`
        : "/api/admin/menu-items";
      const method = itemId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Something went wrong");
        setLoading(false);
        return;
      }

      router.push("/admin/menu");
      router.refresh();
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          name="name"
          required
          defaultValue={initialData?.name}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          rows={2}
          defaultValue={initialData?.description}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price ($)
          </label>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0.01"
            required
            defaultValue={
              initialData ? (initialData.price / 100).toFixed(2) : ""
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="categoryId"
            required
            defaultValue={initialData?.categoryId}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          name="image"
          defaultValue={initialData?.image}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          placeholder="/images/menu/item.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sort Order
        </label>
        <input
          name="sortOrder"
          type="number"
          defaultValue={initialData?.sortOrder || 0}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            name="available"
            type="checkbox"
            defaultChecked={initialData?.available ?? true}
            className="rounded"
          />
          <span className="text-sm">Available</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            name="featured"
            type="checkbox"
            defaultChecked={initialData?.featured ?? false}
            className="rounded"
          />
          <span className="text-sm">Featured</span>
        </label>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-semibold transition-colors disabled:bg-gray-300"
        >
          {loading ? "Saving..." : itemId ? "Update Item" : "Create Item"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 rounded-lg font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
