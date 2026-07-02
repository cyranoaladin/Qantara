import type { Metadata } from "next";

import { SectorCard } from "@/components/cards/SectorCard";
import { PageHero } from "@/components/sections/PageHero";
import { sectors } from "@/lib/data/sectors";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Cas d'usage IA par secteur | Qantara AI",
  description:
    "Cas d'usage types pour l'IA en éducation, PME, cabinets comptables, juridique, tourisme, formation, industrie, RH et communication.",
  path: "/cas-usages",
});

export default function CasUsagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Cas d'usage types"
        title="Choisir des cas d'usage IA selon le métier, la donnée et le niveau de risque."
        description="Ces exemples sont des cas d'usage types. Ils ne prétendent pas représenter des références client existantes."
      />
      <section className="border-b border-border bg-card/24 py-10">
        <div className="container-shell grid gap-4 md:grid-cols-3">
          {[
            [
              "Valeur",
              "Quel temps, quelle qualité ou quelle capacité l'IA peut-elle améliorer ?",
            ],
            ["Données", "Quelles sources sont fiables, autorisées et suffisantes ?"],
            [
              "Contrôle",
              "Quelle validation humaine reste obligatoire avant usage réel ?",
            ],
          ].map(([title, description]) => (
            <div
              className="rounded-lg border border-border bg-white/[0.035] p-5"
              key={title}
            >
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="section-padding">
        <div className="container-shell grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => (
            <SectorCard key={sector.name} sector={sector} />
          ))}
        </div>
      </section>
    </>
  );
}
