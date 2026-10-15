import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info, MapPinned } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "West Africa pilot atlas | ACBDT", description: "Country-level indexed evidence coverage for the ACBDT West Africa cancer biomarker pilot." };

const countries = [
  { name: "Nigeria", iso: "NG", group: "Gulf of Guinea" }, { name: "Ghana", iso: "GH", group: "Gulf of Guinea" },
  { name: "Togo", iso: "TG", group: "Gulf of Guinea" }, { name: "Benin", iso: "BJ", group: "Gulf of Guinea" },
  { name: "Côte d’Ivoire", iso: "CI", group: "Gulf of Guinea" }, { name: "Mali", iso: "ML", group: "Sahel" },
  { name: "Niger", iso: "NE", group: "Sahel" }, { name: "Burkina Faso", iso: "BF", group: "Sahel" },
];

export default function AtlasPage() {
  return <main className="internal-page"><SiteHeader />
    <section className="page-intro atlas-intro"><p className="section-kicker">Cancer Atlas · pilot coverage</p><h1>Where evidence is indexed—and where <em>review is still needed.</em></h1><p>This prototype atlas shows the eight-country search scope. It does not display cancer burden, incidence, mortality, or biomarker prevalence.</p></section>
    <section className="atlas-content">
      <div className="atlas-method"><Info size={20} /><div><strong>How to read this atlas</strong><p>The future default metric is verified indexed studies by cohort origin. Gray means insufficient indexed evidence, never zero cancer. Counts remain hidden until the literature run and scientific review are complete.</p></div></div>
      <div className="atlas-layout">
        <div className="atlas-visual" aria-label="Abstract representation of the eight West Africa pilot countries"><div className="atlas-grid-lines" />{countries.map((country, index) => <a key={country.iso} href={`#${country.name.toLowerCase().replaceAll(" ", "-")}`} className={`atlas-node atlas-node-${index + 1}`}><span>{country.iso}</span></a>)}<p>Coverage view<br /><strong>Review pending</strong></p></div>
        <div className="country-directory">
          <div className="directory-head"><span>Country</span><span>Metric</span><span>Status</span></div>
          {countries.map((country) => <article id={country.name.toLowerCase().replaceAll(" ", "-")} key={country.iso}><span className="country-code">{country.iso}</span><div><h2>{country.name}</h2><p>{country.group} · Western Africa</p></div><div><small>Verified indexed studies</small><strong>Not published</strong></div><span className="coverage-state">Protocol pending</span></article>)}
        </div>
      </div>
      <div className="atlas-next"><MapPinned /><div><p className="section-kicker">Accessible table alternative</p><h2>Country is a cohort field, not a keyword shortcut.</h2><p>The reviewer will record recruitment country and sample-origin country separately. “Nigerian” cannot be counted as Niger, and “Benin City” cannot be counted as the country Benin.</p></div><Link href="/methods#screening">See screening rules <ArrowRight size={15} /></Link></div>
    </section><SiteFooter /></main>;
}
