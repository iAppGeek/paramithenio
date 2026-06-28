import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from './HomePage';

function renderHomePage(): void {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
}

describe('HomePage', () => {
  it('renders the app title', () => {
    renderHomePage();
    expect(screen.getByRole('heading', { name: 'Παραμυθένιο' })).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    renderHomePage();
    expect(screen.getByText('Greek fables for children')).toBeInTheDocument();
  });

  it('renders all three story tiles', () => {
    renderHomePage();
    expect(screen.getByText('The Tortoise and the Hare')).toBeInTheDocument();
    expect(screen.getByText('The Fox and the Grapes')).toBeInTheDocument();
    expect(screen.getByText('The Ant and the Grasshopper')).toBeInTheDocument();
  });

  it('story tile is clickable', async () => {
    const user = userEvent.setup();
    renderHomePage();
    const tile = screen.getByRole('button', { name: /The Tortoise and the Hare/ });
    await user.click(tile);
  });
});
