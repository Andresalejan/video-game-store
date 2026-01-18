/**
 * Platforms controller
 */

import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export async function getAllPlatforms(_req: Request, res: Response): Promise<void> {
  try {
    const platforms = await prisma.platform.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
      },
    });

    res.json(platforms);
  } catch (error) {
    console.error("Error fetching platforms:", error);
    res.status(500).json({ error: "Failed to fetch platforms" });
  }
}
