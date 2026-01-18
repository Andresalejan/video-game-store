/**
 * API client for the GameStore backend.
 * 
 * Provides typed functions to fetch data from the REST API.
 * Uses VITE_API_URL environment variable for the base URL.
 */

import type { Product, Platform } from "../features/cart/cartSlice";

// Base URL from environment or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  status: number;
  statusText: string;
  
  constructor(
    message: string,
    status: number,
    statusText: string
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
  }
}

/**
 * Generic fetch wrapper with error handling
 */
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new ApiError(
        errorBody.error || `API error: ${response.status}`,
        response.status,
        response.statusText
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Network or other errors
    throw new ApiError(
      error instanceof Error ? error.message : "Network error",
      0,
      "Network Error"
    );
  }
}

/**
 * Category type from the API
 */
export interface Category {
  id: string;
  name: string;
}

/**
 * Platform type from the API
 */
export interface ApiPlatform {
  id: string;
  name: string;
}

/**
 * Product filters for the API
 */
export interface ProductFilters {
  category?: string;
  platform?: Platform;
  q?: string;
}

/**
 * Fetch all categories
 */
export async function fetchCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/categories");
}

/**
 * Fetch all platforms
 */
export async function fetchPlatforms(): Promise<ApiPlatform[]> {
  return apiFetch<ApiPlatform[]>("/platforms");
}

/**
 * Fetch products with optional filters
 * 
 * @param filters - Optional filters (category, platform, search query)
 * @returns Array of products
 */
export async function fetchProducts(filters?: ProductFilters): Promise<Product[]> {
  const params = new URLSearchParams();
  
  if (filters?.category) {
    params.append("category", filters.category);
  }
  if (filters?.platform) {
    params.append("platform", filters.platform);
  }
  if (filters?.q) {
    params.append("q", filters.q);
  }

  const queryString = params.toString();
  const endpoint = queryString ? `/products?${queryString}` : "/products";
  
  return apiFetch<Product[]>(endpoint);
}

/**
 * Fetch a single product by its code
 * 
 * @param code - Product code (e.g., "game-elden")
 * @returns Product details
 */
export async function fetchProduct(code: string): Promise<Product> {
  return apiFetch<Product>(`/products/${encodeURIComponent(code)}`);
}

/**
 * Health check
 */
export async function checkHealth(): Promise<{ ok: boolean; timestamp: string }> {
  return apiFetch<{ ok: boolean; timestamp: string }>("/health");
}
