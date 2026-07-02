# QA

## Commandes Automatiques

```bash
pnpm install --frozen-lockfile
pnpm prisma:generate
pnpm format:check
pnpm typecheck
pnpm lint
pnpm test
pnpm test:integration
pnpm build
pnpm exec playwright install --with-deps chromium
pnpm test:e2e
```

## Tests Unitaires

- Validateurs Zod : contact, diagnostic, newsletter.
- Sécurité formulaire : consentement, honeypot, longueurs max, normalisation.
- Score de maturité : bornage, progression, pénalité données sensibles.
- Contenu produit : pas de faux clients, faux témoignages ou promesses absolues.
- Brand assets : SVG officiels et tokens.
- SEO : site URL, Organization, ProfessionalService, FAQPage, sitemap.

## Tests D'Intégration PostgreSQL

Les tests dans `tests/integration` nécessitent une vraie base PostgreSQL et des
migrations appliquées :

```bash
DATABASE_URL="postgresql://qantara:qantara@localhost:55432/qantara_ai_test" pnpm prisma:deploy
DATABASE_URL="postgresql://qantara:qantara@localhost:55432/qantara_ai_test" pnpm test:integration
```

## Tests E2E

Playwright vérifie :

- accueil, H1, CTA et sections clés ;
- navigation routes publiques ;
- logo desktop, symbole mobile et favicon ;
- absence d'overflow horizontal ;
- erreurs formulaire contact sans écrire en base.

## Passe Manuelle Responsive

Viewports :

- mobile 390x844 ;
- tablette 768x1024 ;
- desktop 1440x1000.

Pages :

- `/`
- `/services`
- `/formations`
- `/studio`
- `/gouvernance`
- `/education`
- `/diagnostic-ia`
- `/ressources`
- `/blog`
- `/contact`
- `/admin`

Contrôles :

- un seul H1 visible ;
- header utilisable ;
- menu mobile utilisable ;
- CTA visibles ;
- formulaires lisibles ;
- focus visible ;
- aucun overflow horizontal ;
- logo non déformé ;
- footer lisible.

## Accessibilité

- Contraste texte/fond suffisant.
- Navigation clavier sur header, menu mobile, formulaires et CTA.
- Labels visibles sur les champs.
- Focus visible.
- Messages d'erreur compréhensibles.

## Lighthouse

Procédure manuelle avant release :

- Page `/` : Performance > 90, Accessibility > 95, Best Practices > 95, SEO > 95.
- Page `/diagnostic-ia` : mêmes seuils.
- Page `/contact` : mêmes seuils.

Ne pas bloquer la CI sur Lighthouse tant que les seuils n'ont pas été mesurés
plusieurs fois en environnement stable.
