import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./avatar";
import { FaUser, FaCrown, FaStar, FaHeart, FaBell } from "react-icons/fa";

const meta: Meta<typeof Avatar> = {
  title: "Components/Atoms/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A versatile avatar component with support for images, fallbacks, status indicators, badges, and group layouts.",
      },
    },
  },
  argTypes: {
    src: {
      control: "text",
      description: "Image source URL",
    },
    alt: {
      control: "text",
      description: "Alt text for the image",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size of the avatar",
    },
    variant: {
      control: "select",
      options: ["circle", "rounded", "square"],
      description: "Shape variant of the avatar",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "warning", "info", "default"],
      description: "Background color for fallback",
    },
    children: {
      control: "text",
      description: "Fallback text or content",
    },
    shadow: {
      control: "boolean",
      description: "Add shadow to the avatar",
    },
    border: {
      control: "boolean",
      description: "Add border to the avatar",
    },
    status: {
      control: "select",
      options: ["online", "offline", "away", "busy"],
      description: "Status indicator",
    },
    statusPosition: {
      control: "select",
      options: ["top-right", "bottom-right", "top-left", "bottom-left"],
      description: "Position of status indicator",
    },
    badge: {
      control: "text",
      description: "Badge content",
    },
    badgePosition: {
      control: "select",
      options: ["top-right", "bottom-right", "top-left", "bottom-left"],
      description: "Position of badge",
    },
    badgeColor: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "warning", "info", "default"],
      description: "Color of the badge",
    },
    clickable: {
      control: "boolean",
      description: "Make avatar clickable",
    },
    hoverEffect: {
      control: "select",
      options: ["scale", "glow", "none"],
      description: "Hover effect",
    },
    loading: {
      control: "boolean",
      description: "Show loading state",
    },
    group: {
      control: "boolean",
      description: "Enable group mode",
    },
    groupVariant: {
      control: "select",
      options: ["stack", "grid", "list"],
      description: "Group layout variant",
    },
    groupSpacing: {
      control: "select",
      options: ["tight", "normal", "loose"],
      description: "Spacing between grouped avatars",
    },
    groupMax: {
      control: "number",
      description: "Maximum number of avatars to show in group",
    },
    showGroupMore: {
      control: "boolean",
      description: "Show 'more' indicator in group",
    },
  },
  args: {},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    children: "JD",
    size: "md",
    variant: "circle",
    color: "primary",
  },
};

export const WithImage: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    alt: "John Doe",
    size: "md",
    variant: "circle",
  },
};

export const WithFallback: Story = {
  args: {
    src: "https://invalid-url.com/image.jpg",
    alt: "Fallback User",
    children: "FU",
    size: "md",
    variant: "circle",
    color: "secondary",
  },
};

// Size Variants
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="xs" children="XS" />
      <Avatar size="sm" children="SM" />
      <Avatar size="md" children="MD" />
      <Avatar size="lg" children="LG" />
      <Avatar size="xl" children="XL" />
    </div>
  ),
};

// Shape Variants
export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="circle" children="C" />
      <Avatar variant="rounded" children="R" />
      <Avatar variant="square" children="S" />
    </div>
  ),
};

// Color Variants
export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar color="primary" children="P" />
      <Avatar color="secondary" children="S" />
      <Avatar color="success" children="S" />
      <Avatar color="error" children="E" />
      <Avatar color="warning" children="W" />
      <Avatar color="info" children="I" />
      <Avatar color="default" children="D" />
    </div>
  ),
};

// Status Indicators
export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar children="ON" status="online" />
      <Avatar children="OF" status="offline" />
      <Avatar children="AW" status="away" />
      <Avatar children="BU" status="busy" />
    </div>
  ),
};

export const StatusPositions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        <Avatar children="TR" status="online" statusPosition="top-right" />
        <span className="text-xs text-center">Top Right</span>
      </div>
      <div className="flex flex-col gap-2">
        <Avatar children="BR" status="online" statusPosition="bottom-right" />
        <span className="text-xs text-center">Bottom Right</span>
      </div>
      <div className="flex flex-col gap-2">
        <Avatar children="TL" status="online" statusPosition="top-left" />
        <span className="text-xs text-center">Top Left</span>
      </div>
      <div className="flex flex-col gap-2">
        <Avatar children="BL" status="online" statusPosition="bottom-left" />
        <span className="text-xs text-center">Bottom Left</span>
      </div>
    </div>
  ),
};

// Badges
export const WithBadge: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar children="1" badge="3" badgeColor="error" />
      <Avatar children="2" badge="!" badgeColor="warning" />
      <Avatar children="3" badge="★" badgeColor="success" />
      <Avatar children="4" badge="VIP" badgeColor="primary" />
    </div>
  ),
};

export const BadgePositions: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col items-center gap-3">
          <Avatar children="TR" badge="1" badgePosition="top-right" badgeColor="error" size="xl" />
          <span className="text-sm font-medium">Top Right</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Avatar children="BR" badge="2" badgePosition="bottom-right" badgeColor="warning" size="xl" />
          <span className="text-sm font-medium">Bottom Right</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Avatar children="TL" badge="3" badgePosition="top-left" badgeColor="success" size="xl" />
          <span className="text-sm font-medium">Top Left</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Avatar children="BL" badge="4" badgePosition="bottom-left" badgeColor="info" size="xl" />
          <span className="text-sm font-medium">Bottom Left</span>
        </div>
      </div>
      
      {/* Debug view with border to see positioning */}
      <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
        <h4 className="text-sm font-medium mb-3 text-gray-600">Debug View (with border)</h4>
        <div className="flex justify-center">
          <div className="relative border-2 border-red-200 p-2 rounded-lg">
            <Avatar children="DB" badge="!" badgePosition="top-right" badgeColor="error" size="lg" />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive Features
export const Clickable: Story = {
  args: {
    children: "CL",
    clickable: true,
    hoverEffect: "scale",
    onClick: () => alert("Avatar clicked!"),
  },
};

export const HoverEffects: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar children="S" hoverEffect="scale" />
      <Avatar children="G" hoverEffect="glow" />
      <Avatar children="N" hoverEffect="none" />
    </div>
  ),
};

// Visual Enhancements
export const WithShadow: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar children="NS" />
      <Avatar children="WS" shadow />
    </div>
  ),
};

export const WithBorder: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar children="NB" />
      <Avatar children="WB" border />
    </div>
  ),
};

// Loading State
export const Loading: Story = {
  args: {
    loading: true,
    size: "lg",
  },
};

// Custom Fallback Icons
export const WithCustomIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar children={<FaUser />} color="primary" />
      <Avatar children={<FaCrown />} color="warning" />
      <Avatar children={<FaStar />} color="info" />
      <Avatar children={<FaHeart />} color="error" />
      <Avatar children={<FaBell />} color="success" />
    </div>
  ),
};

// Group Layouts
export const GroupStack: Story = {
  render: () => (
    <div className="flex items-center">
      <Avatar group groupVariant="stack" groupIndex={0} groupTotal={5} children="1" />
      <Avatar group groupVariant="stack" groupIndex={1} groupTotal={5} children="2" />
      <Avatar group groupVariant="stack" groupIndex={2} groupTotal={5} children="3" />
      <Avatar group groupVariant="stack" groupIndex={3} groupTotal={5} children="4" />
      <Avatar group groupVariant="stack" groupIndex={4} groupTotal={5} children="5" />
    </div>
  ),
};

export const GroupStackWithMore: Story = {
  render: () => (
    <div className="flex items-center">
      <Avatar group groupVariant="stack" groupIndex={0} groupTotal={8} groupMax={3} children="1" />
      <Avatar group groupVariant="stack" groupIndex={1} groupTotal={8} groupMax={3} children="2" />
      <Avatar group groupVariant="stack" groupIndex={2} groupTotal={8} groupMax={3} children="3" />
    </div>
  ),
};

export const GroupStackSpacing: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center">
        <span className="text-sm mr-2">Tight:</span>
        <Avatar group groupVariant="stack" groupIndex={0} groupTotal={3} groupSpacing="tight" children="1" />
        <Avatar group groupVariant="stack" groupIndex={1} groupTotal={3} groupSpacing="tight" children="2" />
        <Avatar group groupVariant="stack" groupIndex={2} groupTotal={3} groupSpacing="tight" children="3" />
      </div>
      <div className="flex items-center">
        <span className="text-sm mr-2">Normal:</span>
        <Avatar group groupVariant="stack" groupIndex={0} groupTotal={3} groupSpacing="normal" children="1" />
        <Avatar group groupVariant="stack" groupIndex={1} groupTotal={3} groupSpacing="normal" children="2" />
        <Avatar group groupVariant="stack" groupIndex={2} groupTotal={3} groupSpacing="normal" children="3" />
      </div>
      <div className="flex items-center">
        <span className="text-sm mr-2">Loose:</span>
        <Avatar group groupVariant="stack" groupIndex={0} groupTotal={3} groupSpacing="loose" children="1" />
        <Avatar group groupVariant="stack" groupIndex={1} groupTotal={3} groupSpacing="loose" children="2" />
        <Avatar group groupVariant="stack" groupIndex={2} groupTotal={3} groupSpacing="loose" children="3" />
      </div>
    </div>
  ),
};

export const GroupGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-2 w-32">
      <Avatar group groupVariant="grid" groupIndex={0} groupTotal={6} children="1" />
      <Avatar group groupVariant="grid" groupIndex={1} groupTotal={6} children="2" />
      <Avatar group groupVariant="grid" groupIndex={2} groupTotal={6} children="3" />
      <Avatar group groupVariant="grid" groupIndex={3} groupTotal={6} children="4" />
      <Avatar group groupVariant="grid" groupIndex={4} groupTotal={6} children="5" />
      <Avatar group groupVariant="grid" groupIndex={5} groupTotal={6} children="6" />
    </div>
  ),
};

// Complex Examples
export const CompleteExample: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    alt: "John Doe",
    children: "JD",
    size: "lg",
    variant: "circle",
    color: "primary",
    shadow: true,
    border: true,
    status: "online",
    statusPosition: "bottom-right",
    badge: "VIP",
    badgePosition: "top-right",
    badgeColor: "warning",
    clickable: true,
    hoverEffect: "glow",
    onClick: () => alert("Profile clicked!"),
  },
};

export const UserProfile: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
      <Avatar
        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
        alt="Sarah Wilson"
        children="SW"
        size="lg"
        status="online"
        badge="Pro"
        badgeColor="success"
        clickable
        hoverEffect="scale"
        onClick={() => alert("View Sarah's profile")}
      />
      <div>
        <h3 className="font-semibold text-gray-900">Sarah Wilson</h3>
        <p className="text-sm text-gray-500">Product Manager</p>
        <p className="text-xs text-green-600">Online</p>
      </div>
    </div>
  ),
};

export const TeamMembers: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Team Members</h3>
      <div className="flex items-center">
        <Avatar group groupVariant="stack" groupIndex={0} groupTotal={6} groupMax={4} children="A" />
        <Avatar group groupVariant="stack" groupIndex={1} groupTotal={6} groupMax={4} children="B" />
        <Avatar group groupVariant="stack" groupIndex={2} groupTotal={6} groupMax={4} children="C" />
        <Avatar group groupVariant="stack" groupIndex={3} groupTotal={6} groupMax={4} children="D" />
        <span className="ml-2 text-sm text-gray-600">+2 more</span>
      </div>
    </div>
  ),
};

export const NotificationCenter: Story = {
  render: () => (
    <div className="space-y-3 w-80">
      <div className="flex items-center gap-3 p-3 bg-white border rounded-lg">
        <Avatar children="JS" badge="3" badgeColor="error" />
        <div className="flex-1">
          <p className="font-medium">John Smith</p>
          <p className="text-sm text-gray-500">Sent you a message</p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-3 bg-white border rounded-lg">
        <Avatar children="MJ" status="away" />
        <div className="flex-1">
          <p className="font-medium">Mary Johnson</p>
          <p className="text-sm text-gray-500">Shared a document</p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-3 bg-white border rounded-lg">
        <Avatar children="DB" badge="!" badgeColor="warning" />
        <div className="flex-1">
          <p className="font-medium">David Brown</p>
          <p className="text-sm text-gray-500">Mentioned you in a comment</p>
        </div>
      </div>
    </div>
  ),
};
