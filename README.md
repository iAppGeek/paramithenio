# Paramithenio — Greek Fables for Children

An audio storytelling app featuring classic Greek fables (Aesop and folk tales), available on web and iOS/Android.

## Prerequisites

- Node.js ≥ 20
- pnpm 9.x (`npm i -g pnpm@9`)
- A Supabase project (see [Configuration](#configuration) below)
- For mobile: iOS/Android device or simulator + EAS CLI (`npm i -g eas-cli`)

## Quick start

```sh
pnpm install
```

Then follow the [Configuration](#configuration) steps below to create your local env files, then:

**Web:**

```sh
pnpm --filter @acme/web dev
```

**Mobile (dev build — Expo Go is not supported):**

```sh
cd apps/mobile
eas build --profile development --platform ios   # first time only
npx expo start --dev-client
```

---

## Configuration

There are three separate env files. **None of them should be committed** — all are covered by `.gitignore`.

### Where to find your keys

Open the [Supabase dashboard](https://supabase.com/dashboard) → your project → **Project Settings → API**:

| Key                | Location in dashboard                      | Secret?                       |
| ------------------ | ------------------------------------------ | ----------------------------- |
| Project URL        | "Project URL"                              | No — safe everywhere          |
| `anon` key         | "Project API keys → anon / public"         | No — safe in browser + app    |
| `service_role` key | "Project API keys → service_role"          | **Yes** — server + CI only    |

### Local development

**1. Root `.env`** — used by the `add-story` import script and `supabase` CLI only. Never reaches the browser or mobile bundle.

```sh
cp .env.example .env
```

Fill in:

```dotenv
SUPABASE_URL=https://<project-id>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

**2. `apps/web/.env.local`** — Vite inlines these into the browser bundle at build time. Safe to use the `anon` key here.

```sh
cp apps/web/.env.example apps/web/.env.local
```

Fill in:

```dotenv
VITE_SUPABASE_URL=https://<project-id>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

**3. `apps/mobile/.env.local`** — Expo reads `EXPO_PUBLIC_*` vars at build time and embeds them in the app bundle. Safe to use the `anon` key here.

```sh
cp apps/mobile/.env.example apps/mobile/.env.local
```

Fill in:

```dotenv
EXPO_PUBLIC_SUPABASE_URL=https://<project-id>.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

> `EXPO_TOKEN` in the mobile example is CI-only — leave it out of your local file.

### CI — GitHub Actions secrets

Go to **GitHub → repository → Settings → Secrets and variables → Actions → New repository secret** and add:

| Secret name                 | Value                       | Used by               |
| --------------------------- | --------------------------- | --------------------- |
| `SUPABASE_URL`              | Project URL                 | Keep-alive ping       |
| `SUPABASE_SERVICE_ROLE_KEY` | `service_role` key          | Keep-alive ping       |
| `VITE_SUPABASE_URL`         | Project URL                 | `ci.yml` build job    |
| `VITE_SUPABASE_ANON_KEY`    | `anon` key                  | `ci.yml` build job    |
| `EXPO_TOKEN`                | EAS personal access token   | Future EAS build job  |

The `anon` key is safe as a GitHub Secret — it is already public in every deployed web bundle. The `service_role` key must **never** be passed to the build job or any client-side step.

### Web deployment — Netlify

In your Netlify site → **Site configuration → Environment variables**, add:

| Variable             | Value       |
| -------------------- | ----------- |
| `VITE_SUPABASE_URL`  | Project URL |
| `VITE_SUPABASE_ANON_KEY` | `anon` key  |

Netlify injects these during the Vite build. No server-side key needed for the web app.

### Mobile deployment — EAS

EAS secrets are stored per-project in Expo's servers and injected during cloud builds. Run once:

```sh
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_URL --value "https://<project-id>.supabase.co"
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "<your-anon-key>"
```

Verify with `eas secret:list`. These values are embedded into the app bundle at EAS build time.

### Supabase CLI (local migrations)

To push schema migrations or run `supabase db reset` locally, the Supabase CLI reads from `SUPABASE_ACCESS_TOKEN` and the project ID in `supabase/config.toml`:

```sh
# Install once
brew install supabase/tap/supabase

# Link to your project (prompts for access token)
supabase login
supabase link --project-ref rdhcneqcdbtnncbhneki

# Push any pending migrations
supabase db push
```

---

## Project structure

| Path                   | Description                                                                    |
| ---------------------- | ------------------------------------------------------------------------------ |
| `packages/core`        | Shared logic: AudioAdapter types, Supabase client, TanStack Query hooks        |
| `packages/design-tokens` | Design tokens (colours, spacing, typography)                                 |
| `packages/config`      | Shared Tailwind/NativeWind preset                                              |
| `apps/web`             | Vite + React 19 web app                                                        |
| `apps/mobile`          | Expo SDK + Expo Router mobile app                                              |
| `supabase/migrations`  | Database schema migrations (auto-applied on merge via native GitHub integration) |
| `scripts`              | Maintenance scripts (`keep-alive` ping, `add-story` import)                   |

## CI / checks

Before every pull request:

```sh
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

All six CI jobs (Lint, Typecheck, Test, Build, Security, CodeQL) must be green before a PR can merge into `main`.

## Roadmap

See [PLAN.md](PLAN.md) for the full phase roadmap and [PROGRESS.md](PROGRESS.md) for current status.
