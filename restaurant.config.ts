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
  name: "Union Station Diner",
  tagline: "Where Friendly Folks Meet and Eat",
  description:
    "Classic American diner in a historic train station. Breakfast and lunch served all day. Over 100 omelets, homemade biscuits & gravy, burgers, and daily specials.",
  logo: "/images/logo.png",
  heroImage: "/images/hero.jpg",
  colors: {
    primary: "#A52422",
    primaryDark: "#7A1B19",
    secondary: "#1B2A4A",
    accent: "#D4A843",
  },
  contact: {
    phone: "(830) 627-1727",
    email: "unionstationdiner@yahoo.com",
    address: "512 East San Antonio St",
    city: "New Braunfels",
    state: "TX",
    zip: "78130",
  },
  hours: {
    Monday: "7:00 AM - 2:00 PM",
    Tuesday: "7:00 AM - 2:00 PM",
    Wednesday: "7:00 AM - 2:00 PM",
    Thursday: "7:00 AM - 2:00 PM",
    Friday: "7:00 AM - 2:00 PM",
    Saturday: "7:00 AM - 2:00 PM",
    Sunday: "7:00 AM - 2:00 PM",
  },
  social: {
    facebook: "https://www.facebook.com/UnionStationDiner",
    yelp: "https://www.yelp.com/biz/union-station-diner-new-braunfels",
  },
  ordering: {
    taxRate: 0.0825,
    deliveryFee: 0,
    minimumOrder: 0,
    estimatedPrepTime: "15-25 min",
  },
  seo: {
    title: "Union Station Diner | Breakfast & Lunch | New Braunfels, TX",
    description:
      "Order online from Union Station Diner in New Braunfels, TX. Classic American breakfast and lunch served all day. Omelets, burgers, biscuits & gravy, and more. Pickup available.",
  },
};

export default config;
