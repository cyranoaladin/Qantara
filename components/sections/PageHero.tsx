import { Badge } from "@/components/ui/badge";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-card/24 py-16 md:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute left-1/4 top-0 h-48 w-48 rounded-full bg-primary/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-secondary/6 blur-3xl"
      />
      <div className="container-shell relative">
        <Badge className="animate-fade-up badge-glow">{eyebrow}</Badge>
        <h1 className="animate-fade-up delay-100 mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          <span className="gradient-text">{title}</span>
        </h1>
        <p className="animate-fade-up delay-200 mt-5 max-w-3xl text-pretty text-lg leading-8 text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  );
}
