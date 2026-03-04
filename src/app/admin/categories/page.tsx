"use client";

import useSWR from "swr";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminCategoriesPage() {
  const { data: categories, error, mutate } = useSWR(
    "/api/admin/categories",
    fetcher
  );
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [loading, setLoading] = useState(false);

  function resetForm() {
    setName("");
    setSlug("");
    setSortOrder(0);
    setEditingId(null);
    setShowForm(false);
  }

  function startEdit(cat: { id: string; name: string; slug: string; sortOrder: number }) {
    setEditingId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setSortOrder(cat.sortOrder);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const url = editingId
      ? `/api/admin/categories/${editingId}`
      : "/api/admin/categories";
    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug, sortOrder }),
    });

    mutate();
    resetForm();
    setLoading(false);
  }

  async function deleteCategory(id: string, catName: string) {
    if (!confirm(`Delete "${catName}"? This will also delete all items in this category.`))
      return;
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    mutate();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Add Category
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-6 mb-6 max-w-lg space-y-4"
        >
          <h2 className="font-semibold">
            {editingId ? "Edit Category" : "New Category"}
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!editingId)
                  setSlug(
                    e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)/g, "")
                  );
              }}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort Order
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-300"
            >
              {loading ? "Saving..." : editingId ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {error && <p className="text-red-500">Failed to load categories.</p>}
      {!categories && !error && <p className="text-gray-500">Loading...</p>}

      {categories && categories.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-sm text-gray-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Sort Order</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {categories.map(
                (cat: {
                  id: string;
                  name: string;
                  slug: string;
                  sortOrder: number;
                  _count: { items: number };
                }) => (
                  <tr key={cat.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{cat.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {cat.slug}
                    </td>
                    <td className="px-4 py-3 text-sm">{cat._count.items}</td>
                    <td className="px-4 py-3 text-sm">{cat.sortOrder}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(cat)}
                          className="text-primary hover:text-primary-dark text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCategory(cat.id, cat.name)}
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
