import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FaEdit,
  FaTrash,
  FaCopy,
  FaDownload,
  FaShare,
  FaEye,
  FaBan,
  FaCheck,
  FaTimes,
  FaCog,
  FaUser,
  FaLock,
} from "react-icons/fa";
import { ActionsDropdown } from "./actionsDropdown";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

const meta: Meta<typeof ActionsDropdown<unknown>> = {
  title: "Atoms/ActionsDropdown",
  component: ActionsDropdown,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible dropdown component for displaying action menus with support for separators, loading states, and various positioning options.",
      },
    },
  },
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-left",
        "top-right",
        "top-center",
        "bottom-left",
        "bottom-right",
        "bottom-center",
        "top",
        "bottom",
        "left",
        "right",
      ],
      description: "Position of the dropdown relative to the trigger",
    },
    triggerClassName: {
      control: "text",
      description: "Custom CSS classes for the trigger element",
    },
  },
  args: {},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleUser: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "admin",
  status: "active",
};

const sampleProduct: Product = {
  id: 1,
  name: "Laptop Pro",
  price: 1299,
  category: "Electronics",
  inStock: true,
};

export const Default: Story = {
  args: {
    actions: [
      {
        label: "Edit",
        onClick: () => console.log("Action clicked"),
        icon: <FaEdit className="w-4 h-4" />,
      },
      {
        label: "Delete",
        onClick: () => console.log("Action clicked"),
        icon: <FaTrash className="w-4 h-4" />,
        danger: true,
      },
    ],
  },
};

export const WithSeparators: Story = {
  args: {
    actions: [
      {
        label: "View",
        onClick: () => console.log("Action clicked"),
        icon: <FaEye className="w-4 h-4" />,
      },
      {
        label: "Edit",
        onClick: () => console.log("Action clicked"),
        icon: <FaEdit className="w-4 h-4" />,
      },
      { separator: true },
      {
        label: "Copy",
        onClick: () => console.log("Action clicked"),
        icon: <FaCopy className="w-4 h-4" />,
      },
      {
        label: "Share",
        onClick: () => console.log("Action clicked"),
        icon: <FaShare className="w-4 h-4" />,
      },
      { separator: true },
      {
        label: "Delete",
        onClick: () => console.log("Action clicked"),
        icon: <FaTrash className="w-4 h-4" />,
        danger: true,
      },
    ],
  },
};

export const WithLoadingStates: Story = {
  args: {
    actions: [
      {
        label: "Save",
        onClick: () => console.log("Action clicked"),
        icon: <FaCheck className="w-4 h-4" />,
        loading: true,
      },
      {
        label: "Cancel",
        onClick: () => console.log("Action clicked"),
        icon: <FaTimes className="w-4 h-4" />,
        disabled: true,
      },
      {
        label: "Download",
        onClick: () => console.log("Action clicked"),
        icon: <FaDownload className="w-4 h-4" />,
      },
    ],
  },
};

export const WithDisabledActions: Story = {
  args: {
    actions: [
      {
        label: "Edit",
        onClick: () => console.log("Action clicked"),
        icon: <FaEdit className="w-4 h-4" />,
        disabled: true,
      },
      {
        label: "Delete",
        onClick: () => console.log("Action clicked"),
        icon: <FaTrash className="w-4 h-4" />,
        disabled: true,
        danger: true,
      },
      {
        label: "View",
        onClick: () => console.log("Action clicked"),
        icon: <FaEye className="w-4 h-4" />,
      },
    ],
  },
};

export const WithRowData: Story = {
  args: {
    actions: [
      {
        label: "Edit User",
        onClick: (row?: unknown) => {
          console.log("Editing user:", row);
        },
        icon: <FaEdit className="w-4 h-4" />,
      },
      {
        label: "View Profile",
        onClick: (row?: unknown) => {
          console.log("Viewing profile:", row);
        },
        icon: <FaUser className="w-4 h-4" />,
      },
      { separator: true },
      {
        label: "Deactivate",
        onClick: (row?: unknown) => {
          console.log("Deactivating user:", row);
        },
        icon: <FaBan className="w-4 h-4" />,
        danger: true,
      },
    ],
    row: sampleUser,
  },
};

export const CustomTrigger: Story = {
  args: {
    actions: [
      {
        label: "Settings",
        onClick: () => console.log("Action clicked"),
        icon: <FaCog className="w-4 h-4" />,
      },
      {
        label: "Logout",
        onClick: () => console.log("Action clicked"),
        icon: <FaLock className="w-4 h-4" />,
        danger: true,
      },
    ],
    trigger: (
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Custom Button
      </button>
    ),
  },
};

export const CustomTriggerWithIcon: Story = {
  args: {
    actions: [
      {
        label: "Edit Product",
        onClick: (row?: unknown) => {
          console.log("Editing product:", row);
        },
        icon: <FaEdit className="w-4 h-4" />,
      },
      {
        label: "View Details",
        onClick: (row?: unknown) => {
          console.log("Viewing product:", row);
        },
        icon: <FaEye className="w-4 h-4" />,
      },
      { separator: true },
      {
        label: "Delete Product",
        onClick: (row?: unknown) => {
          console.log("Deleting product:", row);
        },
        icon: <FaTrash className="w-4 h-4" />,
        danger: true,
      },
    ],
    row: sampleProduct,
    trigger: (
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
        <FaCog className="w-4 h-4 text-gray-600" />
        <span className="text-sm text-gray-700">Product Actions</span>
      </div>
    ),
  },
};

export const PositionTopLeft: Story = {
  args: {
    actions: [
      {
        label: "Edit",
        onClick: () => console.log("Action clicked"),
        icon: <FaEdit className="w-4 h-4" />,
      },
      {
        label: "Delete",
        onClick: () => console.log("Action clicked"),
        icon: <FaTrash className="w-4 h-4" />,
        danger: true,
      },
    ],
    position: "top-left",
  },
  decorators: [
    (Story) => (
      <div className="p-20">
        <Story />
      </div>
    ),
  ],
};

export const PositionBottomRight: Story = {
  args: {
    actions: [
      {
        label: "Edit",
        onClick: () => console.log("Action clicked"),
        icon: <FaEdit className="w-4 h-4" />,
      },
      {
        label: "Delete",
        onClick: () => console.log("Action clicked"),
        icon: <FaTrash className="w-4 h-4" />,
        danger: true,
      },
    ],
    position: "bottom-right",
  },
  decorators: [
    (Story) => (
      <div className="p-20">
        <Story />
      </div>
    ),
  ],
};

export const UserManagementActions: Story = {
  args: {
    actions: [
      {
        label: "View Profile",
        onClick: (row?: unknown) => {
          console.log("Viewing profile for:", row);
        },
        icon: <FaEye className="w-4 h-4" />,
      },
      {
        label: "Edit User",
        onClick: (row?: unknown) => {
          console.log("Editing user:", row);
        },
        icon: <FaEdit className="w-4 h-4" />,
      },
      {
        label: "Reset Password",
        onClick: (row?: unknown) => {
          console.log("Resetting password for:", row);
        },
        icon: <FaLock className="w-4 h-4" />,
      },
      { separator: true },
      {
        label: sampleUser.status === "active" ? "Deactivate" : "Activate",
        onClick: (row?: unknown) => {
          console.log("Toggling status for:", row);
        },
        icon:
          sampleUser.status === "active" ? (
            <FaBan className="w-4 h-4" />
          ) : (
            <FaCheck className="w-4 h-4" />
          ),
        danger: sampleUser.status === "active",
      },
      { separator: true },
      {
        label: "Delete User",
        onClick: (row?: unknown) => {
          console.log("Deleting user:", row);
        },
        icon: <FaTrash className="w-4 h-4" />,
        danger: true,
        disabled: sampleUser.role === "admin",
      },
    ],
    row: sampleUser,
  },
};

export const ProductActions: Story = {
  args: {
    actions: [
      {
        label: "View Details",
        onClick: (row?: unknown) => {
          console.log("Viewing product:", row);
        },
        icon: <FaEye className="w-4 h-4" />,
      },
      {
        label: "Edit Product",
        onClick: (row?: unknown) => {
          console.log("Editing product:", row);
        },
        icon: <FaEdit className="w-4 h-4" />,
      },
      {
        label: "Duplicate",
        onClick: (row?: unknown) => {
          console.log("Duplicating product:", row);
        },
        icon: <FaCopy className="w-4 h-4" />,
      },
      { separator: true },
      {
        label: "Export Data",
        onClick: (row?: unknown) => {
          console.log("Exporting data for:", row);
        },
        icon: <FaDownload className="w-4 h-4" />,
      },
      {
        label: "Share Product",
        onClick: (row?: unknown) => {
          console.log("Sharing product:", row);
        },
        icon: <FaShare className="w-4 h-4" />,
      },
      { separator: true },
      {
        label: "Delete Product",
        onClick: (row?: unknown) => {
          console.log("Deleting product:", row);
        },
        icon: <FaTrash className="w-4 h-4" />,
        danger: true,
      },
    ],
    row: sampleProduct,
  },
};

export const LongActionList: Story = {
  args: {
    actions: [
      {
        label: "View Details",
        onClick: () => console.log("Action clicked"),
        icon: <FaEye className="w-4 h-4" />,
      },
      {
        label: "Edit Item",
        onClick: () => console.log("Action clicked"),
        icon: <FaEdit className="w-4 h-4" />,
      },
      {
        label: "Duplicate",
        onClick: () => console.log("Action clicked"),
        icon: <FaCopy className="w-4 h-4" />,
      },
      {
        label: "Move to Folder",
        onClick: () => console.log("Action clicked"),
        icon: <FaCog className="w-4 h-4" />,
      },
      { separator: true },
      {
        label: "Download",
        onClick: () => console.log("Action clicked"),
        icon: <FaDownload className="w-4 h-4" />,
      },
      {
        label: "Share",
        onClick: () => console.log("Action clicked"),
        icon: <FaShare className="w-4 h-4" />,
      },
      {
        label: "Archive",
        onClick: () => console.log("Action clicked"),
        icon: <FaLock className="w-4 h-4" />,
      },
      { separator: true },
      {
        label: "Delete",
        onClick: () => console.log("Action clicked"),
        icon: <FaTrash className="w-4 h-4" />,
        danger: true,
      },
    ],
  },
};

export const MixedStates: Story = {
  args: {
    actions: [
      {
        label: "Save Changes",
        onClick: () => console.log("Action clicked"),
        icon: <FaCheck className="w-4 h-4" />,
        loading: true,
      },
      {
        label: "Edit",
        onClick: () => console.log("Action clicked"),
        icon: <FaEdit className="w-4 h-4" />,
        disabled: true,
      },
      {
        label: "View",
        onClick: () => console.log("Action clicked"),
        icon: <FaEye className="w-4 h-4" />,
      },
      { separator: true },
      {
        label: "Delete",
        onClick: () => console.log("Action clicked"),
        icon: <FaTrash className="w-4 h-4" />,
        danger: true,
        loading: false,
      },
    ],
  },
};

export const InteractiveTest: Story = {
  args: {
    actions: [
      {
        label: "Action 1",
        onClick: () => console.log("Action clicked"),
        icon: <FaEdit className="w-4 h-4" />,
      },
      {
        label: "Action 2",
        onClick: () => console.log("Action clicked"),
        icon: <FaEye className="w-4 h-4" />,
      },
      { separator: true },
      {
        label: "Danger Action",
        onClick: () => console.log("Action clicked"),
        icon: <FaTrash className="w-4 h-4" />,
        danger: true,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Click the dropdown to test interactions. Actions will be logged to the console.",
      },
    },
  },
};
