"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Check, ChevronLeft, ChevronRight, Copy, Download, ExternalLink, Filter, Search, Share2, X } from "lucide-react";
import type { EvidenceRecord } from "@/lib/contracts";

export const fixtureRecords: EvidenceRecord[] = [
  { id: "ACBD-DEMO-001", marker: "HER2", measuredTarget: "ERBB2-encoded protein", entity: "Protein", cancer: "Breast cancer", country: "Ghana", region: "Western Africa", assay: "IHC", role: "Predictive", year: 2023, status: "Cohort verified", matchBasis: "Synthetic verified-cohort fixture", note: "Protein, gene, assay, and cohort remain separate structured fields." },
  { id: "ACBD-DEMO-002", marker: "HPV-16 DNA", measuredTarget: "HPV16 genomic DNA", entity: "Viral DNA", cancer: "Cervical cancer", country: "Nigeria", region: "Western Africa", assay: "PCR", role: "Risk", year: 2024, status: "Requires full text", matchBasis: "Country and cancer found in abstract", note: "Recruitment country, sample origin, and assay details still require source verification." },
  { id: "ACBD-DEMO-003", marker: "PSA", measuredTarget: "KLK3 protein", entity: "Protein", cancer: "Prostate cancer", country: "Benin", region: "Western Africa", assay: "Immunoassay", role: "Diagnostic", year: 2022, status: "Unscreened", matchBasis: "Country term in title or abstract", note: "Screening must distinguish the country Benin from Benin City, Nigeria." },
  { id: "ACBD-DEMO-004", marker: "CA-125", measuredTarget: "MUC16 protein", entity: "Protein", cancer: "Ovarian cancer", country: "Kenya", region: "Eastern Africa", assay: "Serum immunoassay", role: "Monitoring", year: 2024, status: "Cohort verified", matchBasis: "Synthetic verified-cohort fixture", note: "Demonstrates monitoring context with assay and cohort retained." },
  { id: "ACBD-DEMO-005", marker: "BCR-ABL1", measuredTarget: "BCR-ABL1 fusion transcript", entity: "Variant", cancer: "Leukemia", country: "Uganda", region: "Eastern Africa", assay: "RT-PCR", role: "Diagnostic", year: 2021, status: "Requires full text", matchBasis: "Marker and country terms matched", note: "The exact cohort and transcript result require full-text review." },
  { id: "ACBD-DEMO-006", marker: "HPV + p16", measuredTarget: "Viral DNA and p16 protein", entity: "Assay panel", cancer: "Cervical cancer", country: "Tanzania", region: "Eastern Africa", assay: "PCR + IHC", role: "Diagnostic", year: 2023, status: "Unscreened", matchBasis: "Candidate panel terms in abstract", note: "Co-mention does not establish a combined diagnostic protocol." },
  { id: "ACBD-DEMO-007", marker: "KRAS p.G12D", measuredTarget: "KRAS coding variant", entity: "Variant", cancer: "Colorectal cancer", country: "South Africa", region: "Southern Africa", assay: "NGS panel", role: "Predictive", year: 2023, status: "Cohort verified", matchBasis: "Synthetic verified-cohort fixture", note: "Variant, assay, cohort, and clinical role are independently addressable." },
  { id: "ACBD-DEMO-008", marker: "PD-L1", measuredTarget: "CD274 protein", entity: "Protein", cancer: "Lung cancer", country: "Botswana", region: "Southern Africa", assay: "IHC", role: "Predictive", year: 2024, status: "Unscreened", matchBasis: "Country and marker terms matched", note: "Scoring method and cutoff remain unverified." },
  { id: "ACBD-DEMO-009", marker: "BRCA1", measuredTarget: "BRCA1 gene", entity: "Gene", cancer: "Breast cancer", country: "Zambia", region: "Southern Africa", assay: "Germline sequencing", role: "Risk", year: 2022, status: "Requires full text", matchBasis: "Gene and cancer terms matched", note: "A gene mention is not yet a variant-level hereditary-risk finding." },
  { id: "ACBD-DEMO-010", marker: "EGFR", measuredTarget: "EGFR gene variants", entity: "Variant", cancer: "Lung cancer", country: "Egypt", region: "Northern Africa", assay: "Targeted sequencing", role: "Predictive", year: 2024, status: "Cohort verified", matchBasis: "Synthetic verified-cohort fixture", note: "Demonstrates a variant-aware lung cancer record." },
  { id: "ACBD-DEMO-011", marker: "ALK", measuredTarget: "ALK rearrangement", entity: "Variant", cancer: "Lung cancer", country: "Morocco", region: "Northern Africa", assay: "FISH", role: "Predictive", year: 2022, status: "Requires full text", matchBasis: "Country and marker terms matched", note: "The rearrangement result and cohort origin require confirmation." },
  { id: "ACBD-DEMO-012", marker: "AFP", measuredTarget: "Alpha-fetoprotein", entity: "Protein", cancer: "Liver cancer", country: "Tunisia", region: "Northern Africa", assay: "Serum immunoassay", role: "Diagnostic", year: 2021, status: "Unscreened", matchBasis: "Candidate marker terms in abstract", note: "The diagnostic context is not yet reviewer approved." },
  { id: "ACBD-DEMO-013", marker: "EBV DNA", measuredTarget: "Epstein-Barr virus DNA", entity: "Viral DNA", cancer: "Nasopharyngeal cancer", country: "Cameroon", region: "Central Africa", assay: "qPCR", role: "Monitoring", year: 2023, status: "Cohort verified", matchBasis: "Synthetic verified-cohort fixture", note: "Demonstrates viral biomarker monitoring context." },
  { id: "ACBD-DEMO-014", marker: "HHV-8", measuredTarget: "Human herpesvirus 8 DNA", entity: "Viral DNA", cancer: "Kaposi sarcoma", country: "Democratic Republic of the Congo", region: "Central Africa", assay: "PCR", role: "Diagnostic", year: 2020, status: "Requires full text", matchBasis: "Cancer and viral marker terms matched", note: "Cohort origin and assay result still require review." },
  { id: "ACBD-DEMO-015", marker: "p16INK4a", measuredTarget: "CDKN2A protein", entity: "Protein", cancer: "Cervical cancer", country: "Gabon", region: "Central Africa", assay: "IHC", role: "Diagnostic", year: 2024, status: "Unscreened", matchBasis: "Marker and country terms matched", note: "Marker presence remains a candidate signal until source review." },
  { id: "ACBD-DEMO-016", marker: "CA 19-9", measuredTarget: "Sialyl-Lewis A antigen", entity: "Protein", cancer: "Pancreatic cancer", country: "Ethiopia", region: "Eastern Africa", assay: "Serum immunoassay", role: "Monitoring", year: 2023, status: "Unscreened", matchBasis: "Synthetic candidate fixture", note: "This record demonstrates pancreatic cancer discovery and requires scientific source review." },
  { id: "ACBD-DEMO-017", marker: "CD20", measuredTarget: "MS4A1 protein", entity: "Protein", cancer: "Lymphoma", country: "Rwanda", region: "Eastern Africa", assay: "IHC", role: "Diagnostic", year: 2022, status: "Requires full text", matchBasis: "Synthetic candidate fixture", note: "Lymphoma subtype and cohort recruitment remain to be verified." },
  { id: "ACBD-DEMO-018", marker: "HER2", measuredTarget: "ERBB2-encoded protein", entity: "Protein", cancer: "Gastric cancer", country: "Algeria", region: "Northern Africa", assay: "IHC + ISH", role: "Predictive", year: 2024, status: "Cohort verified", matchBasis: "Synthetic verified-cohort fixture", note: "Demonstrates a gastric cancer predictive biomarker record." },
  { id: "ACBD-DEMO-019", marker: "FGFR3", measuredTarget: "FGFR3 gene variants", entity: "Variant", cancer: "Bladder cancer", country: "Zimbabwe", region: "Southern Africa", assay: "Targeted sequencing", role: "Predictive", year: 2023, status: "Unscreened", matchBasis: "Synthetic candidate fixture", note: "Variant and treatment context require source-linked review." },
];

type SortKey = "marker" | "cancer" | "country" | "region" | "assay" | "role" | "year";
const pageSize = 6;
type FilterKey = "q" | "country" | "region" | "cancer" | "entity" | "assay" | "status" | "role" | "year";
type InitialFilters = Partial<Record<FilterKey, string>>;

export function BiomarkerExplorer({ initialFilters = {}, records = fixtureRecords, dataSource = "fallback", sourceMessage }: { initialFilters?: InitialFilters; records?: EvidenceRecord[]; dataSource?: "api" | "fallback"; sourceMessage?: string }) {
  const [query, setQuery] = useState(initialFilters.q ?? "");
  const [country, setCountry] = useState(initialFilters.country ?? "All countries");
  const [region, setRegion] = useState(initialFilters.region ?? "All regions");
  const [cancer, setCancer] = useState(initialFilters.cancer ?? "All cancers");
  const [entity, setEntity] = useState(initialFilters.entity ?? "All entities");
  const [assay, setAssay] = useState(initialFilters.assay ?? "All assays");
  const [status, setStatus] = useState(initialFilters.status ?? "All review states");
  const [role, setRole] = useState(initialFilters.role ?? "All roles");
  const [year, setYear] = useState(initialFilters.year ?? "All years");
  const [sortKey, setSortKey] = useState<SortKey>("marker");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<EvidenceRecord | null>(null);
  const [copied, setCopied] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.key === "/" && !(event.target instanceof HTMLInputElement)) || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k")) { event.preventDefault(); searchRef.current?.focus(); }
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const filtered = useMemo(() => records.filter((item) => {
    const term = query.trim().toLowerCase();
    return (!term || Object.values(item).join(" ").toLowerCase().includes(term))
      && (country === "All countries" || item.country === country)
      && (region === "All regions" || item.region === region)
      && (cancer === "All cancers" || item.cancer === cancer)
      && (entity === "All entities" || item.entity === entity)
      && (assay === "All assays" || item.assay === assay)
      && (status === "All review states" || item.status === status)
      && (role === "All roles" || item.role === role)
      && (year === "All years" || String(item.year) === year);
  }).sort((a, b) => {
    const result = String(a[sortKey]).localeCompare(String(b[sortKey]), undefined, { numeric: true });
    return sortDirection === "asc" ? result : -result;
  }), [records, query, country, region, cancer, entity, assay, status, role, year, sortKey, sortDirection]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const hasFilters = Boolean(query) || [country, region, cancer, entity, assay, status, role, year].some((value) => value.startsWith("All ") === false);
  const updateFilter = (setter: (value: string) => void, value: string) => { setter(value); setPage(1); };
  const resetFilters = () => { setQuery(""); setCountry("All countries"); setRegion("All regions"); setCancer("All cancers"); setEntity("All entities"); setAssay("All assays"); setStatus("All review states"); setRole("All roles"); setYear("All years"); setPage(1); };
  const toggleSort = (key: SortKey) => { if (sortKey === key) setSortDirection((value) => value === "asc" ? "desc" : "asc"); else { setSortKey(key); setSortDirection("asc"); } setPage(1); };
  const sortIcon = (key: SortKey) => sortKey !== key ? <ArrowUpDown size={13} /> : sortDirection === "asc" ? <ArrowUp size={13} /> : <ArrowDown size={13} />;
  const exportCsv = () => {
    const headers = ["Fixture ID", "Marker", "Measured target", "Entity", "Cancer", "Country", "Region", "Assay", "Role", "Year", "Review status"];
    const rows = filtered.map((item) => [item.id, item.marker, item.measuredTarget, item.entity, item.cancer, item.country, item.region, item.assay, item.role, item.year, item.status]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "acbdt-synthetic-fixtures.csv"; link.click(); URL.revokeObjectURL(url);
  };
  const shareSearch = async () => {
    const params = new URLSearchParams();
    const values: Record<FilterKey, string> = { q: query, country, region, cancer, entity, assay, status, role, year };
    Object.entries(values).forEach(([key, value]) => { if (value && !value.startsWith("All ")) params.set(key, value); });
    const url = `${window.location.origin}${window.location.pathname}${params.size ? `?${params}` : ""}#database`;
    window.history.replaceState(null, "", url); await navigator.clipboard.writeText(url); setCopied("search"); window.setTimeout(() => setCopied(""), 1600);
  };

  return <section className="database-section" id="database">
    <div className="database-header"><div><p className="section-kicker">Biomarker discovery</p><h2>Filter the evidence table.</h2></div><p>Search synthetic prototype records by cancer, African region, country, assay, entity, role, year, and review state.</p></div>
    <div className="explorer premium-explorer">
      <div className="explorer-toolbar">
        <label className="search-box"><Search size={20} /><input ref={searchRef} value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search marker, cancer, country, assay..." /><kbd>/</kbd></label>
        <button className="utility-button" type="button" onClick={shareSearch}>{copied === "search" ? <Check size={17} /> : <Share2 size={17} />}{copied === "search" ? "Copied" : "Share"}</button>
        <button className="export-button" type="button" onClick={exportCsv} disabled={!filtered.length}><Download size={17} />Export</button>
      </div>
      <div className="filter-panel"><div className="filter-panel-title"><Filter size={17} /><strong>Refine results</strong><button type="button" onClick={resetFilters} disabled={!hasFilters}>Clear all</button></div><div className="filter-grid">
        <FilterSelect label="Region" value={region} onChange={(value) => updateFilter(setRegion, value)} all="All regions" values={records.map((item) => item.region)} />
        <FilterSelect label="Country" value={country} onChange={(value) => updateFilter(setCountry, value)} all="All countries" values={records.map((item) => item.country)} />
        <FilterSelect label="Cancer" value={cancer} onChange={(value) => updateFilter(setCancer, value)} all="All cancers" values={records.map((item) => item.cancer)} />
        <FilterSelect label="Entity" value={entity} onChange={(value) => updateFilter(setEntity, value)} all="All entities" values={records.map((item) => item.entity)} />
        <FilterSelect label="Assay" value={assay} onChange={(value) => updateFilter(setAssay, value)} all="All assays" values={records.map((item) => item.assay)} />
        <FilterSelect label="Clinical role" value={role} onChange={(value) => updateFilter(setRole, value)} all="All roles" values={records.map((item) => item.role)} />
        <FilterSelect label="Review state" value={status} onChange={(value) => updateFilter(setStatus, value)} all="All review states" values={records.map((item) => item.status)} />
        <FilterSelect label="Year" value={year} onChange={(value) => updateFilter(setYear, value)} all="All years" values={records.map((item) => String(item.year))} />
      </div></div>
      <div className={`demo-notice${dataSource === "fallback" ? " demo-notice-partial" : ""}`}><strong>{dataSource === "api" ? "API fixtures" : "Local fixtures"}</strong><span>{sourceMessage || "Synthetic records demonstrate interface behaviour. They are not scientific findings and must not be used clinically."}</span></div>
      <div className="table-wrap"><table className="biomarker-table"><thead><tr>
        {([['marker','Biomarker'],['cancer','Cancer'],['country','Location'],['assay','Assay'],['role','Role'],['year','Year']] as [SortKey,string][]).map(([key, label]) => <th key={key}><button type="button" onClick={() => toggleSort(key)} className={sortKey === key ? "active" : ""}>{label}{sortIcon(key)}</button></th>)}<th>Review</th><th><span className="sr-only">Open record</span></th>
      </tr></thead><tbody>
        {visible.map((item) => <tr key={item.id}><td><button className="marker-name" type="button" onClick={() => setSelected(item)}><strong>{item.marker}</strong><small>{item.entity} · {item.measuredTarget}</small></button></td><td>{item.cancer}</td><td><span className="region-cell"><strong>{item.country}</strong><small>{item.region}</small></span></td><td><span className="assay-tag">{item.assay}</span></td><td>{item.role}</td><td>{item.year}</td><td><span className={`status-badge status-${item.status.toLowerCase().replaceAll(" ", "-")}`}>{item.status}</span></td><td><button className="row-action" type="button" onClick={() => setSelected(item)}>Details</button></td></tr>)}
      </tbody></table>{!filtered.length && <div className="empty-state"><Search size={28} /><strong>No matching fixtures</strong><span>Try a broader term or clear one of the filters.</span><button type="button" onClick={resetFilters}>Clear filters</button></div>}</div>
      <div className="explorer-footer"><span>Showing {filtered.length ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} fixtures</span><div className="pagination"><button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage === 1}><ChevronLeft size={16} />Previous</button><span>{currentPage} / {pageCount}</span><button type="button" onClick={() => setPage((value) => Math.min(pageCount, value + 1))} disabled={currentPage === pageCount}>Next<ChevronRight size={16} /></button></div></div>
    </div>

    {selected && <div className="record-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><article className="record-dialog" role="dialog" aria-modal="true" aria-labelledby="record-title">
      <div className="record-dialog-head"><div><span>Synthetic evidence fixture</span><h3 id="record-title">{selected.marker}</h3><p>{selected.measuredTarget}</p></div><button type="button" onClick={() => setSelected(null)} aria-label="Close record"><X size={20} /></button></div>
      <div className="record-id"><span>{selected.id}</span><button type="button" onClick={async () => { await navigator.clipboard.writeText(selected.id); setCopied("record"); }}>{copied === "record" ? <Check size={15} /> : <Copy size={15} />}{copied === "record" ? "Copied" : "Copy ID"}</button></div>
      <div className="methodology-callout"><strong>{selected.status}</strong><p>{selected.matchBasis}. {selected.note}</p></div>
      <dl className="record-metadata"><div><dt>Entity</dt><dd>{selected.entity}</dd></div><div><dt>Assay</dt><dd>{selected.assay}</dd></div><div><dt>Cancer</dt><dd>{selected.cancer}</dd></div><div><dt>Role</dt><dd>{selected.role}</dd></div><div><dt>Country</dt><dd>{selected.country}</dd></div><div><dt>Region</dt><dd>{selected.region}</dd></div></dl>
      <div className="source-panel"><span>Source evidence</span><h4>No publication attached to this fixture</h4><p>Production records will include PMID or DOI, permitted evidence text, extraction method, reviewer, timestamp, and publication status.</p><a href="https://europepmc.org/RestfulWebService" target="_blank" rel="noreferrer">Europe PMC API documentation <ExternalLink size={14} /></a></div>
      <div className="record-status"><span><i />Prototype only</span><small>Not a scientific claim · Not for clinical use</small></div>
    </article></div>}
  </section>;
}

function FilterSelect({ label, value, onChange, all, values }: { label: string; value: string; onChange: (value: string) => void; all: string; values: string[] }) {
  return <label className="filter-field"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}><option>{all}</option>{[...new Set(values)].sort().map((item) => <option key={item}>{item}</option>)}</select></label>;
}
