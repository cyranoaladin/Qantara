"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { mainNavigation } from "@/lib/data/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <div className="lg:hidden">
      <Button
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        size="icon"
        variant="secondary"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open ? (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={close}
            aria-hidden="true"
          />
          <div className="mobile-nav-enter absolute inset-x-4 top-20 z-50 rounded-2xl border border-border bg-card/98 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <nav aria-label="Navigation mobile" className="grid gap-1">
              {mainNavigation.map((item) => (
                <Link
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
                  href={item.href}
                  key={item.href}
                  onClick={close}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 grid gap-2 border-t border-border pt-4">
              <Button asChild>
                <Link href="/diagnostic-ia" onClick={close}>
                  Planifier un diagnostic IA
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/services" onClick={close}>
                  Voir les offres
                </Link>
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
