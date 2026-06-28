# AGENTS.md — Coding conventions (binding)

All contributors and AI agents must follow these conventions exactly. When in doubt, read this file before writing code.

> Mobile-specific overrides live in `apps/mobile/AGENTS.md`.

---

## Package scope

Every workspace package is scoped `@acme` — e.g. `@acme/core`, `@acme/design-tokens`, `@acme/config`.

---

## TypeScript

- Explicit return types on all exported functions and React components.
- No `any`. Use `unknown` and narrow it, or `never` where appropriate.
- Prefer `type` over `interface` unless you need declaration merging.
- `verbatimModuleSyntax` is on — use `import type` for type-only imports.
- `noUncheckedIndexedAccess` is on — array/object index access returns `T | undefined`.

---

## Styling

- **Web:** Tailwind CSS classes only. No CSS-in-JS, no inline `style={}` with hardcoded values.
- **Mobile:** NativeWind className prop. No `StyleSheet.create` with hardcoded values.
- Both platforms consume `@acme/config/tailwind-preset`, which maps design tokens from `@acme/design-tokens`.
- **Never hardcode** colours, spacing, font sizes, border radii, or shadow values — always use a token class.

---

## Internationalization (i18n)

- Library: `react-i18next`. Namespaces: `en` (English, fallback) and `el` (Greek).
- Every user-visible string must go through `useTranslation` — no hard-coded UI text.
- Translation keys are namespaced by feature: e.g. `player.playButton`, `library.emptyState`.

---

## State management

- **Server/async state:** TanStack Query (`@tanstack/react-query`). All data fetching goes through Query hooks exported from `@acme/core`.
- **Local/UI state:** Zustand stores defined in the app package (`apps/web/src/store/`, `apps/mobile/src/store/`).
- No Redux, no Context for global state.

---

## Audio player pattern

UI components **never** call audio library APIs directly. The hierarchy is:

```
UI → PlayerController → AudioAdapter (platform-specific)
```

- `PlayerController` and `AudioAdapter` types live in `@acme/core/src/player/types.ts`.
- **Web:** `HtmlAudioAdapter` wraps HTML5 `<audio>` + Media Session API.
- **Mobile:** `TrackPlayerAdapter` wraps `react-native-track-player`.
- Both adapters are implemented in their respective app packages; `@acme/core` owns only the contracts.

---

## Database

- All Supabase access lives in `@acme/core`. Apps only import typed hooks from `@acme/core`.
- Never import `@supabase/supabase-js` directly in `apps/web` or `apps/mobile`.
- Generate types with `supabase gen types typescript --local > packages/core/src/db/types.ts` after every schema migration.
- Row Level Security (RLS) is required on every table. No `service_role` key in client code.

---

## Testing

- **`@acme/core` and `apps/web`:** Vitest + React Testing Library.
- **`apps/mobile`:** Jest + React Native Testing Library.
- Test files sit alongside source: `src/foo.ts` → `src/foo.spec.ts`.
- E2E tests (Playwright web, Detox mobile) live under `e2e/`.
- Use `vi.mock()`, `vi.spyOn()`, `vi.fn()` — never `jest.mock()` in web/core tests.
- Every new exported function or React component needs a corresponding `.spec` file.

---

## Commits and PRs

- **Never push directly to `main`.** Work in a feature branch; open a PR.
- Run `pnpm lint && pnpm typecheck && pnpm test && pnpm build` and fix all failures before opening a PR.
- All six CI jobs (Lint, Typecheck, Test, Build, Security, CodeQL) must be green to merge.
- Mobile builds run on EAS, not in PR CI. The CI `build` job only covers web and packages.
- Update `PROGRESS.md` after every completed task.
- Log significant decisions (trade-offs, tech choices) in the **Decisions log** section of `PROGRESS.md`.
