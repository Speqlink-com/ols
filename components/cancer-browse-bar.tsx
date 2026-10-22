import Link from "next/link";
import { Activity, ArrowUpRight, Dna, FlaskConical, HeartPulse, Microscope, Search, ShieldCheck, Users } from "lucide-react";

const cancerTypes = [
  { name: "Breast", query: "Breast cancer", marker: "HER2 / BRCA", icon: Activity },
  { name: "Cervical", query: "Cervical cancer", marker: "HPV / p16", icon: ShieldCheck },
  { name: "Prostate", query: "Prostate cancer", marker: "PSA / AR", icon: Search },
  { name: "Colorectal", query: "Colorectal cancer", marker: "KRAS / CEA", icon: Dna },
  { name: "Liver", query: "Liver cancer", marker: "AFP / HBV", icon: FlaskConical },
  { name: "Lung", query: "Lung cancer", marker: "EGFR / ALK", icon: HeartPulse },
  { name: "Leukaemia", query: "Leukemia", marker: "BCR-ABL1", icon: Microscope },
  { name: "Kaposi sarcoma", query: "Kaposi sarcoma", marker: "HHV-8", icon: Users },
  { name: "Ovarian", query: "Ovarian cancer", marker: "CA-125 / HE4", icon: Activity },
  { name: "Nasopharyngeal", query: "Nasopharyngeal cancer", marker: "EBV DNA", icon: Dna },
  { name: "Pancreatic", query: "Pancreatic cancer", marker: "CA 19-9 / KRAS", icon: FlaskConical },
  { name: "Lymphoma", query: "Lymphoma", marker: "EBV / CD20", icon: Microscope },
  { name: "Stomach", query: "Gastric cancer", marker: "HER2 / CEA", icon: HeartPulse },
  { name: "Bladder", query: "Bladder cancer", marker: "FGFR3 / NMP22", icon: Search },
];

export function CancerBrowseBar() {
  return (
    <section className="cancer-browse" aria-label="Browse cancer types">
      <div className="cancer-browse-heading">
        <div><span>Explore by cancer type</span><small>Select a card to open the filtered evidence table</small></div>
        <strong>14 research pathways</strong>
      </div>
      <div className="cancer-browse-viewport">
        <div className="cancer-browse-track">
          {cancerTypes.map(({ name, query, marker, icon: Icon }, index) => (
            <Link className="cancer-discovery-card" href={`/biomarkers?cancer=${encodeURIComponent(query)}#database`} key={name}>
              <span className="cancer-card-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="cancer-icon"><Icon size={21} /></span>
              <span className="cancer-card-copy"><strong>{name}</strong><small>{marker}</small></span>
              <ArrowUpRight className="cancer-card-arrow" size={17} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
