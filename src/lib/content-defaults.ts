import type { ContentItem } from "./types";

/**
 * Textos iniciais das seções da página pública. Podem ser editados em
 * Admin → Configurações; enquanto não forem editados, valem estes.
 *
 * Observação: de propósito não há "férias remuneradas" aqui. É o mínimo
 * esperado de uma empresa; os diferenciais ficam em destaque.
 */

/** "Por que trabalhar no CPPEM" — ícones: ver IconName em components/Icon.tsx */
export const DEFAULT_WHY_ITEMS: ContentItem[] = [
  {
    icon: "spark",
    title: "Espaço para crescer",
    text: "Oportunidade de ser promovido(a) ou até se tornar sócio(a). Quem entrega resultado cresce junto com a empresa.",
  },
  {
    icon: "cap",
    title: "Estudo para você e sua família",
    text: "Bolsa de 50% para filhos e familiares em turmas do Colégio ou do Curso Presencial, trilha de estudo com cursos online e isenção de matrícula na faculdade EAD da Unicive.",
  },
  {
    icon: "heart",
    title: "Propósito que transforma vidas",
    text: "Trabalhamos todos os dias por um propósito: transformar vidas por meio da educação. Já são cerca de 14.000 alunos aprovados em concursos públicos em todo o Brasil.",
  },
  {
    icon: "building",
    title: "Nova sede, bem localizada",
    text: "Nossa nova sede tem boa localização: fica na Praça Presidente Getúlio Vargas, em Caruaru, em um prédio de 5 andares.",
  },
  {
    icon: "star",
    title: "Reconhecimento",
    text: "Certificado por performance, folga no aniversário e premiações por metas e objetivos, conforme a vaga.",
  },
  {
    icon: "check",
    title: "Vantagens no dia a dia",
    text: "Descontos em diversos estabelecimentos, como academia, suplemento, artes marciais, hamburgueria, estúdio de tatuagem e barbearia.",
  },
];

/** "Como funciona" — etapas gerais, sem prazos. Ajuste com as etapas reais. */
export const DEFAULT_PROCESS_STEPS: ContentItem[] = [
  {
    title: "Escolha a vaga",
    text: "Use a busca e os filtros e leia os detalhes da vaga que combina com você.",
  },
  {
    title: "Candidate-se",
    text: "Clique em “Candidatar-se” e preencha o nosso formulário de candidatura.",
  },
  {
    title: "Análise do perfil",
    text: "Nossa equipe analisa as candidaturas recebidas para cada vaga.",
  },
  {
    title: "Contato",
    text: "Quem avançar na seleção é chamado(a) pela equipe do CPPEM para as próximas etapas.",
  },
];

/** Perguntas frequentes. Ajuste conforme o que os candidatos mais perguntam. */
export const DEFAULT_FAQ_ITEMS: ContentItem[] = [
  {
    title: "Como me candidato a uma vaga?",
    text: "Abra a vaga que te interessa e clique em “Candidatar-se agora”. Você será levado(a) ao nosso formulário de candidatura.",
  },
  {
    title: "Onde ficam as vagas?",
    text: "O local de cada vaga aparece nos detalhes. Nossa sede fica na Praça Presidente Getúlio Vargas, 1119, em Caruaru-PE.",
  },
  {
    title: "Como fico sabendo de novas vagas?",
    text: "Entre no nosso grupo de WhatsApp de vagas e siga o CPPEM no LinkedIn: as novas oportunidades são avisadas por lá.",
  },
  {
    title: "Quando vou receber um retorno?",
    text: "O prazo varia conforme a vaga e o número de candidaturas. Quem avançar na seleção é contatado(a) pela nossa equipe.",
  },
  {
    title: "O que acontece com os meus dados?",
    text: "Os dados enviados no formulário são usados para o processo seletivo. Leia a Política de Privacidade, com o link no rodapé da página, para saber como tratamos suas informações e quais são os seus direitos.",
  },
  {
    title: "Vi uma vaga que não aparece mais. O que aconteceu?",
    text: "Quando uma vaga é preenchida ou encerrada, ela sai da lista. Para não perder as próximas, entre no grupo de WhatsApp de vagas.",
  },
];

/** Aceita só itens com texto; protege a página de dados mal formados no banco. */
export function cleanItems(value: unknown, fallback: ContentItem[]): ContentItem[] {
  if (!Array.isArray(value)) return fallback;
  const items = value.filter(
    (i): i is ContentItem =>
      !!i && typeof i.title === "string" && typeof i.text === "string" && i.title.trim() !== ""
  );
  return items.length > 0 ? items : fallback;
}
