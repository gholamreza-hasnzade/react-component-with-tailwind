import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, AlertSuccess, AlertError, AlertWarning, AlertInfo } from "./alert";
import { Bell, Heart, Star, Zap, Shield, Mail } from "lucide-react";

const meta: Meta<typeof Alert> = {
  title: "Components/Atoms/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A flexible alert component with multiple variants, sizes, and features including dismissible functionality, custom icons, animations, and RTL support.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "success", "warning", "info"],
      description: "Visual variant of the alert",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the alert",
    },
    title: {
      control: "text",
      description: "Title text for the alert",
    },
    description: {
      control: "text",
      description: "Description text for the alert",
    },
    dismissible: {
      control: "boolean",
      description: "Whether the alert can be dismissed",
    },
    showIcon: {
      control: "boolean",
      description: "Whether to show the default icon",
    },
    animated: {
      control: "boolean",
      description: "Whether to animate the alert",
    },
    animationDuration: {
      control: { type: "number", min: 100, max: 1000, step: 50 },
      description: "Animation duration in milliseconds",
    },
    dir: {
      control: "select",
      options: ["ltr", "rtl", "auto"],
      description: "Text direction",
    },
  },
  args: {
    variant: "default",
    size: "md",
    dismissible: false,
    showIcon: true,
    animated: true,
    animationDuration: 300,
    dir: "auto",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Variants
export const Default: Story = {
  args: {
    title: "Default Alert",
    description: "This is a default alert with standard styling.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success!",
    description: "Your action was completed successfully.",
  },
};

export const Error: Story = {
  args: {
    variant: "destructive",
    title: "Error",
    description: "Something went wrong. Please try again.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    description: "Please review your input before proceeding.",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Information",
    description: "Here's some helpful information for you.",
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: "sm",
    title: "Small Alert",
    description: "This is a small-sized alert.",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    title: "Medium Alert",
    description: "This is a medium-sized alert (default).",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    title: "Large Alert",
    description: "This is a large-sized alert.",
  },
};

// Dismissible
export const Dismissible: Story = {
  args: {
    variant: "info",
    title: "Dismissible Alert",
    description: "You can close this alert by clicking the X button.",
    dismissible: true,
  },
};

export const DismissibleSuccess: Story = {
  args: {
    variant: "success",
    title: "Task Completed",
    description: "Your task has been completed successfully. You can dismiss this alert.",
    dismissible: true,
  },
};

// Custom Icons
export const CustomIcon: Story = {
  args: {
    variant: "info",
    title: "Custom Icon",
    description: "This alert uses a custom heart icon instead of the default.",
    icon: <Heart className="h-4 w-4" />,
  },
};

export const CustomIconSuccess: Story = {
  args: {
    variant: "success",
    title: "Custom Success Icon",
    description: "Using a star icon for this success alert.",
    icon: <Star className="h-4 w-4" />,
  },
};

export const CustomIconWarning: Story = {
  args: {
    variant: "warning",
    title: "Custom Warning Icon",
    description: "Using a zap icon for this warning alert.",
    icon: <Zap className="h-4 w-4" />,
  },
};

// Without Icons
export const NoIcon: Story = {
  args: {
    variant: "info",
    title: "No Icon Alert",
    description: "This alert doesn't show any icon.",
    showIcon: false,
  },
};

export const NoIconDismissible: Story = {
  args: {
    variant: "warning",
    title: "No Icon, Dismissible",
    description: "This alert has no icon but can be dismissed.",
    showIcon: false,
    dismissible: true,
  },
};

// Title Only
export const TitleOnly: Story = {
  args: {
    variant: "info",
    title: "Title Only Alert",
  },
};

export const TitleOnlyDismissible: Story = {
  args: {
    variant: "success",
    title: "Success!",
    dismissible: true,
  },
};

// Description Only
export const DescriptionOnly: Story = {
  args: {
    variant: "info",
    description: "This alert only has a description without a title.",
  },
};

// Long Content
export const LongContent: Story = {
  args: {
    variant: "info",
    title: "Alert with Long Content",
    description: "This is a very long description that demonstrates how the alert component handles extended text content. It should wrap properly and maintain good readability while preserving the overall design and layout of the alert component.",
  },
};

export const LongContentDismissible: Story = {
  args: {
    variant: "warning",
    title: "Important Notice with Extended Information",
    description: "This alert contains a substantial amount of text to demonstrate how the component handles longer content. The text should wrap appropriately and the dismiss button should remain properly positioned regardless of the content length. This is particularly useful for displaying detailed error messages, comprehensive instructions, or extensive notifications.",
    dismissible: true,
  },
};

// Animation Controls
export const NoAnimation: Story = {
  args: {
    variant: "success",
    title: "No Animation",
    description: "This alert appears without any animation effects.",
    animated: false,
  },
};

export const SlowAnimation: Story = {
  args: {
    variant: "info",
    title: "Slow Animation",
    description: "This alert has a slower animation duration.",
    animated: true,
    animationDuration: 600,
  },
};

export const FastAnimation: Story = {
  args: {
    variant: "warning",
    title: "Fast Animation",
    description: "This alert has a faster animation duration.",
    animated: true,
    animationDuration: 150,
  },
};

// RTL Support
export const RTL: Story = {
  args: {
    variant: "info",
    title: "تنبيه باللغة العربية",
    description: "هذا تنبيه باللغة العربية مع دعم الاتجاه من اليمين إلى اليسار.",
    dir: "rtl",
  },
};

export const RTLError: Story = {
  args: {
    variant: "destructive",
    title: "خطأ",
    description: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    dir: "rtl",
    dismissible: true,
  },
};

// Pre-built Components
export const AlertSuccessComponent: Story = {
  render: (args) => (
    <AlertSuccess {...args} />
  ),
  args: {
    title: "Success Component",
    description: "Using the pre-built AlertSuccess component.",
    dismissible: true,
  },
};

export const AlertErrorComponent: Story = {
  render: (args) => (
    <AlertError {...args} />
  ),
  args: {
    title: "Error Component",
    description: "Using the pre-built AlertError component.",
    dismissible: true,
  },
};

export const AlertWarningComponent: Story = {
  render: (args) => (
    <AlertWarning {...args} />
  ),
  args: {
    title: "Warning Component",
    description: "Using the pre-built AlertWarning component.",
    dismissible: true,
  },
};

export const AlertInfoComponent: Story = {
  render: (args) => (
    <AlertInfo {...args} />
  ),
  args: {
    title: "Info Component",
    description: "Using the pre-built AlertInfo component.",
    dismissible: true,
  },
};

// Complex Examples
export const ComplexSuccess: Story = {
  args: {
    variant: "success",
    title: "Account Created Successfully",
    description: "Your account has been created and you can now access all features. A confirmation email has been sent to your registered email address.",
    icon: <Shield className="h-4 w-4" />,
    dismissible: true,
    size: "lg",
  },
};

export const ComplexError: Story = {
  args: {
    variant: "destructive",
    title: "Payment Failed",
    description: "We were unable to process your payment. Please check your payment information and try again. If the problem persists, contact our support team.",
    dismissible: true,
    size: "lg",
  },
};

export const ComplexWarning: Story = {
  args: {
    variant: "warning",
    title: "Session Expiring Soon",
    description: "Your session will expire in 5 minutes. Please save your work and refresh the page to continue. Any unsaved changes may be lost.",
    icon: <Bell className="h-4 w-4" />,
    dismissible: true,
  },
};

// Interactive Examples
export const InteractiveDismiss: Story = {
  args: {
    variant: "info",
    title: "Interactive Alert",
    description: "Click the X button to dismiss this alert and see the animation in action.",
    dismissible: true,
    animated: true,
    animationDuration: 400,
  },
  parameters: {
    docs: {
      description: {
        story: "This alert demonstrates the dismiss functionality with animation. Click the X button to see the dismiss animation.",
      },
    },
  },
};

// Multiple Alerts
export const MultipleAlerts: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="success" title="Success" description="Operation completed successfully." dismissible />
      <Alert variant="warning" title="Warning" description="Please review your settings." dismissible />
      <Alert variant="destructive" title="Error" description="Something went wrong." dismissible />
      <Alert variant="info" title="Info" description="Here's some information." dismissible />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Multiple alerts stacked together, each with different variants and dismiss functionality.",
      },
    },
  },
};

// Custom Styling
export const CustomStyling: Story = {
  args: {
    variant: "info",
    title: "Custom Styled Alert",
    description: "This alert has custom styling applied through className.",
    className: "border-2 border-purple-500 bg-purple-50 text-purple-800",
    icon: <Mail className="h-4 w-4" />,
    dismissible: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates how to apply custom styling to the alert component.",
      },
    },
  },
};

// Accessibility Examples
export const AccessibilityExample: Story = {
  args: {
    variant: "info",
    title: "Accessible Alert",
    description: "This alert demonstrates proper accessibility features including ARIA roles and keyboard navigation.",
    dismissible: true,
    "aria-live": "polite",
  },
  parameters: {
    docs: {
      description: {
        story: "This alert includes proper accessibility attributes and can be dismissed using keyboard navigation.",
      },
    },
  },
};
