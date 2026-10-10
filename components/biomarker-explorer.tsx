"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Filter, Search } from "lucide-react";

const biomarkers = [
  { name: "BRCA1", cancer: "Breast cancer", country: "Nigeria", type: "Predictive", source: "Literature" },
  { name: "TP53", cancer: "Breast cancer", country: "Ghana", type: "Prognostic", source: "Literature" },
  { name: "PSA", cancer: "Prostate cancer", country: "South Africa", type: "Diagnostic", source: "Clinical" },
  { name: "HPV-16", cancer: "Cervical cancer", country: "Kenya", type: "Risk", source: "Literature" },
  { name: "HER2", cancer: "Breast cancer", country: "Rwanda", type: "Predictive", source: "Clinical" },
];

export function BiomarkerExplorer() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All evidence");
  const [cancer, setCancer] = useState("All cancers");
  const [country, setCountry] = useState("All countries");
  const filtered = useMemo(() => biomarkers.filter((item) => {
    const matchesQuery = Object.values(item).join(" ").toLowerCase().includes(query.toLowerCase());
    const matchesType = type === "All evidence" || item.type === type;
    const matchesCancer = cancer === "All cancers" || item.cancer === cancer;
    const matchesCountry = country === "All countries" || item.country === country;
    return matchesQuery && matchesType && matchesCancer && matchesCountry;
  }), [query, type, cancer, country]);

  const resetFilters = () => {
    setQuery("");
    setType("All evidence");
    setCancer("All cancers");
    setCountry("All countries");
  };

  return (
    <section className="database-section" id="database">
      <div className="database-header">
        <div><p className="section-kicker">Explore the evidence</p><h2>Start with a marker.<br />Follow the context.</h2></div>
        <p>Search by biomarker, cancer type, or country. Each record is designed to preserve the context that makes evidence meaningful.</p>
      </div>
      <div className="explorer">
        <div className="explorer-toolbar">
          <label className="search-box"><Search size={19} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search biomarker, cancer, country…" /><kbd>⌘ K</kbd></label>
          <label className="filter-box"><Filter size={16} /><select value={type} onChange={(e) => setType(e.target.value)} aria-label="Filter by evidence type"><option>All evidence</option><option>Diagnostic</option><option>Predictive</option><option>Prognostic</option><option>Risk</option></select></label>
        </div>
        <div className="advanced-filters">
          <span>Refine results</span>
          <label><span className="sr-only">Cancer type</span><select value={cancer} onChange={(e) => setCancer(e.target.value)}><option>All cancers</option><option>Breast cancer</option><option>Cervical cancer</option><option>Prostate cancer</option></select></label>
          <label><span className="sr-only">Population or country</span><select value={country} onChange={(e) => setCountry(e.target.value)}><option>All countries</option>{[...new Set(biomarkers.map((item) => item.country))].map((item) => <option key={item}>{item}</option>)}</select></label>
          <button type="button" onClick={resetFilters}>Reset filters</button>
        </div>
        <div className="demo-notice"><span>Preview dataset</span> Illustrative records for interface demonstration—not for clinical decision-making.</div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Biomarker</th><th>Cancer type</th><th>Population / country</th><th>Evidence use</th><th>Source</th><th><span className="sr-only">Open</span></th></tr></thead>
            <tbody>
              {filtered.map((item) => <tr key={`${item.name}-${item.country}`}><td><strong>{item.name}</strong></td><td>{item.cancer}</td><td><span className="country-dot" />{item.country}</td><td><span className={`evidence-tag tag-${item.type.toLowerCase()}`}>{item.type}</span></td><td>{item.source}</td><td><button aria-label={`Open ${item.name} record`}><ArrowUpRight size={17} /></button></td></tr>)}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="empty-state">No preview records match your search.</div>}
        </div>
        <div className="explorer-footer"><span>Showing {filtered.length} of {biomarkers.length} preview records</span><a href="https://github.com/African-Cancer-Biomarkers-Initiative/Open-Access-Cancer-Biomarkers-Database-Africa-OCBDA-" target="_blank" rel="noreferrer">View the open-source project <ArrowUpRight size={15} /></a></div>
      </div>
    </section>
  );
}
