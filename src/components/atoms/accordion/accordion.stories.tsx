import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';
import './accordion.css';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Atoms/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible, accessible accordion component with multiple variants, sizes, colors, and RTL/LTR support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
      description: 'Whether only one or multiple items can be open',
    },
    collapsible: {
      control: { type: 'boolean' },
      description: 'Whether items can be collapsed',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'card', 'ghost'],
      description: 'Visual style variant',
    },
    rounded: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Border radius variant',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether to take full available width',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the entire accordion is disabled',
    },
    dir: {
      control: { type: 'select' },
      options: ['ltr', 'rtl', 'auto'],
      description: 'Text direction (auto-detects from HTML/body)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Accordion Story
export const Basic: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args) => (
    <div className="w-96">
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
    </div>
  ),
};

// Multiple Accordion Story
export const Multiple: Story = {
  args: {
    type: 'multiple',
    collapsible: false,
  },
  render: (args) => (
    <div className="w-96">
      <Accordion {...args}>
        <AccordionItem value="tech-1">
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
        <AccordionItem value="tech-2">
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
        <AccordionItem value="tech-3">
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
    </div>
  ),
};

// Size Variants Story
export const SizeVariants: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Small (sm)</h3>
        <Accordion className="border rounded-lg">
          <AccordionItem value="size-sm">
            <AccordionTrigger size="sm">Small Accordion</AccordionTrigger>
            <AccordionContent>This is a small sized accordion.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Medium (md) - Default</h3>
        <Accordion className="border rounded-lg">
          <AccordionItem value="size-md">
            <AccordionTrigger size="md">Medium Accordion</AccordionTrigger>
            <AccordionContent>This is the default medium sized accordion.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Large (lg)</h3>
        <Accordion className="border rounded-lg">
          <AccordionItem value="size-lg">
            <AccordionTrigger size="lg">Large Accordion</AccordionTrigger>
            <AccordionContent>This is a large sized accordion.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Extra Large (xl)</h3>
        <Accordion className="border rounded-lg">
          <AccordionItem value="size-xl">
            <AccordionTrigger size="xl">Extra Large Accordion</AccordionTrigger>
            <AccordionContent>This is an extra large sized accordion.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

// Color Variants Story
export const ColorVariants: Story = {
  render: () => (
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
      <Accordion className="border rounded-lg">
        <AccordionItem value="color-primary">
          <AccordionTrigger color="primary">Primary Color</AccordionTrigger>
          <AccordionContent>This accordion uses primary colors.</AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Accordion className="border rounded-lg">
        <AccordionItem value="color-secondary">
          <AccordionTrigger color="secondary">Secondary Color</AccordionTrigger>
          <AccordionContent>This accordion uses secondary colors.</AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Accordion className="border rounded-lg">
        <AccordionItem value="color-success">
          <AccordionTrigger color="success">Success Color</AccordionTrigger>
          <AccordionContent>This accordion uses success colors.</AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Accordion className="border rounded-lg">
        <AccordionItem value="color-warning">
          <AccordionTrigger color="warning">Warning Color</AccordionTrigger>
          <AccordionContent>This accordion uses warning colors.</AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Accordion className="border rounded-lg">
        <AccordionItem value="color-danger">
          <AccordionTrigger color="danger">Danger Color</AccordionTrigger>
          <AccordionContent>This accordion uses danger colors.</AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Accordion className="border rounded-lg">
        <AccordionItem value="color-default">
          <AccordionTrigger color="default">Default Color</AccordionTrigger>
          <AccordionContent>This accordion uses default colors.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// Style Variants Story
export const StyleVariants: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Default Variant</h3>
        <Accordion variant="default" className="border-b">
          <AccordionItem value="variant-default">
            <AccordionTrigger>Default Style</AccordionTrigger>
            <AccordionContent>This is the default variant with bottom borders.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Bordered Variant</h3>
        <Accordion variant="bordered" className="border rounded-lg">
          <AccordionItem value="variant-bordered">
            <AccordionTrigger>Bordered Style</AccordionTrigger>
            <AccordionContent>This variant has a border around the entire accordion.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Card Variant</h3>
        <Accordion variant="card" className="shadow-sm">
          <AccordionItem value="variant-card">
            <AccordionTrigger>Card Style</AccordionTrigger>
            <AccordionContent>This variant has a card-like appearance with shadows.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Ghost Variant</h3>
        <Accordion variant="ghost">
          <AccordionItem value="variant-ghost">
            <AccordionTrigger>Ghost Style</AccordionTrigger>
            <AccordionContent>This variant has minimal styling with hover effects.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

// Rounded Variants Story
export const RoundedVariants: Story = {
  render: () => (
    <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4">
      <Accordion rounded="none" className="border">
        <AccordionItem value="rounded-none">
          <AccordionTrigger>No Rounded</AccordionTrigger>
          <AccordionContent>Sharp corners</AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Accordion rounded="sm" className="border">
        <AccordionItem value="rounded-sm">
          <AccordionTrigger>Small Rounded</AccordionTrigger>
          <AccordionContent>Slightly rounded</AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Accordion rounded="lg" className="border">
        <AccordionItem value="rounded-lg">
          <AccordionTrigger>Large Rounded</AccordionTrigger>
          <AccordionContent>More rounded</AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Accordion rounded="full" className="border">
        <AccordionItem value="rounded-full">
          <AccordionTrigger>Full Rounded</AccordionTrigger>
          <AccordionContent>Fully rounded</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// Icon Variants Story
export const IconVariants: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <Accordion className="border rounded-lg">
        <AccordionItem value="icon-chevron">
          <AccordionTrigger iconVariant="chevron">Chevron Icons</AccordionTrigger>
          <AccordionContent>Uses chevron icons that change direction.</AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Accordion className="border rounded-lg">
        <AccordionItem value="icon-plus">
          <AccordionTrigger iconVariant="plus">Plus/Minus Icons</AccordionTrigger>
          <AccordionContent>Uses plus and minus icons.</AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Accordion className="border rounded-lg">
        <AccordionItem value="icon-arrow">
          <AccordionTrigger iconVariant="arrow">Arrow Icons</AccordionTrigger>
          <AccordionContent>Uses arrow icons pointing in different directions.</AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Accordion className="border rounded-lg">
        <AccordionItem value="no-icon">
          <AccordionTrigger showIcon={false}>No Icons</AccordionTrigger>
          <AccordionContent>This accordion doesn't show any icons.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// States Story
export const States: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Disabled State</h3>
        <Accordion disabled className="border rounded-lg opacity-50">
          <AccordionItem value="disabled" disabled>
            <AccordionTrigger disabled>Disabled Accordion</AccordionTrigger>
            <AccordionContent>This accordion is disabled and cannot be interacted with.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Loading State</AccordionTrigger>
        <Accordion className="border rounded-lg">
          <AccordionItem value="loading">
            <AccordionTrigger loading>Loading Accordion</AccordionTrigger>
            <AccordionContent>This accordion shows a loading spinner.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

// RTL/LTR Story
export const RTLSupport: Story = {
  render: () => {
    const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
    
    const toggleDirection = () => {
      setDirection(prev => prev === 'ltr' ? 'rtl' : 'ltr');
    };
    
    return (
      <div className="w-96 space-y-4">
        <div className="text-center">
          <button
            onClick={toggleDirection}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Switch to {direction === 'ltr' ? 'RTL' : 'LTR'}
          </button>
          <p className="mt-2 text-sm text-muted-foreground">
            Current: {direction.toUpperCase()}
          </p>
        </div>
        
        <Accordion dir={direction} className="border rounded-lg">
          <AccordionItem value="rtl-test">
            <AccordionTrigger>
              {direction === 'rtl' ? 'ما هو React؟' : 'What is React?'}
            </AccordionTrigger>
            <AccordionContent>
              {direction === 'rtl' 
                ? 'React هي مكتبة JavaScript لبناء واجهات المستخدم.'
                : 'React is a JavaScript library for building user interfaces.'
              }
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  },
};

// Interactive Story
export const Interactive: Story = {
  render: () => {
    const [openItems, setOpenItems] = useState<string[]>([]);
    
    return (
      <div className="w-96 space-y-4">
        <div className="text-sm text-muted-foreground">
          Open items: {openItems.length > 0 ? openItems.join(', ') : 'None'}
        </div>
        
        <Accordion 
          type="multiple" 
          value={openItems}
          onValueChange={setOpenItems}
          className="border rounded-lg"
        >
          <AccordionItem value="interactive-1">
            <AccordionTrigger>Interactive Item 1</AccordionTrigger>
            <AccordionContent>
              This accordion tracks which items are open. You can open multiple items at once.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="interactive-2">
            <AccordionTrigger>Interactive Item 2</AccordionTrigger>
            <AccordionContent>
              The state is controlled externally, allowing for custom behavior and animations.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="interactive-3">
            <AccordionTrigger>Interactive Item 3</AccordionTrigger>
            <AccordionContent>
              You can programmatically control which items are open or closed.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  },
};

// Custom Styling Story
export const CustomStyling: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <Accordion className="border-2 border-primary/20 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5">
        <AccordionItem value="custom-1" className="border-primary/20">
          <AccordionTrigger 
            className="text-primary font-semibold hover:bg-primary/10"
            iconClassName="text-primary"
          >
            Custom Styled Accordion
          </AccordionTrigger>
          <AccordionContent className="text-primary/80">
            This accordion demonstrates custom styling with primary colors, gradients, and enhanced hover effects.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Accordion className="border rounded-lg bg-card shadow-lg">
        <AccordionItem value="custom-2">
          <AccordionTrigger className="font-bold text-lg">
            Enhanced Typography
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            This accordion uses custom typography and enhanced visual styling.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}; 