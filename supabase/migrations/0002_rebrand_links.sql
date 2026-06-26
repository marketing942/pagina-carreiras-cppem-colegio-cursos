-- ==============================================================
-- 0002 — Ajuste de links sociais (Linktree por marca) e limpeza
-- Idempotente. Só é necessário se você já rodou uma versão antiga
-- da 0001_init.sql. Em instalações novas, a 0001 já cria tudo.
-- ==============================================================

-- Novos campos: um Linktree por marca
alter table public.site_settings
  add column if not exists linktree_cppem_url   text,
  add column if not exists linktree_colegio_url text,
  add column if not exists linktree_unicive_url text;

-- Remove campos não utilizados (formulário incorporado e redes antigas)
alter table public.site_settings
  drop column if exists form_embed_url,
  drop column if exists show_form_embed,
  drop column if exists instagram_url,
  drop column if exists youtube_url,
  drop column if exists tiktok_url,
  drop column if exists whatsapp_url;
