import type { SupabaseClient } from '@supabase/supabase-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Database } from '../db/types.js';
import { fetchStories, fetchStory } from './queries.js';

type MockRow = Database['public']['Tables']['stories']['Row'];

const MOCK_ROW: MockRow = {
  id: 'uuid-1',
  slug: 'the-fox-and-the-grapes',
  title_en: 'The Fox and the Grapes',
  title_el: 'Η Αλεπού και τα Σταφύλια',
  description_en: 'A fox fails to reach ripe grapes.',
  description_el: 'Μια αλεπού αποτυγχάνει να φτάσει τα σταφύλια.',
  duration_seconds: 310,
  audio_path: 'the-fox-and-the-grapes.mp3',
  artwork_path: 'the-fox-and-the-grapes.jpg',
  tags: ['fox', 'grapes'],
  category: 'fable',
  published_at: '2024-01-01T00:00:00Z',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

function makeSupabase(
  overrides: {
    listData?: MockRow[] | null;
    listError?: { message: string } | null;
    singleData?: MockRow | null;
    singleError?: { message: string } | null;
  } = {},
): SupabaseClient<Database> {
  const {
    listData = [MOCK_ROW],
    listError = null,
    singleData = MOCK_ROW,
    singleError = null,
  } = overrides;

  const publicUrl =
    'https://project.supabase.co/storage/v1/object/public/artwork/the-fox-and-the-grapes.jpg';

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
        // First call returns list chain; subsequent calls return detail chain
        return callCount === 1 ? listChain : detailChain;
      }),
    })),
    storage: {
      from: vi.fn().mockReturnValue({
        getPublicUrl: vi.fn().mockReturnValue({ data: { publicUrl } }),
      }),
    },
  } as unknown as SupabaseClient<Database>;
}

describe('fetchStories', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns mapped StorySummary array', async () => {
    const supabase = makeSupabase();
    const result = await fetchStories(supabase);
    expect(result).toHaveLength(1);
    const story = result[0];
    expect(story?.id).toBe('uuid-1');
    expect(story?.titleEn).toBe('The Fox and the Grapes');
    expect(story?.titleEl).toBe('Η Αλεπού και τα Σταφύλια');
    expect(story?.durationSeconds).toBe(310);
    expect(story?.artworkUrl).toContain('the-fox-and-the-grapes.jpg');
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
  it('returns a StoryDetail for a known id', async () => {
    const sb = makeSupabase();
    // Reset call count by using dedicated mock
    const maybeSingle = vi.fn().mockResolvedValue({ data: MOCK_ROW, error: null });
    const supabase = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({ maybeSingle }),
        }),
      }),
      storage: sb.storage,
    } as unknown as SupabaseClient<Database>;

    const result = await fetchStory(supabase, 'uuid-1');
    expect(result).not.toBeNull();
    expect(result?.id).toBe('uuid-1');
    expect(result?.descriptionEn).toBe('A fox fails to reach ripe grapes.');
    expect(result?.audioPath).toBe('the-fox-and-the-grapes.mp3');
  });

  it('returns null when story is not found', async () => {
    const sb = makeSupabase();
    const maybeSingle = vi.fn().mockResolvedValue({ data: null, error: null });
    const supabase = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({ maybeSingle }),
        }),
      }),
      storage: sb.storage,
    } as unknown as SupabaseClient<Database>;

    const result = await fetchStory(supabase, 'unknown');
    expect(result).toBeNull();
  });

  it('throws when Supabase returns an error', async () => {
    const sb = makeSupabase();
    const maybeSingle = vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const supabase = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({ maybeSingle }),
        }),
      }),
      storage: sb.storage,
    } as unknown as SupabaseClient<Database>;

    await expect(fetchStory(supabase, 'x')).rejects.toThrow('Not found');
  });
});
