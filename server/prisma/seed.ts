/**
 * Seed script for the GameStore database.
 * 
 * Reads products from the client's static data file and populates:
 * - categories (unique)
 * - platforms (unique)
 * - products
 * - product_platform_prices (M:N with prices)
 * 
 * Run with: npm run prisma:seed
 */

import { PrismaClient } from "@prisma/client";
import { join, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Type definitions matching the client's Product type
type Platform = "PC" | "Xbox" | "PS5" | "Switch 2";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  platformPrices: Record<Platform, number>;
}

const prisma = new PrismaClient();

async function loadProducts(): Promise<Product[]> {
  const productsPath = join(__dirname, "..", "..", "client", "src", "data", "products.ts");
  const moduleUrl = pathToFileURL(productsPath).href;

  const mod = (await import(moduleUrl)) as { products?: unknown };
  const products = mod.products;

  if (!Array.isArray(products)) {
    throw new Error(
      `Expected 'products' export from client/src/data/products.ts to be an array. Got: ${typeof products}`
    );
  }

  return products as Product[];
}

async function main() {
  console.log("🌱 Starting database seed...\n");
  
  // Parse products from the client's data file
  let products: Product[];
  try {
    products = await loadProducts();
    console.log(`📦 Found ${products.length} products in client/src/data/products.ts\n`);
  } catch (error) {
    console.error("❌ Failed to read products file:", error);
    process.exit(1);
  }
  
  // Extract unique categories
  const categoryNames = [...new Set(products.map((p) => p.category))];
  console.log(`📁 Categories: ${categoryNames.join(", ")}`);
  
  // Define platforms
  const platformNames: Platform[] = ["PC", "Xbox", "PS5", "Switch 2"];
  console.log(`🎮 Platforms: ${platformNames.join(", ")}\n`);
  
  // Clear existing data (in reverse order of dependencies)
  console.log("🧹 Clearing existing data...");
  await prisma.productPlatformPrice.deleteMany();
  await prisma.product.deleteMany();
  await prisma.platform.deleteMany();
  await prisma.category.deleteMany();
  console.log("✅ Existing data cleared\n");
  
  // Insert categories
  console.log("📁 Inserting categories...");
  const categoryMap = new Map<string, string>();
  for (const name of categoryNames) {
    const category = await prisma.category.create({
      data: { name },
    });
    categoryMap.set(name, category.id);
    console.log(`   ✓ ${name}`);
  }
  console.log("");
  
  // Insert platforms
  console.log("🎮 Inserting platforms...");
  const platformMap = new Map<string, string>();
  for (const name of platformNames) {
    const platform = await prisma.platform.create({
      data: { name },
    });
    platformMap.set(name, platform.id);
    console.log(`   ✓ ${name}`);
  }
  console.log("");
  
  // Insert products and their platform prices
  console.log("🎮 Inserting products...");
  for (const product of products) {
    const categoryId = categoryMap.get(product.category);
    if (!categoryId) {
      console.error(`   ⚠️ Unknown category: ${product.category}`);
      continue;
    }
    
    // Create product
    const dbProduct = await prisma.product.create({
      data: {
        code: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        category_id: categoryId,
      },
    });
    
    // Create platform prices
    for (const [platformName, price] of Object.entries(product.platformPrices)) {
      const platformId = platformMap.get(platformName);
      if (!platformId) {
        console.error(`   ⚠️ Unknown platform: ${platformName}`);
        continue;
      }
      
      await prisma.productPlatformPrice.create({
        data: {
          product_id: dbProduct.id,
          platform_id: platformId,
          price: price,
        },
      });
    }
    
    console.log(`   ✓ ${product.name} (${product.id})`);
  }
  
  console.log("\n✅ Seed completed successfully!");
  console.log(`   - ${categoryNames.length} categories`);
  console.log(`   - ${platformNames.length} platforms`);
  console.log(`   - ${products.length} products`);
  console.log(`   - ${products.length * platformNames.length} platform prices`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
