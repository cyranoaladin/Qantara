# QA

## Commandes Automatiques

```bash
pnpm install --frozen-lockfile
pnpm prisma:generate
pnpm format:check
pnpm typecheck
pnpm lint
pnpm test
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
