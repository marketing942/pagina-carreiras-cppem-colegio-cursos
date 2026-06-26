import type { SiteSettings } from "@/lib/types";
import Logo from "./Logo";

interface FooterProps {
  settings: SiteSettings;
}

interface FooterLink {
  label: string;
  url: string | null;
}

/** Rodapé institucional com links editáveis pela área administrativa. */
export default function Footer({ settings }: FooterProps) {
  // Cada marca aponta para seu Linktree (que reúne todas as redes sociais)
  const brandLinks: FooterLink[] = [
    { label: "CPPEM Concursos", url: settings.linktree_cppem_url },
    { label: "Colégio CPPEM", url: settings.linktree_colegio_url },
    { label: "Unicive Caruaru", url: settings.linktree_unicive_url },
  ].filter((s) => !!s.url);

  return (
    <footer className="border-t border-white/10 bg-brand-950 text-brand-100">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Logo className="h-11" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-200">
            {settings.footer_description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Localização
          </h3>
          <p className="mt-4 text-sm text-brand-200">{settings.address}</p>
          {settings.maps_url && (
            <a
              href={settings.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-accent-300 transition-colors hover:text-accent-200"
            >
              Ver no mapa →
            </a>
          )}
          {settings.linkedin_url && (
            <a
              href={settings.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-sm text-accent-300 transition-colors hover:text-accent-200"
            >
              LinkedIn →
            </a>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Nossas marcas
          </h3>
          <p className="mt-1 text-xs text-brand-300">
            Acompanhe nas redes sociais
          </p>
          <ul className="mt-4 space-y-2">
            {brandLinks.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-200 transition-colors hover:text-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
            {brandLinks.length === 0 && (
              <li className="text-sm text-brand-300">Em breve.</li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-page space-y-1 text-center text-xs text-brand-300">
          <p>
            {settings.company_name.toUpperCase()} LTDA
            {settings.cnpj ? ` – CNPJ: ${settings.cnpj}` : ""}
          </p>
          <p>
            © {new Date().getFullYear()} {settings.company_name}. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
