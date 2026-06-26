import type { SiteSettings } from "@/lib/types";

interface AboutSectionProps {
  settings: SiteSettings;
}

/** Seção "Sobre o CPPEM Colégio e Cursos". */
export default function AboutSection({ settings }: AboutSectionProps) {
  return (
    <section id="sobre" className="bg-white py-16 sm:py-20">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-accent-500">
            Nossa missão
          </span>
          <h2 className="mt-3 text-3xl font-bold text-brand-950 sm:text-4xl">
            Sobre o {settings.company_name}
          </h2>
          <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-brand-700">
            {settings.about_text}
          </p>
          <p className="mt-6 text-lg font-medium text-brand-900">
            Venha construir essa missão conosco em um ambiente com cultura forte
            e pronto para te fazer crescer.
          </p>
        </div>

        <div className="relative">
          <div className="rounded-3xl bg-gradient-to-br from-brand-700 to-brand-950 p-10 text-white shadow-xl">
            <p className="text-2xl font-bold leading-snug">
              “Educar é servir, formar caráter e abrir caminhos.”
            </p>
            <p className="mt-6 text-brand-200">
              Queremos caminhar ao lado de profissionais que acreditam no poder
              transformador da educação.
            </p>
            <div className="mt-8 h-1 w-16 rounded-full bg-accent-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
