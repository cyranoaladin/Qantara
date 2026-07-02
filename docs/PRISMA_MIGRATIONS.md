# Migrations Prisma

Le client Prisma généré dans `app/generated/prisma` n'est pas versionné.
Les migrations SQL dans `prisma/migrations` sont versionnées et doivent être
appliquées avec `pnpm prisma:deploy`.

## Local

```bash
createdb qantara_ai
cp .env.example .env.local
pnpm prisma:generate
pnpm prisma:migrate
```

## CI

Le job `PostgreSQL integration` démarre PostgreSQL, applique :

```bash
pnpm prisma:deploy
```

puis exécute :

```bash
pnpm test:integration
```

## Production

Ne jamais lancer une migration contre une base inconnue. Avant production :

1. Sauvegarder la base.
2. Vérifier `DATABASE_URL`.
3. Lancer `pnpm prisma:deploy`.
4. Vérifier l'admin et les formulaires.
5. Conserver les logs de migration.
