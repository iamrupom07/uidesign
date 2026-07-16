import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MACPROTEC Engineering | Excellence in Process",
  description:
    "Houston-based engineering consulting and system integrating company specializing in cement, aggregate, mining, critical minerals, chemicals, petrochemicals, and heavy process industries.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
