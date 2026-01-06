/**
 * App header.
 *
 * Requirements it satisfies:
 * - Shows navigation and app branding.
 * - Shows a shopping cart icon with a badge that updates dynamically.
 */

import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectTotalItems } from "../features/cart/selectors";
import { CartIcon } from "./CartIcon";

type Props = {
  onCartClick?: () => void;
};

export function AppHeader({ onCartClick }: Props) {
  // Derived from Redux state, so it updates automatically when cart changes.
  const totalItems = useAppSelector(selectTotalItems);

  return (
    <header className="border-b border-slate-700/30 bg-slate-900/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link to="/products" className="text-lg font-semibold text-white tracking-wide">
          Pixel Paradise
        </Link>

        <nav className="flex items-center gap-4">
          {onCartClick && (
            <button
              onClick={onCartClick}
              className="relative inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              aria-label={`Shopping cart, ${totalItems} items`}
            >
              <CartIcon className="h-6 w-6" />
              <span className="hidden sm:inline">Cart</span>
              <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-1 text-xs font-semibold text-white shadow-lg">
                {totalItems}
              </span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
