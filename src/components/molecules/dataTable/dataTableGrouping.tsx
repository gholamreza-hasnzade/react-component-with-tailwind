import React, { useState } from 'react';
import type { Table, Column } from '@tanstack/react-table';
import { GroupIcon, ChevronDownIcon, ChevronRightIcon, BarChart3Icon } from 'lucide-react';

export type AggregationType = 'sum' | 'avg' | 'count' | 'min' | 'max' | 'distinct';

export interface GroupingConfig {
  enabled: boolean;
  groupBy: string[];
  onGroupByChange: (groupBy: string[]) => void;
  aggregations?: Record<string, AggregationType[]>;
  showGroupingPanel?: boolean;
  showAggregations?: boolean;
}

export interface DataTableGroupingProps<TData> {
  table: Table<TData>;
  config: GroupingConfig;
  data: TData[];
}

const calculateAggregation = (values: any[], type: AggregationType): number | string => {
  const numericValues = values.filter(v => typeof v === 'number' && !isNaN(v));
  
  switch (type) {
    case 'sum':
      return numericValues.reduce((sum, val) => sum + val, 0);
    case 'avg':
      return numericValues.length > 0 ? numericValues.reduce((sum, val) => sum + val, 0) / numericValues.length : 0;
    case 'count':
      return values.length;
    case 'min':
      return numericValues.length > 0 ? Math.min(...numericValues) : 0;
    case 'max':
      return numericValues.length > 0 ? Math.max(...numericValues) : 0;
    case 'distinct':
      return new Set(values).size;
    default:
      return 0;
  }
};

export function DataTableGrouping<TData>({
  table,
  config,
  data,
}: DataTableGroupingProps<TData>) {
  const [showGroupingPanel, setShowGroupingPanel] = useState(config.showGroupingPanel ?? true);

  const availableColumns = table.getAllColumns().filter(column => 
    column.getCanGroup() && column.id !== 'select' && column.id !== 'actions'
  );

  const handleGroupToggle = (columnId: string) => {
    const newGroupBy = config.groupBy.includes(columnId)
      ? config.groupBy.filter(id => id !== columnId)
      : [...config.groupBy, columnId];
    
    config.onGroupByChange(newGroupBy);
  };


  if (!config.enabled) return null;

  return (
    <div className="space-y-4">
      {/* Grouping Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowGroupingPanel(!showGroupingPanel)}
          className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <GroupIcon className="w-4 h-4" />
          <span>Grouping</span>
          {config.groupBy.length > 0 && (
            <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
              {config.groupBy.length}
            </span>
          )}
        </button>
        
        {config.groupBy.length > 0 && (
          <button
            onClick={() => config.onGroupByChange([])}
            className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
          >
            Clear Grouping
          </button>
        )}
      </div>

      {/* Grouping Panel */}
      {showGroupingPanel && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Group by columns</h4>
          
          <div className="space-y-2">
            {availableColumns.map((column) => (
              <label
                key={column.id}
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                <input
                  type="checkbox"
                  checked={config.groupBy.includes(column.id)}
                  onChange={() => handleGroupToggle(column.id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  {column.columnDef.header as string}
                </span>
              </label>
            ))}
          </div>
          
          {config.groupBy.length === 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Select columns to group by. Drag columns to reorder grouping.
            </p>
          )}
        </div>
      )}

      {/* Grouping Instructions */}
      {config.groupBy.length > 0 && (
        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
          <p>
            <strong>Grouped by:</strong> {config.groupBy.map(id => {
              const column = table.getColumn(id);
              return column?.columnDef.header as string;
            }).join(' → ')}
          </p>
          <p className="mt-1">
            Click the chevron icons to expand/collapse groups. 
            {config.showAggregations && ' Aggregations are shown for each group.'}
          </p>
        </div>
      )}
    </div>
  );
}

export { calculateAggregation };
