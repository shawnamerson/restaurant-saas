import config from "../../../restaurant.config";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              {config.name}
            </h3>
            <p className="mb-2">{config.contact.address}</p>
            <p className="mb-2">
              {config.contact.city}, {config.contact.state}{" "}
              {config.contact.zip}
            </p>
            <p className="mb-2">
              <a
                href={`tel:${config.contact.phone}`}
                className="hover:text-white transition-colors"
              >
                {config.contact.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${config.contact.email}`}
                className="hover:text-white transition-colors"
              >
                {config.contact.email}
              </a>
            </p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Hours</h3>
            <div className="space-y-1">
              {Object.entries(config.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between text-sm">
                  <span>{day}</span>
                  <span>{hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Follow Us
            </h3>
            <div className="flex gap-4">
              {config.social.facebook && (
                <a
                  href={config.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Facebook
                </a>
              )}
              {config.social.instagram && (
                <a
                  href={config.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              )}
              {config.social.twitter && (
                <a
                  href={config.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Twitter
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} {config.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
