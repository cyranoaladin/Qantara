import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Formations IA en Tunisie — Qantara AI Academy",
  description:
    "Formations IA pour dirigeants, enseignants, développeurs, étudiants et équipes métier : IA générative, RAG, agents et automatisation.",
  path: "/formations",
});

const levels = [
  ["Découverte IA", "Comprendre les modèles, leurs limites et les usages raisonnables."],
  [
    "Productivité IA",
    "Structurer prompts, synthèses, brouillons, comptes rendus et contrôles qualité.",
  ],
  [
    "IA métier",
    "Appliquer l'IA à des documents, procédures et décisions spécifiques au métier.",
  ],
  [
    "IA pour dirigeants",
    "Décider investissements, risques, gouvernance et feuille de route.",
  ],
  [
    "IA pour enseignants",
    "Construire activités, règles d'évaluation, différenciation et esprit critique.",
  ],
  [
    "IA pour développeurs",
    "Comprendre RAG, agents, API, tests, sécurité et intégration applicative.",
  ],
  [
    "IA générative avancée",
    "Combiner prompts structurés, données, outils et validation humaine.",
  ],
  [
    "Agents IA & automatisation",
    "Concevoir workflows, permissions, logs et limites d'autonomie.",
  ],
  [
    "RAG et assistants documentaires",
    "Préparer corpus, sources, évaluation des réponses et expérience utilisateur.",
  ],
] as const;

const formats = [
  "Atelier 2h",
  "Journée",
  "Programme 3 semaines",
  "Formation entreprise",
  "Formation établissement scolaire",
  "Coaching dirigeant",
] as const;

export default function FormationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Qantara AI Academy"
        title="Former les équipes à décider, utiliser et contrôler l'IA dans leur métier."
        description="Les formations Qantara AI ne se limitent pas aux prompts. Elles relient productivité, données, risques, validation humaine et cas d'usage concrets."
      />
      <section className="section-padding">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_.8fr]">
          <div>
            <h2 className="text-3xl font-semibold">Parcours proposés</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {levels.map(([level, description]) => (
                <Card
                  className="p-5 hover:-translate-y-1 hover:border-primary/45"
                  key={level}
                >
                  <h3 className="font-semibold">{level}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
          <Card>
            <h2 className="text-2xl font-semibold">Formats</h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Chaque format peut intégrer des exemples métiers, une charte d'usage, des
              exercices par profil et une synthèse pour la direction.
            </p>
            <ul className="mt-6 grid gap-3 text-sm text-muted-foreground">
              {formats.map((format) => (
                <li className="flex gap-2" key={format}>
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary" />
                  <span>{format}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8">
              <Link href="/diagnostic-ia">Construire un programme</Link>
            </Button>
          </Card>
        </div>
      </section>
      <section className="section-padding border-t border-border bg-card/24">
        <div className="container-shell grid gap-5 md:grid-cols-3">
          {[
            [
              "Avant",
              "Questionnaire de maturité, publics ciblés, métiers prioritaires et risques à nommer.",
            ],
            [
              "Pendant",
              "Démonstrations, exercices, cas réels anonymisés et règles d'usage.",
            ],
            [
              "Après",
              "Synthèse, pistes d'action, ressources et recommandations de gouvernance.",
            ],
          ].map(([title, description]) => (
            <Card className="p-5" key={title}>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
