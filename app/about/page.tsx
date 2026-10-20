import type { Metadata } from "next";
import Image from "next/image";
import { Building2, ExternalLink, Mail, MapPin } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { teamMembers } from "@/lib/team";

export const metadata: Metadata = {
  title: "About ACBDT | Team and mission",
  description: "Meet the multidisciplinary research and technology team building the Africa Cancer Biomarkers Database & Technology platform.",
};

export default function AboutPage() {
  return (
    <main className="internal-page">
      <SiteHeader />
      <section className="page-intro about-intro">
        <p className="section-kicker">About ACBDT</p>
        <h1>Scientific context,<br /><em>built into the record.</em></h1>
        <p>ACBDT is an Africa-centred, open research initiative that structures cancer biomarker evidence without separating a finding from its cohort, assay, review status, or original source.</p>
      </section>

      <section className="about-content">
        <div className="about-story">
          <div>
            <p className="section-kicker">Why this work matters</p>
            <h2>A database designed around evidence—not just mentions.</h2>
          </div>
          <div>
            <p>Global archives make literature and biological records discoverable. ACBDT adds the structured African cohort context needed to understand whether a biomarker was measured, how it was measured, and what the study actually reported.</p>
            <p>The initiative combines reproducible literature discovery, human scientific review, open methods, and accessible software. Prototype records are labelled clearly and are never presented as clinical guidance.</p>
          </div>
        </div>

        <div className="team-heading">
          <div><p className="section-kicker">Project team</p><h2>Research, stewardship<br />and technology.</h2></div>
          <p>Small profiles keep the focus on each person’s role, affiliations, and contribution to the initiative.</p>
        </div>

        <div className="team-roster">
          {teamMembers.map((member) => (
            <article className="profile-card" key={member.name}>
              <div className="profile-avatar">
                {member.photo ? (
                  <Image src={member.photo} alt={member.name} fill sizes="148px" style={{ objectPosition: member.position }} />
                ) : (
                  <span aria-hidden="true">CS</span>
                )}
              </div>
              <div className="profile-summary">
                {member.country && <p className="profile-location"><MapPin size={12} />{member.country}</p>}
                <h2>{member.name}</h2>
                <p className="profile-role">{member.role}</p>
              </div>
              <div className="profile-details">
                {member.primaryInstitute && <div className="profile-affiliation"><Building2 size={15} /><p><small>Primary affiliation</small>{member.primaryInstitute}</p></div>}
                {member.secondaryInstitute && <div className="profile-affiliation"><Building2 size={15} /><p><small>Secondary affiliation</small>{member.secondaryInstitute}</p></div>}
                <p className="profile-bio">{member.bio}</p>
                <div className="profile-links">
                  {member.email && <a href={`mailto:${member.email}`}><Mail size={14} />Email</a>}
                  {member.website && <a href={member.website} target="_blank" rel="noreferrer">speqlink.com <ExternalLink size={13} /></a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
