import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StoryTile } from './StoryTile';

const BASE_PROPS = {
  titleEn: 'The Tortoise and the Hare',
  titleEl: 'Ο Λαγός και η Χελώνα',
  artworkUrl: null,
};

describe('StoryTile', () => {
  it('renders the English title by default', () => {
    render(<StoryTile {...BASE_PROPS} />);
    expect(screen.getByText('The Tortoise and the Hare')).toBeInTheDocument();
  });

  it('renders the Greek title when locale is el', () => {
    render(<StoryTile {...BASE_PROPS} locale="el" />);
    expect(screen.getByText('Ο Λαγός και η Χελώνα')).toBeInTheDocument();
  });

  it('calls onPress when clicked', async () => {
    const onPress = vi.fn();
    render(<StoryTile {...BASE_PROPS} onPress={onPress} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledOnce();
  });

  it('renders artwork image when artworkUrl is provided', () => {
    render(<StoryTile {...BASE_PROPS} artworkUrl="https://example.com/art.jpg" />);
    expect(screen.getByAltText(BASE_PROPS.titleEn)).toBeInTheDocument();
  });
});
