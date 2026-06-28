import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NavBar } from './NavBar';

function renderNavBar(initialPath = '/'): void {
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <NavBar />
    </MemoryRouter>,
  );
}

describe('NavBar', () => {
  it('renders the app title link', () => {
    renderNavBar();
    expect(screen.getByRole('link', { name: 'Παραμυθένιο' })).toBeInTheDocument();
  });

  it('renders Home, Settings, and Legal nav links', () => {
    renderNavBar();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Settings' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Legal' })).toBeInTheDocument();
  });

  it('highlights the active Home link when at root path', () => {
    renderNavBar('/');
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink.className).toContain('text-amber-600');
  });

  it('highlights the active Settings link when on /settings', () => {
    renderNavBar('/settings');
    const settingsLink = screen.getByRole('link', { name: 'Settings' });
    expect(settingsLink.className).toContain('text-amber-600');
  });
});
