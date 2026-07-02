# Protection GitHub

État audité : la branche `main` n'était pas protégée au début de l'audit
(`Branch not protected`, API GitHub 404).

État appliqué le 2026-07-02 via API GitHub :

- protection de branche active sur `main` ;
- pull request obligatoire avant merge ;
- branche à jour obligatoire avant merge ;
- conversations à résoudre avant merge ;
- force-push bloqué ;
- suppression de branche bloquée ;
- règles appliquées aux administrateurs ;
- aucun reviewer obligatoire pour l'instant afin de ne pas bloquer un dépôt solo.

## Règles Recommandées

- Require pull request before merging.
- Require status checks to pass before merging.
- Require branches to be up to date before merging.
- Require conversation resolution before merging.
- Block force pushes.
- Block deletions.
- Restrict direct pushes to `main` si possible.
- Require review si le projet devient collaboratif.

## Checks Requis

- `Quality gates`
- `PostgreSQL integration`
- `Security checks`

Selon l'affichage GitHub, les checks peuvent apparaître avec leur workflow :

- `CI / Quality gates`
- `CI / PostgreSQL integration`
- `Security / Security checks`

## Commande API Indicative

La protection a été appliquée avec cette stratégie après le push final du
durcissement :

```bash
gh api \
  --method PUT \
  repos/cyranoaladin/Qantara/branches/main/protection \
  --input branch-protection.json
```

Si l'API refuse, configurer manuellement dans GitHub Settings > Branches.
