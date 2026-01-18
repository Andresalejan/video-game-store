/**
 * Products routes
 */

import { Router } from "express";
import { getAllProducts, getProductByCode } from "../controllers/products.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:code", getProductByCode);

export { router as productsRoutes };
