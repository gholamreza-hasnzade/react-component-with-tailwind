import React from 'react';
import clsx from 'clsx';
import { FaGripLines, FaBars, FaEquals } from 'react-icons/fa';

export type Density = 'compact' | 'normal' | 'comfortable';

interface DensityToggleProps {
  density: Density;
  onDensityChange: (density: Density) => void;
  className?: string;
}

const densityOptions: { value: Density; label: string; icon: React.ReactNode }[] = [
  {
    value: 'compact',
    label: 'Compact',
    icon: <FaGripLines className="w-4 h-4" />,
  },
  {
    value: 'normal',
    label: 'Normal',
    icon: <FaEquals className="w-4 h-4" />,
  },
  {
    value: 'comfortable',
    label: 'Comfortable',
    icon: <FaBars className="w-4 h-4" />,
  },
];

export function DensityToggle({
  density,
  onDensityChange,
  className = '',
}: DensityToggleProps) {
  return (
    <div className={clsx("flex items-center gap-1 bg-gray-100 rounded-lg p-1", className)}>
      {densityOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onDensityChange(option.value)}
          className={clsx(
            "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200",
            density === option.value
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          )}
          title={option.label}
        >
          {option.icon}
          <span className="hidden sm:inline">{option.label}</span>
        </button>
      ))}
    </div>
  );
} 