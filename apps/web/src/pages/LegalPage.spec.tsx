import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LegalPage } from './LegalPage';

function renderLegalPage(path = '/legal'): void {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/legal/*" element={<LegalPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('LegalPage', () => {
  it('renders the legal title', () => {
    renderLegalPage();
    expect(screen.getByRole('heading', { name: 'Legal' })).toBeInTheDocument();
  });

  it('renders links to Privacy Policy and Terms of Use on index', () => {
    renderLegalPage();
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Terms of Use' })).toBeInTheDocument();
  });

  it('renders the Privacy Policy page', () => {
    renderLegalPage('/legal/privacy');
    expect(screen.getByRole('heading', { name: 'Privacy Policy' })).toBeInTheDocument();
    expect(screen.getByText('Content coming soon.')).toBeInTheDocument();
  });

  it('renders the Terms of Use page', () => {
    renderLegalPage('/legal/terms');
    expect(screen.getByRole('heading', { name: 'Terms of Use' })).toBeInTheDocument();
    expect(screen.getByText('Content coming soon.')).toBeInTheDocument();
  });
});
