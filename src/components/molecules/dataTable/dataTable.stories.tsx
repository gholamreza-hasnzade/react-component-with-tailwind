
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { DataTable } from "./dataTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockData = [
  { id: 1, name: "Alice", age: 25, status: "Active" },
  { id: 2, name: "Bob", age: 30, status: "Inactive" },
  { id: 3, name: "Charlie", age: 28, status: "Active" },
  { id: 4, name: "Diana", age: 22, status: "Pending" },
  { id: 5, name: "Eve", age: 35, status: "Active" },
];

const columns = [
  {
    accessorKey: "id",
    header: "ID",
    size: 60,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

const queryClient = new QueryClient();

export const decorators = [
  (Story: React.ComponentType) => (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  ),
];

const meta: Meta<typeof DataTable> = {
  title: "Molecules/DataTable",
  component: DataTable,
  decorators,
};
export default meta;

type Story = StoryObj<typeof DataTable>;

export const Basic: Story = {
  render: () => (
    <DataTable dataSource={mockData} columns={columns} />
  ),
};

export const Pagination: Story = {
  render: () => (
    <DataTable dataSource={mockData} columns={columns} enablePagination initialPageSize={2} />
  ),
};

export const Filtering: Story = {
  render: () => (
    <DataTable dataSource={mockData} columns={columns} enableGlobalFilter globalFilterPlaceholder="Search..." />
  ),
};

export const RowSelection: Story = {
  render: () => {
    type RowType = { id: number; name: string; age: number; status: string };
    const [selectedRows, setSelectedRows] = React.useState<RowType[]>([]);
    return (
      <>
        <DataTable
          dataSource={mockData}
          columns={columns}
          onRowSelectionChange={setSelectedRows}
        />
        <pre>{JSON.stringify(selectedRows, null, 2)}</pre>
      </>
    );
  },
};

export const Actions: Story = {
  render: () => {
    type RowType = { id: number; name: string; age: number; status: string };
    const actions = [
      { label: "Edit", onClick: (row: RowType) => alert(`Edit ${row.name}`) },
      { label: "Delete", onClick: (row: RowType) => alert(`Delete ${row.name}`) },
    ];
    return (
      <DataTable dataSource={mockData} columns={columns} actions={actions} />
    );
  },
};

export const EmptyState: Story = {
  render: () => (
    <DataTable dataSource={[]} columns={columns} emptyStateTitle="No data" emptyStateDescription="No records found." />
  ),
};

export const LoadingState: Story = {
  render: () => (
    <DataTable dataSource={[]} columns={columns} />
  ),
  parameters: {
    msw: [
      // You can use MSW (Mock Service Worker) to simulate loading if needed
    ],
  },
}; 