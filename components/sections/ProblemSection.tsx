import { AlertTriangle, BarChart3, LockKeyhole, PlugZap } from "lucide-react";

import { Card } from "@/components/ui/card";
import { DataFlowIllustration } from "@/components/visual/SectionIllustration";

import { SectionHeader } from "./SectionHeader";

const problems = [
  {
    title: "Des usages IA invisibles pour la direction",
    description:
      "Les équipes expérimentent, mais les pratiques, outils et données utilisées ne sont pas cartographiés.",
    icon: AlertTriangle,
    accent: "text-amber-400",
    border: "hover:border-amber-400/35",
  },
  {
    title: "Des données internes exposées sans cadre",
    description:
      "Les documents, prompts et exports peuvent circuler dans des outils non validés ou non adaptés.",
    icon: LockKeyhole,
    accent: "text-rose-400",
    border: "hover:border-rose-400/35",
  },
  {
    title: "Des prototypes qui restent hors processus",
    description:
      "Les démonstrations fonctionnent, mais ne sont pas reliées aux responsabilités, validations et outils réels.",
    icon: PlugZap,
    accent: "text-violet-400",
    border: "hover:border-violet-400/35",
  },
  {
    title: "Une valeur difficile à défendre",
    description:
      "Sans indicateurs, impossible de comparer temps gagné, qualité, risques évités et effort de maintenance.",
    icon: BarChart3,
    accent: "text-cyan-400",
    border: "hover:border-cyan-400/35",
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
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeader
              badge="Le vrai sujet n'est pas l'outil"
              title="L'IA est déjà dans vos équipes. La question est de savoir si elle est maîtrisée."
              description="Beaucoup d'organisations testent des outils IA sans méthode : prompts dispersés, données sensibles mal protégées, prototypes non maintenus, absence de mesure, équipes peu formées."
            />
          </div>
          <DataFlowIllustration className="hidden lg:block" />
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <Card
                className={`p-5 hover:-translate-y-1 ${problem.border}`}
                key={problem.title}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-white/[0.04]">
                  <Icon className={`h-5 w-5 ${problem.accent}`} />
                </div>
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
