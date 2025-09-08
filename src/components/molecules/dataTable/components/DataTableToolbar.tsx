import type { Table } from '@tanstack/react-table';
import { GlobalFilter, DensityToggle } from './';
import type { Density } from '../types';
import clsx from 'clsx';
import { useTextDirection } from '@/hooks/useTextDirection';

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
  const { isRTL } = useTextDirection();
  const hasAnyFeature = enableGlobalFilter || enableDensityToggle;
  
  if (!hasAnyFeature) {
    return null;
  }

  return (
    <div className={clsx(
      "flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-white border-b border-gray-200 gap-4",
      isRTL ? "sm:flex-row-reverse" : "sm:flex-row"
    )}>
      <div className={clsx(
        "flex items-center gap-4",
        isRTL ? "flex-row-reverse" : "flex-row"
      )}>
        {/* Empty header removed - can be added back if needed */}
      </div>
      <div className={clsx(
        "flex items-center gap-4 w-full sm:w-auto",
        isRTL ? "flex-row-reverse" : "flex-row"
      )}>
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