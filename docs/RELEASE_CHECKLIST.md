# Checklist Release

## Avant Commit

- [ ] `pnpm install --frozen-lockfile`
- [ ] `pnpm prisma:generate`
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
- [ ] Branche `main`
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

- [ ] Variables Vercel configurées
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
