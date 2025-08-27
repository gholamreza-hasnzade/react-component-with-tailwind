import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Badge } from "./badge";
import {
  HiCheck,
  HiExclamationTriangle,
  HiInformationCircle,
  HiXCircle,
  HiStar,
  HiHeart,
  HiFire,
} from "react-icons/hi2";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible and accessible badge component with multiple variants, sizes, and interactive modes. Supports icons, dismissible functionality, clickable states, and modern gradient styling.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "success",
        "error",
        "warning",
        "info",
        "outline",
      ],
      description: "Visual variant/style of the badge",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the badge",
    },
    rounded: {
      control: { type: "boolean" },
      description: "Whether the badge should have rounded corners",
    },
    clickable: {
      control: { type: "boolean" },
      description: "Whether the badge should be clickable",
    },
    showDot: {
      control: { type: "boolean" },
      description: "Whether the badge should show a dot indicator",
    },
    dismissible: {
      control: { type: "boolean" },
      description: "Whether the badge should be dismissible",
    },
    iconPosition: {
      control: { type: "select" },
      options: ["left", "right"],
      description: "Position of the icon relative to text",
    },
    onDismiss: {
      action: "dismissed",
      description: "Callback when badge is dismissed",
    },
    onClick: {
      action: "clicked",
      description: "Click handler for clickable badges",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Badge Story
export const Basic: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge>Default Badge</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Basic badges with different variants. Each variant has its own color scheme and styling.",
      },
    },
  },
};

// Different Sizes Story
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <div className="text-center">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Small</h4>
        <Badge size="sm" variant="primary">
          Small Badge
        </Badge>
      </div>
      <div className="text-center">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Medium</h4>
        <Badge size="md" variant="primary">
          Medium Badge
        </Badge>
      </div>
      <div className="text-center">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Large</h4>
        <Badge size="lg" variant="primary">
          Large Badge
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Three size options: small (compact), medium (standard), and large (prominent). Each size adjusts padding, text size, and icon dimensions.",
      },
    },
  },
};

// Variants with Icons Story
export const VariantsWithIcons: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          With Left Icons
        </h3>
        <Badge variant="primary" icon={<HiCheck />}>
          Success Action
        </Badge>
        <Badge variant="secondary" icon={<HiInformationCircle />}>
          Information
        </Badge>
        <Badge variant="success" icon={<HiStar />}>
          Featured
        </Badge>
        <Badge variant="error" icon={<HiXCircle />}>
          Error State
        </Badge>
                 <Badge variant="warning" icon={<HiExclamationTriangle />}>
           Warning
         </Badge>
        <Badge variant="info" icon={<HiInformationCircle />}>
          New Info
        </Badge>
        <Badge variant="outline" icon={<HiHeart />}>
          Favorite
        </Badge>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          With Right Icons
        </h3>
        <Badge variant="primary" icon={<HiFire />} iconPosition="right">
          Hot Topic
        </Badge>
        <Badge variant="secondary" icon={<HiStar />} iconPosition="right">
          Premium
        </Badge>
        <Badge variant="success" icon={<HiCheck />} iconPosition="right">
          Verified
        </Badge>
        <Badge variant="error" icon={<HiXCircle />} iconPosition="right">
          Blocked
        </Badge>
                 <Badge variant="warning" icon={<HiExclamationTriangle />} iconPosition="right">
           Pending
         </Badge>
        <Badge
          variant="info"
          icon={<HiInformationCircle />}
          iconPosition="right"
        >
          Updated
        </Badge>
        <Badge variant="outline" icon={<HiHeart />} iconPosition="right">
          Liked
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Badges with icons positioned on the left or right. Icons automatically inherit the badge color scheme and size.",
      },
    },
  },
};

// Interactive Badges Story
export const Interactive: Story = {
  render: () => {
    const [clickedBadge, setClickedBadge] = useState<string | null>(null);

    return (
      <div className="space-y-6 w-full max-w-2xl">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Clickable Badges
          </h3>
          <div className="flex flex-wrap gap-3">
            <Badge
              variant="primary"
              clickable={true}
              onClick={() => setClickedBadge("primary")}
            >
              Click Me
            </Badge>
            <Badge
              variant="success"
              clickable={true}
              onClick={() => setClickedBadge("success")}
            >
              Interactive
            </Badge>
            <Badge
              variant="warning"
              clickable={true}
              onClick={() => setClickedBadge("warning")}
            >
              Try Me
            </Badge>
          </div>
          {clickedBadge && (
            <p className="text-sm text-gray-600 mt-2">
              Last clicked: <span className="font-medium">{clickedBadge}</span>{" "}
              badge
            </p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Dismissible Badges
          </h3>
          <div className="flex flex-wrap gap-3">
            <Badge
              variant="info"
              dismissible={true}
              onDismiss={() => console.log("Info badge dismissed")}
            >
              Dismissible Info
            </Badge>
            <Badge
              variant="error"
              dismissible={true}
              onDismiss={() => console.log("Error badge dismissed")}
            >
              Dismissible Error
            </Badge>
            <Badge
              variant="outline"
              dismissible={true}
              onDismiss={() => console.log("Outline badge dismissed")}
            >
              Dismissible Outline
            </Badge>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Click the X button to dismiss badges. Check console for dismiss
            events.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive badges with click handlers and dismiss functionality. Clickable badges have hover effects and can trigger actions.",
      },
    },
  },
};

// Badge with Dots Story
export const WithDots: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-2xl">
      <h3 className="text-lg font-medium text-gray-700 mb-4">
        Badges with Status Dots
      </h3>
      <div className="flex flex-wrap gap-3">
        <Badge variant="primary" showDot={true}>
          Active
        </Badge>
        <Badge variant="success" showDot={true}>
          Online
        </Badge>
        <Badge variant="warning" showDot={true}>
          Pending
        </Badge>
        <Badge variant="error" showDot={true}>
          Offline
        </Badge>
        <Badge variant="info" showDot={true}>
          New
        </Badge>
        <Badge variant="outline" showDot={true}>
          Draft
        </Badge>
      </div>
      <p className="text-sm text-gray-500">
        Status dots provide visual indicators for different states. Each variant
        has a matching colored dot.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Badges with status dots for visual indicators. Dots automatically match the badge variant color and have a subtle ring effect.",
      },
    },
  },
};

// Rounded vs Square Story
export const RoundedVsSquare: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-2xl">
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Square Corners (Default)
        </h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Rounded Corners
        </h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary" rounded={true}>
            Primary
          </Badge>
          <Badge variant="success" rounded={true}>
            Success
          </Badge>
          <Badge variant="warning" rounded={true}>
            Warning
          </Badge>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        Choose between square corners (default) or fully rounded corners for
        different design aesthetics.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Compare square and rounded corner styles. Rounded badges have a more modern, pill-like appearance.",
      },
    },
  },
};

// Complex Badges Story
export const ComplexBadges: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-3xl">
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Feature-Rich Badges
        </h3>
        <div className="flex flex-wrap gap-3">
          <Badge
            variant="primary"
            icon={<HiStar />}
            showDot={true}
            clickable={true}
            onClick={() => console.log("Premium badge clicked")}
          >
            Premium Feature
          </Badge>

          <Badge
            variant="success"
            icon={<HiCheck />}
            showDot={true}
            dismissible={true}
            onDismiss={() => console.log("Success notification dismissed")}
          >
            Task Completed
          </Badge>

                     <Badge
             variant="warning"
             icon={<HiExclamationTriangle />}
             showDot={true}
             clickable={true}
             onClick={() => console.log("Warning badge clicked")}
           >
             Action Required
           </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Custom Icon Combinations
        </h3>
        <div className="flex flex-wrap gap-3">
          <Badge
            variant="info"
            icon={<HiFire />}
            iconPosition="right"
            clickable={true}
            onClick={() => console.log("Trending badge clicked")}
          >
            Trending
          </Badge>

          <Badge
            variant="outline"
            icon={<HiHeart />}
            showDot={true}
            clickable={true}
            onClick={() => console.log("Favorite badge clicked")}
          >
            Favorite
          </Badge>

          <Badge
            variant="secondary"
            icon={<HiInformationCircle />}
            iconPosition="right"
            dismissible={true}
            onDismiss={() => console.log("Info badge dismissed")}
          >
            More Info
          </Badge>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        Combine multiple features for rich, interactive badges. Check console
        for click and dismiss events.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Complex badges combining multiple features: icons, dots, clickable states, and dismissible functionality.",
      },
    },
  },
};

// Accessibility Story
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-2xl">
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Keyboard Navigation
        </h3>
        <div className="flex flex-wrap gap-3">
          <Badge
            variant="primary"
            clickable={true}
            onClick={() => console.log("Primary clicked")}
          >
            Tab to Focus
          </Badge>
          <Badge
            variant="success"
            clickable={true}
            onClick={() => console.log("Success clicked")}
          >
            Enter to Activate
          </Badge>
          <Badge
            variant="warning"
            clickable={true}
            onClick={() => console.log("Warning clicked")}
          >
            Space to Activate
          </Badge>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Use Tab to navigate, Enter or Space to activate clickable badges
        </p>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Screen Reader Support
        </h3>
        <div className="flex flex-wrap gap-3">
          <Badge
            variant="error"
            dismissible={true}
            onDismiss={() => console.log("Dismissed")}
          >
            Error Message
          </Badge>
          <Badge variant="info" showDot={true}>
            Status Indicator
          </Badge>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Proper ARIA labels, roles, and state announcements for screen readers
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Full accessibility support with keyboard navigation, ARIA attributes, and screen reader compatibility. All interactive elements are properly focusable.",
      },
    },
  },
};

// Playground Story
export const Playground: Story = {
  args: {
            children: "Custom Badge",
    variant: "primary",
    size: "md",
    rounded: false,
    clickable: false,
    showDot: false,
    dismissible: false,
    iconPosition: "left",
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <div className="mb-6">
        <Badge {...args} />
      </div>

      <div className="text-sm text-gray-600 space-y-2">
        <p>
          <strong>Current props:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Variant: {args.variant}</li>
          <li>Size: {args.size}</li>
          <li>Rounded: {args.rounded ? "Yes" : "No"}</li>
          <li>Clickable: {args.clickable ? "Yes" : "No"}</li>
          <li>Show Dot: {args.showDot ? "Yes" : "No"}</li>
          <li>Dismissible: {args.dismissible ? "Yes" : "No"}</li>
          <li>Icon Position: {args.iconPosition}</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground to test all Badge component props and see how they affect the component behavior and appearance.",
      },
    },
  },
};
