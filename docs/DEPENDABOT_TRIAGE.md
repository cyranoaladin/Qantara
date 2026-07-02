# Triage Dependabot

État audité et mis à jour le 2026-07-02.

| PR  | Dépendances            | Type                    | CI              | Décision                                                                                                                     |
| --- | ---------------------- | ----------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| #4  | `react`, `react-dom`   | patch `19.2.4 → 19.2.7` | Verte sur la PR | Mergée en squash après mise à jour de branche et pipeline complet vert.                                                      |
| #5  | `eslint`, `typescript` | major                   | CI rouge        | Fermée après commentaire : ESLint 10 casse `eslint-plugin-react` pendant le lint. Upgrade à traiter dans une branche dédiée. |
| #6  | `@types/node`          | major `20 → 26`         | Verte           | Fermée après commentaire : runtime cible Node 22, types Node 26 incompatibles avec la stratégie runtime actuelle.            |
| #7  | `tsx`                  | patch `4.22.4 → 4.22.5` | Verte sur la PR | Mergée en squash après mise à jour de branche et pipeline complet vert.                                                      |

État production-readiness : les PR #5 et #6 ne sont plus des dettes ouvertes.
Dependabot ignore désormais ces majors incompatibles ou cassantes jusqu'à une
décision explicite d'upgrade runtime/tooling. L'issue #13 a été fermée après
triage.

## Règles

- Patch/minor avec CI verte : merge possible après lecture du diff.
- Major : pas de merge automatique.
- CI rouge : pas de merge.
- Après merge : `git pull --ff-only`, puis `pnpm install --frozen-lockfile`,
  `pnpm test`, `pnpm lint`, `pnpm build`.
