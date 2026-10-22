import type { Metadata } from "next";
import { ArrowRight, BookMarked, Braces, FileSearch, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Methods and evidence policy | ACBD", description: "How ACBD discovers, screens, structures, reviews and publishes Africa-centred cancer biomarker evidence." };

const steps = [
  { icon: FileSearch, title: "Discover", text: "Versioned country and cancer queries identify candidate publications." },
  { icon: BookMarked, title: "Screen", text: "Curators verify relevance, cohort origin, and full-text requirements." },
  { icon: Braces, title: "Structure", text: "Cancer, marker, assay, cohort, role, and finding remain separate fields." },
  { icon: ShieldCheck, title: "Review", text: "Source evidence and review decisions stay attached before publication." },
];

const terms = [
  ["Mention", "A searchable term, not proof of a cohort or finding."],
  ["Candidate", "A potentially relevant publication awaiting screening."],
  ["Cohort verified", "Recruitment or sample origin confirmed from the source."],
  ["Published", "A reviewed finding with provenance and approval attached."],
];

export default function MethodsPage() {
  return <main className="internal-page compact-page"><SiteHeader />
    <section className="page-intro compact-intro methods-intro"><p className="section-kicker">Methods and evidence policy</p><h1>Discovery is automated. Trust is reviewed.</h1><p>ACBD is a research and education platform. It does not diagnose or recommend treatment.</p></section>
    <section className="compact-methods-content">
      <div className="compact-methods-grid">{steps.map(({ icon: Icon, title, text }, index) => <article key={title}><span>0{index + 1}</span><Icon /><h2>{title}</h2><p>{text}</p></article>)}</div>
      <div className="compact-terms" id="screening">{terms.map(([term, definition]) => <article key={term}><strong>{term}</strong><p>{definition}</p></article>)}</div>
      <div className="compact-contribute" id="contribute"><div><p className="section-kicker">Contribute responsibly</p><h2>Help the evidence grow.</h2></div><div><p>Suggest an Africa-centred publication or join the review process. Do not submit patient-identifiable data.</p><a className="button button-primary" href="https://forms.gle/9XDx8Fc718Gi3xPh9" target="_blank" rel="noreferrer">Open contribution form <ArrowRight size={17} /></a></div></div>
    </section><SiteFooter /></main>;
}
