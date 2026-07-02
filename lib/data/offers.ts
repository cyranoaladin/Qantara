export type Offer = {
  name: string;
  type: string;
  promise: string;
  scope: string;
  bestFor: string;
  decisionOutputs: string[];
  audience?: string;
  deliverables?: string[];
  cta: string;
};

export const offers: Offer[] = [
  {
    name: "Déclic IA",
    type: "Formation courte",
    promise:
      "Installer un socle commun : usages utiles, limites, confidentialité et premiers scénarios métier.",
    scope:
      "Session courte avec démonstrations guidées, exercices contextualisés et règles d'usage immédiatement applicables.",
    bestFor:
      "Organisations qui ont déjà des usages informels de l'IA mais pas encore de langage commun.",
    decisionOutputs: [
      "Liste de premiers usages raisonnables",
      "Règles de prudence à diffuser",
      "Mini-plan d'action par équipe",
    ],
    audience: "Dirigeants, enseignants, équipes administratives, indépendants.",
    deliverables: ["Atelier pratique", "Supports", "Cas d'usage", "Mini-plan d'action"],
    cta: "Planifier un atelier",
  },
  {
    name: "Audit IA 360",
    type: "Conseil stratégique",
    promise:
      "Arbitrer les cas d'usage à lancer selon valeur métier, données, risques, effort et capacité interne.",
    scope:
      "Entretiens, cartographie des processus, matrice impact/effort, analyse risques et feuille de route 90 jours.",
    bestFor:
      "Directions qui veulent décider avant d'acheter des outils ou de financer un prototype.",
    decisionOutputs: [
      "Cas d'usage priorisés",
      "Risques et dépendances",
      "Budget indicatif",
      "Roadmap 90 jours",
    ],
    deliverables: [
      "Diagnostic",
      "Matrice impact/effort",
      "Roadmap 90 jours",
      "Risques",
      "Budget indicatif",
    ],
    cta: "Demander un audit",
  },
  {
    name: "Copilot Métier",
    type: "Prototype IA",
    promise:
      "Tester un assistant documentaire ou métier sur un périmètre maîtrisé avant généralisation.",
    scope:
      "Cadrage du corpus, prototype RAG ou assistant métier, tests utilisateurs, guide d'usage et formation courte.",
    bestFor:
      "Équipes qui perdent du temps dans la recherche, la synthèse ou la réutilisation de documents internes.",
    decisionOutputs: [
      "Prototype testable",
      "Critères de qualité",
      "Décision go/no-go",
      "Plan de durcissement",
    ],
    deliverables: [
      "Prototype fonctionnel",
      "Base documentaire",
      "Guide utilisateur",
      "Formation",
    ],
    cta: "Créer un prototype",
  },
  {
    name: "Agent IA Opérationnel",
    type: "Automatisation avancée",
    promise:
      "Automatiser une chaîne de tâches avec logs, validation humaine et limites d'autonomie explicites.",
    scope:
      "Analyse du workflow, intégrations outils, garde-fous, journalisation, tests et documentation d'exploitation.",
    bestFor:
      "Processus répétitifs où l'IA assiste la préparation, le classement, la synthèse ou la réponse.",
    decisionOutputs: [
      "Workflow cible",
      "Points de validation",
      "Journal d'exécution",
      "Plan de maintenance",
    ],
    deliverables: ["Agent", "Intégrations", "Logs", "Tests", "Documentation"],
    cta: "Étudier un cas d'usage",
  },
  {
    name: "AI Academy Entreprise",
    type: "Programme de formation",
    promise:
      "Construire une progression IA durable par profils, métiers et niveau de responsabilité.",
    scope:
      "Parcours modulaire, ateliers métier, supports, exercices, évaluations et accompagnement des référents internes.",
    bestFor:
      "Entreprises, institutions ou établissements qui veulent former au-delà d'une sensibilisation ponctuelle.",
    decisionOutputs: [
      "Parcours par niveau",
      "Référentiel de compétences",
      "Mesure d'adoption",
    ],
    cta: "Construire un programme",
  },
  {
    name: "Gouvernance IA",
    type: "Sécurité & conformité",
    promise:
      "Encadrer les usages IA avec une charte, une classification des données et des règles de validation.",
    scope:
      "Ateliers de cadrage, registre d'usages, règles de confidentialité, charte IA et sensibilisation des équipes.",
    bestFor:
      "Organisations qui manipulent des données internes, personnelles ou sensibles avec des outils IA.",
    decisionOutputs: [
      "Charte IA",
      "Registre des usages",
      "Règles par type de données",
      "Circuit de validation",
    ],
    cta: "Sécuriser les usages IA",
  },
];
