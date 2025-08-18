import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox id="cb" label="Accept terms" />);
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('renders as checked/unchecked', () => {
    const { rerender } = render(<Checkbox id="cb" label="Check" checked={false} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    rerender(<Checkbox id="cb" label="Check" checked={true} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onCheckedChange when clicked', () => {
    const handleChange = vi.fn();
    render(<Checkbox id="cb" label="Click me" checked={false} onCheckedChange={handleChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows error message', () => {
    render(<Checkbox id="cb" label="Error" error="This is required" />);
    expect(screen.getByText('This is required')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(<Checkbox id="cb" label="Help" helperText="Helpful info" />);
    expect(screen.getByText('Helpful info')).toBeInTheDocument();
  });

  it('shows required asterisk', () => {
    render(<Checkbox id="cb" label="Required" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('is disabled when disabled is true', () => {
    render(<Checkbox id="cb" label="Disabled" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('applies color classes for error, checked, and base', () => {
    const { rerender } = render(<Checkbox id="cb" label="Base" color="success" />);
    expect(screen.getByRole('checkbox').className).toMatch(/border-green-600/);
    rerender(<Checkbox id="cb" label="Checked" color="success" checked />);
    expect(screen.getByRole('checkbox').className).toMatch(/bg-green-600/);
    rerender(<Checkbox id="cb" label="Error" color="success" error="err" />);
    expect(screen.getByRole('checkbox').className).toMatch(/border-red-500/);
  });

  it('supports custom className', () => {
    render(<Checkbox id="cb" label="Custom" className="my-custom-class" />);
    expect(screen.getByRole('checkbox').className).toMatch(/my-custom-class/);
  });

  it('has correct aria attributes', () => {
    render(<Checkbox id="cb" label="Aria" error="err" required />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox).toBeRequired();
  });
}); 