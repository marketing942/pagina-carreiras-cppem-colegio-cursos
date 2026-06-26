-- ==============================================================
-- 0004 — Vagas reais de Trabalho (CPPEM Colégio e Cursos)
-- Remove as vagas de exemplo antigas e insere as vagas atuais.
-- Idempotente (cada vaga é inserida apenas se o slug não existir).
-- ==============================================================

-- Remove as vagas de exemplo criadas em versões antigas da 0001
delete from public.jobs where slug in (
  'analista-de-marketing',
  'consultor-comercial',
  'desenvolvedor-full-stack',
  'professor-de-matematica',
  'professor-polivalente'
);

-- 1) Social Media -----------------------------------------------
insert into public.jobs
  (title, slug, category, department, work_type, unit, location, expected_schedule, status, short_description, responsibilities, requirements, benefits)
select
  'Social Media', 'social-media', 'trabalho', 'Marketing', 'presencial',
  'CPPEM Concursos, Colégio CPPEM, Unicive Caruaru', 'Caruaru-PE',
  'Segunda a Sexta, 12h12 às 22h (pausa das 18h às 19h)', 'aberta',
  'Representa a marca nas redes sociais, criando e publicando conteúdo.',
  '<ul><li>Representar a marca nas nossas redes sociais</li><li>Criar linhas editoriais para nossas redes sociais</li><li>Gerenciar 2 perfis do Instagram e TikTok, seguindo e superando as redes sociais</li><li>Analisar os dados das redes sociais e pontos de melhoria</li><li>Fazer a gravação de conteúdos para anúncios</li><li>Trabalhar de forma integrada com o time de vendas e produtos, garantindo fluidez na empresa</li><li>Alcançar e superar objetivos estabelecidos, contribuindo para o crescimento da empresa</li></ul>',
  '<p><strong>Competências técnicas:</strong></p><ul><li>Experiência com redes sociais</li><li>Experiência e conhecimento em Marketing/Marketing Digital (desejável)</li><li>Escrita com o português adequado</li><li>Uso adequado de computadores/notebook e celulares</li></ul><p><strong>Competências comportamentais:</strong></p><ul><li>Proatividade</li><li>Ambição para crescimento profissional</li><li>Resiliente: sabe lidar com troca de rotas e muitas atividades organizadamente.</li><li>Intelectualmente curioso: gosta de estudar, aprender e se aprofundar em negócios, estratégia, mercado e comportamento humano.</li><li>Orientado(a) a impacto e resultado: entende que performance é consequência de processo, disciplina e responsabilidade.</li><li>Colaborativo(a): joga junto com o time.</li></ul>',
  '<ul><li>🚀 Oportunidade de ser promovido ou se tornar sócio</li><li>🌴 Férias remuneradas (30 dias a cada 12 meses)</li><li>🎓 Bolsa de estudos para filhos e familiares (50% de desconto em turmas do Colégio ou Curso Presencial)</li><li>🧠 Acesso a trilha personalizada de estudo com os cursos online dos melhores do Brasil</li><li>🎯 Oportunidade de ensinar a equipe em treinamentos</li><li>📜 Certificado por performance</li><li>🎂 Folga no aniversário</li><li>🏷️ Descontos em diversos estabelecimentos (academia, suplemento, artes marciais, hamburgueria, studios de tatuagem, barbearia...)</li><li>🏫 Isenção de matrícula em faculdade EAD da Unicive</li></ul>'
where not exists (select 1 from public.jobs where slug = 'social-media');

-- 2) Coordenador(a) de Marketing --------------------------------
insert into public.jobs
  (title, slug, category, department, work_type, unit, location, expected_schedule, status, short_description, responsibilities, requirements, benefits)
select
  'Coordenador de Marketing', 'coordenador-de-marketing', 'trabalho', 'Marketing', 'presencial',
  'CPPEM Concursos, Colégio CPPEM, Unicive Caruaru', 'Caruaru-PE',
  'Segunda a Sexta, 12h12 às 22h (pausa das 18h às 19h)', 'aberta',
  'Coordena a equipe e faz acontecer as estratégias de marketing do grupo.',
  '<ul><li>Realizar reuniões periódicas com a equipe de marketing</li><li>Treinar a equipe e novos integrantes na área de marketing</li><li>Gerenciar nossos sistemas de marketing</li><li>Analisar dados junto ao estrategista de marketing e tomar decisões</li><li>Gerenciar os projetos, eventos e lançamentos de marketing</li><li>Garantir a execução operacional correta da equipe nos projetos de marketing</li><li>Trabalhar de forma integrada com Comercial, Produtos e Tecnologia, garantindo fluidez na empresa</li><li>Atingir e superar metas estabelecidas, mantendo alto padrão ético e entrega de valor</li></ul>',
  '<p><strong>Competências técnicas:</strong></p><ul><li>Experiência com liderança de equipe (equipes de marketing de preferência)</li><li>Experiência técnica com marketing digital</li><li>Escrita com o português adequado</li><li>Uso adequado de computadores ou notebook</li></ul><p><strong>Competências comportamentais:</strong></p><ul><li>Proatividade</li><li>Ambição para crescimento profissional</li><li>Inconformista: não se acomoda com resultados medianos ou superficiais.</li><li>Resiliente: sabe lidar com decisões difíceis e ciclos exigentes sem perder energia nem clareza.</li><li>Intelectualmente curioso: gosta de estudar, aprender e se aprofundar em negócios, estratégia, mercado e comportamento humano.</li><li>Responsável e dono(a) do jogo: entende que suas decisões impactam diretamente o crescimento da empresa.</li><li>Colaborativo(a): joga junto com o time.</li></ul>',
  '<ul><li>🚀 Oportunidade de ser promovido ou se tornar sócio</li><li>🌴 Férias remuneradas (30 dias a cada 12 meses)</li><li>🎓 Bolsa de estudos para filhos e familiares (50% de desconto em turmas do Colégio ou Curso Presencial)</li><li>🧠 Acesso a trilha personalizada de estudo com os cursos online dos melhores do Brasil</li><li>🎯 Oportunidade de ensinar a equipe em treinamentos</li><li>📜 Certificado por performance</li><li>🎂 Folga no aniversário</li><li>🏷️ Descontos em diversos estabelecimentos (academia, suplemento, artes marciais, hamburgueria, studios de tatuagem, barbearia...)</li><li>🏫 Isenção de matrícula em faculdade EAD da Unicive</li></ul>'
where not exists (select 1 from public.jobs where slug = 'coordenador-de-marketing');

-- 3) Zelador(a) -------------------------------------------------
insert into public.jobs
  (title, slug, category, department, work_type, unit, location, expected_schedule, status, short_description, responsibilities, requirements, benefits)
select
  'Zelador', 'zelador', 'trabalho', 'Serviços Gerais', 'presencial',
  'CPPEM Concursos, Colégio CPPEM', 'Caruaru-PE',
  'Segunda a Sexta, 18h10 às 22h10', 'aberta',
  'Mantém o ambiente do colégio e do curso limpo e organizado.',
  '<ul><li>Aumentar o índice de satisfação da limpeza dos alunos e colaboradores</li><li>Manter o ambiente administrativo limpo e organizado</li><li>Manter o ambiente das aulas limpo e organizado</li><li>Organizar e gerenciar os materiais de limpeza</li><li>Enviar relatórios diários do que foi feito no dia</li><li>Comunicar pontos de consertos do prédio</li></ul>',
  '<ul><li>Boa comunicação escrita com o português adequado</li><li>Experiência prévia com Serviços Gerais</li><li>Proatividade</li></ul>',
  '<ul><li>🌴 Férias remuneradas (30 dias a cada 12 meses)</li><li>🎓 Bolsa de estudos para filhos e familiares (50% de desconto em turmas do Colégio ou Curso Presencial)</li><li>🧠 Acesso a trilha personalizada de estudo com os cursos online dos melhores do Brasil</li><li>🏷️ Descontos em diversos estabelecimentos (academia, suplemento, artes marciais, hamburgueria, studios de tatuagem, barbearia...)</li><li>🏫 Isenção de matrícula em faculdade EAD da Unicive</li></ul>'
where not exists (select 1 from public.jobs where slug = 'zelador');

-- 4) Gestor(a) de YouTube ---------------------------------------
insert into public.jobs
  (title, slug, category, department, work_type, unit, location, expected_schedule, status, short_description, responsibilities, requirements, benefits)
select
  'Gestor de YouTube', 'gestor-de-youtube', 'trabalho', 'Marketing', 'presencial',
  'CPPEM Concursos, Colégio CPPEM', 'Caruaru-PE',
  'Segunda a Sexta, 12h12 às 22h (pausa das 18h às 19h)', 'aberta',
  'Gerencia os canais do YouTube do grupo e produz conteúdo.',
  '<ul><li>Concluir diariamente a linha editorial do YouTube sem erros</li><li>Gerenciar dois canais do YouTube (vídeos, lives, shorts, thumbnails, descrição, hashtags)</li><li>Analisar os dados do YouTube e pontos de melhoria</li><li>Fazer gravação de conteúdos para o YouTube</li><li>Organizar e controlar lives no YouTube</li><li>Organizar e controlar podcasts dos canais</li></ul>',
  '<p><strong>Competências técnicas:</strong></p><ul><li>Experiência com redes sociais (de preferência o YouTube)</li><li>Experiência e conhecimento em Marketing/Marketing Digital (desejável)</li><li>Escrita com o português adequado</li><li>Design e edição de vídeos</li><li>Uso adequado de computadores/notebook e celulares</li></ul><p><strong>Competências comportamentais:</strong></p><ul><li>Proatividade</li><li>Ambição para crescimento profissional</li><li>Resiliente: sabe lidar com troca de rotas e muitas atividades organizadamente.</li><li>Intelectualmente curioso: gosta de estudar, aprender e se aprofundar em redes sociais e marketing.</li><li>Orientado(a) a impacto e resultado: entende que performance é consequência de processo, disciplina e responsabilidade.</li><li>Colaborativo(a): joga junto com o time.</li></ul>',
  '<ul><li>🌴 Férias remuneradas (30 dias a cada 12 meses)</li><li>🎓 Bolsa de estudos para filhos e familiares (50% de desconto em turmas do Colégio ou Curso Presencial)</li><li>🧠 Acesso a trilha personalizada de estudo com os cursos online dos melhores do Brasil</li><li>🎯 Oportunidade de ensinar a equipe em treinamentos</li><li>📜 Certificado por performance</li><li>🎂 Folga no aniversário</li><li>🏷️ Descontos em diversos estabelecimentos (academia, suplemento, artes marciais, hamburgueria, studios de tatuagem, barbearia...)</li><li>🏫 Isenção de matrícula em faculdade EAD da Unicive</li></ul>'
where not exists (select 1 from public.jobs where slug = 'gestor-de-youtube');

-- 5) Vendedor(a) Interno(a) -------------------------------------
insert into public.jobs
  (title, slug, category, department, work_type, unit, location, expected_schedule, status, short_description, responsibilities, requirements, benefits)
select
  'Vendedor Interno', 'vendedor-interno', 'trabalho', 'Comercial', 'presencial',
  'CPPEM Concursos', 'Caruaru-PE',
  'Segunda a Sexta, 12h12 às 22h (pausa das 18h às 19h)', 'aberta',
  'Vendas consultivas de mentorias, turmas, plataforma e materiais, a partir de leads do marketing.',
  '<ul><li>Atender clientes através do sistema de atendimento (CRM), compreendendo suas necessidades</li><li>Utilizar o CRM e dados do funil para melhorar a performance</li><li>Fazer propostas dos produtos que mais se adequam aos clientes</li><li>Ser o primeiro ponto de confiança do cliente com nossa empresa, construindo credibilidade desde a primeira conversa</li><li>Criar um relacionamento honesto com os clientes, garantindo sua satisfação e confiança para recompra</li><li>Trabalhar de forma integrada com Pós-Venda e Marketing, garantindo fluidez na empresa</li><li>Atingir e superar metas de vendas, mantendo alto padrão ético, consultivo e de entrega de valor</li></ul>',
  '<p><strong>Competências técnicas:</strong></p><ul><li>Conhecimento breve na área de concursos públicos policiais</li><li>Experiência com vendas online (desejável)</li><li>Escrita com o português adequado</li><li>Uso adequado de computadores ou notebook</li></ul><p><strong>Competências comportamentais:</strong></p><ul><li>Comunicador(a) de alto nível: consegue dialogar com diversos tipos de pessoas.</li><li>Proatividade e com objetivo em mente</li><li>Ambição para crescimento profissional</li><li>Inconformista: não se acomoda com respostas rasas ou resultados medianos.</li><li>Resiliente: sabe lidar com objeções e ciclos de venda exigentes sem perder energia nem clareza.</li><li>Intelectualmente curioso: gosta de estudar, aprender e se aprofundar em negócios, estratégia, mercado e comportamento humano.</li><li>Responsável e dono(a) do jogo: entende que suas decisões impactam diretamente o crescimento da empresa.</li><li>Colaborativo(a): joga junto com o time.</li></ul>',
  '<ul><li>💰 Comissão por meta atingida</li><li>🏆 Bônus financeiro por metas e objetivos</li><li>🚀 Oportunidade de ser promovido ou se tornar sócio</li><li>🌴 Férias remuneradas (30 dias a cada 12 meses)</li><li>🎓 Bolsa de estudos para filhos e familiares (50% de desconto em turmas do Colégio ou Curso Presencial)</li><li>🧠 Acesso a trilha personalizada de estudo com os cursos online dos melhores do Brasil</li><li>🎯 Oportunidade de ensinar a equipe em treinamentos</li><li>🏅 Troféus por conquistas alcançadas</li><li>📜 Certificado por performance</li><li>🎂 Folga no aniversário</li><li>🎁 Brindes semanais por objetivos atingidos</li><li>🏷️ Descontos em diversos estabelecimentos (academia, suplemento, artes marciais, hamburgueria, studios de tatuagem, barbearia...)</li><li>🏫 Isenção de matrícula em faculdade EAD da Unicive</li></ul>'
where not exists (select 1 from public.jobs where slug = 'vendedor-interno');
