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
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

// Product columns for API data
const productColumnHelper = createColumnHelper<Product>();

const productColumns: ColumnDef<Product, any>[] = [
  productColumnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),
  productColumnHelper.accessor('thumbnail', {
    header: 'Image',
    cell: (info) => {
      const thumbnail = info.getValue();
      const row = info.row.original;
      return (
        <div className="flex items-center space-x-2">
          <div className="relative">
            <img
              src={thumbnail}
              alt={row.title}
              className="w-12 h-12 object-cover rounded-lg border border-gray-200"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/48x48?text=No+Image';
              }}
            />
            {row.images && row.images.length > 1 && (
              <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {row.images.length}
              </div>
            )}
          </div>
        </div>
      );
    },
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
  productColumnHelper.accessor('sku', {
    header: 'SKU',
    cell: (info) => (
      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
        {info.getValue()}
      </span>
    ),
  }),
  productColumnHelper.accessor('tags', {
    header: 'Tags',
    cell: (info) => {
      const tags = info.getValue();
      return (
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
          {tags.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              +{tags.length - 2}
            </span>
          )}
        </div>
      );
    },
  }),
  productColumnHelper.accessor('dimensions', {
    header: 'Dimensions',
    cell: (info) => {
      const dims = info.getValue();
      return (
        <div className="text-xs">
          <div>{dims.width} × {dims.height} × {dims.depth}</div>
          <div className="text-gray-500">cm</div>
        </div>
      );
    },
  }),
  productColumnHelper.accessor('reviews', {
    header: 'Reviews',
    cell: (info) => {
      const reviews = info.getValue();
      const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
      return (
        <div className="text-center">
          <div className="text-sm font-semibold">{avgRating.toFixed(1)}</div>
          <div className="text-xs text-gray-500">{reviews.length} reviews</div>
        </div>
      );
    },
  }),
  productColumnHelper.accessor('availabilityStatus', {
    header: 'Status',
    cell: (info) => {
      const status = info.getValue();
      const statusColors = {
        'In Stock': 'bg-green-100 text-green-800',
        'Out of Stock': 'bg-red-100 text-red-800',
        'Low Stock': 'bg-yellow-100 text-yellow-800',
      };
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`}>
          {status}
        </span>
      );
    },
  }),
  productColumnHelper.accessor('meta.createdAt', {
    header: 'Created',
    cell: (info) => {
      const date = info.getValue();
      return new Date(date).toLocaleDateString();
    },
  }),
  productColumnHelper.accessor('images', {
    header: 'Gallery',
    cell: (info) => {
      const images = info.getValue();
      const row = info.row.original;
      
      if (!images || images.length === 0) {
        return (
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-xs text-gray-400">No images</span>
          </div>
        );
      }

      return (
        <div className="flex space-x-1">
          {images.slice(0, 3).map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`${row.title} - Image ${index + 1}`}
                className="w-8 h-8 object-cover rounded border border-gray-200"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/32x32?text=!';
                }}
              />
              {index === 2 && images.length > 3 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">+{images.length - 3}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    },
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
  productColumnHelper.accessor('reviews.date', {
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
    // New complex field filters
    sku: {
      type: 'text',
      placeholder: 'Search by SKU...',
      showFilter: true,
      disableSorting: false,
    },
    availabilityStatus: {
      type: 'select',
      showFilter: true,
      disableSorting: false,
      options: [
        { label: 'In Stock', value: 'In Stock' },
        { label: 'Out of Stock', value: 'Out of Stock' },
        { label: 'Low Stock', value: 'Low Stock' },
      ],
    },
    'meta.createdAt': {
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
      /*   filterConfigs={filterConfigs} */
      />
    </div>
  );
}
