# Qantara AI

Plateforme web full-stack pour Qantara AI : conseil, formation, développement,
déploiement et gouvernance de solutions d'intelligence artificielle pour les
organisations tunisiennes et francophones.

Le projet est une V1 professionnelle prête pour développement et preview
technique : Next.js App Router, formulaires serveur, Prisma/PostgreSQL, SEO,
admin minimal, tests, CI GitHub Actions et documentation de release.

## Statut

Le dépôt est prêt pour développement et preview technique. Il n'est pas encore
prêt pour production commerciale tant que les éléments suivants ne sont pas
configurés ou validés :

- base PostgreSQL production ;
- migrations appliquées sur l'environnement cible ;
- secrets Vercel ;
- protection GitHub `main` ;
- politique de conservation des données validée ;
- stratégie d'auth admin durable ;
- monitoring, sauvegardes et procédure incident.

## Stack

- Next.js App Router, React 19, TypeScript strict
- Tailwind CSS 4, composants UI locaux inspirés de shadcn/ui
- Prisma 7, `@prisma/adapter-pg`, PostgreSQL
- Zod pour la validation serveur
- Server Actions pour contact, diagnostic IA et newsletter
- Resend optionnel pour les notifications email
- Vitest pour les tests unitaires et de contenu
- Playwright pour les tests E2E et responsive
- ESLint, Prettier, pnpm

## Prérequis

- Node.js 22
- pnpm 10 via Corepack
- PostgreSQL pour les écritures formulaire et l'admin

```bash
corepack enable
pnpm install
```

## Variables D'Environnement

Copier `.env.example` vers un fichier local non versionné. Pour le développement
Next.js, `.env.local` est recommandé. Les commandes Prisma lisent aussi
`.env.local`, puis `.env` si nécessaire.

```bash
cp .env.example .env.local
```

Variables attendues :

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/qantara_ai"
RESEND_API_KEY=""
RESEND_FROM_EMAIL="Qantara AI <contact@qantara-ai.com>"
INTERNAL_CONTACT_EMAIL="contact@qantara-ai.com"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
ADMIN_TOKEN="change-me"
NODE_ENV="development"
```

Ne jamais committer `.env`, `.env.local`, `.env.production` ou un fichier contenant
des secrets réels. `ADMIN_TOKEN` doit être long, unique et différent de
`change-me` en production.

## Base De Données

Le schéma est dans `prisma/schema.prisma`. Le client généré est placé dans
`app/generated/prisma` et n'est pas versionné ; il est généré en local et en CI.

```bash
createdb qantara_ai
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:seed
```

Si aucune base locale n'est disponible, `pnpm prisma:generate` reste possible avec
une `DATABASE_URL` factice. Ne lancez pas de migration contre une base non
maîtrisée.

Migrations : voir [docs/PRISMA_MIGRATIONS.md](docs/PRISMA_MIGRATIONS.md).

## Commandes

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm typecheck
pnpm format
pnpm format:check
pnpm test
pnpm test:integration
pnpm test:watch
pnpm test:coverage
pnpm test:e2e
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:deploy
pnpm prisma:studio
pnpm prisma:seed
pnpm ci
pnpm check
```

`pnpm ci` exécute génération Prisma, typecheck, lint, tests unitaires et build.
`pnpm check` ajoute le contrôle Prettier.

## Tests

Les tests Vitest couvrent :

- validateurs Zod et sécurité des formulaires ;
- normalisation email, trim, consentement et honeypot ;
- score de maturité diagnostic IA ;
- contenu produit sans faux clients, faux témoignages ou promesses non prouvées ;
- assets de marque officiels ;
- SEO, JSON-LD et routes sitemap.

Les tests Playwright couvrent :

- page d'accueil et sections clés ;
- absence d'overflow horizontal mobile, tablette et desktop ;
- logo desktop, symbole mobile et favicon officiel ;
- routes publiques principales ;
- erreurs de validation du formulaire contact sans écriture base.

Les tests d'intégration PostgreSQL couvrent les écritures réelles des formulaires
contact, diagnostic et newsletter sur une base de test.

Installer les navigateurs si nécessaire :

```bash
pnpm exec playwright install --with-deps chromium
pnpm test:e2e
```

## CI/CD

Workflows GitHub Actions :

- `.github/workflows/ci.yml` : install frozen lockfile, Prisma generate,
  typecheck, lint, format check, tests unitaires, build, Playwright Chromium et
  tests d'intégration PostgreSQL.
- `.github/workflows/security.yml` : audit dépendances, vérification des fichiers
  `.env` suivis et scan de secrets concrets.

La CI qualité utilise uniquement des variables factices. Aucun secret GitHub n'est
nécessaire pour valider une pull request.

Déploiement Vercel : voir [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Sécurité

- Validation serveur obligatoire via Zod.
- Honeypot anti-spam sur les formulaires.
- Consentement explicite obligatoire.
- Resend côté serveur uniquement.
- `DATABASE_URL`, `ADMIN_TOKEN` et `RESEND_API_KEY` ne doivent jamais être
  exposés en `NEXT_PUBLIC_`.
- Admin protégé par token V1, cookie httpOnly, `sameSite=lax`, `secure` en
  production.
- `/admin` est noindex et bloqué par `robots.ts`.
- Pas de logs de données personnelles en production.

Voir [docs/SECURITY.md](docs/SECURITY.md).
Voir aussi [docs/ADMIN_SECURITY.md](docs/ADMIN_SECURITY.md),
[docs/DATA_PROTECTION.md](docs/DATA_PROTECTION.md) et
[docs/OBSERVABILITY.md](docs/OBSERVABILITY.md).

## Admin

`/admin` est volontairement minimal pour la V1 :

- authentification par `ADMIN_TOKEN` ;
- cookie contenant uniquement le hash SHA-256 du token ;
- données chargées côté serveur ;
- aucun fetch admin côté client ;
- tableaux des leads, contacts, diagnostics et inscriptions newsletter.

Prochaine étape recommandée : Auth.js, SSO ou authentification métier avec
rotation de session et gestion multi-utilisateur.

## Architecture

```text
app/                 Routes App Router, metadata, sitemap, robots
components/layout/   Header, navigation mobile, footer
components/sections/ Sections landing et pages internes
components/forms/    Formulaires client + Server Actions
components/cards/    Cards services, offres, secteurs, métriques
components/admin/    Dashboard admin serveur
components/ui/       Primitives UI locales
components/visual/   Visuels CSS/SVG internes
lib/actions/         Server Actions
lib/data/            Contenus structurés
lib/validators/      Schémas Zod
lib/db.ts            Client Prisma PostgreSQL
lib/email.ts         Notifications Resend optionnelles
lib/seo.ts           Metadata et JSON-LD
prisma/              Schema et seed
tests/               Vitest et Playwright
docs/                Documentation d'exploitation
```

Voir [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Brand Kit

Les fichiers officiels sont dans `public/brand` et la source de référence est
dans `docs/qantara_ai_brand_kit`.

- Header desktop : `qantara-ai-logo-primary.svg`
- Header mobile : `qantara-ai-mark.svg`
- Footer : `qantara-ai-logo-monochrome.svg`
- Favicon : `qantara-ai-favicon.svg`

Voir [docs/BRAND.md](docs/BRAND.md).

## Contribution

Stratégie recommandée :

- `main` reste stable ;
- toute modification passe par pull request ;
- CI obligatoire avant merge ;
- protection de branche : status checks requis, PR requise, force push bloqué,
  conversations résolues ;
- production déclenchée uniquement depuis `main`.

Configuration recommandée : [docs/GITHUB_PROTECTION.md](docs/GITHUB_PROTECTION.md).
Triage Dependabot : [docs/DEPENDABOT_TRIAGE.md](docs/DEPENDABOT_TRIAGE.md).

La règle ESLint `react/no-unescaped-entities` est désactivée pour éviter le bruit
sur les textes français riches en apostrophes. Les contenus restent relus via
tests produit et revue.

## Première Mise En Production

1. Configurer PostgreSQL production.
2. Configurer les variables Vercel.
3. Remplacer `ADMIN_TOKEN` par une valeur robuste.
4. Lancer `pnpm prisma:deploy` sur l'environnement cible.
5. Vérifier `NEXT_PUBLIC_SITE_URL` avec le domaine final.
6. Lancer une passe QA : [docs/QA.md](docs/QA.md).
7. Activer la protection de branche GitHub.
8. Configurer monitoring et alerting minimal.

Checklist détaillée : [docs/RELEASE_CHECKLIST.md](docs/RELEASE_CHECKLIST.md).
