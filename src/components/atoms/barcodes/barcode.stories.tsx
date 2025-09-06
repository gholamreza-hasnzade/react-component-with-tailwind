import type { Meta, StoryObj } from "@storybook/react-vite";
import { Barcode } from "./barcodes";

const meta: Meta<typeof Barcode> = {
  title: "Atoms/Barcode",
  component: Barcode,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A responsive barcode component that generates various barcode formats using JsBarcode library. Supports multiple formats, responsive design, and accessibility features.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "The value to encode in the barcode",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '""' },
      },
    },
    format: {
      control: "select",
      options: ["CODE128", "CODE39", "EAN13", "EAN8", "UPC"],
      description: "The barcode format to use",
      table: {
        type: { summary: "BarcodeFormat" },
        defaultValue: { summary: "CODE128" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "The size variant of the barcode container",
      table: {
        type: { summary: "sm | md | lg | xl" },
        defaultValue: { summary: "md" },
      },
    },
    width: {
      control: { type: "number", min: 100, max: 800, step: 50 },
      description: "The width of the barcode canvas",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "300" },
      },
    },
    height: {
      control: { type: "number", min: 50, max: 300, step: 10 },
      description: "The height of the barcode canvas",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "100" },
      },
    },
    foregroundColor: {
      control: "color",
      description: "The color of the barcode lines",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "#000000" },
      },
    },
    backgroundColor: {
      control: "color",
      description: "The background color of the barcode",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "#FFFFFF" },
      },
    },
    showText: {
      control: "boolean",
      description: "Whether to display the barcode value below the barcode",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    ariaLabel: {
      control: "text",
      description: "Accessibility label for screen readers",
      table: {
        type: { summary: "string" },
      },
    },
    onError: {
      action: "onError",
      description: "Callback function called when barcode generation fails",
      table: {
        type: { summary: "(error: string) => void" },
      },
    },
    onSuccess: {
      action: "onSuccess",
      description: "Callback function called when barcode generation succeeds",
      table: {
        type: { summary: "() => void" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Barcode>;

// Basic Examples
export const Default: Story = {
  args: {
    value: "123456789",
  },
};

export const WithCustomFormat: Story = {
  args: {
    value: "123456789",
    format: "CODE39",
  },
};

export const WithoutText: Story = {
  args: {
    value: "987654321",
    showText: false,
  },
};

export const CustomColors: Story = {
  args: {
    value: "555666777",
    foregroundColor: "#FF6B6B",
    backgroundColor: "#F7F7F7",
  },
};

// Size Variants
export const Small: Story = {
  args: {
    value: "123456789",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    value: "123456789",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    value: "123456789",
    size: "lg",
  },
};

export const ExtraLarge: Story = {
  args: {
    value: "123456789",
    size: "xl",
  },
};

// Format Examples
export const Code128: Story = {
  args: {
    value: "HELLO123",
    format: "CODE128",
  },
};

export const Code39: Story = {
  args: {
    value: "HELLO123",
    format: "CODE39",
  },
};

export const EAN13: Story = {
  args: {
    value: "123456789012",
    format: "EAN13",
  },
};

export const EAN8: Story = {
  args: {
    value: "1234567",
    format: "EAN8",
  },
};

export const UPC: Story = {
  args: {
    value: "12345678901",
    format: "UPC",
  },
};

// Responsive Examples
export const ResponsiveWidth: Story = {
  args: {
    value: "RESPONSIVE123",
    width: 400,
    height: 120,
  },
  parameters: {
    docs: {
      description: {
        story: "This barcode will automatically adjust its width based on screen size while maintaining aspect ratio.",
      },
    },
  },
};

export const MobileOptimized: Story = {
  args: {
    value: "MOBILE123",
    width: 280,
    height: 80,
    size: "sm",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "Optimized for mobile devices with smaller dimensions and padding.",
      },
    },
  },
};

// Error States
export const EmptyValue: Story = {
  args: {
    value: "",
  },
  parameters: {
    docs: {
      description: {
        story: "Shows the empty state when no value is provided.",
      },
    },
  },
};

export const InvalidEAN13: Story = {
  args: {
    value: "123",
    format: "EAN13",
  },
  parameters: {
    docs: {
      description: {
        story: "Shows error state when barcode format requirements are not met.",
      },
    },
  },
};

export const InvalidUPC: Story = {
  args: {
    value: "12345",
    format: "UPC",
  },
  parameters: {
    docs: {
      description: {
        story: "Shows error state for invalid UPC format.",
      },
    },
  },
};

// Accessibility Examples
export const WithAriaLabel: Story = {
  args: {
    value: "ACCESSIBLE123",
    ariaLabel: "Product barcode for item ACCESSIBLE123",
  },
  parameters: {
    docs: {
      description: {
        story: "Example with custom accessibility label for screen readers.",
      },
    },
  },
};

// Real-world Examples
export const ProductBarcode: Story = {
  args: {
    value: "123456789012",
    format: "EAN13",
    size: "lg",
    ariaLabel: "Product barcode",
  },
  parameters: {
    docs: {
      description: {
        story: "Example of a typical product barcode using EAN13 format.",
      },
    },
  },
};

export const InventoryCode: Story = {
  args: {
    value: "INV-2024-001",
    format: "CODE128",
    size: "md",
    foregroundColor: "#2563EB",
    ariaLabel: "Inventory code",
  },
  parameters: {
    docs: {
      description: {
        story: "Example of an inventory code using CODE128 format with custom styling.",
      },
    },
  },
};

export const SerialNumber: Story = {
  args: {
    value: "SN-ABC123XYZ",
    format: "CODE39",
    size: "sm",
    showText: true,
    ariaLabel: "Serial number barcode",
  },
  parameters: {
    docs: {
      description: {
        story: "Example of a serial number barcode with CODE39 format.",
      },
    },
  },
};

// Interactive Examples
export const Interactive: Story = {
  args: {
    value: "INTERACTIVE123",
    onError: (error) => console.log("Barcode error:", error),
    onSuccess: () => console.log("Barcode generated successfully"),
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive example with error and success callbacks. Check the console for callback messages.",
      },
    },
  },
};

// Custom Styling
export const CustomStyled: Story = {
  args: {
    value: "CUSTOM123",
    className: "border-2 border-blue-500 shadow-lg",
    foregroundColor: "#1E40AF",
    backgroundColor: "#EFF6FF",
  },
  parameters: {
    docs: {
      description: {
        story: "Example with custom styling using className prop.",
      },
    },
  },
};

// Long Text Handling
export const LongValue: Story = {
  args: {
    value: "This is a very long barcode value that should be handled properly by the component",
    format: "CODE128",
    size: "lg",
  },
  parameters: {
    docs: {
      description: {
        story: "Example showing how the component handles long barcode values with proper text wrapping.",
      },
    },
  },
};

// All Sizes Comparison
export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Small</h3>
        <Barcode value="123456789" size="sm" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Medium</h3>
        <Barcode value="123456789" size="md" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Large</h3>
        <Barcode value="123456789" size="lg" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Extra Large</h3>
        <Barcode value="123456789" size="xl" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of all available size variants.",
      },
    },
  },
};

// All Formats Comparison
export const FormatComparison: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">CODE128</h3>
        <Barcode value="HELLO123" format="CODE128" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">CODE39</h3>
        <Barcode value="HELLO123" format="CODE39" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">EAN13</h3>
        <Barcode value="123456789012" format="EAN13" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">EAN8</h3>
        <Barcode value="1234567" format="EAN8" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">UPC</h3>
        <Barcode value="12345678901" format="UPC" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of all available barcode formats.",
      },
    },
  },
};
