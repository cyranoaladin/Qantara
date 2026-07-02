# Triage Dependabot

État audité le 2026-07-02.

| PR  | Dépendances            | Type                    | CI              | Décision                                                                                                  |
| --- | ---------------------- | ----------------------- | --------------- | --------------------------------------------------------------------------------------------------------- |
| #4  | `react`, `react-dom`   | patch `19.2.4 → 19.2.7` | Verte sur la PR | Merge possible après le commit de durcissement, risque faible mais vérifier E2E.                          |
| #5  | `eslint`, `typescript` | major                   | CI rouge        | Ne pas merger. Requiert analyse TypeScript/ESLint dédiée.                                                 |
| #6  | `@types/node`          | major `20 → 26`         | Verte           | Ne pas merger automatiquement : runtime cible Node 22, mise à jour de types majeure à évaluer séparément. |
| #7  | `tsx`                  | patch `4.22.4 → 4.22.5` | Verte sur la PR | Merge possible après le commit de durcissement, risque faible.                                            |

## Règles

- Patch/minor avec CI verte : merge possible après lecture du diff.
- Major : pas de merge automatique.
- CI rouge : pas de merge.
- Après merge : `git pull --ff-only`, puis `pnpm install --frozen-lockfile`,
  `pnpm test`, `pnpm lint`, `pnpm build`.
