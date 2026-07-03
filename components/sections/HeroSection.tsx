import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroIllustration } from "@/components/visual/HeroIllustration";
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
      <Glow className="left-1/2 top-16 -translate-x-1/2 animate-pulse-glow" />
      <Glow className="right-0 top-1/3 h-64 w-64 bg-secondary/8 blur-3xl animate-pulse-glow delay-200" />
      <div className="container-shell grid min-h-[calc(100svh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
        <div>
          <Badge className="animate-fade-up badge-glow border-primary/25 bg-primary/10 text-cyan-100">
            Cabinet IA B2B basé en Tunisie · Conseil, formation, studio et gouvernance
          </Badge>
          <h1 className="animate-fade-up delay-100 mt-6 max-w-4xl text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            <span className="gradient-text">
              Transformer l'IA en usages métier utiles, gouvernés et mesurables.
            </span>
          </h1>
          <p className="animate-fade-up delay-200 mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
            Qantara AI aide les directions, établissements et équipes métier à passer des
            tests dispersés à une adoption structurée : audit des cas d'usage, formation,
            assistants IA, automatisation, gouvernance des données et mesure d'impact.
          </p>
          <div className="animate-fade-up delay-300 mt-8 flex flex-col gap-3 sm:flex-row">
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
          <ul className="animate-fade-up delay-400 mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            {proofs.map((proof) => (
              <li className="flex items-center gap-2" key={proof}>
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                {proof}
              </li>
            ))}
          </ul>
          <div className="animate-fade-up delay-500 mt-8 grid gap-3 border-l-2 border-primary/35 pl-5 text-sm text-muted-foreground">
            <p>
              Pour organisations qui veulent décider avant de déployer, former avant de
              généraliser et mesurer avant d'industrialiser.
            </p>
            <p className="font-medium text-foreground">
              Former. Automatiser. Déployer. Mesurer.
            </p>
          </div>
        </div>
        <div className="animate-fade-up delay-300">
          <HeroIllustration />
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a
          href="#methode"
          aria-label="Défiler vers le contenu"
          className="flex flex-col items-center gap-2 text-muted transition-colors hover:text-primary"
        >
          <span className="text-xs font-medium uppercase tracking-wider">Découvrir</span>
          <ChevronDown className="h-5 w-5 animate-scroll-hint" />
        </a>
      </div>
    </section>
  );
}
