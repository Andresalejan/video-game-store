/**
 * Cart selectors.
 *
 * Purpose:
 * - Centralize "how to read" cart data from state.
 * - Keep UI components simple (components ask selectors for data, not compute it).
 */

import type { RootState } from "../../app/store";

export const selectCartItems = (state: RootState) => state.cart.items;

// Total quantity across all cart lines (used for the header badge + cart summary).
export const selectTotalItems = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

// Total dollar cost across all cart lines.
export const selectTotalCost = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
