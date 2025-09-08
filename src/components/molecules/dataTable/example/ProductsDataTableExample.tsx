import  { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { FaEye, FaEdit, FaTrash, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { DataTable } from '../dataTable';
import { Badge } from '@/components/atoms/badge';
import type { Action } from '../types';

// Define the Product interface based on the DummyJSON API structure
export interface Product {
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

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Helper function to format rating
const formatRating = (rating: number) => {
  return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
};

// Helper function to get stock status color
const getStockStatusColor = (stock: number) => {
  if (stock === 0) return 'bg-red-100 text-red-800';
  if (stock < 10) return 'bg-yellow-100 text-yellow-800';
  if (stock < 50) return 'bg-orange-100 text-orange-800';
  return 'bg-green-100 text-green-800';
};

// Helper function to get stock status text
const getStockStatusText = (stock: number) => {
  if (stock === 0) return 'Out of Stock';
  if (stock < 10) return 'Low Stock';
  if (stock < 50) return 'Limited Stock';
  return 'In Stock';
};

export function ProductsDataTableExample() {
  // Define actions for each product row
  const actions: Action<Product>[] = [
    {
      label: 'View Details',
      icon: <FaEye className="w-3 h-3" />,
      onClick: (product) => {
        console.log('Viewing product:', product.title);
        alert(`Viewing details for: ${product.title}`);
      },
    },
    {
      label: 'Edit',
      icon: <FaEdit className="w-3 h-3" />,
      onClick: (product) => {
        console.log('Editing product:', product.title);
        alert(`Editing: ${product.title}`);
      },
    },
    {
      label: 'Add to Cart',
      icon: <FaShoppingCart className="w-3 h-3" />,
      onClick: (product) => {
        console.log('Adding to cart:', product.title);
        alert(`Added to cart: ${product.title}`);
      },
    },
    {
      label: 'Add to Wishlist',
      icon: <FaHeart className="w-3 h-3" />,
      onClick: (product) => {
        console.log('Adding to wishlist:', product.title);
        alert(`Added to wishlist: ${product.title}`);
      },
    },
    {
      label: 'Delete',
      icon: <FaTrash className="w-3 h-3" />,
      onClick: (product) => {
        console.log('Deleting product:', product.title);
        if (confirm(`Are you sure you want to delete "${product.title}"?`)) {
          alert(`Deleted: ${product.title}`);
        }
      },
    },
  ];

  // Define columns for the DataTable
  const columns: ColumnDef<Product>[] = useMemo(
    () => [
      {
        accessorKey: 'thumbnail',
        header: 'Image',
        cell: ({ getValue }) => {
          const thumbnail = getValue() as string;
          return (
            <div className="flex items-center justify-center">
              <img
                src={thumbnail}
                alt="Product"
                className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/48x48?text=No+Image';
                }}
              />
            </div>
          );
        },
        size: 80,
        enableSorting: false,
      },
      {
        accessorKey: 'title',
        header: 'Product Name',
        cell: ({ getValue, row }) => {
          const title = getValue() as string;
          const product = row.original;
          return (
            <div className="space-y-1">
              <div className="font-medium text-gray-900 truncate max-w-xs" title={title}>
                {title}
              </div>
              <div className="text-xs text-gray-500 truncate max-w-xs" title={product.brand}>
                {product.brand}
              </div>
              <div className="text-xs text-gray-400">
                SKU: {product.sku}
              </div>
            </div>
          );
        },
        size: 250,
      },
      {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ getValue }) => {
          const category = getValue() as string;
          return (
            <Badge variant="secondary" className="capitalize">
              {category}
            </Badge>
          );
        },
        size: 120,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ getValue, row }) => {
          const price = getValue() as number;
          const product = row.original;
          const discountedPrice = price * (1 - product.discountPercentage / 100);
          
          return (
            <div className="space-y-1">
              <div className="font-medium text-gray-900">
                {formatCurrency(discountedPrice)}
              </div>
              {product.discountPercentage > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 line-through">
                    {formatCurrency(price)}
                  </span>
                  <Badge variant="destructive" className="text-xs">
                    -{product.discountPercentage}%
                  </Badge>
                </div>
              )}
            </div>
          );
        },
        size: 120,
      },
      {
        accessorKey: 'rating',
        header: 'Rating',
        cell: ({ getValue }) => {
          const rating = getValue() as number;
          return (
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-sm">
                {formatRating(rating)}
              </span>
              <span className="text-xs text-gray-500 ml-1">
                ({rating.toFixed(1)})
              </span>
            </div>
          );
        },
        size: 100,
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
        cell: ({ getValue }) => {
          const stock = getValue() as number;
          return (
            <div className="space-y-1">
              <Badge className={getStockStatusColor(stock)}>
                {getStockStatusText(stock)}
              </Badge>
              <div className="text-xs text-gray-500">
                {stock} units
              </div>
            </div>
          );
        },
        size: 120,
      },
      {
        accessorKey: 'tags',
        header: 'Tags',
        cell: ({ getValue }) => {
          const tags = getValue() as string[];
          return (
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 2).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{tags.length - 2}
                </Badge>
              )}
            </div>
          );
        },
        size: 150,
        enableSorting: false,
      },
      {
        accessorKey: 'availabilityStatus',
        header: 'Status',
        cell: ({ getValue }) => {
          const status = getValue() as string;
          const statusColors = {
            'In Stock': 'bg-green-100 text-green-800',
            'Out of Stock': 'bg-red-100 text-red-800',
            'Limited Stock': 'bg-yellow-100 text-yellow-800',
          };
          return (
            <Badge className={statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}>
              {status}
            </Badge>
          );
        },
        size: 120,
      },
    ],
    []
  );

  // Handle row selection
  const handleRowSelectionChange = (selectedRows: Product[]) => {
    console.log('Selected products:', selectedRows);
  };

  // Handle single row selection
  const handleSelectSingleRow = (selectedRow: Product) => {
    console.log('Selected product:', selectedRow);
  };

  // Handle density change
  const handleDensityChange = (density: 'compact' | 'normal' | 'comfortable') => {
    console.log('Density changed to:', density);
  };

  return (
    <div className="p-6 space-y-6">


      <div className="space-y-4">
        <DataTable<Product>
          dataSource="https://dummyjson.com/products"
          columns={columns}
          initialPageSize={10}
          actions={actions}
          actionsHorizontal={false}
          enableColumnVisibility={true}
          enableColumnFiltering={true}
          enableGlobalFilter={true}
          globalFilterPlaceholder="Search products..."
          enableColumnPinning={true}
          enableFilterToggle={true}
          enablePagination={true}
          enableDensityToggle={true}
          initialDensity="normal"
          onDensityChange={handleDensityChange}
          onRowSelectionChange={handleRowSelectionChange}
          onSelectSingleRow={handleSelectSingleRow}
          selectedRowClassName="bg-blue-50 border-l-4 border-blue-500"
          emptyStateTitle="No products found"
          emptyStateDescription="Try adjusting your search or filters to find products."
          enableAdvancedFiltering={true}
          getRowId={(product) => product.id.toString()}
        />
      </div>

      
    </div>
  );
}
