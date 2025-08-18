import React, { useCallback } from 'react';
import type { Table } from '@tanstack/react-table';
import clsx from 'clsx';
import { FaSearch } from 'react-icons/fa';

interface GlobalFilterProps<T extends object> {
  table: Table<T>;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

export function GlobalFilter<T extends object>({ 
  table, 
  placeholder = "Search all columns...",
  className = "",
  debounceMs = 300
}: GlobalFilterProps<T>) {
  const globalFilterValue = table.getState().globalFilter;
  const [inputValue, setInputValue] = React.useState(globalFilterValue as string);

  const debouncedSetGlobalFilter = useCallback(
    React.useMemo(
      () => {
        let timeoutId: NodeJS.Timeout;
        return (value: string) => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            table.setGlobalFilter(value);
          }, debounceMs);
        };
      },
      [table, debounceMs]
    ),
    [table, debounceMs]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedSetGlobalFilter(value);
  };

  const handleClear = () => {
    setInputValue('');
    table.setGlobalFilter('');
  };

  React.useEffect(() => {
    setInputValue(globalFilterValue as string);
  }, [globalFilterValue]);

  return (
    <div className={clsx("flex items-center gap-3", className)}>
      <div className="relative flex-1">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={clsx("w-full px-4 py-2.5 pl-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400")}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="h-4 w-4 text-gray-400" />
        </div>
      </div>
      {inputValue && (
        <button
          onClick={handleClear}
          className={clsx("px-4 py-2.5 text-sm text-gray-500 hover:text-gray-700 focus:outline-none border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium")}
          type="button"
        >
          Clear
        </button>
      )}
    </div>
  );
} 