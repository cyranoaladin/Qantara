# Passage Production

Ce document est la source de vérité pour passer de la preview technique à une
production réelle. Il ne remplace pas la configuration effective des services
externes : Vercel, PostgreSQL, Resend, monitoring, sauvegardes et politique de
conservation doivent être configurés et testés avant toute ouverture
commerciale.

## 1. Préconditions

- `main` protégé avec pull request obligatoire.
- Checks requis verts sur `main` : `Quality gates`, `PostgreSQL integration`,
  `Security checks`.
- Aucune pull request ouverte.
- Aucune conversation review ouverte.
- Issues production connues et suivies : #9, #10, #11, #12, #14.
- Aucune variable secrète commitée dans Git.
- `pnpm audit:secrets` vert.

## 2. Vercel

- Créer le projet Vercel depuis le repository GitHub.
- Brancher `main` comme branche de production.
- Définir un environnement Preview séparé.
- Définir un environnement Production séparé.
- Ne jamais exposer de secret en `NEXT_PUBLIC_`.
- Utiliser `NEXT_PUBLIC_` uniquement pour des valeurs publiques, par exemple
  `NEXT_PUBLIC_SITE_URL`.
- Configurer le domaine final.
- Aligner `NEXT_PUBLIC_SITE_URL` avec l'URL réelle de chaque environnement.
- Vérifier que les logs Vercel ne contiennent pas de données personnelles
  inutiles.

## 3. Variables Production

| Variable                 | Environnement      | Obligatoire              | Sensible            | Exemple placeholder          |
| ------------------------ | ------------------ | ------------------------ | ------------------- | ---------------------------- |
| `DATABASE_URL`           | Preview/Production | Oui                      | Oui                 | `postgresql://...`           |
| `NEXT_PUBLIC_SITE_URL`   | Preview/Production | Oui                      | Non                 | `https://qantara-ai.example` |
| `ADMIN_TOKEN`            | Production         | Oui                      | Oui                 | généré                       |
| `INTERNAL_CONTACT_EMAIL` | Production         | Oui                      | Non/sensible faible | `contact@qantara-ai.com`     |
| `RESEND_API_KEY`         | Production         | Optionnel si email actif | Oui                 | `re_...`                     |
| `RESEND_FROM_EMAIL`      | Production         | Oui si Resend actif      | Non                 | `Qantara AI <contact@...>`   |

## 4. Génération Des Secrets

Générer `ADMIN_TOKEN` avec une valeur longue et aléatoire :

```bash
openssl rand -base64 48
```

Règles :

- ne jamais committer un secret ;
- stocker uniquement dans Vercel ou GitHub Secrets si nécessaire ;
- ne jamais envoyer par email non sécurisé ;
- effectuer une rotation immédiate en cas de fuite ;
- ne pas réutiliser un secret preview en production ;
- ne pas préfixer un secret avec `NEXT_PUBLIC_`.

## 5. PostgreSQL Production

- Choisir un fournisseur PostgreSQL managé.
- Créer une base Production dédiée.
- Créer une base Preview séparée si des tests réels y écrivent.
- Vérifier chiffrement en transit et au repos.
- Limiter les accès admin DB.
- Configurer `DATABASE_URL` uniquement dans l'environnement cible.
- Vérifier la connexion depuis l'environnement Vercel.
- Activer les sauvegardes.
- Exécuter un test de restauration avant ouverture publique.

## 6. Migrations Prisma

Ordre obligatoire :

1. Vérifier que la sauvegarde ou le snapshot existe.
2. Exécuter `pnpm prisma:deploy` contre l'environnement cible uniquement.
3. Lancer un smoke test applicatif.
4. Si échec, revenir au déploiement précédent et restaurer selon la procédure DB
   validée.

Ne jamais appliquer une migration production contre une base non identifiée ou
partagée avec la preview.

## 7. Email Transactionnel

- Vérifier le domaine expéditeur dans Resend.
- Configurer `RESEND_FROM_EMAIL`.
- Configurer `INTERNAL_CONTACT_EMAIL`.
- Tester une notification interne.
- Vérifier qu'aucune donnée personnelle inutile n'apparaît dans les logs.
- Tester le comportement preview avec `RESEND_API_KEY` absent : les formulaires
  ne doivent pas échouer.

## 8. Admin

`ADMIN_TOKEN` est acceptable pour preview technique. Pour une production sensible,
remplacer ce mécanisme par Auth.js, SSO ou IAM.

Si le token est maintenu provisoirement :

- utiliser un token long généré aléatoirement ;
- limiter les personnes ayant accès au token ;
- documenter une procédure de rotation ;
- surveiller les accès `/admin` ;
- ne pas prétendre gérer le multi-admin sans vraie authentification ;
- planifier le remplacement via issue #11.

## 9. Monitoring

Configurer avant production :

- uptime sur `/`, `/contact`, `/diagnostic-ia` ;
- erreurs serveur 5xx ;
- erreurs Prisma ;
- erreurs Resend si email actif ;
- erreurs formulaires ;
- accès admin ;
- alerting email ou Slack ;
- consultation régulière des logs Vercel.

## 10. Backups

- Sauvegarde PostgreSQL automatique quotidienne au minimum.
- Rétention documentée.
- Restauration testée en base isolée.
- Responsable identifié.
- Procédure d'incident documentée.
- En cas de retrait de consentement, supprimer ou anonymiser la donnée active.
- Après restauration d'une sauvegarde ancienne, réappliquer les suppressions et
  anonymisations demandées avant remise en service.

Voir aussi [BACKUP_POLICY.md](BACKUP_POLICY.md).

## 11. Smoke Test Post-Déploiement

Vérifier :

- `/` répond en 200 et affiche le H1 principal ;
- `/services` répond en 200 ;
- `/diagnostic-ia` répond en 200 ;
- `/contact` répond en 200 ;
- `/confidentialite` répond en 200 ;
- `/admin` non authentifié n'expose aucune donnée ;
- cycle admin authentifié vérifié en HTTPS production : login, attributs cookie
  `httpOnly`, `sameSite`, `secure`, persistance de session, accès dashboard,
  logout et refus d'accès après déconnexion ;
- headers de sécurité présents ;
- `robots.txt` disponible et `/admin` disallow ;
- `sitemap.xml` disponible ;
- formulaire en erreur de validation sans écriture DB ;
- formulaire en succès uniquement après validation de la DB preview ou production.

## 12. Critères Pour Fermer Les Issues

### #9 Configure Vercel Environments And Production Secrets

Fermer seulement si :

- projet Vercel créé ;
- environnements Preview et Production configurés ;
- variables production réelles saisies hors Git ;
- domaine et `NEXT_PUBLIC_SITE_URL` vérifiés ;
- aucun secret en `NEXT_PUBLIC_`.

### #10 Configure Production PostgreSQL Backups And Restore Test

Fermer seulement si :

- fournisseur PostgreSQL choisi ;
- sauvegardes actives ;
- restauration testée dans une base isolée ;
- preuve de restauration documentée ;
- politique de sauvegarde alignée avec la configuration réelle.

### #11 Replace Admin Token V1 With Auth.js Or SSO

Fermer seulement si :

- authentification admin durable implémentée ;
- sessions révocables ;
- audit trail ou journal d'accès défini ;
- rate limiting réel ajouté ;
- tests admin mis à jour.

### #12 Set Up Monitoring And Alerting

Fermer seulement si :

- outil de monitoring choisi ;
- uptime et erreurs critiques surveillés ;
- alertes testées ;
- rétention et filtrage des données personnelles documentés.

### #14 Validate Data Retention And Privacy Policy Before Production

Fermer seulement si :

- finalités de traitement validées ;
- durées de conservation validées ;
- procédures suppression/export/rectification opérationnelles ;
- sous-traitants techniques documentés ;
- texte `/confidentialite` validé pour l'usage commercial visé.
