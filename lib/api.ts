import "server-only";

import type { AfricanRegion, BiomarkerEntity, EvidenceRecord, EvidenceStatus } from "@/lib/contracts";

type ApiEvidenceRecord = {
  id: string;
  marker: string;
  measured_target: string;
  entity: string;
  cancer: string;
  country: string;
  region: string;
  assay: string;
  role: string;
  year: number;
  review_status: string;
  match_basis: string;
  note: string;
};

type ApiCollection<T> = {
  data: T[];
  meta: { total: number; synthetic: boolean; warning?: string | null };
  errors: string[];
};

export type EvidenceApiResult = {
  records: EvidenceRecord[];
  source: "api" | "fallback";
  message: string;
};

const validEntities = new Set(["Protein", "Gene", "Variant", "Viral DNA", "Assay panel"]);
const validStatuses = new Set(["Unscreened", "Requires full text", "Cohort verified", "Published"]);
const validRoles = new Set(["Diagnostic", "Predictive", "Prognostic", "Risk", "Monitoring", "Response", "Safety"]);
const validRegions = new Set(["Northern Africa", "Western Africa", "Central Africa", "Eastern Africa", "Southern Africa"]);

function mapRecord(item: ApiEvidenceRecord): EvidenceRecord | null {
  if (!validEntities.has(item.entity) || !validStatuses.has(item.review_status) || !validRoles.has(item.role) || !validRegions.has(item.region)) return null;
  return {
    id: item.id,
    marker: item.marker,
    measuredTarget: item.measured_target,
    entity: item.entity as BiomarkerEntity,
    cancer: item.cancer,
    country: item.country,
    region: item.region as AfricanRegion,
    assay: item.assay,
    role: item.role as EvidenceRecord["role"],
    year: item.year,
    status: item.review_status as EvidenceStatus,
    matchBasis: item.match_basis,
    note: item.note,
  };
}

export async function fetchEvidence(): Promise<EvidenceApiResult> {
  const apiBaseUrl = (process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.acbdt.org").replace(/\/$/, "");
  try {
    const response = await fetch(`${apiBaseUrl}/v1/evidence`, {
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
      headers: { Accept: "application/json", "X-ACBD-Client": "web/0.2" },
    });
    if (!response.ok) throw new Error(`API returned ${response.status}`);
    const payload = await response.json() as ApiCollection<ApiEvidenceRecord>;
    const records = payload.data.map(mapRecord).filter((item): item is EvidenceRecord => item !== null);
    return { records, source: "api", message: payload.meta.warning || "Connected to the ACBD API." };
  } catch {
    return {
      records: [],
      source: "fallback",
      message: "The evidence API is temporarily unavailable. Local synthetic fixtures are shown so the prototype remains usable.",
    };
  }
}
