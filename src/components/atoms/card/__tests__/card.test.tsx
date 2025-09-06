import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardImage, CardBadge, CardElevated, CardInteractive } from '../card';

// Mock the useTextDirection hook
const mockUseTextDirection = vi.fn(() => 'ltr');
vi.mock('@/hooks/useTextDirection', () => ({
  useTextDirection: mockUseTextDirection,
}));

describe('Card Component', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Card</CardTitle>
            <CardDescription>Test description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Test content</p>
          </CardContent>
        </Card>
      );
      
      expect(screen.getByText('Test Card')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Card className="custom-class">Test</Card>);
      
      const card = screen.getByText('Test').closest('div');
      expect(card).toHaveClass('custom-class');
    });

    it('renders with custom data attributes', () => {
      render(<Card data-testid="custom-card">Test</Card>);
      
      expect(screen.getByTestId('custom-card')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Card>Test</Card>);
      
      const card = screen.getByText('Test').closest('div');
      expect(card).toHaveClass('border-border', 'bg-background');
    });

    it('renders elevated variant', () => {
      render(<Card variant="elevated">Test</Card>);
      
      const card = screen.getByText('Test').closest('div');
      expect(card).toHaveClass('shadow-md', 'hover:shadow-lg');
    });

    it('renders outlined variant', () => {
      render(<Card variant="outlined">Test</Card>);
      
      const card = screen.getByText('Test').closest('div');
      expect(card).toHaveClass('border-2', 'bg-transparent');
    });

    it('renders filled variant', () => {
      render(<Card variant="filled">Test</Card>);
      
      const card = screen.getByText('Test').closest('div');
      expect(card).toHaveClass('border-transparent', 'bg-muted');
    });

    it('renders gradient variant', () => {
      render(<Card variant="gradient">Test</Card>);
      
      const card = screen.getByText('Test').closest('div');
      expect(card).toHaveClass('bg-gradient-to-br', 'from-background', 'to-muted');
    });

    it('renders glass variant', () => {
      render(<Card variant="glass">Test</Card>);
      
      const card = screen.getByText('Test').closest('div');
      expect(card).toHaveClass('border-border/50', 'bg-background/80', 'backdrop-blur-sm');
    });

    it('renders flat variant', () => {
      render(<Card variant="flat">Test</Card>);
      
      const card = screen.getByText('Test').closest('div');
      expect(card).toHaveClass('border-transparent', 'bg-background', 'shadow-none');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Card size="sm">Test</Card>);
      
      const card = screen.getByText('Test').closest('div');
      expect(card).toHaveClass('p-3');
    });

    it('renders medium size by default', () => {
      render(<Card>Test</Card>);
      
      const card = screen.getByText('Test').closest('div');
      expect(card).toHaveClass('p-4');
    });

    it('renders large size', () => {
      render(<Card size="lg">Test</Card>);
      
      const card = screen.getByText('Test').closest('div');
      expect(card).toHaveClass('p-6');
    });

    it('renders extra large size', () => {
      render(<Card size="xl">Test</Card>);
      
      const card = screen.getByText('Test').closest('div');
      expect(card).toHaveClass('p-8');
    });
  });

  describe('Interactive States', () => {
    it('renders interactive card', () => {
      render(<Card interactive>Test</Card>);
      
      const card = screen.getByText('Test').closest('div');
      expect(card).toHaveClass('cursor-pointer', 'hover:shadow-md', 'hover:-translate-y-1');
    });

    it('renders non-interactive card by default', () => {
      render(<Card>Test</Card>);
      
      const card = screen.getByText('Test').closest('div');
      expect(card).not.toHaveClass('cursor-pointer');
    });
  });

  describe('Animation States', () => {
    it('renders animated card by default', () => {
      render(<Card>Test</Card>);
      
      const card = screen.getByText('Test').closest('div');
      expect(card).toHaveClass('transition-all', 'duration-300', 'ease-in-out');
    });

    it('renders non-animated card when animated is false', () => {
      render(<Card animated={false}>Test</Card>);
      
      const card = screen.getByText('Test').closest('div');
      expect(card).not.toHaveClass('transition-all', 'duration-300', 'ease-in-out');
    });
  });

  describe('AsChild', () => {
    it('renders as child component when asChild is true', () => {
      render(
        <Card asChild>
          <article>
            <h1>Article Title</h1>
            <p>Article content</p>
          </article>
        </Card>
      );
      
      expect(screen.getByText('Article Title')).toBeInTheDocument();
      expect(screen.getByText('Article content')).toBeInTheDocument();
    });

    it('applies card classes to child element when asChild is true', () => {
      render(
        <Card asChild variant="elevated" size="lg">
          <div data-testid="child-element">Test</div>
        </Card>
      );
      
      const child = screen.getByTestId('child-element');
      expect(child).toHaveClass('shadow-md', 'hover:shadow-lg', 'p-6');
    });
  });

  describe('Card Sub-components', () => {
    it('renders CardHeader with correct classes', () => {
      render(
        <Card>
          <CardHeader data-testid="card-header">
            <CardTitle>Title</CardTitle>
          </CardHeader>
        </Card>
      );
      
      const header = screen.getByTestId('card-header');
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6');
    });

    it('renders CardTitle with correct classes', () => {
      render(
        <Card>
          <CardTitle data-testid="card-title">Title</CardTitle>
        </Card>
      );
      
      const title = screen.getByTestId('card-title');
      expect(title).toHaveClass('text-2xl', 'font-semibold', 'leading-none', 'tracking-tight');
    });

    it('renders CardDescription with correct classes', () => {
      render(
        <Card>
          <CardDescription data-testid="card-description">Description</CardDescription>
        </Card>
      );
      
      const description = screen.getByTestId('card-description');
      expect(description).toHaveClass('text-sm', 'text-muted-foreground');
    });

    it('renders CardContent with correct classes', () => {
      render(
        <Card>
          <CardContent data-testid="card-content">Content</CardContent>
        </Card>
      );
      
      const content = screen.getByTestId('card-content');
      expect(content).toHaveClass('p-6', 'pt-0');
    });

    it('renders CardFooter with correct classes', () => {
      render(
        <Card>
          <CardFooter data-testid="card-footer">Footer</CardFooter>
        </Card>
      );
      
      const footer = screen.getByTestId('card-footer');
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0');
    });
  });

  describe('CardImage', () => {
    it('renders image when src is provided', () => {
      render(
        <Card>
          <CardImage src="test-image.jpg" alt="Test image" />
        </Card>
      );
      
      const image = screen.getByAltText('Test image');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'test-image.jpg');
    });

    it('renders children when no src is provided', () => {
      render(
        <Card>
          <CardImage>
            <div data-testid="image-placeholder">Placeholder</div>
          </CardImage>
        </Card>
      );
      
      expect(screen.getByTestId('image-placeholder')).toBeInTheDocument();
    });

    it('applies correct classes to image container', () => {
      render(
        <Card>
          <CardImage data-testid="image-container" src="test.jpg" alt="Test" />
        </Card>
      );
      
      const container = screen.getByTestId('image-container');
      expect(container).toHaveClass('relative', 'overflow-hidden', 'rounded-t-lg');
    });

    it('applies correct classes to image element', () => {
      render(
        <Card>
          <CardImage src="test.jpg" alt="Test" />
        </Card>
      );
      
      const image = screen.getByAltText('Test');
      expect(image).toHaveClass('h-full', 'w-full', 'object-cover', 'transition-transform', 'duration-300', 'hover:scale-105');
    });
  });

  describe('CardBadge', () => {
    it('renders with default variant', () => {
      render(
        <Card>
          <CardBadge data-testid="badge">Default</CardBadge>
        </Card>
      );
      
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('bg-primary', 'text-primary-foreground');
    });

    it('renders with success variant', () => {
      render(
        <Card>
          <CardBadge variant="success" data-testid="badge">Success</CardBadge>
        </Card>
      );
      
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('bg-green-500', 'text-white');
    });

    it('renders with warning variant', () => {
      render(
        <Card>
          <CardBadge variant="warning" data-testid="badge">Warning</CardBadge>
        </Card>
      );
      
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('bg-yellow-500', 'text-white');
    });

    it('renders with destructive variant', () => {
      render(
        <Card>
          <CardBadge variant="destructive" data-testid="badge">Error</CardBadge>
        </Card>
      );
      
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('bg-destructive', 'text-destructive-foreground');
    });

    it('renders with outline variant', () => {
      render(
        <Card>
          <CardBadge variant="outline" data-testid="badge">Outline</CardBadge>
        </Card>
      );
      
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('border', 'border-input', 'bg-background');
    });

    it('applies correct positioning classes', () => {
      render(
        <Card>
          <CardBadge data-testid="badge">Badge</CardBadge>
        </Card>
      );
      
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('absolute', 'top-2', 'right-2');
    });
  });

  describe('Convenience Components', () => {
    it('renders CardElevated with elevated variant', () => {
      render(<CardElevated data-testid="elevated-card">Test</CardElevated>);
      
      const card = screen.getByTestId('elevated-card');
      expect(card).toHaveClass('shadow-md', 'hover:shadow-lg');
    });

    it('renders CardInteractive with interactive prop', () => {
      render(<CardInteractive data-testid="interactive-card">Test</CardInteractive>);
      
      const card = screen.getByTestId('interactive-card');
      expect(card).toHaveClass('cursor-pointer', 'hover:shadow-md', 'hover:-translate-y-1');
    });
  });

  describe('RTL Support', () => {
    it('renders card with dir attribute', () => {
      render(<Card>Test</Card>);
      
      const card = screen.getByText('Test').closest('div');
      expect(card).toHaveAttribute('dir', 'ltr');
    });

    it('renders CardBadge with proper positioning', () => {
      render(
        <Card>
          <CardBadge data-testid="badge">Badge</CardBadge>
        </Card>
      );
      
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('absolute', 'top-2', 'right-2');
    });
  });

  describe('Event Handling', () => {
    it('handles click events', () => {
      const handleClick = vi.fn();
      render(<Card onClick={handleClick}>Test</Card>);
      
      const card = screen.getByText('Test').closest('div');
      fireEvent.click(card!);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles mouse events', () => {
      const handleMouseEnter = vi.fn();
      render(<Card onMouseEnter={handleMouseEnter}>Test</Card>);
      
      const card = screen.getByText('Test').closest('div');
      fireEvent.mouseEnter(card!);
      
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('supports custom aria-label', () => {
      render(<Card aria-label="Custom card">Test</Card>);
      
      const card = screen.getByLabelText('Custom card');
      expect(card).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <div>
          <Card aria-describedby="card-description">Test</Card>
          <p id="card-description">This is a test card</p>
        </div>
      );
      
      const card = screen.getByText('Test').closest('div');
      expect(card).toHaveAttribute('aria-describedby', 'card-description');
    });

    it('supports role attribute', () => {
      render(<Card role="article">Test</Card>);
      
      const card = screen.getByRole('article');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      render(<Card data-testid="empty-card" />);
      
      const card = screen.getByTestId('empty-card');
      expect(card).toBeInTheDocument();
    });

    it('handles null children', () => {
      render(<Card data-testid="null-card">{null}</Card>);
      
      const card = screen.getByTestId('null-card');
      expect(card).toBeInTheDocument();
    });

    it('handles multiple children', () => {
      render(
        <Card>
          <div>Child 1</div>
          <div>Child 2</div>
        </Card>
      );
      
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });

    it('handles asChild with multiple children', () => {
      render(
        <Card asChild>
          <div>First child</div>
          <div>Second child</div>
        </Card>
      );
      
      expect(screen.getByText('First child')).toBeInTheDocument();
      expect(screen.getByText('Second child')).toBeInTheDocument();
    });
  });

  describe('Combined Props', () => {
    it('renders with multiple props correctly', () => {
      render(
        <Card
          variant="elevated"
          size="lg"
          interactive
          animated={false}
          className="custom-class"
          data-testid="combined-card"
        >
          Test
        </Card>
      );
      
      const card = screen.getByTestId('combined-card');
      // Check for core classes that should be present
      expect(card).toHaveClass('shadow-md', 'p-6', 'cursor-pointer', 'custom-class');
      // Check for interactive classes
      expect(card).toHaveClass('hover:-translate-y-1', 'active:translate-y-0', 'active:scale-[0.98]');
    });

    it('renders CardImage with badge correctly', () => {
      render(
        <Card>
          <CardImage>
            <CardBadge variant="success" data-testid="badge">New</CardBadge>
            <img src="test.jpg" alt="Test" />
          </CardImage>
        </Card>
      );
      
      expect(screen.getByAltText('Test')).toBeInTheDocument();
      expect(screen.getByTestId('badge')).toBeInTheDocument();
      expect(screen.getByTestId('badge')).toHaveTextContent('New');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to Card component', () => {
      const ref = vi.fn();
      render(<Card ref={ref}>Test</Card>);
      
      expect(ref).toHaveBeenCalled();
    });

    it('forwards ref to CardHeader component', () => {
      const ref = vi.fn();
      render(
        <Card>
          <CardHeader ref={ref}>Test</CardHeader>
        </Card>
      );
      
      expect(ref).toHaveBeenCalled();
    });

    it('forwards ref to CardTitle component', () => {
      const ref = vi.fn();
      render(
        <Card>
          <CardTitle ref={ref}>Test</CardTitle>
        </Card>
      );
      
      expect(ref).toHaveBeenCalled();
    });
  });
});
