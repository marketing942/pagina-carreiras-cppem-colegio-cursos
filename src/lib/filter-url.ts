import { slugify } from "./slug";
import { WORK_TYPES } from "./constants";
import type { FilterState } from "@/components/JobFilters";

/** Nomes dos parâmetros na URL (em português, para links legíveis). */
const KEYS = {
  search: "busca",
  category: "categoria",
  department: "setor",
  unit: "unidade",
  workType: "modelo",
  location: "local",
} as const;

export interface FilterOptions {
  departments: string[];
  units: string[];
  locations: string[];
}

export type RawParams = Record<string, string | string[] | undefined>;

const CATEGORY_VALUES = ["trabalho", "professor"];

const first = (v: string | string[] | undefined) =>
  (Array.isArray(v) ? v[0] : v) ?? "";

/** Acha a opção cujo slug bate com o valor da URL (ex.: "cppem-concursos"). */
const matchOption = (options: string[], raw: string) => {
  const target = slugify(raw);
  return target ? (options.find((o) => slugify(o) === target) ?? "") : "";
};

/** "home_office" ↔ "home-office" na URL. */
const workTypeToParam = (value: string) => value.replace(/_/g, "-");

/** Converte os parâmetros da URL em estado de filtros (ignora valores inválidos). */
export function filtersFromParams(
  params: RawParams,
  options: FilterOptions
): FilterState {
  const category = first(params[KEYS.category]).toLowerCase();
  const workType = first(params[KEYS.workType]).toLowerCase();

  return {
    search: first(params[KEYS.search]),
    category: CATEGORY_VALUES.includes(category) ? category : "",
    department: matchOption(options.departments, first(params[KEYS.department])),
    unit: matchOption(options.units, first(params[KEYS.unit])),
    workType:
      WORK_TYPES.find((w) => workTypeToParam(w.value) === workType)?.value ?? "",
    location: matchOption(options.locations, first(params[KEYS.location])),
  };
}

/**
 * Aplica os filtros a uma query string existente, preservando parâmetros que
 * não são nossos (ex.: utm_source de campanhas). Retorna a nova query string
 * (sem o "?").
 */
export function applyFiltersToSearch(
  currentSearch: string,
  filters: FilterState
): string {
  const params = new URLSearchParams(currentSearch);
  Object.values(KEYS).forEach((k) => params.delete(k));

  const set = (key: string, value: string) => {
    if (value.trim()) params.set(key, value.trim());
  };
  set(KEYS.category, filters.category);
  set(KEYS.department, slugify(filters.department));
  set(KEYS.unit, slugify(filters.unit));
  set(KEYS.workType, workTypeToParam(filters.workType));
  set(KEYS.location, slugify(filters.location));
  set(KEYS.search, filters.search);

  return params.toString();
}

/** Query string só com os filtros (para saber se há filtros ativos). */
export function filtersQuery(filters: FilterState): string {
  return applyFiltersToSearch("", filters);
}
