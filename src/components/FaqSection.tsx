import Link from "next/link";
import type { ContentItem } from "@/lib/types";
import Icon from "./Icon";

/**
 * Perguntas frequentes. Usa <details>/<summary> nativos: abre e fecha com
 * teclado e funciona com leitor de tela, sem precisar de JavaScript.
 */
export default function FaqSection({ items }: { items: ContentItem[] }) {
  return (
    <section id="perguntas" className="scroll-mt-20 bg-canvas2 py-14 sm:py-20" aria-labelledby="perguntas-titulo">
      <div className="container-page max-w-3xl">
        <div className="mb-8 text-center">
          <span className="eyebrow">Dúvidas</span>
          <h2 id="perguntas-titulo" className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
            Perguntas frequentes
          </h2>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <details key={`${item.title}-${i}`} className="group card px-5 py-4 open:shadow-lift">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg font-bold text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 [&::-webkit-details-marker]:hidden">
                {item.title}
                <Icon name="arrow" className="h-5 w-5 shrink-0 rotate-90 text-goldink transition-transform group-open:-rotate-90" />
              </summary>
              <p className="mt-3 leading-relaxed text-inksoft">{item.text}</p>
            </details>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-inkmuted">
          Quer saber como tratamos os seus dados?{" "}
          <Link href="/privacidade" className="font-semibold text-goldink underline underline-offset-4 hover:text-ink">
            Leia a Política de Privacidade
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
