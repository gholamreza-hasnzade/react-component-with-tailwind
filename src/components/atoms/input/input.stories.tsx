import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "number", "email", "password", "tel", "url"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: { type: "select" },
      options: ["contained", "outlined", "text"],
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "error", "warning", "info"],
    },
    formatPattern: {
      control: { type: "select" },
      options: ["bank-account", "credit-card", "national-id", "postal-code", "custom"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component
const InputWrapper = ({ formatPattern, customFormat, type, patternRgx, patternErrorMessage, ...props }: Partial<React.ComponentProps<typeof Input>>) => {
  const [value, setValue] = useState("");
  
  return (
    <Input
      id={props.id || "default"}
      label={props.label || "Input"}
      {...props}
      type={type}
      formatPattern={formatPattern}
      customFormat={customFormat}
      patternRgx={patternRgx}
      patternErrorMessage={patternErrorMessage}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default: Story = {
  args: {
    id: "default",
    label: "Default Input",
    placeholder: "Enter text here",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const Required: Story = {
  args: {
    id: "required",
    label: "Required Input",
    required: true,
    placeholder: "This field is required",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const WithHelperText: Story = {
  args: {
    id: "helper",
    label: "Input with Helper Text",
    helperText: "This is helpful information about the input",
    placeholder: "Enter some text",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const WithError: Story = {
  args: {
    id: "error",
    label: "Input with Error",
    error: "This field has an error",
    placeholder: "Enter some text",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const WithIcons: Story = {
  args: {
    id: "icons",
    label: "Input with Icons",
    iconLeft: "🔍",
    iconRight: "✓",
    placeholder: "Search here",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <InputWrapper
        id="small"
        label="Small Size"
        size="sm"
        placeholder="Small input"
      />
      <InputWrapper
        id="medium"
        label="Medium Size"
        size="md"
        placeholder="Medium input"
      />
      <InputWrapper
        id="large"
        label="Large Size"
        size="lg"
        placeholder="Large input"
      />
    </div>
  ),
};

export const DifferentVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <InputWrapper
        id="outlined"
        label="Outlined Variant"
        variant="outlined"
        placeholder="Outlined input"
      />
      <InputWrapper
        id="contained"
        label="Contained Variant"
        variant="contained"
        placeholder="Contained input"
      />
      <InputWrapper
        id="text"
        label="Text Variant"
        variant="text"
        placeholder="Text input"
      />
    </div>
  ),
};

export const DifferentColors: Story = {
  render: () => (
    <div className="space-y-4">
      <InputWrapper
        id="primary"
        label="Primary Color"
        color="primary"
        placeholder="Primary input"
      />
      <InputWrapper
        id="success"
        label="Success Color"
        color="success"
        placeholder="Success input"
      />
      <InputWrapper
        id="error"
        label="Error Color"
        color="error"
        placeholder="Error input"
      />
      <InputWrapper
        id="warning"
        label="Warning Color"
        color="warning"
        placeholder="Warning input"
      />
    </div>
  ),
};

// Regex Pattern Validation Stories
export const PhoneNumberValidation: Story = {
  args: {
    id: "phone-validation",
    label: "Phone Number",
    type: "text",
    patternRgx: "^[0-9]{10}$",
    patternErrorMessage: "Please enter exactly 10 digits (e.g., 1234567890)",
    helperText: "Enter a 10-digit phone number",
    placeholder: "1234567890",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const EmailValidation: Story = {
  args: {
    id: "email-validation",
    label: "Email Address",
    type: "email",
    patternRgx: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    patternErrorMessage: "Please enter a valid email address",
    helperText: "Enter your email address",
    placeholder: "user@example.com",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const PostalCodeValidation: Story = {
  args: {
    id: "postal-validation",
    label: "Postal Code",
    type: "text",
    patternRgx: "^[0-9]{5}(-[0-9]{4})?$",
    patternErrorMessage: "Please enter a valid US postal code (e.g., 12345 or 12345-6789)",
    helperText: "Enter 5 or 9-digit postal code",
    placeholder: "12345",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const CreditCardValidation: Story = {
  args: {
    id: "credit-card-validation",
    label: "Credit Card Number",
    type: "text",
    patternRgx: "^[0-9]{4}[-\\s]?[0-9]{4}[-\\s]?[0-9]{4}[-\\s]?[0-9]{4}$",
    patternErrorMessage: "Please enter a valid 16-digit credit card number",
    helperText: "Enter 16 digits with or without separators",
    placeholder: "1234-5678-9012-3456",
  },
  render: (args) => <InputWrapper {...args} />,
};

// Numeric formatting stories
export const BankAccountFormat: Story = {
  args: {
    id: "bank-account",
    label: "Bank Account Number",
    type: "number",
    formatPattern: "bank-account",
    required: true,
    helperText: "Enter your 16-digit bank account number",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const CreditCardFormat: Story = {
  args: {
    id: "credit-card",
    label: "Credit Card Number",
    type: "number",
    formatPattern: "credit-card",
    required: true,
    helperText: "Enter your 16-digit credit card number",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const NationalIDFormat: Story = {
  args: {
    id: "national-id",
    label: "National ID",
    type: "number",
    formatPattern: "national-id",
    required: true,
    helperText: "Enter your 10-digit national ID",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const PostalCodeFormat: Story = {
  args: {
    id: "postal-code",
    label: "Postal Code",
    type: "number",
    formatPattern: "postal-code",
    required: true,
    helperText: "Enter your 10-digit postal code",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const CustomFormat: Story = {
  args: {
    id: "custom",
    label: "Custom Format",
    type: "number",
    formatPattern: "custom",
    customFormat: "##-##-##",
    required: true,
    helperText: "Custom format: XX-XX-XX",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const CustomFormatWithSpaces: Story = {
  args: {
    id: "custom-spaces",
    label: "Custom Format with Spaces",
    type: "number",
    formatPattern: "custom",
    customFormat: "#### ####",
    required: true,
    helperText: "Custom format: XXXX XXXX",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const ComplexCustomFormat: Story = {
  args: {
    id: "complex-custom",
    label: "Complex Custom Format",
    type: "number",
    formatPattern: "custom",
    customFormat: "##-###-###-####",
    required: true,
    helperText: "Custom format: XX-XXX-XXX-XXXX (2-3-3-4 grouping)",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const NumericInputComparison: Story = {
  render: () => (
    <div className="space-y-4">
      <InputWrapper
        id="regular-number"
        label="Regular Number Input"
        type="number"
        placeholder="12345"
      />
      <InputWrapper
        id="formatted-bank"
        label="Formatted Bank Account"
        type="number"
        formatPattern="bank-account"
        placeholder="1234-5678-9012-3456"
      />
      <InputWrapper
        id="custom-formatted"
        label="Custom Formatted"
        type="number"
        formatPattern="custom"
        customFormat="##-##-##-##"
        placeholder="12-34-56-78"
      />
    </div>
  ),
};

export const ValidationExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <InputWrapper
        id="phone-example"
        label="Phone Number (Regex)"
        type="text"
        patternRgx="^[0-9]{10}$"
        patternErrorMessage="Please enter exactly 10 digits"
        helperText="Regex validation example"
        placeholder="1234567890"
      />
      <InputWrapper
        id="email-example"
        label="Email (Regex)"
        type="email"
        patternRgx="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
        patternErrorMessage="Please enter a valid email"
        helperText="Email validation example"
        placeholder="user@example.com"
      />
      <InputWrapper
        id="formatted-example"
        label="Formatted Input"
        type="number"
        formatPattern="credit-card"
        helperText="Format pattern example"
        placeholder="1234-5678-9012-3456"
      />
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    id: "full-width",
    label: "Full Width Input",
    fullWidth: true,
    placeholder: "This input takes the full width",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const ReadOnly: Story = {
  args: {
    id: "readonly",
    label: "Read Only Input",
    value: "This value cannot be edited",
    readOnly: true,
    helperText: "This field cannot be edited",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const WithLeftIcon: Story = {
  args: {
    id: "left-icon",
    label: "Input with Left Icon",
    iconLeft: "🔍",
    placeholder: "Search here...",
    helperText: "Icon on the left side",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const WithRightIcon: Story = {
  args: {
    id: "right-icon",
    label: "Input with Right Icon",
    iconRight: "✓",
    placeholder: "Enter text...",
    helperText: "Icon on the right side",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const WithBothIcons: Story = {
  args: {
    id: "both-icons",
    label: "Input with Both Icons",
    iconLeft: "🔍",
    iconRight: "✓",
    placeholder: "Search and validate...",
    helperText: "Icons on both sides",
  },
  render: (args) => <InputWrapper {...args} />,
};
