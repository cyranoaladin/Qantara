import Link from "next/link";
import Image from "next/image";

import { brandAssets } from "@/lib/brand";
import { footerNavigation } from "@/lib/data/navigation";
import { siteConfig } from "@/lib/seo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/45">
      <div className="container-shell py-12">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          <div>
            <Image
              alt="Qantara AI"
              className="h-12 w-auto"
              height={48}
              src={brandAssets.logoMonochrome}
              width={201}
            />
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              Qantara AI — Conseil, formation, développement et gouvernance IA depuis la
              Tunisie.
            </p>
            <p className="mt-5 text-sm text-muted">Tunisie</p>
            <a
              className="mt-2 inline-flex text-sm text-muted-foreground hover:text-primary"
              href={`mailto:${siteConfig.email}`}
            >
              {siteConfig.email}
            </a>
          </div>

          <FooterColumn title="Services" items={footerNavigation.services} />
          <FooterColumn title="Ressources" items={footerNavigation.resources} />
          <div>
            <p className="text-sm font-semibold text-foreground">Contact</p>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
              <li>
                <Link className="hover:text-primary" href="/contact">
                  Écrire à Qantara AI
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" href="/diagnostic-ia">
                  Diagnostic IA
                </Link>
              </li>
              <li>
                <a
                  className="hover:text-primary"
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

        <div className="mt-10 border-t border-border pt-6 text-xs text-muted">
          © {year} Qantara AI. Tous droits réservés.
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
            <Link className="hover:text-primary" href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
