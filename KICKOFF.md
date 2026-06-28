# KICKOFF — start here (for a fresh Claude Code / Cursor session)

This is the brief for an AI agent (or developer) starting from an empty checkout.
It resolves every open decision and defines exactly how to proceed so nothing is
guessed.

## 1. Read these first, in order

1. `README.md` — what the project is and how to run/release it.
2. `AGENTS.md` (+ `apps/mobile/AGENTS.md`) — coding conventions. **Binding.**
3. `PLAN.md` — the phased roadmap (Phase 0 → 11).
4. `PROGRESS.md` — current status. This is where you record what you do.

## 2. How to operate

- Work **one phase at a time, in order**, following the task list in `PLAN.md`.
- Within a phase, make small commits and open **one pull request per coherent
  chunk**. Never push to `main` directly — CI + branch protection block it.
- After each task: update its status in `PROGRESS.md` (⬜→🚧→✅), add the date and a
  one-line note, and log any decision in the Decisions section.
- A phase is finished only when its "Done when" checkpoint in `PLAN.md` is met and
  CI is green.
- Run `pnpm lint && pnpm typecheck && pnpm test && pnpm build` before every PR.

## 3. Pinned decisions (do not re-litigate)

- **Monorepo:** pnpm workspaces + Turborepo (already configured).
- **Package scope:** `@acme` (e.g. `@acme/core`, `@acme/design-tokens`,
  `@acme/config`). The committed configs already reference it — if you want a
  different scope, rename **everywhere** consistently in one commit.
- **Web:** Vite + React + TypeScript. Routing: **React Router**.
- **Mobile:** Expo (latest SDK) + **Expo Router**. Dev build required (track-player
  is native) — not Expo Go.
- **Styling:** Tailwind (web) + NativeWind (mobile), both via
  `@acme/config/tailwind-preset`. Tokens only — never hardcode values.
- **i18n:** `react-i18next` (works on web and React Native), namespaces `en`/`el`,
  English fallback.
- **Server state:** TanStack Query. **Local state:** Zustand.
- **Audio:** `react-native-track-player` (mobile) / HTML5 `<audio>` + Media Session
  (web), both behind the `AudioAdapter` in `@acme/core` (see
  `packages/core/src/player/types.ts`). UI never calls audio libs directly.
- **Tests:** Vitest + React Testing Library (web); Jest + React Native Testing
  Library (mobile); Vitest for `@acme/core`.
- **DB types:** generate with `supabase gen types typescript` into `@acme/core`;
  all data access lives in `@acme/core` only.
- **Versions:** install latest stable and let the lockfile pin them. After
  installing Biome, run `pnpm biome migrate --write`. Adjust the `packageManager`
  field in `package.json` to your installed pnpm version.

## 4. Human-only prerequisites (the agent must NOT do these)

The agent cannot create accounts, enter credentials, or change hosting settings.
Ask the human to do these and provide values; the agent consumes them via env vars
and GitHub secrets:

- Create the **Supabase** project → provides `SUPABASE_URL`, `SUPABASE_ANON_KEY`,
  and (local only) `SUPABASE_SERVICE_ROLE_KEY`.
- Create or reuse the **Netlify** site on the existing domain + set its env vars.
- Create an **Expo** account → `EXPO_TOKEN`.
- Enrol **Apple Developer** (request the nonprofit fee waiver, free apps only) and
  create the App Store Connect app; create **Google Play Console** + a service
  account JSON.
- Add GitHub **secrets** (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `EXPO_TOKEN`).
- Import `.github/rulesets/main-protection.json` (Settings → Rules → Rulesets).

The agent must never commit secrets, never paste real keys into code or CI files,
and must flag (not silently add) any dependency beyond what a phase requires.

## 5. Phase 0 — exact deliverables

Already in the repo (do not recreate): `package.json`, `pnpm-workspace.yaml`,
`turbo.json`, `tsconfig.base.json`, `biome.jsonc`, `.gitignore`, `.env.example`,
all docs, `.github/**`, `scripts/**`, `supabase/migrations/**`,
`packages/design-tokens/**`, `packages/config/**`,
`packages/core/src/player/types.ts`, and both apps' `tailwind.config.js`.

Create in Phase 0:

- `packages/core/` → `package.json` (`@acme/core`), `tsconfig.json` (extends base),
  `src/index.ts` (re-export the player types), and a Vitest setup.
- `apps/web/` → `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`,
  `src/main.tsx`, `src/App.tsx`, `src/index.css` (Tailwind directives), React Router
  with one placeholder route, and Vitest config. Add `dev`/`build`/`typecheck`/
  `test` scripts.
- `apps/mobile/` → `package.json`, `app.config.ts`, `babel.config.js` (NativeWind
  preset), `metro.config.js`, `tsconfig.json`, `global.css`, and Expo Router entry
  (`app/_layout.tsx`, `app/index.tsx`). Add `start`/`build`/`typecheck`/`test`
  scripts. (Build on EAS, not in PR CI.)
- Ensure every package/app exposes `typecheck`, `test`, and `build` so the Turbo
  tasks resolve.

**Done when:** `pnpm install` is clean, `pnpm lint && pnpm typecheck && pnpm test &&
pnpm build` pass locally, an empty-feature PR turns CI green, and the PR cannot
merge until all checks (Lint, Typecheck, Test, Build, Security, CodeQL) pass.

Then continue with Phase 1 in `PLAN.md`.

---

## 6. Ready-to-paste prompt for a clean session

> You are starting work on this repository. Read `KICKOFF.md`, then `README.md`,
> `AGENTS.md`, `PLAN.md`, and `PROGRESS.md`. Follow the conventions in `AGENTS.md`
> exactly. Do not push to `main`; work in a branch and open a PR. Begin **Phase 0**
> as specified in `KICKOFF.md` section 5: scaffold the monorepo packages and the
> empty web and mobile apps so that `pnpm lint && pnpm typecheck && pnpm test &&
> pnpm build` all pass. Use the pinned decisions in `KICKOFF.md` section 3 — do not
> choose alternatives. For anything requiring an account, credential, or hosting
> setting (section 4), stop and ask me rather than attempting it. As you work,
> update `PROGRESS.md` after each task. When Phase 0's "Done when" checkpoint is met
> and CI is green, summarise what changed and ask before starting Phase 1.
