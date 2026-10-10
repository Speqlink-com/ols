"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Check, ChevronLeft, ChevronRight, Copy, Download, Filter, Search, X } from "lucide-react";

type Biomarker = {
  id: string;
  name: string;
  cancer: string;
  country: string;
  type: "Diagnostic" | "Predictive" | "Prognostic" | "Risk";
  source: "Literature" | "Clinical" | "Registry";
  cohort: number;
  year: number;
  status: "Curated" | "Under review";
  summary: string;
};

const biomarkers: Biomarker[] = [
  { id: "OLS-NGA-001", name: "BRCA1", cancer: "Breast cancer", country: "Nigeria", type: "Predictive", source: "Literature", cohort: 214, year: 2024, status: "Curated", summary: "Illustrative record connecting a hereditary cancer marker with study population, evidence use and provenance." },
  { id: "OLS-GHA-002", name: "TP53", cancer: "Breast cancer", country: "Ghana", type: "Prognostic", source: "Literature", cohort: 168, year: 2023, status: "Curated", summary: "Demonstration evidence record showing how study and population context may accompany a biomarker finding." },
  { id: "OLS-ZAF-003", name: "PSA", cancer: "Prostate cancer", country: "South Africa", type: "Diagnostic", source: "Clinical", cohort: 442, year: 2024, status: "Curated", summary: "Prototype clinical evidence entry with diagnostic classification and cohort-level metadata." },
  { id: "OLS-KEN-004", name: "HPV-16", cancer: "Cervical cancer", country: "Kenya", type: "Risk", source: "Literature", cohort: 389, year: 2022, status: "Curated", summary: "Illustrative risk-marker record with geographic context and a traceable evidence source." },
  { id: "OLS-RWA-005", name: "HER2", cancer: "Breast cancer", country: "Rwanda", type: "Predictive", source: "Clinical", cohort: 126, year: 2025, status: "Under review", summary: "Demonstration treatment-response marker record awaiting final prototype curation." },
  { id: "OLS-UGA-006", name: "EGFR", cancer: "Lung cancer", country: "Uganda", type: "Predictive", source: "Registry", cohort: 94, year: 2023, status: "Under review", summary: "Illustrative registry-linked entry for testing linked accessions and evidence review states." },
  { id: "OLS-TZA-007", name: "KRAS", cancer: "Colorectal cancer", country: "Tanzania", type: "Predictive", source: "Literature", cohort: 151, year: 2021, status: "Curated", summary: "Prototype molecular marker entry structured for comparison across cancer types and countries." },
  { id: "OLS-ETH-008", name: "BRAF", cancer: "Melanoma", country: "Ethiopia", type: "Predictive", source: "Clinical", cohort: 78, year: 2024, status: "Under review", summary: "Illustrative clinical biomarker record showing review status and cohort metadata." },
  { id: "OLS-EGY-009", name: "AFP", cancer: "Liver cancer", country: "Egypt", type: "Diagnostic", source: "Literature", cohort: 503, year: 2022, status: "Curated", summary: "Demonstration diagnostic record with population and publication context." },
  { id: "OLS-SEN-010", name: "CA-125", cancer: "Ovarian cancer", country: "Senegal", type: "Diagnostic", source: "Clinical", cohort: 112, year: 2025, status: "Under review", summary: "Prototype ovarian cancer marker record designed to demonstrate faceted discovery." },
  { id: "OLS-MAR-011", name: "PIK3CA", cancer: "Breast cancer", country: "Morocco", type: "Predictive", source: "Registry", cohort: 207, year: 2023, status: "Curated", summary: "Illustrative registry record connecting a genomic alteration to contextual evidence." },
  { id: "OLS-ZMB-012", name: "PD-L1", cancer: "Lung cancer", country: "Zambia", type: "Predictive", source: "Clinical", cohort: 86, year: 2024, status: "Under review", summary: "Demonstration clinical record for a treatment-response evidence workflow." },
  { id: "OLS-BWA-013", name: "MLH1", cancer: "Colorectal cancer", country: "Botswana", type: "Risk", source: "Literature", cohort: 132, year: 2020, status: "Curated", summary: "Prototype hereditary-risk entry with curation and source information." },
  { id: "OLS-NAM-014", name: "MSH2", cancer: "Colorectal cancer", country: "Namibia", type: "Risk", source: "Registry", cohort: 73, year: 2022, status: "Under review", summary: "Illustrative registry record demonstrating population-specific risk evidence." },
  { id: "OLS-CMR-015", name: "EBV DNA", cancer: "Nasopharyngeal cancer", country: "Cameroon", type: "Diagnostic", source: "Literature", cohort: 196, year: 2023, status: "Curated", summary: "Demonstration circulating marker record with source, cohort and geographic metadata." },
  { id: "OLS-TUN-016", name: "ESR1", cancer: "Breast cancer", country: "Tunisia", type: "Prognostic", source: "Clinical", cohort: 245, year: 2021, status: "Curated", summary: "Prototype prognostic entry supporting cancer, country and evidence-use filtering." },
  { id: "OLS-MWI-017", name: "p16", cancer: "Cervical cancer", country: "Malawi", type: "Prognostic", source: "Literature", cohort: 119, year: 2024, status: "Under review", summary: "Illustrative evidence record for prototype search, sorting and review workflows." },
  { id: "OLS-CIV-018", name: "ALK", cancer: "Lung cancer", country: "Côte d’Ivoire", type: "Predictive", source: "Registry", cohort: 67, year: 2025, status: "Under review", summary: "Demonstration linked registry entry with treatment-response classification." },
];

type SortKey = "name" | "cancer" | "country" | "type" | "source" | "year";
const pageSize = 6;

export function BiomarkerExplorer() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All evidence");
  const [cancer, setCancer] = useState("All cancers");
  const [country, setCountry] = useState("All countries");
  const [source, setSource] = useState("All sources");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Biomarker | null>(null);
  const [copied, setCopied] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => biomarkers.filter((item) => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery = !normalizedQuery || Object.values(item).join(" ").toLowerCase().includes(normalizedQuery);
    return matchesQuery
      && (type === "All evidence" || item.type === type)
      && (cancer === "All cancers" || item.cancer === cancer)
      && (country === "All countries" || item.country === country)
      && (source === "All sources" || item.source === source);
  }).sort((a, b) => {
    const left = a[sortKey];
    const right = b[sortKey];
    const result = typeof left === "number" && typeof right === "number"
      ? left - right
      : String(left).localeCompare(String(right));
    return sortDirection === "asc" ? result : -result;
  }), [query, type, cancer, country, source, sortKey, sortDirection]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const firstVisible = filtered.length ? (currentPage - 1) * pageSize + 1 : 0;
  const lastVisible = Math.min(currentPage * pageSize, filtered.length);
  const hasFilters = Boolean(query) || type !== "All evidence" || cancer !== "All cancers" || country !== "All countries" || source !== "All sources";

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const updateQuery = (value: string) => { setQuery(value); setPage(1); };
  const updateFilter = (setter: (value: string) => void, value: string) => { setter(value); setPage(1); };
  const resetFilters = () => {
    setQuery(""); setType("All evidence"); setCancer("All cancers"); setCountry("All countries"); setSource("All sources"); setPage(1);
  };
  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDirection((direction) => direction === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDirection("asc"); }
    setPage(1);
  };
  const exportCsv = () => {
    const headers = ["Record ID", "Biomarker", "Cancer type", "Country", "Evidence use", "Source", "Cohort", "Year", "Status"];
    const rows = filtered.map((item) => [item.id, item.name, item.cancer, item.country, item.type, item.source, item.cohort, item.year, item.status]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = "ols-biomarker-preview.csv"; link.click();
    URL.revokeObjectURL(url);
  };
  const copyRecordId = async () => {
    if (!selected) return;
    await navigator.clipboard.writeText(selected.id);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  const sortIcon = (key: SortKey) => sortKey !== key ? <ArrowUpDown size={12} /> : sortDirection === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />;

  return (
    <section className="database-section" id="database">
      <div className="database-header">
        <div><p className="section-kicker">Explore the evidence</p><h2>Start with a marker.<br />Follow the context.</h2></div>
        <p>Search by biomarker, cancer type, or country. Sort, filter, inspect and export the prototype records to test a complete discovery workflow.</p>
      </div>
      <div className="explorer">
        <div className="explorer-toolbar">
          <label className="search-box"><Search size={19} /><input ref={searchRef} value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Search marker, ID, cancer, country…" /><kbd>⌘ K</kbd></label>
          <label className="filter-box"><Filter size={16} /><select value={type} onChange={(event) => updateFilter(setType, event.target.value)} aria-label="Filter by evidence type"><option>All evidence</option><option>Diagnostic</option><option>Predictive</option><option>Prognostic</option><option>Risk</option></select></label>
          <button className="export-button" type="button" onClick={exportCsv} disabled={!filtered.length}><Download size={16} />Export CSV</button>
        </div>
        <div className="advanced-filters">
          <span>Refine results</span>
          <label><span className="sr-only">Cancer type</span><select value={cancer} onChange={(event) => updateFilter(setCancer, event.target.value)}><option>All cancers</option>{[...new Set(biomarkers.map((item) => item.cancer))].sort().map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span className="sr-only">Population or country</span><select value={country} onChange={(event) => updateFilter(setCountry, event.target.value)}><option>All countries</option>{[...new Set(biomarkers.map((item) => item.country))].sort().map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span className="sr-only">Evidence source</span><select value={source} onChange={(event) => updateFilter(setSource, event.target.value)}><option>All sources</option><option>Clinical</option><option>Literature</option><option>Registry</option></select></label>
          <button type="button" onClick={resetFilters} disabled={!hasFilters}>Reset filters</button>
        </div>
        <div className="demo-notice"><span>Working prototype</span> {biomarkers.length} illustrative records for interface demonstration—not for clinical decision-making.</div>
        <div className="table-wrap">
          <table className="biomarker-table">
            <thead><tr>
              {([['name','Biomarker'],['cancer','Cancer type'],['country','Population / country'],['type','Evidence use'],['source','Source'],['year','Year']] as [SortKey,string][]).map(([key, label]) => <th key={key}><button type="button" onClick={() => toggleSort(key)} className={sortKey === key ? "active" : ""}>{label}{sortIcon(key)}</button></th>)}
              <th><span className="sr-only">Open record</span></th>
            </tr></thead>
            <tbody>
              {visible.map((item) => <tr key={item.id} onDoubleClick={() => setSelected(item)}>
                <td><button className="marker-name" type="button" onClick={() => setSelected(item)}><strong>{item.name}</strong><small>{item.id}</small></button></td>
                <td>{item.cancer}</td><td><span className="country-dot" />{item.country}</td>
                <td><span className={`evidence-tag tag-${item.type.toLowerCase()}`}>{item.type}</span></td>
                <td>{item.source}</td><td>{item.year}</td>
                <td><button className="row-action" type="button" onClick={() => setSelected(item)} aria-label={`Open ${item.name} record`}>View</button></td>
              </tr>)}
            </tbody>
          </table>
          {!filtered.length && <div className="empty-state"><Search size={25} /><strong>No matching records</strong><span>Try a broader term or clear the active filters.</span><button type="button" onClick={resetFilters}>Clear all filters</button></div>}
        </div>
        <div className="explorer-footer">
          <span>Showing {firstVisible}–{lastVisible} of {filtered.length} matching records</span>
          <div className="pagination" aria-label="Results pagination"><button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage === 1}><ChevronLeft size={15} />Previous</button><span>Page {currentPage} of {pageCount}</span><button type="button" onClick={() => setPage((value) => Math.min(pageCount, value + 1))} disabled={currentPage === pageCount}>Next<ChevronRight size={15} /></button></div>
        </div>
      </div>

      {selected && <div className="record-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
        <article className="record-dialog" role="dialog" aria-modal="true" aria-labelledby="record-title">
          <div className="record-dialog-head"><div><span>Biomarker record</span><h3 id="record-title">{selected.name}</h3></div><button type="button" onClick={() => setSelected(null)} aria-label="Close record"><X size={20} /></button></div>
          <div className="record-id"><span>{selected.id}</span><button type="button" onClick={copyRecordId}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Copied" : "Copy ID"}</button></div>
          <p className="record-summary">{selected.summary}</p>
          <dl className="record-metadata">
            <div><dt>Cancer type</dt><dd>{selected.cancer}</dd></div><div><dt>Population</dt><dd>{selected.country}</dd></div>
            <div><dt>Evidence use</dt><dd>{selected.type}</dd></div><div><dt>Evidence source</dt><dd>{selected.source}</dd></div>
            <div><dt>Illustrative cohort</dt><dd>{selected.cohort.toLocaleString()} participants</dd></div><div><dt>Study year</dt><dd>{selected.year}</dd></div>
          </dl>
          <div className="record-status"><span className={selected.status === "Curated" ? "curated" : "review"}><i />{selected.status}</span><small>Prototype data · Not for clinical use</small></div>
        </article>
      </div>}
    </section>
  );
}
