# Observabilité

Objectif V1 : détecter les erreurs serveur, les échecs formulaires, les problèmes
email et les incidents base sans exposer de données personnelles.

## Logs Serveur

- Surveiller les erreurs Next.js dans Vercel Logs.
- Ne pas logger le contenu complet des messages, téléphones ou emails en production.
- Les erreurs email doivent indiquer le stade (`configuration` ou `resend`) sans
  données personnelles.
- Les erreurs Prisma doivent être agrégées par type et route, pas par contenu de
  formulaire.

## Métriques À Surveiller

- Taux d'erreur 5xx.
- Latence `/contact`, `/diagnostic-ia`, `/admin`.
- Nombre de soumissions contact/diagnostic/newsletter.
- Erreurs Resend.
- Erreurs Prisma.
- Taille de la base et volume de leads.
- Temps de build et statut CI.

## Alertes Recommandées

- 5xx supérieur à un seuil sur 5 minutes.
- Échec répété des formulaires.
- Échec de connexion DB.
- Échec d'envoi Resend si l'email est activé.
- Sauvegarde PostgreSQL manquante.
- CI main rouge.

## Uptime

Configurer une sonde externe sur :

- `/`
- `/contact`
- `/diagnostic-ia`

La sonde ne doit pas soumettre de données réelles.

## Sauvegardes Et Restauration

- Activer sauvegardes PostgreSQL.
- Tester une restauration avant production.
- Documenter RPO/RTO.
- Restreindre l'accès aux sauvegardes.

## Intégrations Futures

Sentry, Axiom, Better Stack, Datadog ou Grafana peuvent être ajoutés après choix
produit. Ne pas installer d'agent observabilité sans politique de données et
filtrage PII.
