import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { DocumentMockup } from "@/components/visual/DocumentMockup";

import { SectionHeader } from "./SectionHeader";

export function LeadMagnetSection() {
  return (
    <section className="section-padding">
      <div className="container-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <div>
          <SectionHeader
            badge="Checklist IA"
            title="Recevoir la checklist IA pour votre organisation."
            description="Une grille opérationnelle pour repérer les cas d'usage IA crédibles, qualifier les risques de confidentialité et prioriser les actions à forte valeur."
          />
          <div className="mt-8 hidden md:block">
            <DocumentMockup />
          </div>
        </div>
        <NewsletterForm />
      </div>
    </section>
  );
}
