# Paramithenio — Greek Fables for Children

An audio storytelling app featuring classic Greek fables (Aesop and folk tales), available on web and iOS/Android.

## Prerequisites

- Node.js ≥ 20
- pnpm 9.x (`npm i -g pnpm@9`)
- Supabase project (see `.env.example`)
- For mobile: iOS/Android device or simulator + EAS CLI (`npm i -g eas-cli`)

## Quick start

```sh
pnpm install
cp .env.example .env   # fill in your Supabase credentials
```

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

## Project structure

| Path | Description |
|------|-------------|
| `packages/core` | Shared logic: AudioAdapter types, Supabase client, TanStack Query hooks |
| `packages/design-tokens` | Design tokens (colours, spacing, typography) |
| `packages/config` | Shared Tailwind/NativeWind preset |
| `apps/web` | Vite + React 19 web app |
| `apps/mobile` | Expo SDK + Expo Router mobile app |
| `supabase/migrations` | Database schema migrations |
| `scripts` | Maintenance scripts (keep-alive ping, story import) |

## CI / checks

Before every pull request:
```sh
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

All six CI jobs (Lint, Typecheck, Test, Build, Security, CodeQL) must be green before a PR can merge into `main`.

## Roadmap

See [PLAN.md](PLAN.md) for the full phase roadmap and [PROGRESS.md](PROGRESS.md) for current status.
