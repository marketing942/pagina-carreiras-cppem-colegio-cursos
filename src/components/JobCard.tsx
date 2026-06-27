import Link from "next/link";
import type { Job } from "@/lib/types";
import { workTypeLabel } from "@/lib/constants";

interface JobCardProps {
  job: Job;
}

/** Card de vaga exibido nas listagens da página pública. */
export default function JobCard({ job }: JobCardProps) {
  const tag = job.category === "professor" ? job.discipline : job.department;
  const workType = workTypeLabel(job.work_type);

  return (
    <Link
      href={`/carreiras/${job.slug}`}
      className="card group flex flex-col border-brand-200 bg-brand-50 p-6 hover:bg-white"
    >
      <div className="flex flex-wrap items-center gap-2">
        {tag && (
          <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
            {tag}
          </span>
        )}
        {workType && (
          <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-600">
            {workType}
          </span>
        )}
      </div>

      <h3 className="mt-4 text-lg font-bold text-brand-950 group-hover:text-brand-700">
        {job.title}
      </h3>

      {job.short_description && (
        <p className="mt-2 line-clamp-2 text-sm text-brand-600">
          {job.short_description}
        </p>
      )}

      <dl className="mt-4 space-y-1 text-sm text-brand-600">
        <div className="flex items-center gap-2">
          <span aria-hidden>📍</span>
          <span>{job.location}</span>
        </div>
        {job.unit && (
          <div className="flex items-center gap-2">
            <span aria-hidden>🏢</span>
            <span>{job.unit}</span>
          </div>
        )}
      </dl>

      <span className="btn-primary mt-5 w-full justify-center">
        Ver detalhes
      </span>
    </Link>
  );
}
