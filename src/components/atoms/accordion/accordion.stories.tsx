import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ChevronDownIcon, ChevronRightIcon, PlusIcon, ArrowDownIcon, ChevronUpIcon } from 'lucide-react'
import { Accordion, type AccordionItem } from './accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Atoms/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A collapsible content component built with Radix UI primitives. Supports single and multiple selection modes with customizable styling and animations.'
      }
    }
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
      description: 'Whether the accordion allows single or multiple items to be open'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'filled'],
      description: 'Visual variant of the accordion'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the accordion text and spacing'
    },
    showChevron: {
      control: { type: 'boolean' },
      description: 'Whether to show the chevron icon'
    },
    chevronPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Position of the chevron icon'
    },
    collapsible: {
      control: { type: 'boolean' },
      description: 'Whether items can be collapsed when clicked again'
    },
    icon: {
      control: false,
      description: 'Custom icon component to use instead of the default chevron'
    },
    iconClassName: {
      control: { type: 'text' },
      description: 'Custom className for the icon'
    },
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Accordion>

// Sample data
const sampleItems: AccordionItem[] = [
  {
    id: 'item-1',
    title: 'What is React?',
    content: 'React is a JavaScript library for building user interfaces, particularly web applications. It was created by Facebook and is now maintained by the community.'
  },
  {
    id: 'item-2',
    title: 'What are React hooks?',
    content: 'React hooks are functions that let you use state and other React features in functional components. They were introduced in React 16.8 and include useState, useEffect, and many others.'
  },
  {
    id: 'item-3',
    title: 'What is TypeScript?',
    content: 'TypeScript is a programming language developed by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static type checking to the language.'
  },
  {
    id: 'item-4',
    title: 'What is Tailwind CSS?',
    content: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. It provides low-level utility classes that you can combine to create any design.'
  }
]

const complexItems: AccordionItem[] = [
  {
    id: 'complex-1',
    title: 'Getting Started',
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Welcome to our platform</h3>
        <p>This is a comprehensive guide to get you started with our platform.</p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900">Quick Tips:</h4>
          <ul className="mt-2 space-y-1 text-blue-800">
            <li>• Start with the basics</li>
            <li>• Explore advanced features</li>
            <li>• Join our community</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'complex-2',
    title: 'Advanced Features',
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Advanced Configuration</h3>
        <p>Learn about advanced features and customization options.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium">Feature A</h4>
            <p className="text-sm text-gray-600">Description of feature A</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium">Feature B</h4>
            <p className="text-sm text-gray-600">Description of feature B</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'complex-3',
    title: 'Support & Resources',
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Need Help?</h3>
        <p>We're here to help you succeed with our platform.</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Documentation</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Community</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Support</span>
        </div>
      </div>
    )
  }
]

const disabledItems: AccordionItem[] = [
  {
    id: 'enabled-1',
    title: 'Enabled Item',
    content: 'This item is enabled and can be opened.'
  },
  {
    id: 'disabled-1',
    title: 'Disabled Item',
    content: 'This item is disabled and cannot be opened.',
    disabled: true
  },
  {
    id: 'enabled-2',
    title: 'Another Enabled Item',
    content: 'This item is also enabled.'
  }
]

// Basic Stories
export const Default: Story = {
  args: {
    items: sampleItems,
    type: 'single'
  }
}

export const Multiple: Story = {
  args: {
    items: sampleItems,
    type: 'multiple'
  }
}

export const WithDefaultValue: Story = {
  args: {
    items: sampleItems,
    type: 'single',
    defaultValue: 'item-1'
  }
}

export const WithMultipleDefaultValues: Story = {
  args: {
    items: sampleItems,
    type: 'multiple',
    defaultValue: ['item-1', 'item-3']
  }
}

// Variant Stories
export const Bordered: Story = {
  args: {
    items: sampleItems,
    variant: 'bordered'
  }
}

export const Filled: Story = {
  args: {
    items: sampleItems,
    variant: 'filled'
  }
}

// Size Stories
export const Small: Story = {
  args: {
    items: sampleItems,
    size: 'sm'
  }
}

export const Large: Story = {
  args: {
    items: sampleItems,
    size: 'lg'
  }
}

// Chevron Stories
export const NoChevron: Story = {
  args: {
    items: sampleItems,
    showChevron: false
  }
}

export const ChevronLeft: Story = {
  args: {
    items: sampleItems,
    chevronPosition: 'left'
  }
}

// Disabled Stories
export const WithDisabledItems: Story = {
  args: {
    items: disabledItems
  }
}

// Complex Content Stories
export const ComplexContent: Story = {
  args: {
    items: complexItems,
    type: 'multiple'
  }
}

// Interactive Story
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['item-1'])
    
    return (
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-medium mb-2">Current Value:</h3>
          <code className="text-sm">{JSON.stringify(value)}</code>
        </div>
        <Accordion
          items={sampleItems}
          type="multiple"
          value={value}
          onValueChange={(newValue) => setValue(Array.isArray(newValue) ? newValue : [newValue])}
        />
      </div>
    )
  }
}

// Controlled Story
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string>('item-1')
    
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setValue('item-1')}
            className={`px-3 py-1 rounded text-sm ${
              value === 'item-1' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Item 1
          </button>
          <button
            onClick={() => setValue('item-2')}
            className={`px-3 py-1 rounded text-sm ${
              value === 'item-2' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Item 2
          </button>
          <button
            onClick={() => setValue('item-3')}
            className={`px-3 py-1 rounded text-sm ${
              value === 'item-3' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Item 3
          </button>
        </div>
        <Accordion
          items={sampleItems}
          type="single"
          value={value}
          onValueChange={(newValue) => setValue(Array.isArray(newValue) ? newValue[0] || '' : newValue)}
        />
      </div>
    )
  }
}

// Non-collapsible Story
export const NonCollapsible: Story = {
  args: {
    items: sampleItems,
    collapsible: false
  }
}

// Custom Styling Story
export const CustomStyling: Story = {
  args: {
    items: sampleItems,
    className: 'border-2 border-blue-200 rounded-xl',
    itemClassName: 'border-blue-100',
    triggerClassName: 'bg-blue-50 hover:bg-blue-100 text-blue-900 font-semibold',
    contentClassName: 'bg-blue-25 text-blue-800'
  }
}

// RTL Support Story
export const RTLSupport: Story = {
  render: () => (
    <div dir="rtl" className="text-right">
      <h2 className="text-xl font-bold mb-4">دعم اللغة العربية</h2>
      <Accordion
        items={[
          {
            id: 'rtl-1',
            title: 'ما هو React؟',
            content: 'React هي مكتبة JavaScript لبناء واجهات المستخدم، خاصة تطبيقات الويب. تم إنشاؤها بواسطة Facebook وهي الآن محافظة عليها من قبل المجتمع.'
          },
          {
            id: 'rtl-2',
            title: 'ما هي React hooks؟',
            content: 'React hooks هي دوال تتيح لك استخدام الحالة وميزات React الأخرى في المكونات الوظيفية. تم تقديمها في React 16.8 وتشمل useState و useEffect والعديد من الآخرين.'
          }
        ]}
        chevronPosition="left"
      />
    </div>
  )
}

// Custom Icons Stories
export const WithChevronRight: Story = {
  args: {
    items: sampleItems,
    icon: ChevronRightIcon
  }
}

export const WithPlusMinus: Story = {
  args: {
    items: sampleItems,
    icon: PlusIcon,
    iconClassName: 'text-green-600'
  }
}

export const WithArrows: Story = {
  args: {
    items: sampleItems,
    icon: ArrowDownIcon,
    iconClassName: 'text-blue-600'
  }
}

export const WithChevronUp: Story = {
  args: {
    items: sampleItems,
    icon: ChevronUpIcon,
    iconClassName: 'text-purple-600'
  }
}

export const CustomIconStyling: Story = {
  args: {
    items: sampleItems,
    icon: ChevronDownIcon,
    iconClassName: 'text-red-500 h-6 w-6'
  }
}

export const IconVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-3">Default Chevron</h3>
        <Accordion items={sampleItems} />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Chevron Right</h3>
        <Accordion items={sampleItems} icon={ChevronRightIcon} />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Plus Icon</h3>
        <Accordion items={sampleItems} icon={PlusIcon} iconClassName="text-green-600" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Arrow Down</h3>
        <Accordion items={sampleItems} icon={ArrowDownIcon} iconClassName="text-blue-600" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Chevron Up</h3>
        <Accordion items={sampleItems} icon={ChevronUpIcon} iconClassName="text-purple-600" />
      </div>
    </div>
  )
}

// Accessibility Story
export const Accessibility: Story = {
  args: {
    items: sampleItems,
    type: 'single'
  },
  parameters: {
    docs: {
      description: {
        story: 'This accordion includes proper ARIA attributes, keyboard navigation support, and screen reader compatibility.'
      }
    }
  }
}
