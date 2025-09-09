import React from 'react';
import type   { Table } from '@tanstack/react-table';
import { MinusIcon, SquareIcon, MaximizeIcon, MinimizeIcon } from 'lucide-react';
import type { RowDensity } from './dataTableDensity.utils';

export interface DataTableDensityProps<TData> {
  table: Table<TData>;
  density: RowDensity;
  onDensityChange: (density: RowDensity) => void;
  isFullscreen: boolean;
  onFullscreenToggle: () => void;
}

export function DataTableDensity<TData>({
  table,
  density,
  onDensityChange,
  isFullscreen,
  onFullscreenToggle,
}: DataTableDensityProps<TData>) {
  const densityOptions: { value: RowDensity; label: string; icon: React.ReactNode }[] = [
    {
      value: 'compact',
      label: 'Compact',
      icon: <MinusIcon className="w-4 h-4" />,
    },
    {
      value: 'normal',
      label: 'Normal',
      icon: <SquareIcon className="w-4 h-4" />,
    },
    {
      value: 'comfortable',
      label: 'Comfortable',
      icon: <MaximizeIcon className="w-4 h-4" />,
    },
  ];


  return (
    <div className="flex items-center space-x-2">
      {/* Density Selector */}
      <div className="flex items-center space-x-1 border border-gray-300 rounded-lg">
        {densityOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onDensityChange(option.value)}
            className={`flex items-center space-x-1 px-3 py-2 text-sm transition-colors ${
              density === option.value
                ? 'bg-blue-100 text-blue-800 border-blue-200'
                : 'text-gray-700 hover:bg-gray-100'
            } ${option.value === 'compact' ? 'rounded-l-lg' : ''} ${
              option.value === 'comfortable' ? 'rounded-r-lg' : ''
            }`}
            title={option.label}
          >
            {option.icon}
            <span className="hidden sm:inline">{option.label}</span>
          </button>
        ))}
      </div>

      {/* Fullscreen Toggle */}
      <button
        onClick={onFullscreenToggle}
        className="flex items-center space-x-1 px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {isFullscreen ? (
          <MinimizeIcon className="w-4 h-4" />
        ) : (
          <MaximizeIcon className="w-4 h-4" />
        )}
        <span className="hidden sm:inline">
          {isFullscreen ? 'Exit' : 'Fullscreen'}
        </span>
      </button>
    </div>
  );
}

