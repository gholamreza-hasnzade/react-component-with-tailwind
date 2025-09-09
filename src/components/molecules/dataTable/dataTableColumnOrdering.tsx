import { useState } from 'react';
import { GripVerticalIcon, ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Table, Column } from '@tanstack/react-table';

interface DataTableColumnOrderingProps<TData> {
  table: Table<TData>;
  onClose?: () => void;
}

export function DataTableColumnOrdering<TData>({
  table,
  onClose,
}: DataTableColumnOrderingProps<TData>) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = useState<string | null>(null);

  const columns = table.getAllColumns();
  const columnOrder = table.getState().columnOrder;

  const handleDragStart = (e: React.DragEvent, columnId: string) => {
    setDraggedItem(columnId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', columnId);
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    if (!draggedItem) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverItem(columnId);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    if (!draggedItem) return;
    e.preventDefault();
    
    if (draggedItem !== targetColumnId) {
      const draggedIndex = columnOrder.findIndex(id => id === draggedItem);
      const targetIndex = columnOrder.findIndex(id => id === targetColumnId);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newOrder = [...columnOrder];
        const draggedCol = newOrder[draggedIndex];
        newOrder.splice(draggedIndex, 1);
        newOrder.splice(targetIndex, 0, draggedCol);
        
        table.setColumnOrder(newOrder);
      }
    }
    
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const moveColumn = (columnId: string, direction: 'up' | 'down') => {
    const currentIndex = columnOrder.findIndex(id => id === columnId);
    if (currentIndex === -1) return;
    
    const newOrder = [...columnOrder];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (targetIndex >= 0 && targetIndex < newOrder.length) {
      [newOrder[currentIndex], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[currentIndex]];
      table.setColumnOrder(newOrder);
    }
  };

  const resetOrder = () => {
    const defaultOrder = columns.map(col => col.id);
    table.setColumnOrder(defaultOrder);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Column Ordering</h3>
        <div className="flex gap-2">
          <button
            onClick={resetOrder}
            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
          >
            Reset
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-600 mb-3">
          Drag and drop columns to reorder them, or use the arrow buttons.
        </p>
        
        {columnOrder.map((columnId, index) => {
          const column = columns.find(col => col.id === columnId);
          if (!column) return null;
          
          const isPinned = column.getIsPinned();
          const isVisible = column.getIsVisible();
          
          return (
            <div
              key={columnId}
              className={cn(
                'flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg transition-all duration-200',
                {
                  'opacity-50': draggedItem === columnId,
                  'bg-blue-50 border-blue-200': dragOverItem === columnId,
                  'bg-gray-100': !isVisible,
                }
              )}
              draggable={!isPinned}
              onDragStart={(e) => handleDragStart(e, columnId)}
              onDragOver={(e) => handleDragOver(e, columnId)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, columnId)}
            >
              {/* Drag handle */}
              {!isPinned && (
                <div className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600">
                  <GripVerticalIcon className="w-4 h-4" />
                </div>
              )}
              
              {/* Column info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 truncate">
                    {typeof column.columnDef.header === 'string' 
                      ? column.columnDef.header 
                      : column.id}
                  </span>
                  {isPinned && (
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      Pinned
                    </span>
                  )}
                  {!isVisible && (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                      Hidden
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  ID: {column.id}
                </div>
              </div>
              
              {/* Move buttons */}
              <div className="flex gap-1">
                <button
                  onClick={() => moveColumn(columnId, 'up')}
                  disabled={index === 0 || isPinned}
                  className={cn(
                    'p-1 rounded hover:bg-gray-100 transition-colors',
                    {
                      'opacity-50 cursor-not-allowed': index === 0 || isPinned,
                      'hover:bg-gray-200': index > 0 && !isPinned,
                    }
                  )}
                  title="Move up"
                >
                  <ArrowUpIcon className="w-3 h-3" />
                </button>
                <button
                  onClick={() => moveColumn(columnId, 'down')}
                  disabled={index === columnOrder.length - 1 || isPinned}
                  className={cn(
                    'p-1 rounded hover:bg-gray-100 transition-colors',
                    {
                      'opacity-50 cursor-not-allowed': index === columnOrder.length - 1 || isPinned,
                      'hover:bg-gray-200': index < columnOrder.length - 1 && !isPinned,
                    }
                  )}
                  title="Move down"
                >
                  <ArrowDownIcon className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          <strong>Tip:</strong> Pinned columns cannot be reordered. Hidden columns are shown in gray.
        </p>
      </div>
    </div>
  );
}
