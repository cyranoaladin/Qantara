# Checklist Release

## Niveaux de Release

### Preview Technique

Code et CI valides, infrastructure production absente.

### Production Candidate

Code prêt, mais production bloquée tant que Vercel, PostgreSQL, secrets,
backups, monitoring et privacy ne sont pas configurés.

### Production Ready

Tous les services externes sont configurés, testés et documentés.

Le gate détaillé est dans [PRODUCTION_SETUP.md](PRODUCTION_SETUP.md).

## Avant Commit

- [ ] `pnpm install --frozen-lockfile`
- [ ] `pnpm prisma:generate`
- [ ] `pnpm audit:secrets`
- [ ] `pnpm format:check`
- [ ] `pnpm typecheck`
- [ ] `pnpm lint`
- [ ] `pnpm test`
- [ ] `pnpm test:integration`
- [ ] `pnpm build`
- [ ] `pnpm test:e2e`
- [ ] `git diff --check`
- [ ] scan secrets exécuté
- [ ] aucun `.env` réel suivi
- [ ] aucun fichier `.next`, `node_modules`, coverage ou Playwright report suivi

## Avant Push

- [ ] Remote GitHub correct
- [ ] Branche de travail dédiée, pas de push direct sur `main`
- [ ] Liste des fichiers staged revue
- [ ] Commit message clair

## Avant Merge

- [ ] CI passée
- [ ] Security workflow passé
- [ ] Revue code faite
- [ ] Pas de faux client, faux témoignage ou certification non prouvée
- [ ] Impact DB documenté
- [ ] Impact sécurité documenté

## Avant Production

- [ ] Gate production relu : `docs/PRODUCTION_SETUP.md`
- [ ] Variables Vercel configurées
- [ ] Environnements GitHub `preview` et `production` créés si un workflow de déploiement les utilise
- [ ] Base PostgreSQL production créée
- [ ] Sauvegarde base activée
- [ ] `pnpm prisma:deploy` exécuté contre la bonne base
- [ ] `NEXT_PUBLIC_SITE_URL` pointe vers le domaine final
- [ ] `ADMIN_TOKEN` robuste et stocké en secret
- [ ] Resend configuré ou explicitement désactivé
- [ ] `RESEND_FROM_EMAIL` configuré si Resend est activé
- [ ] Logs et monitoring vérifiés
- [ ] Protection de branche GitHub activée
- [ ] Politique de conservation des données validée
- [ ] Restauration PostgreSQL testée
- [ ] Politique de sauvegarde appliquée : voir `docs/BACKUP_POLICY.md`
- [ ] PR Dependabot restantes triées ou planifiées
- [ ] Auth admin V1 acceptée explicitement ou remplacée par Auth.js/SSO
- [ ] Issues production-readiness restantes fermées ou reportées avec propriétaire

## Issues Externes À Fermer Avant Production Candidate

- [ ] #9 Configure Vercel environments and production secrets
- [ ] #10 Configure production PostgreSQL backups and restore test
- [ ] #11 Replace admin token V1 with Auth.js or SSO
- [ ] #12 Set up monitoring and alerting
- [x] #13 Review and merge remaining Dependabot PRs
- [ ] #14 Validate data retention and privacy policy before production
