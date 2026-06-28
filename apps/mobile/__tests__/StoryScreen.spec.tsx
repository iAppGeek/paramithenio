import { render, screen } from '@testing-library/react-native';
import StoryScreen from '../app/story/[id]';

let mockStoryId = '1';

jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({ id: mockStoryId }),
  useRouter: () => ({ back: jest.fn() }),
}));

describe('StoryScreen', () => {
  beforeEach(() => {
    mockStoryId = '1';
  });

  it('renders the story title', () => {
    render(<StoryScreen />);
    expect(screen.getByText('The Tortoise and the Hare')).toBeTruthy();
  });

  it('renders the content placeholder', () => {
    render(<StoryScreen />);
    expect(screen.getByText('Audio story coming soon.')).toBeTruthy();
  });

  it('renders a back button', () => {
    render(<StoryScreen />);
    expect(screen.getByText('← Back')).toBeTruthy();
  });

  it('renders not found message for unknown id', () => {
    mockStoryId = '999';
    render(<StoryScreen />);
    expect(screen.getByText('Story not found.')).toBeTruthy();
  });
});
