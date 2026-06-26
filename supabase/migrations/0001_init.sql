-- ==============================================================
-- CPPEM Carreiras — Schema inicial
-- Execute este arquivo no SQL Editor do Supabase
-- (Dashboard > SQL Editor > New query > cole e RUN)
-- ==============================================================

-- Extensão para gerar UUIDs
create extension if not exists "pgcrypto";

-- --------------------------------------------------------------
-- Tabela: jobs (vagas)
-- --------------------------------------------------------------
create table if not exists public.jobs (
  id                uuid primary key default gen_random_uuid(),
  title             text not null,
  slug              text not null unique,
  -- 'trabalho' ou 'professor'
  category          text not null default 'trabalho',
  -- Setor (vagas de trabalho): Marketing, Comercial, Tecnologia, etc.
  department        text,
  -- Disciplina / categoria do professor (Polivalente, de Disciplina, etc.)
  discipline        text,
  -- Segmento (ex.: Fundamental, Médio, Concursos)
  segment           text,
  -- 'presencial', 'hibrido', 'home_office'
  work_type         text,
  -- Unidade: CPPEM Concursos, Colégio CPPEM, Unicive Caruaru
  unit              text,
  location          text not null default 'Caruaru-PE',
  expected_schedule text,
  -- 'aberta', 'encerrada', 'pausada', 'rascunho'
  status            text not null default 'rascunho',
  short_description text,
  description       text,
  responsibilities  text,
  requirements      text,
  differentials     text,
  benefits          text,
  -- Link de candidatura específico da vaga (opcional; usa form_url se vazio)
  apply_url         text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists jobs_status_idx     on public.jobs (status);
create index if not exists jobs_category_idx   on public.jobs (category);
create index if not exists jobs_department_idx on public.jobs (department);

-- --------------------------------------------------------------
-- Tabela: site_settings (configurações do site — linha única)
-- --------------------------------------------------------------
create table if not exists public.site_settings (
  id                uuid primary key default gen_random_uuid(),
  company_name      text default 'CPPEM Colégio e Cursos',
  about_text        text,
  -- Indicadores institucionais (editáveis)
  stat_years        text default '+7 anos de história',
  stat_students     text default '+14.000 alunos aprovados',
  stat_team         text default '+50 colaboradores e professores',
  stat_extra        text default 'Educação, disciplina e transformação de vidas',
  -- Formulário de candidatura (Notion) — usado nos botões "Candidatar-se"
  form_url          text default 'https://cppem.notion.site/2e5bbae8074c80a4b7ddf45a8fb28f97?pvs=105',
  -- Redes sociais: um Linktree por marca (reúne todas as redes) + LinkedIn único
  linktree_cppem_url   text,
  linktree_colegio_url text,
  linktree_unicive_url text,
  linkedin_url      text,
  -- Grupo de WhatsApp para anúncios de vagas
  whatsapp_group_url text default 'https://chat.whatsapp.com/JKlwbSeG38ECLh5UJSRGl3?mode=gi_t',
  address           text default 'Praça Presidente Getúlio Vargas, 1119 – Caruaru, Pernambuco, Prédio de 5 andares',
  cnpj              text default '57.347.872/0001-48',
  maps_url          text default 'https://links.cppem.com.br/localiza%C3%A7%C3%A3o-maps',
  footer_description text default 'Há mais de 7 anos transformando vidas por meio da educação.',
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- --------------------------------------------------------------
-- Trigger: atualiza updated_at automaticamente
-- --------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists jobs_set_updated_at on public.jobs;
create trigger jobs_set_updated_at
  before update on public.jobs
  for each row execute function public.set_updated_at();

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- --------------------------------------------------------------
-- Row Level Security (RLS)
-- --------------------------------------------------------------
alter table public.jobs          enable row level security;
alter table public.site_settings enable row level security;

-- JOBS: público lê apenas vagas com status 'aberta'
drop policy if exists "public read open jobs" on public.jobs;
create policy "public read open jobs"
  on public.jobs for select
  using (status = 'aberta');

-- JOBS: usuários autenticados podem ler TODAS as vagas (admin)
drop policy if exists "authenticated read all jobs" on public.jobs;
create policy "authenticated read all jobs"
  on public.jobs for select
  to authenticated
  using (true);

-- JOBS: apenas autenticados criam/editam/excluem
drop policy if exists "authenticated insert jobs" on public.jobs;
create policy "authenticated insert jobs"
  on public.jobs for insert
  to authenticated
  with check (true);

drop policy if exists "authenticated update jobs" on public.jobs;
create policy "authenticated update jobs"
  on public.jobs for update
  to authenticated
  using (true) with check (true);

drop policy if exists "authenticated delete jobs" on public.jobs;
create policy "authenticated delete jobs"
  on public.jobs for delete
  to authenticated
  using (true);

-- SITE_SETTINGS: todos podem ler (página pública)
drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings"
  on public.site_settings for select
  using (true);

-- SITE_SETTINGS: apenas autenticados editam
drop policy if exists "authenticated update settings" on public.site_settings;
create policy "authenticated update settings"
  on public.site_settings for update
  to authenticated
  using (true) with check (true);

drop policy if exists "authenticated insert settings" on public.site_settings;
create policy "authenticated insert settings"
  on public.site_settings for insert
  to authenticated
  with check (true);

-- --------------------------------------------------------------
-- Seed: linha única de configurações
-- (As vagas reais são inseridas na migration 0004_seed_jobs.sql)
-- --------------------------------------------------------------
insert into public.site_settings (about_text)
select
  'Há mais de 7 anos, o CPPEM trabalha todos os dias com um único propósito ambicioso: transformar vidas por meio da educação. Somando o CPPEM Concursos e a atuação no ensino superior EAD, já são cerca de 14.000 alunos aprovados em concursos públicos em todo o Brasil — histórias reais de mudança, dignidade e futuro. Além disso, contamos com mais de 50 colaboradores e professores juntos mudando vidas.'
where not exists (select 1 from public.site_settings);
