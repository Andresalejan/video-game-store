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

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
};

export type CartItem = Product;

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
    // Toggle a product in the cart: if it exists, remove it; otherwise add it.
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
        return;
      }
      state.items.push(action.payload);
    },

    // Remove an item from the cart.
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
