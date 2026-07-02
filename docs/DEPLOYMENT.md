# Déploiement

## Cible Recommandée

Vercel pour l'application Next.js et une base PostgreSQL managée pour Prisma.
Le projet ne contient pas de workflow de production automatique tant que les
secrets Vercel et la base de production ne sont pas configurés.

## Variables Vercel

Configurer par environnement :

- `DATABASE_URL`
- `DIRECT_URL` si le fournisseur PostgreSQL/Prisma l'exige pour les migrations
- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_TOKEN`
- `INTERNAL_CONTACT_EMAIL`
- `RESEND_API_KEY` si les emails sont activés
- `RESEND_FROM_EMAIL` si Resend est activé

Ne jamais utiliser de variable sensible préfixée `NEXT_PUBLIC_`.

## Preview

Stratégie recommandée :

- preview sur pull request ;
- pas de migration automatique sur une base de production ;
- base preview séparée si des tests DB réels sont nécessaires ;
- `NEXT_PUBLIC_SITE_URL` aligné avec l'URL preview.

## Production

Avant production :

```bash
pnpm install --frozen-lockfile
pnpm prisma:generate
pnpm typecheck
pnpm lint
pnpm test
pnpm test:integration
pnpm build
```

Appliquer les migrations uniquement contre la base cible validée :

```bash
pnpm prisma:deploy
```

Ordre de release recommandé :

1. Créer la base PostgreSQL production.
2. Configurer les variables Vercel preview et production.
3. Lancer une preview Vercel.
4. Exécuter `pnpm prisma:deploy` contre la base cible après sauvegarde.
5. Vérifier `/`, `/contact`, `/diagnostic-ia`, `/admin`.
6. Activer domaine final et `NEXT_PUBLIC_SITE_URL`.
7. Activer HSTS côté domaine/Vercel après validation HTTPS.

## Rollback

- Revenir au déploiement Vercel précédent.
- Ne jamais faire de rollback de base sans sauvegarde.
- Pour une migration destructive, préparer une procédure de restauration avant
  déploiement.

## Monitoring Minimal

- Logs Vercel pour erreurs serveur.
- Alertes sur erreurs formulaire et admin.
- Suivi des réponses Resend si l'email est activé.
- Sauvegardes PostgreSQL planifiées côté fournisseur.
- Uptime monitoring sur `/`, `/contact`, `/diagnostic-ia`.

Voir [OBSERVABILITY.md](OBSERVABILITY.md).

## Branches

- `main` = branche stable.
- Pull request obligatoire.
- Status checks CI et Security requis.
- Blocage des force pushes.
- Résolution des conversations obligatoire.
