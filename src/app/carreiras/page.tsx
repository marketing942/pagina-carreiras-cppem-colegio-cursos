import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import JobsExplorer from "@/components/JobsExplorer";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import ConnectSection from "@/components/ConnectSection";
import { getOpenJobs } from "@/lib/jobs";
import { getSettings } from "@/lib/settings";
import type { RawParams } from "@/lib/filter-url";

export const revalidate = 60;

interface PageProps {
  searchParams: Promise<RawParams>;
}

export default async function CarreirasPage({ searchParams }: PageProps) {
  const [jobs, settings, params] = await Promise.all([
    getOpenJobs(),
    getSettings(),
    searchParams,
  ]);

  const areasCount = new Set(
    jobs.map((j) =>
      j.category === "professor" ? j.discipline : j.department
    )
  ).size;

  return (
    <>
      <Header formUrl={settings.form_url} />
      <main>
        <Hero
          openJobsCount={jobs.length}
          areasCount={areasCount}
          stats={[settings.stat_years, settings.stat_students, settings.stat_team, settings.stat_extra].filter(
            Boolean
          ) as string[]}
        />
        <JobsExplorer jobs={jobs} initialParams={params} />
        <AboutSection settings={settings} />
        <ConnectSection whatsappUrl={settings.whatsapp_group_url} linkedinUrl={settings.linkedin_url} />
      </main>
      <Footer settings={settings} />
      <ExitIntentPopup whatsappUrl={settings.whatsapp_group_url} />
    </>
  );
}
