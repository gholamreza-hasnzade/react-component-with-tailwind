import React, { useState, useMemo } from 'react';
import type { Table } from '@tanstack/react-table';
import { SearchIcon, XIcon } from 'lucide-react';

export interface SearchConfig {
  enabled: boolean;
  placeholder?: string;
  highlightMatches?: boolean;
  caseSensitive?: boolean;
  wholeWord?: boolean;
  regex?: boolean;
  searchInColumns?: string[];
  excludeColumns?: string[];
}

export interface DataTableSearchProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  config?: SearchConfig;
  onSearchChange?: (query: string, results: TData[]) => void;
}

export const highlightText = (text: string, query: string, config: SearchConfig, searchOptions: { caseSensitive: boolean; wholeWord: boolean; regex: boolean; }) => {
  if (!config.highlightMatches || !query) return text;
  
  const regex = new RegExp(
    searchOptions.regex ? query : query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    searchOptions.caseSensitive ? 'g' : 'gi'
  );
  
  const parts = text.split(regex);
  const matches = text.match(regex) || [];
  
  return parts.map((part, index) => (
    <React.Fragment key={index}>
      {part}
      {index < matches.length && (
        <mark className="bg-yellow-200 px-0.5 rounded">
          {matches[index]}
        </mark>
      )}
    </React.Fragment>
  ));
};

export function DataTableSearch<TData>({
  table,
  globalFilter,
  setGlobalFilter,
  config = {
    enabled: true,
    placeholder: 'Search...',
    highlightMatches: true,
    caseSensitive: false,
    wholeWord: false,
    regex: false,
  },
  onSearchChange,
}: DataTableSearchProps<TData>) {
  const [searchOptions] = useState({
    caseSensitive: config.caseSensitive || false,
    wholeWord: config.wholeWord || false,
    regex: config.regex || false,
  });

  const searchResults = useMemo(() => {
    if (!globalFilter) return table.getRowModel().rows;

    const searchQuery = searchOptions.caseSensitive ? globalFilter : globalFilter.toLowerCase();
    
    return table.getRowModel().rows.filter((row) => {
      return table.getAllColumns().some((column) => {
        // Skip excluded columns
        if (config.excludeColumns?.includes(column.id)) return false;
        
        // Only search in specified columns if provided
        if (config.searchInColumns && !config.searchInColumns.includes(column.id)) return false;
        
        const cellValue = column.accessorFn ? column.accessorFn(row.original, 0) : (row.original as Record<string, unknown>)[column.id];
        if (cellValue == null) return false;
        
        const cellString = String(cellValue);
        const searchString = searchOptions.caseSensitive ? cellString : cellString.toLowerCase();
        
        if (searchOptions.regex) {
          try {
            const regex = new RegExp(searchQuery, searchOptions.caseSensitive ? 'g' : 'gi');
            return regex.test(searchString);
          } catch {
            return false;
          }
        }
        
        if (searchOptions.wholeWord) {
          const words = searchString.split(/\s+/);
          return words.some(word => word === searchQuery);
        }
        
        return searchString.includes(searchQuery);
      });
    });
  }, [globalFilter, searchOptions, table, config]);

  const handleSearchChange = (value: string) => {
    setGlobalFilter(value);
    onSearchChange?.(value, searchResults.map(row => row.original));
  };

  const clearSearch = () => {
    setGlobalFilter('');
    onSearchChange?.('', table.getRowModel().rows.map(row => row.original));
  };

  if (!config.enabled) return null;

  return (
    <div className="space-y-2">
      {/* Search Input */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={config.placeholder}
          className="w-full pl-10 pr-20 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {globalFilter && (
            <button
              onClick={clearSearch}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title="Clear search"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
          
        </div>
      </div>


      {/* Search Results Info */}
      {globalFilter && (
        <div className="text-sm text-gray-600">
          Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{globalFilter}"
        </div>
      )}
    </div>
  );
}




