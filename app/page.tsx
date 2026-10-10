import {
  ArrowRight,
  BookOpen,
  Database,
  FlaskConical,
  Github,
  HeartHandshake,
  Library,
  Menu,
  Microscope,
  Network,
  Search,
  ShieldCheck,
  Stethoscope,
  UploadCloud,
  Users,
} from "lucide-react";
import Image from "next/image";
import { BiomarkerExplorer } from "@/components/biomarker-explorer";

const actors = [
  {
    icon: FlaskConical,
    number: "01",
    title: "Researchers",
    text: "Find Africa-specific evidence, spot knowledge gaps, and build stronger study cohorts.",
    image: "/Collaborative Genomics Lab Research.png",
  },
  {
    icon: Stethoscope,
    number: "02",
    title: "Healthcare providers",
    text: "Explore diagnostic, prognostic, and treatment-response evidence in one structured place.",
    image: "/Collaborative Medical Data Consultation.png",
  },
  {
    icon: HeartHandshake,
    number: "03",
    title: "Patients",
    text: "Understand how biomarkers may inform care through accessible, plain-language summaries.",
    image: "/Genetic Consultation in a Modern Clinic.png",
  },
  {
    icon: Users,
    number: "04",
    title: "Families",
    text: "Navigate trusted information and support better-informed conversations with care teams.",
    image: "/Multigenerational Genetics Consultation.png",
  },
];

const team = [
  { name: "Suzanne Njuki", role: "Project lead", photo: "/sue.jpeg", position: "center 34%" },
  { name: "Brevin Ochieng Olunga", role: "Project collaborator", photo: "/brevin.jpeg", position: "center 24%" },
  { name: "Ahmed Abdille", role: "Project collaborator", photo: "/ehmed.jpeg", position: "center 28%" },
  { name: "George Lugonzo", role: "Project collaborator", photo: "/George Lugonzo.jpeg", position: "center 25%" },
  { name: "John Paul Aguta", role: "Project collaborator", photo: "/john paul oguta.jpeg", position: "center 22%" },
];

const dataRoutes = [
  { icon: Microscope, title: "Biomarkers", text: "Diagnostic, prognostic, predictive and risk markers", meta: "Explore marker evidence" },
  { icon: Library, title: "Studies", text: "Published and emerging Africa-centred research", meta: "Review study context" },
  { icon: Users, title: "Populations", text: "Geography, cohorts and population-specific evidence", meta: "Compare representation" },
  { icon: Network, title: "Linked evidence", text: "Genes, variants, pathways and external accessions", meta: "Follow connections" },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="OACBDA home">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="brand-copy">
            <strong>OACBDA</strong>
            <small>Open cancer evidence for Africa</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#database">Database</a>
          <a href="#community">Community</a>
          <a href="#about">About</a>
          <a href="#team">Team</a>
        </nav>
        <a
          className="header-cta"
          href="https://forms.gle/dt2SaWUz7rH8JkKi8"
          target="_blank"
          rel="noreferrer"
        >
          Contribute data <ArrowRight size={15} />
        </a>
        <details className="mobile-menu">
          <summary aria-label="Open navigation"><Menu /></summary>
          <nav aria-label="Mobile navigation">
            <a href="#database">Database</a><a href="#community">Community</a><a href="#about">About</a><a href="#team">Team</a>
          </nav>
        </details>
      </header>

      <section className="hero" id="top">
        <Image
          className="hero-image"
          src="/home-heroe.png"
          alt="African cancer researchers working with genomic data in a modern laboratory"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content">
          <div className="eyebrow"><span /> Africa-centred. Open by design.</div>
          <h1>
            Cancer evidence,<br />
            <em>seen through Africa.</em>
          </h1>
          <p>
            A living, open-access repository bringing together cancer biomarkers identified
            across African populations—for better research, diagnosis, and treatment.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#database">
              Explore the database <ArrowRight size={17} />
            </a>
            <a className="text-link" href="#about">
              Why this matters <span>↘</span>
            </a>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack" aria-hidden="true">
              <span>R</span><span>C</span><span>P</span><span>F</span>
            </div>
            <p><strong>Built for four communities</strong><br />from discovery to informed care</p>
          </div>
          <div className="hero-routes" aria-label="Quick routes">
            <a href="#database"><Search size={17} /><span><strong>Search</strong><small>Find biomarker evidence</small></span></a>
            <a href="https://forms.gle/dt2SaWUz7rH8JkKi8" target="_blank" rel="noreferrer"><UploadCloud size={17} /><span><strong>Submit</strong><small>Contribute a record</small></span></a>
            <a href="https://github.com/African-Cancer-Biomarkers-Initiative/Open-Access-Cancer-Biomarkers-Database-Africa-OCBDA-" target="_blank" rel="noreferrer"><Github size={17} /><span><strong>Open source</strong><small>Explore the project</small></span></a>
          </div>
        </div>
      </section>

      <section className="browse-section" aria-labelledby="browse-title">
        <div className="browse-heading"><p className="section-kicker">Browse the knowledge base</p><h2 id="browse-title">One question.<br />Four ways in.</h2></div>
        <div className="data-routes">
          {dataRoutes.map((route, index) => {
            const Icon = route.icon;
            return <a href="#database" className="data-route" key={route.title}><span className="route-number">0{index + 1}</span><Icon size={23} /><h3>{route.title}</h3><p>{route.text}</p><small>{route.meta} <ArrowRight size={14} /></small></a>;
          })}
        </div>
      </section>

      <section className="statement" id="about">
        <p className="section-kicker">The missing layer in cancer research</p>
        <h2>Global evidence is only useful when <span>everyone is represented.</span></h2>
        <div className="statement-copy">
          <p>
            African populations remain underrepresented in cancer biomarker datasets. OACBDA
            closes that gap by making region-specific findings easier to discover, compare,
            and build upon.
          </p>
          <div className="principle"><span>01</span><p><strong>Open</strong>Free to explore and designed for shared progress.</p></div>
          <div className="principle"><span>02</span><p><strong>Contextual</strong>Evidence stays connected to population and geography.</p></div>
        </div>
      </section>

      <section className="research-banner">
        <Image
          src="/African Research Laboratory Collaboration.png"
          alt="African scientists collaborating in a cancer genomics laboratory"
          fill
          sizes="100vw"
        />
        <div className="research-caption">
          <span>Why OLS exists</span>
          <h2>Africa should not be an afterthought in the evidence.</h2>
          <p>Locally led research, structured context, and open discovery can help make cancer science more representative and more useful.</p>
        </div>
      </section>

      <BiomarkerExplorer />

      <section className="actors-section" id="community">
        <div className="section-heading">
          <div><p className="section-kicker light">One resource, many paths</p><h2>Built for the people<br />moving cancer care forward.</h2></div>
          <p>From laboratory discovery to the family conversation, evidence should travel clearly and responsibly.</p>
        </div>
        <div className="actors-grid">
          {actors.map((actor) => {
            const Icon = actor.icon;
            return (
              <article className="actor-card" key={actor.title}>
                <div className="actor-image">
                  <Image src={actor.image} alt={`${actor.title} using biomarker evidence`} fill sizes="(max-width: 520px) 100vw, (max-width: 1050px) 50vw, 25vw" />
                </div>
                <div className="actor-top"><span>{actor.number}</span><Icon size={24} /></div>
                <h3>{actor.title}</h3>
                <p>{actor.text}</p>
                <a href="#database" aria-label={`Explore resources for ${actor.title}`}>Explore resources <ArrowRight size={15} /></a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="how-section">
        <div className="how-intro">
          <p className="section-kicker">A transparent evidence pipeline</p>
          <h2>From contribution<br />to collective knowledge.</h2>
          <p>OACBDA is an open canvas shaped by researchers and communities across disciplines.</p>
          <a className="button button-dark" href="https://forms.gle/dt2SaWUz7rH8JkKi8" target="_blank" rel="noreferrer">Submit a biomarker <ArrowRight size={17} /></a>
        </div>
        <div className="steps">
          <article><span>01</span><div><BookOpen /><h3>Contribute</h3><p>Share published or unpublished African cancer biomarker findings through the project form.</p></div></article>
          <article><span>02</span><div><ShieldCheck /><h3>Review</h3><p>Records are structured with provenance, study context, and evidence quality in view.</p></div></article>
          <article><span>03</span><div><Database /><h3>Discover</h3><p>Explore a growing, searchable knowledge base built for reuse and collaboration.</p></div></article>
        </div>
      </section>

      <section className="team-section" id="team">
        <div className="section-heading team-heading">
          <div><p className="section-kicker">The people behind the platform</p><h2>Open science starts<br />with collaboration.</h2></div>
          <p>OACBDA brings together varied backgrounds and expertise around one shared ambition: more representative cancer evidence.</p>
        </div>
        <div className="team-grid">
          {team.map((member) => (
            <article className="team-card" key={member.name}>
              <div className="team-avatar">
                <Image
                  src={member.photo}
                  alt={`${member.name}, ${member.role}`}
                  fill
                  sizes="(max-width: 520px) 100vw, (max-width: 1050px) 50vw, 20vw"
                  style={{ objectPosition: member.position }}
                />
              </div>
              <div><h3>{member.name}</h3><p>{member.role}</p></div>
              <a href="https://github.com/African-Cancer-Biomarkers-Initiative/Open-Access-Cancer-Biomarkers-Database-Africa-OCBDA-" target="_blank" rel="noreferrer" aria-label={`${member.name} on GitHub`}><Github size={18} /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div><p className="section-kicker light">Help the evidence grow</p><h2>Your finding could<br />change the picture.</h2></div>
        <div><p>Contribute a biomarker, improve the repository, or join the open-source community.</p><a className="button button-cream" href="https://forms.gle/dt2SaWUz7rH8JkKi8" target="_blank" rel="noreferrer">Contribute to OACBDA <ArrowRight size={17} /></a></div>
      </section>

      <footer>
        <div className="footer-main">
          <a className="brand footer-brand" href="#top"><span className="brand-mark"><span /><span /><span /></span><span className="brand-copy"><strong>OACBDA</strong><small>Open cancer evidence for Africa</small></span></a>
          <p>Built in the open for a more representative future in cancer research and care.</p>
          <div className="footer-links"><a href="#database">Database</a><a href="#about">About</a><a href="#team">Team</a><a href="https://github.com/African-Cancer-Biomarkers-Initiative/Open-Access-Cancer-Biomarkers-Database-Africa-OCBDA-" target="_blank" rel="noreferrer">GitHub ↗</a></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} OACBDA</span><span>Open access · Community led · Africa centred</span></div>
      </footer>
    </main>
  );
}
