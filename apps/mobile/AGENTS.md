@AGENTS.md

# Mobile-specific overrides

## Build

- **Never use Expo Go** — `react-native-track-player` requires a native dev build.
- Build locally: `npx expo run:ios` / `npx expo run:android`
- CI and release builds run on **EAS** (`eas build`); no native build steps in the CI workflow.

## Testing

- Test runner: **Jest** (`jest-expo` preset).
- Assertion library: **React Native Testing Library** (`@testing-library/react-native`).
- Use `jest.mock()` for React Native modules; use `vi.mock()` only in packages that run in Vitest.

## Audio

- The mobile `AudioAdapter` is `TrackPlayerAdapter` in `apps/mobile/src/player/TrackPlayerAdapter.ts`.
- Configure iOS audio session category to `playback` so audio continues in background.
- Wrap the Android player in a foreground service via the `react-native-track-player` service file.
