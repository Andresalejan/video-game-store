/**
 * App header.
 *
 * Requirements it satisfies:
 * - Shows navigation between Products and Cart.
 * - Shows a shopping cart icon with a badge that updates dynamically.
 */

import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectTotalItems } from "../features/cart/selectors";
import { CartIcon } from "./CartIcon";

export function AppHeader() {
  const location = useLocation();
  // Derived from Redux state, so it updates automatically when cart changes.
  const totalItems = useAppSelector(selectTotalItems);

  const onCartPage = location.pathname.startsWith("/cart");

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link to="/products" className="text-lg font-semibold text-slate-900">
          Pixel Paradise
        </Link>

        <nav className="flex items-center gap-4">
          {onCartPage ? (
            <Link
              to="/products"
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Continue Shopping
            </Link>
          ) : (
            <Link
              to="/cart"
              className="relative inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900"
              aria-label={`Shopping cart, ${totalItems} items`}
            >
              <CartIcon className="h-6 w-6" />
              <span className="hidden sm:inline">Cart</span>
              <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1 text-xs font-semibold text-white">
                {totalItems}
              </span>
            </Link>
          )}

          {onCartPage && (
            <div
              className="relative inline-flex items-center gap-2 text-sm font-medium text-slate-700"
              aria-label={`Shopping cart, ${totalItems} items`}
            >
              <CartIcon className="h-6 w-6" />
              <span className="hidden sm:inline">Cart</span>
              <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1 text-xs font-semibold text-white">
                {totalItems}
              </span>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
