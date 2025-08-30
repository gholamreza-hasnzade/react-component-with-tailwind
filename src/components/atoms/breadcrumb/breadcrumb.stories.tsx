import React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Breadcrumb } from "./breadcrumb"
import { generateBreadcrumbItems, createBreadcrumbItems } from "./breadcrumb.utils"
import { ChevronRight, Slash, ArrowRight, Home, Folder, File } from "lucide-react"
import type { BreadcrumbItem } from "./breadcrumb"

const meta: Meta<typeof Breadcrumb> = {
  title: "Atoms/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A flexible breadcrumb navigation component with color variants, sizes, and truncation support."
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "minimal", "bordered", "filled", "gradient"],
      description: "Visual style variant of the breadcrumb"
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "error", "warning", "info"],
      description: "Color theme for the breadcrumb"
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the breadcrumb items"
    },
    maxItems: {
      control: { type: "number", min: 3, max: 10 },
      description: "Maximum number of items to show before truncating"
    },
    showHomeIcon: {
      control: { type: "boolean" },
      description: "Whether to show the home icon"
    },
    truncateLabels: {
      control: { type: "boolean" },
      description: "Whether to truncate long labels"
    },
  },
  args: {
    variant: "default",
    color: "primary",
    size: "md",
    maxItems: 5,
    showHomeIcon: true,
    truncateLabels: false,
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Sample breadcrumb data
const sampleItems = [
  { label: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
  { label: "Products", href: "/products", icon: <Folder className="h-4 w-4" /> },
  { label: "Electronics", href: "/products/electronics", icon: <Folder className="h-4 w-4" /> },
  { label: "Smartphones", href: "/products/electronics/smartphones", icon: <Folder className="h-4 w-4" /> },
  { label: "iPhone 15 Pro", href: "/products/electronics/smartphones/iphone-15-pro", icon: <File className="h-4 w-4" />, isCurrentPage: true }
]

const longPathItems = generateBreadcrumbItems("/admin/users/settings/preferences/notifications/email/templates")

export const Default: Story = {
  args: {
    items: sampleItems,
    separator: <ChevronRight className="h-4 w-4" />
  }
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Default Variant</h3>
        <Breadcrumb items={sampleItems} color="primary" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Minimal Variant</h3>
        <Breadcrumb items={sampleItems} variant="minimal" color="secondary" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Bordered Variant</h3>
        <Breadcrumb items={sampleItems} variant="bordered" color="success" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Filled Variant</h3>
        <Breadcrumb items={sampleItems} variant="filled" color="warning" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Gradient Variant</h3>
        <Breadcrumb items={sampleItems} variant="gradient" color="info" />
      </div>
    </div>
  )
}

export const AllColors: Story = {
  render: () => (
    <div className="space-y-4">
      <Breadcrumb items={sampleItems} color="primary" />
      <Breadcrumb items={sampleItems} color="secondary" />
      <Breadcrumb items={sampleItems} color="success" />
      <Breadcrumb items={sampleItems} color="error" />
      <Breadcrumb items={sampleItems} color="warning" />
      <Breadcrumb items={sampleItems} color="info" />
    </div>
  )
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Small</h3>
        <Breadcrumb items={sampleItems} size="sm" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Medium</h3>
        <Breadcrumb items={sampleItems} size="md" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Large</h3>
        <Breadcrumb items={sampleItems} size="lg" />
      </div>
    </div>
  )
}

export const CustomSeparators: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Chevron Right</h3>
        <Breadcrumb items={sampleItems} separator={<ChevronRight className="h-4 w-4" />} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Slash</h3>
        <Breadcrumb items={sampleItems} separator={<Slash className="h-4 w-4" />} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Arrow Right</h3>
        <Breadcrumb items={sampleItems} separator={<ArrowRight className="h-4 w-4" />} />
      </div>
    </div>
  )
}

export const Truncation: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">With Truncation (max 3 items)</h3>
        <Breadcrumb items={longPathItems} maxItems={3} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">With Truncation (max 4 items)</h3>
        <Breadcrumb items={longPathItems} maxItems={4} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">No Truncation</h3>
        <Breadcrumb items={longPathItems} maxItems={10} />
      </div>
    </div>
  )
}

export const WithoutHomeIcon: Story = {
  args: {
    items: sampleItems,
    showHomeIcon: false
  }
}

export const WithTruncatedLabels: Story = {
  args: {
    items: [
      { label: "This is a very long breadcrumb label that should be truncated", href: "/long-label" },
      { label: "Another extremely long label that exceeds the character limit", href: "/another-long-label" },
      { label: "Short", href: "/short" },
      { label: "Current Page with Very Long Label That Should Be Truncated", isCurrentPage: true }
    ],
    truncateLabels: true
  }
}

export const Interactive: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = React.useState("/products/electronics/smartphones")
    
    const handleItemClick = (item: BreadcrumbItem, index: number) => {
      console.log(`Clicked: ${item.label} at index ${index}`)
    }
    
    const items = generateBreadcrumbItems(currentPath, "/")
    
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentPath("/products")}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
          >
            Go to Products
          </button>
          <button 
            onClick={() => setCurrentPath("/products/electronics")}
            className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
          >
            Go to Electronics
          </button>
          <button 
            onClick={() => setCurrentPath("/products/electronics/smartphones")}
            className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
          >
            Go to Smartphones
          </button>
        </div>
        <Breadcrumb 
          items={items} 
          onItemClick={handleItemClick}
          color="primary"
          variant="bordered"
        />
      </div>
    )
  }
}

export const FileSystem: Story = {
  render: () => {
    const fileSystemItems = createBreadcrumbItems(
      ["Home", "Documents", "Projects", "React App", "src", "components", "Button.tsx"],
      "/",
      {
        "Home": <Home className="h-4 w-4" />,
        "Documents": <Folder className="h-4 w-4" />,
        "Projects": <Folder className="h-4 w-4" />,
        "React App": <Folder className="h-4 w-4" />,
        "src": <Folder className="h-4 w-4" />,
        "components": <Folder className="h-4 w-4" />,
        "Button.tsx": <File className="h-4 w-4" />
      }
    )
    
    return (
      <div className="space-y-4">
        <Breadcrumb 
          items={fileSystemItems} 
          color="info"
          variant="filled"
          separator={<Slash className="h-4 w-4" />}
        />
      </div>
    )
  }
}

export const RTLSupport: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Automatic Direction Detection</h3>
        <p className="text-xs text-gray-600 mb-2">
          The breadcrumb automatically detects the document direction from the HTML tag or body element.
          Add <code>dir="rtl"</code> to your HTML tag or body to test RTL support.
        </p>
        <Breadcrumb 
          items={sampleItems} 
          color="primary"
          variant="bordered"
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Current Document Direction</h3>
        <p className="text-xs text-gray-600">
          Current: <code>{document.documentElement.dir || document.body.dir || "ltr"}</code>
        </p>
      </div>
    </div>
  )
}

export const PopoverTruncation: Story = {
  render: () => {
    const longPathItems = generateBreadcrumbItems("/admin/users/settings/preferences/notifications/email/templates/advanced/customization")
    
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Click the ellipsis (⋯) to see the popover</h3>
          <p className="text-xs text-gray-600 mb-2">
            This breadcrumb has {longPathItems.length} items but only shows 3. 
            Click the ellipsis button to see hidden items in a popover.
          </p>
          <Breadcrumb 
            items={longPathItems} 
            maxItems={3}
            color="warning"
            variant="filled"
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Popover with Automatic RTL/LTR</h3>
          <p className="text-xs text-gray-600 mb-2">
            The popover automatically adjusts its position and text alignment based on document direction.
          </p>
          <Breadcrumb 
            items={longPathItems} 
            maxItems={3}
            color="info"
            variant="bordered"
          />
        </div>
      </div>
    )
  }
}

export const ArabicExample: Story = {
  render: () => {
    const arabicItems = [
      { label: "الرئيسية", href: "/", icon: <Home className="h-4 w-4" /> },
      { label: "المنتجات", href: "/products", icon: <Folder className="h-4 w-4" /> },
      { label: "الإلكترونيات", href: "/products/electronics", icon: <Folder className="h-4 w-4" /> },
      { label: "الهواتف الذكية", href: "/products/electronics/smartphones", icon: <Folder className="h-4 w-4" /> },
      { label: "آيفون 15 برو", href: "/products/electronics/smartphones/iphone-15-pro", icon: <File className="h-4 w-4" />, isCurrentPage: true }
    ]
    
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Arabic Text Example</h3>
          <p className="text-xs text-gray-600 mb-2">
            For Arabic text, add <code>dir="rtl"</code> to your HTML tag or body element.
            The breadcrumb will automatically adjust its layout and popover positioning.
          </p>
          <Breadcrumb 
            items={arabicItems} 
            color="primary"
            variant="bordered"
          />
        </div>
      </div>
    )
  }
}

