import React, { useState } from 'react';
import { Select } from './select';

export const SelectExample = () => {
  const [selections, setSelections] = useState({
    basic: undefined,
    primary: undefined,
    secondary: undefined,
    success: undefined,
    error: undefined,
    warning: undefined,
    info: undefined,
    small: undefined,
    large: undefined,
    disabled: undefined,
    required: undefined,
    multiple: undefined,
    searchable: undefined,
    grouped: undefined,
    customRender: undefined,
    apiExample: undefined,
    formExample: undefined,
    settingsExample: undefined,
  });

  const handleSelectionChange = (key: string, value: any) => {
    setSelections(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Sample data for examples
  const sampleOptions = [
    { id: 1, name: "Apple", category: "Fruit", price: 1.99 },
    { id: 2, name: "Banana", category: "Fruit", price: 0.99 },
    { id: 3, name: "Carrot", category: "Vegetable", price: 1.49 },
    { id: 4, name: "Dragon Fruit", category: "Exotic", price: 5.99 },
    { id: 5, name: "Eggplant", category: "Vegetable", price: 2.49 },
    { id: 6, name: "Fig", category: "Fruit", price: 3.99 },
    { id: 7, name: "Grape", category: "Fruit", price: 4.99 },
    { id: 8, name: "Honeydew", category: "Melon", price: 6.99 },
  ];

  const groupedOptions = [
    {
      label: "Fruits",
      options: [
        { id: "f1", name: "Apple", type: "fruit", color: "red" },
        { id: "f2", name: "Banana", type: "fruit", color: "yellow" },
        { id: "f3", name: "Orange", type: "fruit", color: "orange" },
      ]
    },
    {
      label: "Vegetables",
      options: [
        { id: "v1", name: "Carrot", type: "vegetable", color: "orange" },
        { id: "v2", name: "Broccoli", type: "vegetable", color: "green" },
        { id: "v3", name: "Spinach", type: "vegetable", color: "green" },
      ]
    },
    {
      label: "Grains",
      options: [
        { id: "g1", name: "Rice", type: "grain", color: "white" },
        { id: "g2", name: "Wheat", type: "grain", color: "brown" },
        { id: "g3", name: "Oats", type: "grain", color: "beige" },
      ]
    }
  ];

  const countries = [
    { id: "us", name: "United States", code: "US", region: "North America" },
    { id: "ca", name: "Canada", code: "CA", region: "North America" },
    { id: "uk", name: "United Kingdom", code: "UK", region: "Europe" },
    { id: "de", name: "Germany", code: "DE", region: "Europe" },
    { id: "fr", name: "France", code: "FR", region: "Europe" },
    { id: "jp", name: "Japan", code: "JP", region: "Asia" },
    { id: "cn", name: "China", code: "CN", region: "Asia" },
    { id: "au", name: "Australia", code: "AU", region: "Oceania" },
  ];

  return (
    <div className="p-6 space-y-8 max-w-6xl">
      <div>
        <h2 className="text-2xl font-bold mb-4">Select Component Examples</h2>
        <p className="text-gray-600 mb-6">
          This demonstrates various configurations and states of the Select component with different colors, variants, sizes, and advanced features.
        </p>
      </div>

      {/* Basic Select */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Select</h3>
        <Select
          titleKey="name"
          valueKey="id"
          value={selections.basic}
          onChange={(value) => handleSelectionChange('basic', value)}
          options={sampleOptions}
          placeholder="Select an option"
          label="Basic Select"
        />
        <p className="text-xs text-gray-500 mt-1">
          Selected: {selections.basic ? JSON.stringify(selections.basic) : 'None'}
        </p>
      </div>

      {/* Color Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Color Variants</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Primary Color (Contained)</h4>
            <Select
              titleKey="name"
              valueKey="id"
              color="primary"
              variant="contained"
              value={selections.primary}
              onChange={(value) => handleSelectionChange('primary', value)}
              options={sampleOptions}
              placeholder="Select primary option"
              label="Primary Select"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selections.primary ? JSON.stringify(selections.primary) : 'None'}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Secondary Color (Outlined)</h4>
            <Select
              titleKey="name"
              valueKey="id"
              color="secondary"
              variant="outlined"
              value={selections.secondary}
              onChange={(value) => handleSelectionChange('secondary', value)}
              options={sampleOptions}
              placeholder="Select secondary option"
              label="Secondary Select"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selections.secondary ? JSON.stringify(selections.secondary) : 'None'}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Success Color (Text)</h4>
            <Select
              titleKey="name"
              valueKey="id"
              color="success"
              variant="text"
              value={selections.success}
              onChange={(value) => handleSelectionChange('success', value)}
              options={sampleOptions}
              placeholder="Select success option"
              label="Success Select"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selections.success ? JSON.stringify(selections.success) : 'None'}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Error Color</h4>
            <Select
              titleKey="name"
              valueKey="id"
              color="error"
              value={selections.error}
              onChange={(value) => handleSelectionChange('error', value)}
              options={sampleOptions}
              placeholder="Select error option"
              label="Error Select"
              error="This field has an error"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selections.error ? JSON.stringify(selections.error) : 'None'}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Warning Color</h4>
            <Select
              titleKey="name"
              valueKey="id"
              color="warning"
              value={selections.warning}
              onChange={(value) => handleSelectionChange('warning', value)}
              options={sampleOptions}
              placeholder="Select warning option"
              label="Warning Select"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selections.warning ? JSON.stringify(selections.warning) : 'None'}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Info Color</h4>
            <Select
              titleKey="name"
              valueKey="id"
              color="info"
              value={selections.info}
              onChange={(value) => handleSelectionChange('info', value)}
              options={sampleOptions}
              placeholder="Select info option"
              label="Info Select"
              multiple
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selections.info ? JSON.stringify(selections.info) : 'None'}
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
            <Select
              titleKey="name"
              valueKey="id"
              size="sm"
              value={selections.small}
              onChange={(value) => handleSelectionChange('small', value)}
              options={sampleOptions}
              placeholder="Small select"
              label="Small Select"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selections.small ? JSON.stringify(selections.small) : 'None'}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Medium Size (Default)</h4>
            <Select
              titleKey="name"
              valueKey="id"
              size="md"
              value={selections.basic}
              onChange={(value) => handleSelectionChange('basic', value)}
              options={sampleOptions}
              placeholder="Medium select"
              label="Medium Select"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selections.basic ? JSON.stringify(selections.basic) : 'None'}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Large Size</h4>
            <Select
              titleKey="name"
              valueKey="id"
              size="lg"
              value={selections.large}
              onChange={(value) => handleSelectionChange('large', value)}
              options={sampleOptions}
              placeholder="Large select"
              label="Large Select"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selections.large ? JSON.stringify(selections.large) : 'None'}
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
            <Select
              titleKey="name"
              valueKey="id"
              disabled
              value={selections.disabled}
              onChange={(value) => handleSelectionChange('disabled', value)}
              options={sampleOptions}
              placeholder="Disabled select"
              label="Disabled Select"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selections.disabled ? JSON.stringify(selections.disabled) : 'None'}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Required State</h4>
            <Select
              titleKey="name"
              valueKey="id"
              required
              value={selections.required}
              onChange={(value) => handleSelectionChange('required', value)}
              options={sampleOptions}
              placeholder="Required select"
              label="Required Select"
              helperText="This field is required"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selections.required ? JSON.stringify(selections.required) : 'None'}
            </p>
          </div>
        </div>
      </div>

      {/* Multiple Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Multiple Selection</h3>
        <Select
          titleKey="name"
          valueKey="id"
          multiple
          value={selections.multiple}
          onChange={(value) => handleSelectionChange('multiple', value)}
          options={sampleOptions}
          placeholder="Select multiple options"
          label="Multiple Select"
          helperText="You can select multiple items"
        />
        <p className="text-xs text-gray-500 mt-1">
          Selected: {selections.multiple ? JSON.stringify(selections.multiple) : 'None'}
        </p>
      </div>

      {/* Searchable Select */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Searchable Select</h3>
        <Select
          titleKey="name"
          valueKey="id"
          searchable
          value={selections.searchable}
          onChange={(value) => handleSelectionChange('searchable', value)}
          options={countries}
          placeholder="Search countries..."
          label="Searchable Country Select"
          helperText="Type to search through countries"
        />
        <p className="text-xs text-gray-500 mt-1">
          Selected: {selections.searchable ? JSON.stringify(selections.searchable) : 'None'}
        </p>
      </div>

      {/* Grouped Options */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Grouped Options</h3>
        <Select
          titleKey="name"
          valueKey="id"
          groupedOptions={groupedOptions}
          value={selections.grouped}
          onChange={(value) => handleSelectionChange('grouped', value)}
          placeholder="Select from grouped options"
          label="Grouped Options Select"
          helperText="Options are organized by categories"
        />
        <p className="text-xs text-gray-500 mt-1">
          Selected: {selections.grouped ? JSON.stringify(selections.grouped) : 'None'}
        </p>
      </div>

      {/* Custom Rendering */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Option Rendering</h3>
        <Select
          titleKey="name"
          valueKey="id"
          value={selections.customRender}
          onChange={(value) => handleSelectionChange('customRender', value)}
          options={sampleOptions}
          placeholder="Select with custom rendering"
          label="Custom Render Select"
          renderOption={(item, { isSelected }) => (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-gray-500">({item.category})</span>
              </div>
              <span className="text-sm text-green-600">${item.price}</span>
            </div>
          )}
          renderSelectedValue={(item) => (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>{item.name}</span>
              <span className="text-xs text-gray-500">${item.price}</span>
            </div>
          )}
        />
        <p className="text-xs text-gray-500 mt-1">
          Selected: {selections.customRender ? JSON.stringify(selections.customRender) : 'None'}
        </p>
      </div>

      {/* Width Variations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Width Variations</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Full Width</h4>
            <Select
              titleKey="name"
              valueKey="id"
              fullWidth
              value={selections.basic}
              onChange={(value) => handleSelectionChange('basic', value)}
              options={sampleOptions}
              placeholder="Full width select"
              label="Full Width Select"
            />
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Custom Width (300px)</h4>
            <Select
              titleKey="name"
              valueKey="id"
              width={300}
              value={selections.basic}
              onChange={(value) => handleSelectionChange('basic', value)}
              options={sampleOptions}
              placeholder="Custom width select"
              label="Custom Width Select"
            />
          </div>
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
            onClick={() => setSelections(prev => Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: sampleOptions[0] }), {}))}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
          >
            Select All First Options
          </button>
          <button
            onClick={() => setSelections(prev => Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: undefined }), {}))}
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
            <Select
              titleKey="name"
              valueKey="id"
              value={selections.formExample}
              onChange={(value) => handleSelectionChange('formExample', value)}
              options={countries}
              placeholder="Select your country"
              label="Country"
              required
              helperText="Please select your country of residence"
            />
            <p className="text-xs text-blue-700 mt-1">
              Country selection in a registration form
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Settings Panel</h4>
            <Select
              titleKey="name"
              valueKey="id"
              value={selections.settingsExample}
              onChange={(value) => handleSelectionChange('settingsExample', value)}
              options={[
                { id: "light", name: "Light Theme", description: "Clean and bright interface" },
                { id: "dark", name: "Dark Theme", description: "Easy on the eyes" },
                { id: "auto", name: "Auto (System)", description: "Follows system preference" },
              ]}
              placeholder="Choose theme"
              label="Theme Selection"
              helperText="Select your preferred interface theme"
            />
            <p className="text-xs text-green-700 mt-1">
              Theme selection in application settings
            </p>
          </div>
        </div>
      </div>

      {/* Features Showcase */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Features Showcase</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <h4 className="font-medium text-indigo-900 mb-2">Add New Option</h4>
            <p className="text-xs text-indigo-700 mb-2">
              Click the dropdown to see the "Add new" button
            </p>
            <Select
              titleKey="name"
              valueKey="id"
              options={sampleOptions}
              placeholder="Select or add new"
              label="Add New Demo"
              onAddNew={() => alert('Add new functionality triggered!')}
              addNewLabel="Add New Item"
            />
          </div>
          
          <div className="p-4 bg-pink-50 rounded-lg">
            <h4 className="font-medium text-pink-900 mb-2">Custom Dropdown Header</h4>
            <p className="text-xs text-pink-700 mb-2">
              Custom header with additional information
            </p>
            <Select
              titleKey="name"
              valueKey="id"
              options={sampleOptions}
              placeholder="Select option"
              label="Custom Header Demo"
              dropdownHeader={
                <div className="text-sm text-gray-600">
                  <div className="font-medium">Available Options</div>
                  <div className="text-xs">Total: {sampleOptions.length} items</div>
                </div>
              }
            />
          </div>
        </div>
      </div>

      {/* Technical Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Technical Information</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Component Features:</h4>
          <ul className="text-xs text-gray-700 space-y-1 ml-4">
            <li>• 6 color variants: primary, secondary, success, error, warning, info</li>
            <li>• 3 style variants: contained, outlined, text</li>
            <li>• 3 size options: small, medium, large</li>
            <li>• Single and multiple selection modes</li>
            <li>• Built-in search functionality with debouncing</li>
            <li>• Grouped options support with categories</li>
            <li>• Custom option and selected value rendering</li>
            <li>• API integration with pagination and lazy loading</li>
            <li>• Add new option functionality</li>
            <li>• Custom dropdown headers</li>
            <li>• Full width and custom width support</li>
            <li>• Error handling and validation</li>
            <li>• Helper text and labels</li>
            <li>• Accessibility features with ARIA attributes</li>
            <li>• TypeScript support with comprehensive types</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
