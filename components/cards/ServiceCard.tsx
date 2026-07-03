import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Beaker,
  Brain,
  GraduationCap,
  Landmark,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import type { Service } from "@/lib/data/services";

const icons = {
  strategy: Brain,
  academy: GraduationCap,
  studio: Workflow,
  governance: ShieldCheck,
  education: Landmark,
  lab: Beaker,
} satisfies Record<Service["icon"], typeof Brain>;

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];

  return (
    <Card className="group flex h-full flex-col hover:-translate-y-1 hover:border-primary/45">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-primary/10 text-primary transition-all duration-200 group-hover:border-primary/45 group-hover:bg-primary/15 group-hover:shadow-lg group-hover:shadow-primary/10">
          <Icon className="h-5 w-5" />
        </div>
        <span className="rounded-full border border-border bg-white/[0.04] px-2.5 py-1 text-xs text-muted">
          {service.shortTitle}
        </span>
      </div>
      <CardTitle className="mt-5">{service.title}</CardTitle>
      <CardDescription>{service.description}</CardDescription>
      <div className="mt-5 rounded-lg border border-border bg-white/[0.035] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
          Résultat visé
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {service.businessOutcome}
        </p>
      </div>
      <Link
        className="link-underline mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary transition-colors hover:text-cyan-200 focus-visible:ring-2 focus-visible:ring-ring"
        href={service.href}
      >
        Voir le cadre d'intervention
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </Link>
    </Card>
  );
}
