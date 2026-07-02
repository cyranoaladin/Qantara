# Déploiement

## Cible Recommandée

Vercel pour l'application Next.js et une base PostgreSQL managée pour Prisma.
Le projet ne contient pas de workflow de production automatique tant que les
secrets Vercel et la base de production ne sont pas configurés.

## Variables Vercel

Configurer par environnement :

- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_TOKEN`
- `INTERNAL_CONTACT_EMAIL`
- `RESEND_API_KEY` si les emails sont activés

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
pnpm build
```

Appliquer les migrations uniquement contre la base cible validée :

```bash
pnpm prisma:deploy
```

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

## Branches

- `main` = branche stable.
- Pull request obligatoire.
- Status checks CI et Security requis.
- Blocage des force pushes.
- Résolution des conversations obligatoire.
