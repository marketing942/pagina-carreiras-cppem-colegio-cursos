import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import JobChart from "@/components/JobChart";
import JobsExplorer from "@/components/JobsExplorer";
import NotionFormEmbed from "@/components/NotionFormEmbed";
import { getOpenJobs } from "@/lib/jobs";
import { getSettings } from "@/lib/settings";

export const revalidate = 60;

export default async function CarreirasPage() {
  const [jobs, settings] = await Promise.all([getOpenJobs(), getSettings()]);

  const areasCount = new Set(
    jobs.map((j) =>
      j.category === "professor" ? j.discipline : j.department
    )
  ).size;

  return (
    <>
      <Header formUrl={settings.form_url} />
      <main>
        <Hero openJobsCount={jobs.length} areasCount={areasCount} />
        <AboutSection settings={settings} />
        <StatsSection settings={settings} />
        <JobChart jobs={jobs} />
        <JobsExplorer jobs={jobs} />
        <NotionFormEmbed
          embedUrl={settings.form_embed_url}
          enabled={settings.show_form_embed}
        />
      </main>
      <Footer settings={settings} />
    </>
  );
}
