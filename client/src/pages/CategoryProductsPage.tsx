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

function CategoryProductsContent({ decodedCategory }: { decodedCategory: string }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const [justAdded, setJustAdded] = useState<Set<string>>(new Set());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Record<string, Platform>>({});

  // Fetch products filtered by category from API
  const { data: items, loading, error, refetch } = useApi<Product[]>(
    () => fetchProducts({ category: decodedCategory }),
    [decodedCategory]
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
          key={decodedCategory}
          className="mx-auto max-w-5xl px-4 py-8 animate-slide-up"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                {hasProducts ? decodedCategory : (loading ? "Loading..." : "Category not found")}
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                {hasProducts
                  ? "All games in this category."
                  : (loading ? "" : "This category doesn't exist or has no games.")}
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
                  const selectedPlatform = selectedPlatforms[product.id] || "PC";
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

          {!hasProducts && !loading && !error && (
            <div className="mt-8 rounded-lg border border-slate-700/40 bg-slate-900/60 p-4 text-sm text-slate-300">
              Try selecting a category from the list.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export function CategoryProductsPage() {
  const { category: rawCategory } = useParams();
  const decodedCategory = rawCategory ? decodeURIComponent(rawCategory) : "";
  
  // Use key to reset component state when category changes
  return <CategoryProductsContent key={decodedCategory} decodedCategory={decodedCategory} />;
}
