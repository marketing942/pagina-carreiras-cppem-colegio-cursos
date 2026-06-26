import Link from "next/link";
import type { Job } from "@/lib/types";
import { categoryLabel, workTypeLabel } from "@/lib/constants";
import { looksLikeHtml, sanitizeHtml } from "@/lib/sanitize";

interface JobDetailsProps {
  job: Job;
  formUrl: string;
}

function Section({ title, content }: { title: string; content?: string | null }) {
  if (!content) return null;
  return (
    <div>
      <h3 className="text-lg font-bold text-brand-950">{title}</h3>
      {looksLikeHtml(content) ? (
        <div
          className="richtext mt-2 leading-relaxed text-brand-700"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
        />
      ) : (
        <p className="mt-2 whitespace-pre-line leading-relaxed text-brand-700">
          {content}
        </p>
      )}
    </div>
  );
}

/** Conteúdo da página de detalhes de uma vaga. */
export default function JobDetails({ job, formUrl }: JobDetailsProps) {
  const meta: { label: string; value?: string | null }[] = [
    { label: "Tipo", value: categoryLabel(job.category) },
    {
      label: job.category === "professor" ? "Categoria" : "Setor",
      value: job.category === "professor" ? job.discipline : job.department,
    },
    { label: "Segmento", value: job.segment },
    { label: "Modelo", value: workTypeLabel(job.work_type) },
    { label: "Unidade", value: job.unit },
    { label: "Local", value: job.location },
    { label: "Horário previsto", value: job.expected_schedule },
  ].filter((m) => !!m.value);

  return (
    <div className="bg-white">
      {/* Cabeçalho da vaga */}
      <div className="bg-brand-950 py-12 text-white">
        <div className="container-page">
          <Link
            href="/carreiras#vagas"
            className="text-sm text-brand-200 transition-colors hover:text-white"
          >
            ← Voltar para todas as vagas
          </Link>
          <h1 className="mt-4 max-w-3xl text-3xl font-black sm:text-4xl">
            {job.title}
          </h1>
          {job.short_description && (
            <p className="mt-3 max-w-2xl text-brand-100">
              {job.short_description}
            </p>
          )}
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6"
          >
            Candidatar-se agora
          </a>
        </div>
      </div>

      <div className="container-page grid gap-10 py-12 lg:grid-cols-3">
        {/* Conteúdo principal */}
        <div className="space-y-8 lg:col-span-2">
          <Section title="Descrição da vaga" content={job.description} />
          <Section title="Responsabilidades" content={job.responsibilities} />
          <Section
            title="Requisitos e Qualificações"
            content={job.requirements}
          />
          <Section title="Benefícios" content={job.benefits} />
        </div>

        {/* Painel lateral fixo */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="card p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-500">
                Informações
              </h2>
              <dl className="mt-4 space-y-3">
                {meta.map((m) => (
                  <div key={m.label} className="flex justify-between gap-4">
                    <dt className="text-sm text-brand-500">{m.label}</dt>
                    <dd className="text-right text-sm font-medium text-brand-900">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full"
            >
              Candidatar-se agora
            </a>
            <p className="text-center text-xs text-brand-500">
              Você será direcionado ao nosso formulário de candidatura.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
