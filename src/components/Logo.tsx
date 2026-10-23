import { LOGO_CPPEM, LOGO_COLEGIO } from "@/lib/constants";

type LogoVariant = "cppem" | "colegio";

interface LogoProps {
  /** Qual logo exibir. Padrão: cppem. */
  variant?: LogoVariant;
  /** Altura da imagem do logo (classe Tailwind, ex.: "h-10"). */
  className?: string;
  /** Exibe o nome do grupo ao lado do logo. */
  withWordmark?: boolean;
  /** Cor do wordmark (sobre fundo escuro use claro). */
  wordmarkClassName?: string;
}

const SRC: Record<LogoVariant, { src: string; alt: string }> = {
  cppem: { src: LOGO_CPPEM, alt: "CPPEM" },
  colegio: { src: LOGO_COLEGIO, alt: "Colégio CPPEM" },
};

/**
 * Logo oficial (original dos brandbooks CPPEM / Colégio).
 * Arquivos locais em /public/logos (480x480), já otimizados.
 */
export default function Logo({
  variant = "cppem",
  className = "h-10",
  withWordmark = false,
  wordmarkClassName = "text-white",
}: LogoProps) {
  const { src, alt } = SRC[variant];
  return (
    <span className="flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={480}
        height={480}
        decoding="async"
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
