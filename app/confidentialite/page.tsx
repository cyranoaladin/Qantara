import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { createMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Politique de confidentialité | Qantara AI",
  description:
    "Politique initiale de confidentialité Qantara AI : données collectées, finalités, conservation, droits et contact.",
  path: "/confidentialite",
});

const sections = [
  {
    title: "Données collectées",
    content:
      "Les formulaires peuvent collecter nom, email, téléphone optionnel, organisation, rôle, message, secteur, type d'organisation, taille d'équipe, outils actuels, cas d'usage visés, calendrier et budget indicatif optionnel.",
  },
  {
    title: "Finalités",
    content:
      "Ces données servent à répondre aux demandes de contact, cadrer un diagnostic IA, envoyer une ressource demandée, suivre les échanges entrants et améliorer la qualité du traitement commercial ou pédagogique.",
  },
  {
    title: "Conservation",
    content:
      "La durée de conservation opérationnelle recommandée en V1 est de 24 mois maximum après le dernier échange pour les demandes contact et diagnostic. Les inscriptions newsletter sont conservées jusqu'à désinscription ou demande de suppression. Ces durées devront être validées avant production commerciale.",
  },
  {
    title: "Données sensibles",
    content:
      "Les formulaires publics ne doivent pas recevoir de données sensibles, documents confidentiels, données de santé, données financières détaillées ou secrets métier. Toute mission impliquant ce type de données doit faire l'objet d'un cadrage spécifique.",
  },
  {
    title: "Sous-traitants techniques",
    content:
      "Selon la configuration de production, Qantara AI peut utiliser un hébergeur web, une base PostgreSQL managée et un service d'email transactionnel. Les fournisseurs exacts doivent être confirmés au moment du déploiement.",
  },
  {
    title: "Droits",
    content:
      "Vous pouvez demander l'accès, la rectification, l'export ou la suppression de vos données. Une vérification d'identité proportionnée peut être demandée avant traitement.",
  },
] as const;

export default function ConfidentialitePage() {
  return (
    <>
      <PageHero
        eyebrow="Confidentialité"
        title="Politique initiale de confidentialité"
        description="Cadre V1 pour les données transmises via les formulaires Qantara AI. Cette politique devra être validée juridiquement avant production commerciale."
      />
      <section className="section-padding">
        <div className="container-shell max-w-3xl text-sm leading-7 text-muted-foreground">
          <p>
            Qantara AI collecte uniquement les informations transmises volontairement via
            ses formulaires afin de traiter les demandes entrantes. Les données ne sont
            pas vendues.
          </p>

          <div className="mt-8 grid gap-6">
            {sections.map((section) => (
              <article className="border-t border-border pt-5" key={section.title}>
                <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
                <p className="mt-2">{section.content}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-border bg-card/60 p-5">
            <h2 className="text-lg font-semibold text-foreground">Contact</h2>
            <p className="mt-2">
              Pour une demande relative à vos données, écrivez à{" "}
              <a className="text-primary" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
