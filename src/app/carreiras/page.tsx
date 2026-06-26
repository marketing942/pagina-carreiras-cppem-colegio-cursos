import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import JobsExplorer from "@/components/JobsExplorer";
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
        <StatsSection settings={settings} />
        <JobsExplorer jobs={jobs} />
        <AboutSection settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
