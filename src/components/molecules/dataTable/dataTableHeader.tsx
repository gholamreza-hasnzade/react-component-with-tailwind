import { flexRender } from '@tanstack/react-table';
import { 
  ArrowUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/atoms/checkbox/checkbox';
import type { Table, Header, HeaderGroup } from '@tanstack/react-table';
import { getDensityClasses, type RowDensity } from './dataTableDensity.utils';

interface DataTableHeaderProps<TData> {
  table: Table<TData>;
  className?: string;
  headerClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  density?: RowDensity;
  showActions?: boolean;
  actionsLabel?: string;
}

export function DataTableHeader<TData>({
  table,
  headerClassName,
  size = 'md',
  density = 'normal',
  showActions = false,
  actionsLabel = 'Actions',
}: DataTableHeaderProps<TData>) {
  const densityClasses = getDensityClasses(density);
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

    return (
      <th
        key={header.id}
        colSpan={header.colSpan}
        className={cn(
          'text-left font-medium text-gray-900 whitespace-nowrap transition-colors duration-200',
          densityClasses.header,
          {
            'cursor-pointer select-none hover:bg-gray-100 hover:text-gray-700': header.column.getCanSort(),
            'hover:bg-gray-50': !header.column.getCanSort(),
            'text-xs': size === 'sm',
            'text-sm': size === 'md',
            'text-base': size === 'lg',
          }
        )}
        style={{ 
          width: `${header.getSize()}px`, 
          minWidth: '100px' 
        }}
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
