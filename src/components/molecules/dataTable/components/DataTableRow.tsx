import React, { memo } from 'react';
import type { Row, Cell, Table, Column } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import type { Action } from '../types';
import clsx from 'clsx';

interface DataTableRowProps<T extends object> {
  row: Row<T>;
  idx: number;
  actions?: Action<T>[];
  actionsHorizontal?: boolean;
  enableColumnPinning?: boolean;
  densityClasses: string;
  isSelected: boolean;
  selectedRowClassName?: string;
  customRowClass: string;
  onSelectSingleRow?: (row: T) => void;
  onRowClick?: () => void;
  ActionsRow: React.ComponentType<{ actions: Action<T>[]; row: T }>;
  table: Table<T>;
}

export const DataTableRow = memo(<T extends object>({
  row,
  idx,
  actions,
  actionsHorizontal = false,
  enableColumnPinning = false,
  densityClasses,
  isSelected,
  selectedRowClassName,
  customRowClass,
  onSelectSingleRow,
  onRowClick,
  ActionsRow,
  table,
}: DataTableRowProps<T>) => {
  const renderCell = (cell: Cell<T, unknown>) => {
    const isPinned = enableColumnPinning && cell.column.getIsPinned();
    const pinnedPosition = isPinned ? cell.column.getPinnedIndex() : null;
    
    const pinnedColumns = enableColumnPinning 
      ? table?.getAllLeafColumns().filter((col: Column<T, unknown>) => col.getIsPinned() === (isPinned === 'left' ? 'left' : 'right'))
      : [];
    const isLastPinned = isPinned && pinnedPosition === pinnedColumns.length - 1;
    
    return (
      <td
        key={cell.id}
        className={clsx(
          "px-4 sm:px-6",
          densityClasses,
          "text-sm text-gray-900 text-right",
          cell.column.id === "actions" && "sticky left-0 z-20 border-l border-gray-300",
          isPinned && [
            "sticky z-20",
            isPinned === 'left' ? 'left-0' : 'right-0',
            isLastPinned ? (isPinned === 'left' ? 'border-l border-gray-300' : 'border-r border-gray-300') : ''
          ]
        )}
        style={{
          width: cell.column.getSize
            ? cell.column.getSize()
            : cell.column.columnDef.size,
          minWidth: cell.column.getSize
            ? cell.column.getSize()
            : cell.column.columnDef.size || 150,
          maxWidth: cell.column.getSize
            ? cell.column.getSize()
            : cell.column.columnDef.size,
          ...(isPinned && isPinned === 'left' && pinnedPosition !== null
            ? { left: `${pinnedPosition * (cell.column.getSize() || 150)}px` }
            : {}),
          ...(isPinned && isPinned === 'right' && pinnedPosition !== null
            ? { right: `${pinnedPosition * (cell.column.getSize() || 150)}px` }
            : {}),
        }}
      >
        {cell.column.id === "select" || cell.column.id === "actions" ? (
          <span>
            {flexRender(
              cell.column.columnDef.cell,
              cell.getContext()
            )}
          </span>
        ) : (
          <div className="group relative">
            <span className="truncate block">
              {flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
              )}
            </span>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              {String(cell.getValue?.() ?? "")}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        )}
      </td>
    );
  };

  return (
    <tr
      className={clsx(
        "transition-all duration-200",
        isSelected
          ? selectedRowClassName || "bg-blue-100 border-l-4 border-blue-500 shadow-sm"
          : customRowClass || (idx % 2 === 0
            ? "bg-white hover:bg-blue-50"
            : "bg-gray-50 hover:bg-blue-50"),
        onSelectSingleRow && "cursor-pointer"
      )}
      style={{
        ...(isSelected && {
          '--tw-bg-opacity': '1',
          backgroundColor: 'rgb(219 234 254 / var(--tw-bg-opacity))'
        })
      }}
      onClick={onRowClick}
    >
      {actionsHorizontal ? (
        <>
          {row.getVisibleCells().map(renderCell)}
          <td className={clsx(
            "px-4 sm:px-6",
            densityClasses,
            "whitespace-nowrap text-sm text-gray-900 border-b border-gray-100 text-right"
          )}>
            <ActionsRow
              actions={actions ?? []}
              row={row.original}
            />
          </td>
        </>
      ) : (
        row.getVisibleCells().map(renderCell)
      )}
    </tr>
  );
});

DataTableRow.displayName = 'DataTableRow'; 