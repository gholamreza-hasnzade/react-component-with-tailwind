import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Breadcrumb } from "./breadcrumb";
import { generateBreadcrumbItems } from "./breadcrumb.utils";
import { 
  Home, 
  Folder, 
  File, 
  Settings, 
  User, 
  Package, 
  ChevronDown,
  Star
} from "lucide-react";

// Sample data for stories
const basicItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Electronics", href: "/products/electronics" },
  { label: "Smartphones", href: "/products/electronics/smartphones" },
  { label: "iPhone 15 Pro", isCurrentPage: true }
];

const itemsWithIcons = [
  { label: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
  { label: "Products", href: "/products", icon: <Package className="h-4 w-4" /> },
  { label: "Electronics", href: "/products/electronics", icon: <Folder className="h-4 w-4" /> },
  { label: "Smartphones", href: "/products/electronics/smartphones", icon: <Folder className="h-4 w-4" /> },
  { label: "iPhone 15 Pro", icon: <File className="h-4 w-4" />, isCurrentPage: true }
];

const longItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Electronics", href: "/products/electronics" },
  { label: "Computers", href: "/products/electronics/computers" },
  { label: "Laptops", href: "/products/electronics/computers/laptops" },
  { label: "Gaming Laptops", href: "/products/electronics/computers/laptops/gaming" },
  { label: "High Performance", href: "/products/electronics/computers/laptops/gaming/high-performance" },
  { label: "RTX 4090 Models", icon: <File className="h-4 w-4" />, isCurrentPage: true }
];

const adminItems = [
  { label: "Dashboard", href: "/admin", icon: <Settings className="h-4 w-4" /> },
  { label: "Users", href: "/admin/users", icon: <User className="h-4 w-4" /> },
  { label: "User Management", href: "/admin/users/management", icon: <User className="h-4 w-4" /> },
  { label: "Edit User", icon: <User className="h-4 w-4" />, isCurrentPage: true }
];

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Atoms/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A comprehensive breadcrumb navigation component with advanced features including multiple variants, size options, color themes, truncation, condensed menus, custom separators, RTL support, and full accessibility features.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: "object",
      description: "Array of breadcrumb items to display",
      table: {
        type: { summary: "BreadcrumbItem[]" },
        defaultValue: { summary: "[]" },
      },
    },
    variant: {
      control: "select",
      options: ["default", "minimal", "bordered", "filled", "gradient"],
      description: "Visual variant of the breadcrumb",
      table: {
        type: { summary: "default | minimal | bordered | filled | gradient" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the breadcrumb component",
      table: {
        type: { summary: "sm | md | lg" },
        defaultValue: { summary: "md" },
      },
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "warning", "info"],
      description: "Color theme for the breadcrumb",
      table: {
        type: { summary: "primary | secondary | success | error | warning | info" },
        defaultValue: { summary: "primary" },
      },
    },
    separator: {
      control: "text",
      description: "Custom separator element",
      table: {
        type: { summary: "React.ReactNode" },
        defaultValue: { summary: "<ChevronRight />" },
      },
    },
    maxItems: {
      control: { type: "number", min: 2, max: 10 },
      description: "Maximum number of items before truncation",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "5" },
      },
    },
    truncateLabels: {
      control: "boolean",
      description: "Whether to truncate long labels",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    condensed: {
      control: "boolean",
      description: "Enable condensed mode with dropdown menu",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    condensedThreshold: {
      control: { type: "number", min: 2, max: 10 },
      description: "Number of items before showing condensed menu",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "3" },
      },
    },
    showHomeIcon: {
      control: "boolean",
      description: "Show home icon at the beginning",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    homeHref: {
      control: "text",
      description: "Home link URL",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"/"' },
      },
    },
    dir: {
      control: "select",
      options: ["ltr", "rtl", "auto"],
      description: "Text direction (LTR/RTL)",
      table: {
        type: { summary: "ltr | rtl | auto" },
        defaultValue: { summary: "auto" },
      },
    },
    enableAnimations: {
      control: "boolean",
      description: "Enable animations and transitions",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    animationDuration: {
      control: { type: "number", min: 0, max: 1000 },
      description: "Duration of animations in milliseconds",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "200" },
      },
    },
    onItemClick: {
      action: "onItemClick",
      description: "Callback when breadcrumb item is clicked",
      table: {
        type: { summary: "(item: BreadcrumbItem, index: number) => void" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// Basic Examples
export const Default: Story = {
  args: {
    items: basicItems,
  },
};

export const WithIcons: Story = {
  args: {
    items: itemsWithIcons,
  },
  parameters: {
    docs: {
      description: {
        story: "Breadcrumb with icons for each item to improve visual hierarchy and user experience.",
      },
    },
  },
};

export const WithoutHomeIcon: Story = {
  args: {
    items: basicItems,
    showHomeIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Breadcrumb without the home icon at the beginning.",
      },
    },
  },
};

// Variant Examples
export const Minimal: Story = {
  args: {
    items: basicItems,
    variant: "minimal",
  },
};

export const Bordered: Story = {
  args: {
    items: basicItems,
    variant: "bordered",
  },
};

export const Filled: Story = {
  args: {
    items: basicItems,
    variant: "filled",
  },
};

export const Gradient: Story = {
  args: {
    items: basicItems,
    variant: "gradient",
  },
};

// Size Variants
export const Small: Story = {
  args: {
    items: basicItems,
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    items: basicItems,
    size: "md",
  },
};

export const Large: Story = {
  args: {
    items: basicItems,
    size: "lg",
  },
};

// Color Variants
export const Primary: Story = {
  args: {
    items: basicItems,
    color: "primary",
    variant: "bordered",
  },
};

export const Secondary: Story = {
  args: {
    items: basicItems,
    color: "secondary",
    variant: "bordered",
  },
};

export const Success: Story = {
  args: {
    items: basicItems,
    color: "success",
    variant: "bordered",
  },
};

export const Error: Story = {
  args: {
    items: basicItems,
    color: "error",
    variant: "bordered",
  },
};

export const Warning: Story = {
  args: {
    items: basicItems,
    color: "warning",
    variant: "bordered",
  },
};

export const Info: Story = {
  args: {
    items: basicItems,
    color: "info",
    variant: "bordered",
  },
};

// Custom Separators
export const SlashSeparator: Story = {
  args: {
    items: basicItems,
    separator: "/",
  },
  parameters: {
    docs: {
      description: {
        story: "Using a slash character as the separator between breadcrumb items.",
      },
    },
  },
};

export const ArrowSeparator: Story = {
  args: {
    items: basicItems,
    separator: "→",
  },
  parameters: {
    docs: {
      description: {
        story: "Using an arrow character as the separator between breadcrumb items.",
      },
    },
  },
};

export const DotSeparator: Story = {
  args: {
    items: basicItems,
    separator: "•",
  },
  parameters: {
    docs: {
      description: {
        story: "Using a dot character as the separator between breadcrumb items.",
      },
    },
  },
};

export const CustomIconSeparator: Story = {
  args: {
    items: basicItems,
    separator: <Star className="h-3 w-3 text-gray-400" />,
  },
  parameters: {
    docs: {
      description: {
        story: "Using a custom icon as the separator between breadcrumb items.",
      },
    },
  },
};

// Truncation and Long Paths
export const LongPath: Story = {
  args: {
    items: longItems,
    maxItems: 5,
    truncateLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Long breadcrumb path with automatic truncation when items exceed the maximum limit.",
      },
    },
  },
};

export const Truncated: Story = {
  args: {
    items: longItems,
    maxItems: 3,
    truncateLabels: true,
    variant: "bordered",
  },
  parameters: {
    docs: {
      description: {
        story: "Custom truncation settings with fewer maximum items displayed.",
      },
    },
  },
};

// Condensed Menu
export const CondensedMenu: Story = {
  args: {
    items: longItems,
    condensed: true,
    condensedThreshold: 3,
    showCondensedMenu: true,
    variant: "bordered",
  },
  parameters: {
    docs: {
      description: {
        story: "Condensed menu mode for long breadcrumb paths. When the number of items exceeds the threshold, a dropdown menu is shown with the middle items.",
      },
    },
  },
};

export const CondensedWithDifferentColors: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">Primary</h3>
        <Breadcrumb 
          items={longItems}
          condensed={true}
          condensedThreshold={3}
          showCondensedMenu={true}
          color="primary"
          variant="bordered"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">Success</h3>
        <Breadcrumb 
          items={longItems}
          condensed={true}
          condensedThreshold={3}
          showCondensedMenu={true}
          color="success"
          variant="bordered"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">Error</h3>
        <Breadcrumb 
          items={longItems}
          condensed={true}
          condensedThreshold={3}
          showCondensedMenu={true}
          color="error"
          variant="bordered"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Condensed menu with different color themes to match your design system.",
      },
    },
  },
};

// RTL Support
export const RTLSupport: Story = {
  args: {
    items: basicItems,
    dir: "rtl",
    variant: "bordered",
  },
  parameters: {
    docs: {
      description: {
        story: "Right-to-left (RTL) language support. The breadcrumb automatically adjusts layout and separator direction for RTL languages.",
      },
    },
  },
};

export const RTLCondensed: Story = {
  args: {
    items: longItems,
    dir: "rtl",
    condensed: true,
    condensedThreshold: 3,
    showCondensedMenu: true,
    variant: "filled",
    color: "warning",
  },
  parameters: {
    docs: {
      description: {
        story: "RTL support with condensed menu for complex navigation hierarchies.",
      },
    },
  },
};

// Custom Styling
export const CustomStyled: Story = {
  args: {
    items: basicItems,
    variant: "bordered",
    customClassName: {
      container: "bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border-2 border-blue-200",
      list: "gap-3",
      item: "bg-white rounded-lg px-3 py-1 shadow-sm",
      link: "hover:bg-blue-100 rounded-md px-2 py-1 transition-all duration-300",
      page: "font-bold text-purple-700",
      separator: "text-blue-400 font-bold"
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Example with custom styling using the customClassName prop for extensive customization.",
      },
    },
  },
};

export const CustomItemRenderer: Story = {
  args: {
    items: basicItems,
    customItemRenderer: (item, index, isLast) => (
      <div key={`${item.label}-${index}`} className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className={`font-medium ${isLast ? 'text-green-700' : 'text-gray-600'}`}>
          {item.label}
        </span>
        {!isLast && <span className="text-gray-400">→</span>}
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Custom item renderer for complete control over how each breadcrumb item is displayed.",
      },
    },
  },
};

// Animation Examples
export const FastAnimations: Story = {
  args: {
    items: basicItems,
    animationDuration: 100,
    enableAnimations: true,
    variant: "bordered",
  },
  parameters: {
    docs: {
      description: {
        story: "Fast animations with 100ms duration for quick transitions.",
      },
    },
  },
};

export const SlowAnimations: Story = {
  args: {
    items: basicItems,
    animationDuration: 500,
    enableAnimations: true,
    variant: "filled",
  },
  parameters: {
    docs: {
      description: {
        story: "Slow animations with 500ms duration for smooth, noticeable transitions.",
      },
    },
  },
};

export const NoAnimations: Story = {
  args: {
    items: basicItems,
    enableAnimations: false,
    variant: "minimal",
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled animations for better performance or accessibility preferences.",
      },
    },
  },
};

// Custom Menu Examples
export const CustomMenuTrigger: Story = {
  args: {
    items: longItems,
    condensed: true,
    condensedThreshold: 3,
    customMenuTrigger: (
      <button className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors">
        <span className="text-sm font-medium">More</span>
        <ChevronDown className="h-3 w-3" />
      </button>
    ),
    variant: "bordered",
  },
  parameters: {
    docs: {
      description: {
        story: "Custom menu trigger button for the condensed menu with custom styling.",
      },
    },
  },
};

export const CustomMenuContent: Story = {
  args: {
    items: longItems,
    condensed: true,
    condensedThreshold: 3,
    customMenuContent: (
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-2 min-w-[250px]">
        <div className="text-xs font-semibold text-purple-600 mb-2">Navigation Menu</div>
        {longItems.slice(1, -1).map((item, index) => (
          <div key={index} className="flex items-center gap-2 p-2 hover:bg-purple-100 rounded cursor-pointer">
            <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
            <span className="text-sm text-purple-700">{item.label}</span>
          </div>
        ))}
      </div>
    ),
    menuPosition: "bottom",
    menuAlignment: "center",
    variant: "bordered",
  },
  parameters: {
    docs: {
      description: {
        story: "Custom menu content with completely custom styling and layout for the condensed menu.",
      },
    },
  },
};

// Menu Positioning
export const MenuPositioning: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">Menu on Top</h3>
        <Breadcrumb 
          items={longItems}
          condensed={true}
          condensedThreshold={3}
          menuPosition="top"
          menuAlignment="center"
          variant="bordered"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">Menu on Right</h3>
        <Breadcrumb 
          items={longItems}
          condensed={true}
          condensedThreshold={3}
          menuPosition="right"
          menuAlignment="start"
          variant="filled"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different menu positioning options for the condensed dropdown menu.",
      },
    },
  },
};

// Separator Positioning
export const SeparatorPositioning: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">After (Default)</h3>
        <Breadcrumb 
          items={basicItems}
          separatorPosition="after"
          customSeparator="⭐"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">Both</h3>
        <Breadcrumb 
          items={basicItems}
          separatorPosition="both"
          customSeparator="•"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">None</h3>
        <Breadcrumb 
          items={basicItems}
          separatorPosition="none"
          variant="bordered"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different separator positioning options for customizing the appearance of separators.",
      },
    },
  },
};

// Custom Home Configuration
export const CustomHome: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">Custom Home Icon</h3>
        <Breadcrumb 
          items={basicItems}
          customHomeIcon={<Settings className="h-4 w-4" />}
          customHomeLabel="Dashboard"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">Custom Home with Different Icon</h3>
        <Breadcrumb 
          items={basicItems}
          customHomeIcon={<User className="h-4 w-4" />}
          customHomeLabel="Profile"
          homeHref="/profile"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Custom home icon and label configuration for different use cases.",
      },
    },
  },
};

// Real-world Examples
export const EcommerceExample: Story = {
  args: {
    items: itemsWithIcons,
    variant: "bordered",
    color: "primary",
    showHomeIcon: true,
    homeHref: "/",
  },
  parameters: {
    docs: {
      description: {
        story: "Example of a typical e-commerce breadcrumb with icons and proper navigation structure.",
      },
    },
  },
};

export const AdminPanelExample: Story = {
  args: {
    items: adminItems,
    variant: "minimal",
    size: "sm",
    color: "secondary",
    showHomeIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Example of an admin panel breadcrumb with minimal styling and no home icon.",
      },
    },
  },
};

export const DocumentationExample: Story = {
  args: {
    items: [
      { label: "Docs", href: "/docs", icon: <File className="h-4 w-4" /> },
      { label: "Components", href: "/docs/components", icon: <Folder className="h-4 w-4" /> },
      { label: "Breadcrumb", icon: <File className="h-4 w-4" />, isCurrentPage: true }
    ],
    variant: "gradient",
    color: "info",
    showHomeIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Example of a documentation breadcrumb with gradient styling and file/folder icons.",
      },
    },
  },
};

// Interactive Examples
export const Interactive: Story = {
  args: {
    items: basicItems,
    variant: "bordered",
    onItemClick: (item: { label: string; href?: string }, index: number) => console.log("onItemClick", item, index),
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive example with click handlers. Check the console for click events.",
      },
    },
  },
};

// Accessibility Examples
export const AccessibilityFeatures: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium mb-2 text-blue-900">Built-in Accessibility Features</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Proper ARIA labels and roles</li>
          <li>• Keyboard navigation support</li>
          <li>• Screen reader friendly</li>
          <li>• Focus management with visible focus rings</li>
          <li>• Semantic HTML structure</li>
          <li>• Current page indication</li>
          <li>• Condensed menu with dropdown accessibility</li>
          <li>• Click-outside-to-close functionality</li>
          <li>• Escape key support for menu closing</li>
        </ul>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Accessible Breadcrumb Example</h3>
        <Breadcrumb 
          items={basicItems}
          variant="bordered"
          onItemClick={(item: { label: string; href?: string }, index: number) => console.log("onItemClick", item, index)}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comprehensive accessibility features built into the breadcrumb component for screen readers and keyboard navigation.",
      },
    },
  },
};

// Dynamic Path Generation
export const DynamicPathGeneration: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = React.useState("/products/electronics/smartphones/iphone-15");
    const [customLabels, setCustomLabels] = React.useState({
      "products": "Products",
      "electronics": "Electronics",
      "smartphones": "Smartphones",
      "iphone-15": "iPhone 15"
    });

    const handlePathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPath(event.target.value);
    };

    const handleLabelChange = (key: string, value: string) => {
      setCustomLabels(prev => ({ ...prev, [key]: value }));
    };

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Path:
          </label>
          <input
            type="text"
            value={currentPath}
            onChange={handlePathChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a path like /products/electronics/smartphones"
          />
        </div>
        
        <Breadcrumb 
          items={generateBreadcrumbItems(currentPath, "/", customLabels)}
          variant="bordered"
          color="primary"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Products</label>
            <input
              type="text"
              value={customLabels.products || ""}
              onChange={(e) => handleLabelChange("products", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter custom label for products"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Electronics</label>
            <input
              type="text"
              value={customLabels.electronics || ""}
              onChange={(e) => handleLabelChange("electronics", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter custom label for electronics"
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive example showing how to generate breadcrumb items dynamically from URL paths. Use the utility function `generateBreadcrumbItems` to convert paths into breadcrumb items with custom labels.",
      },
    },
  },
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">All Variants</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Default</h3>
          <Breadcrumb items={basicItems} variant="default" />
        </div>
        <div>
          <h3 className="font-medium mb-2">Minimal</h3>
          <Breadcrumb items={basicItems} variant="minimal" />
        </div>
        <div>
          <h3 className="font-medium mb-2">Bordered</h3>
          <Breadcrumb items={basicItems} variant="bordered" />
        </div>
        <div>
          <h3 className="font-medium mb-2">Filled</h3>
          <Breadcrumb items={basicItems} variant="filled" />
        </div>
        <div>
          <h3 className="font-medium mb-2">Gradient</h3>
          <Breadcrumb items={basicItems} variant="gradient" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of all available visual variants.",
      },
    },
  },
};

// All Colors Showcase
export const AllColors: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">All Colors</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Primary</h3>
          <Breadcrumb items={basicItems} variant="bordered" color="primary" />
        </div>
        <div>
          <h3 className="font-medium mb-2">Secondary</h3>
          <Breadcrumb items={basicItems} variant="bordered" color="secondary" />
        </div>
        <div>
          <h3 className="font-medium mb-2">Success</h3>
          <Breadcrumb items={basicItems} variant="bordered" color="success" />
        </div>
        <div>
          <h3 className="font-medium mb-2">Error</h3>
          <Breadcrumb items={basicItems} variant="bordered" color="error" />
        </div>
        <div>
          <h3 className="font-medium mb-2">Warning</h3>
          <Breadcrumb items={basicItems} variant="bordered" color="warning" />
        </div>
        <div>
          <h3 className="font-medium mb-2">Info</h3>
          <Breadcrumb items={basicItems} variant="bordered" color="info" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of all available color themes.",
      },
    },
  },
};

// All Sizes Showcase
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">All Sizes</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Small</h3>
          <Breadcrumb items={basicItems} variant="bordered" size="sm" />
        </div>
        <div>
          <h3 className="font-medium mb-2">Medium</h3>
          <Breadcrumb items={basicItems} variant="bordered" size="md" />
        </div>
        <div>
          <h3 className="font-medium mb-2">Large</h3>
          <Breadcrumb items={basicItems} variant="bordered" size="lg" />
        </div>
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