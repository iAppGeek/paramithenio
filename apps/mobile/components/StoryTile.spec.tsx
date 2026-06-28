import { fireEvent, render, screen } from '@testing-library/react-native';
import { StoryTile } from './StoryTile';

const BASE_PROPS = {
  titleEn: 'The Tortoise and the Hare',
  titleEl: 'Ο Λαγός και η Χελώνα',
  durationSeconds: 300,
  artworkUrl: null,
};

describe('StoryTile', () => {
  it('renders the English title by default', () => {
    render(<StoryTile {...BASE_PROPS} />);
    expect(screen.getByText('The Tortoise and the Hare')).toBeTruthy();
  });

  it('renders the Greek title when locale is el', () => {
    render(<StoryTile {...BASE_PROPS} locale="el" />);
    expect(screen.getByText('Ο Λαγός και η Χελώνα')).toBeTruthy();
  });

  it('formats and shows the duration', () => {
    render(<StoryTile {...BASE_PROPS} />);
    expect(screen.getByText('5:00')).toBeTruthy();
  });

  it('hides duration when durationSeconds is null', () => {
    render(<StoryTile {...BASE_PROPS} durationSeconds={null} />);
    expect(screen.queryByText('5:00')).toBeNull();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(<StoryTile {...BASE_PROPS} onPress={onPress} />);
    fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
