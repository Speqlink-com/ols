import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookMarked, Braces, Database, FileSearch, Scale, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Methods and evidence policy | ACBDT", description: "How ACBDT discovers, screens, structures, reviews and publishes Africa-centred cancer biomarker evidence." };

const steps = [
  { icon: FileSearch, title: "Discover candidates", text: "Versioned country × cancer queries use the Europe PMC REST API. Search results begin as UNSCREENED candidates." },
  { icon: BookMarked, title: "Screen relevance", text: "A curator checks whether the paper is relevant, whether a country is merely mentioned, and whether full text is required." },
  { icon: Braces, title: "Structure the finding", text: "Cancer, gene, variant, protein, assay, cohort, clinical role, and numerical finding remain separate entities." },
  { icon: ShieldCheck, title: "Review and approve", text: "Source excerpts, reviewer identity, rationale, timestamp, and publication status travel with every approved finding." },
];

export default function MethodsPage() {
  return <main className="internal-page"><SiteHeader />
    <section className="page-intro methods-intro"><p className="section-kicker">Methods & evidence policy</p><h1>Discovery is automated.<br /><em>Trust is reviewed.</em></h1><p>ACBDT is a research and education platform. It does not diagnose, recommend treatment, or convert literature matches into clinical claims.</p></section>
    <section className="methods-content">
      <div className="methods-grid">{steps.map(({ icon: Icon, title, text }, index) => <article key={title}><span>0{index + 1}</span><Icon /><h2>{title}</h2><p>{text}</p></article>)}</div>
      <section className="semantics-section" id="screening"><div><p className="section-kicker">Scientific semantics</p><h2>The distinctions the platform will not collapse.</h2></div><dl><div><dt>Mention</dt><dd>A term found in searchable text. It is not evidence of a cohort or a finding.</dd></div><div><dt>Candidate</dt><dd>A publication that may be relevant and needs scientific screening.</dd></div><div><dt>Cohort verified</dt><dd>Recruitment or sample origin has been confirmed from an appropriate source passage.</dd></div><div><dt>Approved finding</dt><dd>A structured claim with assay, cohort, source evidence, and review decision attached.</dd></div></dl></section>
      <section className="glossary-section" id="glossary"><div><p className="section-kicker">Plain-language glossary</p><h2>Words that should stay precise.</h2></div><div className="glossary-grid"><article><strong>Gene</strong><p>A DNA unit that can encode a product. Example: ERBB2.</p></article><article><strong>Variant</strong><p>A specific change in a DNA sequence. It is not interchangeable with a gene.</p></article><article><strong>Protein</strong><p>A biological product that may be measured. Example: HER2 protein.</p></article><article><strong>Assay</strong><p>The laboratory method used to measure a target, including platform and cutoff.</p></article><article><strong>Biomarker claim</strong><p>A context-specific relationship between a measured target and a clinical role.</p></article><article><strong>Clinical role</strong><p>Diagnostic, prognostic, predictive, risk, monitoring, response, or safety.</p></article></div></section>
      <section className="source-section"><div><Database /><p className="section-kicker">Pilot source</p><h2>Europe PMC via a reproducible API workflow.</h2><p>The script records query text, result identifiers, timestamps, candidate status, and deduplication keys. Search API availability does not mean full text is reusable.</p><a href="https://europepmc.org/RestfulWebService" target="_blank" rel="noreferrer">Europe PMC API documentation ↗</a></div><div><Scale /><p className="section-kicker">Publication policy</p><h2>No unsupported aggregate claims.</h2><p>Prevalence, incidence, evidence strength, and country totals remain unpublished until the metric, source, inclusion criteria, reference date, and limitations can be shown together.</p></div></section>
      <section className="contribute-section" id="contribute"><div><p className="section-kicker">Contribute responsibly</p><h2>Three ways to help the evidence grow.</h2></div><div><p>Suggest an Africa-centred publication, join the scientific review process, or improve the open ingestion and interface code. Do not submit patient-identifiable data.</p><div className="contribute-actions"><a className="button button-primary" href="https://forms.gle/dt2SaWUz7rH8JkKi8" target="_blank" rel="noreferrer">Suggest a publication <ArrowRight size={15} /></a><Link className="text-link" href="/explore">Test the prototype</Link></div></div></section>
    </section><SiteFooter /></main>;
}
