import React, { useState } from 'react';
import type { Column } from '@tanstack/react-table';
import type { FilterValue } from '../../../../utils/filterFunctions';
import clsx from 'clsx';
import { FaTimes } from 'react-icons/fa';

export type FilterType = 
  | 'equals' 
  | 'contains' 
  | 'startsWith' 
  | 'endsWith' 
  | 'between' 
  | 'greaterThan' 
  | 'lessThan' 
  | 'greaterThanOrEqual' 
  | 'lessThanOrEqual' 
  | 'isNull' 
  | 'isNotNull'
  | 'in'
  | 'notIn';

interface AdvancedFilterProps<T extends object> {
  column: Column<T, unknown>;
  onClose: () => void;
}

const filterTypes: { value: FilterType; label: string; requiresValue: boolean }[] = [
  { value: 'equals', label: 'Equals', requiresValue: true },
  { value: 'contains', label: 'Contains', requiresValue: true },
  { value: 'startsWith', label: 'Starts with', requiresValue: true },
  { value: 'endsWith', label: 'Ends with', requiresValue: true },
  { value: 'between', label: 'Between', requiresValue: true },
  { value: 'greaterThan', label: 'Greater than', requiresValue: true },
  { value: 'lessThan', label: 'Less than', requiresValue: true },
  { value: 'greaterThanOrEqual', label: 'Greater than or equal', requiresValue: true },
  { value: 'lessThanOrEqual', label: 'Less than or equal', requiresValue: true },
  { value: 'in', label: 'In list', requiresValue: true },
  { value: 'notIn', label: 'Not in list', requiresValue: true },
  { value: 'isNull', label: 'Is null', requiresValue: false },
  { value: 'isNotNull', label: 'Is not null', requiresValue: false },
];

export function AdvancedFilter<T extends object>({ column, onClose }: AdvancedFilterProps<T>) {
  const [filterType, setFilterType] = useState<FilterType>('equals');
  const [value, setValue] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [listValues, setListValues] = useState<string>('');

  const currentFilter = column.getFilterValue() as FilterValue | undefined;

  React.useEffect(() => {
    if (currentFilter) {
      setFilterType(currentFilter.type);
      if (currentFilter.type === 'between') {
        if (currentFilter.value && typeof currentFilter.value === 'object' && !Array.isArray(currentFilter.value) && 'min' in currentFilter.value && 'max' in currentFilter.value) {
          setValue(String(currentFilter.value.min) || '');
          setValue2(String(currentFilter.value.max) || '');
        }
      } else if (currentFilter.type === 'in' || currentFilter.type === 'notIn') {
        setListValues(Array.isArray(currentFilter.value) ? currentFilter.value.join(', ') : '');
      } else {
        setValue(String(currentFilter.value) || '');
      }
    }
  }, [currentFilter]);

  const selectedFilterType = filterTypes.find(ft => ft.value === filterType);

  const handleApply = () => {
    let filterValue: string | number | { min: string; max: string } | string[] | null;

    switch (filterType) {
      case 'between':
        filterValue = { min: value, max: value2 };
        break;
      case 'in':
      case 'notIn':
        filterValue = listValues.split(',').map(v => v.trim()).filter(v => v);
        break;
      case 'isNull':
      case 'isNotNull':
        filterValue = null;
        break;
      default:
        filterValue = value;
    }

    const finalFilterValue = {
      type: filterType,
      value: filterValue,
    } as FilterValue;

    column.setFilterValue(finalFilterValue);
    onClose();
  };

  const handleClear = () => {
    column.setFilterValue(undefined);
    setValue('');
    setValue2('');
    setListValues('');
    setFilterType('equals');
    onClose();
  };

  const renderValueInput = () => {
    if (!selectedFilterType?.requiresValue) return null;

    switch (filterType) {
      case 'between':
        return (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Min value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Max value"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );
      
      case 'in':
      case 'notIn':
        return (
          <input
            type="text"
            placeholder="Enter values separated by commas"
            value={listValues}
            onChange={(e) => setListValues(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
      
      default:
        return (
          <input
            type="text"
            placeholder={`Enter ${filterType} value`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
    }
  };

  return (
    <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900">Filter {column.columnDef.header as string}</h3>
        <button
          onClick={onClose}
          className={clsx("text-gray-400 hover:text-gray-600")}
        >
          <FaTimes className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Filter Type</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as FilterType)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {filterTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {selectedFilterType?.requiresValue && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Value</label>
            {renderValueInput()}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <button
            onClick={handleApply}
            className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Apply
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-2 text-gray-600 text-sm font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
} 