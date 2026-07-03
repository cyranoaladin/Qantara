import {
  Binary,
  BookOpenCheck,
  GraduationCap,
  ShieldCheck,
  Sigma,
  Workflow,
} from "lucide-react";

const trustItems = [
  { label: "Rigueur mathématique", icon: Sigma },
  { label: "Culture logiciel & données", icon: Binary },
  { label: "Expérience formation enseignants", icon: GraduationCap },
  { label: "Automatisation IA encadrée", icon: Workflow },
  { label: "Prototypes full-stack", icon: BookOpenCheck },
  { label: "Gouvernance & confidentialité", icon: ShieldCheck },
] as const;

export function TrustBar() {
  return (
    <section className="border-y border-border bg-card/35">
      <div className="container-shell grid gap-3 py-6 sm:grid-cols-2 lg:grid-cols-6">
        {trustItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              className="flex items-center gap-3 rounded-lg border border-border bg-white/[0.035] px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-primary/35 hover:bg-white/[0.055] hover:text-foreground"
              key={item.label}
            >
              <Icon className="h-4 w-4 shrink-0 text-primary/70" />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
