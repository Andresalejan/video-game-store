/**
 * Tailwind config.
 *
 * Purpose:
 * - Tells Tailwind where to scan for class names (content paths).
 * - Allows theme customization later (extend).
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

