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

export const PositionTop: Story = {
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
        <div className="flex flex-col items-center gap-8">
          <ActionsDropdown actions={actions} row={{}} position="top" />
          <span className="text-sm text-gray-500">Dropdown appears above</span>
        </div>
      </div>
    );
  },
};

export const PositionBottomCenter: Story = {
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
        <div className="flex flex-col items-center gap-8">
          <span className="text-sm text-gray-500">Dropdown appears below (centered)</span>
          <ActionsDropdown actions={actions} row={{}} position="bottom-center" />
        </div>
      </div>
    );
  },
};

export const PositionLeft: Story = {
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
        <div className="flex items-center gap-8">
          <ActionsDropdown actions={actions} row={{}} position="left" />
          <span className="text-sm text-gray-500">Dropdown appears to the left</span>
        </div>
      </div>
    );
  },
};

export const PositionRight: Story = {
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
        <div className="flex items-center gap-8">
          <span className="text-sm text-gray-500">Dropdown appears to the right</span>
          <ActionsDropdown actions={actions} row={{}} position="right" />
        </div>
      </div>
    );
  },
};

export const PositionTopLeft: Story = {
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
        <div className="flex flex-col items-center gap-8">
          <ActionsDropdown actions={actions} row={{}} position="top-left" />
          <span className="text-sm text-gray-500">Dropdown appears above, aligned left</span>
        </div>
      </div>
    );
  },
};

export const PositionTopRight: Story = {
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
        <div className="flex flex-col items-center gap-8">
          <ActionsDropdown actions={actions} row={{}} position="top-right" />
          <span className="text-sm text-gray-500">Dropdown appears above, aligned right</span>
        </div>
      </div>
    );
  },
};

export const PositionBottomLeft: Story = {
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
        <div className="flex flex-col items-center gap-8">
          <span className="text-sm text-gray-500">Dropdown appears below, aligned left</span>
          <ActionsDropdown actions={actions} row={{}} position="bottom-left" />
        </div>
      </div>
    );
  },
};

export const PositionBottomRight: Story = {
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
        <div className="flex flex-col items-center gap-8">
          <span className="text-sm text-gray-500">Dropdown appears below, aligned right</span>
          <ActionsDropdown actions={actions} row={{}} position="bottom-right" />
        </div>
      </div>
    );
  },
};

export const PositionComparison: Story = {
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
        <div className="grid grid-cols-3 gap-8 items-center">
          {/* Top row */}
          <div className="flex flex-col items-center gap-4">
            <ActionsDropdown actions={actions} row={{}} position="top-left" />
            <span className="text-xs text-gray-500">top-left</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <ActionsDropdown actions={actions} row={{}} position="top-center" />
            <span className="text-xs text-gray-500">top-center</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <ActionsDropdown actions={actions} row={{}} position="top-right" />
            <span className="text-xs text-gray-500">top-right</span>
          </div>
          
          {/* Middle row - triggers */}
          <div className="flex flex-col items-center gap-4">
            <ActionsDropdown actions={actions} row={{}} position="left" />
            <span className="text-xs text-gray-500">left</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs text-gray-500">center</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <ActionsDropdown actions={actions} row={{}} position="right" />
            <span className="text-xs text-gray-500">right</span>
          </div>
          
          {/* Bottom row */}
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs text-gray-500">bottom-left</span>
            <ActionsDropdown actions={actions} row={{}} position="bottom-left" />
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs text-gray-500">bottom-center</span>
            <ActionsDropdown actions={actions} row={{}} position="bottom-center" />
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs text-gray-500">bottom-right</span>
            <ActionsDropdown actions={actions} row={{}} position="bottom-right" />
          </div>
        </div>
      </div>
    );
  },
}; 