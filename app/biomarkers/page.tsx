import type { Metadata } from "next";
import { BiomarkerExplorer, fixtureRecords } from "@/components/biomarker-explorer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { fetchEvidence } from "@/lib/api";

export const metadata: Metadata = {
  title: "Biomarkers | ACBD",
  description: "Explore cancer biomarkers by entity type, cancer, African country, assay, clinical role and review state.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function BiomarkersPage({ searchParams }: { searchParams: SearchParams }) {
  const [params, evidence] = await Promise.all([searchParams, fetchEvidence()]);
  const read = (key: string) => typeof params[key] === "string" ? params[key] : undefined;
  const initialFilters = { q: read("q"), region: read("region"), country: read("country"), cancer: read("cancer"), entity: read("entity"), assay: read("assay"), status: read("status"), role: read("role"), year: read("year") };

  return (
    <main className="internal-page compact-page">
      <SiteHeader />
      <section className="page-intro compact-intro biomarkers-intro">
        <p className="section-kicker">Biomarker catalogue</p>
        <h1>Start with the marker. Keep its context.</h1>
        <p>Browse proteins, genes, variants, viral DNA, and assay panels while keeping cancer, cohort geography, laboratory method, and scientific review state attached.</p>
      </section>
      <BiomarkerExplorer initialFilters={initialFilters} records={evidence.records.length ? evidence.records : fixtureRecords} dataSource={evidence.source} sourceMessage={evidence.message} />
      <SiteFooter />
    </main>
  );
}
