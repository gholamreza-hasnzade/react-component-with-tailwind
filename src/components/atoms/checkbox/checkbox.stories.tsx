import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./checkbox";
import { useState } from "react";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Checkbox",
  component: Checkbox,
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        id="basic"
        label="Accept terms and conditions"
        checked={checked}
        onCheckedChange={setChecked}
      />
    );
  },
};

export const Required: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        id="required"
        label="I agree to the policy"
        checked={checked}
        onCheckedChange={setChecked}
        required
      />
    );
  },
};

export const Error: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        id="error"
        label="Accept terms and conditions"
        checked={checked}
        onCheckedChange={setChecked}
        error={!checked ? "You must accept the terms" : undefined}
      />
    );
  },
};

export const HelperText: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        id="helper"
        label="Subscribe to newsletter"
        checked={checked}
        onCheckedChange={setChecked}
        helperText="You can unsubscribe at any time."
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Checkbox id="disabled" label="Disabled checkbox" disabled />
  ),
};

export const Colors: Story = {
  render: () => {
    const [primary, setPrimary] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);
    const [info, setInfo] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <Checkbox
          id="color-primary"
          label="Primary"
          color="primary"
          checked={primary}
          onCheckedChange={setPrimary}
        />
        <Checkbox
          id="color-secondary"
          label="Secondary"
          color="secondary"
          checked={secondary}
          onCheckedChange={setSecondary}
        />
        <Checkbox
          id="color-success"
          label="Success"
          color="success"
          checked={success}
          onCheckedChange={setSuccess}
        />
        <Checkbox
          id="color-error"
          label="Error"
          color="error"
          checked={error}
          onCheckedChange={setError}
        />
        <Checkbox
          id="color-warning"
          label="Warning"
          color="warning"
          checked={warning}
          onCheckedChange={setWarning}
        />
        <Checkbox
          id="color-info"
          label="Info"
          color="info"
          checked={info}
          onCheckedChange={setInfo}
        />
      </div>
    );
  },
}; 