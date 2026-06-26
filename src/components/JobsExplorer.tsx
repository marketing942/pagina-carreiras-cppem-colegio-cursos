"use client";

import { useMemo, useState } from "react";
import type { Job } from "@/lib/types";
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
        new Set(jobs.map((j) => j.unit).filter(Boolean) as string[])
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
      if (filters.unit && job.unit !== filters.unit) return false;
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
    <section id="vagas" className="bg-white py-16">
      <div className="container-page">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-brand-950 sm:text-4xl">
            Encontre sua vaga
          </h2>
          <p className="mt-2 text-brand-600">
            Busque pela oportunidade ideal para você fazer parte da nossa tropa.
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
          <p className="mt-12 text-center text-brand-500">
            Nenhuma vaga encontrada com os filtros selecionados.
          </p>
        ) : (
          <div className="mt-12 space-y-16">
            <JobGroup
              title="Encontre sua vaga de Trabalho"
              subtitle="Vagas administrativas, comerciais, marketing, tecnologia, pedagógico, serviços gerais e demais funções."
              jobs={trabalho}
            />
            <JobGroup
              title="Encontre sua vaga de Professor"
              subtitle="Vagas para professores, instrutores, tutores e mentores ligados diretamente à docência."
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
      <div className="mb-6 border-l-4 border-accent-500 pl-4">
        <h3 className="text-2xl font-bold text-brand-950">{title}</h3>
        <p className="mt-1 text-sm text-brand-600">{subtitle}</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
