import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Identidade visual do CPPEM — azul institucional, vermelho e neutros
        brand: {
          50: "#eef4fb",
          100: "#d8e6f6",
          200: "#b3cdec",
          300: "#7faedf",
          400: "#4a89cf",
          500: "#2a6cb9",
          600: "#1f5499",
          700: "#1b447b",
          800: "#163a66",
          900: "#0e2747",
          950: "#081830",
        },
        accent: {
          50: "#fdeced",
          100: "#fbd5d8",
          200: "#f6abb1",
          300: "#ef7c85",
          400: "#e4505b",
          500: "#d32f3c",
          600: "#b21f2b",
          700: "#911a24",
          800: "#771a22",
          900: "#651b21",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
