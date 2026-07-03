import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";

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
          <div className="grid gap-4 content-start">
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Email</h2>
                  <a
                    className="text-sm text-primary transition-colors hover:text-cyan-200"
                    href={`mailto:${siteConfig.email}`}
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-secondary/25 bg-secondary/10">
                  <MapPin className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Localisation</h2>
                  <p className="text-sm text-muted-foreground">Tunisie</p>
                </div>
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-400/25 bg-emerald-400/10">
                  <MessageCircle className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Accompagnement</h2>
                  <p className="text-sm text-muted-foreground">
                    Tunisie et organisations francophones à distance
                  </p>
                </div>
              </div>
            </Card>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
