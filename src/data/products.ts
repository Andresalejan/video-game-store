/**
 * Product catalog (static data).
 *
 * Purpose:
 * - For this course project we keep products in a simple in-memory array.
 * - In a real app, this would usually come from an API.
 */

import type { Product } from "../features/cart/cartSlice";

export const products: Product[] = [
  // RPG Games
  {
    id: "game-elden",
    name: "Elden Ring",
    price: 59.99,
    category: "RPG",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/aGhopp3MHppi7kooGE2Dtt8C.png",
  },
  {
    id: "game-baldurs-gate-3",
    name: "Baldur's Gate 3",
    price: 59.99,
    category: "RPG",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202302/2321/3098481c9164bb5f33069b37e49fba1a572ea3b89971ee7b.jpg",
  },
  {
    id: "game-witcher-3",
    name: "The Witcher 3",
    price: 39.99,
    category: "RPG",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
  },
  {
    id: "game-skyrim",
    name: "Skyrim Special Edition",
    price: 39.99,
    category: "RPG",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/489830/header.jpg",
  },
  {
    id: "game-divinity-2",
    name: "Divinity: Original Sin 2",
    price: 44.99,
    category: "RPG",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/435150/header.jpg",
  },
  {
    id: "game-final-fantasy-7",
    name: "Final Fantasy VII Remake",
    price: 69.99,
    category: "RPG",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1462040/header.jpg",
  },
  {
    id: "game-cyberpunk",
    name: "Cyberpunk 2077",
    price: 49.99,
    category: "RPG",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/cKZ4tKNFj9C00giTzYtH8PF1.png",
  },
  {
    id: "game-persona-5",
    name: "Persona 5 Royal",
    price: 59.99,
    category: "RPG",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1687950/header.jpg",
  },
  
  // Indie Games
  {
    id: "game-hades",
    name: "Hades",
    price: 24.99,
    category: "Indie",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg",
  },
  {
    id: "game-stardew",
    name: "Stardew Valley",
    price: 14.99,
    category: "Indie",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg",
  },
  {
    id: "game-celeste",
    name: "Celeste",
    price: 19.99,
    category: "Indie",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/504230/header.jpg",
  },
  {
    id: "game-undertale",
    name: "Undertale",
    price: 9.99,
    category: "Indie",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/391540/header.jpg",
  },
  {
    id: "game-dead-cells",
    name: "Dead Cells",
    price: 24.99,
    category: "Indie",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/588650/header.jpg",
  },
  {
    id: "game-cuphead",
    name: "Cuphead",
    price: 19.99,
    category: "Indie",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/268910/header.jpg",
  },
  {
    id: "game-terraria",
    name: "Terraria",
    price: 9.99,
    category: "Indie",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/105600/header.jpg",
  },
  {
    id: "game-ori",
    name: "Ori and the Will of the Wisps",
    price: 29.99,
    category: "Indie",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1057090/header.jpg",
  },
  
  // Action Games
  {
    id: "game-doom-eternal",
    name: "DOOM Eternal",
    price: 39.99,
    category: "Action",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202010/0114/ERNPc4gFqeRDG1tYQIfOKQtM.png",
  },
  {
    id: "game-hollow-knight",
    name: "Hollow Knight",
    price: 14.99,
    category: "Action",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg",
  },
  {
    id: "game-god-of-war",
    name: "God of War",
    price: 49.99,
    category: "Action",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png",
  },
  {
    id: "game-sekiro",
    name: "Sekiro: Shadows Die Twice",
    price: 59.99,
    category: "Action",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg",
  },
  {
    id: "game-devil-may-cry-5",
    name: "Devil May Cry 5",
    price: 29.99,
    category: "Action",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/601150/header.jpg",
  },
  {
    id: "game-spider-man",
    name: "Spider-Man Remastered",
    price: 59.99,
    category: "Action",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/header.jpg",
  },
  {
    id: "game-ghost-of-tsushima",
    name: "Ghost of Tsushima",
    price: 59.99,
    category: "Action",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202010/0222/b3iB2zf2xHj9shC0XDTULxND.png",
  },
  {
    id: "game-resident-evil-4",
    name: "Resident Evil 4 Remake",
    price: 59.99,
    category: "Action",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202210/0706/EVWyZD63pahuh95eKloFaJuC.png",
  },
];

// Used by the Products page to group items into sections.
export const categories = Array.from(new Set(products.map((p) => p.category)));
