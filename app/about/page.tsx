import type { Metadata } from "next";
import Image from "next/image";
import { Building2, ChevronDown, ExternalLink, Mail, MapPin } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { teamMembers } from "@/lib/team";

export const metadata: Metadata = {
  title: "About ACBDT | Team and mission",
  description: "Meet the multidisciplinary research and technology team building the Africa Cancer Biomarkers Database & Technology platform.",
};

export default function AboutPage() {
  return (
    <main className="internal-page compact-page">
      <SiteHeader />
      <section className="page-intro compact-intro">
        <p className="section-kicker">About ACBDT</p>
        <h1>Evidence with scientific context built in.</h1>
        <p>ACBDT structures cancer biomarker evidence without separating a finding from its cohort, assay, review status, or original source.</p>
      </section>
      <section className="compact-about-content">
        <div className="compact-about-note"><strong>Our approach</strong><p>Reproducible discovery, human scientific review, open methods, and accessible software. Prototype records are clearly labelled and are not clinical guidance.</p></div>
        <div className="compact-team-grid">
          {teamMembers.map((member) => (
            <article className="compact-profile" key={member.name}>
              <div className="compact-profile-head">
                <div className="compact-profile-avatar">
                  {member.photo ? <Image src={member.photo} alt={member.name} fill sizes="84px" style={{ objectPosition: member.position }} /> : <span>CS</span>}
                </div>
                <div>{member.country && <p><MapPin size={13} />{member.country}</p>}<h2>{member.name}</h2><small>{member.role}</small></div>
              </div>
              <details>
                <summary>Profile <ChevronDown size={16} /></summary>
                <div className="compact-profile-body">
                  {member.primaryInstitute && <p><Building2 size={15} /><span><small>Primary affiliation</small>{member.primaryInstitute}</span></p>}
                  {member.secondaryInstitute && <p><Building2 size={15} /><span><small>Secondary affiliation</small>{member.secondaryInstitute}</span></p>}
                  <p className="compact-bio">{member.bio}</p>
                  <div className="profile-links">{member.email && <a href={`mailto:${member.email}`}><Mail size={14} />Email</a>}{member.website && <a href={member.website} target="_blank" rel="noreferrer">speqlink.com <ExternalLink size={13} /></a>}</div>
                </div>
              </details>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
