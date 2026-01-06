/**
 * Cart selectors.
 *
 * Purpose:
 * - Centralize "how to read" cart data from state.
 * - Keep UI components simple (components ask selectors for data, not compute it).
 */

import type { RootState } from "../../app/store";

export const selectCartItems = (state: RootState) => state.cart.items;

// Total items in cart (1 per game). Used for the header badge + cart summary.
export const selectTotalItems = (state: RootState) => state.cart.items.length;

// Total dollar cost across all cart items.
export const selectTotalCost = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.price, 0);
