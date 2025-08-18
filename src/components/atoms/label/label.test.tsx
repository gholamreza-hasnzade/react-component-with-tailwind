import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Label } from './label';

describe('Label', () => {
  it('renders children', () => {
    render(<Label>My Label</Label>);
    expect(screen.getByText('My Label')).toBeInTheDocument();
  });

  it('applies color classes', () => {
    const colorMap = {
      primary: 'text-blue-600',
      secondary: 'text-gray-600',
      success: 'text-green-600',
      error: 'text-red-600',
      warning: 'text-yellow-600',
      info: 'text-sky-600',
    };
    (Object.keys(colorMap) as Array<keyof typeof colorMap>).forEach(color => {
      render(<Label color={color}>Color</Label>);
      const all = screen.queryAllByText('Color');
      const label = all[all.length - 1];
      expect(label.className).toMatch(new RegExp(colorMap[color]));
    });
  });

  it('applies size classes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    const sizeClassMap = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };
    sizes.forEach(size => {
      render(<Label size={size}>Size</Label>);
      const all = screen.queryAllByText('Size');
      const label = all[all.length - 1];
      expect(label.className).toMatch(new RegExp(sizeClassMap[size]));
    });
  }); 

  it('supports custom className', () => {
    render(<Label className="my-custom-class">Custom</Label>);
    expect(screen.getByText('Custom').className).toMatch(/my-custom-class/);
  });

  it('passes through other props', () => {
    render(<Label htmlFor="input-id" id="label-id">With htmlFor</Label>);
    const label = screen.getByText('With htmlFor');
    expect(label).toHaveAttribute('for', 'input-id');
    expect(label).toHaveAttribute('id', 'label-id');
  });
});
