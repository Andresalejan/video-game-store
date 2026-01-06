/**
 * Shopping cart page.
 *
 * Requirements it satisfies:
 * - Shows each cart item with image/name/unit price/line total
 * - Increase/decrease quantity buttons (updates totals + header badge)
 * - Delete button per item
 * - Shows total items + total cost + continue shopping + checkout
 */

import { Link } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectCartItems,
  selectTotalCost,
  selectTotalItems,
} from "../features/cart/selectors";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function CartPage() {
  const dispatch = useAppDispatch();

  // Read current cart state via selectors (keeps UI logic minimal).
  const items = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectTotalItems);
  const totalCost = useAppSelector(selectTotalCost);

  return (
    <div className="min-h-full bg-slate-50">
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Shopping Cart</h2>
            <p className="mt-2 text-sm text-slate-600">
              Total items: <span className="font-semibold">{totalItems}</span>
              {" · "}
              Total cost: <span className="font-semibold">{formatUsd(totalCost)}</span>
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              Continue Shopping
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Checkout
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-md bg-slate-100 object-cover"
                />
                <div>
                  <div className="font-semibold text-slate-900">{item.name}</div>
                  <div className="mt-1 text-sm text-slate-600">
                    Unit: {formatUsd(item.price)}
                  </div>
                </div>
              </div>

              <div className="sm:ml-auto sm:text-right">
                <div className="text-sm text-slate-600">
                  Line total: {formatUsd(item.price * item.quantity)}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 sm:justify-end">
                  <button
                    type="button"
                    className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    -
                  </button>
                  <div className="min-w-10 text-center text-sm font-semibold text-slate-900">
                    {item.quantity}
                  </div>
                  <button
                    type="button"
                    className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-700">
              Your cart is empty.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
