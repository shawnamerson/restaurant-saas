"use client";

interface CategoryNavProps {
  categories: { id: string; name: string; slug: string }[];
  activeSlug?: string;
}

export function CategoryNav({ categories, activeSlug }: CategoryNavProps) {
  const scrollTo = (slug: string) => {
    const el = document.getElementById(`category-${slug}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="sticky top-16 bg-white z-30 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollTo(cat.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeSlug === cat.slug
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
