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
    description:
      "A vast open-world action RPG where exploration, tense combat, and discovery intertwine. Create your build, face legendary bosses, and uncover secrets across a mysterious, ruined realm.",
  },
  {
    id: "game-baldurs-gate-3",
    name: "Baldur's Gate 3",
    price: 59.99,
    category: "RPG",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202302/2321/3098481c9164bb5f33069b37e49fba1a572ea3b89971ee7b.jpg",
    description:
      "A story-rich party RPG driven by choice and consequence. Gather allies, master turn-based tactics, and shape the fate of your adventure with every dialogue and decision.",
  },
  {
    id: "game-witcher-3",
    name: "The Witcher 3",
    price: 39.99,
    category: "RPG",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
    description:
      "A sprawling fantasy journey as a monster hunter for hire. Track contracts, navigate politics, and follow a personal story through richly detailed regions full of side quests.",
  },
  {
    id: "game-skyrim",
    name: "Skyrim Special Edition",
    price: 39.99,
    category: "RPG",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/489830/header.jpg",
    description:
      "An open-world epic where you forge your own path. Explore ancient ruins, learn powerful shouts, and develop your character through quests, crafting, and combat.",
  },
  {
    id: "game-divinity-2",
    name: "Divinity: Original Sin 2",
    price: 44.99,
    category: "RPG",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/435150/header.jpg",
    description:
      "A tactical RPG built around creative interactions and clever combos. Build a party, experiment with elemental effects, and approach battles with freedom and strategy.",
  },
  {
    id: "game-final-fantasy-7",
    name: "Final Fantasy VII Remake",
    price: 69.99,
    category: "RPG",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1462040/header.jpg",
    description:
      "A modern reimagining of a classic story with cinematic action combat. Follow a band of rebels as they confront a powerful corporation and uncover deeper mysteries.",
  },
  {
    id: "game-cyberpunk",
    name: "Cyberpunk 2077",
    price: 49.99,
    category: "RPG",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/cKZ4tKNFj9C00giTzYtH8PF1.png",
    description:
      "A futuristic RPG set in a neon-drenched metropolis. Customize your character, choose your playstyle, and take on missions that shift your reputation and relationships.",
  },
  {
    id: "game-persona-5",
    name: "Persona 5 Royal",
    price: 59.99,
    category: "RPG",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1687950/header.jpg",
    description:
      "A stylish RPG blending dungeon crawling with daily life management. Build friendships, plan your schedule, and fight through surreal palaces to change corrupted hearts.",
  },
  
  // Indie Games
  {
    id: "game-hades",
    name: "Hades",
    price: 24.99,
    category: "Indie",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg",
    description:
      "A fast-paced roguelike where each escape attempt makes you stronger. Mix weapons and upgrades, meet memorable characters, and uncover story beats between runs.",
  },
  {
    id: "game-stardew",
    name: "Stardew Valley",
    price: 14.99,
    category: "Indie",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg",
    description:
      "A cozy farming and life sim with relaxing progression. Grow crops, raise animals, explore mines, and build relationships in a charming small town.",
  },
  {
    id: "game-celeste",
    name: "Celeste",
    price: 19.99,
    category: "Indie",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/504230/header.jpg",
    description:
      "A tight platformer focused on precise movement and perseverance. Climb a mountain through challenging levels, with an uplifting story about resilience.",
  },
  {
    id: "game-undertale",
    name: "Undertale",
    price: 9.99,
    category: "Indie",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/391540/header.jpg",
    description:
      "A quirky RPG where choices truly matter. Fight, talk, or spare your way through encounters and experience wildly different outcomes based on your approach.",
  },
  {
    id: "game-dead-cells",
    name: "Dead Cells",
    price: 24.99,
    category: "Indie",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/588650/header.jpg",
    description:
      "A kinetic action platformer with roguelike progression. Chain attacks, try new builds, and push deeper into a shifting labyrinth packed with tough enemies.",
  },
  {
    id: "game-cuphead",
    name: "Cuphead",
    price: 19.99,
    category: "Indie",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/268910/header.jpg",
    description:
      "A run-and-gun classic with hand-drawn animation and demanding boss fights. Learn patterns, time your dodges, and enjoy a jazzy retro cartoon vibe.",
  },
  {
    id: "game-terraria",
    name: "Terraria",
    price: 9.99,
    category: "Indie",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/105600/header.jpg",
    description:
      "A sandbox adventure where you mine, craft, and battle. Dig deep for rare materials, build elaborate bases, and face escalating bosses in a living world.",
  },
  {
    id: "game-ori",
    name: "Ori and the Will of the Wisps",
    price: 29.99,
    category: "Indie",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1057090/header.jpg",
    description:
      "A beautiful action-platformer with fluid movement and emotional storytelling. Explore connected biomes, unlock abilities, and overcome challenging set pieces.",
  },
  
  // Action Games
  {
    id: "game-doom-eternal",
    name: "DOOM Eternal",
    price: 39.99,
    category: "Action",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202010/0114/ERNPc4gFqeRDG1tYQIfOKQtM.png",
    description:
      "An intense, high-speed shooter built around aggressive combat flow. Swap weapons constantly, manage resources, and tear through arenas packed with demons.",
  },
  {
    id: "game-hollow-knight",
    name: "Hollow Knight",
    price: 14.99,
    category: "Action",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg",
    description:
      "A moody action-adventure set in a vast underground kingdom. Explore interconnected areas, master tight combat, and uncover lore hidden in quiet corners.",
  },
  {
    id: "game-god-of-war",
    name: "God of War",
    price: 49.99,
    category: "Action",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png",
    description:
      "A cinematic action journey through mythic realms. Experience visceral combat, discover secrets, and follow a powerful story about family and redemption.",
  },
  {
    id: "game-sekiro",
    name: "Sekiro: Shadows Die Twice",
    price: 59.99,
    category: "Action",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg",
    description:
      "A precision-focused action game centered on timing and parries. Study enemy moves, break defenses, and win duels through mastery rather than grinding.",
  },
  {
    id: "game-devil-may-cry-5",
    name: "Devil May Cry 5",
    price: 29.99,
    category: "Action",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/601150/header.jpg",
    description:
      "A stylish hack-and-slash built for flashy combos. Switch characters, experiment with weapons, and chase higher ranks with expressive, momentum-driven combat.",
  },
  {
    id: "game-spider-man",
    name: "Spider-Man Remastered",
    price: 59.99,
    category: "Action",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/header.jpg",
    description:
      "Swing through a vibrant city and fight crime with acrobatic flair. Combine gadgets and web abilities, complete missions, and follow a superhero story.",
  },
  {
    id: "game-ghost-of-tsushima",
    name: "Ghost of Tsushima",
    price: 59.99,
    category: "Action",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202010/0222/b3iB2zf2xHj9shC0XDTULxND.png",
    description:
      "A samurai action adventure across sweeping landscapes. Choose stealth or honorable duels, refine your stance-based combat, and explore side tales.",
  },
  {
    id: "game-resident-evil-4",
    name: "Resident Evil 4 Remake",
    price: 59.99,
    category: "Action",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202210/0706/EVWyZD63pahuh95eKloFaJuC.png",
    description:
      "A tense survival-action experience with modernized pacing and atmosphere. Manage resources, face relentless threats, and push forward through hostile territory.",
  },
];

// Used by the Products page to group items into sections.
export const categories = Array.from(new Set(products.map((p) => p.category)));
