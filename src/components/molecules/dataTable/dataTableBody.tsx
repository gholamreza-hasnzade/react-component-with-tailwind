import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { flexRender } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/atoms/checkbox/checkbox';
import type { Table, Row, Cell } from '@tanstack/react-table';
import { MoreHorizontalIcon, ChevronDownIcon } from 'lucide-react';

interface DataTableBodyProps<TData> {
  table: Table<TData>;
  className?: string;
  bodyClassName?: string;
  rowClassName?: string | ((row: Row<TData>) => string);
  cellClassName?: string | ((cell: Cell<TData, any>) => string);
  size?: 'sm' | 'md' | 'lg';
  density?: 'compact' | 'normal' | 'comfortable';
  onRowClick?: (row: Row<TData>) => void;
  onRowDoubleClick?: (row: Row<TData>) => void;
  actions?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: (row: Row<TData>) => void;
    variant?: 'default' | 'destructive' | 'outline';
    disabled?: (row: Row<TData>) => boolean;
  }>;
  showActions?: boolean;
}

export function DataTableBody<TData>({
  table,
  className,
  bodyClassName,
  rowClassName,
  cellClassName,
  size = 'md',
  density = 'normal',
  onRowClick,
  onRowDoubleClick,
  actions = [],
  showActions = false,
}: DataTableBodyProps<TData>) {
  const rowClasses = cn(
    'hover:bg-gray-50 transition-colors',
    {
      'h-8': density === 'compact',
      'h-10': density === 'normal',
      'h-12': density === 'comfortable',
    }
  );

  const bodyClasses = cn(
    'bg-white divide-y divide-gray-200',
    {
      'text-xs': size === 'sm',
      'text-sm': size === 'md',
      'text-base': size === 'lg',
    },
    bodyClassName
  );

  const renderCell = (cell: Cell<TData, any>) => {
    // Special handling for select column
    if (cell.column.id === 'select') {
      return (
        <td
          key={cell.id}
          className={cn(
            'px-1 py-3 text-center',
            'w-2'
          )}
          style={{ 
            width: '32px', 
            minWidth: '32px' 
          }}
        >
          <div className="flex items-center justify-center">
            <Checkbox
              checked={cell.row.getIsSelected()}
              onCheckedChange={(value) => cell.row.toggleSelected(!!value)}
              aria-label={`Select row`}
            />
          </div>
        </td>
      );
    }

    return (
      <td
        key={cell.id}
        className={cn(
          'px-2 sm:px-4 py-3 text-gray-900 whitespace-nowrap',
          typeof cellClassName === 'function' ? cellClassName(cell) : cellClassName
        )}
      >
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </td>
    );
  };

  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpenPopover(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenPopover(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const updatePopoverPosition = (button: HTMLButtonElement) => {
    const rect = button.getBoundingClientRect();
    const popoverWidth = 192; // w-48 = 192px
    const viewportWidth = window.innerWidth;
    
    // Calculate left position, ensuring it doesn't go off screen
    let left = rect.right - popoverWidth;
    if (left < 0) {
      left = rect.left;
    }
    if (left + popoverWidth > viewportWidth) {
      left = viewportWidth - popoverWidth - 10; // 10px margin from edge
    }
    
    setPopoverPosition({
      top: rect.bottom + 4,
      left: left,
    });
  };

  const renderActions = (row: Row<TData>) => {
    if (!showActions || actions.length === 0) return null;

    const isOpen = openPopover === row.id;

    return (
      <td className="px-1 py-3 text-gray-900 sticky right-0 bg-white border-l border-gray-200 w-12">
        <div className="relative flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              const button = e.currentTarget;
              updatePopoverPosition(button);
              setOpenPopover(isOpen ? null : row.id);
            }}
            className="p-1 hover:bg-gray-200 rounded transition-colors "
            title="Actions"
          >
            <MoreHorizontalIcon className="w-4 h-4" />
          </button>

          {isOpen && createPortal(
              <div 
                ref={popoverRef}
                className="fixed w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-[9999]"
                style={{
                  top: popoverPosition.top,
                  left: popoverPosition.left,
                }}
              >
              <div className="py-1">
                {actions.map((action, index) => {
                  const isDisabled = action.disabled?.(row) || false;
                  const itemClasses = cn(
                    'flex items-center gap-2 px-3 py-2 text-sm transition-colors cursor-pointer',
                    {
                      'text-gray-700 hover:bg-gray-100': !isDisabled && action.variant === 'default' || !action.variant,
                      'text-red-700 hover:bg-red-50': !isDisabled && action.variant === 'destructive',
                      'text-gray-600 hover:bg-gray-50': !isDisabled && action.variant === 'outline',
                      'text-gray-400 cursor-not-allowed': isDisabled,
                    }
                  );

                  return (
                    <div
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isDisabled) {
                          action.onClick(row);
                          setOpenPopover(null);
                        }
                      }}
                      className={itemClasses}
                    >
                      {action.icon && <span className="w-4 h-4">{action.icon}</span>}
                      <span>{action.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>,
            document.body
          )}
        </div>
      </td>
    );
  };

  const renderRow = (row: Row<TData>) => (
    <>
      <tr
        key={row.id}
        className={cn(
          rowClasses,
          typeof rowClassName === 'function' ? rowClassName(row) : rowClassName,
          {
            'bg-blue-50': row.getIsSelected(),
            'cursor-pointer': onRowClick || onRowDoubleClick || row.getCanExpand(),
            'hover:bg-gray-100': row.getCanExpand(),
          }
        )}
        onClick={() => {
          if (row.getCanExpand()) {
            row.toggleExpanded();
          }
          onRowClick?.(row);
        }}
        onDoubleClick={() => onRowDoubleClick?.(row)}
      >
        {row.getVisibleCells().map(renderCell)}
        {renderActions(row)}
      </tr>
      {row.getIsExpanded() && row.subRows && row.subRows.length > 0 && (
        <tr key={`${row.id}-expanded`} className="bg-gray-50">
          <td colSpan={row.getVisibleCells().length + (showActions ? 1 : 0)} className="px-4 py-2">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Expanded Details:</div>
              <div className="space-y-2">
                {Object.entries(row.original as Record<string, any>).map(([key, value]) => (
                  <div key={key} className="flex">
                    <span className="font-medium text-gray-700 w-32 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-gray-900">
                      {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );

  return (
    <tbody className={bodyClasses}>
      {table.getRowModel().rows.map(renderRow)}
    </tbody>
  );
}
