import Link from "next/link";
import Image from "next/image";
import config from "../../restaurant.config";

export default function HomePage() {
  const fullAddress = `${config.contact.address}, ${config.contact.city}, ${config.contact.state} ${config.contact.zip}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${config.heroImage})` }}
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {config.name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            {config.tagline}
          </p>
          <Link
            href="/menu"
            className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            View Our Menu
          </Link>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Founded in 2000 by Vicki &amp; Hector Monarrez as Union Street
              Station, Hector built a reputation for serving the best breakfast
              and lunch in New Braunfels. The food was honest, the portions were
              generous, and everyone felt like family.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              In 2015, John &amp; Sandra Stevens took over and renamed it Union
              Station Diner. Same great food, same friendly spirit — just a new
              chapter in a story the whole community shares.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src="/images/inside.jpg"
              alt={`Inside ${config.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">
            A Taste of Union Station
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="relative aspect-square rounded-lg overflow-hidden group"
              >
                <Image
                  src={`/images/gallery-${n}.jpg`}
                  alt={`Union Station Diner photo ${n}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center mb-10">Visit Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-semibold text-lg mb-2">Hours</h3>
            <p className="text-gray-600">Open Daily</p>
            <p className="text-gray-600">7:00 AM &ndash; 2:00 PM</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Location</h3>
            <p className="text-gray-600">{config.contact.address}</p>
            <p className="text-gray-600">
              {config.contact.city}, {config.contact.state} {config.contact.zip}
            </p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark font-medium text-sm mt-1 inline-block"
            >
              Get Directions &rarr;
            </a>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Call Ahead</h3>
            <p className="text-gray-600">To-go orders welcome</p>
            <a
              href={`tel:${config.contact.phone.replace(/[^\d+]/g, "")}`}
              className="text-primary hover:text-primary-dark font-medium"
            >
              {config.contact.phone}
            </a>
          </div>
        </div>
        <div className="text-center mt-10">
          <Link
            href="/menu"
            className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            View Our Menu
          </Link>
        </div>
      </section>
    </div>
  );
}
