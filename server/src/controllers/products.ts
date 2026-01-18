/**
 * Products controller
 */

import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

// Type for the platform prices map that matches the frontend expectation
type PlatformPricesMap = Record<string, number>;

// Type for the API response product
interface ProductResponse {
  id: string;
  code: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  platformPrices: PlatformPricesMap;
}

// DB product type (using unknown for Decimal since we convert to number)
interface DbProduct {
  id: string;
  code: string;
  name: string;
  price: unknown;
  image: string;
  description: string;
  category: { name: string };
  platform_prices: {
    price: unknown;
    platform: { name: string };
  }[];
}

/**
 * Transform a database product with platform prices to the API response format.
 */
function transformProduct(product: DbProduct): ProductResponse {
  const platformPrices: PlatformPricesMap = {};
  
  for (const pp of product.platform_prices) {
    platformPrices[pp.platform.name] = Number(pp.price);
  }

  return {
    id: product.code, // Use code as id for frontend compatibility
    code: product.code,
    name: product.name,
    price: Number(product.price),
    category: product.category.name,
    image: product.image,
    description: product.description,
    platformPrices,
  };
}

/**
 * GET /api/products
 * 
 * Query parameters:
 * - category: Filter by category name
 * - platform: Filter by platform name (only products with prices for that platform)
 * - q: Search by name or description (case-insensitive contains)
 */
export async function getAllProducts(req: Request, res: Response): Promise<void> {
  try {
    const { category, platform, q } = req.query;

    // Build the where clause dynamically
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = {};

    // Filter by category
    if (typeof category === "string" && category.trim()) {
      where.category = {
        name: {
          equals: category.trim(),
          mode: "insensitive",
        },
      };
    }

    // Filter by platform (products that have a price for this platform)
    if (typeof platform === "string" && platform.trim()) {
      where.platform_prices = {
        some: {
          platform: {
            name: {
              equals: platform.trim(),
              mode: "insensitive",
            },
          },
        },
      };
    }

    // Search by name or description
    if (typeof q === "string" && q.trim()) {
      const searchTerm = q.trim();
      where.OR = [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { name: "asc" },
      include: {
        category: {
          select: { name: true },
        },
        platform_prices: {
          include: {
            platform: {
              select: { name: true },
            },
          },
        },
      },
    });

    const response: ProductResponse[] = products.map(transformProduct);
    res.json(response);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

/**
 * GET /api/products/:code
 * 
 * Get a single product by its code (e.g., "game-elden")
 */
export async function getProductByCode(req: Request, res: Response): Promise<void> {
  try {
    const code = req.params.code as string;

    if (!code) {
      res.status(400).json({ error: "Product code is required" });
      return;
    }

    const product = await prisma.product.findUnique({
      where: { code: code },
      include: {
        category: {
          select: { name: true },
        },
        platform_prices: {
          include: {
            platform: {
              select: { name: true },
            },
          },
        },
      },
    });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    const response: ProductResponse = transformProduct(product);
    res.json(response);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
}
