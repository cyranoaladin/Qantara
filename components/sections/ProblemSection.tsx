import { AlertTriangle, BarChart3, LockKeyhole, PlugZap } from "lucide-react";

import { Card } from "@/components/ui/card";

import { SectionHeader } from "./SectionHeader";

const problems = [
  {
    title: "Des usages IA invisibles pour la direction",
    description:
      "Les équipes expérimentent, mais les pratiques, outils et données utilisées ne sont pas cartographiés.",
    icon: AlertTriangle,
  },
  {
    title: "Des données internes exposées sans cadre",
    description:
      "Les documents, prompts et exports peuvent circuler dans des outils non validés ou non adaptés.",
    icon: LockKeyhole,
  },
  {
    title: "Des prototypes qui restent hors processus",
    description:
      "Les démonstrations fonctionnent, mais ne sont pas reliées aux responsabilités, validations et outils réels.",
    icon: PlugZap,
  },
  {
    title: "Une valeur difficile à défendre",
    description:
      "Sans indicateurs, impossible de comparer temps gagné, qualité, risques évités et effort de maintenance.",
    icon: BarChart3,
  },
] as const;

export function ProblemSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/45 to-transparent"
      />
      <div className="container-shell">
        <SectionHeader
          badge="Le vrai sujet n'est pas l'outil"
          title="L'IA est déjà dans vos équipes. La question est de savoir si elle est maîtrisée."
          description="Beaucoup d'organisations testent des outils IA sans méthode : prompts dispersés, données sensibles mal protégées, prototypes non maintenus, absence de mesure, équipes peu formées. Qantara AI structure l'adoption de l'IA pour transformer les usages en gains réels."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <Card
                className="p-5 hover:-translate-y-1 hover:border-secondary/45"
                key={problem.title}
              >
                <Icon className="h-6 w-6 text-secondary" />
                <h3 className="mt-5 text-base font-semibold">{problem.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {problem.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
