import Link from "next/link";
import type { Job } from "@/lib/types";
import { parseUnits, workTypeLabel } from "@/lib/constants";
import Icon from "./Icon";

interface JobCardProps {
  job: Job;
}

/** Card de vaga: leve, com o essencial à vista e um convite claro para abrir. */
export default function JobCard({ job }: JobCardProps) {
  const tag = job.category === "professor" ? job.discipline : job.department;
  const workType = workTypeLabel(job.work_type);
  const units = parseUnits(job.unit);
  const isTeacher = job.category === "professor";

  return (
    <Link href={`/carreiras/${job.slug}`} className="card card-hover group flex flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${
            isTeacher ? "bg-canvas2 text-inksoft" : "bg-goldsoft text-goldink"
          }`}
        >
          <Icon name={isTeacher ? "cap" : "briefcase"} />
        </span>
        {job.featured && (
          <span className="inline-flex items-center gap-1 rounded-full bg-goldsoft px-3 py-1 text-xs font-bold text-goldink">
            <Icon name="star" className="h-3.5 w-3.5" /> Destaque
          </span>
        )}
      </div>

      <h3 className="mt-4 text-lg font-bold leading-snug text-ink transition-colors group-hover:text-goldink">
        {job.title}
      </h3>

      {job.short_description && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-inksoft">{job.short_description}</p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {tag && <span className="rounded-full bg-canvas2 px-3 py-1 text-xs font-semibold text-inksoft">{tag}</span>}
        {workType && (
          <span className="rounded-full bg-canvas2 px-3 py-1 text-xs font-semibold text-goldink">{workType}</span>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4 text-sm">
        <span className="flex min-w-0 items-center gap-1.5 text-inksoft">
          <Icon name="pin" className="h-4 w-4 shrink-0" />
          <span className="truncate">
            {job.location}
            {units.length === 1 ? ` · ${units[0]}` : units.length > 1 ? ` · ${units.length} unidades` : ""}
          </span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-goldink">
          Ver vaga
          <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
