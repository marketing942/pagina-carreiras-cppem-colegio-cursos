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
  form_embed_url: string;
  show_form_embed: boolean;
  instagram_url: string | null;
  youtube_url: string | null;
  tiktok_url: string | null;
  linkedin_url: string | null;
  whatsapp_url: string | null;
  address: string | null;
  footer_description: string | null;
  created_at: string;
  updated_at: string;
}
