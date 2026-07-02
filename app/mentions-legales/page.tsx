import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { createMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Mentions légales | Qantara AI",
  description: "Mentions légales de Qantara AI.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        eyebrow="Légal"
        title="Mentions légales"
        description="Informations minimales relatives à l'éditeur du site Qantara AI."
      />
      <section className="section-padding">
        <div className="container-shell max-w-3xl text-sm leading-7 text-muted-foreground">
          <p>
            Éditeur : Qantara AI Consulting & Academy SARL, société basée en Tunisie. Les
            informations juridiques complètes seront précisées lors de la mise en
            production officielle.
          </p>
          <p className="mt-4">
            Contact :{" "}
            <a className="text-primary" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </p>
          <p className="mt-4">
            Le contenu du site est fourni à titre informatif. Toute reproduction sans
            autorisation préalable est interdite.
          </p>
        </div>
      </section>
    </>
  );
}
