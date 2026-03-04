export interface RestaurantConfig {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  heroImage: string;
  colors: {
    primary: string;
    primaryDark: string;
    secondary: string;
    accent: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  hours: {
    [key: string]: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    yelp?: string;
  };
  ordering: {
    taxRate: number; // e.g. 0.08 for 8%
    deliveryFee: number; // in cents
    minimumOrder: number; // in cents
    estimatedPrepTime: string; // e.g. "25-35 min"
  };
  seo: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
}

const config: RestaurantConfig = {
  name: "Bella's Kitchen",
  tagline: "Authentic Italian Cuisine, Made with Love",
  description:
    "Family-owned Italian restaurant serving handmade pasta, wood-fired pizzas, and classic desserts since 1998.",
  logo: "/images/logo.png",
  heroImage: "/images/hero.jpg",
  colors: {
    primary: "#D94F30",
    primaryDark: "#B83A1F",
    secondary: "#2D5A27",
    accent: "#F4A940",
  },
  contact: {
    phone: "(555) 123-4567",
    email: "hello@bellaskitchen.com",
    address: "123 Main Street",
    city: "Springfield",
    state: "IL",
    zip: "62701",
  },
  hours: {
    Monday: "11:00 AM - 9:00 PM",
    Tuesday: "11:00 AM - 9:00 PM",
    Wednesday: "11:00 AM - 9:00 PM",
    Thursday: "11:00 AM - 9:00 PM",
    Friday: "11:00 AM - 10:00 PM",
    Saturday: "10:00 AM - 10:00 PM",
    Sunday: "10:00 AM - 8:00 PM",
  },
  social: {
    facebook: "https://facebook.com/bellaskitchen",
    instagram: "https://instagram.com/bellaskitchen",
  },
  ordering: {
    taxRate: 0.08,
    deliveryFee: 399,
    minimumOrder: 1500,
    estimatedPrepTime: "25-35 min",
  },
  seo: {
    title: "Bella's Kitchen | Authentic Italian Cuisine | Order Online",
    description:
      "Order online from Bella's Kitchen. Handmade pasta, wood-fired pizzas, and classic Italian desserts. Pickup and delivery available.",
  },
};

export default config;
