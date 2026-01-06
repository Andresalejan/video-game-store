/**
 * Typed React-Redux hooks.
 *
 * Purpose:
 * - `useAppDispatch()` knows the exact dispatch type.
 * - `useAppSelector()` knows the RootState shape.
 *
 * Why it matters:
 * - Prevents common Redux+TS mistakes (wrong payload types, wrong state paths).
 */

import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
