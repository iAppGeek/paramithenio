# PROGRESS

Live status of the build. **Update this as you work** — it's the first thing a
developer (or AI agent) picking up the project should read. Pair it with `PLAN.md`
(the roadmap) and `AGENTS.md` (conventions).

Status legend: ✅ done · 🚧 in progress · ⬜ pending · ⛔ blocked

> **Current focus:** Phase 0 — commit the scaffolding/tooling below and get a green
> CI run on an empty PR.
> **Last updated:** _set on first commit_ · **By:** _your name_

---

## Phase 0 — Foundations
- 🟡 Workspace foundation drafted: `package.json`, `pnpm-workspace.yaml`,
  `turbo.json`, `tsconfig.base.json`, `.gitignore`, `.env.example`
- 🟡 Tooling drafted: `biome.jsonc`, CI (`ci.yml`, `codeql.yml`), branch-protection
  ruleset, `keep-alive` workflow + `0001_ping.sql`
- 🟡 Docs drafted: `KICKOFF.md`, `README.md`, `AGENTS.md`/`CLAUDE.md`, `PLAN.md`,
  `PROGRESS.md`
- 🟡 Partial scaffolds drafted: `@acme/design-tokens`, `@acme/config`,
  `packages/core/src/player/types.ts`
- ⬜ Scaffold remaining packages/apps: `@acme/core` index + setup, `apps/web`
  (Vite+Router), `apps/mobile` (Expo Router + NativeWind) — see KICKOFF §5
- ⬜ Add repo secrets (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `EXPO_TOKEN`)
- ⬜ Green CI on an empty PR; merge blocked until checks pass
- _(🟡 = files generated but not yet committed to the repo)_

## Phase 1 — Design system + tokens + wiring
- ⬜ `tokens.js` + shared Tailwind preset (drafted) wired into web Tailwind
- ⬜ NativeWind wiring on mobile (Babel/Metro + `global.css`)
- ⬜ Base primitives (Button, Screen, Text, StoryTile) from tokens
- ⬜ Greek-capable font verified in both languages

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
- _add new decisions here…_

## Blockers / open questions

- ⬜ Legal review of policies before launch (ICO Children's Code).
- ⬜ Confirm a display/body font with full Greek glyph coverage.
- _add blockers here…_
