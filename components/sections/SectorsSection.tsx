import Link from "next/link";

import { SectorCard } from "@/components/cards/SectorCard";
import { Button } from "@/components/ui/button";
import { sectors } from "@/lib/data/sectors";

import { SectionHeader } from "./SectionHeader";

export function SectorsSection() {
  return (
    <section className="section-padding">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            badge="Cas d'usage types"
            title="Chaque secteur n'a pas besoin du même niveau d'autonomie IA."
            description="Nous partons des décisions, des documents et des risques propres au métier avant de choisir assistant, RAG, agent ou automatisation."
          />
          <Button asChild variant="secondary">
            <Link href="/cas-usages">Voir tous les cas d'usage</Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {sectors.map((sector) => (
            <SectorCard key={sector.name} sector={sector} />
          ))}
        </div>
      </div>
    </section>
  );
}
