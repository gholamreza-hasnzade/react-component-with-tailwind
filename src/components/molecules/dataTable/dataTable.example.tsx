import { useState, useCallback } from 'react';
import { DataTable } from './dataTable';
import { Button } from '@/components/atoms/button/button';
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import { EditIcon, TrashIcon, EyeIcon, SearchIcon } from 'lucide-react';

// Sample data type
interface Person {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  role: string;
  department: string;
  salary: number;
  joinDate: string;
  isRead: boolean;
  isLiked: boolean;
  priority: 'high' | 'medium' | 'low';
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
    isRead: true,
    isLiked: true,
    priority: 'high',
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
        isRead: true,
        isLiked: true,
        priority: 'high',
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
    status: 'inactive',
    role: 'Designer',
    department: 'Design',
    salary: 65000,
    joinDate: '2022-03-20',
    isRead: false,
    isLiked: false,
    priority: 'medium',
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
        isRead: false,
        isLiked: false,
        priority: 'medium',
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
    isRead: false,
    isLiked: false,
    priority: 'high',
    subRows: [],
  },
  {
    id: '4',
    firstName: 'Alice',
    lastName: 'Brown',
    age: 32,
    email: 'alice.brown@example.com',
    status: 'pending',
    role: 'Analyst',
    department: 'Finance',
    salary: 70000,
    isRead: true,
    isLiked: true,
    priority: 'low',
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
        isRead: true,
        isLiked: true,
        priority: 'low',
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
    status: 'pending',
    role: 'Developer',
    department: 'Engineering',
    salary: 80000,
    joinDate: '2022-02-14',
    isRead: true,
    isLiked: true,
    priority: 'high',
    subRows: [],
  },
  {
    id: '6',
    firstName: 'David',
    lastName: 'Lee',
    age: 31,
    email: 'david.lee@example.com',
    status: 'active',
    role: 'Senior Developer',
    department: 'Engineering',
    salary: 95000,
    joinDate: '2021-08-15',
    isRead: false,
    isLiked: false,
    priority: 'medium',
    subRows: [],
  },
  {
    id: '7',
    firstName: 'Emma',
    lastName: 'Davis',
    age: 27,
    email: 'emma.davis@example.com',
    status: 'active',
    role: 'UX Designer',
    department: 'Design',
    salary: 70000,
    joinDate: '2022-06-10',
    isRead: true,
    isLiked: true,
    priority: 'low',
    subRows: [],
  },
  {
    id: '8',
    firstName: 'Frank',
    lastName: 'Miller',
    age: 33,
    email: 'frank.miller@example.com',
    status: 'inactive',
    role: 'Product Manager',
    department: 'Product',
    salary: 110000,
    joinDate: '2021-03-22',
    isRead: false,
    isLiked: false,
    priority: 'high',
    subRows: [],
  },
  {
    id: '9',
    firstName: 'Grace',
    lastName: 'Taylor',
    age: 26,
    email: 'grace.taylor@example.com',
    status: 'pending',
    role: 'Marketing Specialist',
    department: 'Marketing',
    salary: 60000,
    joinDate: '2022-09-05',
    isRead: true,
    isLiked: false,
    priority: 'medium',
    subRows: [],
  },
  {
    id: '10',
    firstName: 'Henry',
    lastName: 'Anderson',
    age: 35,
    email: 'henry.anderson@example.com',
    status: 'active',
    role: 'DevOps Engineer',
    department: 'Engineering',
    salary: 105000,
    joinDate: '2020-11-18',
    isRead: true,
    isLiked: true,
    priority: 'high',
    subRows: [],
  },
];

// Column definitions
const columnHelper = createColumnHelper<Person>();

const columns: ColumnDef<Person, any>[] = [
  
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
  columnHelper.accessor('isRead', {
    header: 'Read',
    cell: (info) => (
      <span className={`px-2 py-1 rounded text-xs font-medium ${
        info.getValue() ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {info.getValue() ? 'Yes' : 'No'}
      </span>
    ),
  }),
  columnHelper.accessor('isLiked', {
    header: 'Liked',
    cell: (info) => (
      <span className={`px-2 py-1 rounded text-xs font-medium ${
        info.getValue() ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {info.getValue() ? '❤️' : '🤍'}
      </span>
    ),
  }),
  columnHelper.accessor('priority', {
    header: 'Priority',
    cell: (info) => {
      const priority = info.getValue() as 'high' | 'medium' | 'low';
      const colors = {
        high: 'bg-red-100 text-red-800',
        medium: 'bg-yellow-100 text-yellow-800',
        low: 'bg-green-100 text-green-800',
      };
      return (
        <span className={`px-2 py-1 rounded text-xs font-medium ${colors[priority]}`}>
          {priority}
        </span>
      );
    },
  }),
];

export function DataTableExample() {
  const [data, setData] = useState<Person[]>(sampleData);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Person[]>([]);

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

  const handleRowSelect = useCallback((selectedRows: { original: Person }[]) => {
    console.log('Selected rows:', selectedRows);
    setSelectedRows(selectedRows.map(row => row.original));
  }, []);

  // Custom toolbar component
  const CustomToolbar = () => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-gray-200 gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <SearchIcon className="w-4 h-4 text-gray-400" />
          <input
            placeholder="Search all columns..."
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
          />
        </div>
        {selectedRows.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-800 rounded-md">
            <span className="text-sm font-medium">
              {selectedRows.length} row{selectedRows.length !== 1 ? 's' : ''} selected
            </span>
            <button
              onClick={() => setSelectedRows([])}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Clear
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outlined" size="sm">
          Export
        </Button>
        <Button variant="outlined" size="sm">
          Import
        </Button>
        <Button onClick={handleRefresh} loading={loading} size="sm">
          Refresh
        </Button>
        <Button variant="outlined" size="sm">
          Settings
        </Button>
      </div>
    </div>
  );

  // Dynamic actions for each row
  const actions = [
    {
      label: 'View',
      icon: <EyeIcon className="w-3 h-3" />,
      onClick: (row: { original: Person }) => {
        alert(`Viewing ${row.original.firstName} ${row.original.lastName}`);
      },
      variant: 'outline' as const,
    },
    {
      label: 'Edit',
      icon: <EditIcon className="w-3 h-3" />,
      onClick: (row: { original: Person }) => {
        alert(`Editing ${row.original.firstName} ${row.original.lastName}`);
      },
      variant: 'default' as const,
    },
    {
      label: 'Delete',
      icon: <TrashIcon className="w-3 h-3" />,
      onClick: (row: { original: Person }) => {
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
          enableStickyHeader={true}
          showPagination={true}
          showColumnVisibility={true}
          showGlobalFilter={false}
          showRowCount={true}
          showSelectedCount={true}
          showExportButtons={false}
          showRefreshButton={false}
          showSettingsButton={true}
          /* renderToolbar={CustomToolbar} */
          variant="bordered"
          size="md"
          density="normal"
          pageSize={5}
          pageSizeOptions={[5, 10, 20, 50]}
          actions={actions}
          showActions={true}
          actionsLabel="Actions"
          // Row status configuration
          /* statusConfig={{
            field: 'isRead',
            colors: {
              true: {
                bg: '#f0fdf4', // green-50
                text: '#166534', // green-800
                border: '#bbf7d0', // green-200
              },
              false: {
                bg: '#fef2f2', // red-50
                text: '#991b1b', // red-800
                border: '#fecaca', // red-200
              },
            },
          }} */
          // Column status configuration
          /* columnStatusConfig={{
            isRead: {
              field: 'isRead',
              colors: {
                true: {
                  bg: '#f8fafc', // slate-50
                  text: '#475569', // slate-600
                },
                false: {
                  bg: '#dbeafe', // blue-100
                  text: '#1e40af', // blue-800
                },
              },
            },
            isLiked: {
              field: 'isLiked',
              colors: {
                true: {
                  bg: '#fef2f2', // red-50
                  text: 'red', // red-600
                },
                false: {
                  bg: '#f9fafb', // gray-50
                  text: '#6b7280', // gray-500
                },
              },
            },
            priority: {
              field: 'priority',
              colors: {
                high: {
                  bg: '#fef2f2', // red-50
                  text: '#dc2626', // red-600
                },
                medium: {
                  bg: '#fffbeb', // yellow-50
                  text: '#d97706', // yellow-600
                },
                low: {
                  bg: '#f0fdf4', // green-50
                  text: '#16a34a', // green-600
                },
              },
            },
          }} */
        />
      </div>
    </div>
  );
}
