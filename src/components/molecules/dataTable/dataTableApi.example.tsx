import React, { useState, useCallback, useRef, useEffect } from "react";
import { DataTable } from "./dataTable";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import {
  EditIcon,
  TrashIcon,
  EyeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import type { FilterConfig } from "./dataTableFilters";
import { ActionsDropdown } from "@/components/atoms";

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

// Actions Dropdown Component
/* const ActionsDropdown = ({ row }: { row: Product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const actions = [
    {
      label: 'View',
      icon: <EyeIcon className="w-4 h-4" />,
      onClick: () => {
        console.log('View product:', row);
        alert(`Viewing ${row.title}`);
        setIsOpen(false);
      },
      className: 'text-blue-600 hover:bg-blue-50',
    },
    {
      label: 'Edit',
      icon: <EditIcon className="w-4 h-4" />,
      onClick: () => {
        console.log('Edit product:', row);
        alert(`Editing ${row.title}`);
        setIsOpen(false);
      },
      className: 'text-green-600 hover:bg-green-50',
    },
    {
      label: 'Delete',
      icon: <TrashIcon className="w-4 h-4" />,
      onClick: () => {
        if (confirm(`Are you sure you want to delete ${row.title}?`)) {
          console.log('Delete product:', row);
          alert(`Deleted ${row.title}`);
        }
        setIsOpen(false);
      },
      className: 'text-red-600 hover:bg-red-50',
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
        title="More actions"
      >
        <MoreHorizontalIcon className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-1">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-sm ${action.className} hover:bg-opacity-10 transition-colors`}
              >
                {action.icon}
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; */

const productActions = [
  {
    label: "View",
    icon: <EyeIcon className="w-3 h-3" />,
    onClick: (row: { original: Product }) => {
      console.log("View product:", row.original);
      alert(`Viewing ${row.original.title}`);
    },
    variant: "outline" as const,
  },
  {
    label: "Edit",
    icon: <EditIcon className="w-3 h-3" />,
    onClick: (row: { original: Product }) => {
      alert(`Editing ${row.original.title}`);
    },
    variant: "default" as const,
  },
  {
    label: "Delete",
    icon: <TrashIcon className="w-3 h-3" />,
    onClick: (row: { original: Product }) => {
      if (confirm(`Are you sure you want to delete ${row.original.title}?`)) {
        // Handle delete logic here
      }
    },
    variant: "destructive" as const,
  },
];
// Product columns for API data
const productColumnHelper = createColumnHelper<Product>();

const productColumns: ColumnDef<Product, any>[] = [
  productColumnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  productColumnHelper.accessor("thumbnail", {
    header: "Image",
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
                e.currentTarget.src =
                  "https://via.placeholder.com/48x48?text=No+Image";
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
  productColumnHelper.accessor("title", {
    header: "Title",
    cell: (info) => (
      <div className="max-w-[200px] truncate" title={info.getValue()}>
        {info.getValue()}
      </div>
    ),
  }),
  productColumnHelper.accessor("brand", {
    header: "Brand",
    cell: (info) => info.getValue(),
  }),
  productColumnHelper.accessor("category", {
    header: "Category",
    cell: (info) => (
      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
        {info.getValue()}
      </span>
    ),
  }),
  productColumnHelper.accessor("sku", {
    header: "SKU",
    cell: (info) => (
      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
        {info.getValue()}
      </span>
    ),
  }),
  productColumnHelper.accessor("tags", {
    header: "Tags",
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
  productColumnHelper.accessor("dimensions", {
    header: "Dimensions",
    cell: (info) => {
      const dims = info.getValue();
      return (
        <div className="text-xs">
          <div>
            {dims.width} × {dims.height} × {dims.depth}
          </div>
          <div className="text-gray-500">cm</div>
        </div>
      );
    },
  }),
  productColumnHelper.accessor("reviews", {
    header: "Reviews",
    cell: (info) => {
      const reviews = info.getValue();
      const avgRating =
        reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length;
      return (
        <div className="text-center">
          <div className="text-sm font-semibold">{avgRating.toFixed(1)}</div>
          <div className="text-xs text-gray-500">{reviews.length} reviews</div>
        </div>
      );
    },
  }),
  productColumnHelper.accessor("availabilityStatus", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      const statusColors = {
        "In Stock": "bg-green-100 text-green-800",
        "Out of Stock": "bg-red-100 text-red-800",
        "Low Stock": "bg-yellow-100 text-yellow-800",
      };
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            statusColors[status as keyof typeof statusColors] ||
            "bg-gray-100 text-gray-800"
          }`}
        >
          {status}
        </span>
      );
    },
  }),
  productColumnHelper.accessor("meta.createdAt", {
    header: "Created",
    cell: (info) => {
      const date = info.getValue();
      return new Date(date).toLocaleDateString();
    },
  }),
  productColumnHelper.accessor("images", {
    header: "Gallery",
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
                  e.currentTarget.src =
                    "https://via.placeholder.com/32x32?text=!";
                }}
              />
              {index === 2 && images.length > 3 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    +{images.length - 3}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    },
  }),
  productColumnHelper.accessor("price", {
    header: "Price",
    cell: (info) => `$${info.getValue()}`,
  }),
  productColumnHelper.accessor("rating", {
    header: "Rating",
    cell: (info) => (
      <div className="flex items-center gap-1">
        <span className="text-yellow-500">★</span>
        <span>{info.getValue()}</span>
      </div>
    ),
  }),
  productColumnHelper.accessor("stock", {
    header: "Stock",
    enableSorting: false, // Disable sorting for this column
    cell: (info) => (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          info.getValue() > 50
            ? "bg-green-100 text-green-800"
            : info.getValue() > 20
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {info.getValue()}
      </span>
    ),
  }),
  productColumnHelper.accessor("reviews.date", {
    header: "Created At",
    cell: (info) => {
      const value = info.getValue();
      if (!value) return <span className="text-gray-400">-</span>;
      return new Date(value).toLocaleString();
    },
  }),

  // Expandable Row Column
  productColumnHelper.display({
    id: "expand",
    header: "",
    cell: (info) => {
      const row = info.row.original;
      const isExpanded = info.row.getIsExpanded();

      return (
        <button
          onClick={() => info.row.toggleExpanded()}
          className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
          title={isExpanded ? "Collapse details" : "Expand details"}
        >
          {isExpanded ? (
            <ChevronUpIcon className="w-4 h-4" />
          ) : (
            <ChevronDownIcon className="w-4 h-4" />
          )}
        </button>
      );
    },
  }),

  // Actions Column with Dropdown
  productColumnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (info) => (
      <ActionsDropdown actions={productActions}  position="top-left" />
    ),
  }),
];

// Custom expanded content renderer
const renderExpandedContent = (row: Product) => {
  return (
    <div className="p-6 bg-gray-50 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Product Images */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Product Images
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {row.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${row.title} - Image ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/100x100?text=No+Image";
                }}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Product Details
          </h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Description:</span>{" "}
              {row.description}
            </div>
            <div>
              <span className="font-medium">SKU:</span> {row.sku}
            </div>
            <div>
              <span className="font-medium">Weight:</span> {row.weight}g
            </div>
            <div>
              <span className="font-medium">Dimensions:</span>{" "}
              {row.dimensions.width} × {row.dimensions.height} ×{" "}
              {row.dimensions.depth} cm
            </div>
            <div>
              <span className="font-medium">Warranty:</span>{" "}
              {row.warrantyInformation}
            </div>
            <div>
              <span className="font-medium">Shipping:</span>{" "}
              {row.shippingInformation}
            </div>
            <div>
              <span className="font-medium">Return Policy:</span>{" "}
              {row.returnPolicy}
            </div>
            <div>
              <span className="font-medium">Min Order:</span>{" "}
              {row.minimumOrderQuantity}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Customer Reviews
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {row.reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded-lg border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm font-medium">
                      {review.reviewerName}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meta Information */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Meta Information
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium">Created:</span>{" "}
            {new Date(row.meta.createdAt).toLocaleString()}
          </div>
          <div>
            <span className="font-medium">Updated:</span>{" "}
            {new Date(row.meta.updatedAt).toLocaleString()}
          </div>
          <div>
            <span className="font-medium">Barcode:</span> {row.meta.barcode}
          </div>
          <div>
            <span className="font-medium">QR Code:</span>
            <a
              href={row.meta.qrCode}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-1"
            >
              View QR
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// API Example Component
export function DataTableApiExample() {
  const [, setSelectedRows] = useState<Product[]>([]);

  const handleRowClick = (row: { original: Product }) => {
    console.log("Product clicked:", row.original);
  };

  const handleRowSelect = useCallback(
    (selectedRows: { original: Product }[]) => {
      setSelectedRows(selectedRows.map((row) => row.original));
    },
    []
  );

  // Comprehensive filter configurations demonstrating all filter types
  const filterConfigs: Record<string, FilterConfig> = {
    id: {
      type: "number",
      placeholder: "Filter by ID",
      min: 1,
      max: 100,
      showFilter: true,
      disableSorting: false,
    },
    title: {
      type: "text",
      placeholder: "Search by title...",
      showFilter: false,
      disableSorting: true, // Test: Hide sort icons for this column
    },
    brand: {
      type: "select",
      showFilter: false,
      disableSorting: false,
      options: [
        { label: "Apple", value: "Apple" },
        { label: "Samsung", value: "Samsung" },
        { label: "OPPO", value: "OPPO" },
        { label: "Huawei", value: "Huawei" },
        { label: "Microsoft", value: "Microsoft" },
        { label: "Infinix", value: "Infinix" },
        { label: "HP Pavilion", value: "HP Pavilion" },
        { label: "Impression", value: "Impression" },
        { label: "Royal_Mirage", value: "Royal_Mirage" },
        { label: "Fog Scent Xpressio", value: "Fog Scent Xpressio" },
        { label: "Al Munakh", value: "Al Munakh" },
        { label: "Lord - Al-Rehab", value: "Lord - Al-Rehab" },
        { label: "L'Oreal Paris", value: "L'Oreal Paris" },
        { label: "Hemani Tea", value: "Hemani Tea" },
        { label: "Dermive", value: "Dermive" },
        { label: "ROREC White Rice", value: "ROREC White Rice" },
        { label: "Fair & Clear", value: "Fair & Clear" },
        { label: "Saaf & Khaas", value: "Saaf & Khaas" },
        { label: "Bake Parlor Big", value: "Bake Parlor Big" },
        { label: "Baking Food Items", value: "Baking Food Items" },
        { label: "fauji", value: "fauji" },
        { label: "Dry Rose", value: "Dry Rose" },
        { label: "Highlands", value: "Highlands" },
      ],
    },
    category: {
      type: "select",
      options: [
        { label: "Smartphones", value: "smartphones" },
        { label: "Laptops", value: "laptops" },
        { label: "Fragrances", value: "fragrances" },
        { label: "Skincare", value: "skincare" },
        { label: "Groceries", value: "groceries" },
        { label: "Home Decoration", value: "home-decoration" },
        { label: "Furniture", value: "furniture" },
        { label: "Tops", value: "tops" },
        { label: "Womens Dresses", value: "womens-dresses" },
        { label: "Womens Shoes", value: "womens-shoes" },
        { label: "Mens Shirts", value: "mens-shirts" },
        { label: "Mens Shoes", value: "mens-shoes" },
        { label: "Mens Watches", value: "mens-watches" },
        { label: "Womens Watches", value: "womens-watches" },
        { label: "Womens Bags", value: "womens-bags" },
        { label: "Womens Jewellery", value: "womens-jewellery" },
        { label: "Sunglasses", value: "sunglasses" },
        { label: "Automotive", value: "automotive" },
        { label: "Motorcycle", value: "motorcycle" },
        { label: "Lighting", value: "lighting" },
      ],
    },
    price: {
      type: "range",
      min: 0,
      max: 2000,
      step: 0.01,
    },
    rating: {
      type: "rating",
      maxRating: 5,
      showLabels: true,
    },
    stock: {
      type: "number",
      placeholder: "Filter by stock",
      min: 0,
      max: 200,
      showFilter: false, // Hide filter for this column
      disableSorting: true, // Hide sort icons for this column
    },
    // Example: Add a datetime column to demonstrate datetime filtering
    createdAt: {
      type: "datetime",
      placeholder: "Filter by creation date",
      showFilter: true,
      disableSorting: false,
    },
    // New complex field filters
    sku: {
      type: "text",
      placeholder: "Search by SKU...",
      showFilter: true,
      disableSorting: false,
    },
    availabilityStatus: {
      type: "select",
      showFilter: true,
      disableSorting: false,
      options: [
        { label: "In Stock", value: "In Stock" },
        { label: "Out of Stock", value: "Out of Stock" },
        { label: "Low Stock", value: "Low Stock" },
      ],
    },
    "meta.createdAt": {
      type: "datetime",
      placeholder: "Filter by creation date",
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
        enableExpanding={true}
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
        renderExpandedContent={renderExpandedContent}
        /*   filterConfigs={filterConfigs} */
      />
    </div>
  );
}
