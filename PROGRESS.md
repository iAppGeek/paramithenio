# PROGRESS

Live status of the build. **Update this as you work** — it's the first thing a
developer (or AI agent) picking up the project should read. Pair it with `PLAN.md`
(the roadmap) and `AGENTS.md` (conventions).

Status legend: ✅ done · 🚧 in progress · ⬜ pending · ⛔ blocked

> **Current focus:** Phase 2 — basic layouts & navigation
> **Last updated:** 2026-06-28 · **By:** Anthony / Claude

---

## Phase 0 — Foundations

- ✅ Workspace foundation: `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json`, `.gitignore`, `.env.example`, `biome.jsonc`
- ✅ Tooling: Biome 2.5.1 (migrated), CI (`ci.yml`, `codeql.yml`), keep-alive workflow, branch-protection ruleset
- ✅ Docs: `KICKOFF.md`, `README.md`, `AGENTS.md`/`apps/mobile/AGENTS.md`, `PLAN.md`, `PROGRESS.md`
- ✅ Supabase migrations: `0001_ping.sql` (keep-alive table), `0002_stories.sql` (schema stub)
- ✅ `@acme/design-tokens`: warm story-book palette + spacing/font tokens (pure JS)
- ✅ `@acme/config`: shared Tailwind preset consuming design tokens
- ✅ `@acme/core`: package.json + tsconfig + `src/player/types.ts` (audio contracts) + Vitest 3 config
- ✅ `apps/web`: Vite 6 + React 19.2 + React Router 7 + Tailwind 3 + Vitest 3 placeholder app
- ✅ `apps/mobile`: Expo 53 + Expo Router + NativeWind 4 placeholder app (EAS build only)
- ✅ `pnpm lint && pnpm typecheck && pnpm test && pnpm build` all pass locally
- ⬜ Add repo secrets (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `EXPO_TOKEN`) — human step
- ⬜ Import `.github/rulesets/main-protection.json` via GitHub Settings — human step
- ⬜ Green CI on an empty PR; merge blocked until checks pass — human step (push branch + open PR)

## Phase 1 — Design system + tokens + wiring

- ✅ `tokens.js` + shared Tailwind preset wired into web Tailwind (`@fontsource-variable/inter` import in `index.css`)
- ✅ NativeWind wiring on mobile (Babel plugin, Metro config, `global.css`, `useFonts` for Inter)
- ✅ Base primitives (Button, Screen, Text, StoryTile) in each app with token classes only
- ✅ Greek-capable font: Inter Variable on web; `@expo-google-fonts/inter` on mobile; both apps show Greek story titles in StoryTile

## Phase 2 — Basic layouts & navigation

- ⬜ Web routes: Home, Story, Settings, Legal
- ⬜ Mobile screens (Expo Router): Home, Story, Settings
- ⬜ i18n scaffold (en/el) + language toggle setting
- ⬜ Navigable shells with mock data on both platforms

## Phase 3 — Database + data layer + source data

- ⬜ Supabase project; apply `0002_stories.sql`; buckets + RLS
- ⬜ `core` data layer (typed client + TanStack Query hooks)
- ⬜ Author 30 stories' metadata; upload via `add-story.ts`
- ⬜ Library lists real stories on both platforms

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

- **Store posture:** ship as a general app, **4+** rating (keeps identified
  PostHog analytics + SSO). Kids Category is a later epic.
- **Code sharing:** separate UIs over a shared `core` (maintainability over max
  reuse). Styling shared via tokens + Tailwind/NativeWind.
- **Identity:** Supabase anonymous sign-in from first launch; SSO links to the
  same `user_id`. No raw device IDs.
- **AI tooling:** `AGENTS.md` canonical; `CLAUDE.md` imports it (`@AGENTS.md`).
- **vitest@3 (not v2):** Vite 6 + vitest 2 have type-level Plugin incompatibilities;
  vitest 3 targets vite 6 and resolves this cleanly.
- **postcss.config.cjs:** `apps/web` is `"type":"module"` so CJS config files need `.cjs` extension.
- **Biome migrate:** ran `pnpm biome migrate --write` on first use per KICKOFF instruction; schema is now 2.5.1.
- **Font:** Inter Variable (web via `@fontsource-variable/inter`) + Inter via `@expo-google-fonts/inter` (mobile). Inter has full Greek glyph coverage (U+0370–03FF). On mobile, `font-sans` maps to `Inter_400Regular`; weight variants use `font-sans-semibold` / `font-sans-bold` because React Native requires separate font files per weight.
- *add new decisions here*

## Blockers / open questions

- ⬜ Legal review of policies before launch (ICO Children's Code).
- ✅ Confirmed font with full Greek glyph coverage: Inter Variable.
- ⬜ Supabase project not yet created (human prerequisite for Phase 3).
- ⬜ Expo/Apple/Google accounts not yet created (human prerequisite for Phase 11).
- *add blockers here*
