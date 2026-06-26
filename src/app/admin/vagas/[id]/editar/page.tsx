"use client";

import { use, useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminJobForm from "@/components/admin/AdminJobForm";
import { createClient } from "@/lib/supabase/client";
import type { Job } from "@/lib/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditarVagaPage({ params }: PageProps) {
  const { id } = use(params);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("jobs")
      .select("*")
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => {
        setJob((data as Job) ?? null);
        setLoading(false);
      });
  }, [id]);

  return (
    <AdminLayout title="Editar vaga">
      {loading ? (
        <p className="text-brand-500">Carregando...</p>
      ) : !job ? (
        <p className="text-red-600">Vaga não encontrada.</p>
      ) : (
        <AdminJobForm job={job} />
      )}
    </AdminLayout>
  );
}
