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
        // Acento: dourado — cor compartilhada pelas duas marcas
        accent: {
          50: "#fbf7e9",
          100: "#f6edc8",
          200: "#efdc92",
          300: "#e8c350",
          400: "#d4ad33",
          500: "#c9a227",
          600: "#a07b10",
          700: "#856411",
          800: "#6d5115",
          900: "#5d4516",
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
