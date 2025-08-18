import React, { useState, useMemo, useCallback } from "react";
import type {
  SortingState,
  HeaderContext,
  CellContext,
  RowSelectionState,
  Updater,
  ColumnPinningState,
} from "@tanstack/react-table";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import clsx from "clsx";
import { FaExclamationCircle } from "react-icons/fa";

import { 
  DataTablePagination, 
  DataTableHeader, 
  DataTableToolbar,
  EmptyState
} from "./components";
import { createAdvancedFilterFn } from "../../../utils/filterFunctions";

import type { Action, DataTableProps, ApiResponse, Density } from "./types";
import { ActionsDropdown } from "@/components/atoms";

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & React.HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"}
      {...rest}
    />
  );
}

export function DataTable<T extends object>({
  dataSource,
  columns = [],
  pageSizeOptions = [10, 20, 30, 50],
  initialPageSize = 10,
  actions,
  actionsHorizontal = false,
  enableColumnVisibility = true,
  initialColumnVisibility = {},
  enableColumnFiltering = true,
  enableGlobalFilter = true,
  globalFilterPlaceholder = "Search all columns...",
  searchEndpoint,
  debounceMs = 300,
  getRowId,
  onRowSelectionChange,
  onSelectSingleRow,
  selectedRowClassName,
  getRowClassName,
  enableColumnPinning = false,
  initialColumnPinning = {},
  onColumnPinningChange,
  enableFilterToggle = true,
  enablePagination = true,
  enableDensityToggle = false,
  initialDensity = 'normal',
  onDensityChange,
  emptyStateTitle = "No items found",
  emptyStateDescription = "Try adjusting your search or filters to find what you're looking for.",
  enableAdvancedFiltering = true,
}: DataTableProps<T>) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [columnSizing, setColumnSizing] = useState({});
  const [columnVisibility, setColumnVisibility] = useState(
    initialColumnVisibility
  );
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>(initialColumnPinning);
  const [columnFilters, setColumnFilters] = useState<
    Array<{ id: string; value: unknown }>
  >([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [showFilters, setShowFilters] = useState(enableColumnFiltering);
  const [density, setDensity] = useState<Density>(initialDensity);

  const isClientData = useMemo(() => Array.isArray(dataSource), [dataSource]);
  
  const clientData = useMemo(() => {
    if (!isClientData) return [];
    return enablePagination 
      ? (dataSource as T[]).slice(
          pageIndex * pageSize,
          (pageIndex + 1) * pageSize
        )
      : (dataSource as T[]);
  }, [isClientData, dataSource, enablePagination, pageIndex, pageSize]);
  
  const clientTotal = useMemo(() => 
    isClientData ? (dataSource as T[]).length : 0, 
    [isClientData, dataSource]
  );

  const sortBy = useMemo(() => sorting[0]?.id, [sorting]);
  const order = useMemo(() => sorting[0]?.desc ? "desc" : "asc", [sorting]);

  const {
    data: apiData,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery<{ items: T[]; total: number }>({
    queryKey: [
      typeof dataSource === "string" ? dataSource : "",
      pageIndex,
      pageSize,
      globalFilter,
      sorting,
    ],
    queryFn: async () => {
      if (typeof dataSource === "string") {
        let url: URL;

        if (globalFilter && searchEndpoint) {
          url = new URL(searchEndpoint, window.location.origin);
          url.searchParams.set("q", globalFilter);
        } else {
          url = new URL(dataSource, window.location.origin);
          if (globalFilter) {
            url.searchParams.set("q", globalFilter);
          }
        }

        if (enablePagination) {
          url.searchParams.set("limit", pageSize.toString());
          url.searchParams.set("skip", (pageIndex * pageSize).toString());
        }
        if (sortBy) url.searchParams.set("sortBy", sortBy);
        if (sortBy) url.searchParams.set("order", order);

        const res = await axios.get(url.toString());
        const json: ApiResponse<T> = res.data;
        return {
          items: json.data ?? json.products ?? [],
          total: json.total,
        };
      }
      return { items: [], total: 0 };
    },
    enabled: typeof dataSource === "string",
    placeholderData: (previousData) => previousData,
    staleTime: 30000, // 30 seconds
  });

  const safeApiData = apiData ?? { items: [], total: 0 };
  const data = isClientData ? clientData : safeApiData.items;
  const total = isClientData ? clientTotal : safeApiData.total;
  const loading = isClientData ? false : isLoading;
  const fetching = isClientData ? false : isFetching;
  const errorMsg = isClientData
    ? null
    : isError
    ? error instanceof Error
      ? error.message
      : "Unknown error"
    : null;

  const columnsWithActions = React.useMemo(() => {
    if (!actions || actionsHorizontal) return columns;
    return [
      ...columns,
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }: CellContext<T, unknown>) => (
          <ActionsDropdown actions={actions as Action<T>[]} row={row.original} />
        ),
        enableSorting: false,
        enableResizing: false,
        meta: { isAction: true },
      },
    ];
  }, [columns, actions, actionsHorizontal]);

  const selectionColumn = React.useMemo(
    () => ({
      id: "select",
      header: ({ table }: HeaderContext<T, unknown>) => {
        if (onSelectSingleRow) {
          return <span className="text-gray-400 text-xs">Select</span>;
        }
        return (
          <IndeterminateCheckbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        );
      },
      cell: ({ row }: CellContext<T, unknown>) => (
        <IndeterminateCheckbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      enableSorting: false,
      enableResizing: false,
      size: 32,
      meta: { isSelection: true },
    }),
    [onSelectSingleRow]
  );

  const columnsWithSelection = React.useMemo(
    () => {
      if (onRowSelectionChange) {
        return [selectionColumn, ...columnsWithActions];
      }
      return columnsWithActions;
    },
    [selectionColumn, columnsWithActions, onRowSelectionChange]
  );

  const ActionsRow = useCallback(({ actions, row }: { actions: Action<T>[]; row: T }) => {
    return (
      <div className="flex gap-2">
        {actions.map((action, idx) => (
          <button
            key={action.label + idx}
            className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-sm flex items-center gap-1.5 transition-colors duration-200 font-medium text-gray-700"
            onClick={() => action.onClick(row)}
            type="button"
          >
            {action.icon && <span className="flex-shrink-0">{action.icon}</span>}
            <span className="truncate">{action.label}</span>
          </button>
        ))}
      </div>
    );
  }, []);

  const handleRowSelectionChange = useCallback((updater: Updater<RowSelectionState>) => {
    const next = typeof updater === "function" ? updater(rowSelection) : updater;
    setRowSelection(next);
    
    if (onRowSelectionChange) {
      const selectedRowIndices = Object.keys(next).filter(key => next[key]);
      
      const selectedRows = selectedRowIndices.map(index => {
        const rowIndex = parseInt(index);
        return data[rowIndex];
      }).filter(Boolean);
      
      onRowSelectionChange(selectedRows);
    }
  }, [rowSelection, onRowSelectionChange, data]);

  const handleDensityChange = useCallback((newDensity: Density) => {
    setDensity(newDensity);
    if (onDensityChange) {
      onDensityChange(newDensity);
    }
  }, [onDensityChange]);

  const table = useReactTable({
    data,
    columns: columnsWithSelection,
    pageCount: enablePagination ? Math.ceil(total / pageSize) : 1,
    state: {
      pagination: enablePagination ? { pageIndex, pageSize } : { pageIndex: 0, pageSize: total },
      columnSizing,
      columnVisibility: enableColumnVisibility ? columnVisibility : {},
      columnFilters: enableColumnFiltering ? columnFilters : [],
      globalFilter: enableGlobalFilter ? globalFilter : "",
      sorting,
      rowSelection,
      columnPinning: enableColumnPinning ? columnPinning : {},
    },
    manualPagination: enablePagination,
    manualSorting: true,
    enableRowSelection: onRowSelectionChange ? true : false,
    enableMultiRowSelection: !onSelectSingleRow,
    onRowSelectionChange: onRowSelectionChange ? handleRowSelectionChange : undefined,
    onPaginationChange: enablePagination ? (updater) => {
      if (typeof updater === "function") {
        const next = updater({ pageIndex, pageSize });
        setPageIndex(next.pageIndex);
        setPageSize(next.pageSize);
      } else {
        setPageIndex(updater.pageIndex);
        setPageSize(updater.pageSize);
      }
    } : undefined,
    onSortingChange: setSorting,
    onColumnVisibilityChange: enableColumnVisibility
      ? setColumnVisibility
      : undefined,
    onColumnFiltersChange: enableColumnFiltering ? (updater) => {
      setColumnFilters(updater);
    } : undefined,
    onGlobalFilterChange: enableGlobalFilter ? setGlobalFilter : undefined,
    onColumnPinningChange: enableColumnPinning ? (updater) => {
      const next = typeof updater === "function" ? updater(columnPinning) : updater;
      setColumnPinning(next);
      if (onColumnPinningChange) {
        onColumnPinningChange(next as Record<string, 'left' | 'right' | false>);
      }
    } : undefined,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel:
      enableColumnFiltering || enableGlobalFilter
        ? getFilteredRowModel()
        : undefined,
    getPaginationRowModel: getPaginationRowModel(),
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    onColumnSizingChange: setColumnSizing,
    filterFns: {
      advanced: createAdvancedFilterFn,
    },
    ...(getRowId ? { getRowId } : {}),
  });



  const computedPageCount = table.getPageCount();

  const getDensityClasses = useMemo(() => {
    switch (density) {
      case 'compact':
        return 'py-1';
      case 'comfortable':
        return 'py-6';
      default:
        return 'py-3';
    }
  }, [density]);

  

  return (
    <div className="flex flex-col w-full h-full bg-white rounded-lg shadow-sm border border-gray-200">
      <DataTableToolbar
        table={table}
        enableGlobalFilter={enableGlobalFilter}
        globalFilterPlaceholder={globalFilterPlaceholder}
        debounceMs={debounceMs}
        enableDensityToggle={enableDensityToggle}
        density={density}
        onDensityChange={handleDensityChange}
      />
      <div className="flex-1 w-full overflow-hidden">
        <div className="w-full h-full overflow-x-auto table-container relative">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <DataTableHeader
              table={table}
              actionsHorizontal={actionsHorizontal}
              enableColumnVisibility={enableColumnVisibility}
              enableColumnFiltering={enableColumnFiltering}
              enableAdvancedFiltering={enableAdvancedFiltering}
              enableColumnPinning={enableColumnPinning}
              showFilters={showFilters}
              onToggleFilters={() => setShowFilters(!showFilters)}
              enableFilterToggle={enableFilterToggle}
            />
            <tbody className="bg-white divide-y divide-gray-100">
              {loading && !data.length ? (
                Array.from({ length: 5 }).map((_, rowIdx) => {
                  const skeletonDensityClasses = density === 'compact' ? 'py-2' : density === 'comfortable' ? 'py-6' : 'py-4 sm:py-6';
                  
                  return (
                    <tr key={`skeleton-row-${rowIdx}`}>
                      {Array.from({
                        length: Array.isArray(columnsWithSelection)
                          ? columnsWithSelection.length
                          : 1,
                      }).map((_, colIdx) => (
                        <td
                          key={`skeleton-cell-${rowIdx}-${colIdx}`}
                          className={`px-4 sm:px-6 ${skeletonDensityClasses} whitespace-nowrap text-sm border-b border-gray-100 text-right`}
                        >
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                );
                })
              ) : errorMsg && !data.length ? (
                <tr>
                  <td
                    colSpan={
                      Array.isArray(columnsWithSelection)
                        ? columnsWithSelection.length
                        : 1
                    }
                    className="text-center text-red-500 py-12 px-4 sm:px-6"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <FaExclamationCircle className="w-8 h-8 text-red-400" />
                      <span className="font-medium">{errorMsg}</span>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 && !loading ? (
                <tr>
                  <td
                    colSpan={
                      Array.isArray(columnsWithSelection)
                        ? columnsWithSelection.length
                        : 1
                    }
                    className="text-center py-16 px-4 sm:px-6"
                  >
                    <EmptyState
                      title={emptyStateTitle}
                      description={emptyStateDescription}
                    />
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, idx) => {
                  const isSelected = row.getIsSelected();
                  const customRowClass = getRowClassName ? getRowClassName(row.original, idx) : "";


                  return (
                    <tr
                      key={row.id}
                      className={clsx(
                        "transition-all duration-200",
                        isSelected
                          ? selectedRowClassName || "bg-blue-100 border-l-4 border-blue-500 shadow-sm"
                          : customRowClass || (idx % 2 === 0
                            ? "bg-white hover:bg-blue-50"
                            : "bg-gray-50 hover:bg-blue-50"),
                        onSelectSingleRow && "cursor-pointer"
                      )}
                      style={{
                        ...(isSelected && {
                          '--tw-bg-opacity': '1',
                          backgroundColor: 'rgb(219 234 254 / var(--tw-bg-opacity))'
                        })
                      }}
                      onClick={onSelectSingleRow ? () => {
                        const newSelection = isSelected ? {} : { [row.id]: true };
                        setRowSelection(newSelection);
                        if (!isSelected) {
                          const selectedRow = data[idx];
                          if (selectedRow) {
                            onSelectSingleRow(selectedRow);
                          }
                        }
                      } : undefined}
                    >
                    {actionsHorizontal ? (
                      <>
                        {row.getVisibleCells().map((cell) => {
                          const isPinned = enableColumnPinning && cell.column.getIsPinned();
                          const pinnedPosition = isPinned ? cell.column.getPinnedIndex() : null;
                          
                          const pinnedColumns = enableColumnPinning 
                            ? table.getAllLeafColumns().filter(col => col.getIsPinned() === (isPinned === 'left' ? 'left' : 'right'))
                            : [];
                          const isLastPinned = isPinned && pinnedPosition === pinnedColumns.length - 1;
                          
                          return (
                            <td
                              key={cell.id}
                              className={clsx(
                                "px-4 sm:px-6",
                                getDensityClasses,
                                "whitespace-nowrap text-sm text-gray-900 text-right",
                                isPinned && [
                                  "sticky z-20",
                                  isPinned === 'left' ? 'left-0' : 'right-0',
                                  isLastPinned ? (isPinned === 'left' ? 'border-l border-gray-300' : 'border-r border-gray-300') : ''
                                ]
                              )}
                              style={{
                                width: cell.column.getSize
                                  ? cell.column.getSize()
                                  : cell.column.columnDef.size,
                                minWidth: cell.column.getSize
                                  ? cell.column.getSize()
                                  : cell.column.columnDef.size || 150,
                                maxWidth: cell.column.getSize
                                  ? cell.column.getSize()
                                  : cell.column.columnDef.size,
                                ...(isPinned && isPinned === 'left' && pinnedPosition !== null
                                  ? { left: `${pinnedPosition * (cell.column.getSize() || 150)}px` }
                                  : {}),
                                ...(isPinned && isPinned === 'right' && pinnedPosition !== null
                                  ? { right: `${pinnedPosition * (cell.column.getSize() || 150)}px` }
                                  : {}),

                              }}
                            >
                              {cell.column.id === "select" || cell.column.id === "actions" ? (
                                <span>
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </span>
                              ) : (
                                <div className="group relative">
                                  <span className="truncate block">
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                    )}
                                  </span>
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                    {String(cell.getValue?.() ?? "")}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                  </div>
                                </div>
                              )}
                            </td>
                          );
                        })}
                        <td className={`px-4 sm:px-6 ${getDensityClasses} whitespace-nowrap text-sm text-gray-900 border-b border-gray-100 text-right`}>
                          <ActionsRow
                            actions={actions ?? []}
                            row={row.original}
                          />
                        </td>
                      </>
                    ) : (
                      row.getVisibleCells().map((cell) => {
                        const isPinned = enableColumnPinning && cell.column.getIsPinned();
                        const pinnedPosition = isPinned ? cell.column.getPinnedIndex() : null;
                        
                        const pinnedColumns = enableColumnPinning 
                          ? table.getAllLeafColumns().filter(col => col.getIsPinned() === (isPinned === 'left' ? 'left' : 'right'))
                          : [];
                        const isLastPinned = isPinned && pinnedPosition === pinnedColumns.length - 1;
                        
                        return (
                          <td
                            key={cell.id}
                            className={clsx(
                              "px-4 sm:px-6",
                              getDensityClasses,
                              "text-sm text-gray-900 text-right",
                              cell.column.id === "actions" && "sticky left-0 z-20 border-l border-gray-300",
                              isPinned && [
                                "sticky z-20",
                                isPinned === 'left' ? 'left-0' : 'right-0',
                                isLastPinned ? (isPinned === 'left' ? 'border-l border-gray-300' : 'border-r border-gray-300') : ''
                              ]
                            )}
                            style={{
                              width: cell.column.getSize
                                ? cell.column.getSize()
                                : cell.column.columnDef.size,
                              minWidth: cell.column.getSize
                                ? cell.column.getSize()
                                : cell.column.columnDef.size || 150,
                              maxWidth: cell.column.getSize
                                ? cell.column.getSize()
                                : cell.column.columnDef.size,
                              ...(isPinned && isPinned === 'left' && pinnedPosition !== null
                                ? { left: `${pinnedPosition * (cell.column.getSize() || 150)}px` }
                                : {}),
                              ...(isPinned && isPinned === 'right' && pinnedPosition !== null
                                ? { right: `${pinnedPosition * (cell.column.getSize() || 150)}px` }
                                : {}),

                            }}
                          >
                            {cell.column.id === "select" || cell.column.id === "actions" ? (
                              <span>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </span>
                            ) : (
                              <div className="group relative">
                                <span className="truncate block">
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </span>
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                  {String(cell.getValue?.() ?? "")}
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            )}
                          </td>
                        );
                      })
                    )}
                  </tr>
                );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      {Object.keys(rowSelection).length > 0 && (
        <div className="px-4 sm:px-6 py-3 bg-blue-50 border-t border-blue-200">
          <div className="text-sm text-blue-700 font-medium">
            {Object.keys(rowSelection).length} row(s) selected
          </div>
        </div>
      )}
      {enablePagination && (
        <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200">
          {fetching && (
            <div className="mb-3 flex items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
                <span>Loading...</span>
              </div>
            </div>
          )}
          <DataTablePagination
            table={table}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageSize={pageSize}
            setPageSize={setPageSize}
            pageSizeOptions={pageSizeOptions}
            loading={fetching}
            computedPageCount={computedPageCount}
          />
        </div>
      )}
    </div>
  );
}
