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
};

export type CartItem = Product & {
  quantity: number;
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
    // Add a product to the cart. If it already exists, just increase quantity.
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
        return;
      }
      state.items.push({ ...action.payload, quantity: 1 });
    },

    // Increase quantity of a specific cart line.
    increaseQuantity(state, action: PayloadAction<string>) {
      const existing = state.items.find((item) => item.id === action.payload);
      if (!existing) return;
      existing.quantity += 1;
    },

    // Decrease quantity; if it would hit 0, remove the item entirely.
    decreaseQuantity(state, action: PayloadAction<string>) {
      const existing = state.items.find((item) => item.id === action.payload);
      if (!existing) return;
      if (existing.quantity <= 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        return;
      }
      existing.quantity -= 1;
    },

    // Remove an item regardless of quantity.
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
