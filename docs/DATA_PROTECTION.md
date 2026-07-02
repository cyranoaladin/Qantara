# Protection Des Données

Ce document décrit le cadre de confidentialité V1 pour Qantara AI. Il ne constitue
pas une certification de conformité complète ; il sert de base opérationnelle avant
revue juridique et mise en production commerciale.

## Données Collectées

- Nom et prénom.
- Email.
- Téléphone optionnel.
- Organisation et rôle optionnels.
- Sujet et message de contact.
- Informations de diagnostic IA : secteur, type d'organisation, taille d'équipe,
  outils actuels, problème principal, cas d'usage visés, sensibilité déclarée des
  données, calendrier, budget indicatif optionnel.
- Métadonnées techniques minimales : hash IP éventuel, user agent.

## Finalités

- Répondre à une demande de contact.
- Cadrer une demande de diagnostic IA.
- Envoyer une ressource demandée ou une checklist.
- Suivre les demandes entrantes dans l'admin interne.
- Mesurer la qualité du traitement commercial et pédagogique.

## Base De Traitement

Base V1 à valider juridiquement selon les marchés visés :

- consentement explicite via formulaires ;
- intérêt légitime pour répondre à une demande entrante ;
- mesures précontractuelles si une organisation demande un audit ou un diagnostic.

## Minimisation

Les formulaires ne doivent pas demander de documents sensibles, exports clients,
données de santé, données financières détaillées ou secrets métier. Toute mission
impliquant des données sensibles doit passer par un cadrage séparé : périmètre,
hébergement, accès, conservation, confidentialité et validation humaine.

## Conservation

Durée indicative V1 :

- demandes contact et diagnostic : 24 mois maximum après dernier échange ;
- newsletter/checklist : jusqu'au désabonnement ou demande de suppression ;
- logs techniques : durée minimale nécessaire au diagnostic opérationnel ;
- sauvegardes : selon politique du fournisseur PostgreSQL, à documenter avant
  production.

Ces durées doivent être validées avant usage commercial.

## Accès Admin

L'accès `/admin` est réservé aux personnes autorisées par Qantara AI. La V1 utilise
un token admin temporaire. Avant usage multi-administrateur, remplacer ce mécanisme
par Auth.js, SSO ou une solution IAM avec journaux d'accès.

## Suppression, Export, Rectification

Procédure V1 :

1. Recevoir la demande via `contact@qantara-ai.com`.
2. Vérifier l'identité du demandeur de manière proportionnée.
3. Rechercher les entrées par email dans `Lead`, `ContactMessage`,
   `DiagnosticRequest`, `NewsletterSubscriber` et `ResourceDownload`.
4. Exporter ou rectifier les données si demandé.
5. Supprimer ou anonymiser selon obligation contractuelle et conservation légale.
6. Journaliser l'action sans recopier les données personnelles complètes.

## Logs

- Pas de message formulaire complet dans les logs de production.
- Pas de téléphone ou email dans les logs d'erreur applicatifs.
- Les erreurs email/Prisma doivent être traçables avec un identifiant technique ou
  un message générique.

## Sauvegardes

Avant production :

- activer les sauvegardes PostgreSQL ;
- documenter la durée de conservation ;
- tester une restauration ;
- restreindre l'accès aux sauvegardes.

Politique cible : [BACKUP_POLICY.md](BACKUP_POLICY.md).

## Incident

En cas d'exposition ou perte de données :

1. Couper l'accès concerné ou révoquer le secret compromis.
2. Identifier les tables, dates et personnes concernées.
3. Préserver les logs techniques utiles.
4. Informer les parties concernées selon obligation légale applicable.
5. Corriger la cause et documenter les mesures prises.

## Contact

Contact confidentialité V1 : `contact@qantara-ai.com`.
