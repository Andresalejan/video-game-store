/**
 * Vite config.
 *
 * Purpose:
 * - Enables the React plugin (Fast Refresh, JSX/TSX support).
 * - We keep it minimal for this course project.
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
