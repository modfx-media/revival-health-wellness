import type { Config } from "tailwindcss";

/**
 * Tailwind v4 reads its theme from `@theme` in app/globals.css. This config is
 * wired in via the `@config` directive at the top of globals.css and adds the
 * design-system colors, editorial fonts, and the cinematic keyframe animations
 * used across Revival Health & Wellness.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C9A96E",
          light: "#E8D5B0",
        },
        dark: "#0F0F0F",
        charcoal: "#1E1E1E",
        cream: "#FAF8F5",
        "warm-white": "#F7F2EA",
        // Backwards-compatible palette used by existing components.
        revival: {
          gold: "#C9A96E",
          "gold-light": "#E8D5B0",
          dark: "#0F0F0F",
          charcoal: "#1E1E1E",
          cream: "#FAF8F5",
          "warm-white": "#F7F2EA",
        },
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        "heading-sc": ["var(--font-inter)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tagline: "0.3em",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.8s ease-out both",
        "slide-in-left": "slide-in-left 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "scale-in": "scale-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        shimmer: "shimmer 2.5s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
