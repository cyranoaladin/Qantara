import { Card } from "@/components/ui/card";

import { SectionHeader } from "./SectionHeader";

const steps = [
  [
    "Comprendre",
    "Cartographier processus, données, outils déjà utilisés, contraintes et responsabilités.",
    "Diagnostic partagé",
  ],
  [
    "Prioriser",
    "Comparer impact, faisabilité, risques, effort d'intégration et capacité de maintenance.",
    "Matrice décisionnelle",
  ],
  [
    "Former",
    "Installer des pratiques communes pour dirigeants, référents, enseignants ou équipes métier.",
    "Référentiel d'usages",
  ],
  [
    "Déployer",
    "Construire assistants, RAG, agents ou automatisations avec garde-fous et validation humaine.",
    "Prototype contrôlé",
  ],
  [
    "Mesurer",
    "Suivre adoption, qualité des réponses, temps gagné, erreurs évitées et coût d'exploitation.",
    "Tableau de bord",
  ],
] as const;

export function MethodSection() {
  return (
    <section className="section-padding border-y border-border bg-card/24">
      <div className="container-shell">
        <SectionHeader
          badge="Méthode QANTARA-5"
          title="Un cadre d'adoption IA conçu pour décider, pas seulement expérimenter."
          description="Comprendre. Prioriser. Former. Déployer. Mesurer. Chaque étape produit un livrable exploitable par la direction et les équipes."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-5">
          {steps.map(([title, description, output], index) => (
            <Card
              className="relative p-5 hover:-translate-y-1 hover:border-primary/45"
              key={title}
            >
              <span className="text-sm font-semibold text-primary">0{index + 1}</span>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
              <p className="mt-5 rounded-md border border-border bg-white/[0.04] px-3 py-2 text-xs font-medium text-secondary">
                Livrable : {output}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
