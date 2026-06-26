interface LinkedInCardProps {
  url: string | null;
}

/**
 * Card de convite para conectar com o grupo no LinkedIn.
 * Usa o mesmo link configurado no painel administrativo.
 */
export default function LinkedInCard({ url }: LinkedInCardProps) {
  if (!url) return null;

  return (
    <section className="bg-white pb-16">
      <div className="container-page">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-950 p-8 sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl font-black text-brand-800">
                in
              </span>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Conecte-se conosco no LinkedIn
                </h2>
                <p className="mt-1 max-w-md text-brand-200">
                  Acompanhe nossas novidades, vagas e a cultura do CPPEM Colégio
                  e Cursos. Vamos crescer juntos.
                </p>
              </div>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary shrink-0"
            >
              Seguir no LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
