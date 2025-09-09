import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type GroupingState,
  type ExpandedState,
  type PaginationState,
  type RowSelectionState,
  type ColumnPinningState,
  type ColumnSizingState,
  type ColumnOrderState,
  type Table,
  type Row,
  type Cell,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/atoms/checkbox/checkbox";
import { RefreshCwIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DataTableToolbar } from "./dataTableToolbar";
import { DataTablePagination } from "./dataTablePagination";
import { DataTableSettings } from "./dataTableSettings";
import { DataTableHeader } from "./dataTableHeader";
import { DataTableBody } from "./dataTableBody";
import { DataTableFilters, type FilterConfig } from "./dataTableFilters";
import { DataTableDensity } from "./dataTableDensity";
import { type RowDensity } from "./dataTableDensity.utils";
import { DataTableExport, type ExportFormat } from "./dataTableExport";
import { DataTableSearch, type SearchConfig } from "./dataTableSearch";
import { DataTableGrouping, type GroupingConfig } from "./dataTableGrouping";
import { useDataTablePagination } from "./useDataTableApi";

// Types
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
  urlDatas?: string;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableGlobalFilter?: boolean;
  enablePagination?: boolean;
  enableRowSelection?: boolean;
  enableColumnOrdering?: boolean;
  enableColumnPinning?: boolean;
  enableColumnSizing?: boolean;
  enableColumnVisibility?: boolean;
  enableGrouping?: boolean;
  enableExpanding?: boolean;
  enableFaceting?: boolean;
  enableVirtualization?: boolean;
  enableRowPinning?: boolean;
  enableMultiSort?: boolean;
  enableGlobalFiltering?: boolean;
  enableFuzzyFiltering?: boolean;
  enableColumnFaceting?: boolean;
  enableGlobalFaceting?: boolean;
  enableStickyHeader?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  showPagination?: boolean;
  showColumnVisibility?: boolean;
  showGlobalFilter?: boolean;
  showRowCount?: boolean;
  showSelectedCount?: boolean;
  showExportButtons?: boolean;
  showRefreshButton?: boolean;
  showSettingsButton?: boolean;
  className?: string;
  tableClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  rowClassName?: string | ((row: Row<TData>) => string);
  cellClassName?: string | ((cell: Cell<TData, TValue>) => string);
  onRowClick?: (row: Row<TData>) => void;
  onRowDoubleClick?: (row: Row<TData>) => void;
  onRowSelect?: (selectedRows: { original: TData }[]) => void;
  onSortingChange?: (sorting: SortingState) => void;
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void;
  onColumnVisibilityChange?: (visibility: VisibilityState) => void;
  onColumnOrderChange?: (order: ColumnOrderState) => void;
  onColumnPinningChange?: (pinning: ColumnPinningState) => void;
  onColumnSizingChange?: (sizing: ColumnSizingState) => void;
  onGroupingChange?: (grouping: GroupingState) => void;
  onExpandedChange?: (expanded: ExpandedState) => void;
  onPaginationChange?: (pagination: PaginationState) => void;
  onRowSelectionChange?: (selection: RowSelectionState) => void;
  onGlobalFilterChange?: (filter: string) => void;
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  noDataMessage?: string;
  loadingMessage?: string;
  errorMessage?: string;
  // Custom renderers
  renderEmptyState?: () => React.ReactNode;
  renderLoadingState?: () => React.ReactNode;
  renderErrorState?: (error: string) => React.ReactNode;
  renderPagination?: (table: Table<TData>) => React.ReactNode;
  renderToolbar?: (table: Table<TData>) => React.ReactNode;
  renderFooter?: (table: Table<TData>) => React.ReactNode;
  // Styling
  variant?: "default" | "bordered" | "striped" | "hover";
  size?: "sm" | "md" | "lg";
  // Actions
  actions?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: (row: Row<TData>) => void;
    variant?: "default" | "destructive" | "outline";
    disabled?: (row: Row<TData>) => boolean;
  }>;
  showActions?: boolean;
  actionsLabel?: string;
  // Status configuration
  statusConfig?: {
    field: keyof TData;
    colors: {
      [key: string]: {
        bg: string;
        text: string;
        border?: string;
      };
    };
  };
  columnStatusConfig?: {
    [columnId: string]: {
      field: keyof TData;
      colors: {
        [key: string]: {
          bg: string;
          text: string;
        };
      };
    };
  };
  // Advanced Features
  filterConfigs?: Record<string, FilterConfig>;
  searchConfig?: SearchConfig;
  groupingConfig?: GroupingConfig;
  density?: RowDensity;
  onDensityChange?: (density: RowDensity) => void;
  isFullscreen?: boolean;
  onFullscreenToggle?: () => void;
  exportConfig?: {
    enabled?: boolean;
    filename?: string;
    formats?: ExportFormat[];
    exportOnlySelected?: boolean;
  };
  inlineEditConfig?: Record<
    string,
    {
      enabled: boolean;
      onSave: (
        rowId: string,
        columnId: string,
        value: unknown
      ) => Promise<void> | void;
      onCancel?: (rowId: string, columnId: string) => void;
      validation?: (value: unknown) => string | null;
      inputType?:
        | "text"
        | "number"
        | "email"
        | "tel"
        | "url"
        | "textarea"
        | "select";
      selectOptions?: { label: string; value: unknown }[];
      placeholder?: string;
    }
  >;
}

// Utility functions
const fuzzyFilter = (
  row: Row<unknown>,
  columnId: string,
  value: string,
  addMeta: (meta: { itemRank: { passed: boolean; results: unknown[] } }) => void
) => {
  const itemRank = fuzzySort(value, [row.getValue(columnId)]);
  addMeta({ itemRank });
  return itemRank.passed;
};

const fuzzySort = (value: string, items: unknown[]) => {
  const search = value.toLowerCase();
  const results = items.map((item, index) => ({
    item,
    index,
    score: item ? (item.toString().toLowerCase().includes(search) ? 1 : 0) : 0,
  }));
  return {
    passed: results.some((r) => r.score > 0),
    results: results.sort((a, b) => b.score - a.score),
  };
};

// Main DataTable component
export function DataTable<TData, TValue>({
  columns,
  data: staticData,
  urlDatas,
  enableSorting = true,
  enableFiltering = true,
  enableGlobalFilter = true,
  enablePagination = true,
  enableRowSelection = true,
  enableColumnOrdering = true,
  enableColumnPinning = true,
  enableColumnSizing = true,
  enableColumnVisibility = true,
  enableGrouping = true,
  enableExpanding = true,
  enableMultiSort = true,
  enableFuzzyFiltering = true,
  enableStickyHeader = true,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50, 100],
  showPagination = true,
  showGlobalFilter = true,
  showRowCount = true,
  showSelectedCount = true,
  showExportButtons = true,
  showRefreshButton = true,
  showSettingsButton = true,
  className,
  tableClassName,
  headerClassName,
  bodyClassName,
  rowClassName,
  cellClassName,
  onRowClick,
  onRowDoubleClick,
  onRowSelect,
  onSortingChange,
  onColumnFiltersChange,
  onColumnVisibilityChange,
  onColumnOrderChange,
  onColumnPinningChange,
  onColumnSizingChange,
  onGroupingChange,
  onExpandedChange,
  onPaginationChange,
  onRowSelectionChange,
  onGlobalFilterChange,
  loading: loadingProp = false,
  error: errorProp,
  emptyMessage = "No data available",
  loadingMessage = "Loading...",
  errorMessage = "An error occurred",
  renderEmptyState,
  renderLoadingState,
  renderErrorState,
  renderPagination,
  renderToolbar,
  renderFooter,
  variant = "default",
  size = "md",
  actions = [],
  showActions = false,
  actionsLabel = "Actions",
  statusConfig,
  columnStatusConfig,
  // Advanced Features
  filterConfigs,
  searchConfig,
  groupingConfig,
  density: densityProp = "normal",
  onDensityChange,
  isFullscreen = false,
  onFullscreenToggle,
  exportConfig,
}: DataTableProps<TData, TValue>) {
  // State management
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({});
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  // Advanced Features State
  const [density, setDensity] = useState<RowDensity>(densityProp);
  const [columnFiltersState, setColumnFiltersState] = useState<
    Record<string, unknown>
  >({});
  const [groupingState, setGroupingState] = useState<string[]>([]);

  // API Integration
  const isApiMode = !!urlDatas;
  const { data: apiData, isLoading: apiLoading, error: apiError } = useDataTablePagination<TData>(
    urlDatas || '',
    pagination.pageIndex,
    pagination.pageSize,
    globalFilter,
    sorting[0]?.id,
    sorting[0]?.desc ? 'desc' : 'asc'
  );

  // Determine data source
  const data = isApiMode ? (apiData?.products || []) : (staticData || []);
  const loading = isApiMode ? apiLoading : false;
  const error = isApiMode ? apiError : null;
  const totalCount = isApiMode ? (apiData?.total || 0) : (staticData?.length || 0);

  // Memoized columns with selection column
  const memoizedColumns = useMemo(() => {
    const cols: ColumnDef<TData, TValue>[] = [];

    if (enableRowSelection) {
      cols.push({
        id: "select",
        header: ({ table }) => (
          <Checkbox
            id="select-all"
            label=""
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={table.getToggleAllRowsSelectedHandler()}
            className="w-4 h-4"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            id={`select-${row.id}`}
            label=""
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onCheckedChange={row.getToggleSelectedHandler()}
            className="w-4 h-4"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 50,
      });
    }

    return [...cols, ...columns];
  }, [columns, enableRowSelection]);

  // Table instance
  const table = useReactTable({
    data,
    columns: memoizedColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      columnOrder,
      columnPinning,
      columnSizing,
      grouping,
      expanded,
      pagination,
      rowSelection,
      globalFilter,
    },
    enableRowSelection,
    enableMultiSort,
    enableSorting,
    enableFilters: enableFiltering,
    enableGlobalFilter,
    manualPagination: isApiMode || !enablePagination,
    pageCount: isApiMode ? Math.ceil(totalCount / pagination.pageSize) : undefined,
    enableColumnResizing: enableColumnSizing,
    enableColumnPinning,
    enableGrouping,
    enableExpanding,
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      setSorting(newSorting);
      onSortingChange?.(newSorting);
    },
    onColumnFiltersChange: (updater) => {
      const newFilters =
        typeof updater === "function" ? updater(columnFilters) : updater;
      setColumnFilters(newFilters);
      onColumnFiltersChange?.(newFilters);
    },
    onColumnVisibilityChange: (updater) => {
      const newVisibility =
        typeof updater === "function" ? updater(columnVisibility) : updater;
      setColumnVisibility(newVisibility);
      onColumnVisibilityChange?.(newVisibility);
    },
    onColumnOrderChange: (updater) => {
      const newOrder =
        typeof updater === "function" ? updater(columnOrder) : updater;
      setColumnOrder(newOrder);
      onColumnOrderChange?.(newOrder);
    },
    onColumnPinningChange: (updater) => {
      const newPinning =
        typeof updater === "function" ? updater(columnPinning) : updater;
      setColumnPinning(newPinning);
      onColumnPinningChange?.(newPinning);
    },
    onColumnSizingChange: (updater) => {
      const newSizing =
        typeof updater === "function" ? updater(columnSizing) : updater;
      setColumnSizing(newSizing);
      onColumnSizingChange?.(newSizing);
    },
    onGroupingChange: (updater) => {
      const newGrouping =
        typeof updater === "function" ? updater(grouping) : updater;
      setGrouping(newGrouping);
      onGroupingChange?.(newGrouping);
    },
    onExpandedChange: (updater) => {
      const newExpanded =
        typeof updater === "function" ? updater(expanded) : updater;
      setExpanded(newExpanded);
      onExpandedChange?.(newExpanded);
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function" ? updater(pagination) : updater;
      setPagination(newPagination);
      onPaginationChange?.(newPagination);
    },
    onRowSelectionChange: (updater) => {
      const newSelection =
        typeof updater === "function" ? updater(rowSelection) : updater;
      setRowSelection(newSelection);
      onRowSelectionChange?.(newSelection);
    },
    onGlobalFilterChange: (updater) => {
      const newFilter =
        typeof updater === "function" ? updater(globalFilter) : updater;
      setGlobalFilter(newFilter);
      onGlobalFilterChange?.(newFilter);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    globalFilterFn: enableFuzzyFiltering ? fuzzyFilter : undefined,
    debugTable: process.env.NODE_ENV === "development",
  });

  // Event handlers
  const handleRowClick = useCallback(
    (row: Row<TData>) => {
      onRowClick?.(row);
    },
    [onRowClick]
  );

  const handleRowDoubleClick = useCallback(
    (row: Row<TData>) => {
      onRowDoubleClick?.(row);
    },
    [onRowDoubleClick]
  );

  // Handle row selection callback after state updates
  useEffect(() => {
    if (onRowSelect) {
      const selectedRows = table
        .getFilteredSelectedRowModel()
        .rows.map((row) => ({ original: row.original }));
      onRowSelect(selectedRows);
    }
  }, [rowSelection, onRowSelect, table]);

  // Styling classes
  const tableClasses = cn(
    "w-full border-collapse",
    {
      "border border-gray-200 rounded-lg": variant === "bordered",
      "divide-y divide-gray-200": variant === "striped",
    },
    tableClassName
  );

  // Get column widths for consistent alignment
  const columnWidths = table.getAllColumns().reduce((acc, column) => {
    acc[column.id] = column.getSize();
    return acc;
  }, {} as Record<string, number>);

  // Loading state
  if (loading || loadingProp) {
    return (
      <div className={cn("w-full", className)}>
        {renderToolbar && renderToolbar(table)}
        <div className="flex items-center justify-center h-64">
          {renderLoadingState ? (
            renderLoadingState()
          ) : (
            <div className="flex items-center gap-2">
              <RefreshCwIcon className="w-5 h-5 animate-spin" />
              <span>{loadingMessage}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Error state
  if (error || errorProp) {
    return (
      <div className={cn("w-full", className)}>
        {renderToolbar && renderToolbar(table)}
        <div className="flex items-center justify-center h-64">
          {renderErrorState ? (
            renderErrorState(error?.message || errorProp || 'An error occurred')
          ) : (
            <div className="text-center">
              <div className="text-red-500 mb-2">{errorMessage}</div>
              <div className="text-sm text-gray-500">{error?.message || errorProp}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className={cn("w-full", className)}>
        {renderToolbar && renderToolbar(table)}
        <div className="flex items-center justify-center h-64">
          {renderEmptyState ? (
            renderEmptyState()
          ) : (
            <div className="text-center">
              <div className="text-gray-500 mb-2">{emptyMessage}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Toolbar */}
      <div className={cn("transition-all duration-300 ease-in-out")}>
        {renderToolbar ? (
          renderToolbar(table)
        ) : (
          <DataTableToolbar
            table={table}
            globalFilter={globalFilter}
            onGlobalFilterChange={setGlobalFilter}
            showGlobalFilter={showGlobalFilter}
            showRowCount={showRowCount}
            showSelectedCount={showSelectedCount}
            showExportButtons={showExportButtons}
            showRefreshButton={showRefreshButton}
            showSettingsButton={showSettingsButton}
            loading={loading}
            onSettingsToggle={() => setShowSettings(!showSettings)}
          />
        )}
      </div>

      {/* Advanced Search */}
      {searchConfig?.enabled && (
        <div className={cn("transition-all duration-300 ease-in-out")}>
          <DataTableSearch
            table={table}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            config={searchConfig}
          />
        </div>
      )}

      {/* Advanced Filters */}
      {filterConfigs && Object.keys(filterConfigs).length > 0 && (
        <div className={cn("transition-all duration-300 ease-in-out")}>
          <DataTableFilters
            table={table}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            columnFilters={columnFiltersState}
            setColumnFilters={setColumnFiltersState}
            filterConfigs={filterConfigs}
          />
        </div>
      )}

      {/* Grouping */}
      {groupingConfig?.enabled && (
        <div className={cn("transition-all duration-300 ease-in-out")}>
          <DataTableGrouping
            table={table}
            config={{
              ...groupingConfig,
              groupBy: groupingState,
              onGroupByChange: setGroupingState,
            }}
            data={data}
          />
        </div>
      )}

      {/* Density and Fullscreen Controls */}
      <div
        className={cn(
          "flex items-center justify-between mb-4 transition-all duration-300 ease-in-out"
        )}
      >
        <DataTableDensity
          table={table}
          density={density}
          onDensityChange={(newDensity) => {
            setDensity(newDensity);
            onDensityChange?.(newDensity);
          }}
          isFullscreen={isFullscreen}
          onFullscreenToggle={onFullscreenToggle || (() => {})}
        />

        {/* Export */}
        {exportConfig?.enabled && (
          <DataTableExport
            table={table}
            data={data}
            filename={exportConfig.filename}
            selectedRows={table
              .getFilteredSelectedRowModel()
              .rows.map((row) => row.original)}
            exportOnlySelected={exportConfig.exportOnlySelected}
          />
        )}
      </div>


      {/* Table and Pagination Container */}
      <div className={cn(
        "relative transition-all duration-300 ease-in-out",
        {
          "border border-gray-200 rounded-lg overflow-hidden": variant === "bordered",
        }
      )}>
        {/* Table */}
        <div className={cn(
          "overflow-hidden",
          {
            "border border-gray-200 rounded-lg": variant !== "bordered",
            "border-0": variant === "bordered",
          }
        )}>
          {/* Settings Sidebar - Shows here when opened */}
          {showSettings && (
            <DataTableSettings
              table={table}
              showColumnVisibility={enableColumnVisibility}
              showColumnOrdering={enableColumnOrdering}
              showColumnPinning={enableColumnPinning}
              showColumnSizing={enableColumnSizing}
              onClose={() => setShowSettings(false)}
            />
          )}
          
          {enableStickyHeader ? (
            <>
              {/* Sticky Header */}
              <div className="overflow-x-auto border-b border-gray-200">
                <table className={tableClasses} style={{ minWidth: '100%' }}>
                  <DataTableHeader
                    table={table}
                    headerClassName={headerClassName}
                    size={size}
                    density={density}
                    showActions={showActions}
                    actionsLabel={actionsLabel}
                    columnWidths={columnWidths}
                  />
                </table>
              </div>
              
              {/* Scrollable Body */}
              <div className="overflow-x-auto overflow-y-auto h-[60vh] min-h-[400px] max-h-[80vh]">
                <table className={tableClasses} style={{ minWidth: '100%' }}>
                  <DataTableBody
                    table={table}
                    bodyClassName={bodyClassName}
                    rowClassName={rowClassName}
                    cellClassName={cellClassName}
                    size={size}
                    density={density}
                    onRowClick={handleRowClick}
                    onRowDoubleClick={handleRowDoubleClick}
                    actions={actions}
                    showActions={showActions}
                    statusConfig={statusConfig}
                    columnStatusConfig={columnStatusConfig}
                    columnWidths={columnWidths}
                  />
                </table>
              </div>
            </>
          ) : (
            /* Traditional Table */
            <div className="overflow-x-auto overflow-y-auto h-[60vh] min-h-[400px] max-h-[80vh]">
              <table className={tableClasses}>
                <DataTableHeader
                  table={table}
                  headerClassName={headerClassName}
                  size={size}
                  density={density}
                  showActions={showActions}
                  actionsLabel={actionsLabel}
                />
                <DataTableBody
                  table={table}
                  bodyClassName={bodyClassName}
                  rowClassName={rowClassName}
                  cellClassName={cellClassName}
                  size={size}
                  density={density}
                  onRowClick={handleRowClick}
                  onRowDoubleClick={handleRowDoubleClick}
                  actions={actions}
                  showActions={showActions}
                  statusConfig={statusConfig}
                  columnStatusConfig={columnStatusConfig}
                />
              </table>
            </div>
          )}
        </div>

        {/* Scroll indicators */}
        <div
          className="absolute top-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent pointer-events-none opacity-0 transition-opacity duration-200"
          id="scroll-indicator-right"
        ></div>
        <div
          className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-white to-transparent pointer-events-none opacity-0 transition-opacity duration-200"
          id="scroll-indicator-bottom"
        ></div>

        {/* Footer */}
        {renderFooter && renderFooter(table)}

        {/* Pagination */}
        {showPagination && enablePagination && (
          <div className={cn("transition-all duration-300 ease-in-out")}>
            {renderPagination ? (
              renderPagination(table)
            ) : (
              <DataTablePagination
                table={table}
                pageSizeOptions={pageSizeOptions}
                variant={variant}
                totalCount={totalCount}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
