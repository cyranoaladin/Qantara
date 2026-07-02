# Politique De Sauvegarde PostgreSQL

Ce document décrit la politique cible avant production commerciale. Elle doit être
validée avec le fournisseur PostgreSQL retenu et testée avant ouverture publique.

## Périmètre

- Base PostgreSQL production contenant leads, contacts, diagnostics, newsletters
  et métadonnées admin.
- Environnement preview séparé si une base preview est utilisée.
- Les sauvegardes ne doivent jamais être stockées dans Git.

## Fréquence

- Production : sauvegarde automatique quotidienne au minimum.
- Avant migration Prisma : snapshot manuel ou sauvegarde vérifiée.
- Preview : sauvegarde optionnelle, selon présence de données réelles.

## Rétention

- Production : 30 jours minimum recommandés pour la V1.
- Conservation plus longue uniquement si besoin contractuel ou légal documenté.
- Les sauvegardes doivent respecter la politique de conservation des données.
- En cas de retrait de consentement ou demande de suppression, l'enregistrement
  concerné doit être supprimé ou anonymisé dans la base active. Si une sauvegarde
  antérieure est restaurée, les suppressions/anonymisations déjà demandées doivent
  être réappliquées avant remise en service.

## Chiffrement Et Accès

- Chiffrement au repos et en transit côté fournisseur.
- Accès limité aux administrateurs techniques autorisés.
- Rotation des accès après départ d'un administrateur ou suspicion d'incident.
- Aucun export de sauvegarde sur poste personnel non chiffré.

## Restauration

Procédure minimale :

1. Identifier la sauvegarde cible et l'heure de restauration.
2. Restaurer d'abord dans une base temporaire isolée.
3. Vérifier les tables critiques : `Lead`, `ContactMessage`,
   `DiagnosticRequest`, `NewsletterSubscriber`.
4. Valider l'intégrité applicative avec `pnpm prisma:deploy` puis un smoke test.
5. Basculer la production seulement après validation.
6. Documenter l'opération : date, responsable, source, résultat.

## Test De Restauration

- À exécuter avant première production.
- À répéter au moins une fois par trimestre.
- Le test doit produire une preuve : date, durée, base cible, résultat, écarts.

## RPO / RTO Cibles V1

- RPO cible : 24 heures maximum.
- RTO cible : 4 heures maximum après disponibilité de la sauvegarde.

Ces valeurs doivent être ajustées si Qantara AI traite des données plus critiques.

## Responsabilité

Responsable V1 : administrateur technique Qantara AI ou prestataire d'exploitation
désigné. Aucun passage production ne doit être fait sans responsable identifié.

## Incidents

En cas de perte ou corruption de données :

1. Geler les écritures si nécessaire.
2. Préserver les logs applicatifs et fournisseur.
3. Identifier la fenêtre d'incident.
4. Restaurer en base temporaire.
5. Communiquer aux parties concernées selon obligation applicable.
6. Documenter les mesures correctives.
