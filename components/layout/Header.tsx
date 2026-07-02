import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { brandAssets } from "@/lib/brand";
import { mainNavigation } from "@/lib/data/navigation";

import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/78 backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between gap-6">
        <Link
          aria-label="Accueil Qantara AI"
          className="flex min-w-fit items-center gap-3"
          href="/"
        >
          <Image
            alt="Qantara AI"
            className="hidden h-12 w-auto sm:block"
            height={48}
            src={brandAssets.logoPrimary}
            priority
            width={201}
          />
          <Image
            alt=""
            aria-hidden="true"
            className="h-10 w-10 sm:hidden"
            height={40}
            src={brandAssets.mark}
            priority
            width={40}
          />
          <span className="sr-only">Qantara AI</span>
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-1 lg:flex"
        >
          {mainNavigation.map((item) => (
            <Link
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <Button asChild variant="secondary">
            <Link href="/services">Voir les offres</Link>
          </Button>
          <Button asChild>
            <Link href="/diagnostic-ia">
              Planifier un diagnostic IA
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
