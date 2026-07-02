import { Card } from "@/components/ui/card";
import type { Sector } from "@/lib/data/sectors";

export function SectorCard({ sector }: { sector: Sector }) {
  return (
    <Card className="group h-full p-5 hover:-translate-y-1 hover:border-secondary/45">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold">{sector.name}</h3>
        <span className="mt-1 h-2 w-2 rounded-full bg-secondary transition-transform group-hover:scale-125" />
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">{sector.priority}</p>
      <div className="mt-4 rounded-md border border-border bg-white/[0.035] p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
          À mesurer
        </p>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">{sector.metric}</p>
      </div>
      <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
        {sector.useCases.map((useCase) => (
          <li className="flex gap-2" key={useCase}>
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary" />
            <span>{useCase}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-border pt-4 text-xs leading-5 text-muted">
        Garde-fou : {sector.guardrail}
      </p>
    </Card>
  );
}
