"use client";

import { useMemo, useState } from "react";
import type { Job } from "@/lib/types";
import { parseUnits } from "@/lib/constants";
import JobCard from "./JobCard";
import JobFilters, { type FilterState } from "./JobFilters";

interface JobsExplorerProps {
  jobs: Job[];
}

const EMPTY: FilterState = {
  search: "",
  category: "",
  department: "",
  unit: "",
  workType: "",
  location: "",
};

/**
 * Componente cliente que gerencia busca/filtros e agrupa as vagas em
 * dois blocos: "Trabalho" e "Professor".
 */
export default function JobsExplorer({ jobs }: JobsExplorerProps) {
  const [filters, setFilters] = useState<FilterState>(EMPTY);

  // Opções dinâmicas a partir das vagas disponíveis
  const departments = useMemo(
    () =>
      Array.from(
        new Set(jobs.map((j) => j.department).filter(Boolean) as string[])
      ).sort(),
    [jobs]
  );
  const units = useMemo(
    () =>
      Array.from(
        new Set(jobs.flatMap((j) => parseUnits(j.unit)))
      ).sort(),
    [jobs]
  );
  const locations = useMemo(
    () =>
      Array.from(
        new Set(jobs.map((j) => j.location).filter(Boolean) as string[])
      ).sort(),
    [jobs]
  );

  const filtered = useMemo(() => {
    const term = filters.search.trim().toLowerCase();
    return jobs.filter((job) => {
      if (filters.category && job.category !== filters.category) return false;
      if (filters.department && job.department !== filters.department)
        return false;
      if (filters.unit && !parseUnits(job.unit).includes(filters.unit))
        return false;
      if (filters.workType && job.work_type !== filters.workType) return false;
      if (filters.location && job.location !== filters.location) return false;
      if (term) {
        const haystack = [
          job.title,
          job.short_description,
          job.department,
          job.discipline,
          job.segment,
          job.unit,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });
  }, [jobs, filters]);

  const trabalho = filtered.filter((j) => j.category === "trabalho");
  const professor = filtered.filter((j) => j.category === "professor");


  return (
    <section id="vagas" className="scroll-mt-20 py-14 sm:py-20">
      <div className="container-page">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="eyebrow">Oportunidades</span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">Encontre sua vaga</h2>
          <p className="mt-3 text-inksoft">
            Busque a oportunidade ideal para você fazer parte da nossa equipe.
          </p>
        </div>

        <JobFilters
          filters={filters}
          onChange={setFilters}
          onClear={() => setFilters(EMPTY)}
          departments={departments}
          units={units}
          locations={locations}
        />

        {filtered.length === 0 ? (
          <div className="card mt-10 p-10 text-center text-inksoft">
            Nenhuma vaga encontrada com os filtros selecionados. Tente limpar a busca.
          </div>
        ) : (
          <div className="mt-12 space-y-14">
            <JobGroup
              title="Vagas de Trabalho"
              subtitle="Administrativo, comercial, marketing, tecnologia, pedagógico, serviços gerais e demais funções."
              jobs={trabalho}
            />
            <JobGroup
              title="Vagas de Professor"
              subtitle="Professores, instrutores, tutores e mentores ligados diretamente à docência."
              jobs={professor}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function JobGroup({
  title,
  subtitle,
  jobs,
}: {
  title: string;
  subtitle: string;
  jobs: Job[];
}) {
  if (jobs.length === 0) return null;
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h3 className="text-2xl font-extrabold text-ink">{title}</h3>
          <p className="mt-1 text-sm text-inksoft">{subtitle}</p>
        </div>
        <span className="rounded-full bg-goldsoft px-3 py-1 text-xs font-bold text-goldink">
          {jobs.length} {jobs.length === 1 ? "vaga" : "vagas"}
        </span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
