import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import { getSettings } from "@/lib/settings";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Política de Privacidade | Carreiras CPPEM",
  description:
    "Como o CPPEM Colégio e Cursos trata os dados pessoais de quem se candidata a uma vaga: quais dados, para quê, por quanto tempo e quais são os seus direitos.",
  alternates: { canonical: "/privacidade" },
};

/** Data da última revisão do texto. Atualize ao alterar a política. */
const UPDATED_AT = "23 de outubro de 2026";

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-12 scroll-mt-24 text-2xl font-extrabold text-ink">
      {children}
    </h2>
  );
}

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-3 leading-relaxed text-inksoft">{children}</p>
);

const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-inksoft marker:text-goldink">{children}</ul>
);

/** Política de Privacidade para candidatos e visitantes do site de vagas. */
export default async function PrivacidadePage() {
  const settings = await getSettings();
  const razaoSocial = normalizeRazaoSocial(settings.company_name);

  return (
    <>
      <Header formUrl={settings.form_url} />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 py-12 text-white sm:py-16">
          <div className="container-page max-w-3xl">
            <Link
              href="/carreiras"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-brand-50 transition-colors hover:bg-white/20"
            >
              <Icon name="arrow" className="h-4 w-4 rotate-180" /> Voltar para as vagas
            </Link>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-5xl">Política de Privacidade</h1>
            <p className="mt-3 text-lg text-brand-100">Para quem acessa o site de vagas e se candidata no CPPEM.</p>
            <p className="mt-2 text-sm text-brand-200">Última atualização: {UPDATED_AT}</p>
          </div>
        </div>

        <article className="container-page max-w-3xl pb-20 pt-10">
          <div className="card border-goldline bg-goldfaint p-6">
            <h2 className="text-lg font-extrabold text-ink">Resumo em poucas linhas</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-inksoft marker:text-goldink">
              <li>Este site apenas divulga vagas. Ele <strong>não guarda</strong> os dados da sua candidatura.</li>
              <li>
                Ao clicar em “Candidatar-se”, você vai para um formulário externo, onde informa os seus dados. Nós os
                usamos para o processo seletivo.
              </li>
              <li>Medimos o uso do site de forma agregada, sem cookies e sem identificar você.</li>
              <li>Você pode pedir acesso, correção ou exclusão dos seus dados quando quiser.</li>
            </ul>
          </div>

          <H2 id="quem-somos">1. Quem é responsável pelos seus dados</H2>
          <P>
            Esta política vale para o site de vagas e carreiras do CPPEM Colégio e Cursos (“site”). A responsável pelo
            tratamento dos dados pessoais de candidatos (“controladora”) é a <strong>{razaoSocial}</strong>
            {settings.cnpj ? <>, CNPJ {settings.cnpj}</> : null}
            {settings.address ? <>, com sede em {settings.address}</> : null}.
          </P>

          <H2 id="dados">2. Quais dados tratamos</H2>
          <h3 className="mt-5 text-lg font-bold text-ink">2.1 No formulário de candidatura</h3>
          <P>
            Quando você clica em “Candidatar-se”, abre-se um formulário externo (hospedado no Notion). Lá você informa
            os dados que escolher fornecer, como nome, telefone, e-mail, cidade, formação, experiência profissional,
            currículo e respostas às perguntas do formulário.
          </P>
          <P>
            Evite enviar dados pessoais sensíveis (por exemplo, sobre saúde, religião, opinião política ou origem racial
            ou étnica), a não ser que você queira informá-los por serem relevantes para a sua candidatura.
          </P>

          <h3 className="mt-5 text-lg font-bold text-ink">2.2 Ao navegar no site</h3>
          <UL>
            <li>
              <strong>Medição de acessos:</strong> usamos o Vercel Web Analytics para saber, de forma agregada, quais
              páginas são mais vistas, de onde vêm as visitas e quantas pessoas clicam em botões como “Candidatar-se”.
              Ele não usa cookies e não cria perfil individual de navegação.
            </li>
            <li>
              <strong>Dados técnicos:</strong> a infraestrutura de hospedagem pode registrar dados como endereço IP,
              navegador e data e hora do acesso, para garantir a segurança e o funcionamento do site.
            </li>
            <li>
              <strong>Preferências no seu aparelho:</strong> guardamos no seu navegador a sua escolha de tema (claro ou
              escuro) e se você já fechou o aviso do grupo de WhatsApp, para não insistir. Essas informações ficam
              apenas no seu aparelho.
            </li>
          </UL>

          <h3 className="mt-5 text-lg font-bold text-ink">2.3 Links para outros serviços</h3>
          <P>
            Ao clicar em links para o formulário, WhatsApp, LinkedIn ou redes sociais, você sai deste site. Esses
            serviços têm as suas próprias políticas de privacidade.
          </P>

          <H2 id="finalidades">3. Para que usamos os dados e em que base legal</H2>
          <UL>
            <li>
              <strong>Conduzir o processo seletivo</strong> (analisar a candidatura, avaliar o perfil e entrar em
              contato com você). Base legal: procedimentos preliminares relacionados a contrato, a pedido do titular
              (art. 7º, V, da LGPD) e, quando for o caso, o seu consentimento (art. 7º, I).
            </li>
            <li>
              <strong>Cumprir obrigações legais ou regulatórias.</strong> Base legal: art. 7º, II.
            </li>
            <li>
              <strong>Melhorar o site e entender os resultados do recrutamento</strong>, de forma agregada. Base legal:
              legítimo interesse (art. 7º, IX).
            </li>
          </UL>
          <P>Não vendemos os seus dados pessoais e não os usamos para finalidades incompatíveis com estas.</P>

          <H2 id="compartilhamento">4. Com quem compartilhamos</H2>
          <UL>
            <li>
              <strong>Equipe do CPPEM:</strong> o acesso aos dados das candidaturas é restrito às pessoas envolvidas no
              processo seletivo.
            </li>
            <li>
              <strong>Notion:</strong> o formulário e as respostas ficam no ambiente do Notion, que atua como
              fornecedor de tecnologia. Seus servidores podem estar fora do Brasil; nesse caso, a transferência
              internacional segue o art. 33 da LGPD.
            </li>
            <li>
              <strong>Hospedagem do site:</strong> a Vercel hospeda o site e mede os acessos, e o Supabase guarda as
              informações das vagas. O Supabase não armazena dados de candidatos.
            </li>
            <li>
              <strong>Autoridades:</strong> quando houver obrigação legal ou ordem de autoridade competente.
            </li>
          </UL>

          <H2 id="retencao">5. Por quanto tempo guardamos</H2>
          <P>
            Guardamos os dados pelo tempo necessário ao processo seletivo e ao cumprimento de obrigações legais. Depois
            disso, eles são excluídos ou anonimizados, salvo se a lei exigir que sejam mantidos. Você pode pedir a
            exclusão a qualquer momento, como explicado no item 7.
          </P>

          <H2 id="seguranca">6. Como protegemos os dados</H2>
          <P>
            Adotamos medidas técnicas e organizacionais razoáveis: conexão segura (HTTPS), acesso restrito por login e
            uso de fornecedores reconhecidos. Nenhum sistema é totalmente imune a falhas; se ocorrer um incidente que
            possa causar risco relevante, comunicaremos você e a Autoridade Nacional de Proteção de Dados (ANPD), como
            manda a lei.
          </P>

          <H2 id="direitos">7. Os seus direitos</H2>
          <P>De acordo com o art. 18 da LGPD, você pode pedir, a qualquer momento:</P>
          <UL>
            <li>confirmação de que tratamos os seus dados e acesso a eles;</li>
            <li>correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>anonimização, bloqueio ou eliminação de dados desnecessários ou tratados fora da lei;</li>
            <li>portabilidade dos dados;</li>
            <li>eliminação dos dados tratados com base no seu consentimento;</li>
            <li>informação sobre com quem compartilhamos os seus dados;</li>
            <li>informação sobre a possibilidade de não consentir e as consequências disso;</li>
            <li>revogação do consentimento.</li>
          </UL>
          <P>
            Para exercer qualquer desses direitos,{" "}
            {settings.privacy_email ? (
              <>
                escreva para{" "}
                <a
                  href={`mailto:${settings.privacy_email}`}
                  className="font-semibold text-goldink underline underline-offset-4 hover:text-ink"
                >
                  {settings.privacy_email}
                </a>
                .
              </>
            ) : (
              <>fale com a gente pelos canais oficiais de atendimento do CPPEM, indicados no rodapé desta página.</>
            )}{" "}
            Se acreditar que os seus direitos não foram respeitados, você também pode registrar reclamação junto à ANPD
            (gov.br/anpd).
          </P>

          <H2 id="alteracoes">8. Mudanças nesta política</H2>
          <P>
            Podemos atualizar esta política para refletir mudanças no site ou na lei. A data da última atualização fica
            sempre no topo da página.
          </P>

          <div className="mt-12 text-center">
            <Link href="/carreiras" className="btn-primary">
              Ver vagas abertas
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </main>
      <Footer settings={settings} />
    </>
  );
}

/** Razão social no formato "CPPEM COLÉGIO E CURSOS LTDA" (sem repetir o "LTDA"). */
function normalizeRazaoSocial(name: string): string {
  return `${name.toUpperCase().replace(/(\s+LTDA)+$/, "")} LTDA`;
}
