-- ==============================================================
-- 0008 — Setores e Unidades configuráveis no admin
-- Adiciona as listas editáveis em site_settings.
-- Idempotente.
-- ==============================================================

alter table public.site_settings
  add column if not exists departments text[],
  add column if not exists units       text[];

-- Preenche com os valores padrão caso estejam vazios
update public.site_settings
set
  departments = coalesce(
    departments,
    array['Marketing','Comercial','Tecnologia','Pedagógico','Serviços Gerais','Administrativo','Financeiro']
  ),
  units = coalesce(
    units,
    array['CPPEM Concursos','Colégio CPPEM','Unicive Caruaru']
  );
