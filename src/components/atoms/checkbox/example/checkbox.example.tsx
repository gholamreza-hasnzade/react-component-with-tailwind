import { useState } from 'react';
import { Checkbox } from '../checkbox';

export const CheckboxExample = () => {
  const [checkedStates, setCheckedStates] = useState({
    basic: false,
    primary: false,
    secondary: false,
    success: false,
    error: false,
    warning: false,
    info: false,
    withError: false,
    withHelper: false,
    required: false,
    disabled: false,
  });

  const handleCheckChange = (key: string, checked: boolean) => {
    setCheckedStates(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  return (
    <div className="p-6 space-y-8 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold mb-4">Checkbox Component Examples</h2>
        <p className="text-gray-600 mb-6">
          This demonstrates various configurations and states of the Checkbox component.
        </p>
      </div>

      {/* Basic Checkbox */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Checkbox</h3>
        <Checkbox
          id="basic"
          label="Basic checkbox"
          checked={checkedStates.basic}
          onCheckedChange={(checked) => handleCheckChange('basic', checked)}
        />
      </div>

      {/* Color Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Color Variants</h3>
        <div className="grid grid-cols-2 gap-4">
          <Checkbox
            id="primary"
            label="Primary color"
            color="primary"
            checked={checkedStates.primary}
            onCheckedChange={(checked) => handleCheckChange('primary', checked)}
          />
          <Checkbox
            id="secondary"
            label="Secondary color"
            color="secondary"
            checked={checkedStates.secondary}
            onCheckedChange={(checked) => handleCheckChange('secondary', checked)}
          />
          <Checkbox
            id="success"
            label="Success color"
            color="success"
            checked={checkedStates.success}
            onCheckedChange={(checked) => handleCheckChange('success', checked)}
          />
          <Checkbox
            id="error"
            label="Error color"
            color="error"
            checked={checkedStates.error}
            onCheckedChange={(checked) => handleCheckChange('error', checked)}
          />
          <Checkbox
            id="warning"
            label="Warning color"
            color="warning"
            checked={checkedStates.warning}
            onCheckedChange={(checked) => handleCheckChange('warning', checked)}
          />
          <Checkbox
            id="info"
            label="Info color"
            color="info"
            checked={checkedStates.info}
            onCheckedChange={(checked) => handleCheckChange('info', checked)}
          />
        </div>
      </div>

      {/* States */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different States</h3>
        <div className="space-y-4">
          <Checkbox
            id="withError"
            label="Checkbox with error"
            checked={checkedStates.withError}
            onCheckedChange={(checked) => handleCheckChange('withError', checked)}
            error="This field is required"
          />
          
          <Checkbox
            id="withHelper"
            label="Checkbox with helper text"
            checked={checkedStates.withHelper}
            onCheckedChange={(checked) => handleCheckChange('withHelper', checked)}
            helperText="This helper text provides additional information"
          />
          
          <Checkbox
            id="required"
            label="Required checkbox"
            checked={checkedStates.required}
            onCheckedChange={(checked) => handleCheckChange('required', checked)}
            required
          />
          
          <Checkbox
            id="disabled"
            label="Disabled checkbox"
            checked={checkedStates.disabled}
            onCheckedChange={(checked) => handleCheckChange('disabled', checked)}
            disabled
          />
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Demo</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-3">
            Current states: {Object.entries(checkedStates).filter(([_, checked]) => checked).map(([key]) => key).join(', ') || 'None selected'}
          </p>
          <button
            onClick={() => setCheckedStates(prev => Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: true }), {}))}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
          >
            Check All
          </button>
          <button
            onClick={() => setCheckedStates(prev => Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}))}
            className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Uncheck All
          </button>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Usage Examples</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Form Integration</h4>
            <Checkbox
              id="terms"
              label="I agree to the terms and conditions"
              required
              helperText="You must accept the terms to continue"
            />
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Settings Panel</h4>
            <Checkbox
              id="notifications"
              label="Enable email notifications"
              color="success"
              helperText="Receive updates about your account"
            />
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Feature Toggle</h4>
            <Checkbox
              id="beta"
              label="Enable beta features"
              color="warning"
              helperText="Experimental features may be unstable"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
