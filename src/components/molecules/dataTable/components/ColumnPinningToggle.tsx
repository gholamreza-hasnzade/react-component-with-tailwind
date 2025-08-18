import React from "react";
import type { Table, Column } from "@tanstack/react-table";
import clsx from "clsx";
import { FaThumbtack, FaChevronDown, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

interface ColumnPinningToggleProps<T> {
  table: Table<T>;
}

export const ColumnPinningToggle = <T extends object>({
  table,
}: ColumnPinningToggleProps<T>) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handlePinColumn = (
    column: Column<T, unknown>,
    direction: "left" | "right" | false
  ) => {
    column.pin(direction);
    setIsOpen(false);
  };

  const getPinnedColumns = () => {
    const pinnedColumns: {
      left: Column<T, unknown>[];
      right: Column<T, unknown>[];
    } = {
      left: [],
      right: [],
    };

    table.getAllLeafColumns().forEach((column) => {
      const pinned = column.getIsPinned();
      if (pinned === "left") {
        pinnedColumns.left.push(column);
      } else if (pinned === "right") {
        pinnedColumns.right.push(column);
      }
    });

    return pinnedColumns;
  };

  const pinnedColumns = getPinnedColumns();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        )}
      >
        <FaThumbtack size={16} />
        Pin Columns
        {Object.values(pinnedColumns).some((cols) => cols.length > 0) && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">
            {pinnedColumns.left.length + pinnedColumns.right.length}
          </span>
        )}
        <FaChevronDown
          size={12}
          className={clsx("transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[90]"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white border border-blue-200 rounded-md shadow-lg z-[100]">
            <div className="p-3 border-b border-blue-200 bg-blue-50">
              <h3 className="text-sm font-medium text-blue-700">Pin Columns</h3>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {table
                .getAllLeafColumns()
                .filter(
                  (column) => column.getCanPin() && column.id !== "select"
                )
                .map((column) => {
                  const isPinned = column.getIsPinned();
                  const pinnedDirection = isPinned;

                  return (
                    <div
                      key={column.id}
                      className="flex items-center justify-between p-3 hover:bg-blue-50 border-b border-blue-100 last:border-b-0 bg-white"
                    >
                      <span className="text-sm text-gray-700 truncate flex-1">
                        {typeof column.columnDef.header === "string"
                          ? column.columnDef.header
                          : column.id}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handlePinColumn(column, "left")}
                          className={clsx(
                            "p-1 rounded",
                            pinnedDirection === "left"
                              ? "bg-blue-600 text-white"
                              : "text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                          )}
                          title="Pin to left"
                        >
                          <FaChevronLeft size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePinColumn(column, "right")}
                          className={clsx(
                            "p-1 rounded",
                            pinnedDirection === "right"
                              ? "bg-blue-600 text-white"
                              : "text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                          )}
                          title="Pin to right"
                        >
                          <FaChevronRight size={14} />
                        </button>
                        {isPinned && (
                          <button
                            type="button"
                            onClick={() => handlePinColumn(column, false)}
                            className="p-1 rounded text-red-600 hover:text-red-800 hover:bg-red-100"
                            title="Unpin"
                          >
                            <FaTimes size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>

            {(pinnedColumns.left.length > 0 ||
              pinnedColumns.right.length > 0) && (
              <div className="p-3 border-t border-blue-200 bg-blue-50">
                <div className="text-xs text-blue-700">
                  <div className="flex justify-between">
                    <span>Left: {pinnedColumns.left.length}</span>
                    <span>Right: {pinnedColumns.right.length}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
