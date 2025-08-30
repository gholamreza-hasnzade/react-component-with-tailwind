import React, { useState } from "react";
import { Avatar } from "./avatar";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A hybrid avatar component combining custom features with Radix UI primitives for accessibility and advanced functionality.",
      },
    },
  },
  argTypes: {
    src: { control: { type: "text" } },
    alt: { control: { type: "text" } },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    variant: {
      control: { type: "select" },
      options: ["circle", "rounded", "square"],
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "error", "warning", "info", "default"],
    },
    children: { control: { type: "text" } },
    shadow: { control: { type: "boolean" } },
    border: { control: { type: "boolean" } },
    status: {
      control: { type: "select" },
      options: ["online", "offline", "away", "busy"],
    },
    statusPosition: {
      control: { type: "select" },
      options: ["top-right", "bottom-right", "top-left", "bottom-left"],
    },
    badge: { control: { type: "text" } },
    badgePosition: {
      control: { type: "select" },
      options: ["top-right", "bottom-right", "top-left", "bottom-left"],
    },
    badgeColor: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "error", "warning", "info", "default"],
    },
    clickable: { control: { type: "boolean" } },
    hoverEffect: {
      control: { type: "select" },
      options: ["scale", "glow", "none"],
    },
    loading: { control: { type: "boolean" } },
    group: { control: { type: "boolean" } },
    groupVariant: {
      control: { type: "select" },
      options: ["stack", "grid", "list"],
    },
    groupSpacing: {
      control: { type: "select" },
      options: ["tight", "normal", "loose"],
    },
    fallbackDelayMs: {
      control: { type: "number", min: 0, max: 1000, step: 100 },
    },
  },
  args: {
    children: "JD",
    size: "md",
    variant: "circle",
    color: "primary",
    shadow: false,
    border: false,
    status: undefined,
    statusPosition: "bottom-right",
    badge: undefined,
    badgePosition: "top-right",
    badgeColor: "error",
    clickable: false,
    hoverEffect: "none",
    loading: false,
    group: false,
    groupVariant: "stack",
    groupSpacing: "normal",
    fallbackDelayMs: 600,
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    children: "JD",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-4 items-center">
        <Avatar size="xs" children="XS" />
        <Avatar size="sm" children="SM" />
        <Avatar size="md" children="MD" />
        <Avatar size="lg" children="LG" />
        <Avatar size="xl" children="XL" />
      </div>
      <p className="text-sm text-gray-600 text-center">
        Different sizes for different UI contexts
      </p>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-4 items-center">
        <Avatar variant="circle" children="C" />
        <Avatar variant="rounded" children="R" />
        <Avatar variant="square" children="S" />
      </div>
      <p className="text-sm text-gray-600 text-center">
        Different shape variants: circle, rounded, and square
      </p>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <div className="grid grid-cols-4 gap-3">
        <Avatar color="primary" children="P" />
        <Avatar color="secondary" children="S" />
        <Avatar color="success" children="S" />
        <Avatar color="error" children="E" />
        <Avatar color="warning" children="W" />
        <Avatar color="info" children="I" />
        <Avatar color="default" children="D" />
      </div>
      <p className="text-sm text-gray-600 text-center">
        Different color themes for various contexts
      </p>
    </div>
  ),
};

export const WithImages: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-4 items-center">
        <Avatar 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
          alt="Professional headshot"
        />
        <Avatar 
          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" 
          alt="Woman portrait"
        />
        <Avatar 
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
          alt="Man portrait"
        />
      </div>
      <p className="text-sm text-gray-600 text-center">
        Avatars with actual profile images using Radix UI Image primitive
      </p>
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-4 items-center">
        <Avatar status="online" children="ON" />
        <Avatar status="offline" children="OFF" />
        <Avatar status="away" children="AW" />
        <Avatar status="busy" children="BU" />
      </div>
      <p className="text-sm text-gray-600 text-center">
        Status indicators: online, offline, away, busy
      </p>
    </div>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-4 items-center">
        <Avatar badge="3" badgeColor="error" children="JD" />
        <Avatar badge="NEW" badgeColor="success" children="AB" />
        <Avatar badge="VIP" badgeColor="warning" children="CD" />
        <Avatar badge="99+" badgeColor="info" children="EF" />
      </div>
      <p className="text-sm text-gray-600 text-center">
        Avatars with different types of badges
      </p>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [clickCount, setClickCount] = useState(0);
    
    return (
      <div className="flex flex-col gap-4 items-center">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">Clicks: {clickCount}</p>
          <Avatar 
            clickable 
            onClick={() => setClickCount(prev => prev + 1)}
            hoverEffect="scale"
            children="CL"
          />
        </div>
        <p className="text-sm text-gray-600 text-center">
          Clickable avatar with scale hover effect
        </p>
      </div>
    );
  },
};

export const GroupStack: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex items-center">
        <Avatar group groupVariant="stack" groupIndex={0} groupTotal={4} children="JD" />
        <Avatar group groupVariant="stack" groupIndex={1} groupTotal={4} children="AB" />
        <Avatar group groupVariant="stack" groupIndex={2} groupTotal={4} children="CD" />
        <Avatar group groupVariant="stack" groupIndex={3} groupTotal={4} children="EF" />
      </div>
      <p className="text-sm text-gray-600 text-center">
        Stacked group with overlapping avatars
      </p>
    </div>
  ),
};

export const ComplexExample: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-4 items-center">
        <Avatar 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="John Doe"
          size="lg"
          variant="circle"
          status="online"
          statusPosition="bottom-right"
          badge="VIP"
          badgeColor="warning"
          shadow
          border
          clickable
          hoverEffect="glow"
        />
        <div className="flex flex-col gap-2">
          <h3 className="font-medium">John Doe</h3>
          <p className="text-sm text-gray-600">Online • VIP Member</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 text-center">
        Complex avatar with all features combined, now using Radix UI primitives
      </p>
    </div>
  ),
}; 