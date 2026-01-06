/**
 * App router.
 *
 * Purpose:
 * - Defines the required pages (Landing, Products).
 * - Cart is now handled as an overlay on the Products page.
 *
 * Note about GitHub Pages:
 * - `basename={import.meta.env.BASE_URL}` helps when the app is served from a
 *   sub-path (common on GitHub Pages).
 */

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { LandingPage } from "./pages/LandingPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { CategoryProductsPage } from "./pages/CategoryProductsPage";
import { ProductsPage } from "./pages/ProductsPage";

function ScrollToTop() {
  const location = useLocation();

  // GitHub Pages + SPA routing: ensure navigation always starts at top.
  // This avoids preserving scroll position when switching routes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Routes>
          {/* Landing */}
          <Route path="/" element={<LandingPage />} />
          {/* Store pages */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:category" element={<CategoryProductsPage />} />
          {/* Any unknown URL goes back to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
