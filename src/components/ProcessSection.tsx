import type { ContentItem } from "@/lib/types";

/** "Como funciona": as etapas, do clique em "Candidatar-se" até o contato (editáveis no admin). */
export default function ProcessSection({ steps }: { steps: ContentItem[] }) {
  return (
    <section id="como-funciona" className="scroll-mt-20 py-14 sm:py-20" aria-labelledby="como-funciona-titulo">
      <div className="container-page">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="eyebrow">Passo a passo</span>
          <h2 id="como-funciona-titulo" className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
            Como funciona o processo seletivo
          </h2>
          <p className="mt-3 text-inksoft">Entenda o que acontece desde a sua candidatura.</p>
        </div>

        <ol className={`grid gap-5 sm:grid-cols-2 ${steps.length >= 4 ? "lg:grid-cols-4" : steps.length === 3 ? "lg:grid-cols-3" : ""}`}>
          {steps.map((step, i) => (
            <li key={`${step.title}-${i}`} className="card flex flex-col p-6">
              <span
                aria-hidden
                className="grid h-11 w-11 place-items-center rounded-full font-display text-lg font-extrabold text-brand-950"
                style={{ background: "linear-gradient(150deg, #f0dcb0, #c9ae7a 55%, #af9256)" }}
              >
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-extrabold text-ink">
                <span className="sr-only">Passo {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-inksoft">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
