import { useState } from 'react'
import { ChevronRightIcon, PlusIcon, ArrowDownIcon, ChevronUpIcon } from 'lucide-react'
import { Accordion, type AccordionItem } from '../accordion'

// Example 1: Basic Usage
export const BasicAccordionExample = () => {
  const items: AccordionItem[] = [
    {
      id: 'faq-1',
      title: 'What is this component library?',
      content: 'This is a comprehensive React component library built with TypeScript, Tailwind CSS, and Radix UI primitives. It provides accessible, customizable components for modern web applications.'
    },
    {
      id: 'faq-2',
      title: 'How do I install it?',
      content: 'You can install this component library using npm or yarn. Run `npm install @your-org/component-library` or `yarn add @your-org/component-library` in your project directory.'
    },
    {
      id: 'faq-3',
      title: 'Is it accessible?',
      content: 'Yes! All components are built with accessibility in mind, following WCAG guidelines and using proper ARIA attributes. They work with screen readers and keyboard navigation.'
    }
  ]

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <Accordion items={items} />
    </div>
  )
}

// Example 2: Multiple Selection
export const MultipleSelectionExample = () => {
  const items: AccordionItem[] = [
    {
      id: 'feature-1',
      title: 'TypeScript Support',
      content: 'Full TypeScript support with comprehensive type definitions for all components and their props.'
    },
    {
      id: 'feature-2',
      title: 'Tailwind CSS Integration',
      content: 'Seamlessly integrated with Tailwind CSS for rapid styling and customization.'
    },
    {
      id: 'feature-3',
      title: 'Radix UI Primitives',
      content: 'Built on top of Radix UI primitives for accessibility and behavior, with custom styling on top.'
    },
    {
      id: 'feature-4',
      title: 'Storybook Documentation',
      content: 'Comprehensive Storybook documentation with interactive examples and prop documentation.'
    }
  ]

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Component Features</h2>
      <Accordion 
        items={items} 
        type="multiple"
        variant="bordered"
        defaultValue={['feature-1', 'feature-2']}
      />
    </div>
  )
}

// Example 3: Controlled Component
export const ControlledAccordionExample = () => {
  const [openItems, setOpenItems] = useState<string[]>(['step-1'])
  
  const items: AccordionItem[] = [
    {
      id: 'step-1',
      title: 'Step 1: Setup',
      content: 'Initialize your project and install the necessary dependencies.'
    },
    {
      id: 'step-2',
      title: 'Step 2: Configuration',
      content: 'Configure your build tools and development environment.'
    },
    {
      id: 'step-3',
      title: 'Step 3: Implementation',
      content: 'Start building your application with the component library.'
    }
  ]

  const handleStepClick = (stepId: string) => {
    setOpenItems(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Setup Guide</h2>
      
      <div className="mb-4 flex gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleStepClick(item.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              openItems.includes(item.id)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      <Accordion 
        items={items} 
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
      />
    </div>
  )
}

// Example 4: Different Variants and Sizes
export const VariantsAndSizesExample = () => {
  const items: AccordionItem[] = [
    {
      id: 'variant-1',
      title: 'Default Variant',
      content: 'This is the default variant with minimal styling.'
    },
    {
      id: 'variant-2',
      title: 'Bordered Variant',
      content: 'This variant includes a border around the entire accordion.'
    },
    {
      id: 'variant-3',
      title: 'Filled Variant',
      content: 'This variant has a filled background for better visual separation.'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold mb-6">Variants and Sizes</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Small Size</h3>
          <Accordion items={items} size="sm" variant="bordered" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Medium Size</h3>
          <Accordion items={items} size="md" variant="filled" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Large Size</h3>
          <Accordion items={items} size="lg" variant="default" />
        </div>
      </div>
    </div>
  )
}

// Example 5: Complex Content
export const ComplexContentExample = () => {
  const items: AccordionItem[] = [
    {
      id: 'complex-1',
      title: 'User Dashboard',
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Welcome to your dashboard!</h3>
            <p>Here you can manage all your projects and settings.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-green-600">Active Projects</h4>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-blue-600">Completed Tasks</h4>
              <p className="text-2xl font-bold">48</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">React</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">TypeScript</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Tailwind</span>
          </div>
        </div>
      )
    },
    {
      id: 'complex-2',
      title: 'Project Settings',
      content: (
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800">Configuration</h4>
            <p className="text-yellow-700">Configure your project settings and preferences.</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Dark Mode</span>
              <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Notifications</span>
              <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Complex Content Example</h2>
      <Accordion items={items} type="multiple" />
    </div>
  )
}

// Example 6: Disabled Items
export const DisabledItemsExample = () => {
  const items: AccordionItem[] = [
    {
      id: 'available-1',
      title: 'Available Feature',
      content: 'This feature is available and can be accessed.'
    },
    {
      id: 'disabled-1',
      title: 'Premium Feature (Disabled)',
      content: 'This is a premium feature that requires a subscription.',
      disabled: true
    },
    {
      id: 'available-2',
      title: 'Another Available Feature',
      content: 'This feature is also available for all users.'
    },
    {
      id: 'disabled-2',
      title: 'Coming Soon (Disabled)',
      content: 'This feature is currently in development and will be available soon.',
      disabled: true
    }
  ]

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Feature Access</h2>
      <Accordion items={items} />
    </div>
  )
}

// Example 7: Custom Styling
export const CustomStylingExample = () => {
  const items: AccordionItem[] = [
    {
      id: 'custom-1',
      title: 'Custom Styled Item',
      content: 'This accordion has custom styling applied to demonstrate the flexibility of the component.'
    },
    {
      id: 'custom-2',
      title: 'Another Custom Item',
      content: 'You can customize the appearance using className props for different parts of the accordion.'
    }
  ]

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Custom Styling</h2>
      <Accordion 
        items={items}
        className="border-2 border-purple-200 rounded-xl shadow-lg"
        itemClassName="border-purple-100"
        triggerClassName="bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-900 font-semibold"
        contentClassName="bg-purple-25 text-purple-800"
        chevronPosition="left"
      />
    </div>
  )
}

// Example 8: Custom Icons
export const CustomIconsExample = () => {
  const items: AccordionItem[] = [
    {
      id: 'icon-1',
      title: 'Default Chevron Icon',
      content: 'This uses the default ChevronDownIcon from Lucide React.'
    },
    {
      id: 'icon-2',
      title: 'Chevron Right Icon',
      content: 'This uses ChevronRightIcon for a different visual style.'
    },
    {
      id: 'icon-3',
      title: 'Plus Icon',
      content: 'This uses PlusIcon with custom green styling.'
    },
    {
      id: 'icon-4',
      title: 'Arrow Down Icon',
      content: 'This uses ArrowDownIcon with custom blue styling.'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold mb-6">Custom Icons</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Default Chevron</h3>
          <Accordion items={items.slice(0, 2)} />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Chevron Right</h3>
          <Accordion items={items.slice(0, 2)} icon={ChevronRightIcon} />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Plus Icon</h3>
          <Accordion 
            items={items.slice(0, 2)} 
            icon={PlusIcon} 
            iconClassName="text-green-600" 
          />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Arrow Down</h3>
          <Accordion 
            items={items.slice(0, 2)} 
            icon={ArrowDownIcon} 
            iconClassName="text-blue-600" 
          />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Chevron Up</h3>
          <Accordion 
            items={items.slice(0, 2)} 
            icon={ChevronUpIcon} 
            iconClassName="text-purple-600" 
          />
        </div>
      </div>
    </div>
  )
}

// Example 9: RTL Support
export const RTLSupportExample = () => {
  const items: AccordionItem[] = [
    {
      id: 'rtl-1',
      title: 'ما هو React؟',
      content: 'React هي مكتبة JavaScript لبناء واجهات المستخدم، خاصة تطبيقات الويب. تم إنشاؤها بواسطة Facebook وهي الآن محافظة عليها من قبل المجتمع.'
    },
    {
      id: 'rtl-2',
      title: 'ما هي مزايا استخدام TypeScript؟',
      content: 'TypeScript يوفر فحص الأنواع الثابت، مما يساعد في اكتشاف الأخطاء مبكراً وتحسين جودة الكود. كما يوفر IntelliSense أفضل وأدوات تطوير متقدمة.'
    }
  ]

  return (
    <div dir="rtl" className="max-w-2xl mx-auto p-6 text-right">
      <h2 className="text-2xl font-bold mb-6">دعم اللغة العربية</h2>
      <Accordion 
        items={items}
        chevronPosition="left"
        variant="bordered"
      />
    </div>
  )
}

// Main Example Component
export const AccordionExamples = () => {
  return (
    <div className="space-y-16 py-8">
      <BasicAccordionExample />
      <MultipleSelectionExample />
      <ControlledAccordionExample />
      <VariantsAndSizesExample />
      <ComplexContentExample />
      <DisabledItemsExample />
      <CustomStylingExample />
      <CustomIconsExample />
      <RTLSupportExample />
    </div>
  )
}

export default AccordionExamples
