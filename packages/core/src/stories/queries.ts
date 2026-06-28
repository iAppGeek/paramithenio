import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database, NarratorVoice } from '../db/types.js';
import type { Narration, StoryDetail, StorySummary } from './types.js';

type StoryRow = Database['public']['Tables']['stories']['Row'];
type NarrationRow = Database['public']['Tables']['narrations']['Row'];
type StoryWithNarrations = StoryRow & { narrations: NarrationRow[] };

function resolveArtworkUrl(row: StoryRow, supabase: SupabaseClient<Database>): string | null {
  if (row.artwork_path === null) return null;
  return supabase.storage.from('artwork').getPublicUrl(row.artwork_path).data.publicUrl;
}

function toNarration(n: NarrationRow): Narration {
  return {
    id: n.id,
    narratorVoice: n.narrator_voice as NarratorVoice,
    audioPath: n.audio_path,
    durationSeconds: n.duration_seconds,
  };
}

function toSummary(row: StoryWithNarrations, supabase: SupabaseClient<Database>): StorySummary {
  return {
    id: row.id,
    slug: row.slug,
    titleEn: row.title_en,
    titleEl: row.title_el,
    artworkUrl: resolveArtworkUrl(row, supabase),
    category: row.category,
    tags: row.tags,
    availableVoices: row.narrations.map((n) => n.narrator_voice as NarratorVoice),
  };
}

function toDetail(row: StoryWithNarrations, supabase: SupabaseClient<Database>): StoryDetail {
  return {
    ...toSummary(row, supabase),
    descriptionEn: row.description_en,
    descriptionEl: row.description_el,
    narrations: row.narrations.map(toNarration),
  };
}

export async function fetchStories(supabase: SupabaseClient<Database>): Promise<StorySummary[]> {
  const result = await supabase
    .from('stories')
    .select('*, narrations(id, narrator_voice, audio_path, duration_seconds)')
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false });

  if (result.error !== null) throw new Error(result.error.message);
  const rows = (result.data ?? []) as StoryWithNarrations[];
  return rows.map((row) => toSummary(row, supabase));
}

export async function fetchStory(
  supabase: SupabaseClient<Database>,
  id: string,
): Promise<StoryDetail | null> {
  const result = await supabase
    .from('stories')
    .select('*, narrations(id, narrator_voice, audio_path, duration_seconds)')
    .eq('id', id)
    .maybeSingle();

  if (result.error !== null) throw new Error(result.error.message);
  if (result.data === null) return null;
  return toDetail(result.data as StoryWithNarrations, supabase);
}
