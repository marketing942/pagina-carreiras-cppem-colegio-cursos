import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobDetails from "@/components/JobDetails";
import { getJobBySlug } from "@/lib/jobs";
import { getSettings } from "@/lib/settings";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return { title: "Vaga não encontrada | CPPEM" };
  return {
    title: `${job.title} | Carreiras CPPEM`,
    description: job.short_description ?? undefined,
  };
}

export default async function JobPage({ params }: PageProps) {
  const { slug } = await params;
  const [job, settings] = await Promise.all([
    getJobBySlug(slug),
    getSettings(),
  ]);

  if (!job) notFound();

  return (
    <>
      <Header formUrl={settings.form_url} />
      <main>
        <JobDetails job={job} formUrl={settings.form_url} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
