import { useState } from 'react';
import { DataTable } from './dataTable';
import { Button } from '@/components/atoms/button/button';
import { createColumnHelper, type ColumnDef, type CellContext } from '@tanstack/react-table';
import { EditIcon, TrashIcon, EyeIcon, MoreHorizontalIcon } from 'lucide-react';

// Sample data type
interface Person {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  status: 'active' | 'inactive';
  role: string;
  department: string;
  salary: number;
  joinDate: string;
  subRows?: Person[];
}

// Sample data with sub-rows for expansion
const sampleData: Person[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    email: 'john.doe@example.com',
    status: 'active',
    role: 'Developer',
    department: 'Engineering',
    salary: 75000,
    joinDate: '2022-01-15',
    subRows: [
      {
        id: '1-1',
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        email: 'john.doe@example.com',
        status: 'active',
        role: 'Senior Developer',
        department: 'Engineering',
        salary: 85000,
        joinDate: '2022-01-15',
        subRows: [],
      }
    ],
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    age: 28,
    email: 'jane.smith@example.com',
    status: 'active',
    role: 'Designer',
    department: 'Design',
    salary: 65000,
    joinDate: '2022-03-20',
    subRows: [
      {
        id: '2-1',
        firstName: 'Jane',
        lastName: 'Smith',
        age: 28,
        email: 'jane.smith@example.com',
        status: 'active',
        role: 'Lead Designer',
        department: 'Design',
        salary: 75000,
        joinDate: '2022-03-20',
        subRows: [],
      }
    ],
  },
  {
    id: '3',
    firstName: 'Bob',
    lastName: 'Johnson',
    age: 35,
    email: 'bob.johnson@example.com',
    status: 'inactive',
    role: 'Manager',
    department: 'Engineering',
    salary: 90000,
    joinDate: '2021-11-10',
    subRows: [],
  },
  {
    id: '4',
    firstName: 'Alice',
    lastName: 'Brown',
    age: 32,
    email: 'alice.brown@example.com',
    status: 'active',
    role: 'Analyst',
    department: 'Finance',
    salary: 70000,
    joinDate: '2022-05-08',
    subRows: [
      {
        id: '4-1',
        firstName: 'Alice',
        lastName: 'Brown',
        age: 32,
        email: 'alice.brown@example.com',
        status: 'active',
        role: 'Senior Analyst',
        department: 'Finance',
        salary: 80000,
        joinDate: '2022-05-08',
        subRows: [],
      }
    ],
  },
  {
    id: '5',
    firstName: 'Charlie',
    lastName: 'Wilson',
    age: 29,
    email: 'charlie.wilson@example.com',
    status: 'active',
    role: 'Developer',
    department: 'Engineering',
    salary: 80000,
    joinDate: '2022-02-14',
    subRows: [],
  },
];

// Column definitions
const columnHelper = createColumnHelper<Person>();

const columns: ColumnDef<Person, any>[] = [
  {
    id: 'expander',
    header: () => null,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.getCanExpand() ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              row.toggleExpanded();
            }}
            className="p-1 hover:bg-gray-200 rounded"
          >
            {row.getIsExpanded() ? '▼' : '▶'}
          </button>
        ) : null}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  columnHelper.accessor('firstName', {
    header: 'First Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          info.getValue() === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('role', {
    header: 'Role',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('department', {
    header: 'Department',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('salary', {
    header: 'Salary',
    cell: (info) => `$${info.getValue().toLocaleString()}`,
  }),
  columnHelper.accessor('joinDate', {
    header: 'Join Date',
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
];

export function DataTableExample() {
  const [data, setData] = useState<Person[]>(sampleData);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setData([...sampleData]);
      setLoading(false);
    }, 1000);
  };

  const handleRowClick = (row: { original: Person }) => {
    console.log('Row clicked:', row.original);
  };

  const handleRowSelect = (selectedRows: { original: Person }[]) => {
    console.log('Selected rows:', selectedRows);
  };

  // Dynamic actions for each row
  const actions = [
    {
      label: 'View',
      icon: <EyeIcon className="w-3 h-3" />,
      onClick: (row: { original: Person }) => {
        console.log('View:', row.original);
        alert(`Viewing ${row.original.firstName} ${row.original.lastName}`);
      },
      variant: 'outline' as const,
    },
    {
      label: 'Edit',
      icon: <EditIcon className="w-3 h-3" />,
      onClick: (row: { original: Person }) => {
        console.log('Edit:', row.original);
        alert(`Editing ${row.original.firstName} ${row.original.lastName}`);
      },
      variant: 'default' as const,
    },
    {
      label: 'Delete',
      icon: <TrashIcon className="w-3 h-3" />,
      onClick: (row: { original: Person }) => {
        console.log('Delete:', row.original);
        if (confirm(`Are you sure you want to delete ${row.original.firstName} ${row.original.lastName}?`)) {
          setData(data.filter(person => person.id !== row.original.id));
        }
      },
      variant: 'destructive' as const,
      disabled: (row: { original: Person }) => row.original.status === 'inactive',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">DataTable Example</h1>
        <p className="text-gray-600">
          A comprehensive data table with all TanStack Table v8 features
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={handleRefresh} loading={loading}>
            Refresh Data
          </Button>
          <Button
            variant="outlined"
            onClick={() => setData([...data, ...sampleData])}
          >
            Add More Data
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={data}
          loading={loading}
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
          enableGrouping={true}
          enableExpanding={true}
          enableFaceting={true}
          enableRowPinning={true}
          enableMultiSort={true}
          enableGlobalFiltering={true}
          enableFuzzyFiltering={true}
          enableColumnFaceting={true}
          enableGlobalFaceting={true}
          showPagination={true}
          showColumnVisibility={true}
          showGlobalFilter={true}
          showRowCount={true}
          showSelectedCount={true}
          showExportButtons={true}
          showRefreshButton={true}
          showSettingsButton={true}
          variant="hover"
          size="md"
          density="normal"
          pageSize={5}
          pageSizeOptions={[5, 10, 20, 50]}
          actions={actions}
          showActions={true}
          actionsLabel="Actions"
        />
      </div>
    </div>
  );
}
