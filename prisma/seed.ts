import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Seed admin user
  const adminEmail = process.env.ADMIN_EMAIL || "admin@restaurant.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "changeme123";

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: await hash(adminPassword, 12),
      name: "Admin",
    },
  });

  console.log(`Admin user created: ${adminEmail}`);

  // Seed categories
  const appetizers = await prisma.category.upsert({
    where: { slug: "appetizers" },
    update: {},
    create: { name: "Appetizers", slug: "appetizers", sortOrder: 1 },
  });

  const pasta = await prisma.category.upsert({
    where: { slug: "pasta" },
    update: {},
    create: { name: "Pasta", slug: "pasta", sortOrder: 2 },
  });

  const pizza = await prisma.category.upsert({
    where: { slug: "pizza" },
    update: {},
    create: { name: "Pizza", slug: "pizza", sortOrder: 3 },
  });

  const desserts = await prisma.category.upsert({
    where: { slug: "desserts" },
    update: {},
    create: { name: "Desserts", slug: "desserts", sortOrder: 4 },
  });

  const drinks = await prisma.category.upsert({
    where: { slug: "drinks" },
    update: {},
    create: { name: "Drinks", slug: "drinks", sortOrder: 5 },
  });

  // Seed menu items
  const menuItems = [
    {
      name: "Bruschetta",
      description:
        "Toasted bread topped with fresh tomatoes, basil, and garlic",
      price: 995,
      categoryId: appetizers.id,
      featured: true,
      sortOrder: 1,
    },
    {
      name: "Calamari Fritti",
      description: "Crispy fried calamari with marinara dipping sauce",
      price: 1295,
      categoryId: appetizers.id,
      sortOrder: 2,
    },
    {
      name: "Caprese Salad",
      description:
        "Fresh mozzarella, tomatoes, and basil with balsamic glaze",
      price: 1095,
      categoryId: appetizers.id,
      sortOrder: 3,
    },
    {
      name: "Spaghetti Carbonara",
      description:
        "Classic carbonara with pancetta, egg, parmesan, and black pepper",
      price: 1695,
      categoryId: pasta.id,
      featured: true,
      sortOrder: 1,
    },
    {
      name: "Fettuccine Alfredo",
      description: "Creamy parmesan sauce over fresh fettuccine",
      price: 1595,
      categoryId: pasta.id,
      sortOrder: 2,
    },
    {
      name: "Penne Arrabbiata",
      description: "Penne in a spicy tomato sauce with garlic and chili",
      price: 1495,
      categoryId: pasta.id,
      sortOrder: 3,
    },
    {
      name: "Lasagna Bolognese",
      description:
        "Layers of pasta, beef ragu, béchamel, and parmesan",
      price: 1895,
      categoryId: pasta.id,
      featured: true,
      sortOrder: 4,
    },
    {
      name: "Margherita Pizza",
      description:
        "San Marzano tomato sauce, fresh mozzarella, and basil",
      price: 1495,
      categoryId: pizza.id,
      featured: true,
      sortOrder: 1,
    },
    {
      name: "Pepperoni Pizza",
      description: "Classic pepperoni with mozzarella and tomato sauce",
      price: 1695,
      categoryId: pizza.id,
      sortOrder: 2,
    },
    {
      name: "Quattro Formaggi",
      description:
        "Four cheese pizza with mozzarella, gorgonzola, fontina, and parmesan",
      price: 1795,
      categoryId: pizza.id,
      sortOrder: 3,
    },
    {
      name: "Tiramisu",
      description:
        "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone",
      price: 895,
      categoryId: desserts.id,
      featured: true,
      sortOrder: 1,
    },
    {
      name: "Panna Cotta",
      description: "Vanilla bean panna cotta with berry compote",
      price: 795,
      categoryId: desserts.id,
      sortOrder: 2,
    },
    {
      name: "Cannoli",
      description: "Crispy pastry shells filled with sweet ricotta cream",
      price: 695,
      categoryId: desserts.id,
      sortOrder: 3,
    },
    {
      name: "Italian Soda",
      description: "Choice of flavors: lemon, raspberry, or peach",
      price: 395,
      categoryId: drinks.id,
      sortOrder: 1,
    },
    {
      name: "Espresso",
      description: "Double shot of rich Italian espresso",
      price: 350,
      categoryId: drinks.id,
      sortOrder: 2,
    },
    {
      name: "House Wine",
      description: "Glass of red or white house wine",
      price: 895,
      categoryId: drinks.id,
      sortOrder: 3,
    },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: {
        id: `seed-${item.name.toLowerCase().replace(/\s+/g, "-")}`,
      },
      update: {},
      create: {
        id: `seed-${item.name.toLowerCase().replace(/\s+/g, "-")}`,
        ...item,
      },
    });
  }

  console.log(`Seeded ${menuItems.length} menu items across 5 categories`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
