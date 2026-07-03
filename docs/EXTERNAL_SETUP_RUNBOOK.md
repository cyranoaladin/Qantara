# Runbook De Configuration Externe

Ce runbook guide l'administrateur pour basculer de la preview technique vers des
environnements externes réels. Il ne crée aucun secret et ne remplace pas les
actions à effectuer dans Vercel, PostgreSQL, Resend ou l'outil de monitoring.

## 1. Préparation

1. Vérifier l'état de `main` :

   ```bash
   pnpm release:status
   ```

2. Vérifier que `main` est protégé et que les derniers runs CI/Security sont
   verts.
3. Vérifier qu'aucune pull request n'est ouverte.
4. Lire [PRODUCTION_SETUP.md](PRODUCTION_SETUP.md).
5. Ne jamais stocker de secrets dans Git, README, issues, captures d'écran ou
   tickets publics.

## 2. Créer Vercel Preview

1. Créer le projet Vercel depuis le repository GitHub.
2. Relier le repository `cyranoaladin/Qantara`.
3. Configurer l'environnement Preview.
4. Définir les variables preview dans Vercel, pas dans Git.
5. Utiliser une base PostgreSQL preview séparée.
6. Ne jamais utiliser la base production pour preview.
7. Vérifier que `NEXT_PUBLIC_SITE_URL` pointe vers l'URL preview.

## 3. Créer Vercel Production

1. Configurer l'environnement Production dans Vercel.
2. Configurer le domaine final.
3. Définir `NEXT_PUBLIC_SITE_URL` avec le domaine final.
4. Définir les secrets production uniquement dans Vercel.
5. Vérifier la séparation preview/production.
6. Vérifier qu'aucun secret n'est préfixé `NEXT_PUBLIC_`.

## 4. Configurer PostgreSQL

1. Créer une base preview.
2. Créer une base production distincte.
3. Vérifier SSL/TLS.
4. Vérifier les accès administrateur et applicatif.
5. Noter fournisseur, région, plan, responsable et URL de console dans un espace
   privé.
6. Activer les sauvegardes avant migration production.
7. Appliquer les migrations uniquement après backup/snapshot validé :

   ```bash
   pnpm prisma:deploy
   ```

## 5. Configurer Resend

1. Vérifier le domaine expéditeur dans Resend.
2. Configurer `RESEND_FROM_EMAIL`.
3. Configurer `INTERNAL_CONTACT_EMAIL`.
4. Tester une notification interne depuis preview.
5. Vérifier que les logs ne contiennent pas de données personnelles inutiles.
6. Documenter si Resend reste désactivé en preview.

## 6. Configurer Admin

1. Générer un token fort :

   ```bash
   openssl rand -base64 48
   ```

2. Stocker `ADMIN_TOKEN` dans Vercel.
3. Tester le login admin.
4. Vérifier le cookie : `httpOnly`, `sameSite`, `secure` en HTTPS production.
5. Vérifier la persistance de session.
6. Vérifier le logout.
7. Documenter la rotation du token.
8. Garder l'issue #11 ouverte tant qu'Auth.js, SSO ou IAM n'est pas implémenté.

## 7. Smoke Test Preview

- `/` répond en 200.
- `/services` répond en 200.
- `/diagnostic-ia` répond en 200.
- `/contact` répond en 200.
- `/confidentialite` répond en 200.
- Les formulaires affichent les erreurs de validation sans écriture en base.
- Un formulaire succès écrit dans la base preview.
- Une notification email part si Resend preview est actif.
- `/admin` non authentifié n'expose aucune donnée.
- `/admin` authentifié affiche les données preview.
- Logout admin puis accès refusé après déconnexion.

## 8. Smoke Test Production

- Refaire le smoke test preview sur le domaine final.
- Vérifier `NEXT_PUBLIC_SITE_URL`.
- Vérifier les headers de sécurité.
- Vérifier `robots.txt`.
- Vérifier `sitemap.xml`.
- Vérifier les logs Vercel.
- Vérifier que les backups production sont actifs.
- Vérifier qu'aucune donnée de test preview n'est présente en production.

## 9. Backups Et Restore

1. Activer les backups PostgreSQL.
2. Définir la rétention.
3. Tester une restauration dans une base isolée.
4. Documenter la preuve : date, responsable, base source, base cible, résultat.
5. Vérifier la procédure de suppression/anonymisation après restore.
6. Ne pas fermer #10 sans preuve de restauration.

## 10. Monitoring

- Configurer uptime sur `/`, `/contact`, `/diagnostic-ia`.
- Configurer alertes 5xx.
- Configurer alertes erreurs Prisma.
- Configurer alertes erreurs Resend si email actif.
- Surveiller erreurs formulaires.
- Surveiller accès admin.
- Définir le canal d'alerte : email, Slack ou autre outil retenu.
- Documenter rétention et filtrage des données personnelles.

## 11. Fermeture Des Issues

### #9 Configure Vercel Environments And Production Secrets

Preuves nécessaires :

- URL projet Vercel ;
- environnements preview et production configurés ;
- variables réelles saisies hors Git ;
- domaine et `NEXT_PUBLIC_SITE_URL` vérifiés ;
- confirmation qu'aucun secret n'est en `NEXT_PUBLIC_`.

### #10 Configure Production PostgreSQL Backups And Restore Test

Preuves nécessaires :

- fournisseur PostgreSQL choisi ;
- backups actifs ;
- restauration testée ;
- preuve de restauration documentée ;
- politique de sauvegarde alignée avec le fournisseur.

### #11 Replace Admin Token V1 With Auth.js Or SSO

Preuves nécessaires :

- Auth.js, SSO ou IAM en place ;
- sessions révocables ;
- journal d'accès admin ;
- rate limiting réel ;
- tests admin mis à jour.

### #12 Set Up Monitoring And Alerting

Preuves nécessaires :

- outil de monitoring choisi ;
- alertes uptime et 5xx testées ;
- alertes Prisma/formulaires/Resend configurées ;
- politique de logs et filtrage PII documentée.

### #14 Validate Data Retention And Privacy Policy Before Production

Preuves nécessaires :

- finalités de traitement validées ;
- durées de conservation validées ;
- procédures suppression/export/rectification opérationnelles ;
- sous-traitants techniques documentés ;
- texte `/confidentialite` validé pour l'usage commercial.
