export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "pme-ne-pas-commencer-par-chatbot-ia",
    title: "Pourquoi une PME ne doit pas commencer par un chatbot IA",
    description:
      "Un chatbot peut être utile, mais il arrive souvent trop tôt. La valeur se trouve d'abord dans les processus, les données et les irritants métier.",
    date: "2026-07-02",
    readingTime: "5 min",
    tags: ["PME", "Stratégie IA", "Automatisation"],
    content: [
      "Le chatbot est devenu le symbole visible de l'intelligence artificielle en entreprise. Pourtant, pour une PME, commencer par un chatbot externe est rarement le meilleur point d'entrée.",
      "La priorité consiste d'abord à cartographier les tâches répétitives, les documents utilisés chaque jour, les décisions fréquentes et les points de friction dans les équipes.",
      "Un assistant interne, une automatisation de reporting ou une meilleure recherche documentaire peuvent produire une valeur plus rapide, plus mesurable et plus sûre qu'une interface conversationnelle publique.",
      "La bonne question n'est donc pas : quel chatbot installer ? Elle est : quel problème métier mérite d'être traité, avec quelles données, quels contrôles et quelle mesure d'impact ?",
    ],
  },
  {
    slug: "former-enseignants-ia-methode-limites-bonnes-pratiques",
    title: "Former les enseignants à l'IA : méthode, limites et bonnes pratiques",
    description:
      "Former à l'IA en éducation demande de combiner culture technique, pédagogie, esprit critique et règles d'usage explicites.",
    date: "2026-07-02",
    readingTime: "6 min",
    tags: ["Éducation", "Formation", "IA responsable"],
    content: [
      "Former les enseignants à l'IA ne consiste pas à présenter une liste d'outils. Il faut créer une compréhension opérationnelle : ce que les modèles savent faire, ce qu'ils ne savent pas faire et ce qu'ils produisent sous incertitude.",
      "Une formation utile part des situations pédagogiques réelles : préparation, différenciation, évaluation formative, activités interdisciplinaires, accompagnement des élèves et intégrité académique.",
      "Les limites doivent être nommées clairement : hallucinations, biais, dépendance excessive, confidentialité des données, traçabilité et rôle de la validation humaine.",
      "Une charte établissement permet ensuite de transformer la formation en cadre partagé : usages autorisés, usages interdits, règles de citation, données à ne jamais soumettre et responsabilités.",
    ],
  },
  {
    slug: "rag-agents-ia-automatisation-comprendre-differences",
    title: "RAG, agents IA, automatisation : comprendre les différences",
    description:
      "Ces termes sont souvent mélangés. Les distinguer aide à choisir une architecture fiable et adaptée au besoin réel.",
    date: "2026-07-02",
    readingTime: "7 min",
    tags: ["RAG", "Agents IA", "Développement"],
    content: [
      "Le RAG consiste à connecter un modèle IA à une base documentaire afin qu'il réponde à partir de sources contrôlées. Il est utile pour la recherche interne, les procédures, les FAQ complexes et les assistants documentaires.",
      "Un agent IA va plus loin : il planifie ou exécute une séquence d'actions avec des outils. Il doit donc être conçu avec des permissions, des garde-fous, des journaux et une validation humaine pour les actions sensibles.",
      "L'automatisation relie des systèmes : CRM, ERP, emails, tableurs, bases de données, formulaires ou outils métier. L'IA peut y intervenir pour classer, résumer, générer ou décider sous supervision.",
      "Une bonne architecture ne choisit pas le terme le plus tendance. Elle choisit le niveau d'autonomie strictement nécessaire au problème, puis ajoute mesure, tests et gouvernance.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
