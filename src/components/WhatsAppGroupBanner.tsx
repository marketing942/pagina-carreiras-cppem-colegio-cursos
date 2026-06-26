interface WhatsAppGroupBannerProps {
  url: string | null;
}

/**
 * Faixa convidando candidatos a entrar no grupo de WhatsApp
 * onde divulgamos as novas vagas.
 */
export default function WhatsAppGroupBanner({ url }: WhatsAppGroupBannerProps) {
  if (!url) return null;

  return (
    <section className="bg-white py-12">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-accent-200 bg-accent-50 p-6 sm:flex-row sm:items-center sm:p-7">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-500 text-2xl">
              💬
            </span>
            <div>
              <h2 className="text-lg font-bold text-brand-950">
                Receba as vagas em primeira mão
              </h2>
              <p className="mt-1 max-w-xl text-sm text-brand-600">
                Entre no nosso grupo de WhatsApp e seja avisado(a) sempre que
                abrirmos novas oportunidades no CPPEM Colégio e Cursos.
              </p>
            </div>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shrink-0"
          >
            Entrar no grupo
          </a>
        </div>
      </div>
    </section>
  );
}
