import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CircleCheck, Database, FlaskConical, HeartHandshake, Microscope, Search, ShieldCheck, Stethoscope, Users } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const pilotCountries = ["Nigeria", "Ghana", "Togo", "Benin", "Côte d’Ivoire", "Mali", "Niger", "Burkina Faso"];

const cancers = [
  { name: "Breast cancer", markers: "HER2 · BRCA1/2 · Ki-67", image: "/acbdt-breast-cancer.png", href: "/biomarkers?cancer=Breast+cancer" },
  { name: "Cervical cancer", markers: "HPV · p16 · E6/E7", image: "/acbdt-cervical-cancer.png", href: "/biomarkers?cancer=Cervical+cancer" },
  { name: "Prostate cancer", markers: "PSA · AR · genomic markers", image: "/acbdt-prostate-cancer.png", href: "/biomarkers?cancer=Prostate+cancer" },
];

const actors = [
  { icon: FlaskConical, title: "Researchers", text: "Find candidate literature, compare study context, and trace every claim back to its source." },
  { icon: Stethoscope, title: "Clinicians", text: "Review assay, cohort, and evidence-quality context without turning research evidence into diagnosis." },
  { icon: HeartHandshake, title: "Patients & families", text: "Learn what biomarkers are, why context matters, and which questions to bring into care conversations." },
  { icon: Users, title: "Curators & stewards", text: "Screen candidates, verify cohort origin, record decisions, and protect scientific provenance." },
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

      <section className="intro-section">
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

      <section className="final-cta">
        <div><p className="section-kicker">Built by a multidisciplinary team</p><h2>Meet the people<br />behind ACBDT.</h2></div>
        <div><p>Biomedical researchers, open-science practitioners, and technologists are building a source-linked evidence resource for African cancer research.</p><Link className="button button-primary" href="/about">Meet the team <ArrowRight size={16} /></Link></div>
      </section>
      <SiteFooter />
    </main>
  );
}
