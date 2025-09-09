import React from 'react';
import { flexRender } from '@tanstack/react-table';
import { 
  ArrowUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MoreHorizontalIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Table, Header, HeaderGroup } from '@tanstack/react-table';

interface DataTableHeaderProps<TData> {
  table: Table<TData>;
  className?: string;
  headerClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  showActions?: boolean;
  actionsLabel?: string;
}

export function DataTableHeader<TData>({
  table,
  className,
  headerClassName,
  size = 'md',
  showActions = false,
  actionsLabel = 'Actions',
}: DataTableHeaderProps<TData>) {
  const renderSortIcon = (header: Header<TData, any>) => {
    if (!header.column.getCanSort()) return null;
    
    const sorted = header.column.getIsSorted();
    if (sorted === 'asc') return <ArrowUpIcon className="w-4 h-4" />;
    if (sorted === 'desc') return <ArrowDownIcon className="w-4 h-4" />;
    return <ArrowUpDownIcon className="w-4 h-4" />;
  };

  const renderColumnHeader = (header: Header<TData, any>) => (
    <th
      key={header.id}
      colSpan={header.colSpan}
      className={cn(
        'px-2 sm:px-4 py-3 text-left font-medium text-gray-900 whitespace-nowrap',
        {
          'cursor-pointer select-none hover:bg-gray-100': header.column.getCanSort(),
          'w-12': header.id === 'select',
          'text-xs': size === 'sm',
          'text-sm': size === 'md',
          'text-base': size === 'lg',
        }
      )}
      style={{ width: `${header.getSize()}px`, minWidth: '100px' }}
      onClick={header.column.getToggleSortingHandler()}
    >
      <div className="flex items-center gap-1 sm:gap-2">
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
        {renderSortIcon(header)}
      </div>
    </th>
  );

  return (
    <thead className={cn('bg-gray-50', headerClassName)}>
      {table.getHeaderGroups().map((headerGroup: HeaderGroup<TData>) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(renderColumnHeader)}
          {showActions && (
            <th className="px-1 py-3 text-center font-medium text-gray-900 whitespace-nowrap sticky right-0 bg-gray-50 border-l border-gray-200 w-12">
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
