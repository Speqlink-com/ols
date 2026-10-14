"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Check, ChevronLeft, ChevronRight, Copy, Download, Filter, Search, X } from "lucide-react";

type Region = "Central Africa" | "Eastern Africa" | "Northern Africa" | "Southern Africa" | "Western Africa";
type Biomarker = {
  id: string; name: string; alias: string; virus: string; cancer: string; country: string; region: Region;
  specimen: string; type: "Diagnostic" | "Predictive" | "Prognostic" | "Risk";
  source: "Literature" | "Clinical" | "Registry"; cohort: number; year: number;
  status: "Curated" | "Under review"; summary: string;
};

const biomarkers: Biomarker[] = [
  { id: "ACBD-NGA-001", name: "HPV-16 E6 DNA", alias: "HPV16-E6", virus: "Human papillomavirus", cancer: "Cervical cancer", country: "Nigeria", region: "Western Africa", specimen: "Cervical swab", type: "Diagnostic", source: "Literature", cohort: 214, year: 2024, status: "Curated", summary: "Illustrative molecular record linking high-risk HPV DNA detection with cervical cancer evidence and regional study context." },
  { id: "ACBD-GHA-002", name: "EBV DNA", alias: "cfEBV DNA", virus: "Epstein–Barr virus", cancer: "Nasopharyngeal cancer", country: "Ghana", region: "Western Africa", specimen: "Plasma", type: "Diagnostic", source: "Literature", cohort: 168, year: 2023, status: "Curated", summary: "Demonstration circulating viral DNA record with specimen, population, clinical-use and provenance metadata." },
  { id: "ACBD-ZAF-003", name: "HHV-8 LANA", alias: "LANA-1", virus: "Kaposi sarcoma herpesvirus", cancer: "Kaposi sarcoma", country: "South Africa", region: "Southern Africa", specimen: "Tumour tissue", type: "Prognostic", source: "Clinical", cohort: 142, year: 2024, status: "Curated", summary: "Prototype tissue biomarker record for virus-associated malignancy with cohort and evidence-review context." },
  { id: "ACBD-KEN-004", name: "HPV-16 DNA", alias: "HPV16", virus: "Human papillomavirus", cancer: "Cervical cancer", country: "Kenya", region: "Eastern Africa", specimen: "Cervical swab", type: "Risk", source: "Literature", cohort: 389, year: 2022, status: "Curated", summary: "Illustrative high-risk HPV record structured for comparison across African populations and study settings." },
  { id: "ACBD-RWA-005", name: "HIV viral load", alias: "HIV-1 RNA", virus: "Human immunodeficiency virus", cancer: "Kaposi sarcoma", country: "Rwanda", region: "Eastern Africa", specimen: "Plasma", type: "Prognostic", source: "Clinical", cohort: 126, year: 2025, status: "Under review", summary: "Demonstration clinical record associating viral burden with a virus-related cancer evidence workflow." },
  { id: "ACBD-UGA-006", name: "EBV LMP1", alias: "LMP1", virus: "Epstein–Barr virus", cancer: "Burkitt lymphoma", country: "Uganda", region: "Eastern Africa", specimen: "Tumour tissue", type: "Prognostic", source: "Registry", cohort: 94, year: 2023, status: "Under review", summary: "Illustrative EBV protein marker entry with linked tumour, geography and review-state metadata." },
  { id: "ACBD-TZA-007", name: "HPV E6/E7 mRNA", alias: "E6/E7 transcript", virus: "Human papillomavirus", cancer: "Cervical cancer", country: "Tanzania", region: "Eastern Africa", specimen: "Cervical cells", type: "Diagnostic", source: "Literature", cohort: 151, year: 2021, status: "Curated", summary: "Prototype transcriptional marker record designed for clinical-purpose and specimen-based discovery." },
  { id: "ACBD-ETH-008", name: "HBV DNA", alias: "HBV viral load", virus: "Hepatitis B virus", cancer: "Liver cancer", country: "Ethiopia", region: "Eastern Africa", specimen: "Serum", type: "Risk", source: "Clinical", cohort: 278, year: 2024, status: "Under review", summary: "Illustrative hepatitis B record showing regional risk evidence and specimen context." },
  { id: "ACBD-EGY-009", name: "HBsAg + AFP", alias: "HBsAg/AFP panel", virus: "Hepatitis B virus", cancer: "Liver cancer", country: "Egypt", region: "Northern Africa", specimen: "Serum", type: "Diagnostic", source: "Literature", cohort: 503, year: 2022, status: "Curated", summary: "Demonstration multi-marker panel record with virus association, population and publication context." },
  { id: "ACBD-SEN-010", name: "HBsAg", alias: "Hepatitis B surface antigen", virus: "Hepatitis B virus", cancer: "Liver cancer", country: "Senegal", region: "Western Africa", specimen: "Serum", type: "Risk", source: "Clinical", cohort: 312, year: 2025, status: "Under review", summary: "Prototype viral antigen record for region, evidence-use and source filtering." },
  { id: "ACBD-MAR-011", name: "HCV core antigen", alias: "HCVcAg", virus: "Hepatitis C virus", cancer: "Liver cancer", country: "Morocco", region: "Northern Africa", specimen: "Plasma", type: "Diagnostic", source: "Registry", cohort: 207, year: 2023, status: "Curated", summary: "Illustrative registry record connecting a circulating viral antigen to cancer evidence context." },
  { id: "ACBD-ZMB-012", name: "HPV-18 DNA", alias: "HPV18", virus: "Human papillomavirus", cancer: "Cervical cancer", country: "Zambia", region: "Southern Africa", specimen: "Cervical swab", type: "Risk", source: "Clinical", cohort: 186, year: 2024, status: "Under review", summary: "Demonstration high-risk HPV genotype entry for an Africa-specific screening evidence workflow." },
  { id: "ACBD-BWA-013", name: "HHV-8 antibodies", alias: "KSHV serology", virus: "Kaposi sarcoma herpesvirus", cancer: "Kaposi sarcoma", country: "Botswana", region: "Southern Africa", specimen: "Serum", type: "Risk", source: "Literature", cohort: 232, year: 2020, status: "Curated", summary: "Prototype serology entry with curation, specimen and geographic information." },
  { id: "ACBD-NAM-014", name: "MCPyV VP1 antibodies", alias: "VP1 serology", virus: "Merkel cell polyomavirus", cancer: "Merkel cell carcinoma", country: "Namibia", region: "Southern Africa", specimen: "Serum", type: "Risk", source: "Registry", cohort: 73, year: 2022, status: "Under review", summary: "Illustrative polyomavirus record demonstrating specialist cancer-virus evidence discovery." },
  { id: "ACBD-CMR-015", name: "EBV EBER", alias: "EBER-ISH", virus: "Epstein–Barr virus", cancer: "Nasopharyngeal cancer", country: "Cameroon", region: "Central Africa", specimen: "Tumour tissue", type: "Diagnostic", source: "Literature", cohort: 196, year: 2023, status: "Curated", summary: "Demonstration tissue marker record with source, cohort, specimen and Central African context." },
  { id: "ACBD-TUN-016", name: "HCV RNA", alias: "HCV viral load", virus: "Hepatitis C virus", cancer: "Liver cancer", country: "Tunisia", region: "Northern Africa", specimen: "Plasma", type: "Risk", source: "Clinical", cohort: 245, year: 2021, status: "Curated", summary: "Prototype viral RNA entry supporting region, cancer and evidence-use filtering." },
  { id: "ACBD-MWI-017", name: "p16INK4a", alias: "p16", virus: "Human papillomavirus", cancer: "Cervical cancer", country: "Malawi", region: "Southern Africa", specimen: "Tumour tissue", type: "Prognostic", source: "Literature", cohort: 119, year: 2024, status: "Under review", summary: "Illustrative surrogate marker record for prototype search, sorting and review workflows." },
  { id: "ACBD-CIV-018", name: "EBV VCA-IgA", alias: "VCA-IgA", virus: "Epstein–Barr virus", cancer: "Nasopharyngeal cancer", country: "Côte d’Ivoire", region: "Western Africa", specimen: "Serum", type: "Diagnostic", source: "Registry", cohort: 167, year: 2025, status: "Under review", summary: "Demonstration EBV serology record with regional and diagnostic classification." },
];

type SortKey = "name" | "virus" | "cancer" | "region" | "type" | "year";
const pageSize = 6;

export function BiomarkerExplorer() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All evidence");
  const [cancer, setCancer] = useState("All cancers");
  const [region, setRegion] = useState("All regions");
  const [virus, setVirus] = useState("All viruses");
  const [source, setSource] = useState("All sources");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Biomarker | null>(null);
  const [copied, setCopied] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => biomarkers.filter((item) => {
    const term = query.trim().toLowerCase();
    return (!term || Object.values(item).join(" ").toLowerCase().includes(term))
      && (type === "All evidence" || item.type === type)
      && (cancer === "All cancers" || item.cancer === cancer)
      && (region === "All regions" || item.region === region)
      && (virus === "All viruses" || item.virus === virus)
      && (source === "All sources" || item.source === source);
  }).sort((a, b) => {
    const result = String(a[sortKey]).localeCompare(String(b[sortKey]), undefined, { numeric: true });
    return sortDirection === "asc" ? result : -result;
  }), [query, type, cancer, region, virus, source, sortKey, sortDirection]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const firstVisible = filtered.length ? (currentPage - 1) * pageSize + 1 : 0;
  const lastVisible = Math.min(currentPage * pageSize, filtered.length);
  const hasFilters = Boolean(query) || type !== "All evidence" || cancer !== "All cancers" || region !== "All regions" || virus !== "All viruses" || source !== "All sources";

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); searchRef.current?.focus(); }
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const updateFilter = (setter: (value: string) => void, value: string) => { setter(value); setPage(1); };
  const resetFilters = () => { setQuery(""); setType("All evidence"); setCancer("All cancers"); setRegion("All regions"); setVirus("All viruses"); setSource("All sources"); setPage(1); };
  const toggleSort = (key: SortKey) => { if (sortKey === key) setSortDirection((value) => value === "asc" ? "desc" : "asc"); else { setSortKey(key); setSortDirection("asc"); } setPage(1); };
  const exportCsv = () => {
    const headers = ["Record ID", "Biomarker", "Alias", "Virus", "Cancer", "Region", "Country", "Specimen", "Evidence use", "Source", "Cohort", "Year", "Status"];
    const rows = filtered.map((item) => [item.id, item.name, item.alias, item.virus, item.cancer, item.region, item.country, item.specimen, item.type, item.source, item.cohort, item.year, item.status]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "africa-cancer-biomarkers-preview.csv"; link.click(); URL.revokeObjectURL(url);
  };
  const copyRecordId = async () => { if (!selected) return; await navigator.clipboard.writeText(selected.id); setCopied(true); window.setTimeout(() => setCopied(false), 1600); };
  const sortIcon = (key: SortKey) => sortKey !== key ? <ArrowUpDown size={12} /> : sortDirection === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />;

  return <section className="database-section" id="database">
    <div className="database-header">
      <div><p className="section-kicker">Explore the evidence</p><h2>Start with a marker.<br />Follow the context.</h2></div>
      <p>Browse virus-linked biomarkers by African region, associated cancer, specimen, clinical purpose, or evidence source.</p>
    </div>
    <div className="explorer">
      <div className="explorer-toolbar">
        <label className="search-box"><Search size={19} /><input ref={searchRef} value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search marker, virus, alias, country…" /><kbd>⌘ K</kbd></label>
        <label className="filter-box"><Filter size={16} /><select value={type} onChange={(event) => updateFilter(setType, event.target.value)} aria-label="Filter by evidence type"><option>All evidence</option><option>Diagnostic</option><option>Predictive</option><option>Prognostic</option><option>Risk</option></select></label>
        <button className="export-button" type="button" onClick={exportCsv} disabled={!filtered.length}><Download size={16} />Export CSV</button>
      </div>
      <div className="advanced-filters">
        <span>Refine results</span>
        <label><span className="sr-only">African region</span><select value={region} onChange={(event) => updateFilter(setRegion, event.target.value)}><option>All regions</option>{[...new Set(biomarkers.map((item) => item.region))].sort().map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span className="sr-only">Associated virus</span><select value={virus} onChange={(event) => updateFilter(setVirus, event.target.value)}><option>All viruses</option>{[...new Set(biomarkers.map((item) => item.virus))].sort().map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span className="sr-only">Cancer type</span><select value={cancer} onChange={(event) => updateFilter(setCancer, event.target.value)}><option>All cancers</option>{[...new Set(biomarkers.map((item) => item.cancer))].sort().map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span className="sr-only">Evidence source</span><select value={source} onChange={(event) => updateFilter(setSource, event.target.value)}><option>All sources</option><option>Clinical</option><option>Literature</option><option>Registry</option></select></label>
        <button type="button" onClick={resetFilters} disabled={!hasFilters}>Reset</button>
      </div>
      <div className="demo-notice"><span>Working prototype</span> {biomarkers.length} illustrative cancer-virus records—not for clinical decision-making.</div>
      <div className="table-wrap">
        <table className="biomarker-table"><thead><tr>
          {([['name','Biomarker'],['virus','Virus association'],['cancer','Associated cancer'],['region','African region'],['type','Clinical use'],['year','Year']] as [SortKey,string][]).map(([key, label]) => <th key={key}><button type="button" onClick={() => toggleSort(key)} className={sortKey === key ? "active" : ""}>{label}{sortIcon(key)}</button></th>)}
          <th><span className="sr-only">Open record</span></th>
        </tr></thead><tbody>
          {visible.map((item) => <tr key={item.id} onDoubleClick={() => setSelected(item)}>
            <td><button className="marker-name" type="button" onClick={() => setSelected(item)}><strong>{item.name}</strong><small>{item.alias} · {item.id}</small></button></td>
            <td><span className="virus-name">{item.virus}</span></td><td>{item.cancer}</td>
            <td><span className="region-cell"><strong>{item.region}</strong><small><span className="country-dot" />{item.country}</small></span></td>
            <td><span className={`evidence-tag tag-${item.type.toLowerCase()}`}>{item.type}</span></td><td>{item.year}</td>
            <td><button className="row-action" type="button" onClick={() => setSelected(item)} aria-label={`Open ${item.name} record`}>View</button></td>
          </tr>)}
        </tbody></table>
        {!filtered.length && <div className="empty-state"><Search size={25} /><strong>No matching records</strong><span>Try a broader term or clear the active filters.</span><button type="button" onClick={resetFilters}>Clear all filters</button></div>}
      </div>
      <div className="explorer-footer"><span>Showing {firstVisible}–{lastVisible} of {filtered.length} matching records</span><div className="pagination" aria-label="Results pagination"><button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage === 1}><ChevronLeft size={15} />Previous</button><span>Page {currentPage} of {pageCount}</span><button type="button" onClick={() => setPage((value) => Math.min(pageCount, value + 1))} disabled={currentPage === pageCount}>Next<ChevronRight size={15} /></button></div></div>
    </div>

    {selected && <div className="record-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><article className="record-dialog" role="dialog" aria-modal="true" aria-labelledby="record-title">
      <div className="record-dialog-head"><div><span>Cancer-virus biomarker record</span><h3 id="record-title">{selected.name}</h3></div><button type="button" onClick={() => setSelected(null)} aria-label="Close record"><X size={20} /></button></div>
      <div className="record-id"><span>{selected.id}</span><button type="button" onClick={copyRecordId}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Copied" : "Copy ID"}</button></div>
      <p className="record-summary">{selected.summary}</p>
      <dl className="record-metadata">
        <div><dt>Virus association</dt><dd>{selected.virus}</dd></div><div><dt>Associated cancer</dt><dd>{selected.cancer}</dd></div>
        <div><dt>African region</dt><dd>{selected.region}</dd></div><div><dt>Country</dt><dd>{selected.country}</dd></div>
        <div><dt>Alias</dt><dd>{selected.alias}</dd></div><div><dt>Specimen</dt><dd>{selected.specimen}</dd></div>
        <div><dt>Clinical use</dt><dd>{selected.type}</dd></div><div><dt>Evidence source</dt><dd>{selected.source}</dd></div>
        <div><dt>Illustrative cohort</dt><dd>{selected.cohort.toLocaleString()} participants</dd></div><div><dt>Study year</dt><dd>{selected.year}</dd></div>
      </dl>
      <div className="record-status"><span className={selected.status === "Curated" ? "curated" : "review"}><i />{selected.status}</span><small>Prototype data · Not for clinical use</small></div>
    </article></div>}
  </section>;
}
