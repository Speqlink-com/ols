import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

type SiteHeaderProps = {
  tone?: "dark" | "light";
};

const navigation = [
  { href: "/explore", label: "Explore" },
  { href: "/atlas", label: "Cancer Atlas" },
  { href: "/explore?view=biomarkers", label: "Biomarkers" },
  { href: "/explore?view=evidence", label: "Evidence" },
  { href: "/methods", label: "Learn" },
  { href: "/#about", label: "About" },
];

export function SiteHeader({ tone = "light" }: SiteHeaderProps) {
  return (
    <header className={`site-header site-header-${tone}`}>
      <Link className="brand" href="/" aria-label="ACBDT home">
        <span className="brand-symbol" aria-hidden="true"><i /><i /><i /><i /></span>
        <span className="brand-copy">
          <strong>ACBDT</strong>
          <small>Africa Cancer Biomarkers<br />Database &amp; Technology</small>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}
      </nav>
      <Link className="header-cta" href="/methods#contribute">Contribute data <ArrowUpRight size={15} /></Link>
      <details className="mobile-menu">
        <summary aria-label="Open navigation"><Menu /></summary>
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}
        </nav>
      </details>
    </header>
  );
}
