import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#C9A24A",
          "gold-light": "#DFC278",
          "gold-dark": "#A88334",
          black: "#0A0A0A",
          charcoal: "#121214",
          surface: "#18181B",
          hairline: "rgba(255, 255, 255, 0.08)",
          "hairline-light": "rgba(0, 0, 0, 0.08)",
          muted: "#86868B",
          soft: "#A1A1A6",
          offwhite: "#F5F5F7",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        "gold-glow": "0 0 25px rgba(201, 162, 74, 0.18)",
        "subtle": "0 10px 30px -10px rgba(0, 0, 0, 0.05)",
        "elevated": "0 20px 40px -15px rgba(0, 0, 0, 0.12)",
        "dark-elevated": "0 20px 40px -15px rgba(0, 0, 0, 0.6)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
