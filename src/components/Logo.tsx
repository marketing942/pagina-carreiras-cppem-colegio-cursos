import { LOGO_CPPEM } from "@/lib/constants";

interface LogoProps {
  /** Altura da imagem do logo (classe Tailwind, ex.: "h-10"). */
  className?: string;
  /** Exibe o nome do grupo ao lado do logo. */
  withWordmark?: boolean;
  /** Cor do wordmark (sobre fundo escuro use claro). */
  wordmarkClassName?: string;
}

/**
 * Logo oficial do CPPEM (original do brandbook).
 * Usa <img> simples por se tratar de um asset remoto de logo.
 */
export default function Logo({
  className = "h-10",
  withWordmark = false,
  wordmarkClassName = "text-white",
}: LogoProps) {
  return (
    <span className="flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_CPPEM}
        alt="CPPEM Colégio e Cursos"
        className={`${className} w-auto object-contain`}
      />
      {withWordmark && (
        <span className={`hidden leading-tight sm:block ${wordmarkClassName}`}>
          <span className="block text-xs font-medium uppercase tracking-[0.2em] opacity-80">
            Colégio e Cursos
          </span>
        </span>
      )}
    </span>
  );
}
