"use client";

import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminMenuPage() {
  const { data: items, error, mutate } = useSWR(
    "/api/admin/menu-items",
    fetcher
  );

  async function deleteItem(id: string, name: string) {
    if (!confirm(`Delete "${name}"?`)) return;
    await fetch(`/api/admin/menu-items/${id}`, { method: "DELETE" });
    mutate();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Menu Items</h1>
        <Link
          href="/admin/menu/new"
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Add Item
        </Link>
      </div>

      {error && <p className="text-red-500">Failed to load menu items.</p>}
      {!items && !error && <p className="text-gray-500">Loading...</p>}

      {items && items.length === 0 && (
        <p className="text-gray-500">No menu items yet.</p>
      )}

      {items && items.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-sm text-gray-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map(
                (item: {
                  id: string;
                  name: string;
                  price: number;
                  available: boolean;
                  featured: boolean;
                  category: { name: string };
                }) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="font-medium">{item.name}</span>
                      {item.featured && (
                        <span className="ml-2 text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {item.category.name}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      ${(item.price / 100).toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          item.available
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.available ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/menu/${item.id}/edit`}
                          className="text-primary hover:text-primary-dark text-sm font-medium"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteItem(item.id, item.name)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
