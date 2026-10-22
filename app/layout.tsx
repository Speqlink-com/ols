import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ACBD | Africa Cancer Biomarkers Database",
  description:
    "A trusted, evidence-traceable platform connecting cancer biomarkers, assays, studies, African cohorts, findings, and original sources.",
  metadataBase: new URL("https://acbdt.org"),
  openGraph: {
    title: "ACBD | Africa Cancer Biomarkers Database",
    description: "Africa-centred cancer biomarker evidence, structured for discovery and traced to source.",
    type: "website",
  },
  icons: {
    icon: [{ url: "/acbd.png", type: "image/png" }],
    shortcut: "/acbd.png",
    apple: "/acbd.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
