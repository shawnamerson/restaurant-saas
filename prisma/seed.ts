import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (order matters for foreign keys)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();

  console.log("Cleared existing menu data");

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

  // === Categories ===
  const omelettes = await prisma.category.create({
    data: { name: "Omelettes", slug: "omelettes", sortOrder: 1 },
  });
  const eggs = await prisma.category.create({
    data: { name: "Eggs", slug: "eggs", sortOrder: 2 },
  });
  const pancakes = await prisma.category.create({
    data: { name: "Pancakes, Waffles & French Toast", slug: "pancakes-waffles-french-toast", sortOrder: 3 },
  });
  const kidsBreakfast = await prisma.category.create({
    data: { name: "Kid's Breakfast", slug: "kids-breakfast", sortOrder: 4 },
  });
  const salads = await prisma.category.create({
    data: { name: "Jumbo Salads", slug: "jumbo-salads", sortOrder: 5 },
  });
  const soup = await prisma.category.create({
    data: { name: "Soup", slug: "soup", sortOrder: 6 },
  });
  const featured = await prisma.category.create({
    data: { name: "Featured Items", slug: "featured-items", sortOrder: 7 },
  });
  const sandwiches = await prisma.category.create({
    data: { name: "Sandwiches", slug: "sandwiches", sortOrder: 8 },
  });
  const burgers = await prisma.category.create({
    data: { name: "Burgers", slug: "burgers", sortOrder: 9 },
  });
  const lunchPlates = await prisma.category.create({
    data: { name: "Lunch Plates", slug: "lunch-plates", sortOrder: 10 },
  });
  const kidsLunch = await prisma.category.create({
    data: { name: "Kid's Lunch", slug: "kids-lunch", sortOrder: 11 },
  });
  const sides = await prisma.category.create({
    data: { name: "Side Orders", slug: "side-orders", sortOrder: 12 },
  });
  const desserts = await prisma.category.create({
    data: { name: "Desserts", slug: "desserts", sortOrder: 13 },
  });
  const beverages = await prisma.category.create({
    data: { name: "Beverages", slug: "beverages", sortOrder: 14 },
  });

  console.log("Created 14 categories");

  // === Menu Items ===
  const menuItems = [
    // ─── OMELETTES ───
    { name: "Plain Cheese Omelet", description: "Three-egg omelet with melted cheese", price: 599, categoryId: omelettes.id, sortOrder: 1 },
    { name: "Ham & Cheese Omelet", description: "Ham and melted cheese", price: 699, categoryId: omelettes.id, sortOrder: 2 },
    { name: "Bacon & Cheese Omelet", description: "Crispy bacon and melted cheese", price: 699, categoryId: omelettes.id, sortOrder: 3 },
    { name: "Sausage & Cheese Omelet", description: "Sausage and melted cheese", price: 699, categoryId: omelettes.id, sortOrder: 4 },
    { name: "Mushroom & Cheese Omelet", description: "Fresh mushrooms and melted cheese", price: 699, categoryId: omelettes.id, sortOrder: 5 },
    { name: "Onion & Cheese Omelet", description: "Sautéed onions and melted cheese", price: 699, categoryId: omelettes.id, sortOrder: 6 },
    { name: "Bell Pepper & Cheese Omelet", description: "Bell peppers and melted cheese", price: 699, categoryId: omelettes.id, sortOrder: 7 },
    { name: "Tomato & Cheese Omelet", description: "Fresh tomatoes and melted cheese", price: 699, categoryId: omelettes.id, sortOrder: 8 },
    { name: "Jalapeño & Cheese Omelet", description: "Jalapeños and melted cheese", price: 699, categoryId: omelettes.id, sortOrder: 9 },
    { name: "Spinach & Cheese Omelet", description: "Fresh spinach and melted cheese", price: 699, categoryId: omelettes.id, sortOrder: 10 },
    { name: "Broccoli & Cheese Omelet", description: "Broccoli and melted cheese", price: 699, categoryId: omelettes.id, sortOrder: 11 },
    { name: "Ham & Mushroom Omelet", description: "Ham and fresh mushrooms with cheese", price: 749, categoryId: omelettes.id, sortOrder: 12 },
    { name: "Bacon & Mushroom Omelet", description: "Bacon and fresh mushrooms with cheese", price: 749, categoryId: omelettes.id, sortOrder: 13 },
    { name: "Sausage & Mushroom Omelet", description: "Sausage and mushrooms with cheese", price: 749, categoryId: omelettes.id, sortOrder: 14 },
    { name: "Ham & Onion Omelet", description: "Ham and sautéed onions with cheese", price: 749, categoryId: omelettes.id, sortOrder: 15 },
    { name: "Bacon & Onion Omelet", description: "Bacon and sautéed onions with cheese", price: 749, categoryId: omelettes.id, sortOrder: 16 },
    { name: "Ham, Mushroom & Onion Omelet", description: "Ham, mushrooms, and onions with cheese", price: 799, categoryId: omelettes.id, sortOrder: 17 },
    { name: "Bacon, Mushroom & Onion Omelet", description: "Bacon, mushrooms, and onions with cheese", price: 799, categoryId: omelettes.id, sortOrder: 18 },
    { name: "Western Omelet", description: "Ham, bell peppers, and onions with cheese", price: 799, categoryId: omelettes.id, sortOrder: 19 },
    { name: "Denver Omelet", description: "Ham, bell peppers, onions, and cheese", price: 799, categoryId: omelettes.id, sortOrder: 20 },
    { name: "Greek Omelet", description: "Spinach, tomatoes, onions, and feta cheese", price: 799, categoryId: omelettes.id, sortOrder: 21 },
    { name: "Veggie Omelet", description: "Mushrooms, bell peppers, onions, tomatoes, and cheese", price: 799, categoryId: omelettes.id, sortOrder: 22 },
    { name: "Garden Omelet", description: "Broccoli, mushrooms, tomatoes, onions, and cheese", price: 799, categoryId: omelettes.id, sortOrder: 23 },
    { name: "Mexican Omelet", description: "Chorizo, jalapeños, onions, tomatoes, and cheese with salsa", price: 849, categoryId: omelettes.id, sortOrder: 24 },
    { name: "Spanish Omelet", description: "Onions, bell peppers, tomatoes, and cheese topped with ranchero sauce", price: 849, categoryId: omelettes.id, sortOrder: 25 },
    { name: "Tex-Mex Omelet", description: "Seasoned beef, jalapeños, onions, tomatoes, and cheese with salsa", price: 849, categoryId: omelettes.id, sortOrder: 26 },
    { name: "South of the Border Omelet", description: "Chorizo, onions, peppers, cheese, topped with queso", price: 899, categoryId: omelettes.id, sortOrder: 27 },
    { name: "Meat Lovers Omelet", description: "Ham, bacon, sausage, and cheese", price: 899, categoryId: omelettes.id, featured: true, sortOrder: 28 },
    { name: "Everything Omelet", description: "Ham, bacon, sausage, mushrooms, onions, bell peppers, tomatoes, and cheese", price: 999, categoryId: omelettes.id, sortOrder: 29 },
    { name: "Philly Steak Omelet", description: "Shaved steak, onions, bell peppers, mushrooms, and cheese", price: 899, categoryId: omelettes.id, sortOrder: 30 },
    { name: "Chicken Fajita Omelet", description: "Grilled chicken, onions, bell peppers, and cheese with salsa", price: 899, categoryId: omelettes.id, sortOrder: 31 },
    { name: "Steak Fajita Omelet", description: "Grilled steak, onions, bell peppers, and cheese with salsa", price: 949, categoryId: omelettes.id, sortOrder: 32 },
    { name: "Corned Beef Hash Omelet", description: "Corned beef hash and cheese", price: 849, categoryId: omelettes.id, sortOrder: 33 },
    { name: "Avocado & Cheese Omelet", description: "Fresh avocado and melted cheese", price: 799, categoryId: omelettes.id, sortOrder: 34 },
    { name: "Avocado & Bacon Omelet", description: "Fresh avocado, crispy bacon, and cheese", price: 849, categoryId: omelettes.id, sortOrder: 35 },
    { name: "BLT Omelet", description: "Bacon, lettuce, tomato, and cheese", price: 799, categoryId: omelettes.id, sortOrder: 36 },
    { name: "BBQ Chicken Omelet", description: "BBQ chicken, onions, and cheese", price: 899, categoryId: omelettes.id, sortOrder: 37 },
    { name: "Buffalo Chicken Omelet", description: "Buffalo chicken, onions, and cheese with ranch", price: 899, categoryId: omelettes.id, sortOrder: 38 },
    { name: "Italian Omelet", description: "Italian sausage, onions, bell peppers, mushrooms, and mozzarella", price: 899, categoryId: omelettes.id, sortOrder: 39 },
    { name: "Florentine Omelet", description: "Spinach, mushrooms, tomatoes, and Swiss cheese", price: 799, categoryId: omelettes.id, sortOrder: 40 },
    { name: "Southwest Omelet", description: "Chicken, corn, black beans, jalapeños, onions, and cheese with salsa", price: 899, categoryId: omelettes.id, sortOrder: 41 },
    { name: "Hawaiian Omelet", description: "Ham, pineapple, and cheese", price: 799, categoryId: omelettes.id, sortOrder: 42 },
    { name: "Crab Omelet", description: "Crab meat, onions, and cheese", price: 999, categoryId: omelettes.id, sortOrder: 43 },
    { name: "Shrimp Omelet", description: "Shrimp, onions, bell peppers, and cheese", price: 999, categoryId: omelettes.id, sortOrder: 44 },
    { name: "Lox Omelet", description: "Smoked salmon, onions, capers, and cream cheese", price: 999, categoryId: omelettes.id, sortOrder: 45 },
    { name: "Three Cheese Omelet", description: "Cheddar, Swiss, and American cheese", price: 699, categoryId: omelettes.id, sortOrder: 46 },
    { name: "Four Cheese Omelet", description: "Cheddar, Swiss, American, and pepper jack cheese", price: 749, categoryId: omelettes.id, sortOrder: 47 },
    { name: "Egg White Veggie Omelet", description: "Egg whites with mushrooms, spinach, tomatoes, onions, and cheese", price: 849, categoryId: omelettes.id, sortOrder: 48 },
    { name: "Egg White Western Omelet", description: "Egg whites with ham, bell peppers, onions, and cheese", price: 849, categoryId: omelettes.id, sortOrder: 49 },
    { name: "Build Your Own Omelet", description: "Choose your own fillings — first two toppings included, extras additional", price: 699, categoryId: omelettes.id, sortOrder: 50 },

    // ─── EGGS ───
    { name: "One Egg Breakfast", description: "One egg any style with toast and choice of hash browns or grits", price: 499, categoryId: eggs.id, sortOrder: 1 },
    { name: "Two Egg Breakfast", description: "Two eggs any style with toast and choice of hash browns or grits", price: 549, categoryId: eggs.id, sortOrder: 2 },
    { name: "Three Egg Breakfast", description: "Three eggs any style with toast and choice of hash browns or grits", price: 599, categoryId: eggs.id, sortOrder: 3 },
    { name: "One Egg with Meat", description: "One egg any style with choice of bacon, sausage, or ham, toast, and hash browns or grits", price: 649, categoryId: eggs.id, sortOrder: 4 },
    { name: "Two Eggs with Meat", description: "Two eggs any style with choice of bacon, sausage, or ham, toast, and hash browns or grits", price: 699, categoryId: eggs.id, sortOrder: 5 },
    { name: "Three Eggs with Meat", description: "Three eggs any style with choice of bacon, sausage, or ham, toast, and hash browns or grits", price: 749, categoryId: eggs.id, sortOrder: 6 },
    { name: "Chicken Fried Steak & Eggs", description: "Hand-breaded chicken fried steak with cream gravy, two eggs, toast, and hash browns", price: 849, categoryId: eggs.id, featured: true, sortOrder: 7 },
    { name: "Pork Chop & Eggs", description: "Grilled pork chop with two eggs, toast, and hash browns or grits", price: 849, categoryId: eggs.id, sortOrder: 8 },
    { name: "Steak & Eggs", description: "Grilled steak with two eggs, toast, and hash browns or grits", price: 849, categoryId: eggs.id, sortOrder: 9 },
    { name: "Corned Beef Hash & Eggs", description: "Corned beef hash with two eggs any style and toast", price: 799, categoryId: eggs.id, sortOrder: 10 },
    { name: "Huevos Rancheros", description: "Two eggs on corn tortillas with ranchero sauce, beans, and rice", price: 799, categoryId: eggs.id, sortOrder: 11 },
    { name: "Eggs Benedict", description: "Two poached eggs on English muffin with Canadian bacon and hollandaise", price: 849, categoryId: eggs.id, sortOrder: 12 },
    { name: "Breakfast Tacos (3)", description: "Three flour tortillas with scrambled eggs, cheese, and choice of meat", price: 699, categoryId: eggs.id, sortOrder: 13 },

    // ─── PANCAKES, WAFFLES & FRENCH TOAST ───
    { name: "Short Stack Pancakes (2)", description: "Two fluffy buttermilk pancakes", price: 549, categoryId: pancakes.id, sortOrder: 1 },
    { name: "Full Stack Pancakes (3)", description: "Three fluffy buttermilk pancakes", price: 649, categoryId: pancakes.id, sortOrder: 2 },
    { name: "Blueberry Pancakes", description: "Buttermilk pancakes loaded with fresh blueberries", price: 749, categoryId: pancakes.id, sortOrder: 3 },
    { name: "Chocolate Chip Pancakes", description: "Buttermilk pancakes with chocolate chips", price: 749, categoryId: pancakes.id, sortOrder: 4 },
    { name: "Banana Nut Pancakes", description: "Buttermilk pancakes with bananas and pecans", price: 749, categoryId: pancakes.id, sortOrder: 5 },
    { name: "Pecan Pancakes", description: "Buttermilk pancakes with toasted pecans", price: 749, categoryId: pancakes.id, sortOrder: 6 },
    { name: "Strawberry Pancakes", description: "Buttermilk pancakes with fresh strawberries and whipped cream", price: 799, categoryId: pancakes.id, sortOrder: 7 },
    { name: "Cinnamon Roll Pancakes", description: "Buttermilk pancakes with cinnamon swirl and cream cheese drizzle", price: 799, categoryId: pancakes.id, sortOrder: 8 },
    { name: "Pig in a Blanket", description: "Sausage links wrapped in pancakes", price: 699, categoryId: pancakes.id, sortOrder: 9 },
    { name: "Silver Dollar Pancakes", description: "Eight mini buttermilk pancakes", price: 599, categoryId: pancakes.id, sortOrder: 10 },
    { name: "Plain Waffle", description: "Golden Belgian waffle", price: 599, categoryId: pancakes.id, sortOrder: 11 },
    { name: "Pecan Waffle", description: "Belgian waffle with toasted pecans", price: 749, categoryId: pancakes.id, sortOrder: 12 },
    { name: "Blueberry Waffle", description: "Belgian waffle topped with fresh blueberries", price: 749, categoryId: pancakes.id, sortOrder: 13 },
    { name: "Strawberry Waffle", description: "Belgian waffle with fresh strawberries and whipped cream", price: 799, categoryId: pancakes.id, sortOrder: 14 },
    { name: "Chocolate Chip Waffle", description: "Belgian waffle with chocolate chips and whipped cream", price: 749, categoryId: pancakes.id, sortOrder: 15 },
    { name: "Chicken & Waffle", description: "Belgian waffle topped with fried chicken tenders", price: 799, categoryId: pancakes.id, sortOrder: 16 },
    { name: "French Toast (2 slices)", description: "Two slices of thick-cut Texas toast dipped in cinnamon egg batter", price: 599, categoryId: pancakes.id, sortOrder: 17 },
    { name: "French Toast (3 slices)", description: "Three slices of thick-cut Texas toast dipped in cinnamon egg batter", price: 699, categoryId: pancakes.id, sortOrder: 18 },
    { name: "Stuffed French Toast", description: "French toast stuffed with cream cheese and strawberries", price: 799, categoryId: pancakes.id, sortOrder: 19 },

    // ─── KID'S BREAKFAST ───
    { name: "Kid's One Egg", description: "One egg with toast and choice of hash browns or grits", price: 319, categoryId: kidsBreakfast.id, sortOrder: 1 },
    { name: "Kid's Pancake (1)", description: "One buttermilk pancake", price: 349, categoryId: kidsBreakfast.id, sortOrder: 2 },
    { name: "Kid's French Toast (1)", description: "One slice of French toast", price: 349, categoryId: kidsBreakfast.id, sortOrder: 3 },
    { name: "Kid's Waffle", description: "One Belgian waffle", price: 349, categoryId: kidsBreakfast.id, sortOrder: 4 },
    { name: "Kid's Breakfast Taco", description: "Flour tortilla with scrambled egg and cheese", price: 399, categoryId: kidsBreakfast.id, sortOrder: 5 },

    // ─── JUMBO SALADS ───
    { name: "Side Salad", description: "Mixed greens with tomato, cucumber, and croutons", price: 249, categoryId: salads.id, sortOrder: 1 },
    { name: "Garden Salad", description: "Mixed greens, tomatoes, cucumbers, onions, carrots, and croutons", price: 599, categoryId: salads.id, sortOrder: 2 },
    { name: "Chef Salad", description: "Mixed greens topped with ham, turkey, cheese, egg, tomatoes, and croutons", price: 849, categoryId: salads.id, sortOrder: 3 },
    { name: "Grilled Chicken Salad", description: "Mixed greens with grilled chicken breast, tomatoes, cucumbers, and cheese", price: 849, categoryId: salads.id, sortOrder: 4 },
    { name: "Chicken Fried Chicken Salad", description: "Mixed greens topped with crispy chicken fried chicken, tomatoes, cheese, and egg", price: 849, categoryId: salads.id, sortOrder: 5 },

    // ─── SOUP ───
    { name: "Soup of the Day", description: "Ask your server for today's homemade soup selection — cup or bowl", price: 399, categoryId: soup.id, sortOrder: 1 },

    // ─── FEATURED ITEMS ───
    { name: "Oatmeal", description: "Hearty bowl of oatmeal served with brown sugar and milk", price: 499, categoryId: featured.id, sortOrder: 1 },
    { name: "SOS (Chipped Beef on Toast)", description: "Creamed chipped beef served over toast", price: 699, categoryId: featured.id, sortOrder: 2 },
    { name: "Biscuits & Gravy", description: "Homemade biscuits smothered in sausage cream gravy", price: 649, categoryId: featured.id, sortOrder: 3 },
    { name: "Migas", description: "Scrambled eggs with crispy tortilla strips, onions, tomatoes, peppers, and cheese", price: 799, categoryId: featured.id, featured: true, sortOrder: 4 },

    // ─── SANDWICHES ───
    { name: "BLT", description: "Crispy bacon, lettuce, and tomato on toasted bread", price: 599, categoryId: sandwiches.id, sortOrder: 1 },
    { name: "Grilled Cheese", description: "Melted American cheese on grilled bread", price: 499, categoryId: sandwiches.id, sortOrder: 2 },
    { name: "Patty Melt", description: "Beef patty with grilled onions and melted cheese on rye", price: 699, categoryId: sandwiches.id, sortOrder: 3 },
    { name: "Tuna Melt", description: "Tuna salad with melted cheese on grilled bread", price: 649, categoryId: sandwiches.id, sortOrder: 4 },
    { name: "Club Sandwich", description: "Triple-decker with turkey, ham, bacon, lettuce, tomato, and mayo", price: 749, categoryId: sandwiches.id, sortOrder: 5 },
    { name: "Turkey Sandwich", description: "Sliced turkey with lettuce, tomato, and mayo on your choice of bread", price: 649, categoryId: sandwiches.id, sortOrder: 6 },
    { name: "Ham Sandwich", description: "Sliced ham with lettuce, tomato, and mayo on your choice of bread", price: 649, categoryId: sandwiches.id, sortOrder: 7 },
    { name: "Roast Beef Sandwich", description: "Sliced roast beef with lettuce, tomato, and mayo", price: 699, categoryId: sandwiches.id, sortOrder: 8 },
    { name: "Chicken Salad Sandwich", description: "Homemade chicken salad on your choice of bread", price: 649, categoryId: sandwiches.id, sortOrder: 9 },
    { name: "Tuna Salad Sandwich", description: "Homemade tuna salad on your choice of bread", price: 649, categoryId: sandwiches.id, sortOrder: 10 },
    { name: "Egg Salad Sandwich", description: "Homemade egg salad on your choice of bread", price: 599, categoryId: sandwiches.id, sortOrder: 11 },
    { name: "Grilled Chicken Sandwich", description: "Grilled chicken breast with lettuce, tomato, and mayo", price: 699, categoryId: sandwiches.id, sortOrder: 12 },
    { name: "Chicken Fried Chicken Sandwich", description: "Crispy fried chicken breast on a bun with lettuce, tomato, and mayo", price: 749, categoryId: sandwiches.id, sortOrder: 13 },
    { name: "Philly Cheesesteak", description: "Shaved steak with onions, bell peppers, mushrooms, and melted cheese on a hoagie", price: 749, categoryId: sandwiches.id, sortOrder: 14 },
    { name: "French Dip", description: "Roast beef and melted Swiss on a hoagie with au jus", price: 749, categoryId: sandwiches.id, sortOrder: 15 },
    { name: "Reuben", description: "Corned beef, sauerkraut, Swiss cheese, and Thousand Island on grilled rye", price: 749, categoryId: sandwiches.id, sortOrder: 16 },
    { name: "Rachel", description: "Turkey, coleslaw, Swiss cheese, and Thousand Island on grilled rye", price: 749, categoryId: sandwiches.id, sortOrder: 17 },
    { name: "Pulled Pork Sandwich", description: "Slow-smoked pulled pork with BBQ sauce on a bun", price: 699, categoryId: sandwiches.id, sortOrder: 18 },
    { name: "Fried Fish Sandwich", description: "Crispy fried fish fillet on a bun with tartar sauce", price: 699, categoryId: sandwiches.id, sortOrder: 19 },
    { name: "Hot Dog", description: "All-beef hot dog on a bun", price: 499, categoryId: sandwiches.id, sortOrder: 20 },
    { name: "Chili Dog", description: "All-beef hot dog topped with chili and cheese", price: 599, categoryId: sandwiches.id, sortOrder: 21 },
    { name: "Corn Dog", description: "Classic battered and fried corn dog", price: 499, categoryId: sandwiches.id, sortOrder: 22 },
    { name: "Grilled Ham & Cheese", description: "Grilled ham and melted cheese on your choice of bread", price: 599, categoryId: sandwiches.id, sortOrder: 23 },
    { name: "Bacon Grilled Cheese", description: "Crispy bacon with melted cheese on grilled bread", price: 599, categoryId: sandwiches.id, sortOrder: 24 },
    { name: "Chicken Wrap", description: "Grilled chicken, lettuce, tomato, cheese, and ranch in a flour tortilla", price: 699, categoryId: sandwiches.id, sortOrder: 25 },
    { name: "Turkey Wrap", description: "Sliced turkey, lettuce, tomato, cheese, and mayo in a flour tortilla", price: 699, categoryId: sandwiches.id, sortOrder: 26 },
    { name: "Quesadilla — Cheese", description: "Flour tortilla with melted cheese, served with salsa and sour cream", price: 549, categoryId: sandwiches.id, sortOrder: 27 },
    { name: "Quesadilla — Chicken", description: "Flour tortilla with grilled chicken and melted cheese, served with salsa and sour cream", price: 699, categoryId: sandwiches.id, sortOrder: 28 },

    // ─── BURGERS ───
    { name: "Hamburger", description: "Quarter-pound beef patty on a bun with lettuce, tomato, onion, and pickles", price: 599, categoryId: burgers.id, sortOrder: 1 },
    { name: "Cheeseburger", description: "Quarter-pound beef patty with American cheese on a bun", price: 649, categoryId: burgers.id, sortOrder: 2 },
    { name: "Double Cheeseburger", description: "Two quarter-pound beef patties with American cheese", price: 849, categoryId: burgers.id, sortOrder: 3 },
    { name: "Bacon Cheeseburger", description: "Quarter-pound beef patty with bacon and American cheese", price: 749, categoryId: burgers.id, sortOrder: 4 },
    { name: "Mushroom Swiss Burger", description: "Quarter-pound beef patty with sautéed mushrooms and Swiss cheese", price: 749, categoryId: burgers.id, sortOrder: 5 },
    { name: "Jalapeño Burger", description: "Quarter-pound beef patty with jalapeños and pepper jack cheese", price: 749, categoryId: burgers.id, sortOrder: 6 },
    { name: "Texan Burger", description: "Quarter-pound beef patty with bacon, onion rings, BBQ sauce, and cheddar", price: 899, categoryId: burgers.id, featured: true, sortOrder: 7 },
    { name: "Patty Melt Burger", description: "Quarter-pound beef patty with grilled onions and cheese on rye", price: 699, categoryId: burgers.id, sortOrder: 8 },
    { name: "Chicken Fried Steak Burger", description: "Chicken fried steak patty on a bun with cream gravy", price: 799, categoryId: burgers.id, sortOrder: 9 },

    // ─── LUNCH PLATES ───
    { name: "Chicken Fried Steak Plate", description: "Hand-breaded chicken fried steak with cream gravy, two sides, and Texas toast", price: 899, categoryId: lunchPlates.id, featured: true, sortOrder: 1 },
    { name: "Chicken Fried Chicken Plate", description: "Hand-breaded chicken fried chicken with cream gravy, two sides, and Texas toast", price: 899, categoryId: lunchPlates.id, sortOrder: 2 },
    { name: "Grilled Chicken Plate", description: "Grilled chicken breast with two sides and Texas toast", price: 849, categoryId: lunchPlates.id, sortOrder: 3 },
    { name: "Chicken Tenders Plate", description: "Crispy chicken tenders with two sides and Texas toast", price: 849, categoryId: lunchPlates.id, sortOrder: 4 },
    { name: "Fried Fish Plate", description: "Crispy fried fish fillets with two sides and Texas toast", price: 849, categoryId: lunchPlates.id, sortOrder: 5 },
    { name: "Pork Chop Plate", description: "Grilled pork chop with two sides and Texas toast", price: 899, categoryId: lunchPlates.id, sortOrder: 6 },
    { name: "Chopped Steak Plate", description: "Seasoned chopped steak with grilled onions, two sides, and Texas toast", price: 899, categoryId: lunchPlates.id, sortOrder: 7 },
    { name: "Meatloaf Plate", description: "Homestyle meatloaf with two sides and Texas toast", price: 849, categoryId: lunchPlates.id, sortOrder: 8 },

    // ─── KID'S LUNCH ───
    { name: "Kid's Chicken Tenders", description: "Chicken tenders with fries", price: 499, categoryId: kidsLunch.id, sortOrder: 1 },
    { name: "Kid's Grilled Cheese", description: "Grilled cheese sandwich with fries", price: 399, categoryId: kidsLunch.id, sortOrder: 2 },
    { name: "Kid's Corn Dog", description: "Corn dog with fries", price: 399, categoryId: kidsLunch.id, sortOrder: 3 },
    { name: "Kid's Hamburger", description: "Small hamburger with fries", price: 499, categoryId: kidsLunch.id, sortOrder: 4 },
    { name: "Kid's Hot Dog", description: "Hot dog with fries", price: 299, categoryId: kidsLunch.id, sortOrder: 5 },

    // ─── SIDE ORDERS ───
    { name: "Hash Browns", description: "Crispy shredded hash browns", price: 249, categoryId: sides.id, sortOrder: 1 },
    { name: "Grits", description: "Creamy Southern-style grits", price: 199, categoryId: sides.id, sortOrder: 2 },
    { name: "Oatmeal (Side)", description: "Bowl of oatmeal", price: 299, categoryId: sides.id, sortOrder: 3 },
    { name: "Toast (2 slices)", description: "White, wheat, or rye toast", price: 149, categoryId: sides.id, sortOrder: 4 },
    { name: "Biscuit", description: "Homemade biscuit", price: 149, categoryId: sides.id, sortOrder: 5 },
    { name: "English Muffin", description: "Toasted English muffin", price: 149, categoryId: sides.id, sortOrder: 6 },
    { name: "Tortilla (Flour or Corn)", description: "Warm flour or corn tortilla", price: 99, categoryId: sides.id, sortOrder: 7 },
    { name: "Bacon (3 strips)", description: "Three strips of crispy bacon", price: 299, categoryId: sides.id, sortOrder: 8 },
    { name: "Sausage Patties (2)", description: "Two seasoned sausage patties", price: 299, categoryId: sides.id, sortOrder: 9 },
    { name: "Sausage Links (2)", description: "Two pork sausage links", price: 299, categoryId: sides.id, sortOrder: 10 },
    { name: "Ham Slice", description: "Grilled ham slice", price: 299, categoryId: sides.id, sortOrder: 11 },
    { name: "One Egg (Side)", description: "One egg cooked any style", price: 149, categoryId: sides.id, sortOrder: 12 },
    { name: "Two Eggs (Side)", description: "Two eggs cooked any style", price: 249, categoryId: sides.id, sortOrder: 13 },
    { name: "Gravy (Side)", description: "Sausage cream gravy", price: 149, categoryId: sides.id, sortOrder: 14 },
    { name: "Queso (Side)", description: "Warm queso dip", price: 199, categoryId: sides.id, sortOrder: 15 },
    { name: "Salsa (Side)", description: "House-made salsa", price: 99, categoryId: sides.id, sortOrder: 16 },
    { name: "Sour Cream (Side)", description: "Side of sour cream", price: 99, categoryId: sides.id, sortOrder: 17 },
    { name: "French Fries", description: "Crispy golden French fries", price: 299, categoryId: sides.id, sortOrder: 18 },
    { name: "Onion Rings", description: "Battered and fried onion rings", price: 349, categoryId: sides.id, sortOrder: 19 },
    { name: "Tater Tots", description: "Crispy tater tots", price: 299, categoryId: sides.id, sortOrder: 20 },
    { name: "Mashed Potatoes", description: "Creamy mashed potatoes with gravy", price: 249, categoryId: sides.id, sortOrder: 21 },
    { name: "Baked Potato", description: "Baked potato with butter and sour cream", price: 299, categoryId: sides.id, sortOrder: 22 },
    { name: "Corn on the Cob", description: "Buttered corn on the cob", price: 249, categoryId: sides.id, sortOrder: 23 },
    { name: "Green Beans", description: "Seasoned green beans", price: 249, categoryId: sides.id, sortOrder: 24 },
    { name: "Coleslaw", description: "Creamy homemade coleslaw", price: 199, categoryId: sides.id, sortOrder: 25 },
    { name: "Cottage Cheese", description: "Side of cottage cheese", price: 199, categoryId: sides.id, sortOrder: 26 },
    { name: "Fruit Cup", description: "Fresh seasonal fruit", price: 379, categoryId: sides.id, sortOrder: 27 },

    // ─── DESSERTS ───
    { name: "Pie Slice", description: "Ask your server for today's pie selections", price: 399, categoryId: desserts.id, sortOrder: 1 },
    { name: "Pie Slice à la Mode", description: "Pie slice with a scoop of vanilla ice cream", price: 499, categoryId: desserts.id, sortOrder: 2 },
    { name: "Cobbler", description: "Warm fruit cobbler — ask for today's flavor", price: 449, categoryId: desserts.id, sortOrder: 3 },
    { name: "Cobbler à la Mode", description: "Warm cobbler with a scoop of vanilla ice cream", price: 499, categoryId: desserts.id, sortOrder: 4 },
    { name: "Ice Cream (1 scoop)", description: "One scoop of vanilla ice cream", price: 249, categoryId: desserts.id, sortOrder: 5 },

    // ─── BEVERAGES ───
    { name: "Coffee", description: "Freshly brewed coffee — free refills", price: 199, categoryId: beverages.id, sortOrder: 1 },
    { name: "Decaf Coffee", description: "Freshly brewed decaf coffee — free refills", price: 199, categoryId: beverages.id, sortOrder: 2 },
    { name: "Hot Tea", description: "Your choice of hot tea", price: 199, categoryId: beverages.id, sortOrder: 3 },
    { name: "Hot Chocolate", description: "Rich hot chocolate with whipped cream", price: 229, categoryId: beverages.id, sortOrder: 4 },
    { name: "Soft Drink", description: "Coca-Cola, Diet Coke, Sprite, Dr Pepper, or lemonade — free refills", price: 229, categoryId: beverages.id, sortOrder: 5 },
    { name: "Iced Tea", description: "Fresh-brewed iced tea — sweet or unsweet, free refills", price: 229, categoryId: beverages.id, sortOrder: 6 },
    { name: "Lemonade", description: "Fresh-squeezed lemonade", price: 229, categoryId: beverages.id, sortOrder: 7 },
    { name: "Orange Juice (Small)", description: "Small fresh-squeezed orange juice", price: 199, categoryId: beverages.id, sortOrder: 8 },
    { name: "Orange Juice (Large)", description: "Large fresh-squeezed orange juice", price: 239, categoryId: beverages.id, sortOrder: 9 },
    { name: "Apple Juice", description: "Apple juice", price: 199, categoryId: beverages.id, sortOrder: 10 },
    { name: "Cranberry Juice", description: "Cranberry juice", price: 199, categoryId: beverages.id, sortOrder: 11 },
    { name: "Tomato Juice", description: "Tomato juice", price: 199, categoryId: beverages.id, sortOrder: 12 },
    { name: "Milk", description: "Regular or chocolate milk", price: 229, categoryId: beverages.id, sortOrder: 13 },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({ data: item });
  }

  console.log(`Seeded ${menuItems.length} menu items across 14 categories`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
