/**
 * Cart overlay modal component.
 *
 * Purpose:
 * - Displays cart as an overlay on top of the products page
 * - Allows users to review and manage cart without leaving the page
 */

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

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function CartOverlay({ isOpen, onClose }: Props) {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectTotalItems);
  const totalCost = useAppSelector(selectTotalCost);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Cart Modal */}
      <div className="relative z-10 w-full max-w-3xl my-auto rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-purple-500/50 shadow-2xl shadow-purple-500/30 overflow-hidden animate-slide-up flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
          <div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Shopping Cart
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} · {formatUsd(totalCost)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-lg text-slate-400">Your cart is empty</p>
              <p className="text-sm text-slate-500 mt-2">Add some games to get started!</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-4 rounded-xl border border-purple-500/30 bg-slate-800/50 p-4 hover:border-purple-400/50 transition-colors"
              >
                {/* Game Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 mx-auto sm:mx-0 rounded-lg bg-slate-900 object-contain border border-purple-500/30 flex-shrink-0"
                />

                {/* Item Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="font-bold text-white break-words">{item.name}</h3>
                    <p className="text-sm text-slate-400 mt-1">
                      {formatUsd(item.price)} each
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      type="button"
                      className="rounded-md bg-slate-700 hover:bg-slate-600 text-white w-8 h-8 flex items-center justify-center transition-colors flex-shrink-0"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      −
                    </button>
                    <span className="text-white font-semibold min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="rounded-md bg-slate-700 hover:bg-slate-600 text-white w-8 h-8 flex items-center justify-center transition-colors flex-shrink-0"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price & Remove */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between flex-shrink-0">
                  <div className="text-right">
                    <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 whitespace-nowrap">
                      {formatUsd(item.price * item.quantity)}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-red-400 hover:text-red-300 text-sm font-semibold transition-colors whitespace-nowrap"
                    onClick={() => dispatch(removeFromCart(item.id))}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-pink-900/30 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-white">Total:</span>
              <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                {formatUsd(totalCost)}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-lg border-2 border-purple-500/50 text-white font-semibold hover:bg-slate-700/50 transition-all"
              >
                Continue Shopping
              </button>
              <button
                type="button"
                className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
