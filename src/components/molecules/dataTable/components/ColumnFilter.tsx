import React, { useState } from 'react';
import type { Column } from '@tanstack/react-table';
import { AdvancedFilter } from './AdvancedFilter';
import { getFilterDisplayText } from '@/utils/filterFunctions';
import type { FilterValue } from '@/utils/filterFunctions';
import clsx from 'clsx';
import { FaFilter, FaTimes } from 'react-icons/fa';
import { useTextDirection } from '@/hooks/useTextDirection';

interface ColumnFilterProps<T extends object> {
  column: Column<T, unknown>;
  enableAdvancedFiltering?: boolean;
}

export function ColumnFilter<T extends object>({ column, enableAdvancedFiltering = true }: ColumnFilterProps<T>) {
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const columnFilterValue = column.getFilterValue() as FilterValue | string | undefined;
  const { isRTL } = useTextDirection();

  const handleClearFilter = () => {
    column.setFilterValue(undefined);
  };

  const getFilterText = () => {
    if (!columnFilterValue) return '';
    
    if (typeof columnFilterValue === 'string') {
      return columnFilterValue;
    }
    
    if (typeof columnFilterValue === 'object' && columnFilterValue.type) {
      return getFilterDisplayText(columnFilterValue);
    }
    
    return '';
  };

  const filterText = getFilterText();
  const hasFilter = !!columnFilterValue;
  const isAdvancedFilter = typeof columnFilterValue === 'object' && columnFilterValue !== null && 'type' in columnFilterValue;

  const handleBasicInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!isAdvancedFilter) {
      column.setFilterValue(value);
    }
  };

  return (
    <div className="relative">
      <div className={clsx(
        "flex items-center gap-2",
        isRTL ? "flex-row-reverse" : "flex-row"
      )}>
        <input
          type="text"
          value={filterText}
          onChange={handleBasicInputChange}
          disabled={isAdvancedFilter}
          placeholder={isAdvancedFilter ? "Advanced filter active" : `Filter ${typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id}...`}
          className={clsx(
            "w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400",
            isAdvancedFilter && 'bg-gray-100 text-gray-600 cursor-not-allowed',
            isRTL ? "text-right" : "text-left"
          )}
        />
        
        <div className={clsx(
          "flex items-center gap-1",
          isRTL ? "flex-row-reverse" : "flex-row"
        )}>
          {enableAdvancedFiltering && (column.columnDef.meta as Record<string, unknown>)?.enableAdvancedFilter !== false && (
            <button
              onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
              className={clsx(
                "p-1.5 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
                hasFilter
                  ? 'text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              )}
              type="button"
              title="Advanced filter"
            >
              <FaFilter className="w-4 h-4" />
            </button>
          )}
          
          {hasFilter && (
            <button
              onClick={handleClearFilter}
              className={clsx(
                "p-1.5 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded transition-colors duration-200"
              )}
              type="button"
              title="Clear filter"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {showAdvancedFilter && (
        <AdvancedFilter
          column={column}
          onClose={() => setShowAdvancedFilter(false)}
        />
      )}
    </div>
  );
} 