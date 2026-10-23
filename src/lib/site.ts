/**
 * Endereço público do site. Usado em links absolutos: sitemap, imagens de
 * compartilhamento (Open Graph), dados estruturados de vaga e canonical.
 *
 * Ordem: NEXT_PUBLIC_SITE_URL (domínio próprio, quando houver) → domínio de
 * produção que a Vercel informa sozinha → endereço atual como último recurso.
 */
export const SITE_NAME = "CPPEM Colégio e Cursos";

const FALLBACK_SITE_URL = "https://vagas-trabalho-grupo-cppem.vercel.app";

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const url = explicit || (vercel ? `https://${vercel}` : FALLBACK_SITE_URL);
  return url.replace(/\/+$/, "");
}
