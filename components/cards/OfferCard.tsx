import { ArrowRight, CheckCircle2 } from "lucide-react";
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
          <Badge className="border-primary/20 bg-primary/10 text-primary">
            {offer.type}
          </Badge>
          <h3 className="mt-4 text-xl font-semibold">{offer.name}</h3>
        </div>
        <span className="rounded-md border border-secondary/35 bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary">
          Cadrage requis
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">{offer.promise}</p>
      <div className="mt-5 grid gap-4 rounded-lg border border-border bg-white/[0.035] p-4">
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
              <li className="flex items-start gap-2" key={output}>
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <span>{output}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {offer.audience ? (
        <p className="mt-4 text-sm text-muted">
          <span className="font-medium text-muted-foreground">Pour :</span>{" "}
          {offer.audience}
        </p>
      ) : null}
      {offer.deliverables ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {offer.deliverables.slice(0, 5).map((deliverable) => (
            <li
              className="rounded-md border border-border bg-white/[0.04] px-2.5 py-1 text-xs text-muted-foreground"
              key={deliverable}
            >
              {deliverable}
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-5 text-sm leading-6 text-muted-foreground">
        <span className="font-medium text-foreground">Idéal pour :</span> {offer.bestFor}
      </p>
      <Button asChild className="mt-auto self-start" variant="secondary">
        <Link href="/diagnostic-ia">
          {offer.cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </Card>
  );
}
