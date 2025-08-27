import React from "react";
import { QRCode } from "./qrcode";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof QRCode> = {
  title: "Atoms/QRCode",
  component: QRCode,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
    errorCorrectionLevel: {
      control: { type: "select" },
      options: ["L", "M", "Q", "H"],
    },
    width: {
      control: { type: "range", min: 100, max: 400, step: 50 },
    },
    height: {
      control: { type: "range", min: 100, max: 400, step: 50 },
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

type Story = StoryObj<typeof QRCode>;

export const Default: Story = {
  args: {
    value: "https://example.com",
    size: "md",
    width: 200,
    height: 200,
    errorCorrectionLevel: "M",
  },
};

export const URL: Story = {
  args: {
    value: "https://www.google.com",
    size: "md",
    width: 200,
    height: 200,
    errorCorrectionLevel: "M",
  },
};

export const Text: Story = {
  args: {
    value: "Hello World! This is a sample text for QR code generation.",
    size: "md",
    width: 200,
    height: 200,
    errorCorrectionLevel: "M",
  },
};

export const Email: Story = {
  args: {
    value: "mailto:user@example.com?subject=Hello&body=This is a test email",
    size: "md",
    width: 200,
    height: 200,
    errorCorrectionLevel: "M",
  },
};

export const Phone: Story = {
  args: {
    value: "tel:+1234567890",
    size: "md",
    width: 200,
    height: 200,
    errorCorrectionLevel: "M",
  },
};

export const WiFi: Story = {
  args: {
    value: "WIFI:S:MyNetwork;T:WPA;P:MyPassword;;",
    size: "md",
    width: 200,
    height: 200,
    errorCorrectionLevel: "M",
  },
};

export const VCard: Story = {
  args: {
    value: "BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nORG:Example Corp\nTEL:+1234567890\nEMAIL:john@example.com\nEND:VCARD",
    size: "md",
    width: 200,
    height: 200,
    errorCorrectionLevel: "M",
  },
};

export const SmallSize: Story = {
  args: {
    value: "https://example.com",
    size: "sm",
    width: 150,
    height: 150,
    errorCorrectionLevel: "M",
  },
};

export const LargeSize: Story = {
  args: {
    value: "https://example.com",
    size: "lg",
    width: 250,
    height: 250,
    errorCorrectionLevel: "M",
  },
};

export const ExtraLargeSize: Story = {
  args: {
    value: "https://example.com",
    size: "xl",
    width: 300,
    height: 300,
    errorCorrectionLevel: "M",
  },
};

export const ErrorCorrectionLevelL: Story = {
  args: {
    value: "https://example.com",
    size: "md",
    width: 200,
    height: 200,
    errorCorrectionLevel: "L",
  },
};

export const ErrorCorrectionLevelM: Story = {
  args: {
    value: "https://example.com",
    size: "md",
    width: 200,
    height: 200,
    errorCorrectionLevel: "M",
  },
};

export const ErrorCorrectionLevelQ: Story = {
  args: {
    value: "https://example.com",
    size: "md",
    width: 200,
    height: 200,
    errorCorrectionLevel: "Q",
  },
};

export const ErrorCorrectionLevelH: Story = {
  args: {
    value: "https://example.com",
    size: "md",
    width: 200,
    height: 200,
    errorCorrectionLevel: "H",
  },
};

export const CustomColors: Story = {
  args: {
    value: "https://example.com",
    size: "md",
    width: 200,
    height: 200,
    foregroundColor: "#2563eb",
    backgroundColor: "#f3f4f6",
    errorCorrectionLevel: "M",
  },
};

export const DarkTheme: Story = {
  args: {
    value: "https://example.com",
    size: "md",
    width: 200,
    height: 200,
    foregroundColor: "#ffffff",
    backgroundColor: "#1f2937",
    errorCorrectionLevel: "M",
  },
};

export const LongText: Story = {
  args: {
    value: "This is a very long text that will generate a more complex QR code. It contains multiple sentences and demonstrates how the QR code handles longer content. The error correction level becomes more important with longer content to ensure the code can still be read even if part of it is damaged or obscured.",
    size: "md",
    width: 200,
    height: 200,
    errorCorrectionLevel: "H",
  },
};

export const SpecialCharacters: Story = {
  args: {
    value: "Special chars: !@#$%^&*()_+-=[]{}|;':\",./<>?`~",
    size: "md",
    width: 200,
    height: 200,
    errorCorrectionLevel: "M",
  },
};

export const EmptyValue: Story = {
  args: {
    value: "",
    size: "md",
    width: 200,
    height: 200,
    errorCorrectionLevel: "M",
  },
};

export const AllErrorCorrectionLevels: Story = {
  render: () => {
    const levels = ["L", "M", "Q", "H"] as const;
    const levelDescriptions = {
      L: "Low (7% recovery)",
      M: "Medium (15% recovery)",
      Q: "Quartile (25% recovery)",
      H: "High (30% recovery)",
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {levels.map((level) => (
          <div key={level} className="flex flex-col items-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Level {level}</h3>
            <p className="text-xs text-gray-600 text-center">{levelDescriptions[level]}</p>
            <QRCode
              value="https://example.com"
              size="sm"
              width={150}
              height={150}
              errorCorrectionLevel={level}
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
      sm: { width: 150, height: 150, padding: "p-3" },
      md: { width: 200, height: 200, padding: "p-6" },
      lg: { width: 250, height: 250, padding: "p-8" },
      xl: { width: 300, height: 300, padding: "p-10" },
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-800 capitalize">{size}</h3>
            <QRCode
              value="https://example.com"
              size={size}
              width={sizeConfigs[size].width}
              height={sizeConfigs[size].height}
              errorCorrectionLevel="M"
            />
          </div>
        ))}
      </div>
    );
  },
};

export const DifferentContentTypes: Story = {
  render: () => {
    const contentTypes = [
      { label: "URL", value: "https://www.google.com" },
      { label: "Text", value: "Hello World! This is a sample text." },
      { label: "Email", value: "mailto:user@example.com" },
      { label: "Phone", value: "tel:+1234567890" },
      { label: "WiFi", value: "WIFI:S:MyNetwork;T:WPA;P:MyPassword;;" },
      { label: "VCard", value: "BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nORG:Example Corp\nEND:VCARD" },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {contentTypes.map((content) => (
          <div key={content.label} className="flex flex-col items-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">{content.label}</h3>
            <QRCode
              value={content.value}
              size="sm"
              width={150}
              height={150}
              errorCorrectionLevel="M"
            />
          </div>
        ))}
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState("https://example.com");
    const [errorCorrectionLevel, setErrorCorrectionLevel] = React.useState<"L" | "M" | "Q" | "H">("M");
    const [width, setWidth] = React.useState(200);
    const [height, setHeight] = React.useState(200);
    const [foregroundColor, setForegroundColor] = React.useState("#000000");
    const [backgroundColor, setBackgroundColor] = React.useState("#FFFFFF");

    return (
      <div className="flex flex-col items-center space-y-6 p-6 max-w-2xl">
        <div className="grid grid-cols-2 gap-4 w-full">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              QR Code Value
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter URL, text, or other content"
              aria-label="QR Code value input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Error Correction Level
            </label>
            <select
              value={errorCorrectionLevel}
              onChange={(e) => setErrorCorrectionLevel(e.target.value as "L" | "M" | "Q" | "H")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Error correction level selection"
            >
              <option value="L">L - Low (7% recovery)</option>
              <option value="M">M - Medium (15% recovery)</option>
              <option value="Q">Q - Quartile (25% recovery)</option>
              <option value="H">H - High (30% recovery)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Width: {width}px
            </label>
            <input
              type="range"
              min="100"
              max="400"
              step="50"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full"
              aria-label="QR Code width slider"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height: {height}px
            </label>
            <input
              type="range"
              min="100"
              max="400"
              step="50"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full"
              aria-label="QR Code height slider"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foreground Color
            </label>
            <input
              type="color"
              value={foregroundColor}
              onChange={(e) => setForegroundColor(e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-md"
              aria-label="QR Code foreground color picker"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-md"
              aria-label="QR Code background color picker"
            />
          </div>
        </div>

        <QRCode
          value={value}
          size="md"
          width={width}
          height={height}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
          errorCorrectionLevel={errorCorrectionLevel}
        />
      </div>
    );
  },
};
