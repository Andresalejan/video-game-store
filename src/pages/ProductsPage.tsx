/**
 * Products page.
 *
 * Requirements it satisfies:
 * - Displays at least 6 products grouped into 3+ categories
 * - Each product shows image, name, price, and "Add to Cart" button
 * - Includes header with dynamic cart badge
 */

import { useMemo } from "react";
import { AppHeader } from "../components/AppHeader";
import { products, categories } from "../data/products";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function ProductsPage() {
  const dispatch = useAppDispatch();

  const grouped = useMemo(() => {
    // Build a stable list of {category, items} so rendering is straightforward.
    return categories.map((category) => ({
      category,
      items: products.filter((p) => p.category === category),
    }));
  }, []);

  return (
    <div className="min-h-full bg-slate-50">
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h2 className="text-2xl font-semibold text-slate-900">
          Video Game Store
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Pick a category and add games to your cart.
        </p>

        <div className="mt-8 space-y-10">
          {grouped.map((group) => (
            <section key={group.category}>
              <h3 className="text-lg font-semibold text-slate-900">
                {group.category}
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((product) => (
                  <div
                    key={product.id}
                    className="rounded-lg border border-slate-200 bg-white p-4"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-28 w-full rounded-md bg-slate-100 object-cover"
                    />
                    <div className="mt-3">
                      <div className="font-semibold text-slate-900">
                        {product.name}
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        {formatUsd(product.price)}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                      onClick={() => dispatch(addToCart(product))}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
