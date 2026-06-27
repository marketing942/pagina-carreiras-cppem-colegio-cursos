"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { createClient } from "@/lib/supabase/client";
import { categoryLabel, statusLabel, STATUS_BADGE } from "@/lib/constants";
import type { Job, JobStatus } from "@/lib/types";

export default function VagasPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const supabase = createClient();

  // Recarrega a lista (usado após mutações).
  async function refetch() {
    const { data } = await supabase
      .from("jobs")
      .select("*")
      .order("updated_at", { ascending: false });
    setJobs((data as Job[]) ?? []);
  }

  useEffect(() => {
    createClient()
      .from("jobs")
      .select("*")
      .order("updated_at", { ascending: false })
      .then(({ data }) => {
        setJobs((data as Job[]) ?? []);
        setLoading(false);
      });
  }, []);

  async function updateStatus(id: string, status: JobStatus) {
    setBusy(id);
    await supabase.from("jobs").update({ status }).eq("id", id);
    await refetch();
    setBusy(null);
  }

  async function toggleFeatured(id: string, featured: boolean) {
    setBusy(id);
    await supabase.from("jobs").update({ featured }).eq("id", id);
    await refetch();
    setBusy(null);
  }

  async function remove(id: string) {
    if (!confirm("Tem certeza que deseja excluir esta vaga? Esta ação não pode ser desfeita.")) {
      return;
    }
    setBusy(id);
    await supabase.from("jobs").delete().eq("id", id);
    await refetch();
    setBusy(null);
  }

  return (
    <AdminLayout title="Vagas">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-brand-600">
          {jobs.length} vaga(s) cadastrada(s)
        </p>
        <Link href="/admin/vagas/nova" className="btn-primary !py-2">
          + Nova vaga
        </Link>
      </div>

      {loading ? (
        <p className="text-brand-500">Carregando...</p>
      ) : jobs.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-brand-600">Nenhuma vaga cadastrada ainda.</p>
          <Link href="/admin/vagas/nova" className="btn-primary mt-4">
            Cadastrar primeira vaga
          </Link>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[840px] text-left text-sm">
            <thead className="border-b border-brand-100 bg-brand-50 text-xs uppercase tracking-wide text-brand-500">
              <tr>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Setor / Disciplina</th>
                <th className="px-4 py-3">Unidade</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Atualizada</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-brand-50/50">
                  <td className="px-4 py-3 font-medium text-brand-900">
                    {job.featured && (
                      <span title="Vaga em destaque" className="mr-1">
                        ⭐
                      </span>
                    )}
                    {job.title}
                  </td>
                  <td className="px-4 py-3 text-brand-600">
                    {categoryLabel(job.category)}
                  </td>
                  <td className="px-4 py-3 text-brand-600">
                    {job.department || job.discipline || "—"}
                  </td>
                  <td className="px-4 py-3 text-brand-600">
                    {job.unit || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        STATUS_BADGE[job.status]
                      }`}
                    >
                      {statusLabel(job.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-brand-500">
                    {new Date(job.updated_at).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2 whitespace-nowrap">
                      <Link
                        href={`/admin/vagas/${job.id}/editar`}
                        className="rounded-md border border-brand-200 px-2.5 py-1 text-xs font-medium text-brand-700 hover:bg-brand-50"
                      >
                        Editar
                      </Link>
                      <button
                        disabled={busy === job.id}
                        onClick={() => toggleFeatured(job.id, !job.featured)}
                        className={`rounded-md border px-2.5 py-1 text-xs font-medium ${
                          job.featured
                            ? "border-accent-500 bg-accent-50 text-brand-800 hover:bg-accent-100"
                            : "border-brand-200 text-brand-700 hover:bg-brand-50"
                        }`}
                      >
                        {job.featured ? "Remover destaque" : "Destacar"}
                      </button>
                      {job.status === "aberta" ? (
                        <button
                          disabled={busy === job.id}
                          onClick={() => updateStatus(job.id, "encerrada")}
                          className="rounded-md border border-brand-200 px-2.5 py-1 text-xs font-medium text-brand-700 hover:bg-brand-50"
                        >
                          Encerrar
                        </button>
                      ) : (
                        <button
                          disabled={busy === job.id}
                          onClick={() => updateStatus(job.id, "aberta")}
                          className="rounded-md border border-green-200 px-2.5 py-1 text-xs font-medium text-green-700 hover:bg-green-50"
                        >
                          Reabrir
                        </button>
                      )}
                      <button
                        disabled={busy === job.id}
                        onClick={() => remove(job.id)}
                        className="rounded-md border border-red-200 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
