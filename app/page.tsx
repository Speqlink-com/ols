import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Building2, ChevronDown, CircleCheck, Database, FlaskConical, HeartHandshake, Mail, MapPin, Microscope, Search, ShieldCheck, Stethoscope, Users } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const pilotCountries = ["Nigeria", "Ghana", "Togo", "Benin", "Côte d’Ivoire", "Mali", "Niger", "Burkina Faso"];

const cancers = [
  { name: "Breast cancer", markers: "HER2 · BRCA1/2 · Ki-67", image: "/acbdt-breast-cancer.png", href: "/explore?cancer=Breast+cancer" },
  { name: "Cervical cancer", markers: "HPV · p16 · E6/E7", image: "/acbdt-cervical-cancer.png", href: "/explore?cancer=Cervical+cancer" },
  { name: "Prostate cancer", markers: "PSA · AR · genomic markers", image: "/acbdt-prostate-cancer.png", href: "/explore?cancer=Prostate+cancer" },
];

const actors = [
  { icon: FlaskConical, title: "Researchers", text: "Find candidate literature, compare study context, and trace every claim back to its source." },
  { icon: Stethoscope, title: "Clinicians", text: "Review assay, cohort, and evidence-quality context without turning research evidence into diagnosis." },
  { icon: HeartHandshake, title: "Patients & families", text: "Learn what biomarkers are, why context matters, and which questions to bring into care conversations." },
  { icon: Users, title: "Curators & stewards", text: "Screen candidates, verify cohort origin, record decisions, and protect scientific provenance." },
];

const team = [
  {
    name: "Susan Njuki",
    role: "Project lead · Biomedical scientist",
    email: "suzannenjuki@gmail.com",
    country: "Israel",
    primaryInstitute: "Hebrew University of Jerusalem, Jerusalem, Israel",
    secondaryInstitute: "Central Veterinary Laboratories, Nairobi, Kenya",
    bio: "Susan has a background in Biomedical Sciences, with research experience focused on identifying potential therapeutic drug targets for Glioblastoma Multiforme. She supports African students and alumni in Israeli universities across BSc, MSc, and PhD programmes, organizing lecture series, workshops, research discussions, and communities of practice for knowledge exchange and professional development.",
    photo: "/sue.jpeg",
    position: "center 34%",
    confirmed: true,
  },
  {
    name: "Ahmed Abbi Abdille",
    role: "Molecular biologist & biotechnology researcher",
    email: "ahmedabbi7@gmail.com",
    country: "Somalia",
    primaryInstitute: "Global Science University, Somalia",
    secondaryInstitute: "Center for Public Health Research, Somalia",
    bio: "Ahmed holds a PhD in Molecular Biology and Biotechnology. His research focuses on developing and evaluating antimicrobial peptides as potential therapeutic targets for cancer treatment. He supports researchers, health professionals, and students through open-science education, research conferences, communities of practice, institutional development, and capacity building.",
    photo: "/ehmed.jpeg",
    position: "center 28%",
    confirmed: true,
  },
  {
    name: "George Lugonzo",
    role: "One Health scientist",
    email: "lugonzogeorge6@gmail.com",
    country: "Kenya",
    primaryInstitute: "Kenya Agricultural and Livestock Research Organization (KALRO)",
    bio: "George is a One Health scientist with a background in Microbiology and Biotechnology. His experience spans molecular diagnostics, infectious-disease research, epidemiology, bioinformatics, and data interpretation. He advances public health through vaccines and bioproducts that minimize chemical exposure, including livestock probiotics, while generating evidence for health challenges affecting people and animals.",
    photo: "/George Lugonzo.jpeg",
    position: "center 25%",
    confirmed: true,
  },
  {
    name: "Brevin Ochieng Olunga",
    role: "Project collaborator",
    country: "Profile pending",
    primaryInstitute: "Institutional affiliation to be confirmed",
    bio: "Brevin contributes to the collaborative development of ACBDT and its goal of making African cancer biomarker evidence easier to discover, interpret, and reuse. This is temporary profile copy pending a confirmed biography and affiliation.",
    photo: "/brevin.jpeg",
    position: "center 24%",
    confirmed: false,
  },
  {
    name: "John Paul Aguta",
    role: "Project collaborator",
    country: "Profile pending",
    primaryInstitute: "Institutional affiliation to be confirmed",
    bio: "John Paul supports the ACBDT collaboration and the development of an open, evidence-traceable research resource. This is temporary profile copy pending a confirmed biography and affiliation.",
    photo: "/john paul aguta.jpeg",
    position: "center 22%",
    confirmed: false,
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <SiteHeader tone="dark" />
        <Image className="hero-image" src="/acbdt-cellular-hero.png" alt="Illustrative microscopy-inspired visualization of a tumor cell spheroid" fill preload sizes="100vw" />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow"><span /> Evidence you can trace</p>
          <h1>Africa&apos;s cancer biomarker evidence, <em>made legible.</em></h1>
          <p className="hero-lede">ACBDT connects cancers, biomarkers, assays, studies, African cohorts, and source evidence—without confusing a literature mention with a verified finding.</p>
          <form className="global-search" action="/explore" role="search">
            <Search size={20} aria-hidden="true" /><input name="q" aria-label="Search ACBDT" placeholder="Search HER2, breast cancer, Ghana…" /><button type="submit">Search evidence <ArrowRight size={16} /></button>
          </form>
          <div className="hero-actions">
            <Link className="button button-primary" href="/explore">Explore the pilot <ArrowRight size={16} /></Link>
            <Link className="text-link" href="/methods">How evidence is reviewed</Link>
          </div>
        </div>
        <p className="hero-caption">Illustrative visualization · Not a clinical specimen</p>
      </section>

      <section className="capability-strip" aria-label="Platform capabilities">
        <span><CircleCheck size={16} /> Provenance first</span><span><CircleCheck size={16} /> Cohort aware</span><span><CircleCheck size={16} /> Review status visible</span><span><CircleCheck size={16} /> Export ready</span>
      </section>

      <section className="intro-section" id="about">
        <div><p className="section-kicker">The evidence layer</p><h2>From a search result to the <em>reason it can be trusted.</em></h2></div>
        <div className="intro-copy">
          <p>Global databases are excellent discovery infrastructure. ACBDT adds the African cohort verification, structured biomarker findings, provenance, and scientific review needed to interpret those records responsibly.</p>
          <div className="principle-grid">
            <article><span>01</span><strong>Mention is not evidence</strong><p>A country name in an abstract does not prove cohort origin.</p></article>
            <article><span>02</span><strong>Context stays attached</strong><p>Gene, variant, protein, assay, study, and finding remain distinct.</p></article>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <div><p className="section-kicker">Featured research pathways</p><h2>Start with a cancer.<br />Follow the biology.</h2></div>
          <p>The first pilot focuses on five cancers and a defined biomarker vocabulary. These pathways demonstrate the intended discovery experience.</p>
        </div>
        <div className="cancer-grid">
          {cancers.map((cancer, index) => (
            <Link className="cancer-card" href={cancer.href} key={cancer.name}>
              <Image src={cancer.image} alt={`Illustrative microscopy-inspired visualization for ${cancer.name}`} fill sizes="(max-width: 760px) 100vw, 33vw" />
              <div className="cancer-card-shade" /><span>0{index + 1}</span>
              <div><h3>{cancer.name}</h3><p>{cancer.markers}</p><small>Explore pathway <ArrowRight size={14} /></small></div>
            </Link>
          ))}
        </div>
        <p className="visual-disclaimer">All cellular images are illustrative visualizations and are not diagnostic microscopy.</p>
      </section>

      <section className="pilot-section">
        <div className="pilot-panel">
          <div className="pilot-copy">
            <p className="section-kicker light">West Africa pilot · Phase 1</p><h2>Eight countries.<br />One reproducible protocol.</h2>
            <p>Europe PMC supplies candidate literature. ACBDT supplies the screening decisions, verified cohort metadata, structured findings, and source-linked review.</p>
            <Link className="button button-sky" href="/atlas">Open the coverage atlas <ArrowRight size={16} /></Link>
          </div>
          <div className="country-list" aria-label="West Africa pilot countries">
            {pilotCountries.map((country, index) => <Link href={`/atlas#${country.toLowerCase().replaceAll(" ", "-")}`} key={country}><span>{String(index + 1).padStart(2, "0")}</span>{country}<ArrowRight size={14} /></Link>)}
          </div>
        </div>
        <div className="pipeline" aria-label="Evidence pipeline">
          <article><Search /><span>01</span><h3>Discover</h3><p>Reproducible country × cancer searches return candidates.</p></article>
          <article><BookOpen /><span>02</span><h3>Screen</h3><p>Reviewers separate mentions from relevant studies.</p></article>
          <article><Microscope /><span>03</span><h3>Verify</h3><p>Cohort, assay, biomarker, and finding are structured.</p></article>
          <article><ShieldCheck /><span>04</span><h3>Approve</h3><p>Evidence spans and review decisions stay attached.</p></article>
        </div>
      </section>

      <section className="evidence-empty-section">
        <div className="section-heading">
          <div><p className="section-kicker">Latest validated evidence</p><h2>Trust begins with an honest empty state.</h2></div>
          <p>The pilot has not published reviewer-approved findings yet. The interface will not manufacture totals, prevalence, or strength claims to make the product look busy.</p>
        </div>
        <div className="research-empty">
          <Database size={30} /><div><strong>Scientific review is in preparation</strong><p>Use Explore to test the synthetic discovery workflow. Approved evidence will appear here only after cohort verification and source-level review.</p></div><Link href="/methods">Read the protocol <ArrowRight size={15} /></Link>
        </div>
      </section>

      <section className="actors-section">
        <div className="section-heading section-heading-light">
          <div><p className="section-kicker light">Built for people</p><h2>One evidence system.<br />Four ways to use it.</h2></div>
          <p>Language, depth, and tools adapt to the task while the scientific source of truth stays consistent.</p>
        </div>
        <div className="actors-grid">
          {actors.map(({ icon: Icon, title, text }, index) => <article key={title}><span>0{index + 1}</span><Icon /><h3>{title}</h3><p>{text}</p><Link href={title === "Patients & families" ? "/methods#glossary" : "/explore"}>Follow this path <ArrowRight size={14} /></Link></article>)}
        </div>
      </section>

      <section className="team-section" id="team">
        <div className="section-heading">
          <div><p className="section-kicker">The initiative</p><h2>Stewarded by people.<br />Built in the open.</h2></div>
          <p>The team brings biomedical research, molecular biology, One Health, open science, and community-building perspectives to ACBDT.</p>
        </div>
        <div className="team-grid">
          {team.map((member) => <article className={`team-card${member.confirmed ? "" : " team-card-pending"}`} key={member.name}>
            <div className="team-photo"><Image src={member.photo} alt={member.name} fill sizes="(max-width: 520px) 100vw, (max-width: 1080px) 50vw, 33vw" style={{ objectPosition: member.position }} /><span>{member.confirmed ? "Team profile" : "Profile pending"}</span></div>
            <div className="team-card-copy"><p className="team-location"><MapPin size={12} />{member.country}</p><h3>{member.name}</h3><p className="team-role">{member.role}</p></div>
            <details className="team-profile">
              <summary>View full profile <ChevronDown size={15} /></summary>
              <div className="team-profile-content">
                <div className="institute-row"><Building2 size={16} /><p><small>Primary institute</small>{member.primaryInstitute}</p></div>
                {member.secondaryInstitute && <div className="institute-row"><Building2 size={16} /><p><small>Secondary institute</small>{member.secondaryInstitute}</p></div>}
                <p className="team-bio">{member.bio}</p>
                {member.email ? <a className="team-email" href={`mailto:${member.email}`}><Mail size={14} />{member.email}</a> : <p className="team-profile-note">Biography and contact details awaiting confirmation.</p>}
              </div>
            </details>
          </article>)}
        </div>
      </section>

      <section className="final-cta">
        <div><p className="section-kicker">Build the evidence layer</p><h2>Contribute data.<br />Keep the source attached.</h2></div>
        <div><p>Join the scientific review, improve the open ingestion workflow, or contribute an Africa-centred study for screening.</p><Link className="button button-primary" href="/methods#contribute">See contribution pathways <ArrowRight size={16} /></Link></div>
      </section>
      <SiteFooter />
    </main>
  );
}
