/**
 * Audio player contracts. This file pins the architecture: UI never talks to an
 * audio library directly — it drives a PlayerController, which talks to an
 * AudioAdapter. Mobile provides a react-native-track-player adapter; web provides
 * an HTML5 <audio> + Media Session adapter. See AGENTS.md → "audio player pattern".
 *
 * Phase 5a implements PlayerController + the web adapter; Phase 5b the mobile one.
 */

export interface Track {
  storyId: string;
  title: string;
  /** Public URL to the audio asset (from Supabase Storage / CDN). */
  url: string;
  /** Public URL to cover art, or null to use the default artwork. */
  artworkUrl: string | null;
  durationSeconds: number | null;
}

export type PlaybackState = 'idle' | 'loading' | 'playing' | 'paused' | 'ended';

/** Thin, swappable wrapper around a platform audio engine. */
export interface AudioAdapter {
  load(track: Track): Promise<void>;
  play(): Promise<void>;
  pause(): Promise<void>;
  seek(positionSeconds: number): Promise<void>;
  /** Fires roughly once per second while playing. Returns an unsubscribe fn. */
  onProgress(cb: (positionSeconds: number, durationSeconds: number) => void): () => void;
  onStateChange(cb: (state: PlaybackState) => void): () => void;
  onComplete(cb: () => void): () => void;
  teardown(): Promise<void>;
}

/** Side-effects the controller fans out to (progress persistence, analytics). */
export interface PlayerHooks {
  /** Debounced persistence of the listening position (-> Supabase `progress`). */
  onPersistProgress(storyId: string, positionSeconds: number, durationSeconds: number): void;
  onStarted(storyId: string): void;
  /** Heartbeat carrying seconds actually listened since the last beat. */
  onHeartbeat(storyId: string, listenedDeltaSeconds: number): void;
  onCompleted(storyId: string): void;
}

export interface SleepTimerOptions {
  durationSeconds: number;
  /** Seconds of volume fade before stopping. */
  fadeSeconds?: number;
}

/**
 * Platform-agnostic playback brain. Owns: debounced progress upserts, analytics
 * heartbeats, resume-from-position, and the sleep timer + fade. Implemented in
 * Phase 5a and unit-tested against a mock AudioAdapter.
 */
export interface PlayerController {
  loadAndPlay(track: Track, resumeFromSeconds?: number): Promise<void>;
  play(): Promise<void>;
  pause(): Promise<void>;
  seek(positionSeconds: number): Promise<void>;
  setSleepTimer(options: SleepTimerOptions | null): void;
  getState(): PlaybackState;
  destroy(): Promise<void>;
}
