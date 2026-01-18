/**
 * Health check controller
 */

import type { Request, Response } from "express";

export function getHealth(_req: Request, res: Response): void {
  res.json({ ok: true, timestamp: new Date().toISOString() });
}
