import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

type SiteHeaderProps = {
  tone?: "dark" | "light";
};

const navigation = [
  { href: "/biomarkers", label: "Biomarkers" },
  { href: "/evidence", label: "Evidence" },
  { href: "/atlas", label: "Africa Atlas" },
  { href: "/methods", label: "Methods" },
  { href: "/about", label: "About" },
  { href: "/collaborators", label: "Collaborators" },
];

export function SiteHeader({ tone = "light" }: SiteHeaderProps) {
  return (
    <header className={`site-header site-header-${tone}`}>
      <Link className="brand" href="/" aria-label="ACBDT home">
        <Image className="brand-logo-wide" src="/acbd.png" alt="Africa Cancer Biomarkers Database" width={178} height={89} priority />
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}
      </nav>
      <a className="header-cta" href="https://forms.gle/9XDx8Fc718Gi3xPh9" target="_blank" rel="noreferrer">Contribute data <ArrowUpRight size={15} /></a>
      <details className="mobile-menu">
        <summary aria-label="Open navigation"><Menu /></summary>
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}
        </nav>
      </details>
    </header>
  );
}
