/**
 * Product catalog (static data).
 *
 * Purpose:
 * - For this course project we keep products in a simple in-memory array.
 * - In a real app, this would usually come from an API.
 */

import type { Product } from "../features/cart/cartSlice";
import gameThumb from "../assets/game-thumb.svg";

export const products: Product[] = [
  {
    id: "game-elden",
    name: "Elden Ring",
    price: 59.99,
    category: "RPG",
    image: gameThumb,
  },
  {
    id: "game-baldurs-gate-3",
    name: "Baldur's Gate 3",
    price: 59.99,
    category: "RPG",
    image: gameThumb,
  },
  {
    id: "game-hades",
    name: "Hades",
    price: 24.99,
    category: "Indie",
    image: gameThumb,
  },
  {
    id: "game-stardew",
    name: "Stardew Valley",
    price: 14.99,
    category: "Indie",
    image: gameThumb,
  },
  {
    id: "game-doom-eternal",
    name: "DOOM Eternal",
    price: 39.99,
    category: "Action",
    image: gameThumb,
  },
  {
    id: "game-hollow-knight",
    name: "Hollow Knight",
    price: 14.99,
    category: "Action",
    image: gameThumb,
  },
];

// Used by the Products page to group items into sections.
export const categories = Array.from(new Set(products.map((p) => p.category)));
