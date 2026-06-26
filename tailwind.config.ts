import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Identidade unificada CPPEM Colégio e Cursos
        // Base: azul-marinho (navy) do Colégio — sóbrio e institucional
        brand: {
          50: "#f3f5fa",
          100: "#e3e9f3",
          200: "#c3d0e6",
          300: "#94a8d0",
          400: "#5f79b0",
          500: "#1e2f5e",
          600: "#162247",
          700: "#0d1b3e",
          800: "#0b1734",
          900: "#070f24",
          950: "#040a18",
        },
        // Acento: verde CPPEM — cor de ação (botões, destaques)
        accent: {
          50: "#e7fdef",
          100: "#c5fadb",
          200: "#8df5b6",
          300: "#4dec8b",
          400: "#16e85c",
          500: "#00e63c",
          600: "#00b332",
          700: "#00803d",
          800: "#0a5e30",
          900: "#0c4d2a",
          950: "#022912",
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
