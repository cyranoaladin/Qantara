import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Glow } from "@/components/visual/Glow";

export function FinalCta() {
  return (
    <section className="section-padding">
      <div className="container-shell">
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.06] p-8 md:p-14">
          <Glow className="left-0 top-0 h-48 w-48 bg-primary/10 blur-3xl" />
          <Glow className="bottom-0 right-0 h-48 w-48 bg-secondary/10 blur-3xl" />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(120deg, rgba(34,211,238,.12), transparent 40%, rgba(214,168,90,.10))",
            }}
          />
          <div className="relative max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Prochaine étape
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              Votre organisation utilise déjà l'IA.{" "}
              <span className="gradient-text-gold">
                La décision à prendre est maintenant organisationnelle.
              </span>
            </h2>
            <p className="mt-5 text-pretty text-base leading-7 text-muted-foreground md:text-lg">
              Planifiez un diagnostic IA pour clarifier les cas d'usage à lancer, les
              données à protéger, les équipes à former et les indicateurs à suivre.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/diagnostic-ia">
                  Planifier un diagnostic IA
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">
                  Écrire à Qantara AI
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
