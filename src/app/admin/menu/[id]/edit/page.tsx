"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import { MenuItemForm } from "@/components/admin/MenuItemForm";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function EditMenuItemPage() {
  const params = useParams();
  const { data: item, error } = useSWR(
    `/api/admin/menu-items/${params.id}`,
    fetcher
  );

  if (error) return <p className="text-red-500">Failed to load item.</p>;
  if (!item) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit: {item.name}</h1>
      <MenuItemForm
        itemId={item.id}
        initialData={{
          name: item.name,
          description: item.description || "",
          price: item.price,
          image: item.image || "",
          available: item.available,
          featured: item.featured,
          categoryId: item.categoryId,
          sortOrder: item.sortOrder,
        }}
      />
    </div>
  );
}
