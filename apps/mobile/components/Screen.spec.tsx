import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Screen } from './Screen';

describe('Screen', () => {
  it('renders its children', () => {
    render(
      <Screen>
        <Text>Content</Text>
      </Screen>,
    );
    expect(screen.getByText('Content')).toBeTruthy();
  });
});
