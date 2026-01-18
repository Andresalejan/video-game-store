# GameStore API Server

Backend API for the GameStore application, built with Express.js, Prisma ORM, and PostgreSQL.

## Prerequisites

- Node.js 18+
- Docker (for PostgreSQL) or a PostgreSQL 15+ instance
- npm or pnpm

## Quick Start

### 1. Start PostgreSQL with Docker

```bash
cd server
docker-compose up -d
```

This will start a PostgreSQL container with:
- **User**: gamestore
- **Password**: gamestore
- **Database**: gamestore
- **Port**: 5432

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

The `.env` file is already configured for local development. If you need to customize it:

```bash
cp .env.example .env
# Edit .env as needed
```

Default configuration:
```
DATABASE_URL="postgresql://gamestore:gamestore@localhost:5432/gamestore?schema=public"
PORT=3001
FRONTEND_ORIGIN="http://localhost:5173"
NODE_ENV="development"
```

### 4. Generate Prisma Client & Run Migrations

```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate
```

When prompted for a migration name, use something like `init`.

### 5. Seed the Database

This will read products from `../src/data/products.ts` and populate the database:

```bash
npm run prisma:seed
```

### 6. Start the Server

```bash
# Development (with hot reload)
npm run dev

# Production
npm run build
npm start
```

The server will start at `http://localhost:3001`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/categories` | List all categories |
| GET | `/api/platforms` | List all platforms |
| GET | `/api/products` | List products (with optional filters) |
| GET | `/api/products/:code` | Get product by code |

### Query Parameters for `/api/products`

| Parameter | Description | Example |
|-----------|-------------|---------|
| `category` | Filter by category name | `?category=RPG` |
| `platform` | Filter by platform | `?platform=PS5` |
| `q` | Search in name/description | `?q=fantasy` |

### Example Requests

```bash
# Health check
curl http://localhost:3001/api/health

# Get all categories
curl http://localhost:3001/api/categories

# Get all platforms
curl http://localhost:3001/api/platforms

# Get all products
curl http://localhost:3001/api/products

# Get RPG products
curl "http://localhost:3001/api/products?category=RPG"

# Get PS5 products
curl "http://localhost:3001/api/products?platform=PS5"

# Search products
curl "http://localhost:3001/api/products?q=witcher"

# Get single product
curl http://localhost:3001/api/products/game-elden
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build TypeScript for production |
| `npm start` | Start production server |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Run database migrations (dev) |
| `npm run prisma:migrate:prod` | Deploy migrations (production) |
| `npm run prisma:seed` | Seed database with products |
| `npm run prisma:studio` | Open Prisma Studio (database GUI) |

## Database Schema

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  categories │     │   products  │     │  platforms  │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id (uuid)   │◄────│ category_id │     │ id (uuid)   │
│ name        │     │ id (uuid)   │     │ name        │
│ created_at  │     │ code        │     │ created_at  │
│ updated_at  │     │ name        │     │ updated_at  │
└─────────────┘     │ price       │     └──────┬──────┘
                    │ image       │            │
                    │ description │            │
                    │ created_at  │            │
                    │ updated_at  │            │
                    └──────┬──────┘            │
                           │                   │
                           │    ┌──────────────────────────┐
                           │    │ product_platform_prices  │
                           │    ├──────────────────────────┤
                           └────│ product_id               │
                                │ platform_id              │────┘
                                │ price                    │
                                │ created_at               │
                                │ updated_at               │
                                └──────────────────────────┘
```

## CORS Configuration

The server accepts requests from origins specified in `FRONTEND_ORIGIN` environment variable.

For multiple origins (e.g., dev + production):
```
FRONTEND_ORIGIN="http://localhost:5173,https://yourusername.github.io"
```

## Troubleshooting

### Database connection issues

1. Make sure Docker is running: `docker ps`
2. Check if PostgreSQL is up: `docker-compose logs postgres`
3. Verify connection string in `.env`

### Migration issues

```bash
# Reset database and re-run migrations
npx prisma migrate reset

# This will also re-run the seed
```

### View database contents

```bash
npm run prisma:studio
```

This opens a web interface at `http://localhost:5555`.
