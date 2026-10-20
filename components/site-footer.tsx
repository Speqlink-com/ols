import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <Link className="brand footer-brand" href="/">
          <Image className="brand-logo footer-logo" src="/logo.png" alt="" width={72} height={72} />
          <span className="brand-copy"><strong>ACBDT</strong><small>Africa Cancer Biomarkers<br />Database &amp; Technology</small></span>
        </Link>
        <p>A research and education platform for traceable cancer biomarker evidence in African cohorts. Not for diagnosis or treatment decisions.</p>
        <div className="footer-links">
          <Link href="/biomarkers">Biomarkers</Link><Link href="/evidence">Evidence</Link><Link href="/atlas">Cancer Atlas</Link><Link href="/about">About the team</Link><Link href="/methods">Methods</Link>
          <a href="https://github.com/African-Cancer-Biomarkers-Initiative/Open-Access-Cancer-Biomarkers-Database-Africa-OCBDA-" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} ACBDT</span><span>Open access · Evidence traceable · Africa centred</span></div>
    </footer>
  );
}
