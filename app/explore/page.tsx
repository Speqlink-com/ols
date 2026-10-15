import type { Metadata } from "next";
import { BiomarkerExplorer } from "@/components/biomarker-explorer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Explore evidence | ACBDT",
  description: "Explore synthetic West Africa cancer biomarker evidence fixtures by marker, cancer, country, assay and scientific review state.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ExplorePage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const read = (key: string) => typeof params[key] === "string" ? params[key] : undefined;
  const initialFilters = { q: read("q"), country: read("country"), cancer: read("cancer"), entity: read("entity"), status: read("status"), role: read("role") };
  return <main className="internal-page"><SiteHeader /><section className="page-intro"><p className="section-kicker">Evidence discovery</p><h1>Search broadly.<br /><em>Interpret carefully.</em></h1><p>Every result declares whether it is an unreviewed literature candidate, requires full text, or has verified cohort metadata. The current dataset is synthetic and demonstrates the interface only.</p></section><BiomarkerExplorer initialFilters={initialFilters} /><SiteFooter /></main>;
}
