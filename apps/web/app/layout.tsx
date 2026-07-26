import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ReduxProvider } from "@/redux/provider";

export const metadata: Metadata = {
  title: "MACPROTEC Engineering | Excellence in Process",
  description:
    "Houston-based engineering consulting and system integrating company specializing in cement, aggregate, mining, critical minerals, chemicals, petrochemicals, and heavy process industries.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/images/logo-icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ReduxProvider>
          <LanguageProvider>
            {children}
            <WhatsAppButton />
          </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
