import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { RadioGroup, RadioGroupItem } from "./radio-group";

const meta: Meta<typeof RadioGroup> = {
  title: "Atoms/RadioGroup",
  component: RadioGroup,
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Basic: Story = {
  render: () => {
    const [value, setValue] = React.useState("option1");
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <RadioGroupItem value="option1" label="Option 1" />
        <RadioGroupItem value="option2" label="Option 2" />
        <RadioGroupItem value="option3" label="Option 3" />
      </RadioGroup>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [value, setValue] = React.useState("md");
    return (
      <div className="flex flex-col gap-4">
        <RadioGroup value={value} onValueChange={setValue}>
          <RadioGroupItem value="sm" label="Small" size="sm" />
          <RadioGroupItem value="md" label="Medium" size="md" />
          <RadioGroupItem value="lg" label="Large" size="lg" />
        </RadioGroup>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup value="option1" onValueChange={() => {}} disabled>
      <RadioGroupItem value="option1" label="Disabled 1" />
      <RadioGroupItem value="option2" label="Disabled 2" />
    </RadioGroup>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <RadioGroup value="option1" onValueChange={() => {}}>
      <RadioGroupItem value="option1" label="ReadOnly 1" readOnly />
      <RadioGroupItem value="option2" label="ReadOnly 2" readOnly />
    </RadioGroup>
  ),
};

export const Colors: Story = {
  render: () => {
    const [value, setValue] = React.useState("primary");
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <RadioGroupItem value="primary" label="Primary" color="primary" />
        <RadioGroupItem value="secondary" label="Secondary" color="secondary" />
        <RadioGroupItem value="success" label="Success" color="success" />
        <RadioGroupItem value="error" label="Error" color="error" />
        <RadioGroupItem value="warning" label="Warning" color="warning" />
        <RadioGroupItem value="info" label="Info" color="info" />
      </RadioGroup>
    );
  },
}; 