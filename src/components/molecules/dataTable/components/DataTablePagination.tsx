import React from "react";
import type { Table } from "@tanstack/react-table";
import clsx from "clsx";
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { useTextDirection } from "@/hooks/useTextDirection";

interface DataTablePaginationProps<T> {
  table: Table<T>;
  pageIndex: number;
  setPageIndex: (idx: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  pageSizeOptions: number[];
  loading: boolean;
  computedPageCount: number;
}

export function DataTablePagination<T>({
  table,
  pageIndex,
  setPageIndex,
  pageSize,
  setPageSize,
  pageSizeOptions,
  loading,
  computedPageCount,
}: DataTablePaginationProps<T>) {
  const [goToPage, setGoToPage] = React.useState("");
  const { isRTL } = useTextDirection();

  const handleGoToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(goToPage) - 1;
    if (page >= 0 && page < computedPageCount) {
      setPageIndex(page);
      setGoToPage("");
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(0, pageIndex - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(
      computedPageCount - 1,
      startPage + maxVisiblePages - 1
    );

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };
  return (
    <div className={clsx(
      "flex flex-col sm:flex-row items-center justify-between mt-6 gap-4 w-full px-4 sm:px-0",
      isRTL ? "sm:flex-row-reverse" : "sm:flex-row"
    )}>
      <div className={clsx(
        "flex items-center gap-3",
        isRTL ? "flex-row-reverse" : "flex-row"
      )}>
        <span className={clsx(
          "text-sm text-gray-700",
          isRTL ? "text-right" : "text-left"
        )}>
          Rows per page:
        </span>
        <select
          className={clsx(
            "border border-gray-300 rounded-md px-3 py-2 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors duration-200",
            loading && "opacity-75",
            isRTL ? "text-right" : "text-left"
          )}
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageIndex(0);
          }}
          disabled={loading}
          aria-label="Rows per page"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className={clsx(
        "flex items-center gap-2",
        isRTL ? "flex-row-reverse" : "flex-row"
      )}>
        <button
          className={clsx(
            "px-3 py-2 cursor-pointer border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
            loading && "opacity-75"
          )}
          onClick={() => table.setPageIndex(0)}
          disabled={pageIndex === 0 || loading}
          title="First page"
          aria-label="Go to first page"
        >
          <FaAngleDoubleLeft />
        </button>
        <button
          className={clsx(
            "px-3 py-2 cursor-pointer border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
            loading && "opacity-75"
          )}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage() || loading}
          title="Previous page"
          aria-label="Go to previous page"
        >
          <FaAngleLeft />
        </button>

        <div className={clsx(
          "flex items-center gap-1",
          isRTL ? "flex-row-reverse" : "flex-row"
        )}>
          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              className={clsx(
                "px-3 cursor-pointer py-2 border rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 relative",
                pageNum === pageIndex
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50",
                loading && "opacity-75"
              )}
              onClick={() => setPageIndex(pageNum)}
              disabled={loading}
            >
              {pageNum + 1}
              {loading && pageNum === pageIndex && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          className={clsx(
            "px-3 cursor-pointer py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
            loading && "opacity-75"
          )}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage() || loading}
          title="Next page"
          aria-label="Go to next page"
        >
          <FaAngleRight />
        </button>
        <button
          className={clsx(
            "px-3 cursor-pointer py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
            loading && "opacity-75"
          )}
          onClick={() => table.setPageIndex(computedPageCount - 1)}
          disabled={pageIndex >= computedPageCount - 1 || loading}
          title="Last page"
          aria-label="Go to last page"
        >
          <FaAngleDoubleRight />
        </button>

        <span className={clsx(
          "text-sm text-gray-700",
          isRTL ? "mr-4 text-right" : "ml-4 text-left"
        )}>
          Page{" "}
          <strong className="text-gray-900">
            {pageIndex + 1} of {computedPageCount}
          </strong>
        </span>

        <form
          onSubmit={handleGoToPage}
          className={clsx(
            "flex items-center gap-2",
            isRTL ? "mr-4 flex-row-reverse" : "ml-4 flex-row"
          )}
        >
          <span className={clsx(
            "text-sm text-gray-700",
            isRTL ? "text-right" : "text-left"
          )}>
            Go to:
          </span>
          <input
            type="number"
            min="1"
            max={computedPageCount}
            value={goToPage}
            onChange={(e) => setGoToPage(e.target.value)}
            className={clsx(
              "w-16 px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              isRTL ? "text-right" : "text-left"
            )}
            placeholder="Page"
            disabled={loading}
          />
          <button
            type="submit"
            className={clsx(
              "px-3 py-1 cursor-pointer bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
              loading && "opacity-75"
            )}
            disabled={loading || !goToPage}
          >
            Go
          </button>
        </form>
      </div>
    </div>
  );
}
