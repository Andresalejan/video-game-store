/**
 * GameStore API Server
 * 
 * Express server with Prisma ORM connected to PostgreSQL.
 * Provides REST API endpoints for the game store.
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { healthRoutes } from "./routes/health.js";
import { categoriesRoutes } from "./routes/categories.js";
import { platformsRoutes } from "./routes/platforms.js";
import { productsRoutes } from "./routes/products.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Parse allowed origins from environment
const allowedOrigins = process.env.FRONTEND_ORIGIN?.split(",").map((o) => o.trim()) || [
  "http://localhost:5173",
];

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`Blocked CORS request from: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// Request logging middleware (development only)
if (process.env.NODE_ENV !== "production") {
  app.use((req, _res, next) => {
    console.log(`${new Date().toISOString()} | ${req.method} ${req.path}`);
    next();
  });
}

// API Routes
app.use("/api", healthRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/platforms", platformsRoutes);
app.use("/api/products", productsRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 GameStore API Server`);
  console.log(`   - Port: ${PORT}`);
  console.log(`   - Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`   - Allowed origins: ${allowedOrigins.join(", ")}`);
  console.log(`\n📡 Endpoints:`);
  console.log(`   - GET /api/health`);
  console.log(`   - GET /api/categories`);
  console.log(`   - GET /api/platforms`);
  console.log(`   - GET /api/products`);
  console.log(`   - GET /api/products/:code\n`);
});
