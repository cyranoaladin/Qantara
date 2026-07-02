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
      <div className="container-shell relative">
        <Badge>{eyebrow}</Badge>
        <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-pretty text-lg leading-8 text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  );
}
