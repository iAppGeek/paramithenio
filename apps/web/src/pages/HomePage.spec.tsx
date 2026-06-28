import type { StorySummary } from '@acme/core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { HomePage } from './HomePage';

vi.mock('@acme/core', () => ({
  useStories: vi.fn(),
}));

import { useStories } from '@acme/core';

const MOCK_STORIES: StorySummary[] = [
  {
    id: 'uuid-1',
    slug: 'tortoise-hare',
    titleEn: 'The Tortoise and the Hare',
    titleEl: 'Ο Λαγός και η Χελώνα',
    durationSeconds: 420,
    artworkUrl: null,
    category: 'fable',
    tags: [],
  },
  {
    id: 'uuid-2',
    slug: 'fox-grapes',
    titleEn: 'The Fox and the Grapes',
    titleEl: 'Η Αλεπού και τα Σταφύλια',
    durationSeconds: 310,
    artworkUrl: null,
    category: 'fable',
    tags: [],
  },
];

function renderHomePage(): void {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
}

describe('HomePage', () => {
  it('renders the app title', () => {
    vi.mocked(useStories).mockReturnValue({
      data: MOCK_STORIES,
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useStories>);
    renderHomePage();
    expect(screen.getByRole('heading', { name: 'Παραμυθένιο' })).toBeInTheDocument();
  });

  it('renders story tiles when data is loaded', () => {
    vi.mocked(useStories).mockReturnValue({
      data: MOCK_STORIES,
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useStories>);
    renderHomePage();
    expect(screen.getByText('The Tortoise and the Hare')).toBeInTheDocument();
    expect(screen.getByText('The Fox and the Grapes')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    vi.mocked(useStories).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as ReturnType<typeof useStories>);
    renderHomePage();
    expect(screen.getByText('Loading stories…')).toBeInTheDocument();
  });

  it('renders error state', () => {
    vi.mocked(useStories).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as ReturnType<typeof useStories>);
    renderHomePage();
    expect(screen.getByText('Could not load stories.')).toBeInTheDocument();
  });

  it('renders empty state when no stories', () => {
    vi.mocked(useStories).mockReturnValue({
      data: [] as StorySummary[],
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useStories>);
    renderHomePage();
    expect(screen.getByText('No stories yet.')).toBeInTheDocument();
  });

  it('story tile is clickable', async () => {
    vi.mocked(useStories).mockReturnValue({
      data: MOCK_STORIES,
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useStories>);
    const user = userEvent.setup();
    renderHomePage();
    const tile = screen.getByRole('button', { name: /The Tortoise and the Hare/ });
    await user.click(tile);
  });
});
