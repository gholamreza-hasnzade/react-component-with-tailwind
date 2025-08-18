import { ActionsDropdown } from "./actionsDropdown";
import { FaEdit, FaTrash, FaCog, FaDownload, FaQuestion, FaPlus } from "react-icons/fa";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

// Define proper types for our stories
interface SampleRow {
  id: number;
  name: string;
  type: string;
}

const meta: Meta<typeof ActionsDropdown> = {
  title: "Atoms/ActionsDropdown",
  component: ActionsDropdown,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof ActionsDropdown>;

export const Default: Story = {
  render: () => {
    const actions = [
      {
        label: "Edit",
        onClick: () => alert("Edit clicked"),
        icon: <FaEdit />,
      },
      {
        label: "Delete",
        onClick: () => alert("Delete clicked"),
        icon: <FaTrash />,
      },
    ];
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
        <ActionsDropdown actions={actions} row={{}} />
      </div>
    );
  },
};

export const WithSeparators: Story = {
  render: () => {
    const actions = [
      {
        label: "Add New",
        onClick: () => alert("Add new clicked"),
        icon: <FaPlus />,
      },
      {
        label: "Settings",
        onClick: () => alert("Settings clicked"),
        icon: <FaCog />,
      },
      { separator: true as const },
      {
        label: "Help",
        onClick: () => alert("Help clicked"),
        icon: <FaQuestion />,
      },
      {
        label: "Export",
        onClick: () => alert("Export clicked"),
        icon: <FaDownload />,
      },
      { separator: true as const },
      {
        label: "Delete All",
        onClick: () => alert("Delete all clicked"),
        danger: true,
        icon: <FaTrash />,
      },
    ];
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
        <ActionsDropdown actions={actions} row={{}} />
      </div>
    );
  },
};

export const WithLoadingStates: Story = {
  render: () => {
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

    const actions = [
      {
        label: "Save Changes",
        onClick: async () => {
          setLoadingStates(prev => ({ ...prev, save: true }));
          await new Promise(resolve => setTimeout(resolve, 2000));
          alert("Changes saved!");
          setLoadingStates(prev => ({ ...prev, save: false }));
        },
        loading: loadingStates.save,
        icon: <FaEdit />,
      },
      { separator: true as const },
      {
        label: "Process Data",
        onClick: async () => {
          setLoadingStates(prev => ({ ...prev, process: true }));
          await new Promise(resolve => setTimeout(resolve, 3000));
          alert("Data processed!");
          setLoadingStates(prev => ({ ...prev, process: false }));
        },
        loading: loadingStates.process,
        icon: <FaCog />,
      },
    ];

    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
        <ActionsDropdown actions={actions} row={{}} />
      </div>
    );
  },
};

export const WithCustomTrigger: Story = {
  render: () => {
    const actions = [
      {
        label: "Option 1",
        onClick: () => alert("Option 1 clicked"),
      },
      {
        label: "Option 2",
        onClick: () => alert("Option 2 clicked"),
      },
      {
        label: "Option 3",
        onClick: () => alert("Option 3 clicked"),
      },
    ];

    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
        <ActionsDropdown 
          actions={actions} 
          trigger={
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              More Options
            </button>
          }
        />
      </div>
    );
  },
};

export const WithRowData: Story = {
  render: () => {
    const actions = [
      {
        label: "View Details",
        onClick: (row?: SampleRow) => alert(`Viewing details for: ${row?.name || 'unknown'}`),
        icon: <FaEdit />,
      },
      {
        label: "Edit Item",
        onClick: (row?: SampleRow) => alert(`Editing item: ${row?.name || 'unknown'}`),
        icon: <FaEdit />,
      },
      { separator: true as const },
      {
        label: "Delete Item",
        onClick: (row?: SampleRow) => alert(`Deleting item: ${row?.name || 'unknown'}`),
        danger: true,
        icon: <FaTrash />,
      },
    ];

    const sampleRow: SampleRow = { id: 1, name: "Sample Item", type: "demo" };

    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{sampleRow.name}</span>
          <ActionsDropdown actions={actions} row={sampleRow} />
        </div>
      </div>
    );
  },
};

export const DisabledActions: Story = {
  render: () => {
    const actions = [
      {
        label: "Enabled Action",
        onClick: () => alert("This action is enabled"),
        icon: <FaEdit />,
      },
      {
        label: "Disabled Action",
        onClick: () => alert("This won't show"),
        disabled: true,
        icon: <FaCog />,
      },
      {
        label: "Another Enabled",
        onClick: () => alert("This action is also enabled"),
        icon: <FaDownload />,
      },
    ];

    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
        <ActionsDropdown actions={actions} row={{}} />
      </div>
    );
  },
};

export const AllFeatures: Story = {
  render: () => {
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

    const actions = [
      {
        label: "Create New",
        onClick: () => alert("Create new clicked"),
        icon: <FaPlus />,
      },
      {
        label: "Edit Item",
        onClick: () => alert("Edit clicked"),
        icon: <FaEdit />,
      },
      { separator: true as const },
      {
        label: "Save Changes",
        onClick: async () => {
          setLoadingStates(prev => ({ ...prev, save: true }));
          await new Promise(resolve => setTimeout(resolve, 2000));
          alert("Changes saved!");
          setLoadingStates(prev => ({ ...prev, save: false }));
        },
        loading: loadingStates.save,
        icon: <FaEdit />,
      },
      {
        label: "Settings",
        onClick: () => alert("Settings clicked"),
        icon: <FaCog />,
      },
      { separator: true as const },
      {
        label: "Export Data",
        onClick: () => alert("Export clicked"),
        icon: <FaDownload />,
      },
      {
        label: "Help & Support",
        onClick: () => alert("Help clicked"),
        icon: <FaQuestion />,
      },
      { separator: true as const },
      {
        label: "Delete Item",
        onClick: () => alert("Delete clicked"),
        danger: true,
        icon: <FaTrash />,
      },
    ];

    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
        <ActionsDropdown actions={actions} row={{}} />
      </div>
    );
  },
}; 