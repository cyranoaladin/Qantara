# Protection GitHub

État audité : la branche `main` n'était pas protégée au moment de l'audit
(`Branch not protected`, API GitHub 404).

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

À appliquer seulement après le push final du durcissement :

```bash
gh api \
  --method PUT \
  repos/cyranoaladin/Qantara/branches/main/protection \
  --input branch-protection.json
```

Si l'API refuse, configurer manuellement dans GitHub Settings > Branches.
