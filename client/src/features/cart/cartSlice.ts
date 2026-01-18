/**
 * Cart "slice" (Redux Toolkit).
 *
 * Purpose:
 * - Defines the cart portion of global state.
 * - Defines the ONLY allowed ways to change that state (reducers/actions).
 *
 * How Redux Toolkit helps:
 * - `createSlice` generates action creators + action types automatically.
 * - Reducer code can look like it "mutates" state; RTK uses Immer internally
 *   to produce immutable updates safely.
 */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Platform = "PC" | "Xbox" | "PS5" | "Switch 2";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  platformPrices: Record<Platform, number>;
};

export type CartItem = Product & {
  platform: Platform;
  selectedPrice: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add a product with a specific platform to the cart.
    addToCart(state, action: PayloadAction<{ product: Product; platform: Platform }>) {
      const { product, platform } = action.payload;
      const selectedPrice = product.platformPrices[platform];
      
      // Check if this exact product + platform combo already exists
      const existing = state.items.find(
        (item) => item.id === product.id && item.platform === platform
      );
      
      if (existing) {
        // If it exists, remove it (toggle behavior)
        state.items = state.items.filter(
          (item) => !(item.id === product.id && item.platform === platform)
        );
        return;
      }
      
      // Add new item with platform and selected price
      state.items.push({
        ...product,
        platform,
        selectedPrice,
      });
    },

    // Remove an item from the cart by id and platform.
    removeFromCart(state, action: PayloadAction<{ id: string; platform: Platform }>) {
      const { id, platform } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.platform === platform)
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
