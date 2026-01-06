/**
 * App header.
 *
 * Requirements it satisfies:
 * - Shows navigation and app branding.
 * - Shows a shopping cart icon with a badge that updates dynamically.
 */

import React, { useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectTotalItems } from "../features/cart/selectors";
import { categories, products } from "../data/products";
import { CartIcon } from "./CartIcon";

type Props = {
  onCartClick?: () => void;
};

export function AppHeader({ onCartClick }: Props) {
  // Derived from Redux state, so it updates automatically when cart changes.
  const totalItems = useAppSelector(selectTotalItems);
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const blurTimeoutRef = useRef<number | null>(null);
  const resultsContainerRef = useRef<HTMLDivElement | null>(null);
  const resultRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, 10);
  }, [query]);

  // Reset highlight when query changes
  React.useEffect(() => {
    setHighlightedIndex(results.length > 0 ? 0 : -1);
  }, [query, results.length]);

  // Scroll highlighted result into view
  React.useEffect(() => {
    if (
      highlightedIndex >= 0 &&
      resultRefs.current[highlightedIndex]
    ) {
      resultRefs.current[highlightedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [highlightedIndex]);

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/30 bg-slate-900/90 backdrop-blur">
      <div className="mx-auto grid max-w-5xl grid-cols-[auto,1fr,auto] grid-rows-2 items-center gap-4 px-4 py-4 md:grid-cols-[auto,1fr,auto] md:grid-rows-1">
        <Link to="/products" className="text-lg font-semibold text-white tracking-wide">
          Pixel Paradise
        </Link>

        {/* Categories (mobile link) */}
        <div className="justify-self-end md:hidden">
          <Link
            to="/categories"
            className="md:hidden text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Categories
          </Link>
        </div>

        {/* Desktop: Categories + Search grouped on the right. Mobile: search only on 2nd row. */}
        <div className="col-span-full row-start-2 md:col-span-1 md:col-start-2 md:row-start-1 md:justify-self-end">
          <div className="flex items-center gap-4 md:justify-end">
            <div className="hidden md:flex items-center gap-3 text-sm">
              <div 
                className="relative"
                onMouseEnter={() => setIsCategoriesMenuOpen(true)}
                onMouseLeave={() => setIsCategoriesMenuOpen(false)}
              >
                <Link
                  to="/categories"
                  className="font-medium text-slate-300 hover:text-white transition-colors"
                  aria-haspopup="menu"
                  onFocus={() => setIsCategoriesMenuOpen(true)}
                  onBlur={() => setIsCategoriesMenuOpen(false)}
                >
                  Categories
                </Link>

                {/* Hover/focus bridge: keeps the menu open while moving from the link into the dropdown */}
                <div
                  className="absolute right-0 top-full z-[55] h-4 w-56"
                  aria-hidden="true"
                />

                {isCategoriesMenuOpen && (
                  <div
                    className="absolute right-0 top-full z-[60] w-56 pt-2 transition-all duration-150"
                    role="menu"
                    aria-label="Categories"
                  >
                    <div className="rounded-xl border border-slate-700/40 bg-slate-900/95 backdrop-blur shadow-lg p-2">
                      {categories.map((category) => (
                        <Link
                          key={category}
                          to={`/categories/${encodeURIComponent(category)}`}
                          state={{ from: location.pathname }}
                          className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800/70 hover:text-white transition-colors"
                          role="menuitem"
                          onClick={() => {
                            setIsCategoriesMenuOpen(false);
                          }}
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="relative z-[70] w-full md:w-64">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => {
                  if (blurTimeoutRef.current !== null) {
                    window.clearTimeout(blurTimeoutRef.current);
                    blurTimeoutRef.current = null;
                  }
                  setIsSearchOpen(true);
                }}
                onBlur={() => {
                  // Delay close so clicks on results can register.
                  blurTimeoutRef.current = window.setTimeout(() => {
                    closeSearch();
                  }, 120);
                }}
                onKeyDown={(e) => {
                  if (!isSearchOpen || results.length === 0) return;
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setHighlightedIndex((prev) => (prev + 1) % results.length);
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setHighlightedIndex((prev) => (prev - 1 + results.length) % results.length);
                  } else if (e.key === "Enter") {
                    if (highlightedIndex >= 0 && highlightedIndex < results.length) {
                      const p = results[highlightedIndex];
                      setQuery("");
                      closeSearch();
                      navigate(`/games/${encodeURIComponent(p.id)}`, {
                        state: { from: location.pathname },
                      });
                    }
                  }
                }}
                type="text"
                placeholder="Search games"
                className="w-full rounded-lg border border-slate-700/50 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400/70 focus:outline-none focus:ring-2 focus:ring-white/20"
                aria-label="Search games"
                autoComplete="off"
              />

              {isSearchOpen && query.trim().length > 0 && (
                <div className="absolute left-0 top-full mt-2 w-full rounded-xl border border-slate-700/40 bg-slate-900/95 backdrop-blur shadow-lg overflow-hidden">
                  <div
                    className="max-h-72 overflow-y-auto"
                    ref={resultsContainerRef}
                  >
                    {results.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-slate-300">
                        No results
                      </div>
                    ) : (
                      results.map((p, idx) => (
                        <button
                          key={p.id}
                          type="button"
                          ref={el => {
                            resultRefs.current[idx] = el;
                          }}
                          className={`w-full text-left px-4 py-3 transition-colors ${
                            idx === highlightedIndex
                              ? "bg-purple-700/40 text-white"
                              : "hover:bg-slate-800/70"
                          }`}
                          onMouseDown={(e) => {
                            // Prevent input blur before click handler.
                            e.preventDefault();
                          }}
                          onMouseEnter={() => setHighlightedIndex(idx)}
                          onClick={() => {
                            setQuery("");
                            closeSearch();
                            navigate(`/games/${encodeURIComponent(p.id)}`, {
                              state: { from: location.pathname },
                            });
                          }}
                        >
                          <div className="text-sm font-semibold text-slate-100">
                            {p.name}
                          </div>
                          <div className="mt-0.5 text-xs text-slate-300">
                            {p.category}
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cart */}
        {onCartClick && (
          <button
            onClick={onCartClick}
            className="relative inline-flex items-center gap-2 justify-self-end text-sm font-medium text-slate-300 hover:text-white transition-colors col-start-3 row-start-1 md:col-start-3 md:row-start-1"
            aria-label={`Shopping cart, ${totalItems} items`}
          >
            <CartIcon className="h-6 w-6" />
            <span className="hidden sm:inline">Cart</span>
            <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-1 text-xs font-semibold text-white shadow-lg">
              {totalItems}
            </span>
          </button>
        )}
      </div>
    </header>
  );
}
