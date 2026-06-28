import type { StorySummary } from '@acme/core';
import { render, screen } from '@testing-library/react-native';
import HomeScreen from '../app/(tabs)/index';

jest.mock('@acme/core', () => ({
  useStories: jest.fn(),
}));

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

import { useStories } from '@acme/core';

const MOCK_STORIES: StorySummary[] = [
  {
    id: 'uuid-1',
    slug: 'tortoise-hare',
    titleEn: 'The Tortoise and the Hare',
    titleEl: 'Ο Λαγός και η Χελώνα',
    artworkUrl: null,
    category: 'fable',
    tags: [],
    availableVoices: ['female_adult'],
  },
  {
    id: 'uuid-2',
    slug: 'fox-grapes',
    titleEn: 'The Fox and the Grapes',
    titleEl: 'Η Αλεπού και τα Σταφύλια',
    artworkUrl: null,
    category: 'fable',
    tags: [],
    availableVoices: ['female_adult'],
  },
];

describe('HomeScreen', () => {
  it('renders story tiles when loaded', () => {
    (useStories as jest.Mock).mockReturnValue({
      data: MOCK_STORIES,
      isLoading: false,
      isError: false,
    });
    render(<HomeScreen />);
    expect(screen.getByText('The Tortoise and the Hare')).toBeTruthy();
    expect(screen.getByText('The Fox and the Grapes')).toBeTruthy();
  });

  it('renders loading state', () => {
    (useStories as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    render(<HomeScreen />);
    expect(screen.getByText('Loading stories…')).toBeTruthy();
  });

  it('renders error state', () => {
    (useStories as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });
    render(<HomeScreen />);
    expect(screen.getByText('Could not load stories.')).toBeTruthy();
  });

  it('renders empty state when no stories', () => {
    (useStories as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });
    render(<HomeScreen />);
    expect(screen.getByText('No stories yet.')).toBeTruthy();
  });

  it('renders the app title', () => {
    (useStories as jest.Mock).mockReturnValue({
      data: MOCK_STORIES,
      isLoading: false,
      isError: false,
    });
    render(<HomeScreen />);
    expect(screen.getByText('Παραμυθένιο')).toBeTruthy();
  });
});
