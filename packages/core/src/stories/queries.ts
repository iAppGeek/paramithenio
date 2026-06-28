import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../db/types.js';
import type { StoryDetail, StorySummary } from './types.js';

type Row = Database['public']['Tables']['stories']['Row'];

function toSummary(row: Row, supabase: SupabaseClient<Database>): StorySummary {
  const artworkUrl =
    row.artwork_path !== null
      ? supabase.storage.from('artwork').getPublicUrl(row.artwork_path).data.publicUrl
      : null;

  return {
    id: row.id,
    slug: row.slug,
    titleEn: row.title_en,
    titleEl: row.title_el,
    durationSeconds: row.duration_seconds,
    artworkUrl,
    category: row.category,
    tags: row.tags,
  };
}

function toDetail(row: Row, supabase: SupabaseClient<Database>): StoryDetail {
  return {
    ...toSummary(row, supabase),
    descriptionEn: row.description_en,
    descriptionEl: row.description_el,
    audioPath: row.audio_path,
  };
}

export async function fetchStories(supabase: SupabaseClient<Database>): Promise<StorySummary[]> {
  const result = await supabase
    .from('stories')
    .select('*')
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false });

  if (result.error !== null) throw new Error(result.error.message);
  const rows: Row[] = result.data ?? [];
  return rows.map((row) => toSummary(row, supabase));
}

export async function fetchStory(
  supabase: SupabaseClient<Database>,
  id: string,
): Promise<StoryDetail | null> {
  const { data, error } = await supabase.from('stories').select('*').eq('id', id).maybeSingle();

  if (error !== null) throw new Error(error.message);
  if (data === null) return null;
  return toDetail(data, supabase);
}
