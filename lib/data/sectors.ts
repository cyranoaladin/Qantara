export type Sector = {
  name: string;
  priority: string;
  metric: string;
  guardrail: string;
  useCases: string[];
};

export const sectors: Sector[] = [
  {
    name: "Éducation",
    priority:
      "Préserver l'exigence pédagogique tout en donnant aux enseignants un cadre d'usage clair.",
    metric: "Temps de préparation, qualité des activités, adoption enseignants",
    guardrail: "Charte établissement et règles d'évaluation explicites.",
    useCases: [
      "Préparation de cours",
      "Différenciation pédagogique",
      "Activités IA/NSI",
      "Charte IA établissement",
    ],
  },
  {
    name: "PME de services",
    priority:
      "Réduire le temps perdu dans la recherche, la réponse client et la production administrative.",
    metric: "Temps gagné, délai de réponse, taux de reprise humaine",
    guardrail: "Validation avant envoi et séparation données internes/publiques.",
    useCases: [
      "Assistant documentaire",
      "Automatisation des réponses",
      "Reporting",
      "Génération de devis",
    ],
  },
  {
    name: "Cabinets comptables",
    priority:
      "Accélérer la préparation documentaire sans affaiblir les contrôles professionnels.",
    metric: "Temps de synthèse, demandes classées, erreurs évitées",
    guardrail: "Traçabilité des sources et contrôle humain obligatoire.",
    useCases: [
      "Synthèse de dossiers",
      "Classement de demandes",
      "Préparation de rapports",
      "Contrôle humain systématique",
    ],
  },
  {
    name: "Cabinets juridiques",
    priority:
      "Synthétiser et retrouver l'information interne avec une confidentialité renforcée.",
    metric: "Temps de recherche, qualité des brouillons, sources citées",
    guardrail: "Aucune décision juridique automatisée sans validation qualifiée.",
    useCases: [
      "Résumé de dossiers",
      "Recherche documentaire interne",
      "Génération de brouillons",
      "Confidentialité stricte",
    ],
  },
  {
    name: "Tourisme & hôtellerie",
    priority:
      "Améliorer la réactivité multilingue et l'analyse des retours sans standardiser l'expérience client.",
    metric: "Délai de réponse, satisfaction, avis traités",
    guardrail: "Ton de marque validé et escalade humaine pour les cas sensibles.",
    useCases: [
      "Assistant multilingue",
      "Analyse d'avis",
      "Réponses client",
      "Contenus marketing",
    ],
  },
  {
    name: "Centres de formation",
    priority:
      "Personnaliser les parcours et alléger l'administration sans dégrader le suivi pédagogique.",
    metric: "Taux de complétion, supports produits, demandes traitées",
    guardrail: "Validation pédagogique et données apprenants limitées.",
    useCases: [
      "Parcours personnalisés",
      "Supports pédagogiques",
      "Évaluation formative",
      "Administration automatisée",
    ],
  },
  {
    name: "Associations & ONG",
    priority:
      "Structurer les réponses, les synthèses terrain et les rapports avec des moyens limités.",
    metric: "Dossiers traités, temps reporting, demandes orientées",
    guardrail: "Protection des bénéficiaires et minimisation des données.",
    useCases: [
      "Réponses aux bénéficiaires",
      "Synthèse de terrain",
      "Recherche de financements",
      "Reporting projet",
    ],
  },
  {
    name: "Industrie",
    priority:
      "Rendre les procédures et connaissances terrain plus accessibles aux équipes opérationnelles.",
    metric: "Temps d'accès procédure, incidents documentés, qualité",
    guardrail: "Procédures critiques validées par responsables métier.",
    useCases: [
      "Maintenance documentaire",
      "Analyse qualité",
      "Procédures assistées",
      "Tableaux de bord",
    ],
  },
  {
    name: "Ressources humaines",
    priority:
      "Améliorer l'onboarding, la formation et les réponses internes sans automatiser les décisions sensibles.",
    metric: "Temps onboarding, demandes RH résolues, parcours créés",
    guardrail: "Pas de décision RH automatisée sans revue humaine.",
    useCases: [
      "Tri assisté de candidatures",
      "FAQ interne",
      "Onboarding",
      "Analyse de besoins formation",
    ],
  },
  {
    name: "Marketing & communication",
    priority:
      "Accélérer la production éditoriale tout en gardant stratégie, ton et validation de marque.",
    metric: "Cycles de production, cohérence éditoriale, contenus validés",
    guardrail: "Sources vérifiées et validation avant publication.",
    useCases: [
      "Production éditoriale encadrée",
      "Analyse de marché",
      "Personas",
      "Calendriers de contenu",
    ],
  },
];
