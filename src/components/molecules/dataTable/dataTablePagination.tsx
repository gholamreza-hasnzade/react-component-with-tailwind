import React from 'react';
import { Button } from '@/components/atoms/button/button';
import { 
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Table } from '@tanstack/react-table';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  className?: string;
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [5, 10, 20, 50, 100],
  className,
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const pageCount = table.getPageCount();

  return (
    <div className={cn('flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-gray-200 gap-4', className)}>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-label="Rows per page"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <span className="text-sm text-gray-700">
          Page {pageIndex + 1} of {pageCount}
        </span>
        
        <div className="flex items-center gap-1">
          <Button
            variant="outlined"
            size="sm"
            startIcon={<ChevronsLeftIcon className="w-4 h-4" />}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            title="First page"
            className="hidden sm:flex"
          />
          <Button
            variant="outlined"
            size="sm"
            startIcon={<ChevronLeftIcon className="w-4 h-4" />}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            title="Previous page"
          />
          <Button
            variant="outlined"
            size="sm"
            endIcon={<ChevronRightIcon className="w-4 h-4" />}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            title="Next page"
          />
          <Button
            variant="outlined"
            size="sm"
            endIcon={<ChevronsRightIcon className="w-4 h-4" />}
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!table.getCanNextPage()}
            title="Last page"
            className="hidden sm:flex"
          />
        </div>
      </div>
    </div>
  );
}
