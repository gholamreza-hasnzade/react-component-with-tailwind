import { flexRender } from '@tanstack/react-table';
import { 
  ArrowUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PinIcon,
  GripVerticalIcon,
  CalendarIcon,
  StarIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/atoms/checkbox/checkbox';
import type { Table, Header, HeaderGroup } from '@tanstack/react-table';
import { getDensityClasses, type RowDensity } from './dataTableDensity.utils';
import { useState } from 'react';
import type { FilterConfig } from './dataTableFilters';

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
  filterConfigs?: Record<string, FilterConfig>;
  columnFilters?: Record<string, unknown>;
  setColumnFilters?: (filters: Record<string, unknown>) => void;
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
  filterConfigs = {},
  columnFilters = {},
  setColumnFilters,
}: DataTableHeaderProps<TData>) {
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const densityClasses = getDensityClasses(density);

  const getColumnFilterValue = (columnId: string) => {
    return columnFilters[columnId] || '';
  };

  const setColumnFilterValue = (columnId: string, value: unknown) => {
    if (!setColumnFilters) return;
    setColumnFilters({
      ...columnFilters,
      [columnId]: value,
    });
    
    // Note: Auto-sorting removed - sorting should only happen when clicking sort icons
  };

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

  const renderInlineFilter = (columnId: string, filterConfig: FilterConfig) => {
    const currentValue = getColumnFilterValue(columnId);
    const baseInputClasses = "w-full px-1 py-0.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500";

    switch (filterConfig.type) {
      case 'text':
        return (
          <input
            type="text"
            value={String(currentValue || '')}
            onChange={(e) => setColumnFilterValue(columnId, e.target.value)}
            placeholder={filterConfig.placeholder || 'Filter...'}
            className={baseInputClasses}
          />
        );

      case 'select':
        return (
          <select
            value={String(currentValue || '')}
            onChange={(e) => setColumnFilterValue(columnId, e.target.value)}
            aria-label="Filter options"
            className={baseInputClasses}
          >
            <option value="">All</option>
            {filterConfig.options?.map((option) => (
              <option key={String(option.value)} value={String(option.value)}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'multiselect': {
        const selectedValues = Array.isArray(currentValue) ? currentValue : [];
        return (
          <div className="space-y-1 max-h-20 overflow-y-auto">
            {filterConfig.options?.slice(0, 3).map((option) => (
              <label key={String(option.value)} className="flex items-center space-x-1 text-xs">
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.value)}
                  onChange={(e) => {
                    const newValues = e.target.checked
                      ? [...selectedValues, option.value]
                      : selectedValues.filter(v => v !== option.value);
                    setColumnFilterValue(columnId, newValues);
                  }}
                  aria-label={`Select ${option.label}`}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3 h-3"
                />
                <span className="truncate">{option.label}</span>
              </label>
            ))}
            {filterConfig.options && filterConfig.options.length > 3 && (
              <div className="text-xs text-gray-500">+{filterConfig.options.length - 3} more</div>
            )}
          </div>
        );
      }

      case 'date':
        return (
          <div className="relative">
            <input
              type="date"
              value={String(currentValue || '')}
              onChange={(e) => setColumnFilterValue(columnId, e.target.value)}
              aria-label="Filter by date"
              className={`${baseInputClasses} pr-6`}
            />
            <CalendarIcon className="absolute right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
          </div>
        );

      case 'datetime':
        return (
          <div className="relative">
            <input
              type="datetime-local"
              value={String(currentValue || '')}
              onChange={(e) => setColumnFilterValue(columnId, e.target.value)}
              aria-label="Filter by date and time"
              className={`${baseInputClasses} pr-6`}
            />
            <CalendarIcon className="absolute right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
          </div>
        );

      case 'time':
        return (
          <input
            type="time"
            value={String(currentValue || '')}
            onChange={(e) => setColumnFilterValue(columnId, e.target.value)}
            aria-label="Filter by time"
            className={baseInputClasses}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={String(currentValue || '')}
            onChange={(e) => setColumnFilterValue(columnId, e.target.value ? Number(e.target.value) : '')}
            placeholder={filterConfig.placeholder || 'Filter...'}
            min={filterConfig.min}
            max={filterConfig.max}
            step={filterConfig.step}
            className={baseInputClasses}
          />
        );

      case 'range': {
        const rangeValue = currentValue as { min?: number; max?: number } || {};
        return (
          <div className="flex space-x-1">
            <input
              type="number"
              value={String(rangeValue.min || '')}
              onChange={(e) => setColumnFilterValue(columnId, {
                ...rangeValue,
                min: e.target.value ? Number(e.target.value) : undefined,
              })}
              placeholder="Min"
              min={filterConfig.min}
              max={filterConfig.max}
              step={filterConfig.step}
              className={baseInputClasses}
            />
            <input
              type="number"
              value={String(rangeValue.max || '')}
              onChange={(e) => setColumnFilterValue(columnId, {
                ...rangeValue,
                max: e.target.value ? Number(e.target.value) : undefined,
              })}
              placeholder="Max"
              min={filterConfig.min}
              max={filterConfig.max}
              step={filterConfig.step}
              className={baseInputClasses}
            />
          </div>
        );
      }

      case 'rating': {
        const maxRating = filterConfig.maxRating || 5;
        const ratingValue = Number(currentValue) || 0;
        return (
          <div className="flex items-center space-x-1">
            {Array.from({ length: maxRating }, (_, i) => i + 1).map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setColumnFilterValue(columnId, star)}
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                className={cn(
                  "p-0.5 transition-colors",
                  star <= ratingValue
                    ? "text-yellow-400 hover:text-yellow-500"
                    : "text-gray-300 hover:text-yellow-400"
                )}
              >
                <StarIcon className="w-3 h-3 fill-current" />
              </button>
            ))}
            {ratingValue > 0 && (
              <button
                type="button"
                onClick={() => setColumnFilterValue(columnId, '')}
                className="ml-1 text-xs text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            )}
          </div>
        );
      }

      case 'boolean':
        return (
          <select
            value={currentValue === '' ? '' : String(currentValue)}
            onChange={(e) => setColumnFilterValue(columnId, e.target.value === '' ? '' : e.target.value === 'true')}
            aria-label="Filter boolean values"
            className={baseInputClasses}
          >
            <option value="">All</option>
            <option value="true">{filterConfig.trueLabel || 'Yes'}</option>
            <option value="false">{filterConfig.falseLabel || 'No'}</option>
          </select>
        );

      default:
        return null;
    }
  };

  const renderSortIcon = (header: Header<TData, unknown>) => {
    if (!header.column.getCanSort()) return null;
    
    const filterConfig = filterConfigs[header.column.id];
    if (filterConfig?.disableSorting) return null;
    
    const sorted = header.column.getIsSorted();
    if (sorted === 'asc') return <ArrowUpIcon className="w-4 h-4 cursor-pointer hover:text-blue-600" onClick={header.column.getToggleSortingHandler()}/>;
    if (sorted === 'desc') return <ArrowDownIcon className="w-4 h-4 cursor-pointer hover:text-blue-600" onClick={header.column.getToggleSortingHandler()}/>;
    return <ArrowUpDownIcon className="w-4 h-4 cursor-pointer hover:text-blue-600" onClick={header.column.getToggleSortingHandler()}/>;
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
        draggable={enableColumnOrdering && !header.column.getIsPinned()}
        onDragStart={(e) => handleDragStart(e, header.column.id)}
        onDragOver={(e) => handleDragOver(e, header.column.id)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, header.column.id)}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Drag handle */}
            {enableColumnOrdering && !header.column.getIsPinned() && (
              <div className="cursor-grab active:cursor-grabbing" >
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
          {/* Inline Filter */}
          {filterConfigs[header.column.id] && filterConfigs[header.column.id].showFilter !== false && (
            <div className="mt-1">
              {renderInlineFilter(header.column.id, filterConfigs[header.column.id])}
            </div>
          )}
        </div>
        
        {/* Resize handle */}
        {header.column.getCanResize() && (
          <div
            onMouseDown={header.getResizeHandler()}
            onTouchStart={header.getResizeHandler()}
            className="absolute right-0 top-0 h-full w-1 bg-transparent hover:bg-blue-500 cursor-col-resize select-none touch-none"
            style={{ transform: 'translateX(50%)' }}
          />
        )}
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
