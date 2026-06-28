import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { getSupabase } from '../db/client.js';
import { fetchStories, fetchStory } from './queries.js';
import type { StoryDetail, StorySummary } from './types.js';

export function useStories(): UseQueryResult<StorySummary[]> {
  return useQuery({
    queryKey: ['stories'],
    queryFn: () => fetchStories(getSupabase()),
  });
}

export function useStory(id: string): UseQueryResult<StoryDetail | null> {
  return useQuery({
    queryKey: ['stories', id],
    queryFn: () => fetchStory(getSupabase(), id),
    enabled: id.length > 0,
  });
}
