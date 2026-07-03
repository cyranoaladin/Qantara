import { Activity, Brain, GraduationCap, ShieldCheck, Workflow } from "lucide-react";

const nodes = [
  {
    label: "Academy",
    detail: "Référentiel d'usages",
    icon: GraduationCap,
    className: "left-4 top-4",
  },
  {
    label: "Consulting",
    detail: "Roadmap 90 jours",
    icon: Brain,
    className: "right-4 top-4",
  },
  {
    label: "Studio",
    detail: "Prototype contrôlé",
    icon: Workflow,
    className: "left-4 bottom-4",
  },
  {
    label: "Governance",
    detail: "Règles & données",
    icon: ShieldCheck,
    className: "right-4 bottom-4",
  },
] as const;

export function AiOperatingMap() {
  return (
    <div className="relative min-h-[500px] overflow-hidden rounded-2xl border border-border bg-card/72 p-5 shadow-2xl shadow-black/30">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(34,211,238,.16), transparent 32%), radial-gradient(circle at 75% 75%, rgba(214,168,90,.12), transparent 30%)",
        }}
      />
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full text-border"
        preserveAspectRatio="none"
        viewBox="0 0 500 500"
      >
        <path
          d="M100 70 C180 110 280 110 400 80"
          fill="none"
          stroke="currentColor"
          strokeDasharray="4 4"
          opacity="0.6"
        />
        <path
          d="M100 420 C200 340 300 320 400 420"
          fill="none"
          stroke="currentColor"
          strokeDasharray="4 4"
          opacity="0.6"
        />
        <path
          d="M100 70 C110 180 110 310 100 420"
          fill="none"
          stroke="currentColor"
          strokeDasharray="4 4"
          opacity="0.6"
        />
        <path
          d="M400 80 C400 190 400 310 400 420"
          fill="none"
          stroke="currentColor"
          strokeDasharray="4 4"
          opacity="0.6"
        />
      </svg>

      <div className="absolute left-1/2 top-1/2 w-[min(68%,280px)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-cyan-300/25 bg-background/85 p-4 shadow-xl shadow-cyan-950/20 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-primary">
              AI Operating Map
            </p>
            <h2 className="mt-1 text-base font-semibold">Portefeuille IA piloté</h2>
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-secondary/30 bg-secondary/10">
            <Activity className="h-4 w-4 text-secondary" />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-xs">
          {[
            ["Audit", "01"],
            ["Prototype", "02"],
            ["Cadre IA", "03"],
          ].map(([label, value]) => (
            <div
              className="rounded-lg border border-border bg-white/[0.04] p-2"
              key={label}
            >
              <p className="text-base font-semibold text-foreground">{value}</p>
              <p className="mt-0.5 text-[10px] text-muted">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg border border-border bg-white/[0.04] p-2.5">
          <div className="progress-bar h-1.5 rounded-full bg-white/10">
            <div className="h-1.5 w-3/4 rounded-full bg-gradient-to-r from-primary to-primary-dark" />
          </div>
          <p className="mt-1.5 text-[10px] leading-4 text-muted-foreground">
            Adoption, qualité, temps gagné, risques évités.
          </p>
        </div>
      </div>

      {nodes.map((node) => {
        const Icon = node.icon;
        return (
          <div
            className={`absolute w-[132px] rounded-xl border border-border bg-card-alt/92 p-3 shadow-lg shadow-black/20 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 ${node.className}`}
            key={node.label}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-2 text-sm font-semibold">{node.label}</p>
            <p className="text-[11px] text-muted">{node.detail}</p>
          </div>
        );
      })}
    </div>
  );
}
