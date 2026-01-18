# GameStore - Full-Stack Video Game Store

A modern video game store application built with React (frontend) and Node.js/Express/Prisma/PostgreSQL (backend).

## 🎮 Features

- Browse video games by category and platform
- View detailed game information with platform-specific pricing
- Shopping cart with platform selection
- Responsive cyberpunk-themed UI

## 🏗️ Architecture (Monorepo)

```
GameStore/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── api/            # API client
│   │   ├── app/            # Redux store
│   │   ├── components/     # Reusable components
│   │   ├── features/       # Redux slices
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   └── data/           # Static product data (for seeding)
│   ├── public/
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── routes/         # API routes
│   │   └── lib/            # Utilities
│   ├── prisma/             # Database schema & migrations
│   └── package.json
├── package.json            # Root workspaces config
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker (for PostgreSQL)

### One-Command Setup

```bash
npm run setup
```

This will:
1. Install all dependencies (client + server)
2. Start PostgreSQL in Docker
3. Generate Prisma client
4. Run database migrations
5. Seed the database with products

### Start Development Servers

```bash
# Start both frontend and backend
npm run dev:all

# Or separately:
npm run dev:server   # Backend at http://localhost:3001
npm run dev          # Frontend at http://localhost:5173
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/categories` | List all categories |
| GET | `/api/platforms` | List all platforms |
| GET | `/api/products` | List products (with filters) |
| GET | `/api/products/:code` | Get product by code |

### Query Parameters for `/api/products`

- `category`: Filter by category name (e.g., `?category=RPG`)
- `platform`: Filter by platform (e.g., `?platform=PS5`)
- `q`: Search in name/description (e.g., `?q=fantasy`)

## 🛠️ Available Scripts (Root)

| Script | Description |
|--------|-------------|
| `npm run setup` | Full project setup (install, DB, migrate, seed) |
| `npm run dev` | Start frontend dev server |
| `npm run dev:server` | Start backend dev server |
| `npm run dev:all` | Start both servers concurrently |
| `npm run build` | Build frontend for production |
| `npm run db:up` | Start PostgreSQL container |
| `npm run db:down` | Stop PostgreSQL container |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed database with products |
| `npm run db:studio` | Open Prisma Studio (DB GUI) |

## 🔧 Environment Variables

### Frontend (`client/.env`)

```env
VITE_API_URL=http://localhost:3001/api
```

### Backend (`server/.env`)

```env
DATABASE_URL="postgresql://gamestore:gamestore@localhost:5432/gamestore?schema=public"
PORT=3001
FRONTEND_ORIGIN="http://localhost:5173"
NODE_ENV="development"
```

## 📦 Tech Stack

### Frontend (client/)
- React 19
- Redux Toolkit
- React Router
- Tailwind CSS
- Vite

### Backend (server/)
- Node.js
- Express 5
- Prisma ORM
- PostgreSQL

## 📚 More Documentation

- [Backend README](./server/README.md) - Detailed backend setup and API documentation

---

## Original Vite Template Info

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
