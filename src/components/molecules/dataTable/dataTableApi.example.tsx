import { useState, useCallback } from 'react';
import { DataTable } from './dataTable';
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import { EditIcon, TrashIcon, EyeIcon } from 'lucide-react';

// DummyJSON Product type
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// Product columns for API data
const productColumnHelper = createColumnHelper<Product>();

const productColumns: ColumnDef<Product, any>[] = [
  productColumnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),
  productColumnHelper.accessor('title', {
    header: 'Title',
    cell: (info) => (
      <div className="max-w-[200px] truncate" title={info.getValue()}>
        {info.getValue()}
      </div>
    ),
  }),
  productColumnHelper.accessor('brand', {
    header: 'Brand',
    cell: (info) => info.getValue(),
  }),
  productColumnHelper.accessor('category', {
    header: 'Category',
    cell: (info) => (
      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
        {info.getValue()}
      </span>
    ),
  }),
  productColumnHelper.accessor('price', {
    header: 'Price',
    cell: (info) => `$${info.getValue()}`,
  }),
  productColumnHelper.accessor('rating', {
    header: 'Rating',
    cell: (info) => (
      <div className="flex items-center gap-1">
        <span className="text-yellow-500">★</span>
        <span>{info.getValue()}</span>
      </div>
    ),
  }),
  productColumnHelper.accessor('stock', {
    header: 'Stock',
    cell: (info) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        info.getValue() > 50 
          ? 'bg-green-100 text-green-800' 
          : info.getValue() > 20 
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-red-100 text-red-800'
      }`}>
        {info.getValue()}
      </span>
    ),
  }),
];

// API Example Component
export function DataTableApiExample() {
  const [, setSelectedRows] = useState<Product[]>([]);

  const handleRowClick = (row: { original: Product }) => {
    console.log('Product clicked:', row.original);
  };

  const handleRowSelect = useCallback((selectedRows: { original: Product }[]) => {
    console.log('Selected products:', selectedRows);
    setSelectedRows(selectedRows.map(row => row.original));
  }, []);

  const productActions = [
    {
      label: 'View',
      icon: <EyeIcon className="w-3 h-3" />,
      onClick: (row: { original: Product }) => {
        console.log('View product:', row.original);
        alert(`Viewing ${row.original.title}`);
      },
      variant: 'outline' as const,
    },
    {
      label: 'Edit',
      icon: <EditIcon className="w-3 h-3" />,
      onClick: (row: { original: Product }) => {
        console.log('Edit product:', row.original);
        alert(`Editing ${row.original.title}`);
      },
      variant: 'default' as const,
    },
    {
      label: 'Delete',
      icon: <TrashIcon className="w-3 h-3" />,
      onClick: (row: { original: Product }) => {
        console.log('Delete product:', row.original);
        if (confirm(`Are you sure you want to delete ${row.original.title}?`)) {
          // Handle delete logic here
        }
      },
      variant: 'destructive' as const,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">DataTable with API Integration</h1>
        <p className="text-gray-600">
          Data table with server-side pagination using DummyJSON API
        </p>
      </div>

      <DataTable
        columns={productColumns}
        urlDatas="https://dummyjson.com/products"
        onRowClick={handleRowClick}
        onRowSelect={handleRowSelect}
        enableSorting={true}
        enableFiltering={true}
        enableGlobalFilter={true}
        enablePagination={true}
        enableRowSelection={true}
        enableColumnOrdering={true}
        enableColumnPinning={true}
        enableColumnSizing={true}
        enableColumnVisibility={true}
        enableGrouping={false}
        enableExpanding={false}
        enableFaceting={false}
        enableRowPinning={false}
        enableMultiSort={true}
        enableGlobalFiltering={true}
        enableFuzzyFiltering={true}
        enableColumnFaceting={false}
        enableGlobalFaceting={false}
        enableStickyHeader={true}
        showPagination={true}
        showColumnVisibility={true}
        showGlobalFilter={true}
        showRowCount={true}
        showSelectedCount={true}
        showExportButtons={true}
        showRefreshButton={true}
        showSettingsButton={true}
        variant="bordered"
        size="md"
        density="normal"
        pageSize={10}
        pageSizeOptions={[5, 10, 20, 50]}
        actions={productActions}
        showActions={true}
        actionsLabel="Actions"
      />
    </div>
  );
}
