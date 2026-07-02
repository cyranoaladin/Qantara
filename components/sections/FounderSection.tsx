import { Binary, BookOpenCheck, GraduationCap, Sigma } from "lucide-react";

import { Card } from "@/components/ui/card";

import { SectionHeader } from "./SectionHeader";

const pillars = [
  ["Rigueur mathématique", "Modéliser les problèmes avant de choisir les outils.", Sigma],
  [
    "Culture informatique & algorithmique",
    "Comprendre les limites techniques et les intégrer dans l'architecture.",
    Binary,
  ],
  [
    "Expérience pédagogique",
    "Former des publics hétérogènes sans simplifier à l'excès.",
    GraduationCap,
  ],
  [
    "Vision IA & blockchain",
    "Relier automatisation, confiance, traçabilité et nouveaux usages.",
    BookOpenCheck,
  ],
] as const;

export function FounderSection() {
  return (
    <section className="section-padding border-y border-border bg-card/24">
      <div className="container-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <SectionHeader
          badge="Crédibilité fondatrice"
          title="Une approche qui relie pédagogie, raisonnement mathématique, logiciel et gouvernance."
          description="Qantara AI est portée par Alaeddine BEN RHOUMA, professeur agrégé de mathématiques, enseignant en mathématiques et NSI à Tunis, coordinateur du Labo Maths depuis 2023 et engagé depuis plusieurs années dans la formation, la vulgarisation scientifique, l'intelligence artificielle, la blockchain et les projets éducatifs innovants."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {pillars.map(([label, description, Icon]) => (
            <Card
              className="p-5 hover:-translate-y-1 hover:border-primary/45"
              key={label}
            >
              <Icon className="h-6 w-6 text-primary" />
              <h3 className="mt-5 text-base font-semibold">{label}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
