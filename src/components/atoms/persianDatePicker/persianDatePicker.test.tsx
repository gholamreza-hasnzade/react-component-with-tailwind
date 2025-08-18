import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PersianDateInput } from './persianDatePicker';
import type { PersianDateFormat } from './persianDatePicker';
import '@testing-library/jest-dom/vitest';

const label = 'تاریخ';
const placeholder = 'تاریخ را انتخاب کنید';

const setup = (props = {}) => {
  const onChange = vi.fn();
  render(
    <PersianDateInput
      id="test-date-input"
      label={label}
      placeholder={placeholder}
      onChange={onChange}
      {...props}
    />
  );
  return { onChange };
};

describe('PersianDateInput', () => {
  it('renders label and placeholder', () => {
    setup();
    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('shows error message', () => {
    const error = 'فرمت تاریخ صحیح نیست';
    setup({ error });
    expect(screen.getByText((content) => content.includes(error))).toBeInTheDocument();
  });

  it('shows required asterisk', () => {
    setup({ required: true });
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    setup({ disabled: true });
    expect(screen.getByPlaceholderText(placeholder)).toBeDisabled();
  });

  it('accepts and displays a default value', () => {
    const date = new Date('2025-07-22');
    setup({ value: date });
    expect(screen.getByDisplayValue('۱۴۰۴/۰۴/۳۰')).toBeInTheDocument();
  });

  it('calls onChange with correct Date when valid input is entered', async () => {
    const { onChange } = setup();
    const input = screen.getByPlaceholderText(placeholder);
    await userEvent.clear(input);
    await userEvent.type(input, '1404/05/03');
    expect(onChange).toHaveBeenCalled();
    const calledWith = onChange.mock.calls[onChange.mock.calls.length - 1][0];
    expect(calledWith).toBeInstanceOf(Date);
  });

  it('accepts Persian digits and calls onChange', async () => {
    const { onChange } = setup();
    const input = screen.getByPlaceholderText(placeholder);
    await userEvent.clear(input);
    await userEvent.type(input, '۱۴۰۴/۰۵/۰۳');
    expect(onChange).toHaveBeenCalled();
    const calledWith = onChange.mock.calls[onChange.mock.calls.length - 1][0];
    expect(calledWith).toBeInstanceOf(Date);
  });


  it('supports different formats', async () => {
    const formats: PersianDateFormat[] = [
      'YYYY/MM/DD',
      'YYYY-MM-DD',
      'DD/MM/YYYY',
      'DD-MM-YYYY',
    ];
    for (const format of formats) {
      const { unmount } = render(
        <PersianDateInput
          id="test-date-input"
          label={label}
          placeholder={placeholder}
          format={format}
        />
      );
      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
      unmount();
    }
  });

  it('applies color and variant classes', () => {
    const { container } = render(
      <PersianDateInput
        id="test-date-input"
        label={label}
        placeholder={placeholder}
        color="success"
        variant="contained"
      />
    );
    const input = container.querySelector('input');
    expect(input?.className).toMatch(/bg-green-50/);
  });
}); 