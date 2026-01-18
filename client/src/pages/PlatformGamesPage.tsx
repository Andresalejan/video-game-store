import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { CartOverlay } from "../components/CartOverlay";
import { GameCard } from "../components/GameCard";
import { fetchProducts } from "../api/catalog";
import { useApi, ErrorMessage } from "../hooks/useApi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToCart, removeFromCart, type Platform, type Product } from "../features/cart/cartSlice";
import { selectCartItems } from "../features/cart/selectors";

const productsBgUrl = `${import.meta.env.BASE_URL}cyberpunk-products.png`;

const allPlatforms: Platform[] = ["PC", "Xbox", "PS5", "Switch 2"];

function PlatformGamesContent({ decodedPlatform }: { decodedPlatform: string }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const [justAdded, setJustAdded] = useState<Set<string>>(new Set());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Record<string, Platform>>({});

  const isKnownPlatform = allPlatforms.includes(decodedPlatform as Platform);

  // Fetch products filtered by platform from API
  const { data: items, loading, error, refetch } = useApi<Product[]>(
    () => isKnownPlatform ? fetchProducts({ platform: decodedPlatform as Platform }) : Promise.resolve([]),
    [decodedPlatform, isKnownPlatform]
  );

  const hasProducts = items && items.length > 0;

  return (
    <div className="min-h-full bg-slate-950 relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
        </div>
      )}
      {/* Background Image */}
      <div
        className="bg-fixed-mobile bg-cover bg-center"
        style={{ backgroundImage: `url(${productsBgUrl})` }}
        aria-hidden="true"
      />

      {/* Dark overlay for readability */}
      <div className="bg-fixed-mobile bg-slate-950/80" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10">
        <div className="relative z-50">
          <AppHeader onCartClick={() => setIsCartOpen(true)} />
        </div>
        <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        <main
          key={decodedPlatform}
          className="mx-auto max-w-5xl px-4 py-8 animate-slide-up"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                {isKnownPlatform ? decodedPlatform : "Platform not found"}
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                {isKnownPlatform
                  ? `All games available on ${decodedPlatform}.`
                  : "This platform doesn't exist."}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-1 rounded-lg border border-slate-700/40 bg-slate-900/80"
              >
                ← Back
              </button>
            </div>
          </div>

          {error && !loading && (
            <div className="mt-8">
              <ErrorMessage message={error} onRetry={refetch} />
            </div>
          )}

          {hasProducts && !loading && (
            <div className="mt-8">
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((product) => {
                  const selectedPlatform = selectedPlatforms[product.id] || (decodedPlatform as Platform);
                  const platformsInCart = cartItems
                    .filter(item => item.id === product.id)
                    .map(item => item.platform);
                  const isPlatformInCart = platformsInCart.includes(selectedPlatform);
                  const wasJustAdded = justAdded.has(`${product.id}-${selectedPlatform}`);
                  
                  const handlePlatformChange = (platform: Platform) => {
                    setSelectedPlatforms(prev => ({
                      ...prev,
                      [product.id]: platform
                    }));
                  };

                  const handleAddToCart = () => {
                    if (isPlatformInCart) {
                      dispatch(removeFromCart({ id: product.id, platform: selectedPlatform }));
                      return;
                    }

                    dispatch(addToCart({ product, platform: selectedPlatform }));
                    setJustAdded((prev) => new Set(prev).add(`${product.id}-${selectedPlatform}`));
                    setTimeout(() => {
                      setJustAdded((prev) => {
                        const next = new Set(prev);
                        next.delete(`${product.id}-${selectedPlatform}`);
                        return next;
                      });
                    }, 1000);
                  };

                  return (
                    <GameCard
                      key={product.id}
                      product={product}
                      selectedPlatform={selectedPlatform}
                      platformsInCart={platformsInCart}
                      isPlatformInCart={isPlatformInCart}
                      wasJustAdded={wasJustAdded}
                      onPlatformChange={handlePlatformChange}
                      onAddToCart={handleAddToCart}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {!isKnownPlatform && !loading && (
            <div className="mt-8 rounded-lg border border-slate-700/40 bg-slate-900/60 p-4 text-sm text-slate-300">
              This platform doesn't exist. Please select a valid platform.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export function PlatformGamesPage() {
  const { platform: rawPlatform } = useParams();
  const decodedPlatform = rawPlatform ? decodeURIComponent(rawPlatform) : "";
  
  // Use key to reset component state when platform changes
  return <PlatformGamesContent key={decodedPlatform} decodedPlatform={decodedPlatform} />;
}
