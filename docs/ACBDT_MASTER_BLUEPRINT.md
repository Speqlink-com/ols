# ACBDT — Africa Cancer Biomarkers Database & Technology
## Product, design, scientific governance and implementation specification
**Version:** 1.0 · **Date:** 15 October 2026 · **Intended domain:** acbdt.org · **Status:** proposed architecture, not a claim of existing deployment

> **North star:** Africa's trusted, evidence-traceable cancer biomarker discovery platform. Connect *cancer → biomarker → assay/variant → study → African cohort → finding → evidence quality → original source*. The product is for research and education, not autonomous clinical diagnosis.

## 0. Executive product decision
Build a beautiful **scientific research application**, not a marketing landing page or an uncurated article scraper. Its first live research pilot targets eight West African countries: Nigeria, Ghana, Togo, Benin, Côte d’Ivoire, Mali, Niger and Burkina Faso. Europe PMC supplies candidate literature; ACBDT supplies verified cohort metadata, structured findings, provenance and scientific review. The public experience should feel like a premium scientific atlas: cinematic *cancer cell microscopy* visuals, elegant navy-and-sky-blue interface, evidence-first content and exceptionally fast search.

### Reference synthesis
- **Europe PMC**: REST literature discovery, open-access availability, annotation API, citations and external references. Official: https://europepmc.org/RestfulWebService and https://europepmc.org/annotations.
- **PubMed**: biomedical indexing, MeSH and publication identifiers. https://pubmed.ncbi.nlm.nih.gov/
- **MarkerDB**: biomarker/condition entity design, molecular classifications. https://markerdb.ca/
- **AFCRN**: African registry network and research governance. https://afcrn.org/
- **Cancer Atlas**: statistical storytelling and map-first epidemiology. https://canceratlas.cancer.org/burden-of-cancer/cancer-in-sub-saharan-africa/
- **Existing OLS reference**: https://ols.speqlink.com/ — site could not be reliably inspected in this session; **do not infer current layout or feature parity**. Audit manually with screenshots or repository before migration.

## 1. Users, jobs and permissions
| Persona | Main job | Experience |
|---|---|---|
| Molecular oncologist / researcher | Locate cohort-specific biomarker findings and source methods | Advanced search, comparison, export, citation |
| Pathologist / clinician | Understand assay-specific evidence and limitations | Biomarker evidence cards; never treatment recommendations |
| Epidemiologist | Understand country and cancer evidence coverage | Geographic atlas, studies by region, bias warnings |
| Student / public visitor | Learn concepts without jargon | Explainers, annotated cell imagery, glossary |
| Scientific curator | Validate extracted facts | Source excerpts, confidence, structured approval |
| Data steward / administrator | Govern ingestion, users, licenses and audits | Admin console, job runs, review queues, access control |

Roles: `visitor`, `researcher`, `curator`, `scientific_reviewer`, `data_steward`, `admin`; permissions enforced server-side and audited. Reviewer cannot approve their own extraction in the final publication workflow.

## 2. Information architecture and route map
| Route | Product surface | Essential behavior |
|---|---|---|
| `/` | Editorial home | Hero, universal search, science metrics with provenance, featured cancers, map teaser, latest validated evidence |
| `/explore` | Universal discovery | Search cancer, biomarker, country, paper; grouped results, facets, query history |
| `/atlas` | Africa evidence atlas | Interactive country map; distinguish *study coverage* from *cancer burden* |
| `/atlas/[country]` | Country dossier | Publications, cohort-verified studies, cancer types, biomarkers, coverage caveats |
| `/cancers` and `/cancers/[slug]` | Cancer encyclopedia | Overview, standardized synonyms, biomarker associations, study and map views |
| `/biomarkers` and `/biomarkers/[id]` | Biomarker explorer | Identifier, variants, assay, evidence roles, cross-cancer associations |
| `/evidence` and `/evidence/[id]` | Evidence library | Study details, population, measured findings, uncertainty, original citation |
| `/publications/[id]` | Publication record | PMID/PMCID/DOI, abstract if permitted, source, extracted candidates and approved findings |
| `/compare` | Comparison workspace | Side-by-side cohorts, assays, outcomes, methods, publication dates |
| `/methods` | Scientific methods | Selection criteria, screening workflow, grading, provenance and limitations |
| `/learn` | Education | Molecular oncology concepts, glossary, patient-friendly context |
| `/data` | Data access | API docs, downloadable aggregate data, licenses, versioning |
| `/about` | Mission and collaborators | Scope, governance, contact, partnership inquiries |
| `/admin/ingestion` | Restricted operations | Jobs, query logs, retries, failures, data quality |
| `/admin/review` | Restricted scientific review | Extraction, source passage, decision, rationale, reviewer identity |

Global header: logo / Explore / Cancer Atlas / Biomarkers / Evidence / Learn / About; persistent search icon. Footer: research-only disclaimer, methodology, data sources, privacy, terms, contact, version/build date.

## 3. Visual identity — creative direction
**Design thesis: “The cellular universe, made legible.”** Do not reuse generic doctor-in-lab photographs as the primary visual system. Lead with **realistic scientific microscopy-inspired imagery of cancer cells and tissue**, paired with minimal scientific diagrams and editorial typography.

### Palette and type
- `--navy-950: #07172B` deep background; `--navy-800: #112B46` surfaces.
- `--sky-400: #87CEEC` signature accent; `--sky-100: #E9F7FD` pale panel.
- `--paper: #F7FAFC`, `--white: #FFFFFF`, `--ink: #17283A`, `--muted: #63778A`.
- `--teal: #2C9B9D` for scientific highlights; `--amber: #D59B3B` for review warnings; `--red: #B54B58` for error states only.
- Fonts: modern geometric sans for display (e.g. Manrope), readable UI sans (e.g. Inter), optional editorial serif for selected scientific feature titles. Use licensed webfonts only.
- Large, confident typography: hero 64–84px desktop, 38–48px mobile; body 16–18px; dense research tables 13–15px.

### Cancer-cell image library: required original creative assets
1. **Hero:** macro confocal-microscopy-inspired tumor spheroid, luminous cyan cell membranes and subtle magenta nuclei on near-black navy; cell mass on RIGHT, left 45% empty for text. 21:9, ≥2560px wide, no labels or overlays.
2. **Breast cancer feature:** elegant histopathology-inspired glandular tumor tissue; pink-purple cellular texture, true-to-science aesthetic, not presented as a diagnostic slide.
3. **Cervical cancer feature:** stylized but plausible epithelial cell micrograph, visible nuclei, restrained blue/coral palette.
4. **Prostate cancer feature:** microscopic tissue architecture, teal-blue accent; clearly marked as illustrative.
5. **Molecular explorer:** photorealistic 3D protein/ligand rendering on clean dark background, avoid implying specific structure without actual PDB source.
6. **Atlas backdrop:** dark Africa geographic silhouette formed from subtle cellular clusters, never used as quantitative choropleth.
7. **Research feature:** fluorescent cells and assay plate details, visually authentic and non-sensational.
8. **Empty states:** abstract single cell / nucleus line art; lightweight SVG.

**Science integrity:** All generated microscopy-style images labelled “Illustrative visualization — not a clinical specimen.” Actual microscopy, histopathology and molecular models must retain source, stain/modality, specimen provenance, license and appropriate annotation. Never label AI imagery as real patient tissue.

### Layout choreography
- Home hero: 70–80vh desktop, edge-to-edge dark navy image, left gradient for 2-line headline and two CTAs; right-hand cell imagery; bottom subtle source/illustration caption.
- Next: compact four-stat strip **only if real verified numbers are available**; otherwise replace with four capabilities.
- Discovery: floating rounded search bar, chips for Cancer / Biomarker / Country / Study; keyboard shortcut `/`.
- Country atlas: pale paper canvas, selectable map, filter drawer, detail side panel; legend explicitly says *indexed study coverage*.
- Biomarker detail: title + identity chip + evidence status; tabs Overview / Associations / African Studies / Assays & Variants / References.
- Evidence page: narrow readable scientific text column with sticky provenance and methodological summary sidebar.
- Motion: 180–280ms transitions, restrained parallax on hero only, respect `prefers-reduced-motion`.
- Mobile: search first, accessible filter sheet, responsive evidence cards, sticky tab strip, no unreadable maps.

### UX states
Every list, map and table needs skeleton, empty, error, partial-results and retry states. “No indexed evidence” is **not** “no biomarker exists.” Provide shareable filter URLs, citation copy, saved search (authenticated), CSV export of licensed structured metadata, and print-friendly study detail pages.

## 4. Scientific semantics: non-negotiable
- Distinguish **gene** (`ERBB2`) from **variant** (specific alteration), **protein** (HER2), **assay** (IHC/FISH/NGS), and **biomarker claim** (role in a cancer/context).
- Distinguish **diagnostic**, **prognostic**, **predictive**, **risk**, **monitoring**, **response** and **safety** roles.
- A study **mentioning** a biomarker is not evidence of a validated association. A paper **mentioning** Nigeria is not necessarily a Nigerian patient cohort.
- A publication can describe multiple cohorts, cancers, biomarkers and outcomes. A cohort can appear in multiple papers; avoid double-counting.
- Store numerators/denominators, confidence intervals, p-values, effect estimates, reference groups, assay thresholds, stage, treatment context, sample type and missingness **only when explicitly supported by source**.
- Track country as `mentioned_country`, `author_affiliation_country`, `recruitment_country`, `sample_origin_country` and `study_setting_country` separately.
- Separate preprints from peer-reviewed research, retractions from active records, and curated from machine-extracted findings.
- Do not compute pooled biomarker prevalence from heterogeneous studies without protocol, compatibility checks and statistical review.

## 5. West Africa literature pilot — precise scope
Initial countries (ISO-3166 alpha-2): NG Nigeria, GH Ghana, TG Togo, BJ Benin, CI Côte d’Ivoire, ML Mali, NE Niger, BF Burkina Faso.

### Discovery strategy
Three configurable dimensions: **country × cancer type × biomarker family**. Starter cancers: breast, cervical, prostate, colorectal and liver. Starter biomarker terms: generic biomarker/molecular marker, mutation, genomic, immunohistochemistry plus HER2/ERBB2, BRCA1/2, EGFR, KRAS, TP53, Ki-67, HPV, p16 and PSA. Expand only after reviewing false positives and recall. Include country aliases and French names, especially Côte d’Ivoire / Ivory Coast. Beware **Niger** vs **Nigeria**, **Benin** vs **Benin City** (Nigeria), **Mali** as common text fragment, and Côte d’Ivoire apostrophe variations.

**Stage A — broad retrieval:** country + cancer + marker terms in title/abstract via Europe PMC REST. Store full query and retrieved source metadata. This is intentionally a **candidate search**, not a systematic review.

**Stage B — high-recall supplementary retrieval:** cancer + country without marker terms, then annotate biomarker mentions in accessible full text; add MeSH, synonyms and translated terms. This reduces false negatives.

**Stage C — cohort validation:** inspect methods to confirm patient/sample origin, cohort country, cancer diagnosis and marker measurement. Assign `cohort_verified`, `ambiguous`, `not_relevant` or `requires_full_text`.

**Stage D — extraction:** capture measured findings with exact evidence passage, section, source offset, extraction model version and confidence. No publication to public evidence until reviewer approval.

**Stage E — reporting:** query hits, unique PMIDs/DOIs, potentially eligible studies, full texts available, verified cohorts, distinct markers, cancers, approved findings, exclusion reasons, country gaps. Never call raw query-hit counts 'number of studies in country'.

### Deliverable pilot script
See `europe_pmc_west_africa_pilot.py`. Run `pip install httpx` then `python europe_pmc_west_africa_pilot.py`. Produces `query_summary.csv`, `candidate_matches.csv`, `deduplicated_publications.csv`, `run_metadata.json`. It has bounded pagination, retries, throttling, country synonyms and provenance. **No live results are asserted in this document; run in a networked environment.**

### Europe PMC integration contracts
Base: `https://www.ebi.ac.uk/europepmc/webservices/rest/search`; parameters `query`, `format=json`, `resultType=core`, `pageSize`, `cursorMark`. Use stable IDs (PMID, PMCID, DOI, source/id). Full-text and annotations only when permitted; see https://europepmc.org/RestfulWebService and https://europepmc.org/annotationsapi. Search API availability does not mean full text is reusable. Respect copyright, provider usage policies and backoff on 429/5xx. Avoid scraping rendered site pages.

## 6. Canonical database design (PostgreSQL)
Use UUID PKs internally; retain source-native IDs as unique indexed columns. Core tables:

| Table | Important columns and constraints |
|---|---|
| `countries` | `iso2` unique, `name`, `aliases jsonb`, `region` |
| `cancer_types` | `id`, `label`, `icd10_code`, `icdo_topography`, `synonyms jsonb` |
| `biomarkers` | `id`, `preferred_name`, `entity_type`, `hgnc_id`, `uniprot_id`, `chebi_id`, `synonyms jsonb` |
| `variants` | `id`, `biomarker_id`, `hgvs`, `reference_assembly`, `variant_type` |
| `assays` | `id`, `method`, `platform`, `cutoff`, `specimen_type`, `validation_notes` |
| `publications` | `id`, `pmid`, `pmcid`, `doi`, `title`, `abstract`, `year`, `journal`, `pub_type`, `retraction_status`, `license` |
| `publication_sources` | `publication_id`, `provider`, `provider_id`, `fetched_at`, `raw_payload_hash` |
| `studies` | `id`, `publication_id`, `design`, `study_period`, `peer_review_status`, `risk_of_bias` |
| `cohorts` | `id`, `study_id`, `cohort_name`, `sample_size`, `recruitment_country_id`, `sample_origin_country_id`, `inclusion_criteria` |
| `cohort_cancers` | `cohort_id`, `cancer_type_id`, `n_cases` |
| `study_biomarkers` | `study_id`, `biomarker_id`, `variant_id nullable`, `assay_id nullable` |
| `findings` | `id`, `study_id`, `cohort_id`, `cancer_type_id`, `biomarker_id`, `variant_id`, `assay_id`, `role`, `metric`, `numerator`, `denominator`, `estimate`, `ci_low`, `ci_high`, `unit`, `comparator`, `review_status` |
| `evidence_spans` | `finding_id`, `publication_id`, `section`, `quoted_excerpt`, `location`, `extraction_method`, `model_version` |
| `screening_decisions` | `publication_id`, `decision`, `reason`, `reviewer_id`, `timestamp` |
| `review_actions` | `finding_id`, `actor_id`, `action`, `reason`, `created_at` append-only |
| `search_queries` | `id`, `country_id`, `cancer_id`, `query_text`, `version`, `executed_at` |
| `ingestion_runs` | `id`, `source`, `status`, `started_at`, `finished_at`, `counts jsonb`, `error_log` |
| `source_licenses` | `provider`, `license_name`, `license_url`, `allowed_uses`, `reviewed_at` |
| `users` | `id`, `role`, `institution`, `status` |

Constraints: unique non-null PMID/PMCID/DOI via partial indexes; numeric denominators >0, numerator >=0 and <= denominator when representing a count; immutable publication provenance snapshots; UTC timestamps; indexed `review_status`, `country`, `cancer`, `biomarker`; foreign keys and cascade policies carefully scoped. Avoid storing personal patient identifiers in the public product.

### Example public evidence JSON
```json
{
  "id": "example-only",
  "country": {"iso2": "NG", "cohort_verified": false},
  "cancer": "breast-cancer",
  "biomarker": {"symbol": "ERBB2", "measured_target": "HER2 protein"},
  "assay": {"method": "IHC", "cutoff": null},
  "finding": null,
  "publication": {"pmid": null, "doi": null},
  "review_status": "candidate",
  "disclaimer": "Illustrative schema; not a real scientific result"
}
```

## 7. Backend and services
**Recommended v1:** Next.js (App Router) frontend, FastAPI modular backend, PostgreSQL + pgvector, Redis, object storage, background worker, OpenTelemetry. Start modular monolith + worker; split services only when needed.

Modules: `catalog`, `publications`, `search`, `evidence`, `atlas`, `ingestion`, `curation`, `identity`, `analytics`, `exports`.

### Public API v1
- `GET /v1/search?q=&country=&cancer=&biomarker=&review_status=approved&cursor=`
- `GET /v1/countries` and `GET /v1/countries/{iso2}/summary`
- `GET /v1/cancers` and `GET /v1/cancers/{id}`
- `GET /v1/biomarkers` and `GET /v1/biomarkers/{id}`
- `GET /v1/evidence?country=&cancer=&biomarker=&role=&study_type=`
- `GET /v1/evidence/{id}` and `GET /v1/publications/{id}`
- `GET /v1/atlas/coverage?metric=verified_studies&cancer=`
- `GET /v1/methodology` and `GET /v1/data/releases`

### Restricted API
- `POST /v1/admin/ingestion-runs` (idempotency key required)
- `GET /v1/admin/ingestion-runs/{id}`
- `GET /v1/admin/review-queue`
- `POST /v1/admin/findings/{id}/review` with decision, rationale and optimistic version
- `POST /v1/admin/publications/{id}/screen`
- `POST /v1/admin/releases` with approval gates

Standard response: `{data, meta:{cursor,total,source_version}, errors:[]}`; stable error codes; OpenAPI schemas; pagination limits; RFC3339 timestamps; request IDs; auth and RBAC.

## 8. Search and research intelligence
Hybrid search: Postgres full-text/pg_trgm for names and exact identifiers + semantic retrieval for evidence passages. Controlled vocabulary maps synonyms; filter on *verified cohort country*, not mere mention. Ranking: exact biomarker/cancer match, cohort verification, study relevance, publication status, evidence quality; **citation counts are not a proxy for scientific validity**.

Later AI assistant: retrieve approved evidence only by default, include PMID/DOI and passage-level citation, express uncertainty, refuse unsupported clinical recommendations, never invent a prevalence value, label machine-generated synthesis. Evaluate factual accuracy with expert-reviewed question sets before launch.

## 9. Atlas methodology
Default map metric: **verified indexed studies**, not cancer incidence or biomarker prevalence. Separate layers:
1. Indexed candidate papers (literature discovery count).
2. Verified studies by cohort origin.
3. Approved biomarker findings.
4. Cancer incidence/mortality only when a properly licensed, separately sourced epidemiology dataset is integrated.

Map UI must display metric, reference date, inclusion criteria, source, limitations and legend. Gray means insufficient indexed evidence, **not zero cancer**. Multi-country studies require fractional or clearly described counting rules. Provide accessible table alternative and keyboard navigation.

## 10. Data ingestion engineering
- Worker queue processes country × cancer × query-version jobs; persistent cursor and checkpoint; retries with jitter, dead-letter state, request pacing and circuit breaker.
- Raw response snapshots stored encrypted with SHA-256 checksum; normalized data upserted idempotently.
- DOI normalization, PMID/PMCID crosswalk, title/year fuzzy dedup only as secondary signal with manual conflict queue.
- Detect errata, retractions, updates; keep prior versions and publish status history.
- Text mining optional: Europe PMC annotations are candidate entities; LLM extraction only into structured Pydantic schema with evidence span and uncertainty.
- Two-person scientific approval for high-impact clinical claims; every change audit logged.
- Data export requires license-aware filtering and attribution.

## 11. Frontend component inventory
`AppShell`, `GlobalSearch`, `SearchAutocomplete`, `FacetPanel`, `FilterChip`, `CancerCellHero`, `FeaturedCancerTile`, `EvidenceMetricCard`, `AfricaMap`, `CountryDrawer`, `CoverageLegend`, `BiomarkerIdentityHeader`, `AssociationTable`, `AssayMethodPanel`, `StudySummaryCard`, `EvidenceQualityBadge`, `CitationPanel`, `SourceExcerptViewer`, `CompareTray`, `ResearchEmptyState`, `GlossaryTooltip`, `LicenseBadge`, `MethodologyCallout`, `ReviewQueueTable`, `ExtractionDiffViewer`, `JobProgressTimeline`.

Use a cohesive design-token system, not per-page ad hoc CSS. WCAG 2.2 AA contrast, visible focus rings, keyboard dialogs, screen reader chart summaries, reduced motion and responsive tables. Hero image should be optimized AVIF/WebP with accessible alt; lazy-load below fold; prevent layout shift.

## 12. SEO, trust and performance
- Server-render public cancer/biomarker/evidence pages; canonical URLs, sitemap, OpenGraph cards, semantic heading structure, JSON-LD for scholarly articles where appropriate.
- Never publish unsupported aggregate figures in hero KPI counters.
- Display “Last literature search”, “Last scientific review”, “Dataset release” separately.
- Security: OIDC, secure cookies, CSRF protections where applicable, rate limiting, strict CSP, secrets manager, TLS, audit logs, backups and restore drills.
- Privacy: no patient-level uploads in v1; consent, data minimization and applicable African data protection law review before any clinical dataset intake.
- Targets: LCP <2.5s p75 on representative mobile, CLS <0.1, INP <200ms; public search p95 <700ms on cached representative queries; uptime target 99.9% after production stabilization.

## 13. Deployment
DNS `acbdt.org` and `www.acbdt.org` after ownership confirmation. Proposed: frontend on managed Next.js platform or containerized service; backend/worker on existing production infrastructure **only after resource and security review**. PostgreSQL separate credentials and schema/database; object storage backups; staging `staging.acbdt.org`; GitHub Actions CI with lint, types, unit, API integration, Playwright e2e, migrations and deployment approvals. Do not reuse secrets from unrelated apps. Observability: traces, structured logs, Prometheus metrics, error reporting and alerts for ingestion failures.

## 14. Delivery phases and acceptance gates
### Phase 0 — scientific protocol (1 week)
Agree on cancer list, biomarkers, screening inclusion/exclusion, cohort definition, evidence grading, data licenses, scientific reviewers. **Gate:** signed-off protocol and query registry.

### Phase 1 — West Africa pilot (1–2 weeks)
Run provided script, review query counts, sample 20–30 records per country/cancer stratum where available, measure precision and missingness, tune multilingual synonyms. **Gate:** reproducible run report and manual screening rubric; no unverified prevalence claims.

### Phase 2 — platform foundation (2–3 weeks)
DB migrations, API, ingestion jobs, reviewer console, auth, provenance. **Gate:** idempotent import, dedup, review audit and API contract tests.

### Phase 3 — premium public experience (2–3 weeks)
Homepage, discovery, cancer/biomarker/evidence profiles, West Africa atlas, original cancer-cell image assets. **Gate:** responsive, accessible, source-traceable research journeys.

### Phase 4 — scientific launch (1–2 weeks)
Curated dataset release, documentation, privacy/legal review, load testing, editorial QA. **Gate:** reviewer-approved findings only on public evidence pages; rollback verified.

### Phase 5 — expansion
Remaining African countries, advanced comparative analytics, controlled external data integrations, optional citation-grounded research assistant.

## 15. Explicit QA acceptance tests
1. Search `HER2 breast cancer Ghana` returns relevant candidate and/or approved records with correct status; never implies unreviewed cohort validation.
2. A paper mentioning *Benin City, Nigeria* is not automatically assigned to the country Benin.
3. A paper mentioning *Nigerian* does not automatically count toward Niger.
4. The same DOI returned by three searches creates one publication, with three query-match records.
5. A curator cannot publish an extracted finding without an exact source and reviewer approval.
6. A retracted publication triggers visible status and review of dependent findings.
7. Atlas gray country is described as “insufficient indexed evidence”, not zero cases.
8. Public export excludes restricted full text and unlicensed figures.
9. All critical interactions work by keyboard and on a 360px viewport.
10. Every displayed numerical claim links to source, date, metric definition and method.

## 16. Agent execution order
1. Inspect existing OLS code and take screenshots; inventory features and data before changing anything.
2. Create repo structure `/apps/web`, `/apps/api`, `/workers/ingestion`, `/packages/contracts`, `/packages/ui`, `/infra`, `/docs`.
3. Commit product design tokens, component specs and high-fidelity home/explore/evidence mockups.
4. Define DB migrations and Pydantic/OpenAPI contracts; add fixture data **explicitly marked synthetic**.
5. Implement Europe PMC pilot ingestion, durable runs, dedup and review pipeline.
6. Implement verified search and country coverage endpoints.
7. Build responsive atlas and detailed evidence pages.
8. Integrate original cancer-cell artwork, accessibility, SEO, performance budgets.
9. Add end-to-end tests, staging deployment, scientific QA, launch checklist.

**Definition of done:** A visitor can go from cancer or biomarker search to a verified African cohort finding and its exact publication evidence in fewer than four meaningful interactions, while understanding provenance, uncertainty and review status.
