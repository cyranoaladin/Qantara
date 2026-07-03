import { Binary, BookOpenCheck, GraduationCap, Sigma } from "lucide-react";

import { Card } from "@/components/ui/card";

import { SectionHeader } from "./SectionHeader";

const pillars = [
  {
    label: "Rigueur mathématique",
    description: "Modéliser les problèmes avant de choisir les outils.",
    icon: Sigma,
  },
  {
    label: "Culture informatique & algorithmique",
    description: "Comprendre les limites techniques et les intégrer dans l'architecture.",
    icon: Binary,
  },
  {
    label: "Expérience pédagogique",
    description: "Former des publics hétérogènes sans simplifier à l'excès.",
    icon: GraduationCap,
  },
  {
    label: "Vision IA & blockchain",
    description: "Relier automatisation, confiance, traçabilité et nouveaux usages.",
    icon: BookOpenCheck,
  },
] as const;

export function FounderSection() {
  return (
    <section className="section-padding section-glow-top border-y border-border bg-card/24">
      <div className="container-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeader
            badge="Crédibilité fondatrice"
            title="Une approche qui relie pédagogie, raisonnement mathématique, logiciel et gouvernance."
          />
          <div className="mt-6 flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/20 to-primary/5 text-2xl font-bold text-primary shadow-lg shadow-primary/10">
              AB
            </div>
            <div>
              <p className="text-base font-semibold text-foreground">
                Alaeddine BEN RHOUMA
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Professeur agrégé de mathématiques · Enseignant Maths & NSI · Coordinateur
                Labo Maths
              </p>
            </div>
          </div>
          <p className="mt-5 text-pretty text-sm leading-7 text-muted-foreground">
            Engagé depuis plusieurs années dans la formation, la vulgarisation
            scientifique, l'intelligence artificielle, la blockchain et les projets
            éducatifs innovants.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/35 hover:text-foreground"
              href="https://www.linkedin.com/company/qantara-ai"
              rel="noreferrer"
              target="_blank"
            >
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Suivre sur LinkedIn
            </a>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card
                className="p-5 hover:-translate-y-1 hover:border-primary/45"
                key={pillar.label}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{pillar.label}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {pillar.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
