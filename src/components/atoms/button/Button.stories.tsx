import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import React from "react";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A versatile button component with multiple variants, colors, sizes, and states.",
      },
    },
  },
  argTypes: {
    onClick: { action: "clicked" },
    startIcon: { control: false },
    endIcon: { control: false },
    variant: {
      control: { type: "select" },
      options: ["contained", "outlined", "text"],
      description: "The visual style variant of the button",
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "error", "warning", "info"],
      description: "The color theme of the button",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "icon"],
      description: "The size of the button",
    },
    rounded: {
      control: { type: "select" },
      options: ["default", "full", "lg", "xl", "none"],
      description: "The border radius of the button",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the button is disabled",
    },
    loading: {
      control: { type: "boolean" },
      description: "Whether the button shows a loading state",
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Whether the button should take full width",
    },
    iconOnly: {
      control: { type: "boolean" },
      description: "Whether the button only shows an icon",
    },
    tooltip: {
      control: { type: "text" },
      description: "Tooltip text to show on hover",
    },
    asChild: {
      control: { type: "boolean" },
      description: "Whether to render as a child element",
    },
  },
  args: {
    children: "Button",
    variant: "contained",
    color: "primary",
    size: "md",
    rounded: "default",
    disabled: false,
    loading: false,
    fullWidth: false,
    iconOnly: false,
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Default Button",
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <Button {...args} variant="contained">
          Contained
        </Button>
        <Button {...args} variant="outlined">
          Outlined
        </Button>
        <Button {...args} variant="text">
          Text
        </Button>
      </div>
      <p className="text-sm text-gray-600 text-center">
        Different visual styles for different use cases
      </p>
    </div>
  ),
  args: {
    color: "primary",
  },
};

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 flex-wrap justify-center">
        {["primary", "secondary", "success", "error", "warning", "info"].map(
          (color) => (
            <Button
              key={color}
              {...args}
              color={
                color as
                  | "primary"
                  | "secondary"
                  | "success"
                  | "error"
                  | "warning"
                  | "info"
              }
            >
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </Button>
          )
        )}
      </div>
      <p className="text-sm text-gray-600 text-center">
        Color themes for different contexts and actions
      </p>
    </div>
  ),
  args: {
    variant: "contained",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center justify-center">
        {(["sm", "md", "lg", "icon"] as Array<"sm" | "md" | "lg" | "icon">).map(
          (size) => (
            <Button 
              key={size} 
              {...args} 
              size={size} 
              iconOnly={size === "icon"}
            >
              {size === "icon" ? (
                <span role="img" aria-label="star" className="text-lg">
                  ⭐
                </span>
              ) : (
                size.toUpperCase()
              )}
            </Button>
          )
        )}
      </div>
      <p className="text-sm text-gray-600 text-center">
        Different sizes for different UI contexts
      </p>
    </div>
  ),
  args: {
    variant: "contained",
    color: "primary",
  },
};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center justify-center">
        <Button {...args}>Normal</Button>
        <Button {...args} disabled>
          Disabled
        </Button>
        <Button {...args} loading>
          Loading
        </Button>
      </div>
      <p className="text-sm text-gray-600 text-center">
        Different states: normal, disabled, and loading
      </p>
    </div>
  ),
  args: {
    variant: "contained",
    color: "primary",
  },
};

export const WithIcons: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center justify-center">
        <Button {...args} startIcon={<span role="img" aria-label="download">⬇️</span>}>
          Download
        </Button>
        <Button {...args} endIcon={<span role="img" aria-label="arrow">➡️</span>}>
          Continue
        </Button>
        <Button {...args} startIcon={<span role="img" aria-label="star">⭐</span>} endIcon={<span role="img" aria-label="heart">❤️</span>}>
          Both Icons
        </Button>
      </div>
      <p className="text-sm text-gray-600 text-center">
        Buttons with start, end, or both icons
      </p>
    </div>
  ),
  args: {
    variant: "contained",
    color: "primary",
  },
};

export const IconOnly: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center justify-center">
        <Button {...args} iconOnly startIcon={<span role="img" aria-label="star">⭐</span>} aria-label="Star" />
        <Button {...args} iconOnly startIcon={<span role="img" aria-label="heart">❤️</span>} aria-label="Heart" />
        <Button {...args} iconOnly startIcon={<span role="img" aria-label="settings">⚙️</span>} aria-label="Settings" />
        <Button {...args} iconOnly startIcon={<span role="img" aria-label="close">❌</span>} aria-label="Close" />
      </div>
      <p className="text-sm text-gray-600 text-center">
        Icon-only buttons for compact UI elements
      </p>
    </div>
  ),
  args: {
    variant: "contained",
    color: "primary",
    size: "icon",
  },
};

export const FullWidth: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-80">
      <Button {...args} fullWidth>
        Full Width Button
      </Button>
      <Button {...args} fullWidth variant="outlined">
        Full Width Outlined
      </Button>
      <p className="text-sm text-gray-600 text-center">
        Full-width buttons for important actions
      </p>
    </div>
  ),
  args: {
    color: "primary",
  },
};

export const WithTooltip: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center justify-center">
        <Button {...args} tooltip="This is a helpful tooltip">
          Hover for Tooltip
        </Button>
        <Button {...args} tooltip="Another helpful tooltip" variant="outlined">
          Outlined with Tooltip
        </Button>
      </div>
      <p className="text-sm text-gray-600 text-center">
        Buttons with helpful tooltips on hover
      </p>
    </div>
  ),
  args: {
    color: "primary",
  },
};

export const AsChild: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center justify-center">
        <Button {...args} asChild>
          <a href="#" className="no-underline">
            Link Button
          </a>
        </Button>
        <Button {...args} asChild variant="outlined">
          <button type="button">
            Custom Button Element
          </button>
        </Button>
      </div>
      <p className="text-sm text-gray-600 text-center">
        Render as different HTML elements using asChild
      </p>
    </div>
  ),
  args: {
    color: "primary",
  },
};

export const RoundedVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center justify-center flex-wrap">
        <Button {...args} rounded="none">
          No Radius
        </Button>
        <Button {...args} rounded="default">
          Default
        </Button>
        <Button {...args} rounded="lg">
          Large
        </Button>
        <Button {...args} rounded="xl">
          Extra Large
        </Button>
        <Button {...args} rounded="full">
          Full Rounded
        </Button>
      </div>
      <p className="text-sm text-gray-600 text-center">
        Different border radius options for various design needs
      </p>
    </div>
  ),
  args: {
    variant: "contained",
    color: "primary",
  },
};

export const RoundedIconButtons: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center justify-center flex-wrap">
        <Button {...args} iconOnly rounded="default" startIcon={<span role="img" aria-label="star">⭐</span>} aria-label="Star" />
        <Button {...args} iconOnly rounded="lg" startIcon={<span role="img" aria-label="heart">❤️</span>} aria-label="Heart" />
        <Button {...args} iconOnly rounded="xl" startIcon={<span role="img" aria-label="settings">⚙️</span>} aria-label="Settings" />
        <Button {...args} iconOnly rounded="full" startIcon={<span role="img" aria-label="close">❌</span>} aria-label="Close" />
      </div>
      <p className="text-sm text-gray-600 text-center">
        Icon-only buttons with different border radius options
      </p>
    </div>
  ),
  args: {
    variant: "contained",
    color: "primary",
    size: "icon",
  },
};

export const RoundedOutlinedButtons: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center justify-center flex-wrap">
        <Button {...args} variant="outlined" rounded="default">
          Default
        </Button>
        <Button {...args} variant="outlined" rounded="lg">
          Large
        </Button>
        <Button {...args} variant="outlined" rounded="xl">
          Extra Large
        </Button>
        <Button {...args} variant="outlined" rounded="full">
          Full Rounded
        </Button>
      </div>
      <p className="text-sm text-gray-600 text-center">
        Outlined buttons with different border radius options
      </p>
    </div>
  ),
  args: {
    color: "primary",
  },
};

export const RoundedTextButtons: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center justify-center flex-wrap">
        <Button {...args} variant="text" rounded="default">
          Default
        </Button>
        <Button {...args} variant="text" rounded="lg">
          Large
        </Button>
        <Button {...args} variant="text" rounded="xl">
          Extra Large
        </Button>
        <Button {...args} variant="text" rounded="full">
          Full Rounded
        </Button>
      </div>
      <p className="text-sm text-gray-600 text-center">
        Text buttons with different border radius options
      </p>
    </div>
  ),
  args: {
    color: "primary",
  },
};

export const AllVariants: Story = {
  render: (args) => {
    const variants = ["contained", "outlined", "text"] as const;
    const colors = ["primary", "secondary", "success", "error", "warning", "info"] as const;
    
    return (
      <div className="flex flex-col gap-6">
        {variants.map((variant) => (
          <div key={variant} className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-gray-800 capitalize text-center">
              {variant} Variant
            </h3>
            <div className="flex gap-3 flex-wrap justify-center">
              {colors.map((color) => (
                <Button
                  key={`${variant}-${color}`}
                  {...args}
                  variant={variant}
                  color={color}
                >
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
  args: {
    size: "md",
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [count, setCount] = React.useState(0);
    
    return (
      <div className="flex flex-col gap-4 items-center">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">Click Counter: {count}</p>
          <div className="flex gap-3">
            <Button 
              {...args} 
              onClick={() => setCount(prev => prev + 1)}
              startIcon={<span role="img" aria-label="plus">➕</span>}
            >
              Increment
            </Button>
            <Button 
              {...args} 
              onClick={() => setCount(0)}
              variant="outlined"
              startIcon={<span role="img" aria-label="reset">🔄</span>}
            >
              Reset
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600 text-center">
          Interactive buttons with state management
        </p>
      </div>
    );
  },
  args: {
    color: "primary",
  },
};

export const Usage: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-2xl text-left" dir="ltr">
      <h4 className="text-lg font-semibold">Code Examples</h4>
      
      <div className="space-y-4">
        <div>
          <h5 className="font-medium text-gray-800 mb-2">Basic Usage</h5>
          <pre className="text-sm bg-gray-50 p-3 rounded-md overflow-x-auto">
{`import { Button } from "./button";

// Basic button
<Button>Click me</Button>

// With variant and color
<Button variant="contained" color="primary">
  Primary Button
</Button>`}
          </pre>
        </div>

        <div>
          <h5 className="font-medium text-gray-800 mb-2">With Icons</h5>
          <pre className="text-sm bg-gray-50 p-3 rounded-md overflow-x-auto">
{`// Start icon
<Button startIcon={<span>🚀</span>}>
  Launch
</Button>

// Icon only
<Button 
  iconOnly 
  startIcon={<span>⭐</span>} 
  aria-label="Star" 
/>`}
          </pre>
        </div>

        <div>
          <h5 className="font-medium text-gray-800 mb-2">States and Sizes</h5>
          <pre className="text-sm bg-gray-50 p-3 rounded-md overflow-x-auto">
{`// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>
<Button fullWidth>Full Width</Button>

// Border radius options
<Button rounded="default">Default Radius</Button>
<Button rounded="full">Fully Rounded</Button>
<Button rounded="lg">Large Radius</Button>
<Button rounded="xl">Extra Large Radius</Button>
<Button rounded="none">No Radius</Button>`}
          </pre>
        </div>

        <div>
          <h5 className="font-medium text-gray-800 mb-2">All Variants</h5>
          <pre className="text-sm bg-gray-50 p-3 rounded-md overflow-x-auto">
{`// All variants
<Button variant="contained" color="primary">Primary</Button>
<Button variant="outlined" color="secondary">Secondary</Button>
<Button variant="text" color="error">Error</Button>

// All colors
<Button color="success">Success</Button>
<Button color="warning">Warning</Button>
<Button color="info">Info</Button>`}
          </pre>
        </div>
      </div>
    </div>
  ),
};
