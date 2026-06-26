"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Job } from "@/lib/types";

interface JobChartProps {
  jobs: Job[];
}

/** Gráfico de barras: total de vagas abertas por área/setor. */
export default function JobChart({ jobs }: JobChartProps) {
  // Agrupa por setor (department) ou disciplina, quando professor.
  const counts = new Map<string, number>();
  for (const job of jobs) {
    const key =
      job.category === "professor"
        ? job.discipline || "Professores"
        : job.department || "Outros";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const data = Array.from(counts.entries())
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total);

  if (data.length === 0) return null;

  return (
    <section className="bg-white py-16">
      <div className="container-page">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-brand-950 sm:text-3xl">
            Vagas abertas por área
          </h2>
          <p className="mt-2 text-brand-600">
            Veja onde estão as oportunidades neste momento.
          </p>
        </div>

        <div className="card p-6">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#475569" }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12, fill: "#475569" }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(42,108,185,0.08)" }}
                  formatter={(value: number) => [`${value} vaga(s)`, "Total"]}
                />
                <Bar
                  dataKey="total"
                  fill="#2a6cb9"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={64}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
