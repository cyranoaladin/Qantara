import type { Metadata } from "next";

export const siteConfig = {
  name: "Qantara AI",
  legalName: "Qantara AI Consulting & Academy SARL",
  description:
    "Cabinet IA basé en Tunisie : audit, formation, assistants IA, automatisation, gouvernance et déploiement de solutions IA pour entreprises, écoles et institutions.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: process.env.INTERNAL_CONTACT_EMAIL ?? "contact@qantara-ai.com",
  locale: "fr_TN",
  linkedin: "https://www.linkedin.com/company/qantara-ai",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
}: SeoInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: {
        fr: url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    email: siteConfig.email,
    areaServed: [
      "Tunisie",
      "Maghreb",
      "Afrique francophone",
      "France",
      "Belgique",
      "Suisse romande",
      "Canada francophone",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "TN",
    },
    description: siteConfig.description,
    sameAs: ["https://www.linkedin.com/company/qantara-ai"],
  };
}

export function faqPageJsonLd(items: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
