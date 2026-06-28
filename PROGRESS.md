# PROGRESS

Live status of the build. **Update this as you work** — it's the first thing a
developer (or AI agent) picking up the project should read. Pair it with `PLAN.md`
(the roadmap) and `AGENTS.md` (conventions).

Status legend: ✅ done · 🚧 in progress · ⬜ pending · ⛔ blocked

> **Current focus:** Phase 4 — Identity
> **Last updated:** 2026-06-28 · **By:** Anthony / Claude (session 2)

---

## Phase 0 — Foundations

- ✅ Workspace foundation: `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json`, `.gitignore`, `.env.example`, `biome.jsonc`
- ✅ Tooling: Biome 2.5.1 (migrated), CI (`ci.yml`, `codeql.yml`), keep-alive workflow, branch-protection ruleset
- ✅ Docs: `KICKOFF.md`, `README.md`, `AGENTS.md`/`apps/mobile/AGENTS.md`, `PLAN.md`, `PROGRESS.md`
- ✅ Supabase migrations: `20260628000001_ping.sql` (keep-alive + RLS), `20260628000002_stories.sql` (schema), `20260628000003_narrations.sql` (narrator voices), `20260628000004_grants.sql` (SELECT grants to anon + authenticated)
- ✅ `supabase/config.toml` added; Supabase native GitHub integration configured (auto-migrates on merge to main)
- ✅ `@acme/design-tokens`: warm story-book palette + spacing/font tokens (pure JS)
- ✅ `@acme/config`: shared Tailwind preset consuming design tokens
- ✅ `@acme/core`: package.json + tsconfig + `src/player/types.ts` (audio contracts) + Vitest 3 config
- ✅ `apps/web`: Vite 6 + React 19.2 + React Router 7 + Tailwind 3 + Vitest 3 placeholder app
- ✅ `apps/mobile`: Expo 53 + Expo Router + NativeWind 4 placeholder app (EAS build only)
- ✅ `pnpm lint && pnpm typecheck && pnpm test && pnpm build` all pass locally
- ✅ Local env files created (`root .env`, `apps/web/.env.local`, `apps/mobile/.env.local`); `.claudeignore` blocks Claude from reading them
- ✅ GitHub secrets added: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- ⬜ GitHub secrets still needed: `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`, `EXPO_TOKEN` — human step (needed for EAS builds)
- ⬜ Import `.github/rulesets/main-protection.json` via GitHub Settings — human step

## Phase 1 — Design system + tokens + wiring

- ✅ `tokens.js` + shared Tailwind preset wired into web Tailwind (`@fontsource-variable/inter` import in `index.css`)
- ✅ NativeWind wiring on mobile (Babel plugin, Metro config, `global.css`, `useFonts` for Inter)
- ✅ Base primitives (Button, Screen, Text, StoryTile) in each app with token classes only
- ✅ Greek-capable font: Inter Variable on web; `@expo-google-fonts/inter` on mobile; both apps show Greek story titles in StoryTile

## Phase 2 — Basic layouts & navigation

- ✅ Web routes: `/` (Home), `/story/:id` (Story), `/settings` (Settings), `/legal/*` (Privacy + Terms)
- ✅ Mobile screens (Expo Router): Home tab, Settings tab, Story detail (`/story/[id]`)
- ✅ Sticky NavBar with active-link highlighting (web)
- ✅ i18n scaffold: `i18next` + `react-i18next` wired on both platforms with `en`/`el` translation files
- ✅ Language toggle in Settings switches UI strings instantly on both platforms
- ✅ Navigable shells with mock data; 60 tests passing (37 web + 23 mobile)

## Phase 3 — Database + data layer + source data

- ✅ `@acme/core` typed Supabase client: `initSupabase`/`getSupabase` singleton; `fetchStories`/`fetchStory` query fns; `useStories`/`useStory` TanStack Query v5 hooks
- ✅ `QueryClientProvider` + `initSupabase` wired at startup in both apps (web: `VITE_SUPABASE_*`, mobile: `EXPO_PUBLIC_SUPABASE_*`)
- ✅ Home and Story screens consume real hooks with loading/error/empty states on both platforms
- ✅ `narrations` table: each story supports up to 4 narrator voices (`male_adult`, `female_adult`, `male_child`, `female_child`); one audio file per voice per story
- ✅ `scripts/add-story.ts` CLI: uploads audio to `audio/{slug}/{narrator_voice}.mp3`, upserts story + narration; requires `--narrator-voice`
- ✅ `supabase/seed.sql`: 30 Aesop fables with EN + EL titles/descriptions; placeholder `female_adult` narration rows — seeded to remote DB
- ✅ `.env.example` split: root (service-role key only), `apps/web` (`VITE_*`), `apps/mobile` (`EXPO_PUBLIC_*`)
- ✅ DB types generated from live schema via `pnpm gen:types` (`supabase gen types typescript`); `NarratorVoice` lives in `packages/core/src/db/narrator-voice.ts` (not a PG enum)
- ✅ Web app verified: fetches and displays 30 published stories from live Supabase DB
- ✅ 72 tests passing (11 core + 37 web + 24 mobile); all CI checks green
- ⬜ Create Supabase storage buckets (`audio`, `artwork`, public read) — human step (needed before `pnpm add-story` uploads work)
- ⬜ Upload real audio files via `pnpm add-story` — content step

## Phase 4 — Identity

- ⬜ Anonymous sign-in on first launch (persistent `user_id`)
- ⬜ Apple + Google SSO link flows (web + mobile)
- ⬜ `consents` table + first-run consent

## Phase 5a — Player controller + web audio

- ⬜ `PlayerController` + `AudioAdapter` interface (sleep timer, fade)
- ⬜ Web `HtmlAudioAdapter` + Media Session; web player UI
- ⬜ Controller unit tests against mock adapter

## Phase 5b — Mobile audio

- ⬜ `TrackPlayerAdapter` (background, lock-screen, MediaSession)
- ⬜ iOS audio session `playback` + Android foreground service
- ⬜ Mobile player UI; Bluetooth/AirPlay verified on device

## Phase 6 — Progress & resume

- ⬜ `progress` table; debounced upserts (pause/seek/background)
- ⬜ Resume-from-position, mark-complete, cross-device sync, offline queue

## Phase 7 — Search & browse

- ⬜ Search (full-text + trigram) + tag filter + category browse via `core`

## Phase 8 — Analytics

- ⬜ PostHog (web + RN), identify on `user_id`, EU host, consent-gated
- ⬜ Events: open, view, play_start, heartbeat, complete; listen-time

## Phase 9 — Policies & legal surfaces

- ⬜ Bilingual Markdown legal docs; web `/legal/*`; native rendering in settings
- ⬜ Consent versioning; account deletion function + `/legal/delete-account`

## Phase 10 — Polish, defaults & accessibility

- ⬜ Default artwork fallback; loading/empty/error states; reduced motion; WCAG AA
- ⬜ App icons, splash, store assets

## Phase 11 — Release

- ⬜ Apple (waiver, privacy labels, 4+), Google Play (Data safety, IARC)
- ⬜ Web go-live on Netlify domain; EAS build/submit + OTA dry-run

---

## Decisions log (append-only)

Record context so newcomers understand *why*, not just *what*.

- **Store posture:** ship as a general app, **4+** rating (keeps identified PostHog analytics + SSO). Kids Category is a later epic.
- **Code sharing:** separate UIs over a shared `core` (maintainability over max reuse). Styling shared via tokens + Tailwind/NativeWind.
- **Identity:** Supabase anonymous sign-in from first launch; SSO links to the same `user_id`. No raw device IDs.
- **AI tooling:** `AGENTS.md` canonical; `CLAUDE.md` imports it (`@AGENTS.md`).
- **vitest@3 (not v2):** Vite 6 + vitest 2 have type-level Plugin incompatibilities; vitest 3 targets vite 6 and resolves this cleanly.
- **postcss.config.cjs:** `apps/web` is `"type":"module"` so CJS config files need `.cjs` extension.
- **Biome migrate:** ran `pnpm biome migrate --write` on first use per KICKOFF instruction; schema is now 2.5.1.
- **Font:** Inter Variable (web via `@fontsource-variable/inter`) + Inter via `@expo-google-fonts/inter` (mobile). Inter has full Greek glyph coverage (U+0370–03FF). On mobile, `font-sans` maps to `Inter_400Regular`; weight variants use `font-sans-semibold` / `font-sans-bold` because React Native requires separate font files per weight.
- **Narrator voices:** `audio_path` and `duration_seconds` live in the `narrations` table, not `stories`. A `unique(story_id, narrator_voice)` constraint prevents duplicates. Audio storage path convention: `{slug}/{narrator_voice}.mp3`. Duration shows on the player screen (where a voice is selected), not the library list.
- **Supabase DB types:** generated from live schema via `pnpm gen:types` (`supabase gen types typescript --project-id rdhcneqcdbtnncbhneki --schema public`). `NarratorVoice` is a TypeScript-only union (the DB column uses a text CHECK constraint, not a PG enum) and lives in `packages/core/src/db/narrator-voice.ts` so it is never overwritten by generation. Run `pnpm gen:types` after any schema migration.
- **Migration naming:** `YYYYMMDDHHmmss_description.sql` — required by Supabase CLI to track applied migrations and run `supabase db push` via the native GitHub integration.
- **Seed vs migrations:** `supabase/seed.sql` runs on `supabase db reset` only (dev/staging). Migrations run on every environment via `supabase db push`. Never merge seed data into a migration file.
- **`@types/react` pinned:** root `pnpm.overrides` forces `@types/react@~19.0.0` across the workspace to prevent duplicate copies (which cause `ReactNode` type incompatibility between packages).
- **`@acme/core` tsconfig:** spec files excluded from `tsc --noEmit` (Vitest covers them); `"lib": ["ES2022", "DOM"]` added so `console` is available without pulling in `@types/node`.

## Blockers / open questions

- ⬜ Legal review of policies before launch (ICO Children's Code).
- ✅ Confirmed font with full Greek glyph coverage: Inter Variable.
- ✅ Supabase project created: `rdhcneqcdbtnncbhneki` — native GitHub integration configured.
- ⬜ Storage buckets (`audio`, `artwork`) not yet created — human step before `pnpm add-story` uploads work.
- ✅ GitHub secrets for Supabase URL + anon key added — web app fetches live data.
- ⬜ Expo/Apple/Google accounts not yet created (human prerequisite for Phase 11).
