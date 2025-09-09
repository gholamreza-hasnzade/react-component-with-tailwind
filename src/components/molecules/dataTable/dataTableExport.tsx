import React, { useState } from 'react';
import type { Table } from '@tanstack/react-table';
import { DownloadIcon, FileTextIcon, FileSpreadsheetIcon, FileIcon } from 'lucide-react';

export type ExportFormat = 'csv' | 'excel' | 'pdf' | 'json';

export interface DataTableExportProps<TData> {
  table: Table<TData>;
  data: TData[];
  filename?: string;
  selectedRows?: TData[];
  exportOnlySelected?: boolean;
}

export function DataTableExport<TData>({
  table,
  data,
  filename = 'data',
  selectedRows = [],
  exportOnlySelected = false,
}: DataTableExportProps<TData>) {
  const [isExporting, setIsExporting] = useState(false);

  const exportData = selectedRows.length > 0 && exportOnlySelected ? selectedRows : data;

  const convertToCSV = (data: TData[]) => {
    const headers = table.getAllColumns()
      .filter(column => column.getIsVisible())
      .map(column => column.columnDef.header as string);

    const rows = data.map(row => {
      return table.getAllColumns()
        .filter(column => column.getIsVisible())
        .map(column => {
          const value = column.accessorFn ? column.accessorFn(row, 0) : (row as any)[column.id];
          // Escape CSV values
          if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value ?? '';
        });
    });

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const convertToJSON = (data: TData[]) => {
    return JSON.stringify(data, null, 2);
  };

  const downloadFile = (content: string, format: ExportFormat) => {
    const mimeTypes = {
      csv: 'text/csv',
      excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      pdf: 'application/pdf',
      json: 'application/json',
    };

    const extensions = {
      csv: 'csv',
      excel: 'xlsx',
      pdf: 'pdf',
      json: 'json',
    };

    const blob = new Blob([content], { type: mimeTypes[format] });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.${extensions[format]}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExport = async (format: ExportFormat) => {
    setIsExporting(true);
    
    try {
      switch (format) {
        case 'csv':
          const csvContent = convertToCSV(exportData);
          downloadFile(csvContent, 'csv');
          break;
        
        case 'json':
          const jsonContent = convertToJSON(exportData);
          downloadFile(jsonContent, 'json');
          break;
        
        case 'excel':
          // For Excel export, we'll use a simple CSV approach
          // In a real implementation, you'd use a library like xlsx
          const excelContent = convertToCSV(exportData);
          downloadFile(excelContent, 'excel');
          break;
        
        case 'pdf':
          // For PDF export, we'll use a simple text approach
          // In a real implementation, you'd use a library like jsPDF
          const pdfContent = convertToCSV(exportData);
          downloadFile(pdfContent, 'pdf');
          break;
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportOptions = [
    {
      format: 'csv' as ExportFormat,
      label: 'CSV',
      icon: <FileTextIcon className="w-4 h-4" />,
      description: 'Comma-separated values',
    },
    {
      format: 'excel' as ExportFormat,
      label: 'Excel',
      icon: <FileSpreadsheetIcon className="w-4 h-4" />,
      description: 'Microsoft Excel format',
    },
    {
      format: 'json' as ExportFormat,
      label: 'JSON',
      icon: <FileIcon className="w-4 h-4" />,
      description: 'JavaScript Object Notation',
    },
    {
      format: 'pdf' as ExportFormat,
      label: 'PDF',
      icon: <FileTextIcon className="w-4 h-4" />,
      description: 'Portable Document Format',
    },
  ];

  return (
    <div className="relative group">
      <button
        disabled={isExporting}
        className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <DownloadIcon className="w-4 h-4" />
        <span>Export</span>
        {isExporting && (
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        )}
      </button>

      {/* Export Dropdown */}
      <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="py-1">
          {exportOptions.map((option) => (
            <button
              key={option.format}
              onClick={() => handleExport(option.format)}
              disabled={isExporting}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {option.icon}
              <div className="flex-1 text-left">
                <div className="font-medium">{option.label}</div>
                <div className="text-xs text-gray-500">{option.description}</div>
              </div>
            </button>
          ))}
        </div>
        
        {selectedRows.length > 0 && (
          <div className="border-t border-gray-200 px-4 py-2">
            <div className="text-xs text-gray-500">
              Exporting {exportOnlySelected ? selectedRows.length : data.length} of {data.length} rows
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
