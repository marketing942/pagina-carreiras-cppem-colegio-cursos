import { track } from "@vercel/analytics";

/**
 * Registra um evento (ex.: clique em "Candidatar-se") no Vercel Analytics.
 * Nunca quebra a página: se o Analytics não estiver ativo, não faz nada.
 */
export function trackEvent(name: string, props?: Record<string, string | number | boolean>) {
  try {
    track(name, props);
  } catch {
    // sem Analytics: ignora
  }
}
