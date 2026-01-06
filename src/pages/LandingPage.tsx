/**
 * Landing page.
 *
 * Requirements it satisfies:
 * - Background image
 * - Company name + short paragraph
 * - "Get Started" button linking to product listing page
 */

import { Link } from "react-router-dom";
import landingBg from "../assets/landing-bg.svg";

export function LandingPage() {
  return (
    <div
      className="min-h-full bg-slate-950 bg-cover bg-center"
      style={{ backgroundImage: `url(${landingBg})` }}
    >
      <div className="min-h-full bg-slate-950/70">
        <div className="mx-auto flex min-h-full max-w-5xl flex-col justify-center px-4 py-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Pixel Paradise
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200">
            We curate great games you can jump into fast — from big-budget action
            to cozy indie gems. Browse by genre, add titles to your cart, and
            adjust quantities before checkout.
          </p>
          <div className="mt-8">
            <Link
              to="/products"
              className="inline-flex items-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
