import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Africa Cancer Biomarkers Database",
  description:
    "An Africa-centred resource for biomarkers linked to cancer-associated viruses, built for research, care, and community understanding.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
