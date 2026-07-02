import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "IA pour écoles, enseignants et universités | Qantara AI Education",
  description:
    "Programmes IA pour enseignants, élèves, directions, établissements et universités : formations, ateliers, chartes IA et projets Maths/NSI.",
  path: "/education",
});

const publics = [
  ["Enseignants", "Préparer, différencier, évaluer et encadrer les usages."],
  ["Élèves", "Comprendre les limites, citer, vérifier et garder l'effort intellectuel."],
  ["Directions", "Définir une charte, communiquer et gérer les situations sensibles."],
  [
    "Coordinateurs pédagogiques",
    "Structurer projets, formations et retours d'expérience.",
  ],
  ["Établissements", "Aligner pratiques, règles et communication aux familles."],
  [
    "Universités",
    "Former aux usages avancés, à la recherche documentaire et à l'intégrité.",
  ],
] as const;

const offers = [
  "Formation enseignants avec scénarios de classe",
  "Atelier élèves sur limites, vérification et citation",
  "Charte IA établissement et communication interne",
  "Club IA / mathématiques / NSI avec projets guidés",
  "Projets interdisciplinaires IA, données, sciences et société",
  "Accompagnement Labo Maths / innovation pédagogique",
] as const;

export default function EducationPage() {
  return (
    <>
      <PageHero
        eyebrow="Qantara AI Education"
        title="Intégrer l'IA dans l'éducation sans renoncer à l'exigence intellectuelle."
        description="Qantara AI Education aide les établissements à former, cadrer et expérimenter l'IA avec une attention particulière aux apprentissages, à l'évaluation et à l'esprit critique."
      />
      <section className="section-padding">
        <div className="container-shell grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold">Publics accompagnés</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {publics.map(([publicItem, description]) => (
                <Card
                  className="p-5 hover:-translate-y-1 hover:border-primary/45"
                  key={publicItem}
                >
                  <h3 className="font-semibold">{publicItem}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
          <Card>
            <h2 className="text-2xl font-semibold">Offres éducation</h2>
            <ul className="mt-6 grid gap-3 text-sm text-muted-foreground">
              {offers.map((offer) => (
                <li className="flex gap-2" key={offer}>
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{offer}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8">
              <Link href="/contact">Échanger sur un établissement</Link>
            </Button>
          </Card>
        </div>
      </section>
    </>
  );
}
