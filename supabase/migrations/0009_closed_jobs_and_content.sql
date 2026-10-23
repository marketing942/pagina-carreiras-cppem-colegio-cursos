-- ==============================================================
-- 0009 — Vaga encerrada pública, textos editáveis e e-mail de privacidade
-- Idempotente (pode rodar mais de uma vez).
-- ==============================================================

-- 1) Quem abre um link antigo de uma vaga ENCERRADA passa a ver a página
--    "vaga encerrada" (com outras vagas abertas) em vez de um erro 404.
--    Rascunhos e vagas pausadas continuam privados (só o admin vê).
drop policy if exists "public read open jobs" on public.jobs;
drop policy if exists "public read open and closed jobs" on public.jobs;
create policy "public read open and closed jobs"
  on public.jobs for select
  using (status in ('aberta', 'encerrada'));

-- 2) Textos editáveis das seções da página pública (Admin > Configurações).
--    Vazio (null) = a página usa o texto padrão.
alter table public.site_settings
  add column if not exists privacy_email  text,
  add column if not exists why_items      jsonb,
  add column if not exists process_steps  jsonb,
  add column if not exists faq_items      jsonb;
