import type { StoryDetail } from '@acme/core';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import { StoryPage } from './StoryPage';

vi.mock('@acme/core', () => ({
  useStory: vi.fn(),
}));

import { useStory } from '@acme/core';

const MOCK_STORY: StoryDetail = {
  id: 'uuid-1',
  slug: 'fox-grapes',
  titleEn: 'The Fox and the Grapes',
  titleEl: 'Η Αλεπού και τα Σταφύλια',
  durationSeconds: 310,
  artworkUrl: null,
  category: 'fable',
  tags: [],
  descriptionEn: 'A fox fails to reach ripe grapes.',
  descriptionEl: 'Μια αλεπού αποτυγχάνει.',
  audioPath: 'fox-grapes.mp3',
};

function renderStoryPage(id = 'uuid-1'): void {
  render(
    <MemoryRouter initialEntries={[`/story/${id}`]}>
      <Routes>
        <Route path="/story/:id" element={<StoryPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('StoryPage', () => {
  it('renders story title and description on success', () => {
    vi.mocked(useStory).mockReturnValue({
      data: MOCK_STORY,
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useStory>);
    renderStoryPage();
    expect(screen.getByRole('heading', { name: 'The Fox and the Grapes' })).toBeInTheDocument();
    expect(screen.getByText('A fox fails to reach ripe grapes.')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    vi.mocked(useStory).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as ReturnType<typeof useStory>);
    renderStoryPage();
    expect(screen.getByText('Loading stories…')).toBeInTheDocument();
  });

  it('renders not found when story is null', () => {
    vi.mocked(useStory).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useStory>);
    renderStoryPage('unknown');
    expect(screen.getByText('Story not found.')).toBeInTheDocument();
  });

  it('renders a back link', () => {
    vi.mocked(useStory).mockReturnValue({
      data: MOCK_STORY,
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useStory>);
    renderStoryPage();
    expect(screen.getByRole('link', { name: '← Back' })).toBeInTheDocument();
  });
});
