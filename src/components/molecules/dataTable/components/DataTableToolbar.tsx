import type { Table } from '@tanstack/react-table';
import { GlobalFilter, DensityToggle } from './';
import type { Density } from '../types';
import clsx from 'clsx';

interface DataTableToolbarProps<T extends object> {
  table: Table<T>;
  enableGlobalFilter?: boolean;
  globalFilterPlaceholder?: string;
  debounceMs?: number;
  enableDensityToggle?: boolean;
  density?: Density;
  onDensityChange?: (density: Density) => void;
}

export function DataTableToolbar<T extends object>({
  table,
  enableGlobalFilter = true,
  globalFilterPlaceholder = "Search all columns...",
  debounceMs = 300,
  enableDensityToggle = false,
  density = 'normal',
  onDensityChange,
}: DataTableToolbarProps<T>) {
  const hasAnyFeature = enableGlobalFilter || enableDensityToggle;
  
  if (!hasAnyFeature) {
    return null;
  }

  return (
    <div className={clsx(
      "flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-white border-b border-gray-200 gap-4"
    )}>
      <div className="flex items-center gap-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900"></h3>
      </div>
      <div className="flex items-center gap-4 w-full sm:w-auto">
        {enableGlobalFilter && (
          <GlobalFilter 
            table={table} 
            placeholder={globalFilterPlaceholder}
            className={clsx("w-full sm:w-80")}
            debounceMs={debounceMs}
          />
        )}
        {enableDensityToggle && onDensityChange && (
          <DensityToggle
            density={density}
            onDensityChange={onDensityChange}
          />
        )}
      </div>
    </div>
  );
} 