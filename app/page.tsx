import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Map, Search } from "lucide-react";
import { CancerBrowseBar } from "@/components/cancer-browse-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const regions = ["Northern Africa", "Western Africa", "Central Africa", "Eastern Africa", "Southern Africa"];

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <CancerBrowseBar />

      <section className="home-hero">
        <Image className="home-hero-image" src="/acbdt-cellular-hero.png" alt="Illustrative cellular visualization" fill preload sizes="100vw" />
        <div className="home-hero-shade" aria-hidden="true" />
        <div className="home-hero-content">
          <p className="section-kicker light">Africa Cancer Biomarkers Database</p>
          <h1>Find cancer biomarker evidence with its context intact.</h1>
          <p>Search biomarkers, cancers, assays, studies, and African cohort locations in one traceable research workspace.</p>
          <form className="global-search" action="/biomarkers#database" role="search">
            <Search size={20} aria-hidden="true" />
            <input name="q" aria-label="Search biomarkers" placeholder="Search HER2, HPV, EGFR, Ghana, Kenya..." />
            <button type="submit">Search database <ArrowRight size={17} /></button>
          </form>
          <div className="home-hero-actions">
            <Link className="button button-sky" href="/biomarkers#database">Browse all biomarkers</Link>
            <Link className="home-secondary-link" href="/methods">How evidence is reviewed</Link>
          </div>
        </div>
      </section>

      <section className="home-summary">
        <div className="home-summary-heading">
          <p className="section-kicker">Africa-wide discovery</p>
          <h2>One research interface for five African regions.</h2>
          <p>The prototype now demonstrates continent-wide regional filtering. Records remain synthetic until scientific review approves source-linked evidence.</p>
        </div>
        <div className="region-pills" aria-label="African regions">
          {regions.map((region) => <Link href={`/biomarkers?region=${encodeURIComponent(region)}#database`} key={region}><Map size={17} />{region}</Link>)}
        </div>
        <div className="home-principles">
          <span><CheckCircle2 /> Cohort location stays visible</span>
          <span><CheckCircle2 /> Assay and role stay separate</span>
          <span><CheckCircle2 /> Review status is explicit</span>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
