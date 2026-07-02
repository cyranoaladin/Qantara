const trustItems = [
  "Rigueur mathématique",
  "Culture logiciel & données",
  "Expérience formation enseignants",
  "Automatisation IA encadrée",
  "Prototypes full-stack",
  "Gouvernance & confidentialité",
] as const;

export function TrustBar() {
  return (
    <section className="border-y border-border bg-card/35">
      <div className="container-shell grid gap-3 py-6 sm:grid-cols-2 lg:grid-cols-6">
        {trustItems.map((item) => (
          <div
            className="rounded-md border border-border bg-white/[0.035] px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/35 hover:bg-white/[0.055] hover:text-foreground"
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
