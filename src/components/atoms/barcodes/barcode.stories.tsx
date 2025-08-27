import React from "react";
import { Barcode } from "./barcodes";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Barcode> = {
  title: "Atoms/Barcode",
  component: Barcode,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    format: {
      control: { type: "select" },
      options: ["CODE128", "CODE39", "EAN13", "EAN8", "UPC"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
    showText: {
      control: { type: "boolean" },
    },
    width: {
      control: { type: "range", min: 100, max: 600, step: 50 },
    },
    height: {
      control: { type: "range", min: 50, max: 200, step: 10 },
    },
    foregroundColor: {
      control: { type: "color" },
    },
    backgroundColor: {
      control: { type: "color" },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Barcode>;

export const Default: Story = {
  args: {
    value: "123456789",
    format: "CODE128",
    size: "md",
    width: 300,
    height: 100,
    showText: true,
  },
};

export const CODE128: Story = {
  args: {
    value: "123456789",
    format: "CODE128",
    size: "md",
    width: 300,
    height: 100,
    showText: true,
  },
};

export const CODE39: Story = {
  args: {
    value: "123456789",
    format: "CODE39",
    size: "md",
    width: 300,
    height: 100,
    showText: true,
  },
};

export const EAN13: Story = {
  args: {
    value: "1234567890123",
    format: "EAN13",
    size: "md",
    width: 300,
    height: 100,
    showText: true,
  },
};

export const EAN8: Story = {
  args: {
    value: "12345678",
    format: "EAN8",
    size: "md",
    width: 300,
    height: 100,
    showText: true,
  },
};

export const UPC: Story = {
  args: {
    value: "123456789012",
    format: "UPC",
    size: "md",
    width: 300,
    height: 100,
    showText: true,
  },
};

export const SmallSize: Story = {
  args: {
    value: "123456789",
    format: "CODE128",
    size: "sm",
    width: 200,
    height: 80,
    showText: true,
  },
};

export const LargeSize: Story = {
  args: {
    value: "123456789",
    format: "CODE128",
    size: "lg",
    width: 400,
    height: 120,
    showText: true,
  },
};

export const ExtraLargeSize: Story = {
  args: {
    value: "123456789",
    format: "CODE128",
    size: "xl",
    width: 500,
    height: 150,
    showText: true,
  },
};

export const WithoutText: Story = {
  args: {
    value: "123456789",
    format: "CODE128",
    size: "md",
    width: 300,
    height: 100,
    showText: false,
  },
};

export const CustomColors: Story = {
  args: {
    value: "123456789",
    format: "CODE128",
    size: "md",
    width: 300,
    height: 100,
    foregroundColor: "#2563eb",
    backgroundColor: "#f3f4f6",
    showText: true,
  },
};

export const DarkTheme: Story = {
  args: {
    value: "123456789",
    format: "CODE128",
    size: "md",
    width: 300,
    height: 100,
    foregroundColor: "#ffffff",
    backgroundColor: "#1f2937",
    showText: true,
  },
};

export const LongValue: Story = {
  args: {
    value: "This is a very long barcode value that demonstrates text wrapping and overflow handling",
    format: "CODE128",
    size: "md",
    width: 300,
    height: 100,
    showText: true,
  },
};

export const SpecialCharacters: Story = {
  args: {
    value: "ABC-123_456@789",
    format: "CODE128",
    size: "md",
    width: 300,
    height: 100,
    showText: true,
  },
};

export const EmptyValue: Story = {
  args: {
    value: "",
    format: "CODE128",
    size: "md",
    width: 300,
    height: 100,
    showText: true,
  },
};

export const AllFormats: Story = {
  render: () => {
    const formats = ["CODE128", "CODE39", "EAN13", "EAN8", "UPC"] as const;
    const sampleValues = {
      CODE128: "123456789",
      CODE39: "123456789",
      EAN13: "1234567890123",
      EAN8: "12345678",
      UPC: "123456789012",
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {formats.map((format) => (
          <div key={format} className="flex flex-col items-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">{format}</h3>
            <Barcode
              value={sampleValues[format]}
              format={format}
              size="sm"
              width={250}
              height={80}
              showText={true}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const sizes = ["sm", "md", "lg", "xl"] as const;
    const sizeConfigs = {
      sm: { width: 200, height: 80, padding: "p-3" },
      md: { width: 300, height: 100, padding: "p-6" },
      lg: { width: 400, height: 120, padding: "p-8" },
      xl: { width: 500, height: 150, padding: "p-10" },
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-800 capitalize">{size}</h3>
            <Barcode
              value="123456789"
              format="CODE128"
              size={size}
              width={sizeConfigs[size].width}
              height={sizeConfigs[size].height}
              showText={true}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState("123456789");
    const [format, setFormat] = React.useState<"CODE128" | "CODE39" | "EAN13" | "EAN8" | "UPC">("CODE128");
    const [showText, setShowText] = React.useState(true);
    const [width, setWidth] = React.useState(300);
    const [height, setHeight] = React.useState(100);

    return (
      <div className="flex flex-col items-center space-y-6 p-6 max-w-2xl">
        <div className="grid grid-cols-2 gap-4 w-full">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Barcode Value
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter barcode value"
              aria-label="Barcode value input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as "CODE128" | "CODE39" | "EAN13" | "EAN8" | "UPC")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Barcode format selection"
            >
              <option value="CODE128">CODE128</option>
              <option value="CODE39">CODE39</option>
              <option value="EAN13">EAN13</option>
              <option value="EAN8">EAN8</option>
              <option value="UPC">UPC</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Width: {width}px
            </label>
            <input
              type="range"
              min="100"
              max="600"
              step="50"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full"
              aria-label="Barcode width slider"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height: {height}px
            </label>
            <input
              type="range"
              min="50"
              max="200"
              step="10"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full"
              aria-label="Barcode height slider"
            />
          </div>
          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showText}
                onChange={(e) => setShowText(e.target.checked)}
                className="mr-2"
                aria-label="Toggle barcode text display"
              />
              <span className="text-sm font-medium text-gray-700">Show Text</span>
            </label>
          </div>
        </div>

        <Barcode
          value={value}
          format={format}
          size="md"
          width={width}
          height={height}
          showText={showText}
        />
      </div>
    );
  },
};
