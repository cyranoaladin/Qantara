import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { createMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Politique de confidentialité | Qantara AI",
  description:
    "Politique de confidentialité minimale de Qantara AI pour les formulaires de contact, diagnostic IA et newsletter.",
  path: "/confidentialite",
});

export default function ConfidentialitePage() {
  return (
    <>
      <PageHero
        eyebrow="Confidentialité"
        title="Politique de confidentialité"
        description="Les données transmises via les formulaires servent uniquement au traitement de votre demande."
      />
      <section className="section-padding">
        <div className="container-shell max-w-3xl text-sm leading-7 text-muted-foreground">
          <p>
            Qantara AI collecte les informations que vous transmettez via les formulaires
            du site afin de répondre à une demande de contact, de diagnostic IA ou d'envoi
            de ressource.
          </p>
          <p className="mt-4">
            Les données ne sont pas vendues. Elles peuvent être utilisées pour reprendre
            contact avec vous au sujet de votre demande et améliorer la qualité du suivi.
          </p>
          <p className="mt-4">
            Vous pouvez demander la rectification ou la suppression de vos données en
            écrivant à{" "}
            <a className="text-primary" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            .
          </p>
          <p className="mt-4">
            Les organisations doivent éviter de transmettre des données sensibles dans les
            formulaires avant un cadrage spécifique de confidentialité.
          </p>
        </div>
      </section>
    </>
  );
}
