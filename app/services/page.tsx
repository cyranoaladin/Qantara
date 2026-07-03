import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { ServiceCard } from "@/components/cards/ServiceCard";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { services } from "@/lib/data/services";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Services IA — Conseil, formation, studio et gouvernance | Qantara AI",
  description:
    "Services Qantara AI : conseil IA, formation, développement d'assistants IA, automatisation, gouvernance, éducation et R&D.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Un cadre d'intervention pour passer de l'intuition IA à une feuille de route exploitable."
        description="Qantara AI accompagne les organisations depuis la décision stratégique jusqu'au prototype, à la formation et à la gouvernance des usages."
      />
      <section className="section-glow-top border-b border-border bg-card/24 py-10">
        <div className="container-shell grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Décider",
              description:
                "Identifier les cas d'usage réellement prioritaires et les dépendances données, métiers et sécurité.",
              accent: "text-primary",
            },
            {
              title: "Équiper",
              description:
                "Former les équipes et construire les assistants ou automatisations utiles sur un périmètre maîtrisé.",
              accent: "text-secondary",
            },
            {
              title: "Gouverner",
              description:
                "Définir les règles d'usage, les validations humaines et les indicateurs d'adoption.",
              accent: "text-emerald-400",
            },
          ].map((step) => (
            <Card className="p-5" key={step.title}>
              <h2 className={`text-lg font-semibold ${step.accent}`}>{step.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </section>
      <section className="section-padding">
        <div className="container-shell grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </section>
      <section className="section-padding section-glow-top border-t border-border bg-card/24">
        <div className="container-shell">
          <h2 className="text-3xl font-semibold">Détail des cadres d'intervention</h2>
          <p className="mt-3 text-base text-muted-foreground">
            Chaque service traite un problème métier, propose un accompagnement structuré
            et produit des livrables exploitables.
          </p>
        </div>
        <div className="container-shell mt-8 grid gap-5 lg:grid-cols-2">
          {services.map((service) => (
            <Card key={service.title}>
              <h2 className="text-2xl font-semibold">{service.title}</h2>
              <div className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">Problème traité :</span>{" "}
                  {service.problem}
                </p>
                <p>
                  <span className="font-medium text-foreground">Accompagnement :</span>{" "}
                  {service.approach}
                </p>
                <p>
                  <span className="font-medium text-foreground">Risque maîtrisé :</span>{" "}
                  {service.riskHandled}
                </p>
                <p>
                  <span className="font-medium text-foreground">Format :</span>{" "}
                  {service.engagement}
                </p>
              </div>
              <p className="mt-5 text-sm font-semibold text-foreground">Livrables</p>
              <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                {service.deliverables.map((deliverable) => (
                  <li className="flex items-center gap-2" key={deliverable}>
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <div className="container-shell mt-10">
          <Button asChild size="lg">
            <Link href="/diagnostic-ia">
              Planifier un diagnostic IA
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
