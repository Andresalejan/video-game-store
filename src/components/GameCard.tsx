import { Link, useLocation } from "react-router-dom";
import type { Product, Platform } from "../features/cart/cartSlice";

type GameCardProps = {
  product: Product;
  selectedPlatform: Platform;
  platformsInCart: Platform[];
  isPlatformInCart: boolean;
  wasJustAdded: boolean;
  onPlatformChange: (platform: Platform) => void;
  onAddToCart: () => void;
};

const availablePlatforms: Platform[] = ["PC", "Xbox", "PS5", "Switch 2"];

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function GameCard({
  product,
  selectedPlatform,
  platformsInCart,
  isPlatformInCart,
  wasJustAdded,
  onPlatformChange,
  onAddToCart,
}: GameCardProps) {
  const location = useLocation();

  return (
    <div className="group relative rounded-xl border-2 border-purple-500/30 bg-gradient-to-br from-slate-900/95 via-purple-900/20 to-slate-900/95 backdrop-blur p-1 hover:border-purple-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:-translate-y-2">
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

          {/* Platform selection */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
              Select Platform
            </span>
            <div className="grid grid-cols-2 gap-2">
              {availablePlatforms.map((platform) => {
                const isSelected = selectedPlatform === platform;
                const isInCart = platformsInCart.includes(platform);
                return (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => onPlatformChange(platform)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                        : isInCart
                        ? "bg-green-900/50 text-green-300 border border-green-500/50 hover:bg-green-800/50"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-purple-500/30"
                    }`}
                  >
                    {platform} {isInCart && "✓"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price display with gem design */}
          <div className="flex items-center justify-between bg-gradient-to-r from-purple-950/50 to-blue-950/50 rounded-lg p-3 border border-purple-500/30">
            <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
              Price
            </span>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              {formatUsd(product.platformPrices[selectedPlatform])}
            </span>
          </div>

          {/* Add to cart button */}
          <button
            type="button"
            className={`w-full py-3 px-4 rounded-lg font-bold text-sm uppercase tracking-wide shadow-lg transition-all duration-300 ${
              isPlatformInCart
                ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 hover:shadow-emerald-500/30 hover:scale-105 active:scale-95"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
            } ${wasJustAdded ? "animate-pulse" : ""}`}
            onClick={onAddToCart}
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
    </div>
  );
}
