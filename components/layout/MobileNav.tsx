"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { mainNavigation } from "@/lib/data/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Button
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        size="icon"
        variant="secondary"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open ? (
        <div className="absolute inset-x-4 top-20 rounded-[24px] border border-border bg-card/98 p-4 shadow-2xl shadow-black/35 backdrop-blur-xl">
          <nav aria-label="Navigation mobile" className="grid gap-2">
            {mainNavigation.map((item) => (
              <Link
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 grid gap-2">
            <Button asChild>
              <Link href="/diagnostic-ia" onClick={() => setOpen(false)}>
                Planifier un diagnostic IA
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/services" onClick={() => setOpen(false)}>
                Voir les offres
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
