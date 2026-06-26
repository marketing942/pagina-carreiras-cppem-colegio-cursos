"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { createClient } from "@/lib/supabase/client";
import { categoryLabel, statusLabel, STATUS_BADGE } from "@/lib/constants";
import type { Job } from "@/lib/types";

export default function DashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setJobs((data as Job[]) ?? []);
        setLoading(false);
      });
  }, []);

  const stats = useMemo(() => {
    const open = jobs.filter((j) => j.status === "aberta");
    return {
      open: open.length,
      closed: jobs.filter((j) => j.status === "encerrada").length,
      trabalho: jobs.filter((j) => j.category === "trabalho").length,
      professor: jobs.filter((j) => j.category === "professor").length,
      openTrabalho: open.filter((j) => j.category === "trabalho").length,
      openProfessor: open.filter((j) => j.category === "professor").length,
    };
  }, [jobs]);

  // Vagas abertas por setor / disciplina
  const byArea = useMemo(() => {
    const counts = new Map<string, number>();
    for (const j of jobs.filter((j) => j.status === "aberta")) {
      const key =
        j.category === "professor"
          ? j.discipline || "Professores"
          : j.department || "Outros";
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [jobs]);

  const latest = jobs.slice(0, 5);

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <p className="text-brand-500">Carregando...</p>
      ) : (
        <div className="space-y-8">
          {/* Cards de métricas */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Vagas abertas" value={stats.open} accent />
            <StatCard label="Vagas encerradas" value={stats.closed} />
            <StatCard label="Vagas de Trabalho" value={stats.trabalho} />
            <StatCard label="Vagas de Professor" value={stats.professor} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Vagas abertas por área */}
            <div className="card p-6">
              <h2 className="mb-4 font-bold text-brand-950">
                Vagas abertas por área
              </h2>
              {byArea.length === 0 ? (
                <p className="text-sm text-brand-500">
                  Nenhuma vaga aberta no momento.
                </p>
              ) : (
                <ul className="space-y-3">
                  {byArea.map(([area, count]) => (
                    <li key={area}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="font-medium text-brand-800">
                          {area}
                        </span>
                        <span className="text-brand-500">{count}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-brand-100">
                        <div
                          className="h-full rounded-full bg-brand-500"
                          style={{
                            width: `${(count / stats.open) * 100}%`,
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Por tipo */}
            <div className="card p-6">
              <h2 className="mb-4 font-bold text-brand-950">
                Vagas abertas por tipo
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-brand-50 p-5 text-center">
                  <p className="text-3xl font-black text-brand-700">
                    {stats.openTrabalho}
                  </p>
                  <p className="text-sm text-brand-600">Trabalho</p>
                </div>
                <div className="rounded-xl bg-accent-50 p-5 text-center">
                  <p className="text-3xl font-black text-accent-600">
                    {stats.openProfessor}
                  </p>
                  <p className="text-sm text-brand-600">Professor</p>
                </div>
              </div>
            </div>
          </div>

          {/* Últimas vagas */}
          <div className="card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold text-brand-950">
                Últimas vagas cadastradas
              </h2>
              <Link
                href="/admin/vagas"
                className="text-sm font-medium text-brand-600 hover:text-brand-800"
              >
                Ver todas →
              </Link>
            </div>
            {latest.length === 0 ? (
              <p className="text-sm text-brand-500">
                Nenhuma vaga cadastrada ainda.
              </p>
            ) : (
              <ul className="divide-y divide-brand-100">
                {latest.map((job) => (
                  <li
                    key={job.id}
                    className="flex items-center justify-between py-3"
                  >
                    <div>
                      <p className="font-medium text-brand-900">{job.title}</p>
                      <p className="text-xs text-brand-500">
                        {categoryLabel(job.category)} ·{" "}
                        {job.department || job.discipline || "—"}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        STATUS_BADGE[job.status]
                      }`}
                    >
                      {statusLabel(job.status)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="card p-6">
      <p
        className={`text-4xl font-black ${
          accent ? "text-accent-500" : "text-brand-700"
        }`}
      >
        {value}
      </p>
      <p className="mt-1 text-sm text-brand-600">{label}</p>
    </div>
  );
}
