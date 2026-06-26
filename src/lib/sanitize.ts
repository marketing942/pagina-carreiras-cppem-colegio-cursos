/**
 * Sanitização leve de HTML autorado no painel (conteúdo de admins
 * autenticados). Remove scripts, estilos, handlers de evento e URLs
 * perigosas antes de renderizar com dangerouslySetInnerHTML.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return "";
  return (
    html
      // remove <script>...</script> e <style>...</style>
      .replace(/<\/?(script|style|iframe|object|embed)[^>]*>/gi, "")
      // remove atributos de evento (onclick, onerror, etc.)
      .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      // remove javascript: em href/src
      .replace(/(href|src)\s*=\s*("|')\s*javascript:[^"']*\2/gi, '$1="#"')
  );
}

/** Heurística simples: o conteúdo parece HTML formatado? */
export function looksLikeHtml(content: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(content);
}
