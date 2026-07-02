# Sécurité

## Secrets

Secrets attendus :

- `DATABASE_URL`
- `ADMIN_TOKEN`
- `RESEND_API_KEY`
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
pas le token brut. Options cookie :

- `httpOnly`;
- `sameSite=lax`;
- `secure` en production ;
- chemin limité à `/admin`.

Limites assumées :

- pas de multi-utilisateur ;
- pas de rotation de session avancée ;
- pas d'audit trail admin ;
- protection à remplacer par Auth.js, SSO ou une solution IAM avant usage large.

## Données Sensibles

Le site demande explicitement de ne pas transmettre de données sensibles dans les
formulaires publics. Toute mission utilisant des données personnelles ou sensibles
doit passer par un cadrage : classification, hébergement, accès, rétention,
validation humaine et règles internes.

## GitHub Actions

Les workflows utilisent `contents: read`. La CI qualité n'utilise pas de secrets.
Le workflow sécurité vérifie :

- dépendances avec `pnpm audit`;
- absence de fichier `.env` suivi ;
- patterns de secrets concrets.

Les overrides `pnpm` du `package.json` sont utilisés uniquement pour forcer des
versions transitives patchées quand un paquet amont embarque encore une version
signalée par `pnpm audit`.

## Robots Et Indexation

`/admin` est :

- `noIndex` via metadata Next.js ;
- exclu dans `app/robots.ts`.
