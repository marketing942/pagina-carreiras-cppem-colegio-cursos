"use client";

import { Analytics } from "@vercel/analytics/next";

/**
 * Medição de visitas (Vercel Web Analytics): sem cookies e sem identificar a pessoa.
 * O painel /admin fica de fora, para o uso interno da equipe não entrar na conta.
 */
export default function AnalyticsClient() {
  return <Analytics beforeSend={(event) => (new URL(event.url).pathname.startsWith("/admin") ? null : event)} />;
}
