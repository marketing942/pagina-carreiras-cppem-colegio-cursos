import { createClient } from "./supabase/server";
import type { Job } from "./types";

const HAS_SUPABASE =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Busca todas as vagas com status 'aberta' (página pública). */
export async function getOpenJobs(): Promise<Job[]> {
  if (!HAS_SUPABASE) return [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("status", "aberta")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar vagas abertas:", error.message);
      return [];
    }
    return (data as Job[]) ?? [];
  } catch {
    return [];
  }
}

/** Busca uma vaga aberta pelo slug (página de detalhes). */
export async function getJobBySlug(slug: string): Promise<Job | null> {
  if (!HAS_SUPABASE) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("slug", slug)
    .eq("status", "aberta")
    .maybeSingle();

  if (error) {
    console.error("Erro ao buscar vaga:", error.message);
    return null;
  }
  return (data as Job) ?? null;
}
