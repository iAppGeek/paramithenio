// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { ComponentType, ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useStories, useStory } from './hooks.js';
import type { StorySummary } from './types.js';

vi.mock('../db/client.js', () => ({ getSupabase: vi.fn() }));
vi.mock('./queries.js', () => ({
  fetchStories: vi.fn(),
  fetchStory: vi.fn(),
}));

import { getSupabase } from '../db/client.js';
import { fetchStories, fetchStory } from './queries.js';

const MOCK_STORY: StorySummary = {
  id: 'uuid-1',
  slug: 'fox-grapes',
  titleEn: 'The Fox and the Grapes',
  titleEl: 'Η Αλεπού και τα Σταφύλια',
  artworkUrl: null,
  category: 'fable',
  tags: ['fox'],
  availableVoices: ['female_adult'],
};

function createWrapper(): ComponentType<{ children: ReactNode }> {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe('useStories', () => {
  beforeEach(() => {
    vi.mocked(getSupabase).mockReturnValue({} as ReturnType<typeof getSupabase>);
    vi.mocked(fetchStories).mockResolvedValue([MOCK_STORY]);
  });

  it('returns story list on success', async () => {
    const { result } = renderHook(() => useStories(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(1);
    expect(result.current.data?.[0]?.titleEn).toBe('The Fox and the Grapes');
  });

  it('returns error state when fetchStories throws', async () => {
    vi.mocked(fetchStories).mockRejectedValue(new Error('DB error'));
    const { result } = renderHook(() => useStories(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe('useStory', () => {
  beforeEach(() => {
    vi.mocked(getSupabase).mockReturnValue({} as ReturnType<typeof getSupabase>);
    vi.mocked(fetchStory).mockResolvedValue({
      ...MOCK_STORY,
      descriptionEn: 'A fox fails to reach ripe grapes.',
      descriptionEl: 'Μια αλεπού αποτυγχάνει να φτάσει τα σταφύλια.',
      narrations: [
        {
          id: 'n1',
          narratorVoice: 'female_adult',
          audioPath: 'fox-grapes/female_adult.mp3',
          durationSeconds: 310,
        },
      ],
    });
  });

  it('returns story detail on success', async () => {
    const { result } = renderHook(() => useStory('uuid-1'), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.narrations[0]?.audioPath).toBe('fox-grapes/female_adult.mp3');
  });

  it('is disabled when id is empty', () => {
    const { result } = renderHook(() => useStory(''), { wrapper: createWrapper() });
    expect(result.current.fetchStatus).toBe('idle');
  });
});
