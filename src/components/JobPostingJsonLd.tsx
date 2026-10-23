import type { Job, SiteSettings } from "@/lib/types";
import { getSiteUrl, SITE_NAME } from "@/lib/site";
import { looksLikeHtml, sanitizeHtml } from "@/lib/sanitize";

/** Texto da vaga em HTML (campos podem ser texto simples ou HTML do editor). */
function toHtml(content?: string | null): string {
  if (!content) return "";
  if (looksLikeHtml(content)) return sanitizeHtml(content);
  return `<p>${content.replace(/\n/g, "<br>")}</p>`;
}

function buildDescription(job: Job): string {
  const parts: string[] = [];
  const add = (heading: string, content?: string | null) => {
    const html = toHtml(content);
    if (html) parts.push(`<h3>${heading}</h3>${html}`);
  };
  if (job.description) parts.push(toHtml(job.description));
  add("Responsabilidades", job.responsibilities);
  add("Requisitos e qualificações", job.requirements);
  add("Benefícios", job.benefits);
  return parts.join("") || `<p>${job.short_description ?? job.title}</p>`;
}

/**
 * Dados estruturados de vaga (schema.org/JobPosting). É isso que permite às
 * vagas aparecerem no Google Vagas. Só vagas ABERTAS geram o bloco.
 */
export default function JobPostingJsonLd({ job, settings }: { job: Job; settings: SiteSettings }) {
  if (job.status !== "aberta") return null;

  const base = getSiteUrl();
  const [city, region] = job.location.split(/\s*[-–,]\s*/);
  const remote = job.work_type === "home_office";

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: buildDescription(job),
    datePosted: job.created_at,
    directApply: false,
    url: `${base}/carreiras/${job.slug}`,
    identifier: { "@type": "PropertyValue", name: SITE_NAME, value: job.slug },
    hiringOrganization: {
      "@type": "Organization",
      name: settings.company_name,
      sameAs: base,
      logo: `${base}/logos/cppem.png`,
    },
  };

  if (remote) {
    data.jobLocationType = "TELECOMMUTE";
    data.applicantLocationRequirements = { "@type": "Country", name: "BR" };
  } else {
    data.jobLocation = {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: city || job.location,
        ...(region ? { addressRegion: region } : {}),
        addressCountry: "BR",
      },
    };
  }

  // "<" escapado: impede que o conteúdo da vaga feche a tag <script> por engano
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
