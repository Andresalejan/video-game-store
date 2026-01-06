import { Link, useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { categories } from "../data/products";

const productsBgUrl = `${import.meta.env.BASE_URL}cyberpunk-products.png`;

export function CategoriesPage() {
  const navigate = useNavigate();
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

      <div className="relative z-10">
        <AppHeader />

        <main className="mx-auto max-w-5xl px-4 py-8 animate-slide-up">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-white">Categories</h2>
              <p className="mt-2 text-sm text-slate-300">
                Browse games by category.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-1 rounded-lg border border-slate-700/40 bg-slate-900/80"
            >
              ← Back
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/categories/${encodeURIComponent(category)}`}
                className="rounded-xl border-2 border-purple-500/30 bg-gradient-to-br from-slate-900/95 via-purple-900/20 to-slate-900/95 backdrop-blur p-4 hover:border-purple-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
              >
                <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                  {category}
                </div>
                <div className="mt-2 text-sm text-slate-300">View all games</div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
