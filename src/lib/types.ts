export type JobCategory = "trabalho" | "professor";
export type JobStatus = "aberta" | "encerrada" | "pausada" | "rascunho";
export type WorkType = "presencial" | "hibrido" | "home_office";

export interface Job {
  id: string;
  title: string;
  slug: string;
  category: JobCategory;
  department: string | null;
  discipline: string | null;
  segment: string | null;
  work_type: WorkType | null;
  unit: string | null;
  location: string;
  expected_schedule: string | null;
  status: JobStatus;
  short_description: string | null;
  description: string | null;
  responsibilities: string | null;
  requirements: string | null;
  differentials: string | null;
  benefits: string | null;
  // Link de candidatura específico desta vaga (opcional).
  // Quando vazio, usa o link geral em site_settings.form_url.
  apply_url: string | null;
  created_at: string;
  updated_at: string;
}

export type JobInput = Omit<Job, "id" | "created_at" | "updated_at">;

export interface SiteSettings {
  id: string;
  company_name: string;
  about_text: string | null;
  stat_years: string | null;
  stat_students: string | null;
  stat_team: string | null;
  stat_extra: string | null;
  form_url: string;
  // Linktree de cada marca (reúne todas as redes sociais)
  linktree_cppem_url: string | null;
  linktree_colegio_url: string | null;
  linktree_unicive_url: string | null;
  // LinkedIn é único para o grupo
  linkedin_url: string | null;
  // Grupo de WhatsApp para anúncios de vagas
  whatsapp_group_url: string | null;
  address: string | null;
  cnpj: string | null;
  maps_url: string | null;
  footer_description: string | null;
  created_at: string;
  updated_at: string;
}
