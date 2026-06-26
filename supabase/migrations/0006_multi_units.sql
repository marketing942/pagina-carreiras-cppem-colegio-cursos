-- ==============================================================
-- 0006 — Atualiza as vagas de Trabalho para múltiplas unidades
-- (uma vaga pode atender mais de uma unidade, separadas por vírgula)
-- Idempotente.
-- ==============================================================

update public.jobs set unit = 'CPPEM Concursos, Colégio CPPEM, Unicive Caruaru'
  where slug in ('social-media', 'coordenador-de-marketing');

update public.jobs set unit = 'CPPEM Concursos, Colégio CPPEM'
  where slug in ('zelador', 'gestor-de-youtube');

-- Vendedor Interno permanece apenas em CPPEM Concursos
update public.jobs set unit = 'CPPEM Concursos'
  where slug = 'vendedor-interno';
