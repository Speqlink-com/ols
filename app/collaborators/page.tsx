import type { Metadata } from "next";
import Image from "next/image";
import { BookOpenCheck, Network, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Collaborators | ACBD",
  description: "Institutions and open-science communities collaborating on the Africa Cancer Biomarkers Database.",
};

const collaborators = [
  { name: "Kenya Medical Research Institute", short: "KEMRI", logo: "/kemri.png" },
  { name: "Open Life Science", short: "OLS", logo: "/ols.png" },
  { name: "Kenyatta University", short: "KU", logo: "/kenyatta university.png" },
];

export default function CollaboratorsPage() {
  return (
    <main className="internal-page compact-page">
      <SiteHeader />
      <section className="page-intro compact-intro">
        <p className="section-kicker">Collaborators</p>
        <h1>Built through research partnership.</h1>
        <p>ACBD brings together biomedical research, higher education, open science, and responsible technology.</p>
      </section>
      <section className="collaborators-content">
        <div className="collaborator-grid">
          {collaborators.map((collaborator) => (
            <article key={collaborator.short}>
              <div className="collaborator-logo"><Image src={collaborator.logo} alt={`${collaborator.name} logo`} fill sizes="220px" /></div>
              <small>{collaborator.short}</small>
              <h2>{collaborator.name}</h2>
            </article>
          ))}
        </div>
        <div className="collaboration-principles">
          <span><Network /><strong>Shared stewardship</strong><small>Multidisciplinary project collaboration</small></span>
          <span><BookOpenCheck /><strong>Open methods</strong><small>Reproducible discovery and curation</small></span>
          <span><ShieldCheck /><strong>Responsible evidence</strong><small>Human review before publication</small></span>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
