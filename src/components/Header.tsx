import Link from "next/link";

interface HeaderProps {
  formUrl: string;
}

/** Cabeçalho institucional fixo da página pública. */
export default function Header({ formUrl }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-950/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/carreiras" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500 text-lg font-black text-white">
            C
          </span>
          <div className="leading-tight">
            <span className="block text-sm font-bold text-white">CPPEM</span>
            <span className="block text-[11px] text-brand-200">
              Colégio e Cursos
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#vagas"
            className="text-sm font-medium text-brand-100 transition-colors hover:text-white"
          >
            Vagas
          </a>
          <a
            href="#sobre"
            className="text-sm font-medium text-brand-100 transition-colors hover:text-white"
          >
            Sobre
          </a>
          <a
            href="#indicadores"
            className="text-sm font-medium text-brand-100 transition-colors hover:text-white"
          >
            Indicadores
          </a>
        </nav>

        <a
          href={formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary !px-4 !py-2"
        >
          Candidatar-se
        </a>
      </div>
    </header>
  );
}
