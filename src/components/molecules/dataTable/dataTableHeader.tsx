import { flexRender } from '@tanstack/react-table';
import { 
  ArrowUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PinIcon,
  GripVerticalIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/atoms/checkbox/checkbox';
import type { Table, Header, HeaderGroup } from '@tanstack/react-table';
import { getDensityClasses, type RowDensity } from './dataTableDensity.utils';
import { useState } from 'react';

interface DataTableHeaderProps<TData> {
  table: Table<TData>;
  className?: string;
  headerClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  density?: RowDensity;
  showActions?: boolean;
  actionsLabel?: string;
  columnWidths?: Record<string, number>;
  enableColumnOrdering?: boolean;
}

export function DataTableHeader<TData>({
  table,
  headerClassName,
  size = 'md',
  density = 'normal',
  showActions = false,
  actionsLabel = 'Actions',
  columnWidths = {},
  enableColumnOrdering = false,
}: DataTableHeaderProps<TData>) {
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const densityClasses = getDensityClasses(density);

  const handleDragStart = (e: React.DragEvent, columnId: string) => {
    if (!enableColumnOrdering) return;
    setDraggedColumn(columnId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', columnId);
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    if (!enableColumnOrdering || !draggedColumn) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    if (!enableColumnOrdering || !draggedColumn) return;
    e.preventDefault();
    
    if (draggedColumn !== targetColumnId) {
      const columnOrder = table.getState().columnOrder;
      const draggedIndex = columnOrder.findIndex(id => id === draggedColumn);
      const targetIndex = columnOrder.findIndex(id => id === targetColumnId);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newColumnOrder = [...columnOrder];
        const draggedCol = newColumnOrder[draggedIndex];
        newColumnOrder.splice(draggedIndex, 1);
        newColumnOrder.splice(targetIndex, 0, draggedCol);
        
        table.setColumnOrder(newColumnOrder);
      }
    }
    
    setDraggedColumn(null);
    setDragOverColumn(null);
  };
  const renderSortIcon = (header: Header<TData, unknown>) => {
    if (!header.column.getCanSort()) return null;
    
    const sorted = header.column.getIsSorted();
    if (sorted === 'asc') return <ArrowUpIcon className="w-4 h-4" />;
    if (sorted === 'desc') return <ArrowDownIcon className="w-4 h-4" />;
    return <ArrowUpDownIcon className="w-4 h-4" />;
  };

  const renderColumnHeader = (header: Header<TData, unknown>) => {
    // Special handling for select column
    if (header.id === 'select') {
      return (
        <th
          key={header.id}
          colSpan={header.colSpan}
          className={cn(
            'text-center font-medium text-gray-900 whitespace-nowrap transition-colors duration-200 hover:bg-gray-100',
            'w-2',
            densityClasses.header
          )}
          style={{ 
            width: '32px', 
            minWidth: '32px' 
          }}
        >
          <div className="flex items-center justify-center">
            <Checkbox
              id="select-all-header"
              label=""
              checked={table.getIsAllPageRowsSelected()}
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            />
          </div>
        </th>
      );
    }

    const isPinned = header.column.getIsPinned();
    
    // Get all visible columns to determine if this is the last pinned column
    const visibleColumns = table.getVisibleLeafColumns();
    const pinnedColumns = visibleColumns.filter(col => col.getIsPinned());
    const isLastPinnedLeft = isPinned === 'left' && pinnedColumns.filter(col => col.getIsPinned() === 'left').pop()?.id === header.column.id;
    const isLastPinnedRight = isPinned === 'right' && pinnedColumns.filter(col => col.getIsPinned() === 'right').pop()?.id === header.column.id;
    
    return (
      <th
        key={header.id}
        colSpan={header.colSpan}
        className={cn(
          'text-left font-medium text-gray-900 whitespace-nowrap transition-colors duration-200 relative',
          densityClasses.header,
          {
            'cursor-pointer select-none hover:bg-gray-100 hover:text-gray-700': header.column.getCanSort(),
            'hover:bg-gray-50': !header.column.getCanSort(),
            'text-xs': size === 'sm',
            'text-sm': size === 'md',
            'text-base': size === 'lg',
            // Pinned column styling - only last pinned column gets border
            'border-r-2 border-r-blue-300': isLastPinnedLeft,
            'border-l-2 border-l-blue-300': isLastPinnedRight,
            // Drag and drop styling
            'cursor-grab active:cursor-grabbing': enableColumnOrdering && !header.column.getIsPinned(),
            'opacity-50': draggedColumn === header.column.id,
            'bg-blue-50 border-blue-200': dragOverColumn === header.column.id,
          }
        )}
        style={{ 
          width: `${columnWidths[header.column.id] || header.getSize()}px`, 
          minWidth: '100px' 
        }}
        onClick={header.column.getToggleSortingHandler()}
        draggable={enableColumnOrdering && !header.column.getIsPinned()}
        onDragStart={(e) => handleDragStart(e, header.column.id)}
        onDragOver={(e) => handleDragOver(e, header.column.id)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, header.column.id)}
      >
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Drag handle */}
          {enableColumnOrdering && !header.column.getIsPinned() && (
            <div className="cursor-grab active:cursor-grabbing">
              <GripVerticalIcon className="w-3 h-3 text-gray-400 hover:text-gray-600" />
            </div>
          )}
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
          {renderSortIcon(header)}
          {/* Pin indicator */}
          {isPinned && (
            <div title={`Pinned ${isPinned}`}>
              <PinIcon className="w-3 h-3 text-blue-600" />
            </div>
          )}
        </div>
      </th>
    );
  };

  return (
    <thead className={cn('bg-gray-50', headerClassName)}>
      {table.getHeaderGroups().map((headerGroup: HeaderGroup<TData>) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(renderColumnHeader)}
          {showActions && (
            <th className={cn("text-center font-medium text-gray-900 whitespace-nowrap sticky right-0 bg-gray-50 border-l border-gray-200 w-12 transition-colors duration-200 hover:bg-gray-100", densityClasses.header)}>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline">{actionsLabel}</span>
              </div>
            </th>
          )}
        </tr>
      ))}
    </thead>
  );
}
