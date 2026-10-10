"use client";

import { ExternalLink, Search } from "lucide-react";
import { useMemo, useState } from "react";

const resources = [
  { name: "NCBI", focus: "General biology", detail: "Genomes, genes, proteins, sequences and literature", category: "Core archives", url: "https://www.ncbi.nlm.nih.gov/" },
  { name: "GenBank", focus: "Nucleotide sequences", detail: "DNA and RNA sequences from organisms worldwide", category: "Core archives", url: "https://www.ncbi.nlm.nih.gov/genbank/" },
  { name: "ENA", focus: "Nucleotide & genomic data", detail: "Sequence reads, assemblies and annotations", category: "Core archives", url: "https://www.ebi.ac.uk/ena/browser/home" },
  { name: "DDBJ", focus: "Nucleotide sequences", detail: "DNA and RNA sequence data", category: "Core archives", url: "https://www.ddbj.nig.ac.jp/index-e.html" },
  { name: "UniProt", focus: "Proteins", detail: "Protein sequences, functions and annotations", category: "Proteins & structures", url: "https://www.uniprot.org/" },
  { name: "PDB", focus: "3D structures", detail: "Structures of proteins, DNA, RNA and complexes", category: "Proteins & structures", url: "https://www.rcsb.org/" },
  { name: "Human Protein Atlas", focus: "Human proteins", detail: "Expression and localisation in tissues and cells", category: "Proteins & structures", url: "https://www.proteinatlas.org/" },
  { name: "Ensembl", focus: "Genomics", detail: "Genomes, genes, variants and comparative genomics", category: "Genomics & variation", url: "https://www.ensembl.org/" },
  { name: "ClinVar", focus: "Clinical variation", detail: "Relationships between genetic variants and disease", category: "Genomics & variation", url: "https://www.ncbi.nlm.nih.gov/clinvar/" },
  { name: "dbSNP", focus: "Genetic variation", detail: "Short genetic variants including SNPs", category: "Genomics & variation", url: "https://www.ncbi.nlm.nih.gov/snp/" },
  { name: "gnomAD", focus: "Population genomics", detail: "Population frequencies of human variants", category: "Genomics & variation", url: "https://gnomad.broadinstitute.org/" },
  { name: "KEGG", focus: "Biological pathways", detail: "Pathways, genes, diseases and biological systems", category: "Pathways & function", url: "https://www.genome.jp/kegg/" },
  { name: "Reactome", focus: "Molecular pathways", detail: "Curated biological pathways and reactions", category: "Pathways & function", url: "https://reactome.org/" },
  { name: "Gene Ontology", focus: "Functional annotation", detail: "Standard terms for gene and protein functions", category: "Pathways & function", url: "https://geneontology.org/" },
  { name: "GEO", focus: "Gene expression", detail: "Functional genomics and expression datasets", category: "Studies & reads", url: "https://www.ncbi.nlm.nih.gov/geo/" },
  { name: "SRA", focus: "Sequencing data", detail: "Raw high-throughput sequencing datasets", category: "Studies & reads", url: "https://www.ncbi.nlm.nih.gov/sra" },
  { name: "MG-RAST", focus: "Metagenomics", detail: "Metagenomic analysis and microbial data", category: "Specialist resources", url: "https://www.mg-rast.org/" },
  { name: "BOLD Systems", focus: "DNA barcoding", detail: "Species identification and barcode sequences", category: "Specialist resources", url: "https://boldsystems.org/" },
  { name: "GBIF", focus: "Biodiversity", detail: "Global species occurrence and biodiversity data", category: "Specialist resources", url: "https://www.gbif.org/" },
  { name: "VectorBase", focus: "Vector genomics", detail: "Genomic information on disease vectors", category: "Specialist resources", url: "https://vectorbase.org/" },
  { name: "ViPR / IRD", focus: "Viral pathogens", detail: "Viral genomic and related biological information", category: "Specialist resources", url: "https://www.bv-brc.org/" },
  { name: "BV-BRC", focus: "Bacterial pathogens", detail: "Bacterial genomes and comparative pathogen data", category: "Specialist resources", url: "https://www.bv-brc.org/" },
];

const categories = ["All resources", ...new Set(resources.map((resource) => resource.category))];

export function ResourceEcosystem() {
  const [active, setActive] = useState("All resources");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => resources.filter((resource) => {
    const categoryMatch = active === "All resources" || resource.category === active;
    const searchMatch = `${resource.name} ${resource.focus} ${resource.detail}`.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && searchMatch;
  }), [active, query]);

  return (
    <section className="resource-section" id="resources">
      <div className="resource-intro">
        <div>
          <p className="section-kicker">The wider data ecosystem</p>
          <h2>Built to connect,<br />not to duplicate.</h2>
        </div>
        <p>OLS can become the Africa-specific cancer evidence layer that helps people move intelligently into established sequence, protein, pathway, variation, and expression resources.</p>
      </div>
      <div className="resource-controls">
        <div className="resource-tabs" aria-label="Filter resources by category">
          {categories.map((category) => <button key={category} className={active === category ? "active" : ""} onClick={() => setActive(category)}>{category}</button>)}
        </div>
        <label className="resource-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a database" /></label>
      </div>
      <div className="resource-grid">
        {filtered.map((resource) => (
          <a className="resource-row" href={resource.url} target="_blank" rel="noreferrer" key={resource.name}>
            <span className="resource-monogram">{resource.name.slice(0, 2).toUpperCase()}</span>
            <span><strong>{resource.name}</strong><small>{resource.focus}</small></span>
            <p>{resource.detail}</p>
            <ExternalLink size={15} />
          </a>
        ))}
      </div>
      <p className="resource-note">External reference links are provided for research navigation. They are not yet live data integrations with OLS.</p>
    </section>
  );
}
