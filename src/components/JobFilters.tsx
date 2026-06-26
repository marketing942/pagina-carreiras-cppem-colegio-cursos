"use client";

import { CATEGORIES, WORK_TYPES } from "@/lib/constants";

export interface FilterState {
  search: string;
  category: string;
  department: string;
  unit: string;
  workType: string;
  location: string;
}

interface JobFiltersProps {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onClear: () => void;
  departments: string[];
  units: string[];
  locations: string[];
}

/** Barra de busca e filtros da página pública (client-side). */
export default function JobFilters({
  filters,
  onChange,
  onClear,
  departments,
  units,
  locations,
}: JobFiltersProps) {
  const set = (key: keyof FilterState, value: string) =>
    onChange({ ...filters, [key]: value });

  return (
    <div className="card p-5 sm:p-6">
      {/* Busca */}
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-400">
          🔍
        </span>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => set("search", e.target.value)}
          placeholder="Buscar por cargo, área ou palavra-chave..."
          className="input !pl-11"
          aria-label="Buscar vagas"
        />
      </div>

      {/* Filtros */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <select
          value={filters.category}
          onChange={(e) => set("category", e.target.value)}
          className="input"
          aria-label="Filtrar por tipo"
        >
          <option value="">Todos os tipos</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <select
          value={filters.department}
          onChange={(e) => set("department", e.target.value)}
          className="input"
          aria-label="Filtrar por setor"
        >
          <option value="">Todos os setores</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={filters.unit}
          onChange={(e) => set("unit", e.target.value)}
          className="input"
          aria-label="Filtrar por unidade"
        >
          <option value="">Todas as unidades</option>
          {units.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>

        <select
          value={filters.workType}
          onChange={(e) => set("workType", e.target.value)}
          className="input"
          aria-label="Filtrar por tipo de vaga"
        >
          <option value="">Presencial / Híbrido / Home Office</option>
          {WORK_TYPES.map((w) => (
            <option key={w.value} value={w.value}>
              {w.label}
            </option>
          ))}
        </select>

        <select
          value={filters.location}
          onChange={(e) => set("location", e.target.value)}
          className="input"
          aria-label="Filtrar por local"
        >
          <option value="">Todos os locais</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex justify-end">
        <button onClick={onClear} className="btn-secondary !py-2 text-sm">
          Limpar filtros
        </button>
      </div>
    </div>
  );
}
