import React from 'react';
import type { Table } from '@tanstack/react-table';
import clsx from 'clsx';
import { FaBars } from 'react-icons/fa';

interface ColumnVisibilityToggleProps<T extends object> {
  table: Table<T>;
}

export function ColumnVisibilityToggle<T extends object>({ table }: ColumnVisibilityToggleProps<T>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 flex items-center gap-2 transition-colors duration-200"
        )}
        type="button"
      >
        <FaBars className="w-4 h-4" />
        <span className="hidden sm:inline">Columns</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {table.getAllLeafColumns()
              .filter(column => column.getCanHide())
              .map(column => (
                <label
                  key={column.id}
                  className={clsx(
                    "flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                    className={clsx(
                      "mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    )}
                  />
                  <span className="truncate">
                    {typeof column.columnDef.header === 'string' 
                      ? column.columnDef.header 
                      : column.id}
                  </span>
                </label>
              ))}
          </div>
        </div>
      )}
    </div>
  );
} 