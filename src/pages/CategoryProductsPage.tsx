import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { CartOverlay } from "../components/CartOverlay";
import { products, categories } from "../data/products";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";
import { selectCartItems } from "../features/cart/selectors";

const productsBgUrl = `${import.meta.env.BASE_URL}cyberpunk-products.png`;

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function CategoryProductsPage() {
  const { category: rawCategory } = useParams();
  const decodedCategory = rawCategory ? decodeURIComponent(rawCategory) : "";

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const [justAdded, setJustAdded] = useState<Set<string>>(new Set());
  const [isCartOpen, setIsCartOpen] = useState(false);

  const isKnownCategory = useMemo(
    () => categories.includes(decodedCategory),
    [decodedCategory]
  );

  const items = useMemo(() => {
    if (!isKnownCategory) return [];
    return products.filter((p) => p.category === decodedCategory);
  }, [decodedCategory, isKnownCategory]);

  return (
    <div className="min-h-full bg-slate-950 relative">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${productsBgUrl})` }}
        aria-hidden="true"
      />

      {/* Dark overlay for readability */}
      <div className="fixed inset-0 bg-slate-950/80" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10">
        <div className="relative z-50">
          <AppHeader onCartClick={() => setIsCartOpen(true)} />
        </div>
        <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        <main className="mx-auto max-w-5xl px-4 py-8 animate-slide-up">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                {isKnownCategory ? decodedCategory : "Category not found"}
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                {isKnownCategory
                  ? "All games in this category."
                  : "This category doesn’t exist."}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/products"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Back to Games
              </Link>
              <Link
                to="/categories"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Back to Categories
              </Link>
            </div>
          </div>

          {isKnownCategory && (
            <div className="mt-8">
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((product) => {
                  const isInCart = cartItems.some((item) => item.id === product.id);
                  const wasJustAdded = justAdded.has(product.id);

                  const handleAddToCart = () => {
                    if (isInCart) return;
                    dispatch(addToCart(product));
                    setJustAdded((prev) => new Set(prev).add(product.id));
                    setTimeout(() => {
                      setJustAdded((prev) => {
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
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-400/0 via-pink-400/0 to-blue-400/0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>

                      <div className="relative rounded-lg bg-slate-900/90 p-4 overflow-hidden">
                        <Link
                          to={`/categories/${encodeURIComponent(product.category)}`}
                          className="absolute top-2 right-2 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-bold text-white shadow-lg hover:from-purple-500 hover:to-pink-500 transition-colors"
                          aria-label={`View category ${product.category}`}
                        >
                          {product.category}
                        </Link>

                        <div className="relative rounded-lg overflow-hidden border-2 border-purple-500/40 group-hover:border-purple-400/60 transition-colors h-48 bg-gradient-to-br from-slate-800 to-slate-900">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
                        </div>

                        <div className="mt-4 space-y-3">
                          <div className="font-bold text-lg text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                            {product.name}
                          </div>

                          <div className="flex items-center justify-between bg-gradient-to-r from-purple-950/50 to-blue-950/50 rounded-lg p-3 border border-purple-500/30">
                            <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                              Price
                            </span>
                            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                              {formatUsd(product.price)}
                            </span>
                          </div>

                          <button
                            type="button"
                            disabled={isInCart}
                            className={`w-full py-3 px-4 rounded-lg font-bold text-sm uppercase tracking-wide shadow-lg transition-all duration-300 ${
                              isInCart
                                ? "bg-gradient-to-r from-green-600 to-emerald-600 cursor-not-allowed scale-100"
                                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
                            } ${wasJustAdded ? "animate-pulse" : ""}`}
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
            </div>
          )}

          {!isKnownCategory && (
            <div className="mt-8 rounded-lg border border-slate-700/40 bg-slate-900/60 p-4 text-sm text-slate-300">
              Try selecting a category from the list.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
