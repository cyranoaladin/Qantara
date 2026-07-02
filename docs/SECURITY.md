# Sécurité

## Secrets

Secrets attendus :

- `DATABASE_URL`
- `ADMIN_TOKEN`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` si Resend est activé
- `INTERNAL_CONTACT_EMAIL` si l'adresse interne ne doit pas être publique

Règles :

- aucun vrai fichier `.env` dans Git ;
- pas de secret en `NEXT_PUBLIC_` ;
- pas de token personnel dans scripts, README, workflows ou tests ;
- rotation immédiate si un secret est exposé.

## Formulaires

Les formulaires contact, diagnostic IA et newsletter utilisent :

- validation serveur Zod ;
- normalisation email en minuscules ;
- trim des champs texte ;
- limites de longueur ;
- consentement obligatoire ;
- honeypot anti-spam ;
- messages d'erreur neutres.

Les logs de production ne doivent pas contenir les messages utilisateur complets,
les téléphones ou des données personnelles non nécessaires.

## Admin V1

`/admin` est protégé par `ADMIN_TOKEN`. Le cookie admin contient un hash du token,
pas le token brut. La comparaison utilise `timingSafeEqual` sur les hashes.
Options cookie :

- `httpOnly`;
- `sameSite=lax`;
- `secure` en production ;
- chemin limité à `/admin`.

Limites assumées :

- pas de multi-utilisateur ;
- pas de rotation de session avancée ;
- pas d'audit trail admin ;
- protection à remplacer par Auth.js, SSO ou une solution IAM avant usage large.

Détails : [ADMIN_SECURITY.md](ADMIN_SECURITY.md).

## Données Sensibles

Le site demande explicitement de ne pas transmettre de données sensibles dans les
formulaires publics. Toute mission utilisant des données personnelles ou sensibles
doit passer par un cadrage : classification, hébergement, accès, rétention,
validation humaine et règles internes.

Cadre données : [DATA_PROTECTION.md](DATA_PROTECTION.md).

## Headers HTTP

`next.config.ts` définit :

- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy: strict-origin-when-cross-origin`;
- `X-Frame-Options: DENY`;
- `Permissions-Policy` restrictive ;
- `Cross-Origin-Opener-Policy: same-origin`.

La CSP n'est pas activée en blocage en V1 pour éviter de casser Next.js, JSON-LD,
fonts et assets SVG sans audit complet. Une CSP report-only est recommandée avant
activation stricte. HSTS doit être activé uniquement sur HTTPS production, au
niveau Vercel/domaine.

## Production Readiness Bloquante

Le dépôt ne doit pas être déclaré prêt pour production commerciale tant que les
secrets Vercel, la base PostgreSQL production, les sauvegardes testées, le
monitoring externe et une décision sur l'auth admin durable ne sont pas en place.

## GitHub Actions

Les workflows utilisent `contents: read`. La CI qualité n'utilise pas de secrets.
Le workflow sécurité vérifie :

- dépendances avec `pnpm audit`;
- absence de fichier `.env` suivi ;
- patterns de secrets concrets via `scripts/scan-secrets.sh`.

`.env.example` est autorisé comme référence locale. `.env.vercel.example` est
autorisé comme template Vercel, mais il reste scanné : une vraie clé Resend, un
token GitHub, une clé `sk-`, une URL PostgreSQL avec mot de passe ou un
`ADMIN_TOKEN` long non-placeholder doivent faire échouer le scan.

Le même scan peut être lancé localement avec :

```bash
pnpm audit:secrets
```

Les overrides `pnpm` du `package.json` sont utilisés uniquement pour forcer des
versions transitives patchées quand un paquet amont embarque encore une version
signalée par `pnpm audit`.

## Robots Et Indexation

`/admin` est :

- `noIndex` via metadata Next.js ;
- exclu dans `app/robots.ts`.
