import type { Metadata } from "next";
import { BiomarkerExplorer, fixtureRecords } from "@/components/biomarker-explorer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { fetchEvidence } from "@/lib/api";

export const metadata: Metadata = {
  title: "Evidence | ACBDT",
  description: "Inspect source-linked cancer biomarker evidence and its scientific review state in ACBDT.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function EvidencePage({ searchParams }: { searchParams: SearchParams }) {
  const [params, evidence] = await Promise.all([searchParams, fetchEvidence()]);
  const read = (key: string) => typeof params[key] === "string" ? params[key] : undefined;
  const initialFilters = { q: read("q"), country: read("country"), cancer: read("cancer"), entity: read("entity"), status: read("status"), role: read("role") };

  return (
    <main className="internal-page">
      <SiteHeader />
      <section className="page-intro evidence-intro">
        <p className="section-kicker">Evidence records</p>
        <h1>See the finding.<br /><em>See how far it has been reviewed.</em></h1>
        <p>Each result exposes its cohort geography, assay, clinical role, and review state. Synthetic fixtures remain clearly marked until reviewer-approved evidence is published.</p>
      </section>
      <BiomarkerExplorer initialFilters={initialFilters} records={evidence.records.length ? evidence.records : fixtureRecords} dataSource={evidence.source} sourceMessage={evidence.message} />
      <SiteFooter />
    </main>
  );
}
