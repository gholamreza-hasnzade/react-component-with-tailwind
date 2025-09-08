import React from 'react';
import type { Table } from '@tanstack/react-table';
import clsx from 'clsx';
import { FaBars } from 'react-icons/fa';
import { useTextDirection } from '@/hooks/useTextDirection';

interface ColumnVisibilityToggleProps<T extends object> {
  table: Table<T>;
}

export function ColumnVisibilityToggle<T extends object>({ table }: ColumnVisibilityToggleProps<T>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const { isRTL } = useTextDirection();

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
          "px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 flex items-center gap-2 transition-colors duration-200",
          isRTL ? "flex-row-reverse" : "flex-row"
        )}
        type="button"
      >
        <FaBars className="w-4 h-4" />
        <span className={clsx(
          "hidden sm:inline",
          isRTL ? "text-right" : "text-left"
        )}>
          Columns
        </span>
      </button>

      {isOpen && (
        <div className={clsx(
          "absolute mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50",
          isRTL ? "left-0" : "right-0"
        )}>
          <div className="py-1">
            {table.getAllLeafColumns()
              .filter(column => column.getCanHide())
              .map(column => (
                <label
                  key={column.id}
                  className={clsx(
                    "flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors duration-150",
                    isRTL ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                    className={clsx(
                      "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded",
                      isRTL ? "ml-3" : "mr-3"
                    )}
                  />
                  <span className={clsx(
                    "truncate",
                    isRTL ? "text-right" : "text-left"
                  )}>
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