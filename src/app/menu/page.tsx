import { prisma } from "@/lib/prisma";
import { CategoryNav } from "@/components/menu/CategoryNav";
import { MenuItemCard } from "@/components/menu/MenuItemCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Menu",
};

export default async function MenuPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      items: {
        where: { available: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  return (
    <div>
      <CategoryNav categories={categories} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {categories.map((category) => (
          <section
            key={category.id}
            id={`category-${category.slug}`}
            className="mb-12 scroll-mt-32"
          >
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
              {category.name}
            </h2>
            {category.items.length === 0 ? (
              <p className="text-gray-500">No items available in this category.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
