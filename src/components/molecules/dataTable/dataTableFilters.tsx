import type {  Table } from '@tanstack/react-table';
import { SearchIcon, XIcon } from 'lucide-react';

export interface FilterConfig {
  type: 'text' | 'select' | 'multiselect' | 'date' | 'datetime' | 'time' | 'number' | 'range' | 'radio' | 'checkbox' | 'rating' | 'boolean';
  options?: { label: string; value: string | number | boolean }[];
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  multiple?: boolean;
  allowCustom?: boolean;
  format?: string;
  trueLabel?: string;
  falseLabel?: string;
  maxRating?: number;
  showLabels?: boolean;
  autoSort?: boolean;
  sortDirection?: 'asc' | 'desc';
  showFilter?: boolean;
  disableSorting?: boolean;
}

export interface DataTableFiltersProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  columnFilters: Record<string, unknown>;
  setColumnFilters: (filters: Record<string, unknown>) => void;
  filterConfigs?: Record<string, FilterConfig>;
  showGlobalFilter?: boolean;
  showColumnFilters?: boolean;
}

export function DataTableFilters<TData>({
  table,
  globalFilter,
  setGlobalFilter,
  columnFilters,
  setColumnFilters,
  showGlobalFilter = true,
}: DataTableFiltersProps<TData>) {



  const clearAllFilters = () => {
    setGlobalFilter('');
    setColumnFilters({});
    table.resetColumnFilters();
  };



  const activeFiltersCount = Object.values(columnFilters).filter(Boolean).length + (globalFilter ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Filter Toggle and Global Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showGlobalFilter && (
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search all columns..."
                className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
            </div>
          )}

          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center space-x-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
            >
              <XIcon className="w-4 h-4" />
              <span>Clear all</span>
            </button>
          )}
        </div>
      </div>


    </div>
  );
}
