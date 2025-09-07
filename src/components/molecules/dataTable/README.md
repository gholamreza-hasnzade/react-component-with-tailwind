# DataTable Component

A comprehensive and feature-rich data table component built with React and TanStack Table, designed for Persian/RTL applications.

## Features

- 📊 **Full-featured data table** with sorting, filtering, and pagination
- 🔍 **Advanced search** with global and column-specific filtering
- 📱 **Responsive design** that works on all screen sizes
- 🎨 **Customizable styling** with Tailwind CSS
- 🌐 **RTL support** for Persian/Arabic languages
- ⚡ **Performance optimized** with virtual scrolling and efficient rendering
- 🔧 **Highly configurable** with extensive props and customization options
- 📋 **Row selection** (single and multiple)
- 📌 **Column pinning** for important columns
- 🎛️ **Density control** (compact, normal, comfortable)
- 🔄 **API integration** with built-in data fetching
- 🎯 **Action menus** for row operations

## Basic Usage

```tsx
import { DataTable } from '@/components/molecules/dataTable';
import { ColumnDef } from '@tanstack/react-table';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'نام',
  },
  {
    accessorKey: 'email',
    header: 'ایمیل',
  },
  {
    accessorKey: 'status',
    header: 'وضعیت',
    cell: ({ row }) => (
      <span className={row.getValue('status') === 'active' ? 'text-green-600' : 'text-red-600'}>
        {row.getValue('status') === 'active' ? 'فعال' : 'غیرفعال'}
      </span>
    ),
  },
];

const data: User[] = [
  { id: 1, name: 'احمد محمدی', email: 'ahmad@example.com', status: 'active' },
  { id: 2, name: 'فاطمه احمدی', email: 'fateme@example.com', status: 'inactive' },
];

function MyComponent() {
  return (
    <DataTable
      dataSource={data}
      columns={columns}
      enablePagination={true}
      enableGlobalFilter={true}
      globalFilterPlaceholder="جستجو..."
    />
  );
}
```

## Props

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `dataSource` | `string \| T[]` | Data source - either an array of objects or API endpoint URL |
| `columns` | `ColumnDef<T>[]` | Column definitions for the table |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pageSizeOptions` | `number[]` | `[10, 20, 30, 50]` | Available page size options |
| `initialPageSize` | `number` | `10` | Initial page size |
| `actions` | `Action<T>[]` | `undefined` | Row action buttons |
| `actionsHorizontal` | `boolean` | `false` | Display actions horizontally |
| `enableColumnVisibility` | `boolean` | `true` | Enable column visibility toggle |
| `enableColumnFiltering` | `boolean` | `true` | Enable column-specific filtering |
| `enableGlobalFilter` | `boolean` | `true` | Enable global search |
| `globalFilterPlaceholder` | `string` | `"Search all columns..."` | Placeholder for global search |
| `searchEndpoint` | `string` | `undefined` | Custom search endpoint for API data |
| `debounceMs` | `number` | `300` | Debounce delay for search |
| `enablePagination` | `boolean` | `true` | Enable pagination |
| `enableDensityToggle` | `boolean` | `false` | Enable density control |
| `initialDensity` | `'compact' \| 'normal' \| 'comfortable'` | `'normal'` | Initial density setting |
| `enableColumnPinning` | `boolean` | `false` | Enable column pinning |
| `enableAdvancedFiltering` | `boolean` | `true` | Enable advanced filtering |
| `onRowSelectionChange` | `(selectedRows: T[]) => void` | `undefined` | Callback for row selection changes |
| `onSelectSingleRow` | `(selectedRow: T) => void` | `undefined` | Callback for single row selection |
| `selectedRowClassName` | `string` | `undefined` | Custom CSS class for selected rows |
| `getRowClassName` | `(row: T, index: number) => string` | `undefined` | Function to get custom row classes |
| `emptyStateTitle` | `string` | `"No items found"` | Title for empty state |
| `emptyStateDescription` | `string` | `"Try adjusting your search..."` | Description for empty state |

## Examples

### 1. Basic Table

```tsx
<DataTable
  dataSource={users}
  columns={userColumns}
  enablePagination={true}
  enableGlobalFilter={true}
  globalFilterPlaceholder="جستجو در کاربران..."
/>
```

### 2. Table with Actions

```tsx
const actions: Action<User>[] = [
  {
    label: 'مشاهده',
    icon: <FaEye className="w-4 h-4" />,
    onClick: (user) => console.log('View user:', user),
  },
  {
    label: 'ویرایش',
    icon: <FaEdit className="w-4 h-4" />,
    onClick: (user) => console.log('Edit user:', user),
  },
];

<DataTable
  dataSource={users}
  columns={userColumns}
  actions={actions}
  actionsHorizontal={true}
/>
```

### 3. Table with Row Selection

```tsx
const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

<DataTable
  dataSource={users}
  columns={userColumns}
  onRowSelectionChange={setSelectedUsers}
  selectedRowClassName="bg-blue-100 border-l-4 border-blue-500"
/>
```

### 4. Table with API Data

```tsx
<DataTable
  dataSource="https://api.example.com/users"
  columns={userColumns}
  searchEndpoint="https://api.example.com/users/search"
  enablePagination={true}
  enableGlobalFilter={true}
/>
```

### 5. Table with Column Pinning

```tsx
<DataTable
  dataSource={users}
  columns={userColumns}
  enableColumnPinning={true}
  initialColumnPinning={{
    name: 'left',
    actions: 'right'
  }}
/>
```

### 6. Table with Custom Density

```tsx
<DataTable
  dataSource={users}
  columns={userColumns}
  enableDensityToggle={true}
  initialDensity="compact"
  onDensityChange={(density) => console.log('Density changed:', density)}
/>
```

## Column Definition

Columns are defined using TanStack Table's `ColumnDef` type:

```tsx
const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'نام',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <FaUser className="w-4 h-4" />
        <span>{row.getValue('name')}</span>
      </div>
    ),
    size: 200, // Column width
    enableSorting: true,
    enableResizing: true,
  },
  {
    accessorKey: 'status',
    header: 'وضعیت',
    cell: ({ row }) => {
      const status = row.getValue('status');
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status === 'active' ? 'فعال' : 'غیرفعال'}
        </span>
      );
    },
  },
];
```

## Action Definition

Actions are defined using the `Action<T>` interface:

```tsx
interface Action<T> {
  label: string;
  onClick: (row: T) => void;
  icon?: React.ReactNode;
}

const actions: Action<User>[] = [
  {
    label: 'مشاهده',
    icon: <FaEye className="w-4 h-4" />,
    onClick: (user) => handleView(user),
  },
  {
    label: 'ویرایش',
    icon: <FaEdit className="w-4 h-4" />,
    onClick: (user) => handleEdit(user),
  },
];
```

## API Integration

The component supports both client-side data and API data:

### Client-side Data
```tsx
<DataTable
  dataSource={localData}
  columns={columns}
/>
```

### API Data
```tsx
<DataTable
  dataSource="https://api.example.com/users"
  columns={columns}
  searchEndpoint="https://api.example.com/users/search"
/>
```

The API should return data in this format:
```json
{
  "data": [...], // or "products": [...]
  "total": 100
}
```

## Styling

The component uses Tailwind CSS classes and supports RTL layout. You can customize the appearance using:

- `selectedRowClassName` for selected row styling
- `getRowClassName` for custom row styling
- Custom CSS classes in column cell renderers

## RTL Support

The component is fully RTL-compatible and includes:
- Right-to-left text alignment
- Proper icon positioning
- RTL-friendly pagination controls
- Persian/Arabic number formatting

## Performance

- Virtual scrolling for large datasets
- Efficient re-rendering with React.memo
- Debounced search input
- Optimized column resizing

## Dependencies

- React 18+
- TanStack Table v8
- Tailwind CSS
- React Icons (for examples)
- Axios (for API calls)

## Examples

See the example files for complete usage examples:
- `example/dataTable.example.tsx` - Comprehensive example with all features
- `example/simple.example.tsx` - Simple usage example
- `example/api.example.tsx` - API integration examples with DummyJSON and JSONPlaceholder
- `example/demo.tsx` - Interactive demo with tabbed interface
