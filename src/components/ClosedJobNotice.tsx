import Link from "next/link";
import type { Job } from "@/lib/types";
import { categoryLabel } from "@/lib/constants";
import Icon from "./Icon";
import JobCard from "./JobCard";
import TrackedLink from "./TrackedLink";

interface ClosedJobNoticeProps {
  job: Job;
  /** Vagas abertas parecidas, para a pessoa não sair de mãos vazias. */
  related: Job[];
  whatsappUrl: string | null;
}

/** Página de uma vaga já encerrada: explica o que houve e leva às vagas abertas. */
export default function ClosedJobNotice({ job, related, whatsappUrl }: ClosedJobNoticeProps) {
  return (
    <div>
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 py-12 text-white sm:py-16">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="container-page relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            Vaga encerrada · {categoryLabel(job.category)}
          </span>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">{job.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-brand-100">
            Esta vaga já foi preenchida ou encerrada e não recebe mais candidaturas. Mas há outras
            oportunidades abertas no CPPEM.
          </p>
          <Link href="/carreiras#vagas" className="btn-primary mt-7">
            Ver vagas abertas
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="h-8 -mt-8 rounded-t-[36px] bg-canvas relative" />

      <section className="container-page pb-16 pt-2" aria-labelledby="outras-vagas">
        {related.length > 0 ? (
          <>
            <h2 id="outras-vagas" className="text-2xl font-extrabold text-ink">
              Outras vagas abertas que podem te interessar
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <JobCard key={r.id} job={r} />
              ))}
            </div>
          </>
        ) : (
          <div className="card p-8 text-center">
            <h2 id="outras-vagas" className="text-xl font-extrabold text-ink">
              No momento não há outras vagas abertas
            </h2>
            <p className="mt-2 text-inksoft">Novas oportunidades aparecem aqui assim que forem abertas.</p>
          </div>
        )}

        {whatsappUrl && (
          <div className="card mt-10 flex flex-col items-start justify-between gap-5 p-7 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-goldsoft text-goldink">
                <Icon name="chat" className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-ink">Receba as próximas vagas em primeira mão</h3>
                <p className="mt-1 text-sm text-inksoft">
                  Entre no nosso grupo de WhatsApp e seja avisado(a) quando abrirmos novas oportunidades.
                </p>
              </div>
            </div>
            <TrackedLink
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              event="whatsapp_grupo"
              eventProps={{ local: "vaga_encerrada" }}
              className="btn-primary shrink-0"
            >
              Entrar no grupo
              <span className="sr-only"> (abre em nova aba)</span>
            </TrackedLink>
          </div>
        )}
      </section>
    </div>
  );
}
