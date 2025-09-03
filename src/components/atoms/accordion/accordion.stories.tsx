import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  type SizeVariant,
  type ColorVariant,
} from './accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Atoms/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A flexible accordion component built with Radix UI primitives and Tailwind CSS.

## Features
- **Multiple Types**: Single or multiple accordion items can be open
- **Icon Variants**: Chevron, plus/minus, and arrow icons
- **Size Variants**: Small, medium, large, and extra-large sizes
- **Color Variants**: Default, primary, secondary, success, warning, and danger themes
- **RTL Support**: Full right-to-left language support
- **Accessibility**: Built on Radix UI primitives with proper ARIA attributes
- **Customizable**: Extensive styling and behavior customization options

## Best Practices
- Use single type for FAQ sections or simple content disclosure
- Use multiple type for complex forms or settings panels
- Choose appropriate icon variants based on your design system
- Consider RTL support for international applications
- Test with keyboard navigation and screen readers
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
      description: 'Whether only one or multiple items can be open at once',
    },
    collapsible: {
      control: { type: 'boolean' },
      description: 'Whether the accordion can be collapsed (single type only)',
    },
    dir: {
      control: { type: 'select' },
      options: ['ltr', 'rtl', 'auto'],
      description: 'Text direction for the accordion',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'card', 'ghost'],
      description: 'Visual variant of the accordion',
    },
    rounded: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Border radius of the accordion',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether the accordion should take full width',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the accordion is disabled',
    },
    animationDuration: {
      control: { type: 'range', min: 100, max: 1000, step: 50 },
      description: 'Animation duration in milliseconds',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

// Basic Stories
export const Default: Story = {
  args: {
    type: 'single',
    collapsible: true,
    variant: 'default',
    rounded: 'md',
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is React?</AccordionTrigger>
        <AccordionContent>
          React is a JavaScript library for building user interfaces. It was developed by Facebook and is used to create interactive web applications with reusable components.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What is Tailwind CSS?</AccordionTrigger>
        <AccordionContent>
          Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML. It provides low-level utility classes that let you build completely custom designs.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What is TypeScript?</AccordionTrigger>
        <AccordionContent>
          TypeScript is a superset of JavaScript that adds static typing to the language. It helps catch errors during development and provides better tooling support.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  args: {
    type: 'multiple',
    defaultValue: ['item-1', 'item-2'],
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Frontend Technologies</AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-2">
            <li>• React - UI library</li>
            <li>• Vue.js - Progressive framework</li>
            <li>• Angular - Full-featured framework</li>
            <li>• Svelte - Compile-time framework</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Backend Technologies</AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-2">
            <li>• Node.js - JavaScript runtime</li>
            <li>• Python - Django, Flask</li>
            <li>• Java - Spring Boot</li>
            <li>• C# - .NET Core</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Database Technologies</AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-2">
            <li>• PostgreSQL - Relational database</li>
            <li>• MongoDB - NoSQL database</li>
            <li>• Redis - In-memory database</li>
            <li>• MySQL - Relational database</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Icon Variants
export const IconVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Chevron Icons (Default)</h3>
        <Accordion type="single" collapsible>
          <AccordionItem value="chevron-1">
            <AccordionTrigger iconVariant="chevron">
              Chevron Icons Example
            </AccordionTrigger>
            <AccordionContent>
              This accordion uses the default chevron icons that rotate and change direction.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Plus/Minus Icons</h3>
        <Accordion type="single" collapsible>
          <AccordionItem value="plus-1">
            <AccordionTrigger iconVariant="plus">
              Plus/Minus Icons Example
            </AccordionTrigger>
            <AccordionContent>
              This accordion uses plus and minus icons that show/hide based on state.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Arrow Icons</h3>
        <Accordion type="single" collapsible>
          <AccordionItem value="arrow-1">
            <AccordionTrigger iconVariant="arrow">
              Arrow Icons Example
            </AccordionTrigger>
            <AccordionContent>
              This accordion uses arrow icons that point in different directions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">No Icons</h3>
        <Accordion type="single" collapsible>
          <AccordionItem value="no-icon-1">
            <AccordionTrigger showIcon={false}>
              Accordion Without Icons
            </AccordionTrigger>
            <AccordionContent>
              This accordion doesn't show any icons, just the text content.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

// Size Variants
export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-6">
      {(['sm', 'md', 'lg', 'xl'] as SizeVariant[]).map((size) => (
        <div key={size}>
          <h3 className="text-lg font-medium mb-3 capitalize">{size} Size</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value={`${size}-1`}>
              <AccordionTrigger size={size}>
                {size.toUpperCase()} Size Accordion
              </AccordionTrigger>
              <AccordionContent>
                This accordion uses the {size} size variant with appropriate padding and text size.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  ),
};

// Color Variants
export const ColorVariants: Story = {
  render: () => (
    <div className="space-y-6">
      {(['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as ColorVariant[]).map((color) => (
        <div key={color}>
          <h3 className="text-lg font-medium mb-3 capitalize">{color} Color</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value={`${color}-1`}>
              <AccordionTrigger color={color}>
                {color.toUpperCase()} Color Accordion
              </AccordionTrigger>
              <AccordionContent>
                This accordion uses the {color} color variant with appropriate styling.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  ),
};

// RTL Support
export const RTLSupport: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">LTR (Left-to-Right)</h3>
        <Accordion type="single" collapsible dir="ltr">
          <AccordionItem value="ltr-1">
            <AccordionTrigger>English Content</AccordionTrigger>
            <AccordionContent>
              This accordion is set to left-to-right direction. The icons and text alignment should reflect this.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">RTL (Right-to-Left)</h3>
        <Accordion type="single" collapsible dir="rtl">
          <AccordionItem value="rtl-1">
            <AccordionTrigger>ما هو React؟</AccordionTrigger>
            <AccordionContent>
              React هي مكتبة JavaScript لبناء واجهات المستخدم. تم تطويرها بواسطة Facebook وتستخدم لإنشاء تطبيقات ويب تفاعلية بمكونات قابلة لإعادة الاستخدام.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Auto Direction</h3>
        <Accordion type="single" collapsible dir="auto">
          <AccordionItem value="auto-1">
            <AccordionTrigger>Auto Direction Detection</AccordionTrigger>
            <AccordionContent>
              This accordion uses auto direction detection. It will automatically detect the text direction from the DOM or browser locale.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

// Loading States
export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Loading State</h3>
        <Accordion type="single" collapsible>
          <AccordionItem value="loading-1">
            <AccordionTrigger loading>
              Loading Content...
            </AccordionTrigger>
            <AccordionContent>
              This accordion trigger shows a loading spinner.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Disabled State</h3>
        <Accordion type="single" collapsible>
          <AccordionItem value="disabled-1">
            <AccordionTrigger disabled>
              Disabled Accordion
            </AccordionTrigger>
            <AccordionContent>
              This accordion trigger is disabled and cannot be clicked.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

// Custom Styling
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Primary Theme</h3>
        <Accordion type="single" collapsible className="border-2 border-primary/20 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5">
          <AccordionItem value="primary-1" className="border-primary/20">
            <AccordionTrigger 
              className="text-primary font-semibold hover:bg-primary/10 focus-visible:ring-primary/50"
              iconClassName="text-primary"
            >
              Primary Styled Accordion
            </AccordionTrigger>
            <AccordionContent className="text-primary/80">
              This accordion uses primary colors with gradients and enhanced hover effects.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Success Theme</h3>
        <Accordion type="single" collapsible className="border-2 border-green-200 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50">
          <AccordionItem value="success-1" className="border-green-200">
            <AccordionTrigger 
              className="text-green-700 font-semibold hover:bg-green-100 focus-visible:ring-green-300"
              iconClassName="text-green-600"
            >
              Success Styled Accordion
            </AccordionTrigger>
            <AccordionContent className="text-green-800">
              This accordion uses success colors with green gradients and enhanced styling.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Dark Theme</h3>
        <Accordion type="single" collapsible className="border-2 border-gray-600 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 text-white">
          <AccordionItem value="dark-1" className="border-gray-600">
            <AccordionTrigger 
              className="text-white font-semibold hover:bg-gray-700 focus-visible:ring-gray-500"
              iconClassName="text-gray-300"
            >
              Dark Styled Accordion
            </AccordionTrigger>
            <AccordionContent className="text-gray-200">
              This accordion uses dark colors with gray gradients for a modern look.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

// FAQ Style
export const FAQStyle: Story = {
  render: () => (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="space-y-2">
        <AccordionItem value="faq-1" className="border rounded-lg bg-card shadow-sm">
          <AccordionTrigger className="px-6 py-4 text-left">
            How do I install the dependencies?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            Run <code className="bg-muted px-2 py-1 rounded text-sm">npm install</code> or <code className="bg-muted px-2 py-1 rounded text-sm">yarn install</code> in your project directory.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-2" className="border rounded-lg bg-card shadow-sm">
          <AccordionTrigger className="px-6 py-4 text-left">
            How do I customize the accordion?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            You can customize the accordion by passing different props like <code className="bg-muted px-2 py-1 rounded text-sm">iconVariant</code>, <code className="bg-muted px-2 py-1 rounded text-sm">className</code>, and <code className="bg-muted px-2 py-1 rounded text-sm">showIcon</code>.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-3" className="border rounded-lg bg-card shadow-sm">
          <AccordionTrigger className="px-6 py-4 text-left">
            Is it accessible?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            Yes! The accordion is built on top of Radix UI primitives which provide full accessibility features including keyboard navigation, ARIA attributes, and screen reader support.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// Interactive Tests
export const InteractiveTest: Story = {
  render: () => (
    <Accordion type="single" collapsible>
      <AccordionItem value="test-1">
        <AccordionTrigger>Click me to expand</AccordionTrigger>
        <AccordionContent>
          <p>This content should appear when you click the trigger above.</p>
          <p>Click again to collapse it.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="test-2">
        <AccordionTrigger>Another item</AccordionTrigger>
        <AccordionContent>
          <p>This is another accordion item.</p>
          <p>Only one item can be open at a time in single mode.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Edge Cases
export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Very Long Content</h3>
        <Accordion type="single" collapsible>
          <AccordionItem value="long-1">
            <AccordionTrigger>Accordion with very long content</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>This accordion contains a lot of content to test how it handles long text and multiple paragraphs.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>First item in a long list</li>
                  <li>Second item in a long list</li>
                  <li>Third item in a long list</li>
                  <li>Fourth item in a long list</li>
                  <li>Fifth item in a long list</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Empty Content</h3>
        <Accordion type="single" collapsible>
          <AccordionItem value="empty-1">
            <AccordionTrigger>Accordion with empty content</AccordionTrigger>
            <AccordionContent>
              <span className="text-muted-foreground">No content available</span>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">HTML Content</h3>
        <Accordion type="single" collapsible>
          <AccordionItem value="html-1">
            <AccordionTrigger>Accordion with HTML content</AccordionTrigger>
            <AccordionContent>
              <div className="prose">
                <h4>HTML Content Example</h4>
                <p>This accordion contains <strong>HTML content</strong> with <em>formatting</em>.</p>
                <blockquote>
                  <p>This is a blockquote example.</p>
                </blockquote>
                <code>console.log('Hello, World!');</code>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};
