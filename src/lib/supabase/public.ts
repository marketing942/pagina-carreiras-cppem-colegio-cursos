import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase para leitura PÚBLICA no servidor (páginas, sitemap,
 * imagens de compartilhamento). Não usa cookies nem sessão: só enxerga o que
 * a política de segurança (RLS) libera para visitantes anônimos.
 *
 * Por não depender de cookies, as páginas públicas podem ser cacheadas.
 */
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

export const HAS_SUPABASE =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
