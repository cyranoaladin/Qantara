import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui/card";
import { siteConfig, createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact | Qantara AI",
  description:
    "Contactez Qantara AI pour une formation IA, un audit, un prototype, une automatisation ou une démarche de gouvernance.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Échanger sur un besoin IA, formation, automatisation ou gouvernance."
        description="Décrivez votre contexte, votre organisation et le besoin à traiter. Qantara AI vous répondra avec une première orientation."
      />
      <section className="section-padding">
        <div className="container-shell grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
          <Card>
            <h2 className="text-2xl font-semibold">Coordonnées</h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Basé en Tunisie, Qantara AI accompagne les organisations tunisiennes et
              francophones à distance ou sur site selon les missions.
            </p>
            <a
              className="mt-6 inline-flex text-sm font-semibold text-primary"
              href={`mailto:${siteConfig.email}`}
            >
              {siteConfig.email}
            </a>
          </Card>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
