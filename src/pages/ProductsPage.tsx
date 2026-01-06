/**
 * Products page.
 *
 * Requirements it satisfies:
 * - Displays at least 6 products grouped into 3+ categories
 * - Each product shows image, name, price, and "Add to Cart" button
 * - Includes header with dynamic cart badge
 */

import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { CartOverlay } from "../components/CartOverlay";
import { products, categories } from "../data/products";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";
import { selectCartItems } from "../features/cart/selectors";

const productsBgUrl = `${import.meta.env.BASE_URL}cyberpunk-products.png`;

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function ProductsPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const location = useLocation();
  const [justAdded, setJustAdded] = useState<Set<string>>(new Set());
  const [isCartOpen, setIsCartOpen] = useState(false);

  const grouped = useMemo(() => {
    // Build a stable list of {category, items} so rendering is straightforward.
    return categories.map((category) => ({
      category,
      items: products.filter((p) => p.category === category).slice(0, 3),
    }));
  }, []);

  return (
    <div className="min-h-full bg-slate-950 relative">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${productsBgUrl})` }}
        aria-hidden="true"
      />
      
      {/* Dark overlay for readability */}
      <div
        className="fixed inset-0 bg-slate-950/80"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="relative z-50">
          <AppHeader onCartClick={() => setIsCartOpen(true)} />
        </div>
        <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <main className="mx-auto max-w-5xl px-4 py-8 animate-slide-up">
          <h2 className="text-2xl font-semibold text-white">
            Video Game Store
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Pick a category and add games to your cart.
          </p>

          <div className="mt-8 space-y-10">
            {grouped.map((group) => (
              <section key={group.category}>
                <Link
                  to={`/categories/${encodeURIComponent(group.category)}`}
                  state={{ from: location.pathname }}
                  className="group inline-block"
                  aria-label={`View all ${group.category} games`}
                  title={`View all ${group.category} games`}
                >
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-2 group-hover:brightness-110">
                    {group.category}
                  </h3>
                </Link>
                <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6"></div>
                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((product) => {
                    const isInCart = cartItems.some(item => item.id === product.id);
                    const wasJustAdded = justAdded.has(product.id);
                    
                    const handleAddToCart = () => {
                      if (isInCart) {
                        dispatch(removeFromCart(product.id));
                        return;
                      }

                      dispatch(addToCart(product));
                      setJustAdded(prev => new Set(prev).add(product.id));
                      setTimeout(() => {
                        setJustAdded(prev => {
                          const next = new Set(prev);
                          next.delete(product.id);
                          return next;
                        });
                      }, 1000);
                    };
                    
                    return (
                    <div
                      key={product.id}
                      className="group relative rounded-xl border-2 border-purple-500/30 bg-gradient-to-br from-slate-900/95 via-purple-900/20 to-slate-900/95 backdrop-blur p-1 hover:border-purple-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:-translate-y-2"
                    >
                      {/* Holographic shine effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-400/0 via-pink-400/0 to-blue-400/0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
                      
                      {/* Card inner content */}
                      <div className="relative rounded-lg bg-slate-900/90 p-4 overflow-hidden">
                        {/* Category badge */}
                        <Link
                          to={`/categories/${encodeURIComponent(product.category)}`}
                          state={{ from: location.pathname }}
                          className="absolute top-2 right-2 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-bold text-white shadow-lg hover:from-purple-500 hover:to-pink-500 transition-colors"
                          aria-label={`View category ${product.category}`}
                        >
                          {product.category}
                        </Link>
                        
                        {/* Image with frame */}
                        <Link
                          to={`/games/${encodeURIComponent(product.id)}`}
                          state={{ from: location.pathname }}
                          className="block relative rounded-lg overflow-hidden border-2 border-purple-500/40 group-hover:border-purple-400/60 transition-colors h-48 bg-gradient-to-br from-slate-800 to-slate-900"
                          aria-label={`View ${product.name} details`}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
                        </Link>
                        
                        {/* Card details */}
                        <div className="mt-4 space-y-3">
                          <Link
                            to={`/games/${encodeURIComponent(product.id)}`}
                            state={{ from: location.pathname }}
                            className="block font-bold text-lg text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all"
                            aria-label={`View ${product.name} details`}
                          >
                            {product.name}
                          </Link>
                          
                          {/* Price display with gem design */}
                          <div className="flex items-center justify-between bg-gradient-to-r from-purple-950/50 to-blue-950/50 rounded-lg p-3 border border-purple-500/30">
                            <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">Price</span>
                            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                              {formatUsd(product.price)}
                            </span>
                          </div>
                          
                          {/* Add to cart button */}
                          <button
                            type="button"
                            className={`w-full py-3 px-4 rounded-lg font-bold text-sm uppercase tracking-wide shadow-lg transition-all duration-300 ${
                              isInCart
                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 hover:shadow-emerald-500/30 hover:scale-105 active:scale-95'
                                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/50 hover:scale-105 active:scale-95'
                            } ${wasJustAdded ? 'animate-pulse' : ''}`}
                            onClick={handleAddToCart}
                          >
                            <span className="flex items-center justify-center gap-2 text-white">
                              {isInCart ? (
                                <>
                                  <span>✓</span>
                                  Added to Cart
                                  <span>✓</span>
                                </>
                              ) : (
                                <>
                                  <span>⚡</span>
                                  Add to Cart
                                  <span>⚡</span>
                                </>
                              )}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex justify-end">
                  <Link
                    to={`/categories/${encodeURIComponent(group.category)}`}
                    state={{ from: location.pathname }}
                    className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                    aria-label={`View all ${group.category} games`}
                  >
                    View all →
                  </Link>
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
