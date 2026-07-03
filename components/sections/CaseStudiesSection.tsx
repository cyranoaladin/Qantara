import {
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Shield,
  Target,
  Users,
} from "lucide-react";

import { Card } from "@/components/ui/card";

import { SectionHeader } from "./SectionHeader";

const cases = [
  {
    title: "École privée",
    objective: "Former enseignants et direction à l'usage responsable de l'IA.",
    result: "Charte IA, ateliers, scénarios pédagogiques.",
    control: "Règles élèves/enseignants et limites d'évaluation.",
    icon: GraduationCap,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/25",
  },
  {
    title: "PME de services",
    objective: "Créer un assistant interne à partir de documents métier.",
    result: "Moins de temps perdu dans la recherche documentaire.",
    control: "Sources citées, périmètre documentaire et revue utilisateur.",
    icon: Users,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10 border-cyan-400/25",
  },
  {
    title: "Cabinet professionnel",
    objective: "Automatiser la préparation de brouillons et synthèses.",
    result: "Gain de temps avec validation humaine.",
    control: "Aucune sortie sensible sans contrôle qualifié.",
    icon: Briefcase,
    color: "text-violet-400",
    bg: "bg-violet-400/10 border-violet-400/25",
  },
] as const;

export function CaseStudiesSection() {
  return (
    <section className="section-padding section-glow-top border-y border-border bg-card/24">
      <div className="container-shell">
        <SectionHeader
          badge="Exemples de missions"
          title="Des missions types qui commencent par un enjeu métier, pas par une démo."
          description="Ces exemples décrivent des situations plausibles d'accompagnement. Ils ne sont pas présentés comme des références client existantes."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cases.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                className="hover:-translate-y-1 hover:border-secondary/45"
                key={item.title}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border ${item.bg}`}
                  >
                    <Icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                      Cas d'usage type
                    </p>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  <div className="flex gap-3">
                    <Target className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-sm leading-6 text-muted-foreground">
                      <span className="font-medium text-foreground">Objectif</span> :{" "}
                      {item.objective}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <p className="text-sm leading-6 text-muted-foreground">
                      <span className="font-medium text-foreground">Résultat visé</span> :{" "}
                      {item.result}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex gap-3 border-t border-border pt-5">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <p className="text-xs leading-5 text-muted">
                    <span className="font-medium text-muted-foreground">Garde-fou</span> :{" "}
                    {item.control}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
