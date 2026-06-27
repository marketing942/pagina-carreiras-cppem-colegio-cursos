-- ==============================================================
-- 0007 — Vaga em destaque
-- Adiciona a coluna featured (vagas destacadas aparecem primeiro).
-- Idempotente.
-- ==============================================================

alter table public.jobs
  add column if not exists featured boolean not null default false;

create index if not exists jobs_featured_idx on public.jobs (featured);
