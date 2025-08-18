import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./label";

const meta: Meta<typeof Label> = {
  title: "Atoms/Label",
  component: Label,
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Basic: Story = {
  render: () => <Label htmlFor="input-id">Basic Label</Label>,
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="color-primary" color="primary">Primary Label</Label>
      <Label htmlFor="color-secondary" color="secondary">Secondary Label</Label>
      <Label htmlFor="color-success" color="success">Success Label</Label>
      <Label htmlFor="color-error" color="error">Error Label</Label>
      <Label htmlFor="color-warning" color="warning">Warning Label</Label>
      <Label htmlFor="color-info" color="info">Info Label</Label>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="size-sm" size="sm">Small Label</Label>
      <Label htmlFor="size-md" size="md">Medium Label</Label>
      <Label htmlFor="size-lg" size="lg">Large Label</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="group-data-[disabled=true]:opacity-50">
      <Label htmlFor="input-id" className="group-data-[disabled=true]:opacity-50">Disabled Label</Label>
    </div>
  ),
};

export const CustomClass: Story = {
  render: () => <Label htmlFor="input-id" className="text-red-500">Custom Class Label</Label>,
}; 