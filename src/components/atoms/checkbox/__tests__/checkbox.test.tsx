import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Checkbox } from '../checkbox';

// Mock the useTextDirection hook
vi.mock('@/hooks/useTextDirection', () => ({
  useTextDirection: vi.fn(() => 'ltr'),
}));

describe('Checkbox Component', () => {
  const defaultProps = {
    id: 'test-checkbox',
    label: 'Test checkbox',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders checkbox with label', () => {
      render(<Checkbox {...defaultProps} />);
      
      const checkbox = screen.getByRole('checkbox');
      const label = screen.getByText('Test checkbox');
      
      expect(checkbox).toBeTruthy();
      expect(label).toBeInTheDocument();
      expect(checkbox).toHaveAttribute('id', 'test-checkbox');
    });

    it('renders with default props', () => {
      render(<Checkbox {...defaultProps} />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
      expect(checkbox).not.toBeDisabled();
      expect(checkbox).not.toHaveAttribute('aria-invalid', 'true');
    });

    it('renders with custom className', () => {
      render(<Checkbox {...defaultProps} className="custom-class" />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('custom-class');
    });
  });

  describe('Checked State', () => {
    it('renders checked checkbox', () => {
      render(<Checkbox {...defaultProps} checked={true} />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('renders unchecked checkbox', () => {
      render(<Checkbox {...defaultProps} checked={false} />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });

    it('handles checked change', async () => {
      const handleChange = vi.fn();
      render(<Checkbox {...defaultProps} onCheckedChange={handleChange} />);
      
      const checkbox = screen.getByRole('checkbox');
      await userEvent.click(checkbox);
      
      expect(handleChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Disabled State', () => {
    it('renders disabled checkbox', () => {
      render(<Checkbox {...defaultProps} disabled={true} />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });

    it('applies disabled styling', () => {
      render(<Checkbox {...defaultProps} disabled={true} />);
      
      const container = screen.getByText('Test checkbox').closest('div');
      expect(container).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('does not call onCheckedChange when disabled', async () => {
      const handleChange = vi.fn();
      render(<Checkbox {...defaultProps} disabled={true} onCheckedChange={handleChange} />);
      
      const checkbox = screen.getByRole('checkbox');
      await userEvent.click(checkbox);
      
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Required State', () => {
    it('shows required asterisk', () => {
      render(<Checkbox {...defaultProps} required={true} />);
      
      const asterisk = screen.getByText('*');
      expect(asterisk).toBeInTheDocument();
      expect(asterisk).toHaveClass('text-red-500');
    });

    it('does not show asterisk when not required', () => {
      render(<Checkbox {...defaultProps} required={false} />);
      
      const asterisk = screen.queryByText('*');
      expect(asterisk).not.toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('renders error message', () => {
      render(<Checkbox {...defaultProps} error="This field is required" />);
      
      const errorMessage = screen.getByText('This field is required');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass('text-red-500');
    });

    it('applies error styling to checkbox', () => {
      render(<Checkbox {...defaultProps} error="Error message" />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox.getAttribute('aria-invalid')).toBe('true');
    });

    it('shows error icon', () => {
      render(<Checkbox {...defaultProps} error="Error message" />);
      
      const errorIcon = screen.getByText('Error message').closest('p')?.querySelector('svg');
      expect(errorIcon).toBeInTheDocument();
    });
  });

  describe('Helper Text', () => {
    it('renders helper text', () => {
      render(<Checkbox {...defaultProps} helperText="This is helper text" />);
      
      const helperText = screen.getByText('This is helper text');
      expect(helperText).toBeInTheDocument();
      expect(helperText).toHaveClass('text-gray-500');
    });

    it('does not show helper text when error is present', () => {
      render(
        <Checkbox 
          {...defaultProps} 
          helperText="Helper text" 
          error="Error message" 
        />
      );
      
      const helperText = screen.queryByText('Helper text');
      const errorMessage = screen.getByText('Error message');
      
      expect(helperText).not.toBeInTheDocument();
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('Color Variants', () => {
    const colors = ['primary', 'secondary', 'success', 'error', 'warning', 'info'] as const;

    colors.forEach((color) => {
      it(`renders ${color} color variant`, () => {
        render(<Checkbox {...defaultProps} color={color} checked={true} />);
        
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeTruthy();
      });
    });

    it('applies error color when error is present', () => {
      render(<Checkbox {...defaultProps} color="primary" error="Error" />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('border-red-500', 'text-red-600');
    });
  });

  describe('RTL/LTR Support', () => {
    it('renders with LTR direction by default', () => {
      render(<Checkbox {...defaultProps} />);
      
      const container = screen.getByText('Test checkbox').closest('div')?.parentElement;
      expect(container).toHaveAttribute('dir', 'ltr');
    });

    it('renders with RTL direction when specified', () => {
      render(<Checkbox {...defaultProps} dir="rtl" />);
      
      const container = screen.getByText('Test checkbox').closest('div')?.parentElement;
      expect(container).toHaveAttribute('dir', 'rtl');
    });

    it('applies RTL layout classes', () => {
      render(<Checkbox {...defaultProps} dir="rtl" />);
      
      const flexContainer = screen.getByText('Test checkbox').closest('div');
      expect(flexContainer).toHaveClass('flex-row-reverse');
    });

    it('applies LTR layout classes', () => {
      render(<Checkbox {...defaultProps} dir="ltr" />);
      
      const flexContainer = screen.getByText('Test checkbox').closest('div');
      expect(flexContainer).toHaveClass('flex-row');
    });

    it('positions required asterisk correctly in RTL', () => {
      render(<Checkbox {...defaultProps} dir="rtl" required={true} />);
      
      const asterisk = screen.getByText('*');
      expect(asterisk).toHaveClass('mr-1');
    });

    it('positions required asterisk correctly in LTR', () => {
      render(<Checkbox {...defaultProps} dir="ltr" required={true} />);
      
      const asterisk = screen.getByText('*');
      expect(asterisk).toHaveClass('ml-1');
    });

    it('positions error message correctly in RTL', () => {
      render(<Checkbox {...defaultProps} dir="rtl" error="Error message" />);
      
      const errorContainer = screen.getByText('Error message').closest('p');
      expect(errorContainer).toHaveClass('flex-row-reverse');
    });

    it('positions error message correctly in LTR', () => {
      render(<Checkbox {...defaultProps} dir="ltr" error="Error message" />);
      
      const errorContainer = screen.getByText('Error message').closest('p');
      expect(errorContainer).toHaveClass('flex-row');
    });
  });

  describe('Accessibility', () => {
    it('has proper label association', () => {
      render(<Checkbox {...defaultProps} />);
      
      const checkbox = screen.getByRole('checkbox');
      const label = screen.getByText('Test checkbox');
      
      expect(checkbox).toHaveAttribute('id', 'test-checkbox');
      expect(label).toHaveAttribute('for', 'test-checkbox');
    });

    it('supports keyboard navigation', async () => {
      const handleChange = vi.fn();
      render(<Checkbox {...defaultProps} onCheckedChange={handleChange} />);
      
      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      
      expect(checkbox).toHaveFocus();
      
      await userEvent.keyboard(' ');
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('has proper ARIA attributes', () => {
      render(<Checkbox {...defaultProps} required={true} error="Error" />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox.getAttribute('aria-invalid')).toBe('true');
    });
  });

  describe('Event Handling', () => {
    it('calls onCheckedChange with correct parameters', async () => {
      const handleChange = vi.fn();
      render(<Checkbox {...defaultProps} onCheckedChange={handleChange} />);
      
      const checkbox = screen.getByRole('checkbox');
      
      // Click to check
      await userEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledWith(true);
      
      // Click to uncheck
      await userEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('handles label click', async () => {
      const handleChange = vi.fn();
      render(<Checkbox {...defaultProps} onCheckedChange={handleChange} />);
      
      const label = screen.getByText('Test checkbox');
      await userEvent.click(label);
      
      expect(handleChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Animation and Styling', () => {
    it('applies transition classes', () => {
      render(<Checkbox {...defaultProps} />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox.className).toContain('transition-all');
      expect(checkbox.className).toContain('duration-200');
    });

    it('applies hover effects', () => {
      render(<Checkbox {...defaultProps} />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox.className).toContain('hover:border-blue-600');
      expect(checkbox.className).toContain('hover:bg-blue-50');
    });

    it('applies focus styles', () => {
      render(<Checkbox {...defaultProps} />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox.className).toContain('focus-visible:ring-2');
      expect(checkbox.className).toContain('focus-visible:ring-blue-500');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty label', () => {
      render(<Checkbox id="test" label="" />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeTruthy();
    });

    it('handles undefined onCheckedChange', async () => {
      render(<Checkbox {...defaultProps} onCheckedChange={undefined} />);
      
      const checkbox = screen.getByRole('checkbox');
      await userEvent.click(checkbox);
      
      // Should not throw error
      expect(checkbox).toBeTruthy();
    });

    it('handles multiple rapid clicks', async () => {
      const handleChange = vi.fn();
      render(<Checkbox {...defaultProps} onCheckedChange={handleChange} />);
      
      const checkbox = screen.getByRole('checkbox');
      
      // Rapid clicks
      await userEvent.click(checkbox);
      await userEvent.click(checkbox);
      await userEvent.click(checkbox);
      
      expect(handleChange).toHaveBeenCalledTimes(3);
    });
  });

  describe('Integration Tests', () => {
    it('works with form submission', async () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());
      
      render(
        <form onSubmit={handleSubmit}>
          <Checkbox {...defaultProps} required={true} />
          <button type="submit">Submit</button>
        </form>
      );
      
      const checkbox = screen.getByRole('checkbox');
      const submitButton = screen.getByRole('button');
      
      // Check the checkbox first (required field)
      await userEvent.click(checkbox);
      expect(checkbox).toBeChecked();
      
      // Now submit the form
      await userEvent.click(submitButton);
      
      expect(handleSubmit).toHaveBeenCalled();
    });

    it('works with controlled state', () => {
      const TestComponent = () => {
        const [checked, setChecked] = React.useState(false);
        
        return (
          <div>
            <Checkbox 
              {...defaultProps} 
              checked={checked} 
              onCheckedChange={setChecked} 
            />
            <div data-testid="status">{checked ? 'checked' : 'unchecked'}</div>
          </div>
        );
      };
      
      render(<TestComponent />);
      
      const status = screen.getByTestId('status');
      expect(status.textContent).toBe('unchecked');
      
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      
      expect(status.textContent).toBe('checked');
    });
  });
});
