-- ==============================================================
-- 0005 — Vagas de Professores (Colégio CPPEM)
-- Adiciona a coluna apply_url (se necessário) e cadastra as vagas.
-- Idempotente (cada vaga é inserida apenas se o slug não existir).
-- ==============================================================

-- Coluna de link de candidatura por vaga (para instalações antigas)
alter table public.jobs
  add column if not exists apply_url text;

-- --------------------------------------------------------------
-- Professores "De Disciplina" (conteúdo padrão)
-- --------------------------------------------------------------
insert into public.jobs
  (title, slug, category, discipline, unit, location, status, short_description, description, requirements, apply_url)
select
  v.title, v.slug, 'professor', 'de Disciplina', 'Colégio CPPEM', 'Caruaru-PE', 'aberta',
  'Seleção para professores comprometidos com resultados e a formação integral dos alunos.',
  '<p>O Colégio CPPEM abre seleção para professores que desejam atuar em um ambiente organizado, comprometido com resultados e a formação integral dos alunos.</p><p><strong>🎯 Perfil profissional</strong></p><ul><li>Postura ética e profissional</li><li>Pontualidade e organização</li><li>Domínio de sala de aula</li><li>Compromisso com metas educacionais</li></ul><p><strong>📋 Principais funções</strong></p><ul><li>Planejamento e execução de aulas</li><li>Controle e acompanhamento do desempenho dos alunos</li><li>Participação ativa nas ações pedagógicas</li></ul>',
  '<p><strong>🎓 Requisitos</strong></p><ul><li>Formação específica na área</li><li>Experiência será um diferencial</li></ul>',
  'https://app.notion.com/p/358bbae8074c81c88395e2350125f504?pvs=21'
from (values
  ('Professor de História', 'professor-de-historia'),
  ('Professor de Redação', 'professor-de-redacao'),
  ('Professor de Ciências', 'professor-de-ciencias'),
  ('Professor de Português', 'professor-de-portugues'),
  ('Professor de Filosofia', 'professor-de-filosofia'),
  ('Professor de Inglês', 'professor-de-ingles'),
  ('Professor de Ensino Religioso', 'professor-de-ensino-religioso'),
  ('Professor de Biologia', 'professor-de-biologia'),
  ('Professor de Educação Física', 'professor-de-educacao-fisica'),
  ('Professor de Matemática', 'professor-de-matematica'),
  ('Professor de Projeto de Vida', 'professor-de-projeto-de-vida'),
  ('Professor de Geografia', 'professor-de-geografia'),
  ('Professor de Ética e Justiça', 'professor-de-etica-e-justica'),
  ('Professor de Física', 'professor-de-fisica'),
  ('Professor de Química', 'professor-de-quimica'),
  ('Professor de Artes', 'professor-de-artes')
) as v(title, slug)
where not exists (select 1 from public.jobs j where j.slug = v.slug);

-- --------------------------------------------------------------
-- Professor Polivalente (Pedagogia) — conteúdo próprio
-- --------------------------------------------------------------
insert into public.jobs
  (title, slug, category, discipline, segment, unit, location, status, short_description, description, requirements, apply_url)
select
  'Professor Polivalente (Pedagogia)', 'professor-polivalente', 'professor', 'Polivalente',
  'Ensino Fundamental I', 'Colégio CPPEM', 'Caruaru-PE', 'aberta',
  'Professor(a) polivalente para o Ensino Fundamental I (1º ao 5º ano).',
  '<p>O Colégio CPPEM informa que estão abertas as inscrições para contratação de Professor(a) do Ensino Fundamental I (1º ao 5º ano).</p><p><strong>⏰ Carga horária</strong></p><ul><li>Manhã</li></ul><p><strong>📚 Área de atuação</strong></p><ul><li>Ensino Fundamental I (polivalente)</li></ul><p><strong>📋 Atribuições</strong></p><ul><li>Planejar e ministrar aulas conforme a proposta pedagógica</li><li>Desenvolver atividades lúdicas e educativas</li><li>Acompanhar o desenvolvimento dos alunos</li><li>Elaborar avaliações e relatórios</li><li>Participar de reuniões pedagógicas e eventos escolares</li></ul>',
  '<p><strong>🎓 Requisitos</strong></p><ul><li>Formação em Pedagogia (obrigatório)</li><li>Experiência com turmas do Fundamental I (desejável)</li><li>Conhecimento em planejamento pedagógico</li><li>Boa comunicação e didática</li><li>Organização e responsabilidade</li></ul>',
  'https://app.notion.com/p/358bbae8074c81c88395e2350125f504?pvs=21'
where not exists (select 1 from public.jobs where slug = 'professor-polivalente');
