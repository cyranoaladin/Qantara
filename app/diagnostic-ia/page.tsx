import type { Metadata } from "next";

import { DiagnosticForm } from "@/components/forms/DiagnosticForm";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Demander un diagnostic IA | Qantara AI",
  description:
    "Demandez un diagnostic IA pour identifier les cas d'usage prioritaires, les risques à maîtriser et les premières actions à lancer.",
  path: "/diagnostic-ia",
});

export default function DiagnosticPage() {
  return (
    <>
      <PageHero
        eyebrow="Diagnostic IA"
        title="Identifier les bons cas d'usage IA avant d'investir."
        description="Le diagnostic permet de qualifier votre maturité, vos contraintes, vos données et les usages IA à plus forte valeur."
      />
      <section className="section-padding">
        <div className="container-shell grid gap-8 lg:grid-cols-[.65fr_1.35fr]">
          <Card>
            <h2 className="text-2xl font-semibold">Ce que nous analysons</h2>
            <ul className="mt-6 grid gap-3 text-sm text-muted-foreground">
              {[
                "Objectifs métier et irritants opérationnels",
                "Données disponibles et niveau de sensibilité",
                "Outils déjà utilisés par les équipes",
                "Maturité formation, technique et gouvernance",
                "Premiers cas d'usage mesurables",
              ].map((item) => (
                <li className="flex gap-2" key={item}>
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
          <DiagnosticForm />
        </div>
      </section>
    </>
  );
}
