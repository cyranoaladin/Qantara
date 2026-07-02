import { cn } from "@/lib/utils";

export function Glow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 h-80 w-80 rounded-full bg-cyan-400/12 blur-3xl",
        className,
      )}
    />
  );
}
