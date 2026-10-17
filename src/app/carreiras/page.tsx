import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import JobsExplorer from "@/components/JobsExplorer";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import ConnectSection from "@/components/ConnectSection";
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
        <Hero
          openJobsCount={jobs.length}
          areasCount={areasCount}
          stats={[settings.stat_years, settings.stat_students, settings.stat_team, settings.stat_extra].filter(
            Boolean
          ) as string[]}
        />
        <JobsExplorer jobs={jobs} />
        <AboutSection settings={settings} />
        <ConnectSection whatsappUrl={settings.whatsapp_group_url} linkedinUrl={settings.linkedin_url} />
      </main>
      <Footer settings={settings} />
      <ExitIntentPopup whatsappUrl={settings.whatsapp_group_url} />
    </>
  );
}
