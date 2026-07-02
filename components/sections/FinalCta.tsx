import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="section-padding">
      <div className="container-shell">
        <div className="relative overflow-hidden rounded-lg border border-primary/20 bg-primary/10 p-8 md:p-12">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(120deg, rgba(34,211,238,.12), transparent 40%, rgba(214,168,90,.10))",
            }}
          />
          <div className="relative max-w-3xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              Votre organisation utilise déjà l'IA. La décision à prendre est maintenant
              organisationnelle.
            </h2>
            <p className="mt-4 text-pretty text-base leading-7 text-muted-foreground md:text-lg">
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
