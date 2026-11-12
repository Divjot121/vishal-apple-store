import type { Config } from 'tailwindcss';

/**
 * All colours resolve to CSS variables defined in src/app/globals.css
 * (light values on :root, dark values on html.dark). Components should only
 * use these semantic names — never raw hex values.
 */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: token('canvas'), // page background
        surface: token('surface'), // cards, panels
        subtle: token('subtle'), // inputs, chips, quiet fills
        tile: token('tile'), // product image tiles
        ink: {
          DEFAULT: token('ink'), // headings, primary text
          2: token('ink-2'), // body copy
          3: token('ink-3'), // captions, meta
        },
        line: {
          DEFAULT: token('line'),
          strong: token('line-strong'),
        },
        gold: {
          DEFAULT: token('gold'), // fills only (buttons, rules)
          ink: token('gold-ink'), // gold text that passes AA on canvas
        },
        night: {
          DEFAULT: token('night'), // dark feature sections + footer
          2: token('night-2'),
          ink: token('night-ink'),
          'ink-2': token('night-ink-2'),
          line: token('night-line'),
        },
        ok: token('ok'),
        warn: token('warn'),
        bad: token('bad'),
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Type scale: hero → title → subtitle → lead → base → small → caption
        hero: ['clamp(2.25rem, 1.55rem + 3vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '600' }],
        title: ['clamp(1.75rem, 1.45rem + 1.3vw, 2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.025em', fontWeight: '600' }],
        subtitle: ['1.25rem', { lineHeight: '1.35', letterSpacing: '-0.015em', fontWeight: '600' }],
        lead: ['1.125rem', { lineHeight: '1.6' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
        caption: ['0.8125rem', { lineHeight: '1.4' }],
        eyebrow: ['0.75rem', { lineHeight: '1.3', letterSpacing: '0.08em', fontWeight: '600' }],
      },
      maxWidth: {
        page: '76rem',
        prose: '38rem', // ~65 characters at body size
      },
      borderRadius: {
        control: '0.625rem',
        tile: '0.875rem',
        card: '1.125rem',
      },
      boxShadow: {
        card: '0 1px 2px rgb(0 0 0 / 0.04), 0 10px 28px -16px rgb(0 0 0 / 0.18)',
        pop: '0 24px 60px -20px rgb(0 0 0 / 0.45)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
