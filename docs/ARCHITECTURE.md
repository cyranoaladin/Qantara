# Architecture

## Routes

- `/` : landing page complète.
- `/services` : piliers conseil, formation, studio, gouvernance, éducation, lab.
- `/formations` : Qantara AI Academy.
- `/studio` : assistants IA, RAG, agents, automatisation.
- `/gouvernance` : chartes, confidentialité, sécurité, risques.
- `/education` : offres écoles, enseignants, élèves, universités.
- `/diagnostic-ia` : formulaire diagnostic IA.
- `/ressources` : ressources et lead magnets.
- `/blog` et `/blog/[slug]` : articles statiques locaux.
- `/cas-usages` : cas d'usage types par secteur.
- `/contact` : formulaire contact.
- `/admin` : espace admin protégé.
- `/mentions-legales` et `/confidentialite` : pages légales.

## Données Produit

Les contenus structurés sont dans `lib/data`. Les pages et sections consomment ces
données pour limiter la duplication et faciliter les évolutions futures.

## Validation Et Actions

Les schémas Zod sont dans `lib/validators`. Les Server Actions sont dans
`lib/actions` :

- `submitContact`;
- `submitDiagnostic`;
- `submitNewsletter`.

Chaque action valide avant toute écriture base, puis déclenche Resend seulement si
la clé API est disponible.

La logique métier testable est dans `lib/services` :

- `submitContactData`;
- `submitDiagnosticData`;
- `submitNewsletterData`.

Ces services sont couverts par des tests d'intégration PostgreSQL.

## Prisma

Le client Prisma est généré dans `app/generated/prisma`, ignoré par Git.
`lib/db.ts` instancie Prisma avec `@prisma/adapter-pg` et exige
`DATABASE_URL`.

Modèles :

- `Lead`;
- `ContactMessage`;
- `DiagnosticRequest`;
- `NewsletterSubscriber`;
- `ResourceDownload`;
- `AdminUser`.

## Admin

L'admin est rendu côté serveur. Les données ne sont pas exposées via API client.
La protection V1 repose sur `ADMIN_TOKEN` et un cookie httpOnly contenant un hash.

## SEO

`lib/seo.ts` centralise :

- `siteConfig`;
- canonical URLs ;
- metadata ;
- Organization / ProfessionalService JSON-LD ;
- FAQPage JSON-LD.

`app/sitemap.ts` et `app/robots.ts` couvrent les routes publiques et excluent
`/admin`.
