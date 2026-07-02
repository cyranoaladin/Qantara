import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { brandAssets } from "@/lib/brand";
import { createMetadata, organizationJsonLd } from "@/lib/seo";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...createMetadata({
    title: "Qantara AI — Conseil, formation et développement IA en Tunisie",
    description:
      "Cabinet IA basé en Tunisie : audit, formation, assistants IA, automatisation, gouvernance et déploiement de solutions IA pour entreprises, écoles et institutions.",
  }),
  applicationName: "Qantara AI",
  icons: {
    icon: brandAssets.favicon,
    shortcut: brandAssets.favicon,
    apple: brandAssets.favicon,
  },
  keywords: [
    "conseil IA Tunisie",
    "formation IA Tunisie",
    "intelligence artificielle entreprise",
    "IA générative",
    "automatisation IA",
    "chatbot IA professionnel",
    "assistant IA métier",
    "gouvernance IA",
    "IA pour enseignants",
    "IA pour PME",
    "développement IA Tunisie",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()).replaceAll("<", "\\u003c"),
          }}
          type="application/ld+json"
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
