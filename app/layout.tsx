import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ACBDT — Africa Cancer Biomarkers Database & Technology",
  description:
    "A trusted, evidence-traceable platform connecting cancer biomarkers, assays, studies, African cohorts, findings, and original sources.",
  metadataBase: new URL("https://acbdt.org"),
  openGraph: {
    title: "ACBDT — Africa Cancer Biomarkers Database & Technology",
    description: "Africa-centred cancer biomarker evidence, structured for discovery and traced to source.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
