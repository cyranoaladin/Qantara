import Link from "next/link";
import type { Metadata } from "next";

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
      <section className="border-b border-border bg-card/24 py-10">
        <div className="container-shell grid gap-4 md:grid-cols-3">
          {[
            [
              "Décider",
              "Identifier les cas d'usage réellement prioritaires et les dépendances données, métiers et sécurité.",
            ],
            [
              "Équiper",
              "Former les équipes et construire les assistants ou automatisations utiles sur un périmètre maîtrisé.",
            ],
            [
              "Gouverner",
              "Définir les règles d'usage, les validations humaines et les indicateurs d'adoption.",
            ],
          ].map(([title, description]) => (
            <Card className="p-5" key={title}>
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {description}
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
      <section className="section-padding border-t border-border bg-card/24">
        <div className="container-shell grid gap-5 lg:grid-cols-2">
          {services.map((service) => (
            <Card key={service.title}>
              <h2 className="text-2xl font-semibold">{service.title}</h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Problème traité : {service.problem}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Accompagnement proposé : {service.approach}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Risque maîtrisé : {service.riskHandled}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Format : {service.engagement}
              </p>
              <p className="mt-5 text-sm font-semibold text-foreground">Livrables</p>
              <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                {service.deliverables.map((deliverable) => (
                  <li className="flex gap-2" key={deliverable}>
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <div className="container-shell mt-10">
          <Button asChild>
            <Link href="/diagnostic-ia">Planifier un diagnostic IA</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
