import { Card } from "@/components/ui/card";

import { SectionHeader } from "./SectionHeader";

const cases = [
  {
    title: "École privée",
    objective: "Former enseignants et direction à l'usage responsable de l'IA.",
    result: "Charte IA, ateliers, scénarios pédagogiques.",
    control: "Règles élèves/enseignants et limites d'évaluation.",
  },
  {
    title: "PME de services",
    objective: "Créer un assistant interne à partir de documents métier.",
    result: "Moins de temps perdu dans la recherche documentaire.",
    control: "Sources citées, périmètre documentaire et revue utilisateur.",
  },
  {
    title: "Cabinet professionnel",
    objective: "Automatiser la préparation de brouillons et synthèses.",
    result: "Gain de temps avec validation humaine.",
    control: "Aucune sortie sensible sans contrôle qualifié.",
  },
] as const;

export function CaseStudiesSection() {
  return (
    <section className="section-padding border-y border-border bg-card/24">
      <div className="container-shell">
        <SectionHeader
          badge="Exemples de missions"
          title="Des missions types qui commencent par un enjeu métier, pas par une démo."
          description="Ces exemples décrivent des situations plausibles d'accompagnement. Ils ne sont pas présentés comme des références client existantes."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cases.map((item) => (
            <Card
              className="hover:-translate-y-1 hover:border-secondary/45"
              key={item.title}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                Cas d'usage type
              </p>
              <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Objectif : {item.objective}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Résultat visé : {item.result}
              </p>
              <p className="mt-4 border-t border-border pt-4 text-xs leading-5 text-muted">
                Garde-fou : {item.control}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
