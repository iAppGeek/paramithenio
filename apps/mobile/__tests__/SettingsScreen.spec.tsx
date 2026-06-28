import { fireEvent, render, screen } from '@testing-library/react-native';
import SettingsScreen from '../app/(tabs)/settings';
import i18n from '../i18n/index';

describe('SettingsScreen', () => {
  beforeEach(() => {
    void i18n.changeLanguage('en');
  });

  it('renders the settings title', () => {
    render(<SettingsScreen />);
    expect(screen.getByText('Settings')).toBeTruthy();
  });

  it('renders language toggle buttons', () => {
    render(<SettingsScreen />);
    expect(screen.getByText('English')).toBeTruthy();
    expect(screen.getByText('Ελληνικά')).toBeTruthy();
  });

  it('changes language to Greek when Ελληνικά is pressed', () => {
    render(<SettingsScreen />);
    fireEvent.press(screen.getByText('Ελληνικά'));
    expect(i18n.language).toBe('el');
  });

  it('changes language back to English when English is pressed', () => {
    void i18n.changeLanguage('el');
    render(<SettingsScreen />);
    fireEvent.press(screen.getByText('English'));
    expect(i18n.language).toBe('en');
  });
});
