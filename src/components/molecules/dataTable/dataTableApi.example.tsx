import { useState, useCallback } from 'react';
import { DataTable } from './dataTable';
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import { EditIcon, TrashIcon, EyeIcon } from 'lucide-react';
import type { FilterConfig } from './dataTableFilters';

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
  createdAt?: string; // Add datetime field for filtering example
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
    enableSorting: false, // Disable sorting for this column
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
  productColumnHelper.accessor('createdAt', {
    header: 'Created At',
    cell: (info) => {
      const value = info.getValue();
      if (!value) return <span className="text-gray-400">-</span>;
      return new Date(value).toLocaleString();
    },
  }),
];

// API Example Component
export function DataTableApiExample() {
  const [, setSelectedRows] = useState<Product[]>([]);

  const handleRowClick = (row: { original: Product }) => {
    console.log('Product clicked:', row.original);
  };

  const handleRowSelect = useCallback((selectedRows: { original: Product }[]) => {
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
        alert(`Editing ${row.original.title}`);
      },
      variant: 'default' as const,
    },
    {
      label: 'Delete',
      icon: <TrashIcon className="w-3 h-3" />,
      onClick: (row: { original: Product }) => {
        if (confirm(`Are you sure you want to delete ${row.original.title}?`)) {
          // Handle delete logic here
        }
      },
      variant: 'destructive' as const,
    },
  ];

  // Comprehensive filter configurations demonstrating all filter types
  const filterConfigs: Record<string, FilterConfig> = {
    id: {
      type: 'number',
      placeholder: 'Filter by ID',
      min: 1,
      max: 100,
      showFilter: true,
      disableSorting: false,
    },
    title: {
      type: 'text',
      placeholder: 'Search by title...',
      showFilter: false,
      disableSorting: true, // Test: Hide sort icons for this column
    },
    brand: {
      type: 'select',
      showFilter: false,
      disableSorting: false,
      options: [
        { label: 'Apple', value: 'Apple' },
        { label: 'Samsung', value: 'Samsung' },
        { label: 'OPPO', value: 'OPPO' },
        { label: 'Huawei', value: 'Huawei' },
        { label: 'Microsoft', value: 'Microsoft' },
        { label: 'Infinix', value: 'Infinix' },
        { label: 'HP Pavilion', value: 'HP Pavilion' },
        { label: 'Impression', value: 'Impression' },
        { label: 'Royal_Mirage', value: 'Royal_Mirage' },
        { label: 'Fog Scent Xpressio', value: 'Fog Scent Xpressio' },
        { label: 'Al Munakh', value: 'Al Munakh' },
        { label: 'Lord - Al-Rehab', value: 'Lord - Al-Rehab' },
        { label: 'L\'Oreal Paris', value: 'L\'Oreal Paris' },
        { label: 'Hemani Tea', value: 'Hemani Tea' },
        { label: 'Dermive', value: 'Dermive' },
        { label: 'ROREC White Rice', value: 'ROREC White Rice' },
        { label: 'Fair & Clear', value: 'Fair & Clear' },
        { label: 'Saaf & Khaas', value: 'Saaf & Khaas' },
        { label: 'Bake Parlor Big', value: 'Bake Parlor Big' },
        { label: 'Baking Food Items', value: 'Baking Food Items' },
        { label: 'fauji', value: 'fauji' },
        { label: 'Dry Rose', value: 'Dry Rose' },
        { label: 'Highlands', value: 'Highlands' },
      ],
    },
    category: {
      type: 'select',
      options: [
        { label: 'Smartphones', value: 'smartphones' },
        { label: 'Laptops', value: 'laptops' },
        { label: 'Fragrances', value: 'fragrances' },
        { label: 'Skincare', value: 'skincare' },
        { label: 'Groceries', value: 'groceries' },
        { label: 'Home Decoration', value: 'home-decoration' },
        { label: 'Furniture', value: 'furniture' },
        { label: 'Tops', value: 'tops' },
        { label: 'Womens Dresses', value: 'womens-dresses' },
        { label: 'Womens Shoes', value: 'womens-shoes' },
        { label: 'Mens Shirts', value: 'mens-shirts' },
        { label: 'Mens Shoes', value: 'mens-shoes' },
        { label: 'Mens Watches', value: 'mens-watches' },
        { label: 'Womens Watches', value: 'womens-watches' },
        { label: 'Womens Bags', value: 'womens-bags' },
        { label: 'Womens Jewellery', value: 'womens-jewellery' },
        { label: 'Sunglasses', value: 'sunglasses' },
        { label: 'Automotive', value: 'automotive' },
        { label: 'Motorcycle', value: 'motorcycle' },
        { label: 'Lighting', value: 'lighting' },
      ],
    },
    price: {
      type: 'range',
      min: 0,
      max: 2000,
      step: 0.01,
    },
    rating: {
      type: 'rating',
      maxRating: 5,
      showLabels: true,
    },
    stock: {
      type: 'number',
      placeholder: 'Filter by stock',
      min: 0,
      max: 200,
      showFilter: false, // Hide filter for this column
      disableSorting: true, // Hide sort icons for this column
    },
    // Example: Add a datetime column to demonstrate datetime filtering
    createdAt: {
      type: 'datetime',
      placeholder: 'Filter by creation date',
      showFilter: true,
      disableSorting: false,
    },
    
  };

  return (
    <div className="p-6 space-y-6">
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
        showColumnOrdering={true}
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
        filterConfigs={filterConfigs}
      />
    </div>
  );
}
