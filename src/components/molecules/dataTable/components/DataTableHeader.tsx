import type { Table } from "@tanstack/react-table";
import { ColumnVisibilityToggle } from "./ColumnVisibilityToggle";
import { ColumnPinningToggle } from "./ColumnPinningToggle";
import { FilterToggle } from "./FilterToggle";
import { ColumnFilter } from "./ColumnFilter";
import clsx from "clsx";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTextDirection } from "@/hooks/useTextDirection";

const SortIcon = ({
  sorted,
  isRTL,
}: {
  sorted: false | "asc" | "desc";
  isRTL: boolean;
}) => {
  if (!sorted) {
    return (
      <FaChevronDown
        className={clsx("inline opacity-30", isRTL ? "mr-1" : "ml-1")}
        size={12}
      />
    );
  }
  if (sorted === "asc") {
    return (
      <FaChevronUp
        className={clsx("inline text-blue-600", isRTL ? "mr-1" : "ml-1")}
        size={12}
      />
    );
  }
  return (
    <FaChevronDown
      className={clsx("inline text-blue-600", isRTL ? "mr-1" : "ml-1")}
      size={12}
    />
  );
};

export const DataTableHeader = <T extends object>({
  table,
  actionsHorizontal = false,
  enableColumnVisibility = true,
  enableColumnFiltering = true,
  enableAdvancedFiltering = true,
  enableColumnPinning = false,
  showFilters = true,
  onToggleFilters,
  enableFilterToggle = true,
}: {
  table: Table<T>;
  actionsHorizontal?: boolean;
  enableColumnVisibility?: boolean;
  enableColumnFiltering?: boolean;
  enableAdvancedFiltering?: boolean;
  enableColumnPinning?: boolean;
  showFilters?: boolean;
  onToggleFilters?: () => void;
  enableFilterToggle?: boolean;
}) => {
  const { isRTL } = useTextDirection();
  return (
    <thead className="bg-gray-50 sticky top-0 z-30">
      {enableColumnVisibility && (
        <tr>
          <th
            colSpan={table.getAllColumns().length + (actionsHorizontal ? 1 : 0)}
            className="px-4 sm:px-6 py-3 bg-gray-50 border-b border-gray-200"
          >
            <div
              className={clsx(
                "flex flex-col sm:flex-row justify-start items-end sm:items-center gap-3",
                isRTL ? "sm:flex-row-reverse" : "sm:flex-row"
              )}
            >
              <div
                className={clsx(
                  "text-sm text-gray-600",
                  isRTL ? "text-right" : "text-left"
                )}
              >
                Showing {table.getVisibleLeafColumns().length} of{" "}
                {table.getAllLeafColumns().length} columns
              </div>
              <div
                className={clsx(
                  "flex items-center gap-2",
                  isRTL ? "flex-row-reverse" : "flex-row"
                )}
              >
                {enableColumnPinning && (
                  <ColumnPinningToggle<T> table={table} />
                )}
                {enableColumnFiltering &&
                  enableFilterToggle &&
                  onToggleFilters && (
                    <FilterToggle
                      isVisible={showFilters}
                      onToggle={onToggleFilters}
                    />
                  )}
                <ColumnVisibilityToggle table={table} />
              </div>
            </div>
          </th>
        </tr>
      )}

      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const isPinned = enableColumnPinning && header.column.getIsPinned();
            const pinnedPosition = isPinned
              ? header.column.getPinnedIndex()
              : null;

            const pinnedColumns = enableColumnPinning
              ? table
                  .getAllLeafColumns()
                  .filter(
                    (col) =>
                      col.getIsPinned() ===
                      (isPinned === "left" ? "left" : "right")
                  )
              : [];
            const isLastPinned =
              isPinned && pinnedPosition === pinnedColumns.length - 1;

            return (
              <th
                key={header.id}
                className={clsx(
                  "px-4 sm:px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50",
                  header.column.id === "actions" &&
                    clsx(
                      "sticky z-30 bg-gray-50",
                      isRTL
                        ? "text-right right-0 border-r border-gray-300"
                        : "text-left left-0 border-l border-gray-300"
                    ),
                  isPinned && [
                    "sticky z-30 bg-gray-50",
                    isPinned === "left" ? "left-0" : "right-0",
                    isLastPinned
                      ? isPinned === "left"
                        ? "border-l border-gray-300"
                        : "border-r border-gray-300"
                      : "",
                  ],
                  header.column.id !== "actions" &&
                    !isPinned &&
                    (isRTL ? "text-right" : "text-left")
                )}
                style={{
                  width: header.getSize
                    ? header.getSize()
                    : header.column.columnDef.size,
                  minWidth: header.getSize
                    ? header.getSize()
                    : header.column.columnDef.size || 150,
                  maxWidth: header.getSize
                    ? header.getSize()
                    : header.column.columnDef.size,
                  ...(header.column.id === "actions"
                    ? { width: 50, minWidth: 50, maxWidth: 50 }
                    : {}),
                  ...(isPinned && isPinned === "left" && pinnedPosition !== null
                    ? {
                        left: `${pinnedPosition * (header.getSize() || 150)}px`,
                      }
                    : {}),
                  ...(isPinned &&
                  isPinned === "right" &&
                  pinnedPosition !== null
                    ? {
                        right: `${
                          pinnedPosition * (header.getSize() || 150)
                        }px`,
                      }
                    : {}),
                }}
              >
                {header.isPlaceholder ? null : header.column.getCanSort() ? (
                  <button
                    type="button"
                    onClick={header.column.getToggleSortingHandler()}
                    className={clsx(
                      "group inline-flex items-center select-none focus:outline-none hover:text-blue-600 transition-colors duration-200",
                      isRTL ? "flex-row-reverse" : "flex-row"
                    )}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      margin: 0,
                      cursor: "pointer",
                    }}
                    tabIndex={0}
                  >
                    {typeof header.column.columnDef.header === "function"
                      ? header.column.columnDef.header(header.getContext())
                      : header.column.columnDef.header}
                    <SortIcon
                      sorted={header.column.getIsSorted()}
                      isRTL={isRTL}
                    />
                  </button>
                ) : typeof header.column.columnDef.header === "function" ? (
                  header.column.columnDef.header(header.getContext())
                ) : (
                  header.column.columnDef.header
                )}
              </th>
            );
          })}
          {actionsHorizontal && (
            <th
              className={clsx(
                "px-4 sm:px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50 border-b border-gray-200",
                isRTL ? "text-right" : "text-left"
              )}
            >
              Actions
            </th>
          )}
        </tr>
      ))}

      {enableColumnFiltering && showFilters && (
        <tr>
          {table.getVisibleLeafColumns().map((column, index) => {
            const isLastColumn = index === table.getVisibleLeafColumns().length - 1;
            return (
            <th
              key={column.id}
              className={clsx(
                "px-4 sm:px-1 py-3 bg-gray-50  border-gray-200",
                isLastColumn && isRTL ? "border-r border-gray-300" : 
                isLastColumn && !isRTL ? "border-l border-gray-300" : ""
              )}
            >
              {column.getCanFilter() ? (
                <ColumnFilter
                  column={column}
                  enableAdvancedFiltering={enableAdvancedFiltering}
                />
              ) : (
                <div className="h-10" />
              )}
            </th>
            );
          })}
          {actionsHorizontal && (
            <th className="px-4 sm:px-6 py-3 bg-gray-50 border-b border-gray-200">
              <div className="h-10" />
            </th>
          )}
        </tr>
      )}
    </thead>
  );
};
