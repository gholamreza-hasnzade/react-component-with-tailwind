import { useState, useEffect, useRef } from "react";
import { Checkbox } from "@/components/atoms/checkbox/checkbox";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import type { Table, Column } from "@tanstack/react-table";
import { DataTableColumnOrdering } from "./dataTableColumnOrdering";

// Helper function to get display name for columns
const getColumnDisplayName = <TData,>(
  column: Column<TData, unknown>
): string => {
  if (typeof column.columnDef.header === "string") {
    return column.columnDef.header;
  }
  return column.id;
};

interface DataTableSettingsProps<TData> {
  table: Table<TData>;
  showColumnVisibility?: boolean;
  showColumnOrdering?: boolean;
  showColumnPinning?: boolean;
  showColumnSizing?: boolean;
  className?: string;
  onClose?: () => void;
}

export function DataTableSettings<TData>({
  table,
  showColumnVisibility = true,
  showColumnOrdering = true,
  showColumnPinning = true,
  showColumnSizing = true,
  className,
  onClose,
}: DataTableSettingsProps<TData>) {
  const [activeTab, setActiveTab] = useState<
    "visibility" | "ordering" | "pinning" | "sizing"
  >("visibility");
  const columns = table.getAllColumns();

  const sidebarRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={sidebarRef}
      className={cn(
        "absolute inset-y-0 left-0 z-50 w-72 sm:w-80 md:w-96 bg-white shadow-xl border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close settings"
          >
            <XIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white overflow-x-auto">
        {showColumnVisibility && (
          <button
            onClick={() => setActiveTab("visibility")}
            className={cn(
              "flex-shrink-0 px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap",
              activeTab === "visibility"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            <span className="hidden sm:inline">Visibility</span>
            <span className="sm:hidden">View</span>
          </button>
        )}
        {showColumnOrdering && (
          <button
            onClick={() => setActiveTab("ordering")}
            className={cn(
              "flex-shrink-0 px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap",
              activeTab === "ordering"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            <span className="hidden sm:inline">Order</span>
            <span className="sm:hidden">Sort</span>
          </button>
        )}
        {showColumnPinning && (
          <button
            onClick={() => setActiveTab("pinning")}
            className={cn(
              "flex-shrink-0 px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap",
              activeTab === "pinning"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            <span className="hidden sm:inline">Pinning</span>
            <span className="sm:hidden">Pin</span>
          </button>
        )}
        {showColumnSizing && (
          <button
            onClick={() => setActiveTab("sizing")}
            className={cn(
              "flex-shrink-0 px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap",
              activeTab === "sizing"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            <span className="hidden sm:inline">Sizing</span>
            <span className="sm:hidden">Size</span>
          </button>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "ordering" && showColumnOrdering && (
          <DataTableColumnOrdering table={table} />
        )}

        {activeTab === "visibility" && showColumnVisibility && (
          <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
            <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-2 sm:mb-3">
              Column Visibility
            </h3>
            <div className="space-y-2">
              {columns.map((column) => (
                <div key={column.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`visibility-${column.id}`}
                    label={getColumnDisplayName(column)}
                    checked={column.getIsVisible()}
                    onCheckedChange={(checked) =>
                      column.toggleVisibility(!!checked)
                    }
                    className="text-xs sm:text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "pinning" && showColumnPinning && (
          <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Column Pinning
            </h3>
            <div className="text-sm text-gray-500 mb-2">
              Pin columns to left or right
            </div>
            <div className="space-y-2">
              {columns.map((column) => {
                const isPinned = column.getIsPinned();
                const pinStatus =
                  isPinned === "left"
                    ? "Pinned Left"
                    : isPinned === "right"
                    ? "Pinned Right"
                    : "Not Pinned";

                return (
                  <div
                    key={column.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {getColumnDisplayName(column)}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {column.id}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          isPinned === "left"
                            ? "bg-green-100 text-green-800"
                            : isPinned === "right"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {pinStatus}
                      </span>

                      <div className="flex gap-1">
                        <button
                          onClick={() => column.pin("left")}
                          className={`px-2 py-1 text-xs rounded hover:bg-blue-200 transition-colors ${
                            isPinned === "left"
                              ? "bg-green-500 text-white"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          Left
                        </button>
                        <button
                          onClick={() => column.pin("right")}
                          className={`px-2 py-1 text-xs rounded hover:bg-blue-200 transition-colors ${
                            isPinned === "right"
                              ? "bg-green-500 text-white"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          Right
                        </button>
                        <button
                          onClick={() => column.pin(false)}
                          className={`px-2 py-1 text-xs rounded hover:bg-gray-200 transition-colors ${
                            !isPinned
                              ? "bg-gray-500 text-white"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          Unpin
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "sizing" && showColumnSizing && (
          <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Column Sizing
            </h3>
            <div className="text-sm text-gray-500 mb-2">
              Adjust column widths
            </div>
            <div className="space-y-4">
              {columns.map((column) => (
                <div key={column.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      {getColumnDisplayName(column)}
                    </label>
                    <span className="text-xs text-gray-500">
                      {Math.round(column.getSize())}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    value={column.getSize()}
                    onChange={(e) =>
                      table.setColumnSizing((prev) => ({
                        ...prev,
                        [column.id]: Number(e.target.value),
                      }))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    aria-label={`Adjust width for ${column.id} column`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
