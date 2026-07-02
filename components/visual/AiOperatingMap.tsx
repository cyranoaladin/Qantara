import { Activity, Brain, GraduationCap, ShieldCheck, Workflow } from "lucide-react";

const nodes = [
  {
    label: "Academy",
    detail: "Référentiel d'usages",
    icon: GraduationCap,
    className: "left-4 top-6",
  },
  {
    label: "Consulting",
    detail: "Roadmap 90 jours",
    icon: Brain,
    className: "right-6 top-12",
  },
  {
    label: "Studio",
    detail: "Prototype contrôlé",
    icon: Workflow,
    className: "left-10 bottom-14",
  },
  {
    label: "Governance",
    detail: "Règles & données",
    icon: ShieldCheck,
    className: "right-4 bottom-8",
  },
] as const;

export function AiOperatingMap() {
  return (
    <div className="relative min-h-[430px] overflow-hidden rounded-lg border border-border bg-card/72 p-5 shadow-2xl shadow-black/30">
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
        viewBox="0 0 500 430"
      >
        <path d="M90 80 C170 120 255 120 405 104" fill="none" stroke="currentColor" />
        <path d="M120 330 C200 240 275 210 390 345" fill="none" stroke="currentColor" />
        <path d="M90 80 C120 180 130 250 120 330" fill="none" stroke="currentColor" />
        <path d="M405 104 C390 205 385 270 390 345" fill="none" stroke="currentColor" />
      </svg>

      <div className="absolute left-1/2 top-1/2 w-[min(84%,330px)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-cyan-300/25 bg-background/78 p-4 shadow-xl shadow-cyan-950/20 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              AI Operating Map
            </p>
            <h2 className="mt-2 text-xl font-semibold">Portefeuille IA piloté</h2>
          </div>
          <Activity className="h-6 w-6 text-secondary" />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
          {[
            ["Audit", "01"],
            ["Prototype", "02"],
            ["Cadre IA", "03"],
          ].map(([label, value]) => (
            <div
              className="rounded-md border border-border bg-white/[0.04] p-3"
              key={label}
            >
              <p className="text-lg font-semibold text-foreground">{value}</p>
              <p className="mt-1 text-muted">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-md border border-border bg-white/[0.04] p-3">
          <div className="h-2 rounded-full bg-white/10">
            <div className="h-2 w-3/4 rounded-full bg-primary" />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Mesure : adoption, qualité des réponses, temps gagné, risques évités.
          </p>
        </div>
      </div>

      {nodes.map((node) => {
        const Icon = node.icon;
        return (
          <div
            className={`absolute w-36 rounded-lg border border-border bg-card-alt/92 p-3 shadow-lg shadow-black/20 backdrop-blur ${node.className}`}
            key={node.label}
          >
            <Icon className="h-5 w-5 text-primary" />
            <p className="mt-3 text-sm font-semibold">{node.label}</p>
            <p className="text-xs text-muted">{node.detail}</p>
          </div>
        );
      })}
    </div>
  );
}
