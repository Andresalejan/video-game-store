/**
 * Redux store configuration.
 *
 * Purpose:
 * - Central place that holds the global app state (for this project: the cart).
 * - Lets any page/component read/update cart data without prop-drilling.
 *
 * Key idea:
 * - The store is composed of "slices" (feature reducers). Here we only have `cart`.
 */

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    // `cart` becomes state.cart in selectors/components.
    cart: cartReducer,
  },
});

// These types power TypeScript-safe `dispatch` and `useSelector`.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
