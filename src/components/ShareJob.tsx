"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { trackEvent } from "@/lib/analytics";
import Icon from "./Icon";

interface ShareJobProps {
  title: string;
  slug: string;
}

// Valores que só existem no navegador. O servidor devolve "" / false, e o
// navegador troca pelo valor real sem causar diferença na hidratação.
const subscribe = () => () => {};
const getOrigin = () => window.location.origin;
const getServerOrigin = () => "";
const getCanShare = () => typeof navigator.share === "function";
const getServerCanShare = () => false;

/** Botões para compartilhar a vaga: copiar link, WhatsApp e menu do celular (quando existir). */
export default function ShareJob({ title, slug }: ShareJobProps) {
  const origin = useSyncExternalStore(subscribe, getOrigin, getServerOrigin);
  const canNativeShare = useSyncExternalStore(subscribe, getCanShare, getServerCanShare);
  const [status, setStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Sempre o link limpo da vaga (sem filtros nem parâmetros de campanha)
  const link = `${origin}/carreiras/${slug}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(
    `${title} — vaga no CPPEM Colégio e Cursos\n${link}`
  )}`;

  function say(message: string) {
    setStatus(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 2500);
  }

  async function copy() {
    trackEvent("compartilhar_vaga", { vaga: slug, canal: "copiar" });
    try {
      await navigator.clipboard.writeText(link);
      say("Link copiado!");
    } catch {
      window.prompt("Copie o link da vaga:", link);
    }
  }

  async function nativeShare() {
    trackEvent("compartilhar_vaga", { vaga: slug, canal: "menu" });
    try {
      await navigator.share({ title, url: link });
    } catch {
      // a pessoa fechou o menu de compartilhar
    }
  }

  const btn =
    "inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60";

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2.5" role="group" aria-label="Compartilhar esta vaga">
      <span className="text-sm font-medium text-brand-100">Compartilhar:</span>
      <button type="button" onClick={copy} className={btn}>
        <Icon name="check" className="h-4 w-4" /> Copiar link
      </button>
      <a
        href={whatsappHref}
        onClick={() => trackEvent("compartilhar_vaga", { vaga: slug, canal: "whatsapp" })}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
      >
        <Icon name="chat" className="h-4 w-4" /> WhatsApp
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
      {canNativeShare && (
        <button type="button" onClick={nativeShare} className={btn}>
          <Icon name="arrow" className="h-4 w-4 -rotate-45" /> Mais opções
        </button>
      )}
      <span role="status" aria-live="polite" className="text-sm font-semibold text-accent-200">
        {status}
      </span>
    </div>
  );
}
