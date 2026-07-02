import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Offer } from "@/lib/data/offers";

export function OfferCard({ offer }: { offer: Offer }) {
  return (
    <Card className="group flex h-full flex-col hover:-translate-y-1 hover:border-primary/45">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge>{offer.type}</Badge>
          <h3 className="mt-4 text-xl font-semibold">{offer.name}</h3>
        </div>
        <span className="rounded-md border border-secondary/35 px-2.5 py-1 text-xs font-medium text-secondary">
          Cadrage requis
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">{offer.promise}</p>
      <div className="mt-5 grid gap-3 rounded-md border border-border bg-white/[0.035] p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
            Périmètre
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{offer.scope}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Décisions produites
          </p>
          <ul className="mt-2 grid gap-1.5 text-sm text-muted-foreground">
            {offer.decisionOutputs.slice(0, 3).map((output) => (
              <li className="flex gap-2" key={output}>
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>{output}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {offer.audience ? (
        <p className="mt-4 text-sm text-muted">Pour : {offer.audience}</p>
      ) : null}
      {offer.deliverables ? (
        <ul className="mt-5 grid gap-2 text-sm text-muted-foreground">
          {offer.deliverables.slice(0, 5).map((deliverable) => (
            <li className="flex gap-2" key={deliverable}>
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
              <span>{deliverable}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-5 text-sm leading-6 text-muted-foreground">
        Idéal pour : {offer.bestFor}
      </p>
      <Button asChild className="mt-auto self-start" variant="secondary">
        <Link href="/diagnostic-ia">
          {offer.cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </Card>
  );
}
