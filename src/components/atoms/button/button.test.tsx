import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './button';
import '@testing-library/jest-dom';

// Helper icons
const StartIcon = () => <span data-testid="start-icon">S</span>;
const EndIcon = () => <span data-testid="end-icon">E</span>;

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant and color classes', () => {
    render(<Button variant="outlined" color="success">Test</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/border-green-600/);
    expect(btn.className).toMatch(/text-green-600/);
  });

  it('shows loading spinner and disables button', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('button-spinner')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders start and end icons', () => {
    render(<Button startIcon={<StartIcon />} endIcon={<EndIcon />}>With Icons</Button>);
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('renders iconOnly button', () => {
    render(<Button iconOnly startIcon={<StartIcon />} aria-label="icon only" />);
    expect(screen.getByLabelText('icon only')).toBeInTheDocument();
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  });

  it('applies fullWidth class', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button').className).toMatch(/w-full/);
  });

  it('applies tooltip as title', () => {
    render(<Button tooltip="Tooltip text">Tooltip</Button>);
    expect(screen.getByRole('button').getAttribute('title')).toBe('Tooltip text');
  });

  it('renders as a child element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="#test" data-testid="as-child-link">Link</a>
      </Button>
    );
    expect(screen.getByTestId('as-child-link')).toBeInTheDocument();
  });

  it('renders all color and variant combinations', () => {
    const colors = ['primary', 'secondary', 'success', 'error', 'warning', 'info'] as const;
    const variants = ['contained', 'outlined', 'text'] as const;
    colors.forEach((color) => {
      variants.forEach((variant) => {
        render(<Button color={color} variant={variant}>{color}-{variant}</Button>);
        expect(screen.getByText(`${color}-${variant}`)).toBeInTheDocument();
      });
    });
  });
}); 