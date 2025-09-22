import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
  Typography,
  H1, H2, H3, H4, H5, H6,
  P, Lead, Large, Small, Muted,
  Code, Blockquote, InlineCode
} from './typography';

const meta: Meta<typeof Typography> = {
  title: 'Components/Atoms/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive typography system with multiple variants, colors, sizes, and utilities. Supports RTL/LTR text direction, custom elements, and extensive styling options.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'lead', 'large', 'small', 'muted', 'code', 'blockquote', 'list', 'inlineCode', 'table', 'tableHeader', 'tableCell', 'tableRow'],
      description: 'The typography variant to use',
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'muted', 'primary', 'secondary', 'accent', 'destructive', 'success', 'warning', 'info', 'white', 'black', 'gray', 'slate', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'],
      description: 'The text color theme',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'],
      description: 'The text size (only applies to non-heading variants)',
    },
    weight: {
      control: { type: 'select' },
      options: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
      description: 'The font weight (only applies to non-heading variants)',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
      description: 'The text alignment',
    },
    dir: {
      control: { type: 'select' },
      options: ['ltr', 'rtl', 'auto'],
      description: 'The text direction',
    },
    as: {
      control: { type: 'text' },
      description: 'The HTML element to render as (e.g., "span", "div", "button")',
    },
    children: {
      control: { type: 'text' },
      description: 'The text content',
    },
    truncate: {
      control: { type: 'boolean' },
      description: 'Truncate text with ellipsis',
    },
    noWrap: {
      control: { type: 'boolean' },
      description: 'Prevent text wrapping',
    },
    underline: {
      control: { type: 'boolean' },
      description: 'Add underline to text',
    },
    italic: {
      control: { type: 'boolean' },
      description: 'Make text italic',
    },
    uppercase: {
      control: { type: 'boolean' },
      description: 'Transform text to uppercase',
    },
    lowercase: {
      control: { type: 'boolean' },
      description: 'Transform text to lowercase',
    },
    capitalize: {
      control: { type: 'boolean' },
      description: 'Transform text to capitalize',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  args: {
    children: 'Default Typography',
  },
};

export const WithText: Story = {
  args: {
    children: 'This is a sample text with default styling',
    variant: 'p',
    color: 'default',
  },
};

// Heading Stories
export const Heading1: Story = {
  args: {
    children: 'Heading 1 - Main Title',
    variant: 'h1',
  },
};

export const Heading2: Story = {
  args: {
    children: 'Heading 2 - Section Title',
    variant: 'h2',
  },
};

export const Heading3: Story = {
  args: {
    children: 'Heading 3 - Subsection',
    variant: 'h3',
  },
};

export const Heading4: Story = {
  args: {
    children: 'Heading 4 - Minor Section',
    variant: 'h4',
  },
};

export const Heading5: Story = {
  args: {
    children: 'Heading 5 - Small Section',
    variant: 'h5',
  },
};

export const Heading6: Story = {
  args: {
    children: 'Heading 6 - Tiny Section',
    variant: 'h6',
  },
};

// Text Variant Stories
export const Paragraph: Story = {
  args: {
    children: 'This is a regular paragraph with default styling and improved readability.',
    variant: 'p',
  },
};

export const LeadText: Story = {
  args: {
    children: 'This is a lead paragraph that stands out from regular text with enhanced spacing and typography.',
    variant: 'lead',
  },
};

export const LargeText: Story = {
  args: {
    children: 'This is large text for emphasis and important content.',
    variant: 'large',
  },
};

export const SmallText: Story = {
  args: {
    children: 'This is small text for fine print, captions, and secondary information.',
    variant: 'small',
  },
};

export const MutedText: Story = {
  args: {
    children: 'This is muted text for secondary information and subtle content.',
    variant: 'muted',
  },
};

// Code Stories
export const CodeBlock: Story = {
  args: {
    children: 'const example = "This is a code block with enhanced styling";',
    variant: 'code',
  },
};

export const InlineCodeText: Story = {
  args: {
    children: 'InlineCode',
    variant: 'inlineCode',
  },
};

export const BlockquoteText: Story = {
  args: {
    children: 'This is a blockquote that can be used for highlighting important quotes, citations, or testimonials. It features a beautiful left border and subtle background styling.',
    variant: 'blockquote',
  },
};

export const ListText: Story = {
  args: {
    children: (
      <>
        <li>First list item with enhanced spacing and typography</li>
        <li>Second list item that demonstrates improved readability</li>
        <li>Third list item with longer text to show proper wrapping and line height</li>
        <li>Fourth list item for complete demonstration</li>
      </>
    ),
    variant: 'list',
  },
};

// Color Stories
export const Primary: Story = {
  args: {
    children: 'Primary color text',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary color text',
    color: 'secondary',
  },
};

export const Success: Story = {
  args: {
    children: 'Success color text',
    color: 'success',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive color text',
    color: 'destructive',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning color text',
    color: 'warning',
  },
};

export const Info: Story = {
  args: {
    children: 'Info color text',
    color: 'info',
  },
};

// Size Stories
export const ExtraSmall: Story = {
  args: {
    children: 'Extra small text (xs) - Perfect for labels and captions',
    size: 'xs',
  },
};

export const SmallSize: Story = {
  args: {
    children: 'Small text (sm) - Great for secondary information',
    size: 'sm',
  },
};

export const BaseSize: Story = {
  args: {
    children: 'Base text (base) - Standard body text size',
    size: 'base',
  },
};

export const LargeSize: Story = {
  args: {
    children: 'Large text (lg) - Enhanced readability',
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    children: 'Extra large text (xl) - Prominent content',
    size: 'xl',
  },
};

export const TwoXL: Story = {
  args: {
    children: '2XL text (2xl) - Section headers',
    size: '2xl',
  },
};

export const ThreeXL: Story = {
  args: {
    children: '3XL text (3xl) - Major emphasis',
    size: '3xl',
  },
};

// Weight Stories
export const Thin: Story = {
  args: {
    children: 'Thin weight text',
    weight: 'thin',
  },
};

export const Light: Story = {
  args: {
    children: 'Light weight text',
    weight: 'light',
  },
};

export const Normal: Story = {
  args: {
    children: 'Normal weight text',
    weight: 'normal',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium weight text',
    weight: 'medium',
  },
};

export const Semibold: Story = {
  args: {
    children: 'Semibold weight text',
    weight: 'semibold',
  },
};

export const Bold: Story = {
  args: {
    children: 'Bold weight text',
    weight: 'bold',
  },
};

export const Extrabold: Story = {
  args: {
    children: 'Extrabold weight text',
    weight: 'extrabold',
  },
};

export const Black: Story = {
  args: {
    children: 'Black weight text',
    weight: 'black',
  },
};

// Alignment Stories
export const LeftAlign: Story = {
  args: {
    children: 'Left aligned text (default) - This is the standard alignment for most content.',
    align: 'left',
  },
};

export const CenterAlign: Story = {
  args: {
    children: 'Center aligned text - Perfect for headings and call-to-action text.',
    align: 'center',
  },
};

export const RightAlign: Story = {
  args: {
    children: 'Right aligned text - Useful for numbers and specific layouts.',
    align: 'right',
  },
};

export const JustifyAlign: Story = {
  args: {
    children: 'Justified text that spreads across the full width of the container. This creates even left and right margins for a clean, professional look that\'s commonly used in print design.',
    align: 'justify',
  },
};

// Text Utility Stories
export const Truncate: Story = {
  args: {
    children: 'This is a very long text that will be truncated with an ellipsis when it overflows its container. This is useful for maintaining consistent layouts and preventing text from breaking the design.',
    truncate: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const NoWrap: Story = {
  args: {
    children: 'This text will not wrap to the next line and maintains its formatting',
    noWrap: true,
  },
};

export const Underline: Story = {
  args: {
    children: 'Underlined text for emphasis',
    underline: true,
  },
};

export const Italic: Story = {
  args: {
    children: 'Italic text for quotes and emphasis',
    italic: true,
  },
};

export const Uppercase: Story = {
  args: {
    children: 'uppercase text for headings',
    uppercase: true,
  },
};

export const Lowercase: Story = {
  args: {
    children: 'LOWERCASE TEXT for special effects',
    lowercase: true,
  },
};

export const Capitalize: Story = {
  args: {
    children: 'capitalized text for titles',
    capitalize: true,
  },
};

// Custom Element Stories
export const AsSpan: Story = {
  args: {
    children: 'This renders as a span element instead of a paragraph',
    as: 'span',
    variant: 'p',
    color: 'primary',
  },
};

export const AsDiv: Story = {
  args: {
    children: 'This renders as a div with large variant and success color',
    as: 'div',
    variant: 'large',
    color: 'success',
    align: 'center',
  },
};

export const AsButton: Story = {
  args: {
    children: 'Click me! (Typography as button)',
    as: 'button',
    variant: 'large',
    color: 'primary',
    className: 'hover:text-blue-700 transition-colors cursor-pointer px-4 py-2 border border-blue-600 rounded-md',
    onClick: () => alert('Typography can be interactive!'),
  },
};

// RTL/LTR Stories
export const RTL: Story = {
  args: {
    children: 'هذا نص باللغة العربية مع دعم RTL',
    dir: 'rtl',
    align: 'right',
  },
};

export const LTR: Story = {
  args: {
    children: 'This is English text with LTR support',
    dir: 'ltr',
    align: 'left',
  },
};

export const AutoDirection: Story = {
  args: {
    children: 'This text will automatically detect direction from DOM or locale',
    dir: 'auto',
  },
};

// Comprehensive Examples
export const AllHeadings: Story = {
  render: () => (
    <div className="space-y-4">
      <H1>Heading 1 - Main Title</H1>
      <H2>Heading 2 - Section Title</H2>
      <H3>Heading 3 - Subsection</H3>
      <H4>Heading 4 - Minor Section</H4>
      <H5>Heading 5 - Small Section</H5>
      <H6>Heading 6 - Tiny Section</H6>
    </div>
  ),
};

export const AllTextVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <P>This is a regular paragraph with default styling and improved readability.</P>
      <Lead>This is a lead paragraph that stands out from regular text with enhanced spacing and typography.</Lead>
      <Large>This is large text for emphasis and important content.</Large>
      <Small>This is small text for fine print, captions, and secondary information.</Small>
      <Muted>This is muted text for secondary information and subtle content.</Muted>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="p-4 bg-gray-50 rounded-lg">
        <P color="default">Default color text</P>
      </div>
      <div className="p-4 bg-blue-50 rounded-lg">
        <P color="primary">Primary color text</P>
      </div>
      <div className="p-4 bg-purple-50 rounded-lg">
        <P color="accent">Accent color text</P>
      </div>
      <div className="p-4 bg-red-50 rounded-lg">
        <P color="destructive">Destructive color text</P>
      </div>
      <div className="p-4 bg-emerald-50 rounded-lg">
        <P color="success">Success color text</P>
      </div>
      <div className="p-4 bg-amber-50 rounded-lg">
        <P color="warning">Warning color text</P>
      </div>
      <div className="p-4 bg-sky-50 rounded-lg">
        <P color="info">Info color text</P>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg">
        <P color="muted">Muted color text</P>
      </div>
      <div className="p-4 bg-slate-50 rounded-lg">
        <P color="slate">Slate color text</P>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-3">
      <P size="xs">Extra small text (xs) - Perfect for labels and captions</P>
      <P size="sm">Small text (sm) - Great for secondary information</P>
      <P size="base">Base text (base) - Standard body text size</P>
      <P size="lg">Large text (lg) - Enhanced readability</P>
      <P size="xl">Extra large text (xl) - Prominent content</P>
      <P size="2xl">2XL text (2xl) - Section headers</P>
      <P size="3xl">3XL text (3xl) - Major emphasis</P>
    </div>
  ),
};

export const AllWeights: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <P weight="thin">Thin weight text</P>
        <P weight="light">Light weight text</P>
        <P weight="normal">Normal weight text</P>
        <P weight="medium">Medium weight text</P>
      </div>
      <div className="space-y-2">
        <P weight="semibold">Semibold weight text</P>
        <P weight="bold">Bold weight text</P>
        <P weight="extrabold">Extrabold weight text</P>
        <P weight="black">Black weight text</P>
      </div>
    </div>
  ),
};

export const AllAlignments: Story = {
  render: () => (
    <div className="space-y-4">
      <P align="left">Left aligned text (default) - This is the standard alignment for most content.</P>
      <P align="center">Center aligned text - Perfect for headings and call-to-action text.</P>
      <P align="right">Right aligned text - Useful for numbers and specific layouts.</P>
      <P align="justify">
        Justified text that spreads across the full width of the container. 
        This creates even left and right margins for a clean, professional look that's commonly used in print design.
      </P>
    </div>
  ),
};

export const TextUtilities: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 rounded-lg">
        <P truncate>
          This is a very long text that will be truncated with an ellipsis when it overflows its container. 
          This is useful for maintaining consistent layouts and preventing text from breaking the design.
        </P>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg">
        <P noWrap>This text will not wrap to the next line and maintains its formatting</P>
      </div>
      <div className="space-y-2">
        <P underline>Underlined text for emphasis</P>
        <P italic>Italic text for quotes and emphasis</P>
        <P uppercase>uppercase text for headings</P>
        <P lowercase>LOWERCASE TEXT for special effects</P>
        <P capitalize>capitalized text for titles</P>
      </div>
    </div>
  ),
};

export const CodeAndTechnical: Story = {
  render: () => (
    <div className="space-y-4">
      <P>
        Use <InlineCode>InlineCode</InlineCode> for inline code snippets and technical terms.
      </P>
      <Code>const example = "This is a code block with enhanced styling";</Code>
      <Blockquote>
        "This is a blockquote that can be used for highlighting important quotes, citations, or testimonials. 
        It features a beautiful left border and subtle background styling."
      </Blockquote>
    </div>
  ),
};

export const TableExample: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography as="table" variant="table" className="border-collapse">
        <thead>
          <tr>
            <Typography as="th" variant="tableHeader">Name</Typography>
            <Typography as="th" variant="tableHeader">Email</Typography>
            <Typography as="th" variant="tableHeader">Role</Typography>
            <Typography as="th" variant="tableHeader">Status</Typography>
          </tr>
        </thead>
        <tbody>
          <Typography as="tr" variant="tableRow">
            <Typography as="td" variant="tableCell">John Doe</Typography>
            <Typography as="td" variant="tableCell">john@example.com</Typography>
            <Typography as="td" variant="tableCell">Admin</Typography>
            <Typography as="td" variant="tableCell">
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                Active
              </span>
            </Typography>
          </Typography>
          <Typography as="tr" variant="tableRow">
            <Typography as="td" variant="tableCell">Jane Smith</Typography>
            <Typography as="td" variant="tableCell">jane@example.com</Typography>
            <Typography as="td" variant="tableCell">User</Typography>
            <Typography as="td" variant="tableCell">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                Pending
              </span>
            </Typography>
          </Typography>
        </tbody>
      </Typography>
    </div>
  ),
};

export const ResponsiveTypography: Story = {
  render: () => (
    <div className="space-y-4">
      <H1 size="4xl" className="lg:text-6xl xl:text-7xl">
        Responsive Heading
      </H1>
      <P size="lg" className="lg:text-xl xl:text-2xl">
        This text scales responsively across different screen sizes
      </P>
    </div>
  ),
};

export const InteractiveTypography: Story = {
  render: () => {
    const [count, setCount] = React.useState(0);
    
    return (
      <div className="space-y-4">
        <div className="text-center">
          <P className="text-lg mb-4">Count: {count}</P>
          <Typography
            as="button"
            variant="large"
            color="primary"
            className="hover:text-blue-700 transition-colors cursor-pointer px-4 py-2 border border-blue-600 rounded-md"
            onClick={() => setCount(prev => prev + 1)}
          >
            Click me! (Typography as button)
          </Typography>
        </div>
      </div>
    );
  },
};

export const Accessibility: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Accessibility Features</h3>
        <div className="space-y-2">
          <Typography aria-label="Screen reader accessible text">
            This text has proper ARIA labels for screen readers
          </Typography>
          <Typography role="heading" aria-level={2}>
            This text acts as a heading for screen readers
          </Typography>
          <Typography dir="rtl" lang="ar">
            هذا نص باللغة العربية مع دعم RTL
          </Typography>
        </div>
      </div>
    </div>
  ),
};

// Convenience Components
export const ConvenienceComponents: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Convenience Components</h3>
        <div className="space-y-2">
          <H1 color="blue">H1 Component</H1>
          <H2 color="green">H2 Component</H2>
          <P size="lg">P Component</P>
          <Lead align="center">Lead Component</Lead>
          <Code>Code Component</Code>
          <Blockquote>Blockquote Component</Blockquote>
        </div>
      </div>
    </div>
  ),
};
