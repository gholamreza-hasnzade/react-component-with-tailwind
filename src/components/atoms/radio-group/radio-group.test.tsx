import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RadioGroup, RadioGroupItem } from './radio-group';

const options = [
  { label: 'Radio 1', value: '1', color: 'primary' },
  { label: 'Radio 2', value: '2', color: 'secondary' },
  { label: 'Radio 3', value: '3', color: 'success' },
  { label: 'Radio 4', value: '4', color: 'error' },
  { label: 'Radio 5', value: '5', color: 'warning' },
  { label: 'Radio 6', value: '6', color: 'info' },
] as const;

describe('RadioGroup', () => {
  it('renders all radio items', () => {
    render(
      <RadioGroup>
        {options.map(opt => (
          <RadioGroupItem key={opt.value} label={opt.label} value={opt.value} color={opt.color} />
        ))}
      </RadioGroup>
    );
    options.forEach(opt => {
      expect(screen.getByText(opt.label)).toBeInTheDocument();
    }); 
  });

  it('selects a value when clicked', () => {
    render(
      <RadioGroup>
        <RadioGroupItem label="Radio 1" value="1" />
        <RadioGroupItem label="Radio 2" value="2" />
      </RadioGroup>
    );
    const radio1 = screen.getByLabelText('Radio 1');
    const radio2 = screen.getByLabelText('Radio 2');
    fireEvent.click(radio2);
    expect(radio2).toHaveAttribute('data-state', 'checked');
    expect(radio1).not.toHaveAttribute('data-state', 'checked');
  });

  it('respects disabled prop', () => {
    render(
      <RadioGroup disabled>
        <RadioGroupItem label="Radio 1" value="1" />
      </RadioGroup>
    );
    const radio = screen.getByLabelText('Radio 1');
    expect(radio).toBeDisabled();
  });

  it('respects readOnly prop', () => {
    render(
      <RadioGroup>
        <RadioGroupItem label="Radio 1" value="1" readOnly />
      </RadioGroup>
    );
    const radio = screen.getByLabelText('Radio 1');
    expect(radio).toHaveAttribute('aria-readonly', 'true');
    expect(radio).toHaveAttribute('data-readonly', 'true');
    expect(radio).toHaveAttribute('tabindex', '-1');
  });

  it('applies color and size classes', () => {
    render(
      <RadioGroup>
        <RadioGroupItem label="Radio" value="1" color="success" size="lg" />
      </RadioGroup>
    );
    const radio = screen.getByLabelText('Radio');
    expect(radio.className).toMatch(/border-green-600/);
    expect(radio.className).toMatch(/w-6/);
  });

  it('supports custom className', () => {
    render(
      <RadioGroup className="my-custom-group">
        <RadioGroupItem label="Radio" value="1" className="my-custom-item" />
      </RadioGroup>
    );
    const group = screen.getByRole('radiogroup');
    expect(group.className).toMatch(/my-custom-group/);
    const radio = screen.getByLabelText('Radio');
    expect(radio.className).toMatch(/my-custom-item/);
  });

  it('renders in RTL mode', () => {
    render(
      <RadioGroup dir="rtl">
        <RadioGroupItem label="راست به چپ" value="rtl" />
      </RadioGroup>
    );
    const group = screen.getByRole('radiogroup');
    expect(group).toHaveAttribute('dir', 'rtl');
  });

  it('has correct accessibility roles', () => {
    render(
      <RadioGroup>
        <RadioGroupItem label="Radio 1" value="1" />
      </RadioGroup>
    );
    const group = screen.getByRole('radiogroup');
    const radio = screen.getByLabelText('Radio 1');
    expect(group).toBeInTheDocument();
    expect(radio).toBeInTheDocument();
    expect(radio).toHaveAttribute('role', 'radio');
  });
}); 