import type { SiteSettings } from "@/lib/types";

interface AboutSectionProps {
  settings: SiteSettings;
}

/** Seção "Sobre o CPPEM Colégio e Cursos". */
export default function AboutSection({ settings }: AboutSectionProps) {
  return (
    <section id="sobre" className="bg-white py-12 sm:py-14">
      <div className="container-page max-w-3xl">
        <span className="text-sm font-semibold uppercase tracking-wide text-accent-600">
          Nossa missão
        </span>
        <h2 className="mt-3 text-3xl font-bold text-brand-950 sm:text-4xl">
          Sobre o {settings.company_name}
        </h2>
        <p className="mt-5 whitespace-pre-line text-lg leading-relaxed text-brand-700">
          {settings.about_text}
        </p>
      </div>
    </section>
  );
}
