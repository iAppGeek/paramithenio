import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { StoryPage } from './StoryPage';

function renderStoryPage(id: string): void {
  render(
    <MemoryRouter initialEntries={[`/story/${id}`]}>
      <Routes>
        <Route path="/story/:id" element={<StoryPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('StoryPage', () => {
  it('renders the story title for a known id', () => {
    renderStoryPage('1');
    expect(screen.getByRole('heading', { name: 'The Tortoise and the Hare' })).toBeInTheDocument();
  });

  it('renders the content placeholder', () => {
    renderStoryPage('1');
    expect(screen.getByText('Audio story coming soon.')).toBeInTheDocument();
  });

  it('renders a back link', () => {
    renderStoryPage('1');
    expect(screen.getByRole('link', { name: '← Back' })).toBeInTheDocument();
  });

  it('renders not found message for unknown id', () => {
    renderStoryPage('999');
    expect(screen.getByText('Story not found.')).toBeInTheDocument();
  });
});
