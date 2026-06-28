import { render, screen } from '@testing-library/react-native';
import HomeScreen from '../app/(tabs)/index';

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('HomeScreen', () => {
  it('renders the app title', () => {
    render(<HomeScreen />);
    expect(screen.getByText('Παραμυθένιο')).toBeTruthy();
  });

  it('renders the subtitle', () => {
    render(<HomeScreen />);
    expect(screen.getByText('Greek fables for children')).toBeTruthy();
  });

  it('renders all three story tiles', () => {
    render(<HomeScreen />);
    expect(screen.getByText('The Tortoise and the Hare')).toBeTruthy();
    expect(screen.getByText('The Fox and the Grapes')).toBeTruthy();
    expect(screen.getByText('The Ant and the Grasshopper')).toBeTruthy();
  });
});
