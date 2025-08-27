import React, { useState } from "react";
import { Dialog, ConfirmDialog, AlertDialog } from "./dialog";
import { Button } from "../button/button";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Dialog> = {
  title: "Atoms/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A versatile dialog component with multiple variants, sizes, positions, and built-in confirm/alert dialogs.",
      },
    },
  },
  argTypes: {
    isOpen: {
      control: { type: "boolean" },
      description: "Whether the dialog is open",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl", "full"],
      description: "The size of the dialog",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "success", "warning", "error", "info"],
      description: "The visual variant of the dialog",
    },
    position: {
      control: { type: "select" },
      options: ["center", "top", "bottom", "left", "right", "top-left", "top-right", "bottom-left", "bottom-right"],
      description: "The position of the dialog on screen",
    },
    showCloseButton: {
      control: { type: "boolean" },
      description: "Whether to show the close button",
    },
    closeOnOverlayClick: {
      control: { type: "boolean" },
      description: "Whether clicking overlay closes the dialog",
    },
    closeOnEscape: {
      control: { type: "boolean" },
      description: "Whether pressing Escape closes the dialog",
    },
    preventScroll: {
      control: { type: "boolean" },
      description: "Whether to prevent body scroll when open",
    },
    showIcon: {
      control: { type: "boolean" },
      description: "Whether to show the variant icon",
    },
    mobileFullScreen: {
      control: { type: "boolean" },
      description: "Whether to show full screen on mobile",
    },
    tabletFullScreen: {
      control: { type: "boolean" },
      description: "Whether to show full screen on tablet",
    },
    showAnimation: {
      control: { type: "boolean" },
      description: "Whether to show open/close animations",
    },
    animationDuration: {
      control: { type: "range", min: 100, max: 500, step: 50 },
      description: "Animation duration in milliseconds",
    },
  },
  args: {
    isOpen: false,
    title: "Dialog Title",
    children: "This is the dialog content. You can put any React components here.",
    size: "md",
    variant: "default",
    position: "center",
    showCloseButton: true,
    closeOnOverlayClick: true,
    closeOnEscape: true,
    preventScroll: true,
    showIcon: false,
    mobileFullScreen: false,
    tabletFullScreen: false,
    showAnimation: true,
    animationDuration: 200,
  },
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="flex flex-col gap-4 items-center">
        <Button onClick={() => setIsOpen(true)}>
          Open Dialog
        </Button>
        <Dialog {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const [openSize, setOpenSize] = useState<string | null>(null);
    const sizes = ["sm", "md", "lg", "xl", "full"] as const;
    
    return (
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-3 flex-wrap justify-center">
          {sizes.map((size) => (
            <Button key={size} onClick={() => setOpenSize(size)}>
              {size.toUpperCase()} Size
            </Button>
          ))}
        </div>
        
        {sizes.map((size) => (
          <Dialog
            key={size}
            isOpen={openSize === size}
            onClose={() => setOpenSize(null)}
            title={`${size.toUpperCase()} Dialog`}
            size={size}
          >
            <div className="space-y-4">
              <p>This is a {size} sized dialog with some sample content.</p>
              <p>You can put forms, lists, or any other content here.</p>
              <div className="bg-gray-100 p-4 rounded">
                <p className="text-sm text-gray-600">Sample content area</p>
              </div>
            </div>
          </Dialog>
        ))}
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const [openVariant, setOpenVariant] = useState<string | null>(null);
    const variants = ["default", "success", "warning", "error", "info"] as const;
    
    return (
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-3 flex-wrap justify-center">
          {variants.map((variant) => (
            <Button 
              key={variant} 
              onClick={() => setOpenVariant(variant)}
              color={variant === "default" ? "primary" : variant}
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Button>
          ))}
        </div>
        
        {variants.map((variant) => (
          <Dialog
            key={variant}
            isOpen={openVariant === variant}
            onClose={() => setOpenVariant(null)}
            title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Dialog`}
            variant={variant}
            showIcon
          >
            <div className="space-y-4">
              <p>This is a {variant} variant dialog with an icon.</p>
              <p>The header and border colors change based on the variant.</p>
            </div>
          </Dialog>
        ))}
      </div>
    );
  },
};

export const AllPositions: Story = {
  render: () => {
    const [openPosition, setOpenPosition] = useState<string | null>(null);
    const positions = ["center", "top", "bottom", "left", "right", "top-left", "top-right", "bottom-left", "bottom-right"] as const;
    
    return (
      <div className="flex flex-col gap-4 items-center">
        <div className="grid grid-cols-3 gap-3 max-w-2xl">
          {positions.map((position) => (
            <Button 
              key={position} 
              onClick={() => setOpenPosition(position)}
              size="sm"
            >
              {position.replace("-", " ")}
            </Button>
          ))}
        </div>
        
        {positions.map((position) => (
          <Dialog
            key={position}
            isOpen={openPosition === position}
            onClose={() => setOpenPosition(null)}
            title={`${position.replace("-", " ")} Position`}
            position={position}
            size="md"
          >
            <div className="space-y-4">
              <p>This dialog is positioned at: <strong>{position}</strong></p>
              <p>Try different positions to see how the dialog appears on screen.</p>
            </div>
          </Dialog>
        ))}
      </div>
    );
  },
};

export const WithActions: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="flex flex-col gap-4 items-center">
        <Button onClick={() => setIsOpen(true)}>
          Open Dialog with Actions
        </Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Dialog with Actions"
          actions={
            <>
              <Button variant="outlined" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>
                Save Changes
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <p>This dialog has action buttons in the footer.</p>
            <p>You can add any buttons or components as actions.</p>
          </div>
        </Dialog>
      </div>
    );
  },
};

export const WithCustomIcon: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="flex flex-col gap-4 items-center">
        <Button onClick={() => setIsOpen(true)}>
          Open Dialog with Custom Icon
        </Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Custom Icon Dialog"
          icon={<span className="text-2xl">🚀</span>}
          showIcon
        >
          <div className="space-y-4">
            <p>This dialog uses a custom icon instead of the default variant icon.</p>
            <p>You can pass any React component as the icon prop.</p>
          </div>
        </Dialog>
      </div>
    );
  },
};

export const FormDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "" });
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Form submitted:", formData);
      setIsOpen(false);
    };
    
    return (
      <div className="flex flex-col gap-4 items-center">
        <Button onClick={() => setIsOpen(true)}>
          Open Form Dialog
        </Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="User Registration"
          size="lg"
          actions={
            <>
              <Button variant="outlined" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" form="user-form">
                Register
              </Button>
            </>
          }
        >
          <form id="user-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                aria-label="User name input"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                aria-label="User email input"
                placeholder="Enter your email"
              />
            </div>
          </form>
        </Dialog>
      </div>
    );
  },
};

export const ResponsiveDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="flex flex-col gap-4 items-center">
        <Button onClick={() => setIsOpen(true)}>
          Open Responsive Dialog
        </Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Responsive Dialog"
          size="lg"
          mobileFullScreen
          tabletFullScreen
        >
          <div className="space-y-4">
            <p>This dialog adapts to different screen sizes:</p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li><strong>Mobile:</strong> Full screen with no margins</li>
              <li><strong>Tablet:</strong> Full screen with no margins</li>
              <li><strong>Desktop:</strong> Normal size with margins</li>
            </ul>
            <p>Resize your browser window to see the difference!</p>
          </div>
        </Dialog>
      </div>
    );
  },
};

export const ConfirmDialogExample: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [confirmCount, setConfirmCount] = useState(0);
    
    const handleConfirm = () => {
      setConfirmCount(prev => prev + 1);
    };
    
    return (
      <div className="flex flex-col gap-4 items-center">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">Confirmations: {confirmCount}</p>
          <Button onClick={() => setIsOpen(true)}>
            Delete Item
          </Button>
        </div>
        
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
          title="Delete Confirmation"
          message="Are you sure you want to delete this item? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          variant="error"
        />
      </div>
    );
  },
};

export const AlertDialogExample: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [alertType, setAlertType] = useState<"success" | "warning" | "error" | "info">("info");
    
    return (
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-3 flex-wrap justify-center">
          <Button onClick={() => { setAlertType("success"); setIsOpen(true); }} color="success">
            Success Alert
          </Button>
          <Button onClick={() => { setAlertType("warning"); setIsOpen(true); }} color="warning">
            Warning Alert
          </Button>
          <Button onClick={() => { setAlertType("error"); setIsOpen(true); }} color="error">
            Error Alert
          </Button>
          <Button onClick={() => { setAlertType("info"); setIsOpen(true); }} color="info">
            Info Alert
          </Button>
        </div>
        
        <AlertDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={`${alertType.charAt(0).toUpperCase() + alertType.slice(1)} Alert`}
          message={`This is a ${alertType} alert message. It provides important information to the user.`}
          variant={alertType}
        />
      </div>
    );
  },
};

export const NoAnimation: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="flex flex-col gap-4 items-center">
        <Button onClick={() => setIsOpen(true)}>
          Open Dialog (No Animation)
        </Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="No Animation Dialog"
          showAnimation={false}
        >
          <div className="space-y-4">
            <p>This dialog opens and closes without any animations.</p>
            <p>Useful for performance-critical applications or when you want instant feedback.</p>
          </div>
        </Dialog>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="flex flex-col gap-4 items-center">
        <Button onClick={() => setIsOpen(true)}>
          Open Custom Styled Dialog
        </Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Custom Styled Dialog"
          className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200"
          overlayClassName="bg-purple-900/30 backdrop-blur-md"
          headerClassName="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-purple-400"
          bodyClassName="text-gray-800"
          footerClassName="bg-gray-50 border-gray-200"
        >
          <div className="space-y-4">
            <p>This dialog uses custom CSS classes for unique styling.</p>
            <p>You can override any part of the dialog with custom classes.</p>
          </div>
        </Dialog>
      </div>
    );
  },
};

export const Usage: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-2xl text-left" dir="ltr">
      <h4 className="text-lg font-semibold">Code Examples</h4>
      
      <div className="space-y-4">
        <div>
          <h5 className="font-medium text-gray-800 mb-2">Basic Dialog</h5>
          <pre className="text-sm bg-gray-50 p-3 rounded-md overflow-x-auto">
{`import { Dialog } from "./dialog";

const [isOpen, setIsOpen] = useState(false);

<Dialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="My Dialog"
>
  <p>Dialog content goes here</p>
</Dialog>`}
          </pre>
        </div>

        <div>
          <h5 className="font-medium text-gray-800 mb-2">With Actions</h5>
          <pre className="text-sm bg-gray-50 p-3 rounded-md overflow-x-auto">
{`<Dialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  actions={
    <>
      <Button variant="outlined" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleConfirm}>
        Confirm
      </Button>
    </>
  }
>
  <p>Are you sure?</p>
</Dialog>`}
          </pre>
        </div>

        <div>
          <h5 className="font-medium text-gray-800 mb-2">Built-in Dialogs</h5>
          <pre className="text-sm bg-gray-50 p-3 rounded-md overflow-x-auto">
{`import { ConfirmDialog, AlertDialog } from "./dialog";

// Confirmation dialog
<ConfirmDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleConfirm}
  title="Delete Item"
  message="Are you sure?"
  variant="error"
/>

// Alert dialog
<AlertDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Success"
  message="Operation completed successfully!"
  variant="success"
/>`}
          </pre>
        </div>

        <div>
          <h5 className="font-medium text-gray-800 mb-2">Advanced Options</h5>
          <pre className="text-sm bg-gray-50 p-3 rounded-md overflow-x-auto">
{`<Dialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Advanced Dialog"
  size="xl"
  variant="success"
  position="top"
  showIcon
  mobileFullScreen
  showAnimation={false}
  className="custom-dialog-class"
>
  <p>Advanced dialog with many options</p>
</Dialog>`}
          </pre>
        </div>
      </div>
    </div>
  ),
};
