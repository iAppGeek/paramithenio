import { render, screen } from '@testing-library/react';
import { Text } from './Text';

describe('Text', () => {
  it('renders children as a paragraph by default', () => {
    render(<Text>Hello world</Text>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders h1 variant as an h1 element', () => {
    render(<Text variant="h1">Title</Text>);
    expect(screen.getByRole('heading', { level: 1, name: 'Title' })).toBeInTheDocument();
  });

  it('renders h2 variant as an h2 element', () => {
    render(<Text variant="h2">Subtitle</Text>);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders Greek characters', () => {
    render(<Text>Ο Λαγός και η Χελώνα</Text>);
    expect(screen.getByText('Ο Λαγός και η Χελώνα')).toBeInTheDocument();
  });

  it('forwards extra className', () => {
    render(<Text className="mt-4">Text</Text>);
    expect(screen.getByText('Text').className).toContain('mt-4');
  });
});
