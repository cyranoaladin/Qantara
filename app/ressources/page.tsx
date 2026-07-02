import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { resources } from "@/lib/data/resources";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Ressources IA — Guides, checklists et prompts | Qantara AI",
  description:
    "Ressources Qantara AI : checklist IA PME, guide IA enseignants, modèle de charte IA, grille de priorisation, glossaire et prompts.",
  path: "/ressources",
});

export default function RessourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Ressources"
        title="Ressources pour cadrer l'IA avant de choisir des outils."
        description="Guides, checklists et modèles destinés aux dirigeants, enseignants et équipes métier qui veulent clarifier usages, risques et priorités."
      />
      <section className="border-b border-border bg-card/24 py-10">
        <div className="container-shell max-w-4xl">
          <p className="text-sm leading-7 text-muted-foreground">
            Les ressources sont pensées comme supports de décision et de formation. Elles
            ne remplacent pas un audit, mais aident à poser les bonnes questions avant de
            soumettre des données, acheter un outil ou lancer une automatisation.
          </p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-shell grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Card
              className="flex flex-col hover:-translate-y-1 hover:border-primary/45"
              key={resource.title}
            >
              <Badge>{resource.type}</Badge>
              <h2 className="mt-5 text-xl font-semibold">{resource.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {resource.description}
              </p>
              <p className="mt-4 rounded-md border border-border bg-white/[0.035] p-3 text-sm leading-6 text-muted-foreground">
                Utile pour : {resource.usefulFor}
              </p>
              <p className="mt-5 text-sm text-secondary">{resource.status}</p>
              <Button asChild className="mt-auto self-start" variant="secondary">
                <Link href="/#offres">Être informé</Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
