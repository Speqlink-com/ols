import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPinned } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Africa evidence atlas | ACBD", description: "Regional cancer biomarker evidence discovery across Northern, Western, Central, Eastern, and Southern Africa." };

const regions = [
  { name: "Northern Africa", countries: "Egypt · Morocco · Tunisia · Algeria", examples: "EGFR · ALK · AFP" },
  { name: "Western Africa", countries: "Nigeria · Ghana · Benin · Mali", examples: "HER2 · HPV · PSA" },
  { name: "Central Africa", countries: "Cameroon · DRC · Gabon · Chad", examples: "EBV DNA · HPV · HHV-8" },
  { name: "Eastern Africa", countries: "Kenya · Uganda · Tanzania · Ethiopia", examples: "CA-125 · HPV · BCR-ABL1" },
  { name: "Southern Africa", countries: "South Africa · Botswana · Zambia · Zimbabwe", examples: "KRAS · PD-L1 · HER2" },
];

export default function AtlasPage() {
  return <main className="internal-page compact-page"><SiteHeader />
    <section className="page-intro compact-intro atlas-intro"><p className="section-kicker">Africa evidence atlas</p><h1>Browse biomarker context across the continent.</h1><p>Regional labels support discovery. They do not imply prevalence, cancer burden, or evidence strength.</p></section>
    <section className="compact-atlas-content">
      <div className="region-directory">
        {regions.map((region, index) => <Link href={`/biomarkers?region=${encodeURIComponent(region.name)}#database`} key={region.name}><span>0{index + 1}</span><MapPinned /><div><h2>{region.name}</h2><p>{region.countries}</p><small>Prototype markers: {region.examples}</small></div><ArrowRight /></Link>)}
      </div>
      <div className="atlas-note"><strong>Important interpretation rule</strong><p>Country and region are structured cohort fields, not keyword shortcuts. Recruitment country and sample origin must be verified before publication.</p><Link href="/methods#screening">Read the screening rules <ArrowRight size={16} /></Link></div>
    </section><SiteFooter /></main>;
}
