export type Service = {
  title: string;
  shortTitle: string;
  href: string;
  icon: "strategy" | "academy" | "studio" | "governance" | "education" | "lab";
  description: string;
  businessOutcome: string;
  riskHandled: string;
  engagement: string;
  problem: string;
  approach: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    title: "Qantara AI Consulting",
    shortTitle: "Conseil IA",
    href: "/services",
    icon: "strategy",
    description:
      "Transformer une intention IA en portefeuille de cas d'usage priorisés, budgétés et gouvernables.",
    businessOutcome:
      "Une direction sait quoi lancer, quoi différer, quelles données mobiliser et quels risques traiter avant investissement.",
    riskHandled:
      "Dispersion des initiatives, achats d'outils sans cadrage, pilotes non mesurés et confusion entre expérimentation et déploiement.",
    engagement:
      "Diagnostic court, audit 360 ou feuille de route exécutive sur 30 à 90 jours.",
    problem:
      "Les initiatives IA restent souvent dispersées, sans arbitrage clair entre valeur, faisabilité et risques.",
    approach:
      "Nous cadrons les objectifs métier, analysons les données disponibles et construisons une roadmap réaliste.",
    deliverables: [
      "Diagnostic IA",
      "Matrice impact/effort",
      "Roadmap 90 jours",
      "Recommandations outils et gouvernance",
    ],
  },
  {
    title: "Qantara AI Academy",
    shortTitle: "Formations IA",
    href: "/formations",
    icon: "academy",
    description:
      "Former les équipes à utiliser l'IA avec méthode, esprit critique et règles communes.",
    businessOutcome:
      "Les équipes gagnent en autonomie sans multiplier les pratiques risquées ou dépendre de quelques utilisateurs isolés.",
    riskHandled:
      "Prompts copiés sans contrôle, données envoyées dans les mauvais outils, adoption inégale et attentes irréalistes.",
    engagement:
      "Ateliers ciblés, parcours entreprise ou programmes pédagogiques par niveau.",
    problem:
      "Les équipes utilisent l'IA sans repères communs, avec des niveaux très variables et des risques mal compris.",
    approach:
      "Nous construisons des parcours progressifs, pratiques et adaptés au contexte de l'organisation.",
    deliverables: [
      "Ateliers pratiques",
      "Supports pédagogiques",
      "Cas d'usage métier",
      "Évaluation et plan de progression",
    ],
  },
  {
    title: "Qantara AI Studio",
    shortTitle: "Studio IA",
    href: "/studio",
    icon: "studio",
    description:
      "Concevoir des assistants, RAG, agents et automatisations reliés aux documents et aux processus réels.",
    businessOutcome:
      "Un prototype devient un outil testable par les équipes, documenté, observé et prêt à évoluer vers la production.",
    riskHandled:
      "Démos séduisantes mais inutilisables, agents trop autonomes, absence de logs, maintenance floue et données mal préparées.",
    engagement:
      "Prototype cadré, intégration métier ou automatisation avec validation humaine.",
    problem:
      "Les prototypes IA restent isolés des processus, des outils internes et de la maintenance logicielle.",
    approach:
      "Nous concevons des solutions testables, documentées, mesurables et intégrées au système d'information.",
    deliverables: [
      "Prototype fonctionnel",
      "Assistant documentaire",
      "Automatisations métier",
      "Documentation et formation utilisateur",
    ],
  },
  {
    title: "Qantara AI Governance",
    shortTitle: "Gouvernance IA",
    href: "/gouvernance",
    icon: "governance",
    description:
      "Définir les règles d'usage, la confidentialité, les validations humaines et les responsabilités.",
    businessOutcome:
      "L'organisation dispose d'un cadre clair pour autoriser, limiter ou interdire les usages selon les données et les métiers.",
    riskHandled:
      "Exposition de données sensibles, décisions opaques, absence de responsabilité et usages non conformes aux règles internes.",
    engagement:
      "Charte IA, registre d'usages, classification des données et formation associée.",
    problem:
      "Les données sensibles et les décisions assistées par IA nécessitent un cadre clair et vérifiable.",
    approach:
      "Nous formalisons les règles, les responsabilités, la classification des données et les circuits de validation.",
    deliverables: [
      "Charte IA",
      "Registre des usages",
      "Règles de confidentialité",
      "Plan de sensibilisation",
    ],
  },
  {
    title: "Qantara AI Education",
    shortTitle: "Éducation IA",
    href: "/education",
    icon: "education",
    description:
      "Accompagner les établissements dans des usages IA exigeants, pédagogiques et explicites.",
    businessOutcome:
      "La communauté éducative partage des règles compréhensibles et des activités qui renforcent les apprentissages.",
    riskHandled:
      "Usage passif par les élèves, perte d'exigence, flou sur l'évaluation et absence de cadre établissement.",
    engagement:
      "Formation enseignants, ateliers élèves, charte établissement ou projets IA / Maths / NSI.",
    problem:
      "Les établissements doivent intégrer l'IA sans céder aux effets de mode ni affaiblir les apprentissages.",
    approach:
      "Nous articulons pédagogie, mathématiques, NSI, usages responsables et projets concrets.",
    deliverables: [
      "Formations enseignants",
      "Ateliers élèves",
      "Charte établissement",
      "Projets IA / Maths / NSI",
    ],
  },
  {
    title: "Qantara AI Lab",
    shortTitle: "Lab IA",
    href: "/ressources",
    icon: "lab",
    description:
      "Explorer les usages émergents sans confondre veille, prototype et produit exploitable.",
    businessOutcome:
      "Les idées prometteuses sont testées rapidement avec critères d'arrêt, critères de succès et trajectoire produit.",
    riskHandled:
      "Innovation dispersée, dépendance à des outils instables, prototypes non maintenus et absence de décision go/no-go.",
    engagement:
      "Exploration courte, preuve de concept ou cadrage produit SaaS avant investissement.",
    problem:
      "L'innovation IA demande un espace d'expérimentation rigoureux avant industrialisation.",
    approach:
      "Nous transformons les hypothèses en prototypes mesurables, avec une veille active sur les modèles et outils.",
    deliverables: [
      "Proof of concept",
      "Veille stratégique",
      "Exploration produits SaaS",
      "Rapports d'expérimentation",
    ],
  },
];
