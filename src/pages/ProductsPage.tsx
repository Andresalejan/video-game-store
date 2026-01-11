/**
 * Products page.
 *
 * Requirements it satisfies:
 * - Displays at least 6 products grouped into 3+ categories
 * - Each product shows image, name, price, and "Add to Cart" button
 * - Includes header with dynamic cart badge
 */

import { useMemo, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { CartOverlay } from "../components/CartOverlay";
import { GameCard } from "../components/GameCard";
import { products, categories } from "../data/products";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToCart, removeFromCart, type Platform } from "../features/cart/cartSlice";
import { selectCartItems } from "../features/cart/selectors";

const productsBgUrl = `${import.meta.env.BASE_URL}cyberpunk-products.png`;

export function ProductsPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const location = useLocation();
  const [justAdded, setJustAdded] = useState<Set<string>>(new Set());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Record<string, Platform>>({});

  useEffect(() => {
    const img = new window.Image();
    img.src = productsBgUrl;
    img.onload = () => setLoading(false);
  }, []);

  const grouped = useMemo(() => {
    // Build a stable list of {category, items} so rendering is straightforward.
    return categories.map((category) => ({
      category,
      items: products.filter((p) => p.category === category).slice(0, 3),
    }));
  }, []);

  return (
    <div className="min-h-full bg-slate-950 relative">
      {/* Spinner Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
        </div>
      )}
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
                      setJustAdded(prev => new Set(prev).add(`${product.id}-${selectedPlatform}`));
                      setTimeout(() => {
                        setJustAdded(prev => {
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
