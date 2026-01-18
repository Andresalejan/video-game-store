/**
 * Platforms routes
 */

import { Router } from "express";
import { getAllPlatforms } from "../controllers/platforms.js";

const router = Router();

router.get("/", getAllPlatforms);

export { router as platformsRoutes };
