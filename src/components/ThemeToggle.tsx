"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

const KEY = "cppem_theme";

/**
 * Botão do "solzinho": alterna entre o visual claro e o escuro.
 * A escolha fica salva no navegador; na primeira visita segue o tema do aparelho.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    setTheme(next);
  }

  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? "Mudar para o tema claro" : "Mudar para o tema escuro"}
      title={dark ? "Tema claro" : "Tema escuro"}
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line2 bg-surface text-goldink transition-all hover:-translate-y-0.5 hover:bg-canvas2 focus:outline-none focus:ring-2 focus:ring-accent-300 ${
        dark ? "shadow-gold" : ""
      }`}
    >
      <Icon name="sun" className="h-5 w-5" fill={dark ? "currentColor" : "none"} />
    </button>
  );
}
