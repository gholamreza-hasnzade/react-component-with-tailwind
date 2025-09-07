import React, { useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { FaEye, FaEdit, FaTrash, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { DataTable } from '../dataTable';
import type { Action } from '../types';

// Product interface for DummyJSON
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

// User interface for JSONPlaceholder
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
  };
}

// Product columns
const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'thumbnail',
    header: 'تصویر',
    cell: ({ row }) => (
      <img 
        src={row.getValue('thumbnail')} 
        alt={row.getValue('title')}
        className="w-12 h-12 object-cover rounded-lg"
      />
    ),
    size: 80,
  },
  {
    accessorKey: 'title',
    header: 'نام محصول',
    cell: ({ row }) => (
      <div className="font-medium text-gray-900 max-w-xs truncate" title={row.getValue('title')}>
        {row.getValue('title')}
      </div>
    ),
    size: 200,
  },
  {
    accessorKey: 'category',
    header: 'دسته‌بندی',
    cell: ({ row }) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-50 text-blue-700">
        {row.getValue('category')}
      </span>
    ),
    size: 120,
  },
  {
    accessorKey: 'brand',
    header: 'برند',
    cell: ({ row }) => (
      <span className="text-gray-600 font-medium">{row.getValue('brand')}</span>
    ),
    size: 100,
  },
  {
    accessorKey: 'price',
    header: 'قیمت',
    cell: ({ row }) => {
      const price = row.getValue('price') as number;
      const discount = row.original.discountPercentage;
      const discountedPrice = price * (1 - discount / 100);
      
      return (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">${price}</span>
          {discount > 0 && (
            <span className="text-sm text-green-600">
              ${discountedPrice.toFixed(2)} ({discount}% off)
            </span>
          )}
        </div>
      );
    },
    size: 120,
  },
  {
    accessorKey: 'rating',
    header: 'امتیاز',
    cell: ({ row }) => {
      const rating = row.getValue('rating') as number;
      return (
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>
        </div>
      );
    },
    size: 100,
  },
  {
    accessorKey: 'stock',
    header: 'موجودی',
    cell: ({ row }) => {
      const stock = row.getValue('stock') as number;
      return (
        <span className={`font-medium ${stock > 10 ? 'text-green-600' : stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
          {stock} عدد
        </span>
      );
    },
    size: 100,
  },
];

// User columns
const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'نام',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <FaUser className="w-4 h-4 text-blue-600" />
        </div>
        <span className="font-medium text-gray-900">{row.getValue('name')}</span>
      </div>
    ),
    size: 200,
  },
  {
    accessorKey: 'email',
    header: 'ایمیل',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <FaEnvelope className="w-4 h-4 text-gray-400" />
        <span className="text-gray-600">{row.getValue('email')}</span>
      </div>
    ),
    size: 250,
  },
  {
    accessorKey: 'phone',
    header: 'تلفن',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <FaPhone className="w-4 h-4 text-gray-400" />
        <span className="text-gray-600">{row.getValue('phone')}</span>
      </div>
    ),
    size: 180,
  },
  {
    accessorKey: 'address',
    header: 'آدرس',
    cell: ({ row }) => {
      const address = row.getValue('address') as User['address'];
      return (
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{address.city}, {address.street}</span>
        </div>
      );
    },
    size: 200,
  },
  {
    accessorKey: 'company',
    header: 'شرکت',
    cell: ({ row }) => {
      const company = row.getValue('company') as User['company'];
      return (
        <div>
          <div className="font-medium text-gray-900">{company.name}</div>
          <div className="text-sm text-gray-500 truncate max-w-xs" title={company.catchPhrase}>
            {company.catchPhrase}
          </div>
        </div>
      );
    },
    size: 250,
  },
  {
    accessorKey: 'website',
    header: 'وب‌سایت',
    cell: ({ row }) => (
      <a 
        href={`https://${row.getValue('website')}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {row.getValue('website')}
      </a>
    ),
    size: 150,
  },
];

// Product actions
const productActions: Action<Product>[] = [
  {
    label: 'مشاهده',
    icon: <FaEye className="w-4 h-4" />,
    onClick: (product) => alert(`مشاهده محصول: ${product.title}`),
  },
  {
    label: 'ویرایش',
    icon: <FaEdit className="w-4 h-4" />,
    onClick: (product) => alert(`ویرایش محصول: ${product.title}`),
  },
  {
    label: 'حذف',
    icon: <FaTrash className="w-4 h-4" />,
    onClick: (product) => {
      if (confirm(`آیا مطمئن هستید که می‌خواهید ${product.title} را حذف کنید؟`)) {
        alert(`محصول ${product.title} حذف شد`);
      }
    },
  },
];

// User actions
const userActions: Action<User>[] = [
  {
    label: 'مشاهده',
    icon: <FaEye className="w-4 h-4" />,
    onClick: (user) => alert(`مشاهده کاربر: ${user.name}`),
  },
  {
    label: 'ویرایش',
    icon: <FaEdit className="w-4 h-4" />,
    onClick: (user) => alert(`ویرایش کاربر: ${user.name}`),
  },
  {
    label: 'حذف',
    icon: <FaTrash className="w-4 h-4" />,
    onClick: (user) => {
      if (confirm(`آیا مطمئن هستید که می‌خواهید ${user.name} را حذف کنید؟`)) {
        alert(`کاربر ${user.name} حذف شد`);
      }
    },
  },
];

// Main API example component
export const ApiDataTableExample: React.FC = () => {
  const [activeApi, setActiveApi] = useState<'products' | 'users'>('products');
  const [density, setDensity] = useState<'compact' | 'normal' | 'comfortable'>('normal');

  const handleDensityChange = (newDensity: 'compact' | 'normal' | 'comfortable') => {
    setDensity(newDensity);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            مثال‌های API
          </h1>
          <p className="text-gray-600">
            نمونه‌های مختلف استفاده از DataTable با API های مختلف
          </p>
        </div>

        {/* API Selection */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">انتخاب API</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setActiveApi('products')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeApi === 'products'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                محصولات (DummyJSON)
              </button>
              <button
                onClick={() => setActiveApi('users')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeApi === 'users'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                کاربران (JSONPlaceholder)
              </button>
            </div>
          </div>
        </div>

        {/* Products API */}
        {activeApi === 'products' && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              محصولات از DummyJSON API
            </h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
              <div className="text-sm text-gray-600">
                <strong>API Endpoint:</strong> https://dummyjson.com/products
                <br />
                <strong>Features:</strong> تصاویر محصولات، قیمت‌ها، امتیازات، موجودی، تخفیفات
              </div>
            </div>
            <DataTable
              dataSource="https://dummyjson.com/products"
              columns={productColumns}
              pageSizeOptions={[10, 20, 30, 50]}
              initialPageSize={10}
              actions={productActions}
              enableColumnVisibility={true}
              enableColumnFiltering={true}
              enableGlobalFilter={true}
              globalFilterPlaceholder="جستجو در محصولات..."
              enablePagination={true}
              enableDensityToggle={true}
              initialDensity={density}
              onDensityChange={handleDensityChange}
              enableColumnPinning={true}
              enableAdvancedFiltering={true}
              emptyStateTitle="هیچ محصولی یافت نشد"
              emptyStateDescription="لطفاً فیلترهای جستجو را تغییر دهید"
            />
          </div>
        )}

        {/* Users API */}
        {activeApi === 'users' && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              کاربران از JSONPlaceholder API
            </h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
              <div className="text-sm text-gray-600">
                <strong>API Endpoint:</strong> https://jsonplaceholder.typicode.com/users
                <br />
                <strong>Features:</strong> اطلاعات کاربران، آدرس‌ها، شرکت‌ها، وب‌سایت‌ها
              </div>
            </div>
            <DataTable
              dataSource="https://jsonplaceholder.typicode.com/users"
              columns={userColumns}
              pageSizeOptions={[5, 10, 20]}
              initialPageSize={10}
              actions={userActions}
              enableColumnVisibility={true}
              enableColumnFiltering={true}
              enableGlobalFilter={true}
              globalFilterPlaceholder="جستجو در کاربران..."
              enablePagination={true}
              enableDensityToggle={true}
              initialDensity={density}
              onDensityChange={handleDensityChange}
              enableColumnPinning={true}
              enableAdvancedFiltering={true}
              emptyStateTitle="هیچ کاربری یافت نشد"
              emptyStateDescription="لطفاً فیلترهای جستجو را تغییر دهید"
            />
          </div>
        )}

        {/* API Integration Guide */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            راهنمای استفاده از API
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">1. استفاده ساده از API</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`<DataTable
  dataSource="https://api.example.com/data"
  columns={columns}
  enablePagination={true}
  enableGlobalFilter={true}
/>`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-2">2. API با جستجوی سفارشی</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`<DataTable
  dataSource="https://api.example.com/data"
  searchEndpoint="https://api.example.com/search"
  columns={columns}
  enableGlobalFilter={true}
  globalFilterPlaceholder="جستجو..."
/>`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-2">3. فرمت پاسخ API مورد انتظار</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`{
  "data": [...], // یا "products": [...]
  "total": 100
}`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-2">4. پارامترهای ارسالی به API</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <code>limit</code> - تعداد آیتم در صفحه</li>
                <li>• <code>skip</code> - تعداد آیتم‌های رد شده (برای صفحه‌بندی)</li>
                <li>• <code>sortBy</code> - ستون مرتب‌سازی</li>
                <li>• <code>order</code> - ترتیب مرتب‌سازی (asc/desc)</li>
                <li>• <code>q</code> - عبارت جستجو</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDataTableExample;
