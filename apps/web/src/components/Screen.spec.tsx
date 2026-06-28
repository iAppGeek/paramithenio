import { render, screen } from '@testing-library/react';
import { Screen } from './Screen';

describe('Screen', () => {
  it('renders its children', () => {
    render(
      <Screen>
        <p>Content</p>
      </Screen>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('forwards extra className', () => {
    const { container } = render(<Screen className="px-4">Content</Screen>);
    expect(container.firstChild).toHaveClass('px-4');
  });
});
