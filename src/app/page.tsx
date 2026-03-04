import Link from "next/link";
import config from "../../restaurant.config";
import { prisma } from "@/lib/prisma";
import { MenuItemCard } from "@/components/menu/MenuItemCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredItems = await prisma.menuItem.findMany({
    where: { featured: true, available: true },
    include: { category: true },
    take: 6,
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${config.heroImage})` }}
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {config.name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
            {config.tagline}
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              href="/menu"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              View Menu
            </Link>
            <Link
              href="/menu"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors border border-white/30"
            >
              Order Online
            </Link>
          </div>
        </div>
      </section>

      {/* About snippet */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Welcome</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {config.description}
        </p>
      </section>

      {/* Featured Items */}
      {featuredItems.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-10">
              Popular Dishes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/menu"
                className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                View Full Menu
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Info Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-primary text-3xl mb-3">&#9201;</div>
            <h3 className="font-semibold text-lg mb-1">Fast Prep</h3>
            <p className="text-gray-600">
              Ready in {config.ordering.estimatedPrepTime}
            </p>
          </div>
          <div>
            <div className="text-primary text-3xl mb-3">&#127860;</div>
            <h3 className="font-semibold text-lg mb-1">Pickup & Delivery</h3>
            <p className="text-gray-600">
              Order online, pick up or get it delivered
            </p>
          </div>
          <div>
            <div className="text-primary text-3xl mb-3">&#128179;</div>
            <h3 className="font-semibold text-lg mb-1">Secure Payment</h3>
            <p className="text-gray-600">Pay securely with Stripe checkout</p>
          </div>
        </div>
      </section>
    </div>
  );
}
