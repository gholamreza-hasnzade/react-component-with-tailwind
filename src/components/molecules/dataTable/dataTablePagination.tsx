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
  variant?: 'default' | 'bordered' | 'striped' | 'hover';
  totalCount?: number;
  isLoading?: boolean;
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [5, 10, 20, 50, 100],
  className,
  variant = 'default',
  totalCount,
  isLoading = false,
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const pageCount = table.getPageCount();
  const canPreviousPage = table.getCanPreviousPage();
  const canNextPage = table.getCanNextPage();
  
  // Maintain stable page count during loading to prevent flickering
  const stablePageCount = isLoading && pageCount === 0 ? Math.max(1, Math.ceil((totalCount || 0) / pageSize)) : Math.max(1, pageCount);
  
  // Don't show pagination if no data and not loading, or if page count is invalid
  if (stablePageCount <= 0 || (!isLoading && totalCount === 0)) {
    return null;
  }

  const paginationClasses = cn(
    'flex flex-col sm:flex-row items-center justify-between px-4 py-3 gap-4',
    {
      'bg-white border-t border-gray-200': variant === 'default' || variant === 'hover',
      'bg-white border border-gray-200 border-t-0 rounded-b-lg': variant === 'bordered',
      'bg-gray-50 border-t border-gray-200': variant === 'striped',
    },
    className
  );

  return (
    <div className={paginationClasses}>
      {/* Rows per page selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-600">Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
          <span className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{pageIndex * pageSize + 1}</span> to{' '}
            <span className="font-semibold text-gray-900">
              {Math.min((pageIndex + 1) * pageSize, table.getFilteredRowModel().rows.length)}
            </span>{' '}
            of <span className="font-semibold text-gray-900">{totalCount || table.getFilteredRowModel().rows.length}</span> results
          </span>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex items-center gap-1">
          {/* First page */}
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!canPreviousPage || isLoading}
            title="First page"
            className={cn(
              "hidden sm:flex items-center justify-center px-3 py-2 h-9 min-w-[36px]",
              "border border-gray-300 rounded-lg text-sm font-medium text-gray-700",
              "hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition-all duration-200",
              "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-gray-300 disabled:hover:text-gray-700",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            )}
          >
            <ChevronsLeftIcon className="w-4 h-4" />
          </button>
          
          {/* Previous page */}
          <button
            onClick={() => table.previousPage()}
            disabled={!canPreviousPage || isLoading}
            title="Previous page"
            className={cn(
              "flex items-center justify-center px-3 py-2 h-9 min-w-[36px]",
              "border border-gray-300 rounded-lg text-sm font-medium text-gray-700",
              "hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition-all duration-200",
              "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-gray-300 disabled:hover:text-gray-700",
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
              const totalPages = stablePageCount;
              
              // Ensure we have valid page numbers
              if (totalPages <= 0 || currentPage <= 0) {
                return pages;
              }
              
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
              
              // Ensure startPage doesn't exceed totalPages
              startPage = Math.min(startPage, totalPages);
              endPage = Math.min(endPage, totalPages);
              
              // Add first page and ellipsis if needed
              if (startPage > 1) {
                pages.push(
                  <button
                    key={1}
                    onClick={() => table.setPageIndex(0)}
                    className={cn(
                      "flex items-center justify-center px-3 py-2 h-9 min-w-[36px]",
                      "border rounded-lg text-sm font-medium transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                      pageIndex === 0
                        ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 shadow-sm"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900"
                    )}
                  >
                    1
                  </button>
                );
                if (startPage > 2) {
                  pages.push(
                    <span key="ellipsis1" className="px-2 text-gray-400 text-sm">...</span>
                  );
                }
              }
              
              // Add page numbers
              for (let i = startPage; i <= endPage; i++) {
                pages.push(
                  <button
                    key={i}
                    onClick={() => table.setPageIndex(i - 1)}
                    disabled={isLoading}
                    className={cn(
                      "flex items-center justify-center px-3 py-2 h-9 min-w-[36px]",
                      "border rounded-lg text-sm font-medium transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                      pageIndex === i - 1
                        ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 shadow-sm"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900"
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
                    <span key="ellipsis2" className="px-2 text-gray-400 text-sm">
                      ...
                    </span>
                  );
                }
                pages.push(
                  <button
                    key={totalPages}
                    onClick={() => table.setPageIndex(totalPages - 1)}
                    className={cn(
                      "flex items-center justify-center px-3 py-2 h-9 min-w-[36px]",
                      "border rounded-lg text-sm font-medium transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                      pageIndex === totalPages - 1
                        ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 shadow-sm"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900"
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
            disabled={!canNextPage || isLoading}
            title="Next page"
            className={cn(
              "flex items-center justify-center px-3 py-2 h-9 min-w-[36px]",
              "border border-gray-300 rounded-lg text-sm font-medium text-gray-700",
              "hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition-all duration-200",
              "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-gray-300 disabled:hover:text-gray-700",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            )}
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
          
          {/* Last page */}
          <button
            onClick={() => table.setPageIndex(stablePageCount - 1)}
            disabled={!canNextPage || isLoading}
            title="Last page"
            className={cn(
              "hidden sm:flex items-center justify-center px-3 py-2 h-9 min-w-[36px]",
              "border border-gray-300 rounded-lg text-sm font-medium text-gray-700",
              "hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition-all duration-200",
              "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-gray-300 disabled:hover:text-gray-700",
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
