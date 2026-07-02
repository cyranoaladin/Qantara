import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Gouvernance IA — Confidentialité, sécurité et chartes | Qantara AI",
  description:
    "Qantara AI aide les organisations à encadrer les usages IA : charte IA, confidentialité, classification des données, validation humaine et analyse des risques.",
  path: "/gouvernance",
});

const controls = [
  ["Charte IA", "Ce qui est autorisé, interdit, toléré sous condition et à valider."],
  [
    "Règles d'usage",
    "Différencier usages individuels, métiers, pédagogiques et techniques.",
  ],
  [
    "Classification des données",
    "Public, interne, personnel, sensible ou à ne jamais soumettre.",
  ],
  [
    "Confidentialité",
    "Choix d'outils, hébergement, accès, exports et minimisation des données.",
  ],
  [
    "Sécurité",
    "Permissions, journalisation, segmentation des droits et revue des accès.",
  ],
  [
    "Validation humaine",
    "Décisions qui ne doivent pas être laissées à une sortie IA brute.",
  ],
  ["Registres", "Tracer les outils, usages, responsables, données et risques associés."],
  [
    "Analyse des risques",
    "Évaluer impact, probabilité, criticité et mesures de réduction.",
  ],
  [
    "Formation des équipes",
    "Rendre les règles compréhensibles et applicables au quotidien.",
  ],
] as const;

export default function GouvernancePage() {
  return (
    <>
      <PageHero
        eyebrow="Qantara AI Governance"
        title="Encadrer l'IA avant que les pratiques informelles ne deviennent la norme."
        description="Une gouvernance IA sérieuse protège les données, clarifie les responsabilités et permet aux équipes d'utiliser l'IA sans confusion sur les limites."
      />
      <section className="section-padding">
        <div className="container-shell grid gap-5 md:grid-cols-3">
          {controls.map(([control, description]) => (
            <Card
              className="p-5 hover:-translate-y-1 hover:border-secondary/45"
              key={control}
            >
              <h2 className="text-lg font-semibold">{control}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </Card>
          ))}
        </div>
        <div className="container-shell mt-10">
          <Button asChild>
            <Link href="/diagnostic-ia">Sécuriser les usages IA</Link>
          </Button>
        </div>
      </section>
      <section className="section-padding border-t border-border bg-card/24">
        <div className="container-shell grid gap-5 lg:grid-cols-3">
          {[
            [
              "Données",
              "Quelles informations peuvent être utilisées, par quels outils, avec quels accès ?",
            ],
            [
              "Décisions",
              "Quelles décisions exigent une validation humaine, une trace ou une interdiction ?",
            ],
            [
              "Responsabilités",
              "Qui arbitre, qui maintient la charte, qui répond aux incidents et demandes ?",
            ],
          ].map(([title, description]) => (
            <Card key={title}>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
