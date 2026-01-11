import { useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { CartOverlay } from "../components/CartOverlay";
import { products } from "../data/products";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToCart, removeFromCart, type Platform } from "../features/cart/cartSlice";
import { selectCartItems } from "../features/cart/selectors";

const productsBgUrl = `${import.meta.env.BASE_URL}cyberpunk-products.png`;

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function GameProfilePage() {
    const navigate = useNavigate();
  const { id: rawId } = useParams();
  const id = rawId ? decodeURIComponent(rawId) : "";

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("PC");

  const game = useMemo(() => products.find((p) => p.id === id), [id]);
  const platformsInCart = game ? cartItems
    .filter(item => item.id === game.id)
    .map(item => item.platform) : [];
  const isPlatformInCart = game && platformsInCart.includes(selectedPlatform);
  const availablePlatforms: Platform[] = ["PC", "Xbox", "PS5", "Switch 2"];

  // Remove backLink logic, use Back button instead

  return (
    <div className="min-h-full bg-slate-950 relative">
      <div
        className="fixed-bg bg-cover bg-center"
        style={{ backgroundImage: `url(${productsBgUrl})` }}
        aria-hidden="true"
      />
      <div className="fixed-bg bg-slate-950/80" aria-hidden="true" />

      <div className="relative z-10">
        <div className="relative z-50">
          <AppHeader onCartClick={() => setIsCartOpen(true)} />
        </div>
        <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        <main key={id} className="mx-auto max-w-5xl px-4 py-8 animate-slide-up">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                {game ? game.name : "Game not found"}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-1 rounded-lg border border-slate-700/40 bg-slate-900/80"
            >
              ← Back
            </button>
          </div>

          {!game ? (
            <div className="mt-8 rounded-lg border border-slate-700/40 bg-slate-900/60 p-4 text-sm text-slate-300">
              We couldn’t find that game.
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="rounded-xl border-2 border-purple-500/30 bg-gradient-to-br from-slate-900/95 via-purple-900/20 to-slate-900/95 backdrop-blur p-4">
                <div className="relative rounded-lg overflow-hidden border-2 border-purple-500/40 h-72 bg-gradient-to-br from-slate-800 to-slate-900">
                  {game && (
                    <Link
                      to={`/categories/${encodeURIComponent(game.category)}`}
                      state={{ from: location.pathname }}
                      className="absolute top-2 right-2 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-bold text-white shadow-lg hover:from-purple-500 hover:to-pink-500 transition-colors"
                      aria-label={`View category ${game.category}`}
                    >
                      {game.category}
                    </Link>
                  )}

                  <img
                    src={game ? game.image : ""}
                    alt={game ? game.name : ""}
                    className="h-full w-full object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
                </div>
              </div>

              <div className="rounded-xl border-2 border-purple-500/30 bg-gradient-to-br from-slate-900/95 via-purple-900/20 to-slate-900/95 backdrop-blur p-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-white">Description</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {game.description}
                </p>

                {/* Platform selection */}
                <div className="mt-6 space-y-2">
                  <span className="text-sm font-semibold text-purple-300 uppercase tracking-wider">Select Platform</span>
                  <div className="grid grid-cols-2 gap-2">
                    {availablePlatforms.map((platform) => {
                      const isSelected = selectedPlatform === platform;
                      const isInCart = platformsInCart.includes(platform);
                      return (
                        <button
                          key={platform}
                          type="button"
                          onClick={() => setSelectedPlatform(platform)}
                          className={`py-2 px-3 rounded-lg text-sm font-bold transition-all ${
                            isSelected
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                              : isInCart
                              ? 'bg-green-900/50 text-green-300 border border-green-500/50 hover:bg-green-800/50'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-purple-500/30'
                          }`}
                        >
                          {platform} {isInCart && '✓'}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price display */}
                <div className="mt-4 flex items-center justify-between bg-gradient-to-r from-purple-950/50 to-blue-950/50 rounded-lg p-4 border border-purple-500/30">
                  <span className="text-sm font-semibold text-purple-300 uppercase tracking-wider">Price</span>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                    {formatUsd(game.platformPrices[selectedPlatform])}
                  </span>
                </div>

                <button
                  type="button"
                  className={`mt-6 w-full py-3 px-4 rounded-lg font-bold text-sm uppercase tracking-wide shadow-lg transition-all duration-300 ${
                    isPlatformInCart
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 hover:shadow-emerald-500/30 hover:scale-105 active:scale-95"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
                  } ${justAdded ? "animate-pulse" : ""}`}
                  onClick={() => {
                    if (!game) return;
                    if (isPlatformInCart) {
                      dispatch(removeFromCart({ id: game.id, platform: selectedPlatform }));
                      return;
                    }
                    dispatch(addToCart({ product: game, platform: selectedPlatform }));
                    setJustAdded(true);
                    window.setTimeout(() => setJustAdded(false), 1000);
                  }}
                >
                  <span className="flex items-center justify-center gap-2 text-white">
                    {isPlatformInCart ? (
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
