# PLAN.md — Phased roadmap

See [PROGRESS.md](PROGRESS.md) for live status of each task.

---

## Phase 0 — Foundations

**Goal:** green CI on an empty feature PR; all tooling wired.

### Tasks
- Workspace root: `package.json`, `pnpm-workspace.yaml`, Turborepo, Biome, `tsconfig.base.json`
- Packages: `@acme/core` (player types + Vitest), `@acme/design-tokens`, `@acme/config`
- Apps: `apps/web` (Vite + React Router placeholder), `apps/mobile` (Expo Router placeholder)
- CI: `.github/workflows/ci.yml` with Lint, Typecheck, Test, Build, Security jobs
- CodeQL: `.github/workflows/codeql.yml`
- Branch protection: `.github/rulesets/main-protection.json` imported via GitHub Settings
- Keep-alive: `.github/workflows/keep-alive.yml` pings Supabase every 6 hours

### Done when
`pnpm install` clean; `pnpm lint && pnpm typecheck && pnpm test && pnpm build` pass locally; an empty-feature PR turns CI green; PR cannot merge until all checks pass.

---

## Phase 1 — Design system + tokens + wiring

**Goal:** shared token-driven UI primitives on both platforms.

### Tasks
- Wire `@acme/design-tokens` tokens into the Tailwind preset; confirm web Tailwind picks them up
- NativeWind wiring on mobile: Babel plugin, Metro config, `global.css`
- Base primitives: `Button`, `Screen`, `Text`, `StoryTile` in each app (token classes only)
- Greek-capable font (e.g. Inter, Noto Sans) verified in both languages

### Done when
Both apps render a `StoryTile` with token colours and Greek text, no hardcoded values.

---

## Phase 2 — Basic layouts & navigation

**Goal:** navigable shells with placeholder screens.

### Tasks
- Web routes: `/` (Home), `/story/:id`, `/settings`, `/legal/*`
- Mobile screens (Expo Router tabs): Home, Story, Settings
- i18n scaffold: English + Greek namespace files, language toggle in Settings
- Both platforms show navigable shells with mock/hardcoded story data

### Done when
User can tap through all screens on web and mobile; language toggle switches between English and Greek.

---

## Phase 3 — Database + data layer + source data

**Goal:** real story library backed by Supabase.

### Tasks
- Supabase project created (human step); apply migrations (`20260628000002_stories.sql`, `20260628000003_narrations.sql`, `20260628000004_grants.sql`); create storage buckets; RLS policies
- `@acme/core` data layer: typed Supabase client, TanStack Query hooks for stories
- `scripts/add-story.ts`: CLI to import a story (metadata + audio upload)
- Author 30 stories' metadata; upload audio files
- Library screen shows real stories on both platforms

### Done when
30 stories visible in both apps; offline gracefully shows a loading/empty state.

---

## Phase 4 — Identity

**Goal:** persistent, privacy-respecting user identity.

### Tasks
- Supabase anonymous sign-in on first launch; `user_id` persisted locally
- Apple Sign-In + Google OAuth link flows (web + mobile)
- `consents` table; first-run consent screen

### Done when
Anonymous user created on first open; SSO link merges accounts; consent stored in DB.

---

## Phase 5a — Player controller + web audio

**Goal:** fully working web audio player.

### Tasks
- `PlayerController` implementation (progress persistence, analytics heartbeats, sleep timer + fade)
- `HtmlAudioAdapter`: HTML5 `<audio>` + Media Session API
- Web player UI: play/pause, seek slider, sleep timer, progress ring
- Unit tests for `PlayerController` against a mock `AudioAdapter`

### Done when
A story plays to completion on web; progress resumes from last position; sleep timer fades and stops.

---

## Phase 5b — Mobile audio

**Goal:** background-capable mobile audio player.

### Tasks
- `TrackPlayerAdapter` wrapping `react-native-track-player`
- iOS audio session `playback` category + Android foreground service
- Mobile player UI: play/pause, seek, sleep timer
- Verified on device: Bluetooth, AirPlay, lock-screen controls

### Done when
Story plays in background on iOS and Android; lock-screen controls work; AirPlay/Bluetooth tested.

---

## Phase 6 — Progress & resume

**Goal:** cross-device progress sync.

### Tasks
- `progress` Supabase table; debounced upserts on pause/seek/background
- Resume-from-position on story open
- Mark-as-complete; cross-device sync after re-login
- Offline queue (retry on reconnect)

### Done when
Listening position syncs across web and mobile; resume works after reinstall.

---

## Phase 7 — Search & browse

**Goal:** story discovery.

### Tasks
- Full-text search + trigram fuzzy search via Supabase
- Tag filter + category browse
- Search/browse UI on both platforms
- All queries via `@acme/core` hooks

### Done when
User can find a story by title keyword or browse by category/tag.

---

## Phase 8 — Analytics

**Goal:** privacy-respecting usage data.

### Tasks
- PostHog integration (web + React Native), EU host, consent-gated
- Identify on `user_id`
- Events: `story_open`, `story_view`, `play_start`, `play_heartbeat` (30s), `play_complete`
- Listen-time aggregate visible in PostHog

### Done when
PostHog dashboard shows play events; no events fire before consent; EU data residency confirmed.

---

## Phase 9 — Policies & legal surfaces

**Goal:** compliant legal copy in both languages.

### Tasks
- Bilingual Markdown legal docs (Privacy Policy, Terms, Cookie Policy, Children's Privacy)
- Web `/legal/*` routes rendering the Markdown
- Native settings screen renders the same docs
- Consent versioning (increment version → re-prompt on open)
- Account deletion serverless function + `/legal/delete-account` web page

### Done when
Legal screens accessible from Settings; consent re-prompts on version bump; deletion works end-to-end.

---

## Phase 10 — Polish, defaults & accessibility

**Goal:** production-quality UX.

### Tasks
- Default artwork fallback for stories without cover art
- Loading, empty, and error states on all screens
- `prefers-reduced-motion` respected (no auto-play animations)
- WCAG AA contrast verified; font size ≥ 14 sp on mobile
- App icons (1024 px), splash screens, store screenshots

### Done when
Lighthouse accessibility score ≥ 90; reduced-motion respected; icons and splash done.

---

## Phase 11 — Release

**Goal:** live on App Store, Google Play, and web.

### Tasks
- Apple Developer enrollment (nonprofit fee waiver) + App Store Connect app; privacy labels; 4+ rating
- Google Play Console + service account JSON; Data Safety form; IARC questionnaire
- Netlify deployment on production domain; environment variables set
- EAS build + submit for both platforms
- OTA update dry-run (verify `expo-updates` delivers a JS patch)

### Done when
App live on all three platforms; OTA update delivered to a test device.
