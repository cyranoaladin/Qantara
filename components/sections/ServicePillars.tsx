import { ServiceCard } from "@/components/cards/ServiceCard";
import { services } from "@/lib/data/services";

import { SectionHeader } from "./SectionHeader";

export function ServicePillars() {
  return (
    <section className="section-padding">
      <div className="container-shell">
        <SectionHeader
          badge="Domaines d'intervention"
          title="Un accompagnement IA de bout en bout, sans réduire l'IA à un chatbot."
          description="Chaque pilier traite une décision concrète : quoi lancer, qui former, quoi développer, quelles données protéger, quels usages mesurer."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
