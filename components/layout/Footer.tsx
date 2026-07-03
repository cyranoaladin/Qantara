import Link from "next/link";
import Image from "next/image";
import { ArrowUp } from "lucide-react";

import { brandAssets } from "@/lib/brand";
import { footerNavigation } from "@/lib/data/navigation";
import { siteConfig } from "@/lib/seo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/45">
      <div className="container-shell py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          <div>
            <Image
              alt="Qantara AI"
              height={48}
              src={brandAssets.logoMonochrome}
              width={201}
            />
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              Cabinet IA B2B basé en Tunisie. Conseil, formation, développement et
              gouvernance IA pour entreprises, écoles et institutions.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-white/[0.04] text-muted-foreground transition-colors hover:border-primary/35 hover:text-primary"
                href="https://www.linkedin.com/company/qantara-ai"
                rel="noreferrer"
                target="_blank"
                aria-label="LinkedIn Qantara AI"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          <FooterColumn title="Services" items={footerNavigation.services} />
          <FooterColumn title="Ressources" items={footerNavigation.resources} />
          <div>
            <p className="text-sm font-semibold text-foreground">Contact</p>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
              <li>
                <Link className="transition-colors hover:text-primary" href="/contact">
                  Écrire à Qantara AI
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-primary"
                  href="/diagnostic-ia"
                >
                  Diagnostic IA
                </Link>
              </li>
              <li>
                <a
                  className="transition-colors hover:text-primary"
                  href="https://www.linkedin.com/company/qantara-ai"
                  rel="noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <FooterColumn title="Légal" items={footerNavigation.legal} />
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
          <p className="text-xs text-muted">© {year} Qantara AI. Tous droits réservés.</p>
          <a
            href="#"
            className="flex items-center gap-2 text-xs text-muted transition-colors hover:text-primary"
            aria-label="Retour en haut de page"
          >
            <span className="hidden sm:inline">Haut de page</span>
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item.href}>
            <Link className="transition-colors hover:text-primary" href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
