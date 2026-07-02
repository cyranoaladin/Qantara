export function GridBackground() {
  return (
    <div
      aria-hidden="true"
      className="grid-mask pointer-events-none absolute inset-0 -z-10 opacity-45"
      style={{
        backgroundImage:
          "linear-gradient(rgba(148,163,184,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.13) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }}
    />
  );
}
