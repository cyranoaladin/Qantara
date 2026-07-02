import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Studio IA — Assistants, RAG, agents et automatisation | Qantara AI",
  description:
    "Développement IA sur mesure : assistants internes, RAG documentaire, agents IA, automatisations Make/n8n/Zapier, intégrations CRM/ERP/Odoo et dashboards.",
  path: "/studio",
});

const capabilities = [
  ["Assistants IA internes", "Répondre à partir d'un périmètre documentaire contrôlé."],
  [
    "RAG sur documents",
    "Citer les sources, tester la qualité et limiter les hallucinations.",
  ],
  ["Agents IA", "Exécuter des tâches avec permissions, logs et validation humaine."],
  [
    "Automatisation Make/n8n/Zapier",
    "Relier formulaires, emails, CRM, tableurs et outils métier.",
  ],
  [
    "Intégrations CRM/ERP/Odoo",
    "Insérer l'IA dans les systèmes déjà utilisés par les équipes.",
  ],
  ["Dashboards", "Suivre usage, qualité, temps gagné et incidents."],
  [
    "Extraction PDF",
    "Structurer factures, dossiers, rapports ou documents administratifs.",
  ],
  [
    "Classification de demandes",
    "Orienter demandes entrantes, tickets ou emails selon règles métier.",
  ],
  [
    "Support client IA",
    "Préparer réponses, escalades et synthèses sans supprimer la revue humaine.",
  ],
] as const;

const method = [
  "Cadrage",
  "Prototype",
  "Tests",
  "Déploiement",
  "Documentation",
  "Maintenance",
] as const;

export default function StudioPage() {
  return (
    <>
      <PageHero
        eyebrow="Qantara AI Studio"
        title="Développer des solutions IA qui résistent au passage du prototype à l'usage réel."
        description="Le studio conçoit assistants, agents, workflows et tableaux de bord avec une logique produit : périmètre clair, tests, mesure, documentation et maintenance."
      />
      <section className="section-padding">
        <div className="container-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <Card>
            <h2 className="text-2xl font-semibold">Méthode de réalisation</h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Chaque livraison distingue démonstration, prototype testable et composant
              exploitable. Les limites d'autonomie sont documentées.
            </p>
            <ol className="mt-6 grid gap-4 text-sm text-muted-foreground">
              {method.map((step, index) => (
                <li className="flex items-center gap-3" key={step}>
                  <span className="flex h-8 w-8 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <Button asChild className="mt-8">
              <Link href="/diagnostic-ia">Créer un prototype</Link>
            </Button>
          </Card>
          <div className="grid gap-4 sm:grid-cols-2">
            {capabilities.map(([capability, description]) => (
              <Card
                className="p-5 hover:-translate-y-1 hover:border-primary/45"
                key={capability}
              >
                <h3 className="font-semibold">{capability}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding border-t border-border bg-card/24">
        <div className="container-shell">
          <h2 className="text-3xl font-semibold">Ce qui est cadré avant développement</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              "Données et sources autorisées",
              "Actions permises à l'IA",
              "Points de validation humaine",
              "Critères de qualité et d'arrêt",
            ].map((item) => (
              <Card className="p-5" key={item}>
                <p className="text-sm font-semibold">{item}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
