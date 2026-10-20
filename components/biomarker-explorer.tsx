"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Check, ChevronLeft, ChevronRight, Copy, Download, ExternalLink, Filter, Search, Share2, X } from "lucide-react";
import type { EvidenceRecord } from "@/lib/contracts";

export const fixtureRecords: EvidenceRecord[] = [
  { id: "ACBDT-DEMO-001", marker: "HER2", measuredTarget: "ERBB2-encoded protein", entity: "Protein", cancer: "Breast cancer", country: "Ghana", region: "Western Africa", assay: "IHC", role: "Predictive", year: 2023, status: "Cohort verified", matchBasis: "Synthetic verified-cohort fixture", note: "Demonstrates a protein-level finding kept separate from the ERBB2 gene and the assay used to measure it." },
  { id: "ACBDT-DEMO-002", marker: "HPV-16 DNA", measuredTarget: "HPV16 genomic DNA", entity: "Viral DNA", cancer: "Cervical cancer", country: "Nigeria", region: "Western Africa", assay: "PCR", role: "Risk", year: 2024, status: "Requires full text", matchBasis: "Country and cancer found in abstract", note: "Full text is required before the recruitment country, sample origin, and assay details can be verified." },
  { id: "ACBDT-DEMO-003", marker: "PSA", measuredTarget: "KLK3 protein", entity: "Protein", cancer: "Prostate cancer", country: "Benin", region: "Western Africa", assay: "Immunoassay", role: "Diagnostic", year: 2022, status: "Unscreened", matchBasis: "Benin country term in title/abstract", note: "The review step must rule out Benin City, Nigeria before assigning this publication to the country Benin." },
  { id: "ACBDT-DEMO-004", marker: "TP53", measuredTarget: "TP53 gene", entity: "Gene", cancer: "Breast cancer", country: "Côte d’Ivoire", region: "Western Africa", assay: "Targeted sequencing", role: "Prognostic", year: 2021, status: "Requires full text", matchBasis: "Country alias and marker match", note: "A gene mention is not yet a variant-level finding. Variant details remain unassigned until source verification." },
  { id: "ACBDT-DEMO-005", marker: "KRAS p.G12D", measuredTarget: "KRAS coding variant", entity: "Variant", cancer: "Colorectal cancer", country: "Mali", region: "Western Africa", assay: "NGS panel", role: "Predictive", year: 2020, status: "Cohort verified", matchBasis: "Synthetic verified-cohort fixture", note: "Demonstrates variant, assay, cohort, and clinical role as separate structured fields." },
  { id: "ACBDT-DEMO-006", marker: "AFP", measuredTarget: "Alpha-fetoprotein", entity: "Protein", cancer: "Liver cancer", country: "Niger", region: "Western Africa", assay: "Serum immunoassay", role: "Diagnostic", year: 2023, status: "Unscreened", matchBasis: "Niger country term in title/abstract", note: "The screening workflow must distinguish Niger from Nigeria and Nigerian before any cohort assignment." },
  { id: "ACBDT-DEMO-007", marker: "p16INK4a", measuredTarget: "CDKN2A protein", entity: "Protein", cancer: "Cervical cancer", country: "Burkina Faso", region: "Western Africa", assay: "IHC", role: "Diagnostic", year: 2024, status: "Requires full text", matchBasis: "Country, cancer and marker match", note: "Marker presence is a candidate signal only. The original methods and cohort description still require review." },
  { id: "ACBDT-DEMO-008", marker: "BRCA1", measuredTarget: "BRCA1 gene", entity: "Gene", cancer: "Breast cancer", country: "Togo", region: "Western Africa", assay: "Germline sequencing", role: "Risk", year: 2022, status: "Unscreened", matchBasis: "Country and gene found in abstract", note: "The record does not become a variant or hereditary-risk finding until the source-level evidence is extracted." },
  { id: "ACBDT-DEMO-009", marker: "Ki-67", measuredTarget: "MKI67 protein", entity: "Protein", cancer: "Breast cancer", country: "Nigeria", region: "Western Africa", assay: "IHC", role: "Prognostic", year: 2019, status: "Cohort verified", matchBasis: "Synthetic verified-cohort fixture", note: "Demonstrates an assay-dependent marker where cutoff and scoring method are required for interpretation." },
  { id: "ACBDT-DEMO-010", marker: "HPV + p16", measuredTarget: "Viral DNA and p16 protein", entity: "Assay panel", cancer: "Cervical cancer", country: "Ghana", region: "Western Africa", assay: "PCR + IHC", role: "Diagnostic", year: 2024, status: "Unscreened", matchBasis: "Candidate panel terms in abstract", note: "Panel components remain individually addressable; co-mention does not prove a combined diagnostic protocol." },
];

type SortKey = "marker" | "entity" | "cancer" | "country" | "role" | "year";
const pageSize = 6;

type InitialFilters = Partial<Record<"q" | "country" | "cancer" | "entity" | "status" | "role", string>>;

export function BiomarkerExplorer({
  initialFilters = {},
  records = fixtureRecords,
  dataSource = "fallback",
  sourceMessage,
}: {
  initialFilters?: InitialFilters;
  records?: EvidenceRecord[];
  dataSource?: "api" | "fallback";
  sourceMessage?: string;
}) {
  const [query, setQuery] = useState(initialFilters.q ?? "");
  const [country, setCountry] = useState(initialFilters.country ?? "All countries");
  const [cancer, setCancer] = useState(initialFilters.cancer ?? "All cancers");
  const [entity, setEntity] = useState(initialFilters.entity ?? "All entities");
  const [status, setStatus] = useState(initialFilters.status ?? "All review states");
  const [role, setRole] = useState(initialFilters.role ?? "All roles");
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
      && (cancer === "All cancers" || item.cancer === cancer)
      && (entity === "All entities" || item.entity === entity)
      && (status === "All review states" || item.status === status)
      && (role === "All roles" || item.role === role);
  }).sort((a, b) => {
    const result = String(a[sortKey]).localeCompare(String(b[sortKey]), undefined, { numeric: true });
    return sortDirection === "asc" ? result : -result;
  }), [records, query, country, cancer, entity, status, role, sortKey, sortDirection]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const hasFilters = Boolean(query) || country !== "All countries" || cancer !== "All cancers" || entity !== "All entities" || status !== "All review states" || role !== "All roles";
  const updateFilter = (setter: (value: string) => void, value: string) => { setter(value); setPage(1); };
  const resetFilters = () => { setQuery(""); setCountry("All countries"); setCancer("All cancers"); setEntity("All entities"); setStatus("All review states"); setRole("All roles"); setPage(1); };
  const toggleSort = (key: SortKey) => { if (sortKey === key) setSortDirection((value) => value === "asc" ? "desc" : "asc"); else { setSortKey(key); setSortDirection("asc"); } setPage(1); };
  const sortIcon = (key: SortKey) => sortKey !== key ? <ArrowUpDown size={12} /> : sortDirection === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />;
  const exportCsv = () => {
    const headers = ["Fixture ID", "Marker", "Measured target", "Entity", "Cancer", "Country", "Region", "Assay", "Role", "Year", "Review status", "Match basis"];
    const rows = filtered.map((item) => [item.id, item.marker, item.measuredTarget, item.entity, item.cancer, item.country, item.region, item.assay, item.role, item.year, item.status, item.matchBasis]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "acbdt-synthetic-pilot-fixtures.csv"; link.click(); URL.revokeObjectURL(url);
  };
  const shareSearch = async () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query); if (country !== "All countries") params.set("country", country); if (cancer !== "All cancers") params.set("cancer", cancer);
    if (entity !== "All entities") params.set("entity", entity); if (status !== "All review states") params.set("status", status); if (role !== "All roles") params.set("role", role);
    const url = `${window.location.origin}${window.location.pathname}${params.size ? `?${params}` : ""}`;
    window.history.replaceState(null, "", url); await navigator.clipboard.writeText(url); setCopied("search"); window.setTimeout(() => setCopied(""), 1600);
  };

  return <section className="database-section" id="database">
    <div className="database-header"><div><p className="section-kicker">Discovery workspace</p><h2>Start with a marker.<br />Follow the evidence chain.</h2></div><p>Search synthetic pilot fixtures by biomarker, cancer, country, entity type, clinical role, and review state.</p></div>
    <div className="explorer">
      <div className="explorer-toolbar">
        <label className="search-box"><Search size={19} /><input ref={searchRef} value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search HER2, breast cancer, Ghana…" /><kbd>/</kbd></label>
        <button className="utility-button" type="button" onClick={shareSearch}>{copied === "search" ? <Check size={16} /> : <Share2 size={16} />}{copied === "search" ? "Link copied" : "Share search"}</button>
        <button className="export-button" type="button" onClick={exportCsv} disabled={!filtered.length}><Download size={16} />Export CSV</button>
      </div>
      <div className="advanced-filters"><span><Filter size={13} /> Refine results</span>
        <FilterSelect label="Country" value={country} onChange={(value) => updateFilter(setCountry, value)} all="All countries" values={records.map((item) => item.country)} />
        <FilterSelect label="Cancer" value={cancer} onChange={(value) => updateFilter(setCancer, value)} all="All cancers" values={records.map((item) => item.cancer)} />
        <FilterSelect label="Entity" value={entity} onChange={(value) => updateFilter(setEntity, value)} all="All entities" values={records.map((item) => item.entity)} />
        <FilterSelect label="Review state" value={status} onChange={(value) => updateFilter(setStatus, value)} all="All review states" values={records.map((item) => item.status)} />
        <FilterSelect label="Role" value={role} onChange={(value) => updateFilter(setRole, value)} all="All roles" values={records.map((item) => item.role)} />
        <button type="button" onClick={resetFilters} disabled={!hasFilters}>Reset</button>
      </div>
      <div className={`demo-notice${dataSource === "fallback" ? " demo-notice-partial" : ""}`}><strong>{dataSource === "api" ? "API-connected fixtures" : "Offline fallback"}</strong><span>{sourceMessage || "These synthetic records demonstrate product behavior. They are not scientific findings and must not be used clinically."}</span></div>
      <div className="table-wrap">
        <table className="biomarker-table"><thead><tr>
          {([['marker','Biomarker'],['entity','Entity'],['cancer','Cancer'],['country','Country / region'],['role','Role'],['year','Year']] as [SortKey,string][]).map(([key, label]) => <th key={key}><button type="button" onClick={() => toggleSort(key)} className={sortKey === key ? "active" : ""}>{label}{sortIcon(key)}</button></th>)}<th>Review state</th><th><span className="sr-only">Open record</span></th>
        </tr></thead><tbody>
          {visible.map((item) => <tr key={item.id}><td><button className="marker-name" type="button" onClick={() => setSelected(item)}><strong>{item.marker}</strong><small>{item.measuredTarget}</small></button></td><td><span className="entity-tag">{item.entity}</span></td><td>{item.cancer}</td><td><span className="region-cell"><strong>{item.country}</strong><small>{item.region}</small></span></td><td>{item.role}</td><td>{item.year}</td><td><span className={`status-badge status-${item.status.toLowerCase().replaceAll(" ", "-")}`}>{item.status}</span></td><td><button className="row-action" type="button" onClick={() => setSelected(item)}>View</button></td></tr>)}
        </tbody></table>
        {!filtered.length && <div className="empty-state"><Search size={25} /><strong>No matching fixtures</strong><span>Try a broader term or remove one of the active filters.</span><button type="button" onClick={resetFilters}>Clear all filters</button></div>}
      </div>
      <div className="explorer-footer"><span>Showing {filtered.length ? (currentPage - 1) * pageSize + 1 : 0}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} fixtures</span><div className="pagination"><button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage === 1}><ChevronLeft size={15} />Previous</button><span>Page {currentPage} of {pageCount}</span><button type="button" onClick={() => setPage((value) => Math.min(pageCount, value + 1))} disabled={currentPage === pageCount}>Next<ChevronRight size={15} /></button></div></div>
    </div>

    {selected && <div className="record-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><article className="record-dialog" role="dialog" aria-modal="true" aria-labelledby="record-title">
      <div className="record-dialog-head"><div><span>Synthetic evidence-chain fixture</span><h3 id="record-title">{selected.marker}</h3><p>{selected.measuredTarget}</p></div><button type="button" onClick={() => setSelected(null)} aria-label="Close record"><X size={20} /></button></div>
      <div className="record-id"><span>{selected.id}</span><button type="button" onClick={async () => { await navigator.clipboard.writeText(selected.id); setCopied("record"); }}>{copied === "record" ? <Check size={14} /> : <Copy size={14} />}{copied === "record" ? "Copied" : "Copy ID"}</button></div>
      <div className="methodology-callout"><strong>{selected.status}</strong><p>{selected.matchBasis}. {selected.note}</p></div>
      <dl className="record-metadata"><div><dt>Entity type</dt><dd>{selected.entity}</dd></div><div><dt>Assay</dt><dd>{selected.assay}</dd></div><div><dt>Cancer</dt><dd>{selected.cancer}</dd></div><div><dt>Clinical role</dt><dd>{selected.role}</dd></div><div><dt>Country</dt><dd>{selected.country}</dd></div><div><dt>Region</dt><dd>{selected.region}</dd></div></dl>
      <div className="source-panel"><span>Source evidence</span><h4>No publication attached to this fixture</h4><p>Production records will include PMID/DOI, a permitted evidence excerpt, extraction method, reviewer, timestamp, and publication status.</p><a href="https://europepmc.org/RestfulWebService" target="_blank" rel="noreferrer">Europe PMC API documentation <ExternalLink size={13} /></a></div>
      <div className="record-status"><span><i />Prototype only</span><small>Not a scientific claim · Not for clinical use</small></div>
    </article></div>}
  </section>;
}

function FilterSelect({ label, value, onChange, all, values }: { label: string; value: string; onChange: (value: string) => void; all: string; values: string[] }) {
  return <label><span className="sr-only">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}><option>{all}</option>{[...new Set(values)].sort().map((item) => <option key={item}>{item}</option>)}</select></label>;
}
