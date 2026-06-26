import type { SiteSettings } from "@/lib/types";

interface FooterProps {
  settings: SiteSettings;
}

interface SocialLink {
  label: string;
  url: string | null;
}

/** Rodapé institucional com links editáveis pela área administrativa. */
export default function Footer({ settings }: FooterProps) {
  const socials: SocialLink[] = [
    { label: "WhatsApp", url: settings.whatsapp_url },
    { label: "Instagram", url: settings.instagram_url },
    { label: "YouTube", url: settings.youtube_url },
    { label: "TikTok", url: settings.tiktok_url },
    { label: "LinkedIn", url: settings.linkedin_url },
  ].filter((s) => !!s.url);

  return (
    <footer className="border-t border-white/10 bg-brand-950 text-brand-100">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500 text-lg font-black text-white">
              C
            </span>
            <span className="text-lg font-bold text-white">
              {settings.company_name}
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-200">
            {settings.footer_description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Localização
          </h3>
          <p className="mt-4 text-sm text-brand-200">{settings.address}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Redes sociais
          </h3>
          <ul className="mt-4 space-y-2">
            {socials.map((s) => (
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
            {socials.length === 0 && (
              <li className="text-sm text-brand-300">Em breve.</li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="container-page text-center text-xs text-brand-300">
          © {new Date().getFullYear()} {settings.company_name}. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
