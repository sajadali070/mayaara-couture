import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: "#fbf2f4",
          100: "#f7e3e7",
          200: "#f0cbd3",
          300: "#e4a7b3",
          400: "#d3758b",
          500: "#bd4a66",
          600: "#a3364f",
          700: "#872439",
          800: "#6B1E2E", // Primary Brand Maroon
          900: "#4A121E",
          950: "#2d0810",
        },
        gold: {
          50: "#faf8f2",
          100: "#f4f0e0",
          200: "#eae0c1",
          300: "#dcce9d",
          400: "#d8b76e",
          500: "#C9A24B", // Warm Brand Gold
          600: "#B38E3B",
          700: "#8f6e2b",
          800: "#745727",
          900: "#604724",
        },
        ivory: {
          50: "#FAF7F2", // Core Page Background
          100: "#F3EFE6",
          200: "#EAE3D2",
          300: "#DDD2BC",
          400: "#CAB99C",
          500: "#B7A07E",
        },
        charcoal: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#222222", // Primary Text Charcoal
          900: "#171717",
          950: "#0d0d0d",
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(0, 0, 0, 0.03)",
        card: "0 10px 30px -10px rgba(107, 30, 46, 0.08)",
        "card-hover": "0 20px 40px -15px rgba(107, 30, 46, 0.16)",
        gold: "0 8px 25px -5px rgba(201, 162, 75, 0.25)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "pulse-subtle": "pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.03)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
