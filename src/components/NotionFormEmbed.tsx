interface NotionFormEmbedProps {
  embedUrl: string;
  /** Quando false, o componente não renderiza nada. */
  enabled?: boolean;
  title?: string;
  subtitle?: string;
  height?: number;
}

/**
 * Componente reutilizável que incorpora o formulário do Notion via iframe.
 * Só é exibido quando `enabled` for verdadeiro.
 */
export default function NotionFormEmbed({
  embedUrl,
  enabled = true,
  title = "Candidate-se agora",
  subtitle = "Preencha o formulário abaixo para fazer parte da nossa tropa.",
  height = 600,
}: NotionFormEmbedProps) {
  if (!enabled || !embedUrl) return null;

  return (
    <section className="bg-brand-50 py-16">
      <div className="container-page">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-brand-950 sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-brand-600">{subtitle}</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
          <iframe
            src={embedUrl}
            width="100%"
            height={height}
            frameBorder={0}
            allowFullScreen
            title="Formulário de candidatura CPPEM"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
