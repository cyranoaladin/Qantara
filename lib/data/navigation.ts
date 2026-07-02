export const mainNavigation = [
  { label: "Services", href: "/services" },
  { label: "Formations", href: "/formations" },
  { label: "Studio IA", href: "/studio" },
  { label: "Gouvernance", href: "/gouvernance" },
  { label: "Éducation", href: "/education" },
  { label: "Ressources", href: "/ressources" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNavigation = {
  services: [
    { label: "Conseil IA", href: "/services" },
    { label: "Qantara AI Academy", href: "/formations" },
    { label: "Qantara AI Studio", href: "/studio" },
    { label: "Gouvernance IA", href: "/gouvernance" },
    { label: "Qantara AI Education", href: "/education" },
  ],
  resources: [
    { label: "Ressources", href: "/ressources" },
    { label: "Blog", href: "/blog" },
    { label: "Cas d'usage", href: "/cas-usages" },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Confidentialité", href: "/confidentialite" },
  ],
} as const;
