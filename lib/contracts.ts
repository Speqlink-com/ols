export type EvidenceStatus = "Unscreened" | "Requires full text" | "Cohort verified" | "Published";
export type BiomarkerEntity = "Protein" | "Gene" | "Variant" | "Viral DNA" | "Assay panel";

export type EvidenceRecord = {
  id: string;
  marker: string;
  measuredTarget: string;
  entity: BiomarkerEntity;
  cancer: string;
  country: string;
  region: "Western Africa";
  assay: string;
  role: "Diagnostic" | "Predictive" | "Prognostic" | "Risk" | "Monitoring" | "Response" | "Safety";
  year: number;
  status: EvidenceStatus;
  matchBasis: string;
  note: string;
};
