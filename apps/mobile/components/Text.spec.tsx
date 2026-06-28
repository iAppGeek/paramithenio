import { render, screen } from '@testing-library/react-native';
import { Text } from './Text';

describe('Text', () => {
  it('renders children', () => {
    render(<Text>Hello world</Text>);
    expect(screen.getByText('Hello world')).toBeTruthy();
  });

  it('renders Greek characters', () => {
    render(<Text>Ο Λαγός και η Χελώνα</Text>);
    expect(screen.getByText('Ο Λαγός και η Χελώνα')).toBeTruthy();
  });

  it('renders h1 variant', () => {
    render(<Text variant="h1">Παραμυθένιο</Text>);
    expect(screen.getByText('Παραμυθένιο')).toBeTruthy();
  });
});
