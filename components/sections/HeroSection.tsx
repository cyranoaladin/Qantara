import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AiOperatingMap } from "@/components/visual/AiOperatingMap";
import { Glow } from "@/components/visual/Glow";
import { GridBackground } from "@/components/visual/GridBackground";

const proofs = [
  "Roadmap IA 90 jours",
  "Assistants métier sur documents",
  "Automatisations avec validation humaine",
  "Charte IA & confidentialité",
  "Indicateurs d'adoption et ROI",
] as const;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <GridBackground />
      <Glow className="left-1/2 top-16 -translate-x-1/2" />
      <div className="container-shell grid min-h-[calc(100svh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1.02fr_.98fr] lg:py-20">
        <div>
          <Badge className="border-primary/25 bg-primary/10 text-cyan-100">
            Cabinet IA B2B basé en Tunisie · Conseil, formation, studio et gouvernance
          </Badge>
          <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Transformer l'IA en usages métier utiles, gouvernés et mesurables.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
            Qantara AI aide les directions, établissements et équipes métier à passer des
            tests dispersés à une adoption structurée : audit des cas d'usage, formation,
            assistants IA, automatisation, gouvernance des données et mesure d'impact.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/diagnostic-ia">
                Planifier un diagnostic IA
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/services">Voir les cadres d'intervention</Link>
            </Button>
          </div>
          <ul className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            {proofs.map((proof) => (
              <li className="flex items-center gap-2" key={proof}>
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {proof}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3 border-l border-primary/35 pl-5 text-sm text-muted-foreground">
            <p>
              Pour organisations qui veulent décider avant de déployer, former avant de
              généraliser et mesurer avant d'industrialiser.
            </p>
            <p className="font-medium text-foreground">
              Former. Automatiser. Déployer. Mesurer.
            </p>
          </div>
        </div>
        <AiOperatingMap />
      </div>
    </section>
  );
}
