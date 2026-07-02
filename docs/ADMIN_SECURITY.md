# Sécurité Admin

L'admin V1 est volontairement minimal. Il convient pour une preview technique, pas
pour un usage multi-utilisateur durable.

## Mécanisme Actuel

- `ADMIN_TOKEN` côté serveur uniquement.
- Refus de `ADMIN_TOKEN=change-me`.
- Échec explicite en production si le token est absent ou faible.
- Comparaison via hash SHA-256 et `timingSafeEqual`.
- Cookie httpOnly, `sameSite=lax`, `secure` en production.
- Cookie limité au chemin `/admin`.
- Durée de session : 8 heures.
- Données admin rendues côté serveur, pas via fetch client.

## Limites

- Pas de comptes individuels.
- Pas de rotation de session avancée.
- Pas de journal d'accès admin.
- Pas de rate limiting applicatif robuste.
- Pas de MFA.

## Rate Limiting Recommandé

Ne pas ajouter un rate limiting mémoire en production serverless. Utiliser plutôt :

- Vercel WAF / protection edge si disponible ;
- Upstash Redis ou Vercel KV pour compteur par IP hashée ;
- seuil bas sur `/admin` et action de login ;
- journalisation sans stocker le token soumis.

## Avant Production

- Remplacer le token unique par Auth.js, SSO ou IAM.
- Ajouter MFA si possible.
- Ajouter audit trail des connexions admin.
- Limiter les accès par rôle.
- Ajouter procédure de rotation de token et révocation.
