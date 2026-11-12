/**
 * Vishal Apple Store design tokens.
 *
 * The source of truth for colours is the CSS variable set in
 * src/app/globals.css (light on :root, dark on html.dark), exposed to
 * Tailwind as semantic names in tailwind.config.ts:
 *
 *   canvas · surface · subtle · tile       backgrounds
 *   ink · ink-2 · ink-3                    text (primary → caption)
 *   line · line-strong                     borders
 *   gold (fill) · gold-ink (text)          the one accent, used sparingly
 *   night · night-2 · night-ink(-2)        dark feature sections + footer
 *   ok · warn · bad                        stock / validation states
 *
 * Type scale (Tailwind fontSize): hero, title, subtitle, lead, base,
 * small, caption, eyebrow. Radii: control, tile, card. Shadows: card, pop.
 * Layout helpers (globals.css): .wrap (page grid), .section (rhythm).
 *
 * This file holds the few raw values that JS needs (meta theme-color).
 */
export const themeColors = {
  light: '#F6F4F0',
  dark: '#0F0E0D',
  gold: '#C9A24A',
} as const;

export { formatINR } from './utils';
