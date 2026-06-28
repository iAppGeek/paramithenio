import type { SupabaseClient } from '@supabase/supabase-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Database } from '../db/types.js';
import { fetchStories, fetchStory } from './queries.js';

type MockStoryRow = Database['public']['Tables']['stories']['Row'];
type MockNarrationRow = Database['public']['Tables']['narrations']['Row'];

const MOCK_NARRATION: MockNarrationRow = {
  id: 'narr-1',
  story_id: 'uuid-1',
  narrator_voice: 'female_adult',
  audio_path: 'the-fox-and-the-grapes/female_adult.mp3',
  duration_seconds: 310,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

const MOCK_ROW: MockStoryRow & { narrations: MockNarrationRow[] } = {
  id: 'uuid-1',
  slug: 'the-fox-and-the-grapes',
  title_en: 'The Fox and the Grapes',
  title_el: 'Η Αλεπού και τα Σταφύλια',
  description_en: 'A fox fails to reach ripe grapes.',
  description_el: 'Μια αλεπού αποτυγχάνει να φτάσει τα σταφύλια.',
  artwork_path: 'the-fox-and-the-grapes.jpg',
  tags: ['fox', 'grapes'],
  category: 'fable',
  published_at: '2024-01-01T00:00:00Z',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  narrations: [MOCK_NARRATION],
};

const PUBLIC_URL =
  'https://project.supabase.co/storage/v1/object/public/artwork/the-fox-and-the-grapes.jpg';

function makeSupabase(
  overrides: {
    listData?: (typeof MOCK_ROW)[] | null;
    listError?: { message: string } | null;
    singleData?: typeof MOCK_ROW | null;
    singleError?: { message: string } | null;
  } = {},
): SupabaseClient<Database> {
  const {
    listData = [MOCK_ROW],
    listError = null,
    singleData = MOCK_ROW,
    singleError = null,
  } = overrides;

  const maybeSingleFn = vi.fn().mockResolvedValue({ data: singleData, error: singleError });
  const listChain = {
    not: vi.fn().mockReturnThis(),
    lte: vi.fn().mockReturnThis(),
    order: vi.fn().mockResolvedValue({ data: listData, error: listError }),
  };
  const detailChain = {
    eq: vi.fn().mockReturnThis(),
    maybeSingle: maybeSingleFn,
  };

  let callCount = 0;

  return {
    from: vi.fn().mockImplementation(() => ({
      select: vi.fn().mockImplementation(() => {
        callCount++;
        return callCount === 1 ? listChain : detailChain;
      }),
    })),
    storage: {
      from: vi.fn().mockReturnValue({
        getPublicUrl: vi.fn().mockReturnValue({ data: { publicUrl: PUBLIC_URL } }),
      }),
    },
  } as unknown as SupabaseClient<Database>;
}

describe('fetchStories', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns mapped StorySummary array with availableVoices', async () => {
    const supabase = makeSupabase();
    const result = await fetchStories(supabase);
    expect(result).toHaveLength(1);
    const story = result[0];
    expect(story?.id).toBe('uuid-1');
    expect(story?.titleEn).toBe('The Fox and the Grapes');
    expect(story?.availableVoices).toEqual(['female_adult']);
    expect(story?.artworkUrl).toContain('the-fox-and-the-grapes.jpg');
  });

  it('returns empty availableVoices when story has no narrations', async () => {
    const supabase = makeSupabase({ listData: [{ ...MOCK_ROW, narrations: [] }] });
    const result = await fetchStories(supabase);
    expect(result[0]?.availableVoices).toEqual([]);
  });

  it('returns null artworkUrl when artwork_path is null', async () => {
    const supabase = makeSupabase({ listData: [{ ...MOCK_ROW, artwork_path: null }] });
    const result = await fetchStories(supabase);
    expect(result[0]?.artworkUrl).toBeNull();
  });

  it('throws when Supabase returns an error', async () => {
    const supabase = makeSupabase({ listData: null, listError: { message: 'DB error' } });
    await expect(fetchStories(supabase)).rejects.toThrow('DB error');
  });
});

describe('fetchStory', () => {
  it('returns StoryDetail with narrations for a known id', async () => {
    const sb = makeSupabase();
    const maybeSingle = vi.fn().mockResolvedValue({ data: MOCK_ROW, error: null });
    const supabase = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({ eq: vi.fn().mockReturnValue({ maybeSingle }) }),
      }),
      storage: sb.storage,
    } as unknown as SupabaseClient<Database>;

    const result = await fetchStory(supabase, 'uuid-1');
    expect(result).not.toBeNull();
    expect(result?.id).toBe('uuid-1');
    expect(result?.descriptionEn).toBe('A fox fails to reach ripe grapes.');
    expect(result?.narrations).toHaveLength(1);
    expect(result?.narrations[0]?.narratorVoice).toBe('female_adult');
    expect(result?.narrations[0]?.audioPath).toBe('the-fox-and-the-grapes/female_adult.mp3');
  });

  it('returns null when story is not found', async () => {
    const sb = makeSupabase();
    const maybeSingle = vi.fn().mockResolvedValue({ data: null, error: null });
    const supabase = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({ eq: vi.fn().mockReturnValue({ maybeSingle }) }),
      }),
      storage: sb.storage,
    } as unknown as SupabaseClient<Database>;

    expect(await fetchStory(supabase, 'unknown')).toBeNull();
  });

  it('throws when Supabase returns an error', async () => {
    const sb = makeSupabase();
    const maybeSingle = vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const supabase = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({ eq: vi.fn().mockReturnValue({ maybeSingle }) }),
      }),
      storage: sb.storage,
    } as unknown as SupabaseClient<Database>;

    await expect(fetchStory(supabase, 'x')).rejects.toThrow('Not found');
  });
});
