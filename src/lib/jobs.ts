import { cache } from "react";
import { createPublicClient, HAS_SUPABASE } from "./supabase/public";
import type { Job } from "./types";

/** Destaques primeiro; dentro de cada grupo mantém a ordem recebida (mais novas antes). */
function featuredFirst(jobs: Job[]): Job[] {
  // Feito em JS para não depender da coluna `featured` existir no banco.
  return jobs
    .map((job, index) => ({ job, index }))
    .sort(
      (a, b) =>
        Number(b.job.featured ?? false) - Number(a.job.featured ?? false) ||
        a.index - b.index
    )
    .map((x) => x.job);
}

/** Busca todas as vagas com status 'aberta' (página pública). */
export async function getOpenJobs(): Promise<Job[]> {
  if (!HAS_SUPABASE) return [];
  try {
    const { data, error } = await createPublicClient()
      .from("jobs")
      .select("*")
      .eq("status", "aberta")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar vagas abertas:", error.message);
      return [];
    }
    return featuredFirst((data as Job[]) ?? []);
  } catch {
    return [];
  }
}

/**
 * Busca uma vaga pelo slug para a página de detalhes. Retorna vagas abertas e
 * também encerradas (para mostrar "vaga encerrada" em vez de um 404 quando
 * alguém abre um link antigo). Rascunhos e pausadas nunca são públicos.
 *
 * `cache` evita consultar duas vezes na mesma requisição (metadata + página).
 */
export const getJobBySlug = cache(async (slug: string): Promise<Job | null> => {
  if (!HAS_SUPABASE) return null;
  try {
    const { data, error } = await createPublicClient()
      .from("jobs")
      .select("*")
      .eq("slug", slug)
      .in("status", ["aberta", "encerrada"])
      .maybeSingle();

    if (error) {
      console.error("Erro ao buscar vaga:", error.message);
      return null;
    }
    return (data as Job) ?? null;
  } catch {
    return null;
  }
});

/** Vagas abertas parecidas com a informada (mesma categoria e área primeiro). */
export async function getRelatedOpenJobs(job: Job, limit = 3): Promise<Job[]> {
  const area = (j: Job) => (j.category === "professor" ? j.discipline : j.department);
  const score = (j: Job) =>
    (j.category === job.category ? 2 : 0) + (area(j) && area(j) === area(job) ? 1 : 0);

  const open = (await getOpenJobs()).filter((j) => j.id !== job.id);
  return open
    .map((j, index) => ({ j, index }))
    .sort((a, b) => score(b.j) - score(a.j) || a.index - b.index)
    .slice(0, limit)
    .map((x) => x.j);
}

/** Slug e data de atualização das vagas abertas, para o sitemap. */
export async function getSitemapJobs(): Promise<{ slug: string; updated_at: string }[]> {
  if (!HAS_SUPABASE) return [];
  try {
    const { data, error } = await createPublicClient()
      .from("jobs")
      .select("slug, updated_at")
      .eq("status", "aberta");
    if (error) return [];
    return (data as { slug: string; updated_at: string }[]) ?? [];
  } catch {
    return [];
  }
}
