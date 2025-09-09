import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { flexRender } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/atoms/checkbox/checkbox';
import type { Table, Row, Cell } from '@tanstack/react-table';
import { MoreHorizontalIcon } from 'lucide-react';
import { getDensityClasses, type RowDensity } from './dataTableDensity.utils';

interface DataTableBodyProps<TData> {
  table: Table<TData>;
  className?: string;
  bodyClassName?: string;
  rowClassName?: string | ((row: Row<TData>) => string);
  cellClassName?: string | ((cell: Cell<TData, unknown>) => string);
  size?: 'sm' | 'md' | 'lg';
  density?: RowDensity;
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
  statusConfig?: {
    field: keyof TData;
    colors: {
      [key: string]: {
        bg: string;
        text: string;
        border?: string;
      };
    };
  };
  columnStatusConfig?: {
    [columnId: string]: {
      field: keyof TData;
      colors: {
        [key: string]: {
          bg: string;
          text: string;
        };
      };
    };
  };
}

export function DataTableBody<TData>({
  table,
  bodyClassName,
  rowClassName,
  cellClassName,
  size = 'md',
  density = 'normal',
  onRowClick,
  onRowDoubleClick,
  actions = [],
  showActions = false,
  statusConfig,
  columnStatusConfig,
}: DataTableBodyProps<TData>) {
  // Helper function to get row status colors
  const getRowStatusColors = (row: Row<TData>) => {
    if (!statusConfig) return { bg: undefined, text: undefined, border: undefined };
    
    const statusValue = row.original[statusConfig.field];
    const statusKey = String(statusValue);
    const colors = statusConfig.colors[statusKey];
    
    return colors || { bg: undefined, text: undefined, border: undefined };
  };

  // Helper function to get column status colors
  const getColumnStatusColors = (cell: Cell<TData, any>) => {
    if (!columnStatusConfig || !columnStatusConfig[cell.column.id]) return { bg: undefined, text: undefined };
    
    const config = columnStatusConfig[cell.column.id];
    const statusValue = cell.row.original[config.field];
    const statusKey = String(statusValue);
    const colors = config.colors[statusKey];
    
    return colors || { bg: undefined, text: undefined };
  };

  const densityClasses = getDensityClasses(density);
  
  const rowClasses = cn(
    'hover:bg-gray-50 transition-colors duration-200 cursor-pointer',
    densityClasses.row
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
          'text-center transition-colors duration-200 hover:bg-gray-50',
          'w-2',
          densityClasses.cell
        )}
          style={{ 
            width: '32px', 
            minWidth: '32px' 
          }}
        >
          <div className="flex items-center justify-center">
            <Checkbox
              id=""
              label=""
              checked={cell.row.getIsSelected()}
              onCheckedChange={(value) => cell.row.toggleSelected(!!value)}
              aria-label={`Select row`}
            />
          </div>
        </td>
      );
    }

    const columnColors = getColumnStatusColors(cell);
    const isPinned = cell.column.getIsPinned();
    
    // Get all visible columns to determine if this is the last pinned column
    const visibleColumns = table.getVisibleLeafColumns();
    const pinnedColumns = visibleColumns.filter(col => col.getIsPinned());
    const isLastPinnedLeft = isPinned === 'left' && pinnedColumns.filter(col => col.getIsPinned() === 'left').pop()?.id === cell.column.id;
    const isLastPinnedRight = isPinned === 'right' && pinnedColumns.filter(col => col.getIsPinned() === 'right').pop()?.id === cell.column.id;
    
    return (
      <td
        key={cell.id}
        className={cn(
          'text-gray-900 whitespace-nowrap transition-colors duration-200 relative',
          densityClasses.cell,
          !columnColors.bg && 'hover:bg-gray-50',
          typeof cellClassName === 'function' ? cellClassName(cell) : cellClassName,
          // Pinned column styling - only last pinned column gets border
          {
            'border-r-2 border-r-blue-300': isLastPinnedLeft,
            'border-l-2 border-l-blue-300': isLastPinnedRight,
          }
        )}
        style={{
          backgroundColor: columnColors.bg || undefined,
          color: columnColors.text || undefined,
        }}
        onMouseEnter={(e) => {
          if (columnColors.bg) {
            // Create a slightly darker version for hover
            const rgb = columnColors.bg.match(/\d+/g);
            if (rgb && rgb.length >= 3) {
              const r = Math.max(0, parseInt(rgb[0]) - 20);
              const g = Math.max(0, parseInt(rgb[1]) - 20);
              const b = Math.max(0, parseInt(rgb[2]) - 20);
              e.currentTarget.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            }
          } else {
            e.currentTarget.style.backgroundColor = '#f9fafb';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = columnColors.bg || '';
        }}
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
      <td className="px-1 py-3 text-gray-900 sticky right-0 bg-white border-l border-gray-200 w-12 transition-colors duration-200 hover:bg-gray-50">
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

  const renderRow = (row: Row<TData>) => {
    const rowColors = getRowStatusColors(row);
    const isEven = row.index % 2 !== 0;
    
    return (
      <>
        <tr
          key={row.id}
          className={cn(
            rowClasses,
            typeof rowClassName === 'function' ? rowClassName(row) : rowClassName,
            {
              'bg-blue-50': row.getIsSelected(),
              'cursor-pointer': onRowClick || onRowDoubleClick || row.getCanExpand(),
              'hover:bg-blue-200': !rowColors.bg && !row.getIsSelected(),
              'bg-gray-100': !rowColors.bg && !row.getIsSelected() && isEven,
              'bg-white': !rowColors.bg && !row.getIsSelected() && !isEven,
            }
          )}
          style={{
            backgroundColor: row.getIsSelected() ? '#dbeafe' : rowColors.bg, // Blue-100 for selected rows
            color: rowColors.text,
            borderColor: rowColors.border,
          }}
          onMouseEnter={(e) => {
            if (row.getIsSelected()) {
              // For selected rows, use a darker blue
              e.currentTarget.style.backgroundColor = '#bfdbfe'; // Blue-200
            } else if (rowColors.bg) {
              // Create a slightly darker version for hover
              const rgb = rowColors.bg.match(/\d+/g);
              if (rgb && rgb.length >= 3) {
                const r = Math.max(0, parseInt(rgb[0]) - 20);
                const g = Math.max(0, parseInt(rgb[1]) - 20);
                const b = Math.max(0, parseInt(rgb[2]) - 20);
                e.currentTarget.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
              }
            } else {
              e.currentTarget.style.backgroundColor = '#f9fafb';
            }
          }}
          onMouseLeave={(e) => {
            if (row.getIsSelected()) {
              e.currentTarget.style.backgroundColor = '#dbeafe'; // Blue-100 for selected
            } else {
              e.currentTarget.style.backgroundColor = rowColors.bg || '';
            }
          }}
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
  };

  return (
    <tbody className={bodyClasses}>
      {table.getRowModel().rows.map(renderRow)}
    </tbody>
  );
}
