/**
 * Resolve a public asset path against Vite's BASE_URL so the app works both at
 * the domain root (local dev / Figma) and under a GitHub Pages sub-path.
 *   asset("/images/x.webp") -> "/images/x.webp"            (base "/")
 *   asset("/images/x.webp") -> "/muchachitoroundtrip_after/images/x.webp"
 */
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
