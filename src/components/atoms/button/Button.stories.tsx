import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  argTypes: {
    onClick: { action: "clicked" },
    startIcon: { control: false },
    endIcon: { control: false },
  },
  args: {
    children: "Button",
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Contained: Story = {
  args: {
    variant: "contained",
    color: "primary",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    color: "primary",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    color: "primary",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading",
  },
};

export const AllColors: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
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
  ),
  args: {
    variant: "contained",
  },
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 8 }}>
      {(
        ["contained", "outlined", "text"] as Array<
          "contained" | "outlined" | "text"
        >
      ).map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </div>
  ),
  args: {
    color: "primary",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 8 }}>
      {(["sm", "md", "lg", "icon"] as Array<"sm" | "md" | "lg" | "icon">).map(
        (size) => (
          <Button key={size} {...args} size={size} iconOnly={size === "icon"}>
            {size === "icon" ? (
              <span role="img" aria-label="star">
                ⭐
              </span>
            ) : (
              size.toUpperCase()
            )}
          </Button>
        )
      )}
    </div>
  ),
  args: {
    variant: "contained",
    color: "primary",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "Full Width Button",
  },
  render: (args) => (
    <div style={{ width: 300 }}>
      <Button {...args} />
    </div>
  ),
};

export const IconOnly: Story = {
  args: {
    iconOnly: true,
    startIcon: (
      <span role="img" aria-label="star">
        ⭐
      </span>
    ),
    "aria-label": "Star",
  },
};

export const WithStartEndIcon: Story = {
  args: {
    startIcon: (
      <span role="img" aria-label="start">
        ⬅️
      </span>
    ),
    endIcon: (
      <span role="img" aria-label="end">
        ➡️
      </span>
    ),
    children: "With Icons",
  },
};

export const WithTooltip: Story = {
  args: {
    tooltip: "Tooltip text",
    children: "Hover me",
  },
};

export const AsChild: Story = {
  args: {
    asChild: true,
    children: <a href="#">Link Button</a>,
  },
  render: (args) => <Button {...args} />,
};

export const Usage: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-full text-left" dir="ltr">
      <h4>Sample Usage</h4>
      <pre className="text-sm">
        {`
import { Button } from "./button";

<Button variant="contained" color="primary">Primary</Button>
<Button variant="outlined" color="secondary">Secondary</Button>
<Button variant="text" color="error">Error</Button>
<Button size="lg" startIcon={<span>🚀</span>}>Large Button</Button>
<Button iconOnly startIcon={<span>⭐</span>} aria-label="Star" />
<Button fullWidth>Full Width</Button>
        `}
      </pre>
    </div>
  ),
};
