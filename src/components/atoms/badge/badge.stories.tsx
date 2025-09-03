import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge";
import { FaBell, FaCheck, FaTimes, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

const meta: Meta<typeof Badge> = {
  title: "Components/Atoms/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A versatile badge component with multiple variants, sizes, and interactive features.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "primary",
        "secondary",
        "destructive",
        "outline",
        "success",
        "warning",
        "info",
        "purple",
        "pink",
        "indigo",
        "orange",
        "teal",
        "gray",
        "error",
        "green",
        "blue",
        "yellow",
      ],
      description: "The visual style variant of the badge",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
      description: "The size of the badge",
    },
    rounded: {
      control: { type: "boolean" },
      description: "Whether the badge should be rounded",
    },
    showDot: {
      control: { type: "boolean" },
      description: "Whether to show a status dot",
    },
    clickable: {
      control: { type: "boolean" },
      description: "Whether the badge is clickable",
    },
    dismissible: {
      control: { type: "boolean" },
      description: "Whether the badge can be dismissed",
    },
    iconPosition: {
      control: { type: "select" },
      options: ["left", "right"],
      description: "Position of the icon",
    },
    children: {
      control: { type: "text" },
      description: "The content of the badge",
    },
  },
  args: {
    children: "Badge",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Variants
export const Default: Story = {
  args: {
    variant: "default",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

// Status Variants
export const Success: Story = {
  args: {
    variant: "success",
    children: "Success",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "Info",
  },
};

// Color Variants
export const Purple: Story = {
  args: {
    variant: "purple",
    children: "Purple",
  },
};

export const Pink: Story = {
  args: {
    variant: "pink",
    children: "Pink",
  },
};

export const Indigo: Story = {
  args: {
    variant: "indigo",
    children: "Indigo",
  },
};

export const Orange: Story = {
  args: {
    variant: "orange",
    children: "Orange",
  },
};

export const Teal: Story = {
  args: {
    variant: "teal",
    children: "Teal",
  },
};

export const Gray: Story = {
  args: {
    variant: "gray",
    children: "Gray",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "Error",
  },
};

export const Green: Story = {
  args: {
    variant: "green",
    children: "Green",
  },
};

export const Blue: Story = {
  args: {
    variant: "blue",
    children: "Blue",
  },
};

export const Yellow: Story = {
  args: {
    variant: "yellow",
    children: "Yellow",
  },
};

// Sizes
export const ExtraSmall: Story = {
  args: {
    size: "xs",
    children: "XS",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "Medium",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
};

// Rounded Variants
export const Rounded: Story = {
  args: {
    rounded: true,
    children: "Rounded",
  },
};

export const NotRounded: Story = {
  args: {
    rounded: false,
    children: "Not Rounded",
  },
};

// With Status Dots
export const WithDot: Story = {
  args: {
    showDot: true,
    children: "Online",
  },
};

export const WithDotSuccess: Story = {
  args: {
    variant: "success",
    showDot: true,
    children: "Active",
  },
};

export const WithDotWarning: Story = {
  args: {
    variant: "warning",
    showDot: true,
    children: "Pending",
  },
};

export const WithDotError: Story = {
  args: {
    variant: "error",
    showDot: true,
    children: "Offline",
  },
};

// With Icons
export const WithLeftIcon: Story = {
  args: {
    icon: <FaBell />,
    children: "Notifications",
  },
};

export const WithRightIcon: Story = {
  args: {
    icon: <FaTimes />,
    iconPosition: "right",
    children: "Close",
  },
};

export const WithCheckIcon: Story = {
  args: {
    variant: "success",
    icon: <FaCheck />,
    children: "Completed",
  },
};

export const WithWarningIcon: Story = {
  args: {
    variant: "warning",
    icon: <FaExclamationTriangle />,
    children: "Warning",
  },
};

export const WithInfoIcon: Story = {
  args: {
    variant: "info",
    icon: <FaInfoCircle />,
    children: "Information",
  },
};

// Clickable Badges
export const Clickable: Story = {
  args: {
    clickable: true,
    children: "Click Me",
    onClick: () => alert("Badge clicked!"),
  },
};

export const ClickableWithIcon: Story = {
  args: {
    variant: "primary",
    clickable: true,
    icon: <FaBell />,
    children: "Clickable Notification",
    onClick: () => alert("Notification clicked!"),
  },
};

// Dismissible Badges
export const Dismissible: Story = {
  args: {
    dismissible: true,
    children: "Dismissible",
    onDismiss: () => alert("Badge dismissed!"),
  },
};

export const DismissibleWarning: Story = {
  args: {
    variant: "warning",
    dismissible: true,
    children: "Dismissible Warning",
    onDismiss: () => alert("Warning dismissed!"),
  },
};

// Combined Features
export const WithDotAndIcon: Story = {
  args: {
    variant: "success",
    showDot: true,
    icon: <FaCheck />,
    children: "Verified",
  },
};

export const ClickableWithDot: Story = {
  args: {
    variant: "primary",
    showDot: true,
    clickable: true,
    children: "New Feature",
    onClick: () => alert("New feature clicked!"),
  },
};

export const DismissibleWithIcon: Story = {
  args: {
    variant: "info",
    dismissible: true,
    icon: <FaInfoCircle />,
    children: "Dismissible Info",
    onDismiss: () => alert("Info dismissed!"),
  },
};

export const FullFeatured: Story = {
  args: {
    variant: "purple",
    size: "lg",
    showDot: true,
    icon: <FaBell />,
    clickable: true,
    children: "Full Featured",
    onClick: () => alert("Full featured badge clicked!"),
  },
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Basic Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Status Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="error">Error</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Color Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="purple">Purple</Badge>
          <Badge variant="pink">Pink</Badge>
          <Badge variant="indigo">Indigo</Badge>
          <Badge variant="orange">Orange</Badge>
          <Badge variant="teal">Teal</Badge>
          <Badge variant="gray">Gray</Badge>
          <Badge variant="green">Green</Badge>
          <Badge variant="blue">Blue</Badge>
          <Badge variant="yellow">Yellow</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Sizes</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Badge size="xs">Extra Small</Badge>
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">With Status Dots</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success" showDot>Online</Badge>
          <Badge variant="warning" showDot>Pending</Badge>
          <Badge variant="error" showDot>Offline</Badge>
          <Badge variant="info" showDot>Busy</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">With Icons</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary" icon={<FaBell />}>Notifications</Badge>
          <Badge variant="success" icon={<FaCheck />}>Completed</Badge>
          <Badge variant="warning" icon={<FaExclamationTriangle />}>Warning</Badge>
          <Badge variant="info" icon={<FaInfoCircle />}>Info</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Interactive Features</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary" clickable onClick={() => alert("Clicked!")}>
            Clickable
          </Badge>
          <Badge variant="warning" dismissible onDismiss={() => alert("Dismissed!")}>
            Dismissible
          </Badge>
          <Badge 
            variant="success" 
            showDot 
            icon={<FaCheck />} 
            clickable 
            onClick={() => alert("Full featured!")}
          >
            Full Featured
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// Real-world Examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">User Status</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success" showDot size="sm">Active</Badge>
          <Badge variant="warning" showDot size="sm">Pending</Badge>
          <Badge variant="error" showDot size="sm">Suspended</Badge>
          <Badge variant="gray" showDot size="sm">Inactive</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Task Priority</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="error" size="sm">High</Badge>
          <Badge variant="warning" size="sm">Medium</Badge>
          <Badge variant="success" size="sm">Low</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary" size="sm">Frontend</Badge>
          <Badge variant="info" size="sm">Backend</Badge>
          <Badge variant="secondary" size="sm">DevOps</Badge>
          <Badge variant="outline" size="sm">Design</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Notifications</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="error" size="sm" icon={<FaBell />}>3</Badge>
          <Badge variant="warning" size="sm" icon={<FaBell />}>5</Badge>
          <Badge variant="info" size="sm" icon={<FaBell />}>12</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">System Status</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success" size="sm" icon={<FaCheck />}>Connected</Badge>
          <Badge variant="error" size="sm" icon={<FaTimes />}>Disconnected</Badge>
          <Badge variant="warning" size="sm" icon={<FaExclamationTriangle />}>Maintenance</Badge>
        </div>
      </div>
    </div>
  ),
};
