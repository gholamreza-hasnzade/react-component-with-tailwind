import React, { useState } from 'react';
import { Accordion } from './accordion';

export const AccordionExample: React.FC = () => {
  const [controlledOpenItems, setControlledOpenItems] = useState<Set<string>>(new Set(['item-1']));
  const [controlledOpenItems2, setControlledOpenItems2] = useState<Set<string>>(new Set());

  const handleControlledToggle = (id: string, isOpen: boolean) => {
    setControlledOpenItems(prev => {
      const newSet = new Set(prev);
      if (isOpen) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  const handleControlledToggle2 = (id: string, isOpen: boolean) => {
    setControlledOpenItems2(prev => {
      const newSet = new Set(prev);
      if (isOpen) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  const handleItemToggle = (openItems: string[]) => {
    console.log('Open items changed:', openItems);
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Accordion Component</h1>
        <p className="text-gray-600 text-lg">
          A flexible and accessible accordion component with multiple variants and sizes.
        </p>
      </div>

      {/* Default Variant */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Default Variant</h2>
        <Accordion 
          variant="default" 
          size="md" 
          allowMultiple={false}
          defaultOpen={['item-1']}
          onItemToggle={handleItemToggle}
        >
          <Accordion.Item id="item-1">
            <Accordion.Trigger>
              What is React?
            </Accordion.Trigger>
            <Accordion.Content>
              <p className="mb-3">
                React is a JavaScript library for building user interfaces, particularly single-page applications. 
                It's used for handling the view layer and can be used for developing both web and mobile applications.
              </p>
              <p>
                React allows developers to create large web applications that can change data without reloading the page. 
                Its main goal is to be fast, scalable, and simple.
              </p>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item id="item-2">
            <Accordion.Trigger>
              Why use React?
            </Accordion.Trigger>
            <Accordion.Content>
              <ul className="list-disc list-inside space-y-2">
                <li>Component-based architecture</li>
                <li>Virtual DOM for better performance</li>
                <li>Large ecosystem and community</li>
                <li>Easy to learn and use</li>
                <li>Great developer tools</li>
              </ul>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item id="item-3">
            <Accordion.Trigger>
              How does React work?
            </Accordion.Trigger>
            <Accordion.Content>
              <p>
                React works by creating a virtual representation of the UI in memory called the Virtual DOM. 
                When the state of a component changes, React creates a new Virtual DOM tree and compares it 
                with the previous one to determine what has changed. Then it efficiently updates only the 
                necessary parts of the actual DOM.
              </p>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>

      {/* Bordered Variant */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bordered Variant</h2>
        <Accordion variant="bordered" size="md" allowMultiple={true}>
          <Accordion.Item id="bordered-1">
            <Accordion.Trigger>
              Frontend Development
            </Accordion.Trigger>
            <Accordion.Content>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Technologies:</h4>
                <div className="grid grid-cols-2 gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">HTML5</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">CSS3</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">JavaScript</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">React</span>
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item id="bordered-2">
            <Accordion.Trigger>
              Backend Development
            </Accordion.Trigger>
            <Accordion.Content>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Technologies:</h4>
                <div className="grid grid-cols-2 gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Node.js</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Python</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Java</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">PHP</span>
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item id="bordered-3">
            <Accordion.Trigger>
              Database
            </Accordion.Trigger>
            <Accordion.Content>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Types:</h4>
                <div className="grid grid-cols-2 gap-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">MySQL</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">PostgreSQL</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">MongoDB</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">Redis</span>
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>

      {/* Separated Variant */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Separated Variant</h2>
        <Accordion variant="separated" size="lg" allowMultiple={false}>
          <Accordion.Item id="separated-1">
            <Accordion.Trigger>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <span>Getting Started</span>
              </div>
            </Accordion.Trigger>
            <Accordion.Content>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Step 1: Installation</h4>
                <p className="text-blue-700">
                  Install the required dependencies and set up your development environment.
                </p>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item id="separated-2">
            <Accordion.Trigger>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <span>Configuration</span>
              </div>
            </Accordion.Trigger>
            <Accordion.Content>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Step 2: Setup</h4>
                <p className="text-green-700">
                  Configure your project settings and environment variables.
                </p>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item id="separated-3">
            <Accordion.Trigger>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <span>Development</span>
              </div>
            </Accordion.Trigger>
            <Accordion.Content>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Step 3: Build</h4>
                <p className="text-purple-700">
                  Start developing your application with the configured setup.
                </p>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>

      {/* Different Sizes */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Different Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Small Size */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Small Size</h3>
            <Accordion variant="bordered" size="sm" allowMultiple={false}>
              <Accordion.Item id="size-sm-1">
                <Accordion.Trigger>Small Accordion</Accordion.Trigger>
                <Accordion.Content>
                  <p className="text-sm">This is a small sized accordion item.</p>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>

          {/* Medium Size */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Medium Size</h3>
            <Accordion variant="bordered" size="md" allowMultiple={false}>
              <Accordion.Item id="size-md-1">
                <Accordion.Trigger>Medium Accordion</Accordion.Trigger>
                <Accordion.Content>
                  <p>This is a medium sized accordion item.</p>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>

          {/* Large Size */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Large Size</h3>
            <Accordion variant="bordered" size="lg" allowMultiple={false}>
              <Accordion.Item id="size-lg-1">
                <Accordion.Trigger>Large Accordion</Accordion.Trigger>
                <Accordion.Content>
                  <p className="text-lg">This is a large sized accordion item.</p>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Controlled Accordion */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Controlled Accordion</h2>
        <p className="text-gray-600 mb-4">
          This accordion is controlled externally. You can programmatically control which items are open.
        </p>
        
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setControlledOpenItems(new Set(['item-1', 'item-2']))}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Open First Two
          </button>
          <button
            onClick={() => setControlledOpenItems(new Set())}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Close All
          </button>
          <button
            onClick={() => setControlledOpenItems(new Set(['item-3']))}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Open Last Item
          </button>
        </div>

        <Accordion variant="bordered" size="md" allowMultiple={true}>
          <Accordion.Item 
            id="controlled-1" 
            controlled={true}
            isOpen={controlledOpenItems.has('controlled-1')}
            onToggle={handleControlledToggle}
          >
            <Accordion.Trigger>Controlled Item 1</Accordion.Trigger>
            <Accordion.Content>
              <p>This item is controlled externally. Current state: {controlledOpenItems.has('controlled-1') ? 'Open' : 'Closed'}</p>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item 
            id="controlled-2" 
            controlled={true}
            isOpen={controlledOpenItems.has('controlled-2')}
            onToggle={handleControlledToggle}
          >
            <Accordion.Trigger>Controlled Item 2</Accordion.Trigger>
            <Accordion.Content>
              <p>This item is controlled externally. Current state: {controlledOpenItems.has('controlled-2') ? 'Open' : 'Closed'}</p>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item 
            id="controlled-3" 
            controlled={true}
            isOpen={controlledOpenItems.has('controlled-3')}
            onToggle={handleControlledToggle}
          >
            <Accordion.Trigger>Controlled Item 3</Accordion.Trigger>
            <Accordion.Content>
              <p>This item is controlled externally. Current state: {controlledOpenItems.has('controlled-3') ? 'Open' : 'Closed'}</p>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>

      {/* Disabled Items */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Disabled Items</h2>
        <Accordion variant="bordered" size="md" allowMultiple={false}>
          <Accordion.Item id="disabled-1">
            <Accordion.Trigger disabled={true}>
              Disabled Item (Cannot Open)
            </Accordion.Trigger>
            <Accordion.Content>
              <p>This content will never be shown because the item is disabled.</p>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item id="disabled-2">
            <Accordion.Trigger>
              Enabled Item (Can Open)
            </Accordion.Trigger>
            <Accordion.Content>
              <p>This item works normally and can be opened and closed.</p>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item id="disabled-3">
            <Accordion.Trigger disabled={true}>
              Another Disabled Item
            </Accordion.Trigger>
            <Accordion.Content>
              <p>This content is also hidden due to the disabled state.</p>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>

      {/* Custom Icons */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Custom Icons</h2>
        <Accordion variant="bordered" size="md" allowMultiple={true}>
          <Accordion.Item id="custom-icon-1">
            <Accordion.Trigger
              icon={
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            >
              Information Item
            </Accordion.Trigger>
            <Accordion.Content>
              <p>This item has a custom information icon instead of the default chevron.</p>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item id="custom-icon-2">
            <Accordion.Trigger
              icon={
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            >
              Success Item
            </Accordion.Trigger>
            <Accordion.Content>
              <p>This item has a custom checkmark icon.</p>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item id="custom-icon-3">
            <Accordion.Trigger
              icon={
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              }
            >
              Warning Item
            </Accordion.Trigger>
            <Accordion.Content>
              <p>This item has a custom warning icon.</p>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>

      {/* Non-animated Content */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Non-animated Content</h2>
        <Accordion variant="bordered" size="md" allowMultiple={false}>
          <Accordion.Item id="non-animated-1">
            <Accordion.Trigger>Instant Show/Hide</Accordion.Trigger>
            <AccordionContent animated={false}>
              <p>This content appears and disappears instantly without animation.</p>
            </AccordionContent>
          </Accordion.Item>

          <Accordion.Item id="non-animated-2">
            <Accordion.Trigger>Animated Content</Accordion.Trigger>
            <AccordionContent animated={true}>
              <p>This content has smooth animation when opening and closing.</p>
            </AccordionContent>
          </Accordion.Item>
        </Accordion>
      </div>

      {/* Features Summary */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">🎯 Accordion Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Core Features:</h3>
            <ul className="text-blue-600 space-y-1">
              <li>• Multiple variants (default, bordered, separated)</li>
              <li>• Three sizes (sm, md, lg)</li>
              <li>• Single or multiple open items</li>
              <li>• Controlled and uncontrolled modes</li>
              <li>• Disabled state support</li>
              <li>• Custom icon support</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Accessibility:</h3>
            <ul className="text-blue-600 space-y-1">
              <li>• Keyboard navigation support</li>
              <li>• ARIA attributes</li>
              <li>• Screen reader friendly</li>
              <li>• Focus management</li>
              <li>• Semantic HTML structure</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
