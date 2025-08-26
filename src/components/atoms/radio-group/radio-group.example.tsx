import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from './radio-group';

export const RadioGroupExample = () => {
  const [selections, setSelections] = useState({
    basic: '',
    primary: '',
    secondary: '',
    success: '',
    error: '',
    warning: '',
    info: '',
    small: '',
    large: '',
    disabled: '',
    readOnly: '',
    required: '',
    horizontal: '',
    customLayout: '',
    formExample: '',
    settingsExample: '',
    surveyExample: '',
  });

  const handleSelectionChange = (key: string, value: string) => {
    setSelections(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="p-6 space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold mb-4">Radio Group Component Examples</h2>
        <p className="text-gray-600 mb-6">
          This demonstrates various configurations and states of the Radio Group component with different colors, sizes, and layouts.
        </p>
      </div>

      {/* Basic Radio Group */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Radio Group</h3>
        <RadioGroup
          value={selections.basic}
          onValueChange={(value) => handleSelectionChange('basic', value)}
        >
          <RadioGroupItem value="option1" label="Option 1" />
          <RadioGroupItem value="option2" label="Option 2" />
          <RadioGroupItem value="option3" label="Option 3" />
        </RadioGroup>
        <p className="text-xs text-gray-500 mt-1">
          Selected: {selections.basic || 'None'}
        </p>
      </div>

      {/* Color Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Color Variants</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Primary Color</h4>
            <RadioGroup
              value={selections.primary}
              onValueChange={(value) => handleSelectionChange('primary', value)}
            >
              <RadioGroupItem value="primary1" label="Primary Option 1" color="primary" />
              <RadioGroupItem value="primary2" label="Primary Option 2" color="primary" />
              <RadioGroupItem value="primary3" label="Primary Option 3" color="primary" />
            </RadioGroup>
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selections.primary || 'None'}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Secondary Color</h4>
            <RadioGroup
              value={selections.secondary}
              onValueChange={(value) => handleSelectionChange('secondary', value)}
            >
              <RadioGroupItem value="secondary1" label="Secondary Option 1" color="secondary" />
              <RadioGroupItem value="secondary2" label="Secondary Option 2" color="secondary" />
              <RadioGroupItem value="secondary3" label="Secondary Option 3" color="secondary" />
            </RadioGroup>
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selections.secondary || 'None'}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Success Color</h4>
            <RadioGroup
              value={selections.success}
              onValueChange={(value) => handleSelectionChange('success', value)}
            >
              <RadioGroupItem value="success1" label="Success Option 1" color="success" />
              <RadioGroupItem value="success2" label="Success Option 2" color="success" />
              <RadioGroupItem value="success3" label="Success Option 3" color="success" />
            </RadioGroup>
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selections.success || 'None'}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Error Color</h4>
            <RadioGroup
              value={selections.error}
              onValueChange={(value) => handleSelectionChange('error', value)}
            >
              <RadioGroupItem value="error1" label="Error Option 1" color="error" />
              <RadioGroupItem value="error2" label="Error Option 2" color="error" />
              <RadioGroupItem value="error3" label="Error Option 3" color="error" />
            </RadioGroup>
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selections.error || 'None'}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Warning Color</h4>
            <RadioGroup
              value={selections.warning}
              onValueChange={(value) => handleSelectionChange('warning', value)}
            >
              <RadioGroupItem value="warning1" label="Warning Option 1" color="warning" />
              <RadioGroupItem value="warning2" label="Warning Option 2" color="warning" />
              <RadioGroupItem value="warning3" label="Warning Option 3" color="warning" />
            </RadioGroup>
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selections.warning || 'None'}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Info Color</h4>
            <RadioGroup
              value={selections.info}
              onValueChange={(value) => handleSelectionChange('info', value)}
            >
              <RadioGroupItem value="info1" label="Info Option 1" color="info" />
              <RadioGroupItem value="info2" label="Info Option 2" color="info" />
              <RadioGroupItem value="info3" label="Info Option 3" color="info" />
            </RadioGroup>
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selections.info || 'None'}
            </p>
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Sizes</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Small Size</h4>
            <RadioGroup
              value={selections.small}
              onValueChange={(value) => handleSelectionChange('small', value)}
            >
              <RadioGroupItem value="small1" label="Small Option 1" size="sm" />
              <RadioGroupItem value="small2" label="Small Option 2" size="sm" />
              <RadioGroupItem value="small3" label="Small Option 3" size="sm" />
            </RadioGroup>
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selections.small || 'None'}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Medium Size (Default)</h4>
            <RadioGroup
              value={selections.basic}
              onValueChange={(value) => handleSelectionChange('basic', value)}
            >
              <RadioGroupItem value="medium1" label="Medium Option 1" size="md" />
              <RadioGroupItem value="medium2" label="Medium Option 2" size="md" />
              <RadioGroupItem value="medium3" label="Medium Option 3" size="md" />
            </RadioGroup>
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selections.basic || 'None'}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Large Size</h4>
            <RadioGroup
              value={selections.large}
              onValueChange={(value) => handleSelectionChange('large', value)}
            >
              <RadioGroupItem value="large1" label="Large Option 1" size="lg" />
              <RadioGroupItem value="large2" label="Large Option 2" size="lg" />
              <RadioGroupItem value="large3" label="Large Option 3" size="lg" />
            </RadioGroup>
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selections.large || 'None'}
            </p>
          </div>
        </div>
      </div>

      {/* States */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different States</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Disabled State</h4>
            <RadioGroup
              value={selections.disabled}
              onValueChange={(value) => handleSelectionChange('disabled', value)}
              disabled
            >
              <RadioGroupItem value="disabled1" label="Disabled Option 1" disabled />
              <RadioGroupItem value="disabled2" label="Disabled Option 2" disabled />
              <RadioGroupItem value="disabled3" label="Disabled Option 3" disabled />
            </RadioGroup>
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selections.disabled || 'None'}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Read Only State</h4>
            <RadioGroup
              value={selections.readOnly}
              onValueChange={(value) => handleSelectionChange('readOnly', value)}
            >
              <RadioGroupItem value="readonly1" label="Read Only Option 1" readOnly />
              <RadioGroupItem value="readonly2" label="Read Only Option 2" readOnly />
              <RadioGroupItem value="readonly3" label="Read Only Option 3" readOnly />
            </RadioGroup>
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selections.readOnly || 'None'}
            </p>
          </div>
        </div>
      </div>

      {/* Layouts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Layouts</h3>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Horizontal Layout</h4>
          <RadioGroup
            value={selections.horizontal}
            onValueChange={(value) => handleSelectionChange('horizontal', value)}
            className="flex-row gap-6"
          >
            <RadioGroupItem value="horizontal1" label="Horizontal 1" />
            <RadioGroupItem value="horizontal2" label="Horizontal 2" />
            <RadioGroupItem value="horizontal3" label="Horizontal 3" />
          </RadioGroup>
          <p className="text-xs text-gray-500 mt-1">
            Selected: {selections.horizontal || 'None'}
          </p>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Custom Grid Layout</h4>
          <RadioGroup
            value={selections.customLayout}
            onValueChange={(value) => handleSelectionChange('customLayout', value)}
            className="grid grid-cols-2 gap-4"
          >
            <RadioGroupItem value="grid1" label="Grid Option 1" />
            <RadioGroupItem value="grid2" label="Grid Option 2" />
            <RadioGroupItem value="grid3" label="Grid Option 3" />
            <RadioGroupItem value="grid4" label="Grid Option 4" />
          </RadioGroup>
          <p className="text-xs text-gray-500 mt-1">
            Selected: {selections.customLayout || 'None'}
          </p>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Demo</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-3">
            Current selections: {Object.entries(selections).filter(([_, value]) => value).map(([key]) => key).join(', ') || 'None selected'}
          </p>
          <button
            onClick={() => setSelections(prev => Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: 'option1' }), {}))}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
          >
            Select All First Options
          </button>
          <button
            onClick={() => setSelections(prev => Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: '' }), {}))}
            className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Usage Examples</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Form Selection</h4>
            <RadioGroup
              value={selections.formExample}
              onValueChange={(value) => handleSelectionChange('formExample', value)}
            >
              <RadioGroupItem value="male" label="Male" color="primary" />
              <RadioGroupItem value="female" label="Female" color="primary" />
              <RadioGroupItem value="other" label="Other" color="primary" />
            </RadioGroup>
            <p className="text-xs text-blue-700 mt-1">
              Gender selection in a registration form
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Settings Panel</h4>
            <RadioGroup
              value={selections.settingsExample}
              onValueChange={(value) => handleSelectionChange('settingsExample', value)}
            >
              <RadioGroupItem value="light" label="Light Theme" color="success" />
              <RadioGroupItem value="dark" label="Dark Theme" color="success" />
              <RadioGroupItem value="auto" label="Auto (System)" color="success" />
            </RadioGroup>
            <p className="text-xs text-green-700 mt-1">
              Theme selection in application settings
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">Survey Question</h4>
            <RadioGroup
              value={selections.surveyExample}
              onValueChange={(value) => handleSelectionChange('surveyExample', value)}
            >
              <RadioGroupItem value="excellent" label="Excellent" color="info" />
              <RadioGroupItem value="good" label="Good" color="info" />
              <RadioGroupItem value="fair" label="Fair" color="info" />
              <RadioGroupItem value="poor" label="Poor" color="info" />
            </RadioGroup>
            <p className="text-xs text-purple-700 mt-1">
              Rating scale in a customer satisfaction survey
            </p>
          </div>
        </div>
      </div>

      {/* Features Showcase */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Features Showcase</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <h4 className="font-medium text-indigo-900 mb-2">Accessibility</h4>
            <p className="text-xs text-indigo-700 mb-2">
              Proper ARIA attributes and keyboard navigation support
            </p>
            <RadioGroup
              value={selections.basic}
              onValueChange={(value) => handleSelectionChange('basic', value)}
            >
              <RadioGroupItem value="access1" label="Accessible Option 1" />
              <RadioGroupItem value="access2" label="Accessible Option 2" />
            </RadioGroup>
          </div>
          
          <div className="p-4 bg-pink-50 rounded-lg">
            <h4 className="font-medium text-pink-900 mb-2">RTL Support</h4>
            <p className="text-xs text-pink-700 mb-2">
              Built-in right-to-left layout support
            </p>
            <RadioGroup
              value={selections.basic}
              onValueChange={(value) => handleSelectionChange('basic', value)}
            >
              <RadioGroupItem value="rtl1" label="RTL Option 1" />
              <RadioGroupItem value="rtl2" label="RTL Option 2" />
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Technical Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Technical Information</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Component Features:</h4>
          <ul className="text-xs text-gray-700 space-y-1 ml-4">
            <li>• Built on Radix UI Radio Group primitives for accessibility</li>
            <li>• 6 color variants: primary, secondary, success, error, warning, info</li>
            <li>• 3 size options: small, medium, large</li>
            <li>• Support for disabled and read-only states</li>
            <li>• RTL (right-to-left) layout support</li>
            <li>• Customizable layouts with CSS classes</li>
            <li>• Proper ARIA attributes and keyboard navigation</li>
            <li>• Focus management and visual feedback</li>
            <li>• TypeScript support with proper type definitions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
