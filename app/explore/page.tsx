import type { Metadata } from "next";
import { BiomarkerExplorer, fixtureRecords } from "@/components/biomarker-explorer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { fetchEvidence } from "@/lib/api";

export const metadata: Metadata = {
  title: "Explore evidence | ACBDT",
  description: "Explore synthetic West Africa cancer biomarker evidence fixtures by marker, cancer, country, assay and scientific review state.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ExplorePage({ searchParams }: { searchParams: SearchParams }) {
  const [params, evidence] = await Promise.all([searchParams, fetchEvidence()]);
  const read = (key: string) => typeof params[key] === "string" ? params[key] : undefined;
  const initialFilters = { q: read("q"), region: read("region"), country: read("country"), cancer: read("cancer"), entity: read("entity"), assay: read("assay"), status: read("status"), role: read("role"), year: read("year") };
  return <main className="internal-page compact-page"><SiteHeader /><section className="page-intro compact-intro"><p className="section-kicker">Evidence discovery</p><h1>Search broadly. Interpret carefully.</h1><p>Every result declares its cohort region, assay context, and review state. The current dataset is synthetic and demonstrates the interface only.</p></section><BiomarkerExplorer initialFilters={initialFilters} records={evidence.records.length ? evidence.records : fixtureRecords} dataSource={evidence.source} sourceMessage={evidence.message} /><SiteFooter /></main>;
}
