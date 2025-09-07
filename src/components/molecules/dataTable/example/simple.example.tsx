import React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { DataTable } from '../dataTable';
import type { Action } from '../types';

// Simple data interface
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'available' | 'out_of_stock';
}

// Sample data
const products: Product[] = [
  { id: 1, name: 'لپ‌تاپ ایسوس', category: 'کامپیوتر', price: 25000000, stock: 5, status: 'available' },
  { id: 2, name: 'موبایل سامسونگ', category: 'موبایل', price: 15000000, stock: 0, status: 'out_of_stock' },
  { id: 3, name: 'هدفون بلوتوث', category: 'لوازم جانبی', price: 2500000, stock: 12, status: 'available' },
  { id: 4, name: 'کیبورد مکانیکی', category: 'لوازم جانبی', price: 3000000, stock: 8, status: 'available' },
  { id: 5, name: 'مانیتور 24 اینچ', category: 'کامپیوتر', price: 8000000, stock: 3, status: 'available' },
];

// Column definitions
const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'نام محصول',
    cell: ({ row }) => (
      <span className="font-medium text-gray-900">{row.getValue('name')}</span>
    ),
  },
  {
    accessorKey: 'category',
    header: 'دسته‌بندی',
    cell: ({ row }) => (
      <span className="text-gray-600">{row.getValue('category')}</span>
    ),
  },
  {
    accessorKey: 'price',
    header: 'قیمت',
    cell: ({ row }) => (
      <span className="font-medium text-gray-900">
        {new Intl.NumberFormat('fa-IR').format(row.getValue('price'))} تومان
      </span>
    ),
  },
  {
    accessorKey: 'stock',
    header: 'موجودی',
    cell: ({ row }) => {
      const stock = row.getValue('stock') as number;
      return (
        <span className={`font-medium ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {stock} عدد
        </span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'وضعیت',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          status === 'available' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {status === 'available' ? 'موجود' : 'ناموجود'}
        </span>
      );
    },
  },
];

// Actions
const actions: Action<Product>[] = [
  {
    label: 'مشاهده',
    icon: <FaEye className="w-4 h-4" />,
    onClick: (product) => alert(`مشاهده محصول: ${product.name}`),
  },
  {
    label: 'ویرایش',
    icon: <FaEdit className="w-4 h-4" />,
    onClick: (product) => alert(`ویرایش محصول: ${product.name}`),
  },
  {
    label: 'حذف',
    icon: <FaTrash className="w-4 h-4" />,
    onClick: (product) => {
      if (confirm(`آیا مطمئن هستید که می‌خواهید ${product.name} را حذف کنید؟`)) {
        alert(`محصول ${product.name} حذف شد`);
      }
    },
  },
];

// Simple example component
export const SimpleDataTableExample: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            مثال ساده جدول داده‌ها
          </h1>
          <p className="text-gray-600">
            نمونه ساده استفاده از کامپوننت DataTable
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <DataTable
            dataSource={products}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            initialPageSize={5}
            actions={actions}
            enableColumnVisibility={true}
            enableColumnFiltering={true}
            enableGlobalFilter={true}
            globalFilterPlaceholder="جستجو در محصولات..."
            enablePagination={true}
            enableDensityToggle={true}
            emptyStateTitle="هیچ محصولی یافت نشد"
            emptyStateDescription="لطفاً فیلترهای جستجو را تغییر دهید"
          />
        </div>
      </div>
    </div>
  );
};

export default SimpleDataTableExample;
