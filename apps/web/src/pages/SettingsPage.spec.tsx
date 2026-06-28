import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18n from '../i18n/index.js';
import { SettingsPage } from './SettingsPage';

function renderSettingsPage(): void {
  render(<SettingsPage />);
}

describe('SettingsPage', () => {
  beforeEach(() => {
    void i18n.changeLanguage('en');
  });

  it('renders the settings title', () => {
    renderSettingsPage();
    expect(screen.getByRole('heading', { name: 'Settings' })).toBeInTheDocument();
  });

  it('renders language toggle buttons', () => {
    renderSettingsPage();
    expect(screen.getByRole('button', { name: 'English' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ελληνικά' })).toBeInTheDocument();
  });

  it('switches to Greek when Ελληνικά is clicked', async () => {
    const user = userEvent.setup();
    renderSettingsPage();
    await user.click(screen.getByRole('button', { name: 'Ελληνικά' }));
    expect(i18n.language).toBe('el');
    void i18n.changeLanguage('en');
  });

  it('switches back to English when English is clicked', async () => {
    const user = userEvent.setup();
    void i18n.changeLanguage('el');
    renderSettingsPage();
    await user.click(screen.getByRole('button', { name: 'English' }));
    expect(i18n.language).toBe('en');
  });
});
