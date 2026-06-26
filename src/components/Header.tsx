import Link from "next/link";
import Logo from "./Logo";

interface HeaderProps {
  formUrl: string;
}

/** Cabeçalho institucional fixo da página pública. */
export default function Header({ formUrl }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-950/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/carreiras" className="flex items-center">
          <Logo className="h-9" withWordmark wordmarkClassName="text-brand-100" />
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
