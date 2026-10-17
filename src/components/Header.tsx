import Link from "next/link";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  formUrl: string;
}

/** Cabeçalho branco e limpo: só as duas marcas e o botão de candidatura. */
export default function Header({ formUrl }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 shadow-soft backdrop-blur">
      <div className="container-page flex h-[68px] items-center justify-between gap-4">
        <Link href="/carreiras" className="flex min-w-0 items-center gap-2 sm:gap-3" aria-label="CPPEM Colégio e Cursos — Carreiras">
          <Logo variant="cppem" className="h-12 sm:h-[60px] -my-1" />
          <span className="h-9 w-px bg-line" aria-hidden />
          <Logo variant="colegio" className="h-12 sm:h-[60px] -my-1" />
        </Link>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a href={formUrl} target="_blank" rel="noopener noreferrer" className="btn-primary whitespace-nowrap !px-4 !py-2.5 sm:!px-5">
            Candidatar-se
          </a>
        </div>
      </div>
    </header>
  );
}
