import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { Button } from '../button';
import { FaHome, FaDownload, FaHeart } from 'react-icons/fa';

// Mock react-icons
vi.mock('react-icons/fa', () => ({
  FaSpinner: () => <span data-testid="button-spinner">🔄</span>,
  FaHome: () => <span data-testid="home-icon">🏠</span>,
  FaDownload: () => <span data-testid="download-icon">⬇️</span>,
  FaHeart: () => <span data-testid="heart-icon">❤️</span>,
}));

describe('Button Component', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>);
      
      const button = screen.getByRole('button', { name: 'Click me' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-blue-600', 'text-white');
    });

    it('renders with custom className', () => {
      render(<Button className="custom-class">Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('renders with custom data attributes', () => {
      render(<Button data-testid="custom-button">Button</Button>);
      
      const button = screen.getByTestId('custom-button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders contained variant by default', () => {
      render(<Button>Contained</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-blue-600', 'text-white');
    });

    it('renders outlined variant', () => {
      render(<Button variant="outlined">Outlined</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('border-2', 'bg-transparent', 'border-blue-600', 'text-blue-600');
    });

    it('renders text variant', () => {
      render(<Button variant="text">Text</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-transparent', 'text-blue-600');
    });
  });

  describe('Colors', () => {
    it('renders primary color by default', () => {
      render(<Button>Primary</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-blue-600', 'text-white');
    });

    it('renders secondary color', () => {
      render(<Button color="secondary">Secondary</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-gray-600', 'text-white');
    });

    it('renders success color', () => {
      render(<Button color="success">Success</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-green-600', 'text-white');
    });

    it('renders error color', () => {
      render(<Button color="error">Error</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-red-600', 'text-white');
    });

    it('renders warning color', () => {
      render(<Button color="warning">Warning</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-yellow-500', 'text-black');
    });

    it('renders info color', () => {
      render(<Button color="info">Info</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-sky-500', 'text-white');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Button size="sm">Small</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-8', 'px-3', 'text-sm');
    });

    it('renders medium size by default', () => {
      render(<Button>Medium</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-10', 'px-4', 'text-base');
    });

    it('renders large size', () => {
      render(<Button size="lg">Large</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-12', 'px-6', 'text-lg');
    });

    it('renders icon size', () => {
      render(<Button size="icon" iconOnly startIcon={<FaHome />} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-10', 'w-10', 'p-2');
    });
  });

  describe('Rounded Variants', () => {
    it('renders default rounded', () => {
      render(<Button>Default</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('rounded-md');
    });

    it('renders full rounded', () => {
      render(<Button rounded="full">Full</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('rounded-full');
    });

    it('renders large rounded', () => {
      render(<Button rounded="lg">Large</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('rounded-lg');
    });

    it('renders extra large rounded', () => {
      render(<Button rounded="xl">Extra Large</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('rounded-xl');
    });

    it('renders no rounded', () => {
      render(<Button rounded="none">None</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('rounded-none');
    });
  });

  describe('States', () => {
    it('renders loading state', () => {
      render(<Button loading>Loading</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(screen.getByTestId('button-spinner')).toBeInTheDocument();
    });

    it('renders disabled state', () => {
      render(<Button disabled>Disabled</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('renders loading and disabled state', () => {
      render(<Button loading disabled>Loading & Disabled</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(screen.getByTestId('button-spinner')).toBeInTheDocument();
    });

    it('hides text when loading', () => {
      render(<Button loading>Loading Text</Button>);
      
      expect(screen.queryByText('Loading Text')).not.toBeInTheDocument();
      expect(screen.getByTestId('button-spinner')).toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('renders with start icon', () => {
      render(<Button startIcon={<FaDownload />}>Download</Button>);
      
      expect(screen.getByTestId('download-icon')).toBeInTheDocument();
      expect(screen.getByText('Download')).toBeInTheDocument();
    });

    it('renders with end icon', () => {
      render(<Button endIcon={<FaHeart />}>Like</Button>);
      
      expect(screen.getByTestId('heart-icon')).toBeInTheDocument();
      expect(screen.getByText('Like')).toBeInTheDocument();
    });

    it('renders with both icons', () => {
      render(
        <Button startIcon={<FaDownload />} endIcon={<FaHeart />}>
          Download & Like
        </Button>
      );
      
      expect(screen.getByTestId('download-icon')).toBeInTheDocument();
      expect(screen.getByTestId('heart-icon')).toBeInTheDocument();
      expect(screen.getByText('Download & Like')).toBeInTheDocument();
    });

    it('renders icon only when iconOnly is true', () => {
      render(<Button iconOnly startIcon={<FaHome />} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('p-2', 'min-w-0', 'justify-center');
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('hides icons when loading', () => {
      render(
        <Button loading startIcon={<FaDownload />} endIcon={<FaHeart />}>
          Loading
        </Button>
      );
      
      expect(screen.queryByTestId('download-icon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('heart-icon')).not.toBeInTheDocument();
      expect(screen.getByTestId('button-spinner')).toBeInTheDocument();
    });
  });

  describe('Full Width', () => {
    it('renders full width button', () => {
      render(<Button fullWidth>Full Width</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-full');
    });

    it('does not render full width by default', () => {
      render(<Button>Normal Width</Button>);
      
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('w-full');
    });
  });

  describe('Click Handlers', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(<Button onClick={handleClick}>Click me</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(<Button onClick={handleClick} disabled>Disabled</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(<Button onClick={handleClick} loading>Loading</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Debouncing tests removed (debounce prop removed from component)

  describe('Tooltips', () => {
    it('renders tooltip attribute', () => {
      render(<Button tooltip="This is a tooltip">Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'This is a tooltip');
    });

    it('does not render tooltip when not provided', () => {
      render(<Button>Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).not.toHaveAttribute('title');
    });
  });

  describe('Button Types', () => {
    it('renders button type by default', () => {
      render(<Button>Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('renders submit type', () => {
      render(<Button type="submit">Submit</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('renders reset type', () => {
      render(<Button type="reset">Reset</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'reset');
    });
  });

  describe('AsChild', () => {
    it('renders as child component when asChild is true', () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );
      
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
      // The Slot component should render the child element
      expect(link.tagName).toBe('A');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Button disabled>Disabled Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('supports custom aria-label', () => {
      render(<Button aria-label="Custom label">Button</Button>);
      
      const button = screen.getByRole('button', { name: 'Custom label' });
      expect(button).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <div>
          <Button aria-describedby="button-description">Button</Button>
          <p id="button-description">This button does something</p>
        </div>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-describedby', 'button-description');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      render(<Button />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('handles null children', () => {
      render(<Button>{null}</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('handles undefined children', () => {
      render(<Button>{undefined}</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('handles multiple children', () => {
      render(
        <Button>
          <span>Text</span>
          <span>More Text</span>
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(screen.getByText('Text')).toBeInTheDocument();
      expect(screen.getByText('More Text')).toBeInTheDocument();
    });
  });

  describe('Combined Props', () => {
    it('renders with multiple props correctly', () => {
      render(
        <Button
          variant="outlined"
          color="success"
          size="lg"
          rounded="full"
          fullWidth
          startIcon={<FaDownload />}
          tooltip="Download file"
        >
          Download
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'border-2',
        'bg-transparent',
        'border-green-600',
        'text-green-600',
        'h-12',
        'px-6',
        'text-lg',
        'rounded-full',
        'w-full'
      );
      expect(button).toHaveAttribute('title', 'Download file');
      expect(screen.getByTestId('download-icon')).toBeInTheDocument();
    });

    it('renders icon-only with all props', () => {
      render(
        <Button
          iconOnly
          size="lg"
          color="error"
          rounded="full"
          startIcon={<FaHeart />}
          tooltip="Like this"
        />
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'p-2',
        'min-w-0',
        'justify-center',
        'rounded-full'
      );
      // Check for error color classes
      expect(button).toHaveClass('bg-red-600', 'text-white');
      expect(button).toHaveAttribute('title', 'Like this');
      expect(screen.getByTestId('heart-icon')).toBeInTheDocument();
    });
  });

  describe('Cleanup', () => {
    // (debounce cleanup test removed)
  });
});
