import { NewsletterForm } from "@/components/forms/NewsletterForm";

import { SectionHeader } from "./SectionHeader";

export function LeadMagnetSection() {
  return (
    <section className="section-padding">
      <div className="container-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <SectionHeader
          badge="Checklist IA"
          title="Recevoir la checklist IA pour votre organisation."
          description="Une grille opérationnelle pour repérer les cas d'usage IA crédibles, qualifier les risques de confidentialité et prioriser les actions à forte valeur."
        />
        <NewsletterForm />
      </div>
    </section>
  );
}
