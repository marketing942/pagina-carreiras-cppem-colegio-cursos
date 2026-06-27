import type { JobCategory, JobStatus, WorkType } from "./types";

export const DEPARTMENTS = [
  "Marketing",
  "Comercial",
  "Tecnologia",
  "Pedagógico",
  "Serviços Gerais",
  "Administrativo",
  "Financeiro",
] as const;

export const WORK_TYPES: { value: WorkType; label: string }[] = [
  { value: "presencial", label: "Presencial" },
  { value: "hibrido", label: "Híbrido" },
  { value: "home_office", label: "Home Office" },
  { value: "terceirizado", label: "Terceirizado" },
];

export const UNITS = [
  "CPPEM Concursos",
  "Colégio CPPEM",
  "Unicive Caruaru",
] as const;

export const DISCIPLINE_CATEGORIES = ["Polivalente", "de Disciplina"] as const;

export const CATEGORIES: { value: JobCategory; label: string }[] = [
  { value: "trabalho", label: "Trabalho" },
  { value: "professor", label: "Professor" },
];

export const STATUSES: { value: JobStatus; label: string }[] = [
  { value: "aberta", label: "Aberta" },
  { value: "encerrada", label: "Encerrada" },
  { value: "pausada", label: "Pausada" },
  { value: "rascunho", label: "Rascunho" },
];

export const DEFAULT_LOCATION = "Caruaru-PE";

/** Uma vaga pode ter mais de uma unidade, separadas por vírgula. */
export function parseUnits(unit?: string | null): string[] {
  if (!unit) return [];
  return unit
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean);
}

// Logos oficiais (originais dos brandbooks CPPEM e Colégio)
export const LOGO_CPPEM =
  "https://raw.githubusercontent.com/marketing942/fotos-dos-bots/main/LOGO%20CPPEM.png";
export const LOGO_COLEGIO =
  "https://raw.githubusercontent.com/marketing942/fotos-dos-bots/main/LOGO%20COLE%CC%81GIO.png";

export function workTypeLabel(value?: WorkType | null): string {
  return WORK_TYPES.find((w) => w.value === value)?.label ?? "";
}

export function statusLabel(value?: JobStatus | null): string {
  return STATUSES.find((s) => s.value === value)?.label ?? "";
}

export function categoryLabel(value?: JobCategory | null): string {
  return CATEGORIES.find((c) => c.value === value)?.label ?? "";
}

export const STATUS_BADGE: Record<JobStatus, string> = {
  aberta: "bg-green-100 text-green-700",
  encerrada: "bg-gray-200 text-gray-600",
  pausada: "bg-yellow-100 text-yellow-700",
  rascunho: "bg-blue-100 text-blue-700",
};
