export type { NarratorVoice } from '../db/narrator-voice.js';

import type { NarratorVoice } from '../db/narrator-voice.js';

export type Narration = {
  id: string;
  narratorVoice: NarratorVoice;
  audioPath: string;
  durationSeconds: number | null;
};

export type StorySummary = {
  id: string;
  slug: string;
  titleEn: string;
  titleEl: string;
  artworkUrl: string | null;
  category: string | null;
  tags: string[];
  availableVoices: NarratorVoice[];
};

export type StoryDetail = StorySummary & {
  descriptionEn: string | null;
  descriptionEl: string | null;
  narrations: Narration[];
};
