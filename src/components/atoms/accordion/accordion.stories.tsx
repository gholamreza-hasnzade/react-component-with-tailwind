import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Accordion } from "./accordion";
import { HiChevronRight, HiPlus, HiMinus } from "react-icons/hi2";

const meta: Meta<typeof Accordion> = {
  title: "Atoms/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible and accessible accordion component with multiple variants, sizes, and interactive modes. Supports both controlled and uncontrolled usage, custom icons, and smooth animations.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "bordered", "separated"],
      description: "Visual variant/style of the accordion",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the accordion items",
    },
    allowMultiple: {
      control: { type: "boolean" },
      description: "Whether multiple items can be open simultaneously",
    },
    defaultOpen: {
      control: { type: "object" },
      description: "Array of item IDs that should be open by default",
    },
    onItemToggle: {
      action: "item toggled",
      description: "Callback when accordion items are toggled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Accordion Story
export const Basic: Story = {
  render: () => (
    <Accordion>
      <Accordion.Item id="item-1">
        <Accordion.Trigger>What is React?</Accordion.Trigger>
        <Accordion.Content>
          React is a JavaScript library for building user interfaces. It allows
          you to create reusable UI components and manage their state
          efficiently.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item id="item-2">
        <Accordion.Trigger>How does React work?</Accordion.Trigger>
        <Accordion.Content>
          React uses a virtual DOM to efficiently update the actual DOM. When
          state changes, React creates a new virtual DOM tree, compares it with
          the previous one, and only updates the necessary parts.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item id="item-3">
        <Accordion.Trigger>What are React hooks?</Accordion.Trigger>
        <Accordion.Content>
          React hooks are functions that allow you to use state and other React
          features in functional components. Examples include useState,
          useEffect, and useContext.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Basic accordion with default styling. Each item can be expanded/collapsed independently.",
      },
    },
  },
};

// Different Variants Story
export const Variants: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-2xl">
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Default Variant
        </h3>
        <Accordion variant="default">
          <Accordion.Item id="default-1">
            <Accordion.Trigger>Default Style Item 1</Accordion.Trigger>
            <Accordion.Content>
              This is the default variant with subtle borders and hover effects.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item id="default-2">
            <Accordion.Trigger>Default Style Item 2</Accordion.Trigger>
            <Accordion.Content>
              Clean and minimal design with smooth transitions.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Bordered Variant
        </h3>
        <Accordion variant="bordered">
          <Accordion.Item id="bordered-1">
            <Accordion.Trigger>Bordered Style Item 1</Accordion.Trigger>
            <Accordion.Content>
              This variant has distinct borders around each item with enhanced
              hover effects.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item id="bordered-2">
            <Accordion.Trigger>Bordered Style Item 2</Accordion.Trigger>
            <Accordion.Content>
              Each item is clearly separated with rounded corners and shadows.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Separated Variant
        </h3>
        <Accordion variant="separated">
          <Accordion.Item id="separated-1">
            <Accordion.Trigger>Separated Style Item 1</Accordion.Trigger>
            <Accordion.Content>
              This variant has maximum spacing between items with gradient hover
              effects.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item id="separated-2">
            <Accordion.Trigger>Separated Style Item 2</Accordion.Trigger>
            <Accordion.Content>
              Each item stands alone with generous padding and modern styling.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Three visual variants: default (subtle borders), bordered (distinct borders), and separated (maximum spacing with gradients).",
      },
    },
  },
};

// Different Sizes Story
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-2xl">
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">Small Size</h3>
        <Accordion size="sm">
          <Accordion.Item id="small-1">
            <Accordion.Trigger>Small Accordion Item</Accordion.Trigger>
            <Accordion.Content>
              Compact sizing with reduced padding and smaller text for
              space-constrained layouts.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">Medium Size</h3>
        <Accordion size="md">
          <Accordion.Item id="medium-1">
            <Accordion.Trigger>Medium Accordion Item</Accordion.Trigger>
            <Accordion.Content>
              Standard sizing with balanced padding and text size for most use
              cases.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">Large Size</h3>
        <Accordion size="lg">
          <Accordion.Item id="large-1">
            <Accordion.Trigger>Large Accordion Item</Accordion.Trigger>
            <Accordion.Content>
              Generous sizing with increased padding and larger text for
              prominent displays.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
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

// Multiple Items Open Story
export const MultipleOpen: Story = {
  render: () => (
    <Accordion allowMultiple={true} defaultOpen={["multi-1", "multi-3"]}>
      <Accordion.Item id="multi-1">
        <Accordion.Trigger>Multiple Items Can Be Open</Accordion.Trigger>
        <Accordion.Content>
          When allowMultiple is true, you can have multiple accordion items
          expanded simultaneously.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item id="multi-2">
        <Accordion.Trigger>This Item Can Also Be Open</Accordion.Trigger>
        <Accordion.Content>
          You can expand this item while keeping others open, unlike the default
          behavior where only one item can be open at a time.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item id="multi-3">
        <Accordion.Trigger>Pre-opened Item</Accordion.Trigger>
        <Accordion.Content>
          This item was opened by default using the defaultOpen prop, and it can
          remain open alongside other items.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Enable multiple open items with allowMultiple prop. Use defaultOpen to specify which items should be expanded initially.",
      },
    },
  },
};

// Custom Icons Story
export const CustomIcons: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-2xl">
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Custom Chevron Icons
        </h3>
        <Accordion>
          <Accordion.Item id="custom-1">
            <Accordion.Trigger
              icon={
                <HiChevronRight className="w-5 h-5 transition-transform duration-300 group-data-[state=open]:rotate-90" />
              }
            >
              Custom Chevron Icon
            </Accordion.Trigger>
            <Accordion.Content>
              Custom chevron icon that rotates smoothly when the accordion opens
              and closes.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Plus/Minus Icons
        </h3>
        <Accordion>
          <Accordion.Item id="custom-2">
            <Accordion.Trigger
              icon={
                <div className="flex items-center justify-center w-5 h-5">
                  <HiPlus className="w-4 h-4 transition-opacity duration-300 group-data-[state=open]:opacity-0" />
                  <HiMinus className="w-4 h-4 absolute transition-opacity duration-300 opacity-0 group-data-[state=open]:opacity-100" />
                </div>
              }
            >
              Plus/Minus Icons
            </Accordion.Trigger>
            <Accordion.Content>
              Plus icon shows when closed, minus icon shows when open, with
              smooth transitions between states.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Customize accordion icons to match your design theme. Use any React icon or custom SVG with smooth animations.",
      },
    },
  },
};

// Controlled Accordion Story
export const Controlled: Story = {
  render: () => {
    const [openItems, setOpenItems] = useState<Set<string>>(
      new Set(["controlled-1"])
    );

    const handleToggle = (id: string, isOpen: boolean) => {
      setOpenItems((prev) => {
        const newSet = new Set(prev);
        if (isOpen) {
          newSet.add(id);
        } else {
          newSet.delete(id);
        }
        return newSet;
      });
    };

    return (
      <div className="space-y-6 w-full max-w-2xl">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Controlled Accordion
          </h3>
          <Accordion>
            <Accordion.Item
              id="controlled-1"
              controlled={true}
              isOpen={openItems.has("controlled-1")}
              onToggle={handleToggle}
            >
              <Accordion.Trigger>Controlled Item 1</Accordion.Trigger>
              <Accordion.Content>
                This item is controlled externally. The state is managed by the
                parent component.
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item
              id="controlled-2"
              controlled={true}
              isOpen={openItems.has("controlled-2")}
              onToggle={handleToggle}
            >
              <Accordion.Trigger>Controlled Item 2</Accordion.Trigger>
              <Accordion.Content>
                You can programmatically control which items are open and
                closed.
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setOpenItems(new Set(["controlled-1"]))}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Open Item 1 Only
          </button>
          <button
            onClick={() => setOpenItems(new Set(["controlled-2"]))}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Open Item 2 Only
          </button>
          <button
            onClick={() => setOpenItems(new Set())}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Close All
          </button>
        </div>

        <p className="text-sm text-gray-600">
          Currently open: {Array.from(openItems).join(", ") || "None"}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use controlled mode when you need to manage accordion state externally. Each item can have its own controlled state with custom toggle handlers.",
      },
    },
  },
};

// Disabled Items Story
export const DisabledItems: Story = {
  render: () => (
    <Accordion>
      <Accordion.Item id="enabled-1">
        <Accordion.Trigger>Enabled Item</Accordion.Trigger>
        <Accordion.Content>
          This item works normally and can be expanded/collapsed.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item id="disabled-1" disabled={true}>
        <Accordion.Trigger>Disabled Item</Accordion.Trigger>
        <Accordion.Content>
          This item is disabled and cannot be interacted with.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item id="enabled-2">
        <Accordion.Trigger>Another Enabled Item</Accordion.Trigger>
        <Accordion.Content>This item also works normally.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Disable specific accordion items when they should not be interactive. Disabled items have reduced opacity and cannot be clicked or focused.",
      },
    },
  },
};

// Non-animated Content Story
export const NonAnimated: Story = {
  render: () => (
    <Accordion>
      <Accordion.Item id="animated-1">
        <Accordion.Trigger>Animated Content</Accordion.Trigger>
        <Accordion.Content animated={true}>
          This content animates smoothly when opening and closing with fade and
          slide effects.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item id="non-animated-1">
        <Accordion.Trigger>Non-animated Content</Accordion.Trigger>
        <Accordion.Content animated={false}>
          This content appears and disappears instantly without animation.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Control animation behavior with the animated prop. When false, content appears/disappears instantly. When true, smooth transitions are applied.",
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
        <Accordion>
          <Accordion.Item id="accessibility-1">
            <Accordion.Trigger>Keyboard Accessible Item 1</Accordion.Trigger>
            <Accordion.Content>
              Use Tab to navigate between accordion items, Enter or Space to
              expand/collapse.
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item id="accessibility-2">
            <Accordion.Trigger>Keyboard Accessible Item 2</Accordion.Trigger>
            <Accordion.Content>
              All interactive elements are properly focusable and have
              appropriate ARIA attributes.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>

        <p className="text-sm text-gray-500 mt-2">
          Tab to focus, Enter/Space to toggle, Arrow keys for navigation
        </p>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Screen Reader Support
        </h3>
        <Accordion>
          <Accordion.Item id="screen-reader-1">
            <Accordion.Trigger>Screen Reader Friendly</Accordion.Trigger>
            <Accordion.Content>
              Proper ARIA labels, roles, and state announcements for screen
              readers.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>

        <p className="text-sm text-gray-500 mt-2">
          Proper ARIA attributes and semantic HTML structure
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Full accessibility support with keyboard navigation, ARIA attributes, and screen reader compatibility. Each accordion item has proper roles and labels.",
      },
    },
  },
};

// Playground Story
export const Playground: Story = {
  args: {
    variant: "default",
    size: "md",
    allowMultiple: false,
    defaultOpen: [],
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <Accordion {...args}>
        <Accordion.Item id="playground-1">
          <Accordion.Trigger>Playground Item 1</Accordion.Trigger>
          <Accordion.Content>
            Use the controls below to test different accordion configurations
            and see how they affect the component behavior and appearance.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item id="playground-2">
          <Accordion.Trigger>Playground Item 2</Accordion.Trigger>
          <Accordion.Content>
            Try changing the variant, size, and allowMultiple props to see the
            different styling and behavior options.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item id="playground-3">
          <Accordion.Trigger>Playground Item 3</Accordion.Trigger>
          <Accordion.Content>
            The defaultOpen array can be used to specify which items should be
            expanded initially.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground to test all Accordion component props and see how they affect the component behavior and appearance.",
      },
    },
  },
};
