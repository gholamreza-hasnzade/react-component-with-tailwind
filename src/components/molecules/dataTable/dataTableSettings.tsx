import React, { useState } from 'react';
import { Checkbox } from '@/components/atoms/checkbox/checkbox';
import { cn } from '@/lib/utils';
import { GripVerticalIcon, XIcon } from 'lucide-react';
import type { Table, Column } from '@tanstack/react-table';

// Helper function to get display name for columns
const getColumnDisplayName = <TData,>(column: Column<TData, unknown>): string => {
  if (typeof column.columnDef.header === 'string') {
    return column.columnDef.header;
  }
  return column.id;
};

interface DataTableSettingsProps<TData> {
  table: Table<TData>;
  showColumnVisibility?: boolean;
  showColumnOrdering?: boolean;
  showColumnPinning?: boolean;
  showColumnSizing?: boolean;
  className?: string;
  onClose?: () => void;
}

export function DataTableSettings<TData>({
  table,
  showColumnVisibility = true,
  showColumnOrdering = true,
  showColumnPinning = true,
  showColumnSizing = true,
  className,
  onClose,
}: DataTableSettingsProps<TData>) {
  const columns = table.getAllColumns();
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);


  const handleDragStart = (e: React.DragEvent, columnId: string) => {
    setDraggedColumn(columnId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverColumn(columnId);
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnd = () => {
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedColumn || draggedColumn === targetColumnId) {
      setDraggedColumn(null);
      setDragOverColumn(null);
      return;
    }

    const currentOrder = table.getState().columnOrder.length > 0 
      ? table.getState().columnOrder 
      : columns.map(col => col.id);
    
    const draggedIndex = currentOrder.indexOf(draggedColumn);
    const targetIndex = currentOrder.indexOf(targetColumnId);
    
    if (draggedIndex === -1 || targetIndex === -1) return;

    const newOrder = [...currentOrder];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedColumn);
    
    table.setColumnOrder(newOrder);
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  return (
    <div className={cn('absolute inset-y-0 left-0 z-50 w-80 bg-white shadow-xl border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Table Settings</h2>
          <p className="text-sm text-gray-600">Configure columns and display</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close settings"
          >
            <XIcon className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {showColumnVisibility && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Column Visibility</h3>
            <div className="space-y-2">
              {columns.map((column) => (
                <div key={column.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`visibility-${column.id}`}
                    label={getColumnDisplayName(column)}
                    checked={column.getIsVisible()}
                    onCheckedChange={(checked) => column.toggleVisibility(!!checked)}
                    className="text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {showColumnOrdering && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Column Ordering</h3>
            <div className="text-xs text-gray-500 mb-3">
              Drag to reorder columns
            </div>
            <div className="space-y-1">
              {table.getState().columnOrder.length > 0 
                ? table.getState().columnOrder
                    .map(columnId => columns.find(col => col.id === columnId))
                    .filter((column): column is NonNullable<typeof column> => Boolean(column))
                    .map((column) => (
                <div
                  key={column.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, column.id)}
                  onDragOver={(e) => handleDragOver(e, column.id)}
                  onDragEnd={handleDragEnd}
                  onDrop={(e) => handleDrop(e, column.id)}
                  className={cn(
                    "flex items-center gap-2 p-2 bg-white rounded border text-xs cursor-move transition-colors",
                    {
                      "opacity-50": draggedColumn === column.id,
                      "border-blue-500 bg-blue-50": dragOverColumn === column.id && draggedColumn !== column.id,
                    }
                  )}
                >
                  <GripVerticalIcon className="w-4 h-4 text-gray-400" />
                  <span className="flex-1">{getColumnDisplayName(column)}</span>
                </div>
              ))
                : columns.map((column) => (
                <div
                  key={column.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, column.id)}
                  onDragOver={(e) => handleDragOver(e, column.id)}
                  onDragEnd={handleDragEnd}
                  onDrop={(e) => handleDrop(e, column.id)}
                  className={cn(
                    "flex items-center gap-2 p-2 bg-white rounded border text-xs cursor-move transition-colors",
                    {
                      "opacity-50": draggedColumn === column.id,
                      "border-blue-500 bg-blue-50": dragOverColumn === column.id && draggedColumn !== column.id,
                    }
                  )}
                >
                  <GripVerticalIcon className="w-4 h-4 text-gray-400" />
                  <span className="flex-1">{getColumnDisplayName(column)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {showColumnPinning && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Column Pinning</h3>
            <div className="text-sm text-gray-500 mb-2">
              Pin columns to left or right
            </div>
            <div className="space-y-2">
              {columns.map((column) => (
                <div key={column.id} className="flex items-center gap-2">
                  <span className="text-sm text-gray-700 min-w-0 flex-1 truncate">
                    {getColumnDisplayName(column)}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => column.pin('left')}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                      disabled={column.getIsPinned() === 'left'}
                    >
                      Left
                    </button>
                    <button
                      onClick={() => column.pin('right')}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                      disabled={column.getIsPinned() === 'right'}
                    >
                      Right
                    </button>
                    <button
                      onClick={() => column.pin(false)}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      disabled={!column.getIsPinned()}
                    >
                      None
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showColumnSizing && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Column Sizing</h3>
            <div className="text-sm text-gray-500 mb-2">
              Adjust column widths
            </div>
            <div className="space-y-2">
              {columns.map((column) => (
                <div key={column.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id}</span>
                    <span className="text-xs text-gray-500">
                      {Math.round(column.getSize())}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    value={column.getSize()}
                    onChange={(e) => table.setColumnSizing(prev => ({
                      ...prev,
                      [column.id]: Number(e.target.value)
                    }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    aria-label={`Adjust width for ${column.id} column`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
