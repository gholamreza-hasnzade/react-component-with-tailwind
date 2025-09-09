import React, { useState } from 'react';
import type { Column, Table } from '@tanstack/react-table';
import { SearchIcon, FilterIcon, XIcon, CalendarIcon, ChevronDownIcon, StarIcon, CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

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
}

export interface DataTableFiltersProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  columnFilters: Record<string, any>;
  setColumnFilters: (filters: Record<string, any>) => void;
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
  filterConfigs = {},
  showGlobalFilter = true,
  showColumnFilters = true,
}: DataTableFiltersProps<TData>) {
  const [showFilters, setShowFilters] = useState(false);

  const getColumnFilterValue = (columnId: string) => {
    return columnFilters[columnId] || '';
  };

  const setColumnFilterValue = (columnId: string, value: any) => {
    setColumnFilters({
      ...columnFilters,
      [columnId]: value,
    });
  };

  const clearAllFilters = () => {
    setGlobalFilter('');
    setColumnFilters({});
    table.resetColumnFilters();
  };

  const renderColumnFilter = (column: Column<TData, unknown>) => {
    const columnId = column.id;
    const filterConfig = filterConfigs[columnId];
    const currentValue = getColumnFilterValue(columnId);

    if (!filterConfig) return null;

    const baseInputClasses = "w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
    const labelClasses = "text-xs font-medium text-gray-700";

    switch (filterConfig.type) {
      case 'text':
        return (
          <div className="space-y-1">
            <label className={labelClasses}>
              {column.columnDef.header as string}
            </label>
            <input
              type="text"
              value={currentValue || ''}
              onChange={(e) => setColumnFilterValue(columnId, e.target.value)}
              placeholder={filterConfig.placeholder || `Filter ${column.columnDef.header}`}
              className={baseInputClasses}
            />
          </div>
        );

      case 'select':
        return (
          <div className="space-y-1">
            <label className={labelClasses}>
              {column.columnDef.header as string}
            </label>
            <select
              value={currentValue || ''}
              onChange={(e) => setColumnFilterValue(columnId, e.target.value)}
              className={baseInputClasses}
            >
              <option value="">All</option>
              {filterConfig.options?.map((option) => (
                <option key={String(option.value)} value={String(option.value)}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 'multiselect': {
        const selectedValues = Array.isArray(currentValue) ? currentValue : [];
        return (
          <div className="space-y-1">
            <label className={labelClasses}>
              {column.columnDef.header as string}
            </label>
            <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded p-2">
              {filterConfig.options?.map((option) => (
                <label key={String(option.value)} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option.value)}
                    onChange={(e) => {
                      const newValues = e.target.checked
                        ? [...selectedValues, option.value]
                        : selectedValues.filter(v => v !== option.value);
                      setColumnFilterValue(columnId, newValues);
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );
      }

      case 'date':
        return (
          <div className="space-y-1">
            <label className={labelClasses}>
              {column.columnDef.header as string}
            </label>
            <div className="relative">
              <input
                type="date"
                value={currentValue || ''}
                onChange={(e) => setColumnFilterValue(columnId, e.target.value)}
                className={`${baseInputClasses} pr-8`}
              />
              <CalendarIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        );

      case 'datetime':
        return (
          <div className="space-y-1">
            <label className={labelClasses}>
              {column.columnDef.header as string}
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                value={currentValue || ''}
                onChange={(e) => setColumnFilterValue(columnId, e.target.value)}
                className={`${baseInputClasses} pr-8`}
              />
              <CalendarIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        );

      case 'time':
        return (
          <div className="space-y-1">
            <label className={labelClasses}>
              {column.columnDef.header as string}
            </label>
            <input
              type="time"
              value={currentValue || ''}
              onChange={(e) => setColumnFilterValue(columnId, e.target.value)}
              className={baseInputClasses}
            />
          </div>
        );

      case 'number':
        return (
          <div className="space-y-1">
            <label className={labelClasses}>
              {column.columnDef.header as string}
            </label>
            <input
              type="number"
              value={currentValue || ''}
              onChange={(e) => setColumnFilterValue(columnId, e.target.value ? Number(e.target.value) : '')}
              placeholder={filterConfig.placeholder || `Filter ${column.columnDef.header}`}
              min={filterConfig.min}
              max={filterConfig.max}
              step={filterConfig.step}
              className={baseInputClasses}
            />
          </div>
        );

      case 'range':
        return (
          <div className="space-y-1">
            <label className={labelClasses}>
              {column.columnDef.header as string}
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={currentValue?.min || ''}
                onChange={(e) => setColumnFilterValue(columnId, {
                  ...currentValue,
                  min: e.target.value ? Number(e.target.value) : undefined,
                })}
                placeholder="Min"
                min={filterConfig.min}
                max={filterConfig.max}
                step={filterConfig.step}
                className={baseInputClasses}
              />
              <input
                type="number"
                value={currentValue?.max || ''}
                onChange={(e) => setColumnFilterValue(columnId, {
                  ...currentValue,
                  max: e.target.value ? Number(e.target.value) : undefined,
                })}
                placeholder="Max"
                min={filterConfig.min}
                max={filterConfig.max}
                step={filterConfig.step}
                className={baseInputClasses}
              />
            </div>
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-1">
            <label className={labelClasses}>
              {column.columnDef.header as string}
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="radio"
                  name={`filter-${columnId}`}
                  checked={currentValue === ''}
                  onChange={() => setColumnFilterValue(columnId, '')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>All</span>
              </label>
              {filterConfig.options?.map((option) => (
                <label key={String(option.value)} className="flex items-center space-x-2 text-sm">
                  <input
                    type="radio"
                    name={`filter-${columnId}`}
                    checked={currentValue === option.value}
                    onChange={() => setColumnFilterValue(columnId, option.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-1">
            <label className={labelClasses}>
              {column.columnDef.header as string}
            </label>
            <div className="space-y-2">
              {filterConfig.options?.map((option) => (
                <label key={String(option.value)} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={currentValue === option.value}
                    onChange={(e) => setColumnFilterValue(columnId, e.target.checked ? option.value : '')}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'rating':
        const maxRating = filterConfig.maxRating || 5;
        const ratingValue = currentValue || 0;
        return (
          <div className="space-y-1">
            <label className={labelClasses}>
              {column.columnDef.header as string}
            </label>
            <div className="flex items-center space-x-1">
              {Array.from({ length: maxRating }, (_, i) => i + 1).map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setColumnFilterValue(columnId, star)}
                  className={cn(
                    "p-1 transition-colors",
                    star <= ratingValue
                      ? "text-yellow-400 hover:text-yellow-500"
                      : "text-gray-300 hover:text-yellow-400"
                  )}
                >
                  <StarIcon className="w-4 h-4 fill-current" />
                </button>
              ))}
              {ratingValue > 0 && (
                <button
                  type="button"
                  onClick={() => setColumnFilterValue(columnId, '')}
                  className="ml-2 text-xs text-gray-500 hover:text-gray-700"
                >
                  Clear
                </button>
              )}
            </div>
            {filterConfig.showLabels && (
              <div className="text-xs text-gray-500">
                {ratingValue > 0 ? `${ratingValue} star${ratingValue > 1 ? 's' : ''}` : 'No rating'}
              </div>
            )}
          </div>
        );

      case 'boolean':
        return (
          <div className="space-y-1">
            <label className={labelClasses}>
              {column.columnDef.header as string}
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="radio"
                  name={`filter-${columnId}`}
                  checked={currentValue === ''}
                  onChange={() => setColumnFilterValue(columnId, '')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>All</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="radio"
                  name={`filter-${columnId}`}
                  checked={currentValue === true}
                  onChange={() => setColumnFilterValue(columnId, true)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>{filterConfig.trueLabel || 'Yes'}</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="radio"
                  name={`filter-${columnId}`}
                  checked={currentValue === false}
                  onChange={() => setColumnFilterValue(columnId, false)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>{filterConfig.falseLabel || 'No'}</span>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
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

          {showColumnFilters && (
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <FilterIcon className="w-4 h-4" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>
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

      {/* Column Filters */}
      {showFilters && showColumnFilters && (
        <div className="p-4 bg-gray-50 rounded-lg border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {table.getAllColumns()
              .filter((column) => column.getCanFilter() && filterConfigs[column.id])
              .map((column) => (
                <div key={column.id}>
                  {renderColumnFilter(column)}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
