import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { BRANDS } from "@/lib/constants";
import Logo from "./Logo";
import Icon from "./Icon";
import SocialIcon from "./SocialIcon";

interface FooterProps {
  settings: SiteSettings;
}

/**
 * Rodapé institucional: mostra a força do grupo com as redes de cada marca,
 * além de localização e dados legais.
 */
export default function Footer({ settings }: FooterProps) {
  // LinkedIn do grupo (configurável) substitui o padrão do CPPEM Concursos
  const brands = BRANDS.map((b) =>
    b.id === "cppem" && settings.linkedin_url
      ? {
          ...b,
          socials: b.socials.map((s) => (s.key === "linkedin" ? { ...s, href: settings.linkedin_url! } : s)),
        }
      : b
  );

  return (
    <footer className="bg-brand-900 text-brand-100">
      <div className="h-1 bg-gradient-to-r from-transparent via-accent-500 to-transparent" />

      <div className="container-page py-14 sm:py-16">
        {/* Topo: marcas + mensagem */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-4">
              <Logo variant="cppem" className="h-20" />
              <span className="h-12 w-px bg-white/25" aria-hidden />
              <Logo variant="colegio" className="h-20" />
            </div>
            <h2 className="mt-6 max-w-xl text-2xl font-extrabold leading-snug text-white sm:text-3xl">
              Acompanhe o CPPEM em todas as <span className="text-accent-300">nossas redes</span>.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-200">
              {settings.footer_description} Conteúdo, aulas e novidades de cada uma das nossas marcas.
            </p>
          </div>
        </div>

        {/* Redes de cada marca */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {brands.map((brand) => {
            return (
              <section key={brand.id} className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="font-display text-lg font-extrabold text-white">{brand.name}</h3>
                <p className="mt-1 text-sm text-brand-200">{brand.tagline}</p>

                {brand.site && (
                  <a
                    href={brand.site.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-300 transition-colors hover:text-accent-200"
                  >
                    {brand.site.label}
                    <Icon name="arrow" className="h-4 w-4 -rotate-45" />
                  </a>
                )}

                <div className="mt-5 flex flex-wrap gap-2">
                  {brand.socials.map((s) => (
                    <a
                      key={s.key}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label} — ${brand.name}`}
                      title={s.label}
                      className="grid h-10 w-10 place-items-center rounded-full border border-accent-300/40 bg-white/5 text-accent-200 transition-all hover:-translate-y-0.5 hover:border-accent-300 hover:bg-accent-300 hover:text-brand-950"
                    >
                      <SocialIcon name={s.key} className="h-[17px] w-[17px]" />
                    </a>
                  ))}
                  {brand.socials.length === 0 && (
                    <p className="text-sm text-brand-300">Redes em breve.</p>
                  )}
                </div>
              </section>
            );
          })}
        </div>

        {/* Localização */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-accent-200">
              <Icon name="pin" />
            </span>
            <div>
              <p className="font-eyebrow text-sm font-bold uppercase tracking-[0.16em] text-accent-300">Localização</p>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-brand-200">{settings.address}</p>
            </div>
          </div>
          {settings.maps_url && (
            <a
              href={settings.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost shrink-0 !py-2.5"
            >
              Ver no mapa
            </a>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-page flex flex-col items-center justify-between gap-2 text-center text-xs text-brand-300 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {settings.company_name}. Todos os direitos reservados.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-end">
            <span>
              {settings.company_name.toUpperCase()} LTDA
              {settings.cnpj ? ` – CNPJ: ${settings.cnpj}` : ""}
            </span>
            <Link
              href="/privacidade"
              className="font-semibold text-accent-300 underline underline-offset-4 transition-colors hover:text-accent-200"
            >
              Política de Privacidade
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
