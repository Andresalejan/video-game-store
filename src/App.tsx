/**
 * App router.
 *
 * Purpose:
 * - Defines the 3 required pages (Landing, Products, Cart).
 * - Keeps page navigation as URL routes.
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
} from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { ProductsPage } from "./pages/ProductsPage";
import { CartPage } from "./pages/CartPage";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* Landing */}
          <Route path="/" element={<LandingPage />} />
          {/* Store pages */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          {/* Any unknown URL goes back to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
