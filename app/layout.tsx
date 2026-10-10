import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OACBDA — Open Access Cancer Biomarkers Database, Africa",
  description:
    "An open, Africa-centred resource for cancer biomarker evidence, built for research, care, and community understanding.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
