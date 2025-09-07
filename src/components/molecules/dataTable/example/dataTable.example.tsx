import React, { useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { FaEdit, FaTrash, FaEye, FaDownload, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { DataTable } from '../dataTable';
import type { Action } from '../types';

// Sample data interface
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  location: string;
  joinDate: string;
  salary: number;
}

// Sample data
const sampleUsers: User[] = [
  {
    id: 1,
    name: 'احمد محمدی',
    email: 'ahmad.mohammadi@example.com',
    phone: '+98 912 345 6789',
    department: 'توسعه نرم‌افزار',
    role: 'توسعه‌دهنده ارشد',
    status: 'active',
    location: 'تهران، ایران',
    joinDate: '2022-01-15',
    salary: 15000000
  },
  {
    id: 2,
    name: 'فاطمه احمدی',
    email: 'fateme.ahmadi@example.com',
    phone: '+98 912 345 6790',
    department: 'طراحی UI/UX',
    role: 'طراح رابط کاربری',
    status: 'active',
    location: 'اصفهان، ایران',
    joinDate: '2022-03-20',
    salary: 12000000
  },
  {
    id: 3,
    name: 'علی رضایی',
    email: 'ali.rezaei@example.com',
    phone: '+98 912 345 6791',
    department: 'مدیریت پروژه',
    role: 'مدیر پروژه',
    status: 'pending',
    location: 'مشهد، ایران',
    joinDate: '2023-06-10',
    salary: 18000000
  },
  {
    id: 4,
    name: 'زهرا کریمی',
    email: 'zahra.karimi@example.com',
    phone: '+98 912 345 6792',
    department: 'توسعه نرم‌افزار',
    role: 'توسعه‌دهنده',
    status: 'active',
    location: 'شیراز، ایران',
    joinDate: '2021-11-05',
    salary: 10000000
  },
  {
    id: 5,
    name: 'محمد حسینی',
    email: 'mohammad.hosseini@example.com',
    phone: '+98 912 345 6793',
    department: 'تست نرم‌افزار',
    role: 'تست‌کننده نرم‌افزار',
    status: 'inactive',
    location: 'تبریز، ایران',
    joinDate: '2020-08-12',
    salary: 8000000
  },
  {
    id: 6,
    name: 'نرگس محمدی',
    email: 'narges.mohammadi@example.com',
    phone: '+98 912 345 6794',
    department: 'تحلیل داده',
    role: 'تحلیل‌گر داده',
    status: 'active',
    location: 'کرج، ایران',
    joinDate: '2022-09-18',
    salary: 13000000
  },
  {
    id: 7,
    name: 'حسن رضایی',
    email: 'hasan.rezaei@example.com',
    phone: '+98 912 345 6795',
    department: 'DevOps',
    role: 'مهندس DevOps',
    status: 'active',
    location: 'اهواز، ایران',
    joinDate: '2021-04-22',
    salary: 16000000
  },
  {
    id: 8,
    name: 'مریم احمدی',
    email: 'maryam.ahmadi@example.com',
    phone: '+98 912 345 6796',
    department: 'منابع انسانی',
    role: 'مدیر منابع انسانی',
    status: 'active',
    location: 'قم، ایران',
    joinDate: '2020-12-03',
    salary: 14000000
  }
];

// Status badge component
const StatusBadge: React.FC<{ status: User['status'] }> = ({ status }) => {
  const statusConfig = {
    active: { color: 'bg-green-100 text-green-800', text: 'فعال' },
    inactive: { color: 'bg-red-100 text-red-800', text: 'غیرفعال' },
    pending: { color: 'bg-yellow-100 text-yellow-800', text: 'در انتظار' }
  };

  const config = statusConfig[status];
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.text}
    </span>
  );
};

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fa-IR', {
    style: 'currency',
    currency: 'IRR',
    minimumFractionDigits: 0
  }).format(amount);
};

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fa-IR');
};

// Column definitions
const columns: ColumnDef<User>[] = [
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
    accessorKey: 'department',
    header: 'بخش',
    cell: ({ row }) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-50 text-blue-700">
        {row.getValue('department')}
      </span>
    ),
    size: 150,
  },
  {
    accessorKey: 'role',
    header: 'نقش',
    cell: ({ row }) => (
      <span className="text-gray-700">{row.getValue('role')}</span>
    ),
    size: 180,
  },
  {
    accessorKey: 'status',
    header: 'وضعیت',
    cell: ({ row }) => <StatusBadge status={row.getValue('status')} />,
    size: 120,
  },
  {
    accessorKey: 'location',
    header: 'موقعیت',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
        <span className="text-gray-600">{row.getValue('location')}</span>
      </div>
    ),
    size: 200,
  },
  {
    accessorKey: 'joinDate',
    header: 'تاریخ عضویت',
    cell: ({ row }) => (
      <span className="text-gray-600">{formatDate(row.getValue('joinDate'))}</span>
    ),
    size: 150,
  },
  {
    accessorKey: 'salary',
    header: 'حقوق',
    cell: ({ row }) => (
      <span className="font-medium text-gray-900">{formatCurrency(row.getValue('salary'))}</span>
    ),
    size: 150,
  },
];

// Action handlers
const handleEdit = (user: User) => {
  console.log('Edit user:', user);
  alert(`ویرایش کاربر: ${user.name}`);
};

const handleDelete = (user: User) => {
  console.log('Delete user:', user);
  if (confirm(`آیا مطمئن هستید که می‌خواهید کاربر ${user.name} را حذف کنید؟`)) {
    alert(`کاربر ${user.name} حذف شد`);
  }
};

const handleView = (user: User) => {
  console.log('View user:', user);
  alert(`مشاهده جزئیات کاربر: ${user.name}`);
};

const handleDownload = (user: User) => {
  console.log('Download user data:', user);
  alert(`دانلود اطلاعات کاربر: ${user.name}`);
};

// Action definitions
const actions: Action<User>[] = [
  {
    label: 'مشاهده',
    icon: <FaEye className="w-4 h-4" />,
    onClick: handleView,
  },
  {
    label: 'ویرایش',
    icon: <FaEdit className="w-4 h-4" />,
    onClick: handleEdit,
  },
  {
    label: 'دانلود',
    icon: <FaDownload className="w-4 h-4" />,
    onClick: handleDownload,
  },
  {
    label: 'حذف',
    icon: <FaTrash className="w-4 h-4" />,
    onClick: handleDelete,
  },
];

// Main example component
export const DataTableExample: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [density, setDensity] = useState<'compact' | 'normal' | 'comfortable'>('normal');

  const handleRowSelectionChange = (selectedRows: User[]) => {
    setSelectedUsers(selectedRows);
    console.log('Selected users:', selectedRows);
  };

  const handleSelectSingleRow = (selectedRow: User) => {
    console.log('Single row selected:', selectedRow);
    alert(`کاربر انتخاب شده: ${selectedRow.name}`);
  };

  const handleDensityChange = (newDensity: 'compact' | 'normal' | 'comfortable') => {
    setDensity(newDensity);
    console.log('Density changed to:', newDensity);
  };

  const getRowClassName = (row: User, index: number) => {
    if (row.status === 'inactive') {
      return 'bg-red-50 hover:bg-red-100';
    }
    if (row.status === 'pending') {
      return 'bg-yellow-50 hover:bg-yellow-100';
    }
    return '';
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            مثال جدول داده‌ها
          </h1>
          <p className="text-gray-600">
            نمونه کاملی از استفاده از کامپوننت DataTable با تمام قابلیت‌ها
          </p>
        </div>

        {/* Basic DataTable */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            جدول پایه
          </h2>
          <DataTable
            dataSource={sampleUsers}
            columns={columns}
            pageSizeOptions={[5, 10, 20, 50]}
            initialPageSize={10}
            actions={actions}
            enableColumnVisibility={true}
            enableColumnFiltering={true}
            enableGlobalFilter={true}
            globalFilterPlaceholder="جستجو در تمام ستون‌ها..."
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

        {/* DataTable with Row Selection */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            جدول با انتخاب چندتایی
          </h2>
          <DataTable
            dataSource={sampleUsers}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            initialPageSize={5}
            actions={actions}
            enableColumnVisibility={true}
            enableColumnFiltering={true}
            enableGlobalFilter={true}
            globalFilterPlaceholder="جستجو..."
            enablePagination={true}
            onRowSelectionChange={handleRowSelectionChange}
            selectedRowClassName="bg-blue-100 border-l-4 border-blue-500"
            getRowClassName={getRowClassName}
            enableDensityToggle={true}
            initialDensity={density}
            onDensityChange={handleDensityChange}
          />
          
          {selectedUsers.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">
                کاربران انتخاب شده ({selectedUsers.length}):
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedUsers.map((user) => (
                  <span
                    key={user.id}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {user.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* DataTable with Single Row Selection */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            جدول با انتخاب تک‌تایی
          </h2>
          <DataTable
            dataSource={sampleUsers}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            initialPageSize={5}
            actions={actions}
            enableColumnVisibility={true}
            enableColumnFiltering={true}
            enableGlobalFilter={true}
            globalFilterPlaceholder="جستجو..."
            enablePagination={true}
            onSelectSingleRow={handleSelectSingleRow}
            selectedRowClassName="bg-green-100 border-l-4 border-green-500"
            enableDensityToggle={true}
            initialDensity={density}
            onDensityChange={handleDensityChange}
          />
        </div>

        {/* DataTable with Horizontal Actions */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            جدول با عملیات افقی
          </h2>
          <DataTable
            dataSource={sampleUsers}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            initialPageSize={5}
            actions={actions}
            actionsHorizontal={true}
            enableColumnVisibility={true}
            enableColumnFiltering={true}
            enableGlobalFilter={true}
            globalFilterPlaceholder="جستجو..."
            enablePagination={true}
            enableDensityToggle={true}
            initialDensity={density}
            onDensityChange={handleDensityChange}
          />
        </div>

        {/* API DataTable Example with DummyJSON */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            جدول با داده‌های API (DummyJSON)
          </h2>
          <DataTable
            dataSource="https://dummyjson.com/products"
            columns={[
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
                  <div className="font-medium text-gray-900">{row.getValue('title')}</div>
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
                size: 150,
              },
              {
                accessorKey: 'price',
                header: 'قیمت',
                cell: ({ row }) => (
                  <span className="font-medium text-gray-900">
                    ${row.getValue('price')}
                  </span>
                ),
                size: 120,
              },
              {
                accessorKey: 'rating',
                header: 'امتیاز',
                cell: ({ row }) => {
                  const rating = row.getValue('rating') as number;
                  return (
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm font-medium">{rating.toFixed(1)}</span>
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
                    <span className={`font-medium ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock} عدد
                    </span>
                  );
                },
                size: 100,
              },
              {
                accessorKey: 'brand',
                header: 'برند',
                cell: ({ row }) => (
                  <span className="text-gray-600">{row.getValue('brand')}</span>
                ),
                size: 120,
              },
            ]}
            pageSizeOptions={[10, 20, 30, 50]}
            initialPageSize={10}
            actions={[
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
                label: 'دانلود',
                icon: <FaDownload className="w-4 h-4" />,
                onClick: (product) => alert(`دانلود اطلاعات: ${product.title}`),
              },
            ]}
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

        {/* Features Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            قابلیت‌های موجود
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">صفحه‌بندی</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• صفحه‌بندی قابل تنظیم</li>
                <li>• انتخاب تعداد آیتم در صفحه</li>
                <li>• ناوبری بین صفحات</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">جستجو و فیلتر</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• جستجوی سراسری</li>
                <li>• فیلتر ستون‌ها</li>
                <li>• فیلتر پیشرفته</li>
                <li>• جستجو با تاخیر</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">انتخاب ردیف</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• انتخاب چندتایی</li>
                <li>• انتخاب تک‌تایی</li>
                <li>• انتخاب تمام ردیف‌ها</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">ستون‌ها</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• نمایش/مخفی کردن ستون‌ها</li>
                <li>• سنجاق کردن ستون‌ها</li>
                <li>• تغییر اندازه ستون‌ها</li>
                <li>• مرتب‌سازی</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">عملیات</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• منوی عملیات عمودی</li>
                <li>• منوی عملیات افقی</li>
                <li>• عملیات سفارشی</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">ظاهر</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• تغییر تراکم نمایش</li>
                <li>• کلاس‌های سفارشی ردیف</li>
                <li>• حالت خالی سفارشی</li>
                <li>• پشتیبانی از RTL</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTableExample;
