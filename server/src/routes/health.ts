/**
 * Health check route
 */

import { Router } from "express";
import { getHealth } from "../controllers/health.js";

const router = Router();

router.get("/health", getHealth);

export { router as healthRoutes };
