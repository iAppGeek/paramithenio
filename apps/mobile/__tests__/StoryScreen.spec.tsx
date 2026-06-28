import type { StoryDetail } from '@acme/core';
import { render, screen } from '@testing-library/react-native';
import StoryScreen from '../app/story/[id]';

jest.mock('@acme/core', () => ({
  useStory: jest.fn(),
}));

jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({ id: 'uuid-1' }),
  useRouter: () => ({ back: jest.fn() }),
}));

import { useStory } from '@acme/core';

const MOCK_STORY: StoryDetail = {
  id: 'uuid-1',
  slug: 'fox-grapes',
  titleEn: 'The Fox and the Grapes',
  titleEl: 'Η Αλεπού και τα Σταφύλια',
  artworkUrl: null,
  category: 'fable',
  tags: [],
  availableVoices: ['female_adult'],
  descriptionEn: 'A fox fails to reach ripe grapes.',
  descriptionEl: 'Μια αλεπού αποτυγχάνει.',
  narrations: [
    {
      id: 'n1',
      narratorVoice: 'female_adult',
      audioPath: 'fox-grapes/female_adult.mp3',
      durationSeconds: 310,
    },
  ],
};

describe('StoryScreen', () => {
  it('renders story title on success', () => {
    (useStory as jest.Mock).mockReturnValue({
      data: MOCK_STORY,
      isLoading: false,
      isError: false,
    });
    render(<StoryScreen />);
    expect(screen.getByText('The Fox and the Grapes')).toBeTruthy();
  });

  it('renders description when available', () => {
    (useStory as jest.Mock).mockReturnValue({
      data: MOCK_STORY,
      isLoading: false,
      isError: false,
    });
    render(<StoryScreen />);
    expect(screen.getByText('A fox fails to reach ripe grapes.')).toBeTruthy();
  });

  it('renders loading state', () => {
    (useStory as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    render(<StoryScreen />);
    expect(screen.getByText('Loading stories…')).toBeTruthy();
  });

  it('renders not found when story is null', () => {
    (useStory as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });
    render(<StoryScreen />);
    expect(screen.getByText('Story not found.')).toBeTruthy();
  });

  it('renders back button', () => {
    (useStory as jest.Mock).mockReturnValue({
      data: MOCK_STORY,
      isLoading: false,
      isError: false,
    });
    render(<StoryScreen />);
    expect(screen.getByText('← Back')).toBeTruthy();
  });
});
