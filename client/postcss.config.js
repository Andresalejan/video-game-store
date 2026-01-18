/**
 * PostCSS config.
 *
 * Purpose:
 * - Runs Tailwind as a PostCSS plugin during builds.
 * - Runs Autoprefixer to add vendor prefixes when needed.
 */

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
