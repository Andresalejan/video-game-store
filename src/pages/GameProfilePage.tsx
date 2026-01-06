import { useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { CartOverlay } from "../components/CartOverlay";
import { products } from "../data/products";
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

export function GameProfilePage() {
  const { id: rawId } = useParams();
  const id = rawId ? decodeURIComponent(rawId) : "";

  const location = useLocation();
  const navState = location.state as { from?: string } | null;
  const fromPath = navState?.from;

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const game = useMemo(() => products.find((p) => p.id === id), [id]);
  const isInCart = !!game && cartItems.some((item) => item.id === game.id);

  const backLink = useMemo(() => {
    if (typeof fromPath !== "string" || fromPath.length === 0) {
      return { to: "/products", label: "Back to Games" };
    }

    if (fromPath.startsWith("/categories/")) {
      return { to: fromPath, label: "Back to Category" };
    }

    if (fromPath === "/categories") {
      return { to: fromPath, label: "Back to Categories" };
    }

    if (fromPath === "/products") {
      return { to: fromPath, label: "Back to Games" };
    }

    if (fromPath === "/") {
      return { to: fromPath, label: "Back Home" };
    }

    return { to: fromPath, label: "Back" };
  }, [fromPath]);

  return (
    <div className="min-h-full bg-slate-950 relative">
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${productsBgUrl})` }}
        aria-hidden="true"
      />
      <div className="fixed inset-0 bg-slate-950/80" aria-hidden="true" />

      <div className="relative z-10">
        <div className="relative z-50">
          <AppHeader onCartClick={() => setIsCartOpen(true)} />
        </div>
        <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        <main className="mx-auto max-w-5xl px-4 py-8 animate-slide-up">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                {game ? game.name : "Game not found"}
              </h2>
              {game && (
                <p className="mt-2 text-sm text-slate-300">{game.category}</p>
              )}
            </div>

            <Link
              to={backLink.to}
              state={{ from: location.pathname }}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {backLink.label}
            </Link>
          </div>

          {!game ? (
            <div className="mt-8 rounded-lg border border-slate-700/40 bg-slate-900/60 p-4 text-sm text-slate-300">
              We couldn’t find that game.
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="rounded-xl border-2 border-purple-500/30 bg-gradient-to-br from-slate-900/95 via-purple-900/20 to-slate-900/95 backdrop-blur p-4">
                <div className="relative rounded-lg overflow-hidden border-2 border-purple-500/40 h-72 bg-gradient-to-br from-slate-800 to-slate-900">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="h-full w-full object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
                </div>
              </div>

              <div className="rounded-xl border-2 border-purple-500/30 bg-gradient-to-br from-slate-900/95 via-purple-900/20 to-slate-900/95 backdrop-blur p-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-white">Description</h3>
                  <div className="text-sm font-semibold text-slate-200">
                    {formatUsd(game.price)}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {game.description}
                </p>

                <button
                  type="button"
                  className={`mt-6 w-full py-3 px-4 rounded-lg font-bold text-sm uppercase tracking-wide shadow-lg transition-all duration-300 ${
                    isInCart
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 hover:shadow-emerald-500/30 hover:scale-105 active:scale-95"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
                  } ${justAdded ? "animate-pulse" : ""}`}
                  onClick={() => {
                    if (!game) return;
                    if (isInCart) {
                      dispatch(removeFromCart(game.id));
                      return;
                    }
                    dispatch(addToCart(game));
                    setJustAdded(true);
                    window.setTimeout(() => setJustAdded(false), 1000);
                  }}
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
          )}
        </main>
      </div>
    </div>
  );
}
