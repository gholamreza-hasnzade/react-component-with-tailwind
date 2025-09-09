import React from 'react';
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
  const canPreviousPage = table.getCanPreviousPage();
  const canNextPage = table.getCanNextPage();

  return (
    <div className={cn('flex flex-col sm:flex-row items-center justify-between px-4 py-4 bg-gray-50 border-t border-gray-200 gap-4', className)}>
      {/* Rows per page selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          aria-label="Rows per page"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Page info and navigation */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Page info */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            Showing <span className="font-medium">{pageIndex * pageSize + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min((pageIndex + 1) * pageSize, table.getFilteredRowModel().rows.length)}
            </span>{' '}
            of <span className="font-medium">{table.getFilteredRowModel().rows.length}</span> results
          </span>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex items-center gap-1">
          {/* First page */}
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!canPreviousPage}
            title="First page"
            className={cn(
              "hidden sm:flex items-center justify-center px-2 py-1.5 h-8 min-w-[32px]",
              "border border-gray-300 rounded-md text-sm font-medium",
              "hover:bg-gray-50 hover:border-gray-400 transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-gray-300",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            )}
          >
            <ChevronsLeftIcon className="w-4 h-4" />
          </button>
          
          {/* Previous page */}
          <button
            onClick={() => table.previousPage()}
            disabled={!canPreviousPage}
            title="Previous page"
            className={cn(
              "flex items-center justify-center px-2 py-1.5 h-8 min-w-[32px]",
              "border border-gray-300 rounded-md text-sm font-medium",
              "hover:bg-gray-50 hover:border-gray-400 transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-gray-300",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            )}
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          
          {/* Page numbers */}
          <div className="flex items-center gap-1 mx-2">
            {/* Generate page number buttons */}
            {(() => {
              const pages = [];
              const currentPage = pageIndex + 1;
              const totalPages = pageCount;
              
              // Show max 5 page numbers
              let startPage = Math.max(1, currentPage - 2);
              let endPage = Math.min(totalPages, currentPage + 2);
              
              // Adjust if we're near the beginning or end
              if (endPage - startPage < 4) {
                if (startPage === 1) {
                  endPage = Math.min(totalPages, startPage + 4);
                } else {
                  startPage = Math.max(1, endPage - 4);
                }
              }
              
              // Add first page and ellipsis if needed
              if (startPage > 1) {
                pages.push(
                  <button
                    key={1}
                    onClick={() => table.setPageIndex(0)}
                    className={cn(
                      "flex items-center justify-center px-2 py-1.5 h-8 min-w-[32px]",
                      "border rounded-md text-sm font-medium transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                      pageIndex === 0
                        ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                    )}
                  >
                    1
                  </button>
                );
                if (startPage > 2) {
                  pages.push(
                    <span key="ellipsis1" className="px-1 text-gray-500">...</span>
                  );
                }
              }
              
              // Add page numbers
              for (let i = startPage; i <= endPage; i++) {
                pages.push(
                  <button
                    key={i}
                    onClick={() => table.setPageIndex(i - 1)}
                    className={cn(
                      "flex items-center justify-center px-2 py-1.5 h-8 min-w-[32px]",
                      "border rounded-md text-sm font-medium transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                      pageIndex === i - 1
                        ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                    )}
                  >
                    {i}
                  </button>
                );
              }
              
              // Add ellipsis and last page if needed
              if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                  pages.push(
                    <span key="ellipsis2" className="px-1 text-gray-500">
                      ...
                    </span>
                  );
                }
                pages.push(
                  <button
                    key={totalPages}
                    onClick={() => table.setPageIndex(totalPages - 1)}
                    className={cn(
                      "flex items-center justify-center px-2 py-1.5 h-8 min-w-[32px]",
                      "border rounded-md text-sm font-medium transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                      pageIndex === totalPages - 1
                        ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                    )}
                  >
                    {totalPages}
                  </button>
                );
              }
              
              return pages;
            })()}
          </div>
          
          {/* Next page */}
          <button
            onClick={() => table.nextPage()}
            disabled={!canNextPage}
            title="Next page"
            className={cn(
              "flex items-center justify-center px-2 py-1.5 h-8 min-w-[32px]",
              "border border-gray-300 rounded-md text-sm font-medium",
              "hover:bg-gray-50 hover:border-gray-400 transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-gray-300",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            )}
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
          
          {/* Last page */}
          <button
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!canNextPage}
            title="Last page"
            className={cn(
              "hidden sm:flex items-center justify-center px-2 py-1.5 h-8 min-w-[32px]",
              "border border-gray-300 rounded-md text-sm font-medium",
              "hover:bg-gray-50 hover:border-gray-400 transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-gray-300",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            )}
          >
            <ChevronsRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
